<style lang="stylus">

</style>


<template lang="html">
    <div class="">
        <el-input placeholder="请输入你的昵称" v-model="usr"></el-input>
        <el-input placeholder="请输入你的密码" v-model="pwd"></el-input>
        <el-button :type='type' :loading="loading" :disabled='disabled' @click='submit'>{{ message }}</el-button>
        <router-link :to="{ name: 'signup' }">toggle</router-link>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            usr: '',
            pwd: '',
            type: 'primary',
            message: '登陆',
            loading: false,
        }
    },
    computed: {
        disabled() {
            return !this.usr.length||!this.pwd.length
        }
    },
    methods: {
        async submit() {
            this.loading = true
            let res = await axios.post('/signin', {
                usr: this.usr,
                pwd: this.pwd,
            })
            if (res.data.status === 200) {
                this.$message('即将跳转主页')
                setTimeout(() => {
                    this.type = 'success'
                    this.loading = false
                    this.message = res.data.message
                    this.$router.push({name: 'profile', params: {usr: res.data.usr}})
                }, 1000)
            }
            else {
                setTimeout(() => {
                    this.type = 'danger'
                    this.loading = false
                    this.message = res.data.message
                }, 1000)
            }
        }
    }

}
</script>
