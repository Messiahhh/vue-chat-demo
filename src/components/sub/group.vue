<template lang="html">
    <div class="slideBar">
        <h4>在线人数 {{count}}</h4>
        <p v-for='user in userList'>{{user}}</p>
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

<style lang="css">
</style>
