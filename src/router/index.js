import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import signin from '@/components/signin'
import signup from '@/components/signup'
import profile from '@/components/sub/profile'
import group from '@/components/sub/group'
import test from '@/components/test'
Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            component: index,
            children: [
                {
                    name: 'profile',
                    path: '/profile/:usr',
                    component: profile,
                    props: true,
                },
                {
                    name: 'group',
                    path: '',
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
        {
            'path': '/test',
            component: test,
        }

    ]
})
