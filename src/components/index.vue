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
        padding 5px 5px
        overflow auto
        flex 1
        position relative
    .inputField
        grid-area inputField
        display flex
        padding 10px 10px
        border-top 1px solid themeColor
        background greyColor
        position relative
        .ToBottom
            position absolute
            font-size 24px
            width 40px
            height 40px
            border-radius 4px
            border 1px solid rgb(19, 199, 130)
            color rgb(19, 199, 130)
            right 20px
            top -50px
            line-height 40px
            text-align center
            cursor pointer
        .ToTop
            position absolute
            font-size 24px
            width 40px
            height 40px
            border-radius 4px
            border 1px solid rgb(19, 199, 130)
            color rgb(19, 199, 130)
            right 80px
            top -50px
            line-height 40px
            text-align center
            cursor pointer
        .previewImage
            height 140px
            position absolute
            left 10px
            top -150px
            padding 10px
            border-radius 4px
            border 2px solid greyColor
            i
                position absolute;
                top -5px
                right -8px
                color red
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


.button-enter
    opacity 0
.button-enter-active
    transition all 1.2s
.button-leave-to
    opacity 0
.button-leave-active
    transition all 1.2s

.absolute
    position fixed
</style>

<template lang="html">
    <div class="container" @click="hiddenMenu">
        <div class="slideBar">
            <router-view></router-view>
        </div>
        <div class="topBar">
            聊天室
        </div>
        <div class="chatField" @scroll="scroll">
            <div v-for="item in items" :class="[{profile: item.usr !== user.usr}, 'profile-self']">
                <div class="name">
                    {{item.usr}}
                </div>
                <router-link :to="{ name: 'profile', params: {usr: item.usr} }" class="image" :style="{backgroundImage: `url(${item.imgUrl})`}" @click.native.right.prevent="displayMenu" :data-id="item.id"></router-link>
                <div class="message">
                    <img v-if="item.messageUrl" :src="item.messageUrl" alt="">
                    <span v-if="item.text.length !== 0">{{item.text}}</span>
                </div>
            </div>
        </div>
        <div class="inputField">
            <transition name='button'>
                <div class="ToTop" v-show="offsetBtn" @click='toTop'>
                    <i class="el-icon-upload2"></i>
                </div>
            </transition>
            <transition name='button'>
                <div class="ToBottom" v-show="offsetBtn" @click='toBottom'>
                    <i class="el-icon-download"></i>
                </div>
            </transition>
            <div class="previewImage" v-if="hasImage">
                <img :src="message.imgUrl" alt="">
                <i class="el-icon-error" @click="delImage"></i>
            </div>
            <div class="addImage">
                <input type="file" @change='addImage'>
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
            <el-button type='primary' @click='submit' :disabled="disableButton">发送</el-button>
        </div>
        <el-menu v-show="menu.display" :top="menu.top" :left="menu.left" :id="menu.toWho" @click.native="clickMenu" @clickItem="clickItem"></el-menu>
    </div>
</template>


<script>
import axios from 'axios'
import menu from './partials/menu.vue'

export default {
    data() {
        return {
            message: {
                text: '',
                imgUrl: '',
            },
            menu: {
                toWho: '',
                display: false,
                top: '',
                left: '',
            },
            items: [],
            offsetBtn: false,
        }
    },
    computed: {
        socket() {
            return this.$store.state.socket
        },
        user() {
            return this.$store.state.user
        },
        userList() {
            return this.$store.state.userList
        },


        hasImage() {
            return this.message.imgUrl !== ''
        },
        disableButton() {
            return this.message.text === '' && this.message.imgUrl === ''
        },


    },
    methods: {
        notify(title) {
            this.$notify({
                title,
            })
        },
        addImage(e) {
            let file = e.target.files[0]
            let reader = new FileReader()
            reader.onload = () => {
                this.message.imgUrl = reader.result
            }
            reader.readAsDataURL(file)
        },

        delImage() {
            this.message.imgUrl = ''
        },

        async submit() {
            if (this.message.text !== '') {
                this.socket.emit('ChatToRobot', {
                    id: this.socket.id,
                    text: this.message.text,
                })
            }
            this.socket.emit('chat', {
                id: this.socket.id,
                text: this.message.text,
                messageUrl: this.message.imgUrl,
            })
            this.message.text = ''
            this.message.imgUrl = ''
        },

        scroll() {
            if (!this.offsetBtn) {
                this.offsetBtn = true
                setTimeout(_ => {
                    this.offsetBtn = false
                }, 1200)
            }
        },

        toBottom() {
            let div = document.querySelector('.chatField')
            div.scrollTop = div.scrollHeight - div.clientHeight
        },

        toTop() {
            let div = document.querySelector('.chatField')
            div.scrollTop = 0
        },

        displayMenu(e) {
            let id = e.target.dataset.id
            let {clientX: left, clientY: top} = e
            this.menu.toWho = id
            this.menu.top = top
            this.menu.left = left
            this.menu.display = true
        },

        hiddenMenu() {
            if (this.menu.display) {
                this.menu.display = false
            }
        },

        clickMenu(e) {
            e.stopPropagation()
        },

        clickItem() {
            this.menu.display = false
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
                // this.notify(`someone join room`)
            })
            this.socket.on('logout', data => {
                // this.notify(`${this.userList[data].usr} leave room`)
                this.$store.commit('deleteUser', data)
            })
            this.socket.on('chat', data => {
                this.items.push(data)
            })

            this.socket.on('ringSB', data => {
                this.notify(`${this.userList[data.from].usr} 艾特了你`)
            })
        })
    },

    components: {
        'el-menu': menu
    }
}
</script>
