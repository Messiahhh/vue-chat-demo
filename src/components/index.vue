<style lang="stylus">
themeColor = #409EFF
.container
    display flex
    height 100vh
    // insert profile.vue
    .main
        flex 1
        display flex
        flex-direction column
        .chatField
            flex 1
        .inputField
            display flex
            padding 10px 10px
            border-top 1px solid themeColor
            .textarea
                flex 1
                height 100%
            button
                margin-left 10px
                /* flex-basis 80px */



.profile
    display flex
    margin-bottom 4px
    .image
        flex-basis 70px
        .img
            margin 10px auto
            width 40px
            height 40px
            /* border-radius 20px */
            background pink
    .message
        flex 1
        div
            margin-top 8px
            margin-bottom 14px
            font-size 14px
            font-weight 700
        span
            margin 5px
            padding 7px 14px
            background themeColor
            color #fff
            border-radius 0 4px 4px 4px
            position relative
        span::before
            position absolute
            content ''
            top 0
            left -8px
            width 0
            height 0
            border-right 8px solid themeColor
            border-bottom 8px solid transparent
     .messageR
        span
            border-radius 4px 0 4px 4px
        span::before
            left 100%
            border-right 0
            border-left 8px solid themeColor

</style>

<template lang="html">
    <div class="container">
        <router-view></router-view>
        <div class="main">
            <router-link :to="{ name: 'group'}" v-if="$route.path === '/profile'">to group</router-link>
            <router-link :to="{ name: 'profile'}" v-if="$route.path === '/'">to profile</router-link>
            <div class="chatField">
                <div v-for="item in items" class='profile'>
                    <template v-if="item.name === name">
                        <div class="image" style='order: 1'>
                            <div class="img">

                            </div>
                        </div>
                        <div class="message messageR" style='order: 0;text-align: right'>
                            <div>{{item.name}} :</div>
                            <span >{{item.comment}}</span>
                        </div>
                    </template>
                    <template v-else>
                        <div class="image">
                            <div class="img">

                            </div>
                        </div>
                        <div class="message" >
                            <div>{{item.name}} :</div>
                            <span >{{item.comment}}</span>
                        </div>
                    </template>
                </div>
            </div>
            <div class="inputField">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="comment"
                  resize='none'
                  @keyup.enter='submit'
                  >
                </el-input>
                <el-button type='primary' @click='submit'>发送</el-button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            comment: '',
            items: [],
        }
    },
    computed: {
        count() {
            return this.userList.length
        },
        name() {
            return  this.$store.state.name
        },
        userList() {
            return this.$store.state.userList
        },
        socket() {
            return this.$store.state.socket
        },
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
            this.comment = ''
        },
    },
    beforeRouteEnter(to, from, next) {
        let cookie = document.cookie.split('=')
        if (cookie[0] === 'usr') {
            next()
        }
        else {
            next('/signin')
        }
    },
    created() {
        this.$store.commit('initSocket')
        this.$store.commit('changeName', this.$cookie.get('usr'))
        this.socket.emit('login', {name: this.name})
        this.socket.on('login', data => {
            this.$store.commit('updateUserList', data)
            this.notify(`${data.user.name} join room`)
        })
        this.socket.on('logout', data => {
            this.$store.commit('deleteUser', data)
            this.notify(`${data.name} leave room`)
        })
        this.socket.on('chat', data => {
            this.items.push({
                name: data.name,
                comment: data.comment,
            })
            // this.notify(`${data.name} says ${data.comment}`)
        })

    }
}
</script>
