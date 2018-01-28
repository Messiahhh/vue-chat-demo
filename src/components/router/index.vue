<style lang="stylus">
themeColor = #409EFF
.container
    display flex
    height 100vh
    .slideBar
        flex-basis 260px
        height 100vh
        overflow auto
        background themeColor
        h4
            text-align center
            color #fff
        p
            text-align center
    .main
        flex 1
        display flex
        flex-direction column
        .chatField
            flex 1
        .inputField
            .textarea
                flex 1
                height 100%
                border 1px solid #dcdfe6
                border-radius 6px
                padding 5px 15px
                outline none
                transition border-color 2s
                overflow scroll
            .textarea:focus
                border-color themeColor
            button
                margin-left 10px
            display flex
            padding 10px 10px
            border-top 1px solid themeColor
            flex-basis 80px
</style>

<template lang="html">
    <div class="container">
        <div class="slideBar">
            <h4>在线人数 {{count}}</h4>
            <p v-for='user in userList'>{{user}}</p>
        </div>
        <div class="main">
            <div class="chatField">
                <div v-for="item in items">
                    <h6>{{item.name}}</h6>
                    <p>{{item.comment}}</p>
                </div>
            </div>
            <div class="inputField">
                <div class="textarea" contenteditable='true' placeholder='请输入内容'>
                    
                </div>
                <el-button type='primary' @click='submit'>发送</el-button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data: function () {
        return {
            name: this.$route.query.name,
            userList: [],
            comment: '',
            items: [],
            socket: {},
        }
    },
    computed: {
        count() {
            return this.userList.length
        }
    },
    methods: {
        notify(title) {
            this.$notify({
                title,
            })
        },
        submit() {
            this.socket.emit('chat', {
                id: this.socket.id,
                comment: this.comment,
            })
        }
    },
    created() {
        this.socket = io()
        this.socket.emit('login', {name: this.name})

        this.socket.on('login', data => {
            let arr = []
            data.userList.forEach((item, index) => {
                arr.push(item.name)
            })
            this.userList = arr
            this.notify(`${data.user.name} join room`)
        })

        this.socket.on('logout', data => {
            this.userList.forEach((item, index) => {
                if (item === data.name) {
                    this.userList.splice(index, 1)
                }
            })

            this.notify(`${data.name} leave room`)
        })
        this.socket.on('chat', data => {
            console.log(data)
            // this.items.push({
            //     name: data.name,
            //     comment: data.comment,
            // })
            this.notify(`${data.name} says ${data.comment}`)
        })

    }
}
</script>
