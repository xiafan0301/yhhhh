<template>
  <div class="bg-ecc-menu">
    <!-- <div class="bg-mu-t"></div> -->
    <div class="bg-mu-u">
      <div class="bg-mu-uc">
        <el-menu
          :router="true"
          :default-active="menuActive"
          class="el-menu-vertical-demo">
          <el-submenu :index="item.id" v-for="(item, index) in menuList" :key="'ml' + index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
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
export default {
  components: {},
  data () {
    return {
      menuType: 1,
      menuActive: null,
      menuList: [
        {
          id: '1',
          name: '事件管理',
          icon: 'el-icon-setting',
          children: [
            {
              id: '1-1',
              name: '事件管理',
              url: '/event/eventList'
            },
            {
              id: '1-2',
              name: 'APP端民众互助管理',
              url: '/event/mutualPerson'
            }
          ]
        },
        {
          id: '2',
          name: '调度指挥',
          icon: 'el-icon-location',
          children: [
            {
              id: '2-1',
              name: '调度指挥',
              url: '/ctc/ctcList'
            }
          ]
        },
        {
          id: '3',
          name: '应急库',
          icon: 'el-icon-phone-outline',
          children: [
            {
              id: '3-1',
              name: '预案管理',
              url: '/emergency/planList'
            },
            {
              id: '3-2',
              name: '物资管理',
              url: '/emergency/materialList'
            }
          ]
        },
        {
          id: '4',
          name: '消息管理',
          icon: 'el-icon-news',
          children: [
            {
              id: '4-1',
              name: '公告管理',
              url: '/notice'
            },
            {
              id: '4-2',
              name: '系统消息',
              url: '/system'
            }
          ]
        }
      ]
    }
  },
  mounted () {
  },
  methods: {}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .ecc-menu {
  }
  .bg-ecc-menu {
    height: 100%;
    position: relative;
    > .bg-mu-t {
      position: absolute; top: 0; left: 0;
      width: 100%; height: 62px;
      // background: url(../../../assets/img/aorise-logo.png) center center no-repeat;
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
  }
</style>
