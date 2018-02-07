<style lang="stylus">
@import '../../assets/css/global.styl'
.slideBar
    flex-basis 280px
    padding 0 30px
    background greyColor
    border-right 1px solid themeColor
    .image
        width 200px
        height 200px
        border-radius 50%
        margin 25px auto
        border 5px solid #fff
        background-repeat no-repeat
        background-size cover
        .changeImage
            width 100%
            height 100%
            border-radius 50%
            position relative
            input
                width 100%
                height 100%
                opacity 0
                position relative
                cursor pointer
            i
                position absolute
                top 50%
                left 50%
                transform translate(-50%, -50%)
                font-size 32px
                color #fff
                display none
        &:hover .changeImage
            border 5px solid rgb(231, 98, 129)
            background rgba(0, 0, 0, .45)
            cursor pointer
            i
                display block
    .infoPage
        width 220px
        height 400px
        background pink
        margin 10px auto
    .editPage
        width 220px
        height 400px
        background red
        margin 10px auto
</style>

<template lang="html">
    <div class="slideBar">
        <div class="image" :style="{backgroundImage: 'url(' + imgUrl + ')'}">
            <div class="changeImage" v-if='isEditing'>
                <input type="file" class='upload' @change="changeFile">
                <i class='el-icon-picture'></i>
            </div>
        </div>
        <template v-if='!isEditing'>
            <div class="infoPage">

            </div>
            <el-button type='primary' @click='changeState' style="margin: 0 auto;display: block;">修改个人资料</el-button>
        </template>
        <template v-else>
            <div class="editPage"  v-if='isEditing'>

            </div>
            <el-button type='primary' @click='uploadImage' style="margin: 0 auto;display: block;" plain>完成</el-button>
        </template>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            isEditing: false,
            previewUrl: '',
        }
    },

    computed: {
        user() {
            return this.$store.state.user
        },

        imgUrl() {
            if (this.previewUrl === '') {
                return this.user.imgUrl
            }
            else {
                return this.previewUrl
            }
        }

    },

    methods: {
        changeState() {
            this.isEditing = !this.isEditing
        },

        changeFile(e) {
            let file = e.target.files[0]
            let reader = new FileReader()
            reader.addEventListener('load', () => {
                this.previewUrl = reader.result
            })
            reader.readAsDataURL(file)
        },

        async uploadImage() {
            let input = document.querySelector('.upload')
            let file = input.files[0]
            let fd = new FormData()
            fd.append('file', file)
            fd.append('usr', this.user.usr)
            let res = await axios({
                url: '/upload',
                method: 'post',
                data: fd,
            })
            if (res.data.status === 200) {
                this.$cookie.set('imgUrl', res.data.imgUrl)
                location.reload()
            }
        },


    }
}
</script>
