import Vue from 'vue'
import Router from 'vue-router'

// 主要
import login from '@/views/index/components/login.vue'
import main from '@/components/main.vue'
// import mainDefault from '@/views/index/components/default.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: main
    }
  ]
})
