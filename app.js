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

conn = Promise.promisifyAll(conn)

let io = require('socket.io')(server)

app.use(logger())
app.use(static(path.join(__dirname, 'dist/')))
app.use(koaBody())

router
    .get('/', async (ctx, next) => {
        await send(ctx, './dist/index.html')
    })
    .post('/signup', async (ctx, next) => {
        // ctx.set('Access-Control-Allow-Origin', '*')
        console.log(ctx.request.body)
        ctx.body = {
            status: 200,
            message: 'ok',
        }
    })

app
    .use(router.routes())
    .use(router.allowedMethods())
server.listen(3000)


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
