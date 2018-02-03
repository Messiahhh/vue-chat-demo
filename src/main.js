// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueCookie from 'vue-cookie'
import Vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css'
import io from 'socket.io-client'

Vue.config.productionTip = true
Vue.use(ElementUI)
Vue.use(VueCookie)
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        name: '',
        userList: [],
        socket: {},
    },
    mutations: {
        changeName(state, val) {
            state.name = val
        },
        initSocket(state) {
            state.socket = io()
        },
        updateUserList(state, data) {
            let arr = []
            data.userList.forEach((item, index) => {
                arr.push(item.name)
            })
            state.userList = arr
        },
        deleteUser(state, data) {
            state.userList.forEach((item, index) => {
                if (item === data.name) {
                    state.userList.splice(index, 1)
                }
            })
        },
    }
})
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
