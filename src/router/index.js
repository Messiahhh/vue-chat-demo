import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/router/index'
import signin from '@/components/router/signin'
import signup from '@/components/router/signup'
Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            component: index,
        },
        {
            path: '/signup',
            component: signup,
        },
        {
            path: '/signin',
            component: signin,
        },

    ]
})
