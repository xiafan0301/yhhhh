import Vue from 'vue'
import Router from 'vue-router'

// 主要
import main from '@/components/main.vue'
import mainDefault from '@/views/index/components/default.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: main,
      children: [
        {path: '', component: mainDefault},
        {path: ':pageId', name: 'vis-page', component: mainDefault}
      ]
    }
  ]
})
