<style lang="stylus">

</style>


<template lang="html">
    <div class="">
        <el-input placeholder="请输入你的昵称" v-model="usr"></el-input>
        <el-input placeholder="请输入你的密码" v-model="pwd"></el-input>
        <el-button :type='type' :loading="loading" @click='submit'>{{ message }}</el-button>
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
            loading: false,
            message: '提交',
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
                this.type = 'danger'
                this.loading = false
                this.message = '提交失败'
            }
        },

        submitTest() {
            this.loading = true
            setTimeout(() => {
                this.type = 'success'
                this.loading = false
                this.message = '提交失败'
            }, 2000)
        }
    }

}
</script>
