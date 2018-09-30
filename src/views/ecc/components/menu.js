/**
 * Created by ouyang on 2018/9/29.
 */
let menuList = [
  {
    id: '1',
    name: '事件管理',
    icon: 'icon-shijian',
    children: [
      {
        id: '1-1',
        name: '事件管理',
        url: '/main/event/eventList'
      },
      {
        id: '1-2',
        name: 'APP端民众互助管理',
        url: '/main/event/mutualPerson'
      }
    ]
  },
  {
    id: '2',
    name: '调度指挥',
    icon: 'icon-jiankong',
    children: [
      {
        id: '2-1',
        name: '调度指挥',
        url: '/main/ctc/ctcList'
      }
    ]
  },
  {
    id: '3',
    name: '应急库',
    icon: 'icon-yingjiyuan',
    children: [
      {
        id: '3-1',
        name: '预案管理',
        url: '/main/emergency/planList'
      },
      {
        id: '3-2',
        name: '物资管理',
        url: '/main/emergency/materialList'
      }
    ]
  },
  {
    id: '4',
    name: '消息管理',
    icon: 'icon-xiaoxi',
    children: [
      {
        id: '4-1',
        name: '公告管理',
        url: '/main/notice'
      },
      {
        id: '4-2',
        name: '系统消息',
        url: '/main/system'
      }
    ]
  },
  {
    id: '6',
    name: '调度指挥(联动单位)',
    icon: 'icon-jiankong',
    children: [
      {
        id: '6-1',
        name: '调度指挥',
        url: '/main/linkage/linkageList'
      }
    ]
  },
  {
    id: '5',
    name: '系统管理',
    icon: 'icon-xitong',
    children: [
      {
        id: '5-1',
        name: '组织架构',
        url: '/main/systemManage/organList'
      },
      {
        id: '5-2',
        name: '项目用户',
        url: '/main/systemManage/user/user-list'
      },
      {
        id: '5-3',
        name: '角色管理',
        url: '/main/systemManage/roleList'
      },
      {
        id: '5-4',
        name: '权限管理',
        url: '/main/systemManage/authority'
      },
      {
        id: '5-5',
        name: '版本更新',
        url: '/main/systemManage/version'
      }
    ]
  }
]
