import Vue from 'vue'
import Router from 'vue-router'

// 主要
import main from '@/views/ecc/components/main.vue'
// 消息管理
import notice from '@/views/ecc/components/notice/notice.vue'
import system from '@/views/ecc/components/notice/system.vue'
import noticeRelease from '@/views/ecc/components/notice/release.vue'
import noticeSee from '@/views/ecc/components/notice/see.vue'
import noticeAtmanagementList from '@/views/ecc/components/notice/noticeAtmanagementList.vue'
import noticeModify from '@/views/ecc/components/notice/modify.vue'
// 事件管理
import event from '@/views/ecc/components/event/event.vue'
import eventList from '@/views/ecc/components/event/eventList.vue'
import addEvent from '@/views/ecc/components/event/addEvent.vue'
import addMsg from '@/views/ecc/components/event/addMsg.vue'
import eventDetail from '@/views/ecc/components/event/eventDetail.vue'
import eventEnd from '@/views/ecc/components/event/eventEnd.vue'
import unreatedEvent from '@/views/ecc/components/event/unreatedEvent.vue'
import mutualPerson from '@/views/ecc/components/event/mutualPerson.vue'
import mutualDetail from '@/views/ecc/components/event/mutualDetail.vue'
// 调度指挥
import ctc from '@/views/ecc/components/ctc/ctc.vue'
import ctcList from '@/views/ecc/components/ctc/ctcList.vue'
import ctcDetail from '@/views/ecc/components/ctc/ctcDetail.vue'
import rePlanList from '@/views/ecc/components/ctc/rePlanList.vue'
import replanDetail from '@/views/ecc/components/ctc/replanDetail.vue'
Vue.use(Router);

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
            {path: '', name: 'notice-atmanagementList', component: noticeAtmanagementList},
            {path: 'release', name: 'notice-release', component: noticeRelease},
            {path: 'modify', name: 'notice-modify', component: noticeModify},
            {path: 'see', name: 'notice-see', component: noticeSee}
          ]
        },
        {
          path: 'system',
          component: system,
          name: 'system',
          children: [
            {path: '', name: 'notice-atmanagementList', component: noticeAtmanagementList},
            {path: 'release', name: 'notice-release', component: noticeRelease},
            {path: 'modify', name: 'notice-modify', component: noticeModify}
          ]
        },
        {
          path: 'event',
          component: event,
          children: [
            {path: 'eventList', name: 'event-list', component: eventList},
            {path: 'addEvent', name: 'add-event', component: addEvent},
            {path: 'addMsg/:status', name: 'add-message', component: addMsg},
            {path: 'eventDetail', name: 'event-detail', component: eventDetail},
            {path: 'eventEnd', name: 'event-end', component: eventEnd},
            {path: 'unreatedEvent', name: 'event-untreated', component: unreatedEvent},
            {path: 'mutualPerson', name: 'mutual-person', component: mutualPerson},
            {path: 'mutualDetail', name: 'mutual-detail', component: mutualDetail}
          ]
        },
        {
          path: 'ctc',
          component: ctc,
          children: [
            {path: 'ctcList', name: 'ctc-list', component: ctcList},
            {path: 'ctcDetail', name: 'ctc-detail', component: ctcDetail},
            {path: 'rePlanList', name: 'replan-list', component: rePlanList},
            {path: 'replanDetail', name: 'replan-detail', component: replanDetail}
          ]
        }
      ]
    }
  ]
})
