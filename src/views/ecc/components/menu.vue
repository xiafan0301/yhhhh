<template>
  <div class="bg-ecc-menu">
    <!-- <div class="bg-mu-t"></div> -->
    <div class="bg-mu-u">
      <div class="bg-mu-uc">
        <el-menu
          :router="true"
          :unique-opened='true'
          :default-active="menuActive"
          @open='selectIndex'
          class="el-menu-vertical-demo">
          <el-submenu :index="item.id" :class="[(index + 1) == isActive ? 'el-submenu-active' : '']" v-for="(item, index) in menuList" :key="'ml' + index">
            <template slot="title">
              <i :class="item.icon" ></i>
              <span style='margin-left:3%'>{{item.name}}</span>
            </template>
            <template v-if="item.children && item.children.length > 0">
              <el-menu-item v-for="(sitem, sindex) in item.children" :key="'sml' + sindex"
                :index="sitem.url">{{sitem.name}}</el-menu-item>
            </template>
          </el-submenu>
        </el-menu>
      </div>
    </div>
  </div>
</template>
<script>
import '@/assets/font/iconfont.css';
export default {
  components: {},
  data () {
    return {
      menuActive: '1',
      menuList: [
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
        // {
        //   id: '5',
        //   name: '调度指挥',
        //   icon: 'icon-xiaoxi',
        //   children: [
        //     {
        //       id: '5-1',
        //       name: '调度指挥',
        //       url: '/linkage/linkageList'
        //     }
        //   ]
        // },
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
            }
          ]
        }
      ],
      isActive: '1'
    }
  },
  mounted () {
  },
  methods: {
    selectIndex (index) {
      this.menuActive = index;
      this.menuList.map((item) => {
        if (index === item.id) {
          this.isActive = index;
        }
      });
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .bg-ecc-menu {
    height: 100%;
    position: relative;
    > .bg-mu-t {
      position: absolute; top: 0; left: 0;
      width: 100%; height: 62px;
    }
    > .bg-mu-u {
      height: 100%;
      padding-top: 62px;
      > .bg-mu-uc {
        height: 100%;
        overflow: auto;
      }
    }
    .router-link-active, .bg-mu-u > li > a:hover{
    }
    .el-submenu-active {
      background: #E6F7FF;
      .el-submenu__title {
        color: #0785FD !important;
      }
      .el-menu {
        background: #E6F7FF;
        .el-menu-item {
          color: #0785FD !important;
        }
        .is-active {
          background: #0785FD;
          color: #fff !important;
        }
      }
      .el-submenu__title i {
        color: #0785FD !important;
      }
      .el-submenu__title span {
        color: #0785FD !important;
      }
    }
    .el-submenu__title span{
      color: #666666 !important;
    }
  }
</style>
