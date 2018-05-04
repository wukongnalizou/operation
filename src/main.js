// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
// import { asyncRouterMap, constantRouterMap } from './router'
import './style/stylus/index.styl'
// import './permission.js'
// import '../theme/index.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (to.path == '/login') {
    // sessionStorage.removeItem('user');
    // sessionStorage.removeItem('token');
    store.commit('LOGOUT')
  }
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})
const vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
