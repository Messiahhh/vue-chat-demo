import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import signin from '@/components/signin'
import signup from '@/components/signup'
import profile from '@/components/sub/profile'
import room from '@/components/sub/room'

// 代码测试
import test from '@/components/test'
let a = () => import(/* webpackChunkName: "test" */'@/components/a')
let b = () => import('@/components/b')


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
                    name: 'room',
                    path: '',
                    component: room,
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
            path: '/test',
            component: test,
            children: [
                {
                    path: 'a',
                    component: a
                },
                {
                    path: 'b',
                    component: b
                }
            ]
        }

    ]
})
