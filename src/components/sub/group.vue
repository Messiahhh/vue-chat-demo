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
        <p v-for='item,index in userList'>{{item.usr}}</p>
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
        }
    }
}
</script>
