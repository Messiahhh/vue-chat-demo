<template >
    <div class="slideBar">
        <h4>在线人数 {{userNum}}</h4>
        <p v-for='user in userList'>{{user}}</p>
    </div>
</template>

<script>
export default {
    name: 'sidebar',
    props: ['socket'],
    data: function () {
        return {
            userList: [],
        }
    },
    computed: {
        userNum() {
            return this.userList.length
        }
    },
    created() {
        this.socket.on('login', data => {
            let arr = []
            data.forEach((item, index) => {
                arr.push(item.user)
            })
            this.userList = arr
        })

        this.socket.on('logout', data => {
            console.log(data)

            let user = data[0].user
            this.userList.forEach((item, index) => {
                if (item === user) {
                    this.userList.splice(index, 1)
                }
            })
        })
    }
}

</script>

<style lang="stylus" scoped>
.slideBar
    flex-basis 260px
    height 100vh
    overflow auto
    background pink
    h4
        text-align center
</style>
