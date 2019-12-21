<template lang="html">
    <div class="">

        <button type="button" @click="toA">toA</button>
        <button type="button" @click="toB">toB</button>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: "测试页面"
        }
    },
    methods: {
        toA() {
            this.$router.push({ path : "/test/a"})
        },
        toB() {
            this.$router.push({ path : "/test/b"})
        }
    }

}
</script>
