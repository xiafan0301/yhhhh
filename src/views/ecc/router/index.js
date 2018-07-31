import Vue from 'vue'
import Router from 'vue-router'

// 主要
import main from '@/views/ecc/components/main.vue'
// 消息管理
import notice from '@/views/ecc/components/notice/notice.vue'
import noticeRelease from '@/views/ecc/components/notice/release.vue'
import noticeList from '@/views/ecc/components/notice/list.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: main,
      children: [
        {
          path: 'notice',
          component: notice,
          children: [
            {path: '', name: 'notice-list', component: noticeList},
            {path: 'release', name: 'notice-release', component: noticeRelease}
          ]
        }
      ]
    }
  ]
})
