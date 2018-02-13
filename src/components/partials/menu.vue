<template lang="html">
    <transition name='menu'>
        <div class="menu" :style="{top: `${top}px`, left: realLeft}">
            <div class="menu-item" @click="clickItem(); ringSB()">
                @{{usr}}
            </div>
            <div class="menu-item" @click="clickItem">
                发送信息
            </div>
            <div class="menu-item" @click="clickItem">
                添加好友
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'el-menu',
    props: ['left', 'top', 'id'],
    data () {
        return {

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
        usr() {
            if (this.id !== '' && this.userList[this.id]) {
                return this.userList[this.id].usr
            }
        },
        realLeft() {
            let clientWidth = document.documentElement.clientWidth
            if ((clientWidth - this.left) < 200) {
                return `${this.left - 120}px`
            }
            else {
                return `${this.left}px`
            }
        },
    },

    methods: {
        clickItem() {
            this.$emit('clickItem')
        },

        ringSB() {
            this.socket.emit('ringSB', {
                from: this.user.id,
                to: this.id,
            })
        }
    }
}
</script>

<style lang="stylus">
    .menu-enter
        opacity 0
        transform scaleY(0)
    .menu-enter-active
        transform-origin 50% 0
        transition all .3s


    .menu
        font-size 12px
        width 120px
        padding 4px 5px
        border-radius 4px
        border 1px solid #ccc
        background #fff
        box-shadow 2px 2px 2px  #789
        position fixed
        display flex
        flex-direction column
        .menu-item
            height 30px
            line-height 30px
            text-align center
            cursor pointer
            &:hover
                background rgba(152, 160, 172, 0.37)
            &:not(:last-child)
                border-bottom 1px solid #ccc

</style>
