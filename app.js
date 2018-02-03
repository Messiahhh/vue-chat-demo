const path = require('path')
const http = require('http')
const Koa = require('koa')
const app = new Koa()
const server = http.createServer(app.callback())
const static = require('koa-static')
const Router = require('koa-router')
const send = require('koa-send')
const router = new Router()
const logger = require('koa-logger')
const mysql = require('mysql')
const Promise = require('bluebird')
const koaBody = require('koa-body')
let conn = mysql.createConnection(require('./mysql'))
conn = Promise.promisifyAll(conn)
conn.connect()
let io = require('socket.io')(server)

app.use(logger())
app.use(static(path.join(__dirname, 'dist/')))
app.use(koaBody())
router
    .post('/signup', async (ctx, next) => {
        let {usr, pwd} = ctx.request.body
        let data = await conn.queryAsync(`SELECT * FROM test WHERE usr = '${usr}'`)
        if (data[0]) {
            ctx.body = {
                status: 404,
                message: '用户名已存在',
            }
        }
        else {
            await conn.query(`INSERT INTO test VALUES (?, ?, ?)`, [null, usr, pwd])
            ctx.body = {
                status: 200,
                message: '注册成功',
            }
        }
    })
    .post('/signin', async (ctx, next) => {
        let {usr, pwd} = ctx.request.body
        let data = await conn.queryAsync(`SELECT * FROM test WHERE usr = '${usr}' AND pwd = '${pwd}'`)
        if (data[0]) {
            ctx.cookies.set('usr', usr, {
                httpOnly: false,
            })
            ctx.body = {
                status: 200,
                message: '登陆成功',
            }
        }
        else {
            ctx.body = {
                status: 404,
                message: '登陆失败',
            }
        }
    })

app
    .use(router.routes())
    .use(router.allowedMethods())
server.listen(3000, () => {
    console.log('Running at 3000 port')
})


//在线人数
let userList = []
io.on('connection', function(socket) {
    socket.on('login', (data) => {
        let user = {
            id: socket.id,
            name: data.name,
        }
        userList.push(user)
        io.emit('login', {user, userList})
    })

    socket.on('disconnect', () => {
        let id = socket.id
        let user
        userList.forEach((item, index) => {
            if (id === item.id) {
                user = userList.splice(index, 1)
            }
        })
        // console.log(user);
        socket.broadcast.emit('logout', user[0])
    })

    socket.on('chat', data => {
        userList.forEach((item, index) => {
            if (data.id === item.id) {
                io.emit('chat', Object.assign(item, data))
            }
        })
    })
});
