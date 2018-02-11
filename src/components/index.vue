<style lang="stylus">
@import '../assets/css/global.styl'
.container
    height 100vh
    display grid
    grid-template-columns 280px 1fr;
    grid-template-rows 50px 1fr 80px;
    grid-template-areas "slideBar topBar"\
                        "slideBar chatField"\
                        "slideBar inputField"\

    .slideBar
        grid-area slideBar
    .topBar
        grid-area topBar
        line-height 50px
        text-align center
        border-bottom 1px solid themeColor
    .chatField
        grid-area chatField
        padding 5px 10px
        overflow auto
        flex 1
    .inputField
        grid-area inputField
        display flex
        padding 10px 10px
        border-top 1px solid themeColor
        background greyColor
        position relative
        .previewImage
            height 140px
            position absolute
            left 10px
            top -150px
            padding 10px
            border-radius 4px
            border 2px solid greyColor
            img
                height 100%
            &::before
                position absolute
                content ''
                border-top 12px solid greyColor
                border-left 12px solid transparent
                border-right 12px solid transparent
                top 100%
                left 50%
                transform translateX(-50%)
        .addImage
            flex-basis 80px
            margin-right 10px
            border-radius 4px
            border 1px dashed #555
            background #fff
            position relative
            &:hover
                border 1px dashed themeColor
            input
                cursor pointer
                width 100%
                height 100%
                opacity 0
                cursor pointer
            i
                position absolute
                top 50%
                left 50%
                transform translate(-50%, -50%)
                cursor pointer
        textarea
            flex 1
            height 100%
        button
            margin-left 10px



.profile-self
    display grid
    grid-template-columns 1fr 60px
    grid-template-rows 45px 15px 1fr
    grid-template-areas "name image"\
                        "message image"\
                        "message ."\

    .name
        grid-area name
        justify-self end
        align-self center
    .image
        grid-area image
        justify-self center
        align-self center
        display block
        width 40px
        height 40px
        background-size cover
        background-repeat no-repeat
    .message
        grid-area message
        display flex
        flex-direction column
        align-items flex-end
        img
            max-width 400px
            max-height 800px
            margin-bottom 10px
            display block
        span
            padding 10px 12px
            border-radius 4px
            background skyblue


.profile
    display grid
    grid-template-columns 60px 1fr
    grid-template-rows 45px 15px 1fr
    grid-template-areas "image name"\
                        "image message"\
                        ". message"\

    .name
        justify-self start
    .message
        align-items flex-start

</style>

<template lang="html">
    <div class="container">
        <div class="slideBar">
            <router-view></router-view>
        </div>
        <div class="topBar">
            聊天室
        </div>
        <div class="chatField">
            <div v-for="item in items" :class="[{profile: item.usr !== user.usr}, 'profile-self']">
                <div class="name">
                    {{item.usr}}
                </div>
                <router-link :to="{ name: 'profile', params: {usr: item.usr} }" class="image" :style="{backgroundImage: `url(${item.imgUrl})`}"></router-link>
                <div class="message">
                    <img v-if="item.messageUrl" :src="item.messageUrl" alt="">
                    <span v-if="item.text.length !== 0">{{item.text}}</span>
                </div>
            </div>
        </div>
        <div class="inputField">
            <div class="previewImage" v-if="hasAddImage">
                <img :src="message.imgUrl" alt="">
            </div>
            <div class="addImage">
                <input type="file" @change='changeImage'>
                <i class="el-icon-plus"></i>
            </div>
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="message.text"
              resize='none'
              @keyup.enter='submit'
              >
            </el-input>
            <el-button type='primary' @click='submit'>发送</el-button>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            message: {
                text: '',
                imgUrl: '',
            },
            hasAddImage: false,
            items: [],
        }
    },
    computed: {
        count() {
            return Object.key(this.userList).length
        },
        user() {
            return this.$store.state.user
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
                text: this.message.text,
                messageUrl: this.message.imgUrl,
            })
            this.message.text = ''
            this.message.imgUrl = ''
            this.hasAddImage = false
        },
        changeImage(e) {
            let file = e.target.files[0]
            if (file) {
                this.hasAddImage = true
            }
            let reader = new FileReader()
            reader.onload = () => {
                this.message.imgUrl = reader.result
            }
            reader.readAsDataURL(file)
        }
    },
    beforeRouteEnter(to, from, next) {
        let token = document.cookie.split(';')[0].split('=')[0]
        if (token === 'usr') {
            next()
        }
        else {
            next('/signin')
        }
    },
    created() {
        this.$store.commit('initSocket')
        this.socket.on('connect', () => {
            this.$store.commit('initState', {
                id: this.socket.id,
                usr: this.$cookie.get('usr'),
                imgUrl: this.$cookie.get('imgUrl'),
            })

            this.socket.emit('login', this.$store.state.user)
            this.socket.on('login', data => {
                this.$store.commit('updateUserList', data)
                // this.notify(`${this.userList[data.id].usr} join room`)
            })
            this.socket.on('logout', data => {
                // this.notify(`${this.userList[data].usr} leave room`)
                this.$store.commit('deleteUser', data)
            })
            this.socket.on('chat', data => {
                this.items.push(data)
            })
        })


    }
}
</script>
