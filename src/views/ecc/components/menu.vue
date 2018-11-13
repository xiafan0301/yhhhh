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
          <el-submenu :index="(index + 1).toString()" :class="[(index + 1) == isActive ? 'el-submenu-active' : '']" v-for="(item, index) in menuList" :key="'ml' + index">
            <template slot="title">
              <i :class="item.style" ></i>
              <span style='margin-left:3%'>{{item.resourceName}}</span>
            </template>
            <template v-if="item.children && item.children.length > 0">
              <el-menu-item v-for="(sitem, sindex) in item.children" :key="'sml' + sindex"
                :index="sitem.path ? sitem.path : ''">{{sitem.resourceName}}</el-menu-item>
            </template>
          </el-submenu>
        </el-menu>
       <!-- <el-menu
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
        </el-menu> -->
      </div>
    </div>
  </div>
</template>
<script>
import '@/assets/font/iconfont.css';
import { getLocalStore } from '@/utils/util.js';
export default {
  components: {},
  data () {
    return {
      menuActive: '1',
      menuList: [],
      isActive: '1'
    }
  },
  created () {
    let aList = JSON.parse(getLocalStore('userMenuPermission'));
    console.log('menu aList', aList)
    this.menuList = aList;
  },
  mounted () {
  },
  methods: {
    selectIndex (index) {
      this.menuActive = index;
      this.menuList.map((item) => {
        // if (index === item.resourceId) {
        //   console.log('999999')
        this.isActive = index;
        // }
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
        overflow-y:auto;
        overflow-x: hidden;
      }
    }
    .el-submenu-active {
      background: #E6F7FF !important;
      .el-submenu__title {
        color: #0785FD !important;
      }
      .el-menu {
        background: #E6F7FF !important;
        .el-menu-item {
          color: #0785FD !important;
        }
        .is-active {
          background: #0785FD !important;
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
