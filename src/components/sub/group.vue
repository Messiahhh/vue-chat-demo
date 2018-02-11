<style lang="stylus" scoped>
@import '../../assets/css/global.styl'
.slideBar
    height 100%
    overflow auto
    background greyColor
    border-right 1px solid themeColor
    .count
        width 280px
        height 50px
        line-height 50px
        text-align center
        color themeColor
    .users
        display grid
        grid-template-columns 1fr 1fr 1fr
        grid-row-gap 4px
        justify-items center
        .user
            width 90px
            height 100px
            .img
                display block
                width 70px
                height 70px
                margin 5px auto
                background-repeat no-repeat
                background-size cover
            .usr
                text-align center
                font-size 14px
                color #789
</style>

<template lang="html">
    <div class="slideBar" >
        <div class='count'>在线人数 {{count}}</div>
        <div class="users">
            <!-- <div class=""> -->
                <!-- {{userList}} -->
            <!-- </div> -->
            <div class="user" v-for="key,val in userList">
                <router-link :to="{ name: 'profile', params: {usr: userList[val].usr} }"  class="img"  :style="{backgroundImage: `url(${userList[val].imgUrl})`}"></router-link>
                <div class="usr">
                    {{userList[val].usr}}
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    computed: {
        userList() {
            return this.$store.state.userList
        },
        count() {
            return Object.keys(this.userList).length
        },
    },


}
</script>
