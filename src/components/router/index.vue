<template lang="html">
    <div class="container">
        <sidebar :socket='socket'></sidebar>
        <container :socket='socket'></container>
    </div>
</template>

<script>
import sidebar from '../sidebar'
import container from '../container'
export default {
    data: function () {
        return {
            user: this.$route.query.user,
            comment: '',
            items: [],
            socket: {},
        }
    },
    components: {
        sidebar,
        container,
    },
    methods: {
        submit() {
            // this.socket.emit('chat', {data: this.comment})
        }
    },
    created() {
        this.socket = io()
        this.socket.emit('login', {user: this.user})

    }


}
</script>

<style lang="stylus">
.container
    display flex
    height 100vh
</style>
