<style lang="stylus">

</style>


<template lang="html">
    <div class="">
        <el-input placeholder="请输入你的昵称" v-model="usr"></el-input>
        <el-input placeholder="请输入你的密码" v-model="pwd"></el-input>
        <el-button :type='type' :loading="loading" :disabled='disabled' @click='submit'>{{ message }}</el-button>
        <router-link :to="{ name: 'signin' }">toggle</router-link>
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
            message: '注册',
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
            let res = await axios.post('/signup', {
                usr: this.usr,
                pwd: this.pwd,
            })
            if (res.data.status === 404) {
                //假装加载很久
                setTimeout(() => {
                    this.type = 'danger'
                    this.loading = false
                    this.message = res.data.message
                }, 1000)
            }
            else {
                this.$message('即将跳转登陆页')
                setTimeout(() => {
                    this.type = 'success'
                    this.loading = false
                    this.message = res.data.message
                    this.$router.push({path: '/signin'})
                }, 1000)
            }
        },
    }

}
</script>
