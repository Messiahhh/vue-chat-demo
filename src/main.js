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
        user: {
            id: '',
            usr: '',
            imgUrl: '',
        },
        userList: {},
        socket: {},
    },
    mutations: {
        initSocket(state) {
            state.socket = io()
        },

        initState(state, obj) {
            state.user = obj

        },

        updateUserList(state, data) {
            state.userList = data.userList
        },

        deleteUser(state, data) {
            let obj = {...state.userList}
            delete obj[data]
            state.userList = obj
        },
    }
})
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
