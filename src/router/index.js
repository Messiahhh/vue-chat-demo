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
            name: 'index',
            path: '/',
            component: index,
        },
        {
            name: 'signup',
            path: '/signup',
            component: signup,
        },
        {
            name: 'signin',
            path: '/signin',
            component: signin,
        },

    ]
})
