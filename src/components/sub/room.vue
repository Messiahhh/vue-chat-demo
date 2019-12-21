<template lang="html" >
    <section>
        <div class="chatroom">
            <div class="roomImg">

            </div>
            <div class="roomName">
                聊天室
            </div>
        </div>
    </section>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
@import '../../assets/css/global.styl'
section
    height 100%
    display flex
    flex-direction column
    border-right 1px solid themeColor
    .chatroom
        flex-basis 80px
        padding 10px
        background #fff
        display flex
        cursor pointer
        &:hover
            background #f1f1f1
        .roomImg
            width 60px
            height 60px
            border-radius 50%
            background-image url('https://pic3.zhimg.com/v2-92031522058fd58f651c3a626c420204_im.jpg')
            background-size cover
            background-repeat no-repeat
            margin-right 15px
        .roomName
            text-align center
</style>
