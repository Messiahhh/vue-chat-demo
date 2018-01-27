<template lang="html">
    <div class="container">
        <div class="slideBar">
            <h4>在线人数 {{userNum}}</h4>
            <p v-for='user in userList'>{{user}}</p>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            user: this.$route.query.user,
            userList: [],
            comment: '',
            items: [],
            socket: {},
        }
    },
    computed: {
        userNum() {
            return this.userList.length
        }
    },
    methods: {
        open(title) {
            this.$notify({
                title,
            })
        }
    },
    created() {
        this.socket = io()
        this.socket.emit('login', {user: this.user})

        this.socket.on('login', data => {
            let arr = []
            data.list.forEach((item, index) => {
                arr.push(item.user)
            })
            this.userList = arr
            this.open(`${data.user} join room`)
        })

        this.socket.on('logout', data => {
            let user = data
            this.userList.forEach((item, index) => {
                if (item === user) {
                    this.userList.splice(index, 1)
                }
            })

            this.open(`${user} leave room`)

        })
    }


}
</script>

<style lang="stylus">
.container
    display flex
    height 100vh
    .slideBar
        flex-basis 260px
        height 100vh
        overflow auto
        border-right 1px solid #409EFF
        h4
            text-align center
            color #409EFF
        p
            text-align center
    .main
        flex 1
</style>
