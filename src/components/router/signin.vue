<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' scoped>
themeColor = #409EFF
.login
    width 800px
    height 100vh
    margin 0 auto
    background themeColor
    color #fff
    position relative
    .loginPanel
        text-align center
        width 100%
        height 200px
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        h1
            color #fff
        input
            text-align center
            font-size 22px
            border-bottom 2px solid #fff
            color #fff
            padding-bottom 15px
/* @media screen and (max-width: 640px)
    .login
        width 100vw */
</style>

<template>
    <div class="login">
        <div class="loginPanel">
            <h1>Hello {{name}}</h1>
            <input type="text" v-model='name' @keyup.enter='login' autofocus>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            name: '',
        }
    },
    methods: {
        login() {
            this.$router.push({path: 'index', query: {'name': this.name}})
        }
    },

}
</script>
