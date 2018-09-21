import Vue from 'vue'
import Router from 'vue-router'

// 主要
import login from '@/views/index/components/login.vue'
import main from '@/components/main.vue'
// import mainDefault from '@/views/index/components/default.vue'
// page
import data from '@/views/index/components/data/data.vue'
import page from '@/views/index/components/page/page.vue'
import zx from '@/views/index/components/data/zx-Image-view.vue'
// plate
import plate from '@/views/index/components/plate/plate.vue'
import plateList from '@/views/index/components/plate/list.vue'
import plateAdd from '@/views/index/components/plate/addPlate.vue'
import plateEdit from '@/views/index/components/plate/editPlate.vue'
import style from '@/views/index/components/style/style.vue'
// cas
import cas from '@/views/index/components/cas/cas.vue'

import drawEdge from '@/views/index/components/map/drawEdge.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      component: main,
      children: [
        {path: '', redirect: {name: 'page'}},
        {path: 'data', name: 'data', component: data},
        {path: 'page', name: 'page', component: page},
        {path: 'zx', name: 'zx', component: zx},
        {
          path: 'plate',
          component: plate,
          children: [
            {path: '', name: 'plate-list', component: plateList},
            {path: 'add/:plateId', name: 'plate-add', component: plateAdd},
            {path: 'edit/:plateId', name: 'plate-edit', component: plateEdit}
          ]
        },
        { path: 'style', name: 'style', component: style },
        { path: 'cas', name: 'cas', component: cas },
        { path: 'drawEdge', name: 'drawEdge', component: drawEdge }
      ]
    }
  ]
})
