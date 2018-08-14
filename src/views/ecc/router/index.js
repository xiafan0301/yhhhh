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
import mutualPerson from '@/views/ecc/components/event/mutualPerson.vue'
// 调度指挥
import ctcList from '@/views/ecc/components/ctc/ctcList.vue'
// 应急库
import emergency from '@/views/ecc/components/emergency/emergency.vue'
import emergencyPlanList from '@/views/ecc/components/emergency/planList.vue'
import emergencyAddPlan from '@/views/ecc/components/emergency/addPlan.vue'
import emergencyMaterialList from '@/views/ecc/components/emergency/materialList.vue'
import emergencyAddWarehouse from '@/views/ecc/components/emergency/warehouse.vue'
import emergencySeeWarehouse from '@/views/ecc/components/emergency/seehouse.vue'
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
          path: 'emergency',
          component: emergency,
          children: [
            {path: 'planList', name: 'emergency-planList', component: emergencyPlanList},
            {path: 'addPlan', name: 'emergency-addPlan', component: emergencyAddPlan},
            {path: 'materialList', name: 'emergency-materialList', component: emergencyMaterialList},
            {path: 'addWarehouse', name: 'emergency-addWarehouse', component: emergencyAddWarehouse},
            {path: 'seeWarehouse', name: 'emergency-seeWarehouse', component: emergencySeeWarehouse}
          ]
        },
        {
          path: 'system',
          component: system,
          name: 'system'},
        {
          path: 'event',
          component: event,
          children: [
            {path: 'eventList', name: 'event-list', component: eventList},
            {path: 'addEvent', name: 'add-event', component: addEvent},
            {path: 'addMsg', name: 'add-message', component: addMsg},
            {path: 'eventDetail', name: 'event-detail', component: eventDetail},
            {path: 'mutualPerson', name: 'mutual-person', component: mutualPerson}
          ]
        },
        {
          path: 'ctc',
          component: ctcList,
          children: [
            {path: '', name: 'ctc-list', component: ctcList}
          ]
        }
      ]
    }
  ]
})
