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
var io = require('socket.io')(server)

app.use(logger())
app.use(static(path.join(__dirname, 'dist/')))

router
    .get('/', async (ctx, next) => {
        await send(ctx, './dist/index.html')
    })
    .get('/test', async (ctx, next) => {
        // ctx.set('Access-Control-Allow-Origin', '*')
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
    // socket.on('disconnect', reason => {
    //     console.log(reason);
    // })
    // console.log('a user connected');
    socket.on('login', (data) => {
        let id = socket.id
        let user = data.user
        userList.push({id, user})
        io.emit('login', {user, 'list': userList})
    })

    socket.on('disconnect', () => {
        let id = socket.id
        let leaveUser
        userList.forEach((item, index) => {
            if (id === item.id) {
                leaveUser = userList.splice(index, 1)
            }
        })
        socket.broadcast.emit('logout', leaveUser[0].user)
    })


});
