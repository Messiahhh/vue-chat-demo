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
const fs = require('fs-extra')
const uniqueString = require('unique-string')
const axios = require('axios')
let io = require('socket.io')(server)
let conn = Promise.promisifyAll(mysql.createConnection(require('./mysql')))
conn.connect()

let APIkey = '322d34bef7294484ac2b7244beda34a4'

// app.use(logger())
app.use(static(path.join(__dirname, 'dist/')))
app.use(static(path.join(__dirname, 'public/')))
app.use(koaBody({multipart: true}))
router
    .post('/getInfo', async (ctx, next) => {
        let usr = ctx.request.body.usr
        let data = await conn.queryAsync(`SELECT imgUrl,gender,birth,city,resume FROM test WHERE usr = '${usr}'`)
        if (data[0]) {
            ctx.body = data[0]
        }
    })
    .post('/upload', async (ctx, next) => {
        let {
            oldUsr,
            newUsr,
            gender,
            birth,
            city,
            resume,
        } = ctx.request.body.fields
        let obj = {
            usr: newUsr,
            gender,
            birth,
            city,
            resume,
        }
        let file = ctx.request.body.files.file
        let filename
        if (file) {
            filename = `${uniqueString()}.jpg`
            const reader = fs.createReadStream(file.path)
            const stream = fs.createWriteStream(`./public/${filename}`)
            reader.pipe(stream)
            await conn.queryAsync(`UPDATE test SET imgUrl='${filename}' WHERE usr='${oldUsr}'`)
        }
        Object.entries(obj).forEach(async ([key,val], index) => {
            if (val) {
                await conn.queryAsync(`UPDATE test SET ${key}='${val}' WHERE usr='${oldUsr}'`);
            }
        })
        if (file) {
            ctx.body = {
                status: 200,
                changeImg: true,
                imgUrl: filename,
            }
        }
        else {
            ctx.body = {
                status: 200,
                changeImg: false,
            }
        }

    })
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
            await conn.query(`INSERT INTO test VALUES (?, ?, ?, default, default, default, default, default)`, [null, usr, pwd])
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
            ctx.cookies.set('imgUrl', data[0].imgUrl, {
                httpOnly: false,
            })
            ctx.body = {
                status: 200,
                usr,
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
    .get('/backend', async (ctx, next) => {
        ctx.body = userList

    })

app
    .use(router.routes())
    .use(router.allowedMethods())
server.listen(3000, () => {
    console.log('Running at 3000 port')
})


//在线人数
let robot = {
    id: '000000',
    usr: '图灵机器人',
    imgUrl: 'http://www.tuling123.com/resources/web/v4/img/personalCen/icon40.png',
}
let userList = {
    [robot.id]: robot
}
io.on('connection', function(socket) {
    socket.on('login', (data) => {
        let user = data
        Object.assign(userList, {
            [user.id]: user
        })
        io.emit('login', {id: user.id, userList})
    })
    //Seem that reload page sometimes didn't emit 'disconnect' event
    socket.on('disconnecting', () => {
        console.log('disconnect');
        let id = socket.id
        delete userList[id]
        socket.broadcast.emit('logout', id)
    })

    socket.on('chat', data => {
        io.emit('chat', Object.assign(data, userList[data.id]))
    })

    socket.on('ChatToRobot', async data => {
        let {id, text} = data
        let {data: res} = await axios.post('http://www.tuling123.com/openapi/api', {
            key: APIkey,
            info: text,
            userid: userList[id],
        })
        io.emit('chat', {
            id: '000000',
            usr: '图灵机器人',
            imgUrl: 'http://www.tuling123.com/resources/web/v4/img/personalCen/icon40.png',
            text: res.text,
        })
    })
});
