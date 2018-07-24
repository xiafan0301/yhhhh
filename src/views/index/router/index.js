import Vue from 'vue'
import Router from 'vue-router'

// 主要
import main from '@/components/main.vue'
import mainDefault from '@/views/index/components/default.vue'
// page
import data from '@/views/index/components/data/data.vue'
import page from '@/views/index/components/page/page.vue'
import plate from '@/views/index/components/plate/plate.vue'
import style from '@/views/index/components/style/style.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: main,
      children: [
        {path: '', component: mainDefault},
        {path: 'data', name: 'data', component: data},
        {path: 'page', name: 'page', component: page},
        {path: 'plate', name: 'plate', component: plate},
        {path: 'style', name: 'style', component: style}
      ]
    }
  ]
})
