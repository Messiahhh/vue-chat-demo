import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import signin from '@/components/signin'
import signup from '@/components/signup'
import profile from '@/components/sub/profile'
import group from '@/components/sub/group'
Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [
        {
            name: 'index',
            path: '/',
            component: index,
            children: [
                {
                    path: 'profile',
                    component: profile,
                },
                {
                    path: 'group',
                    component: group,
                }
            ]
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
