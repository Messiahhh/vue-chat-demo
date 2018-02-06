<style lang="stylus">
@import '../../assets/css/global.styl'
.slideBar
    flex-basis 280px
    background themeColor
    h4
        text-align center
        color #fff
    p
        text-align center
</style>

<template lang="html">
    <div class="slideBar">
        <h4>在线人数 {{count}}</h4>
        <p v-for='user in userList'>{{user.usr}}</p>
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
            return this.userList.length
        }
    }
}
</script>
