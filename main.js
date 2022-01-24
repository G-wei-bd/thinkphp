//uni-app的入口文件，主要作用是初始化vue实例、定义全局组件、使用需要的插件如vuex。
import App from './App'

// #ifndef VUE3
import Vue from 'vue'
// 引入 vuex
import store from "./store"
// 把 vuex 定义成全局组件
Vue.prototype.$store = store
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app
  }
}
// #endif