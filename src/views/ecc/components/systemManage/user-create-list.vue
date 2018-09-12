<template>
  <div class="main">
    <div class='header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>项目用户</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>创建用户</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="ar-tab-nav">
      <router-link :to="{ name: 'user-create'}" @click.native = "state = 1">单个创建</router-link>
      <router-link :to="{ name: 'user-multi-create'}" @click.native = "state = 2">批量创建</router-link>
    </div>
    <div>
      <transition enter-active-class="fade-in" leave-active-class="leave-immediately"
                  :duration="{ enter: 300, leave: 100 }">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { setCookie, getCookie } from '@/utils/util.js';
export default {
  data () {
    return {
      plateName: getCookie('plateName'),
      state: 1
    }
  }
}
</script>

<style lang="scss" scoped>
  .main {
    padding: 20px;
    .header {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
    }
    > .ar-tab-nav {
      padding-top: 8px;
      overflow: hidden;
      > a {
        display: block;
        float: left;
        width: 106px; height: 44px; line-height: 44px;
        text-align: center;
        cursor: pointer;
        color: #666;
        text-decoration: none !important;
        &.router-link-exact-active {
          color: #0785FD;
          background: #FFF;
          cursor: default;
        }
      }
    }
  }
  .pm-main {
    // background: #fff;
    // padding: 25px 25px 80px 25px;
    // border: 1px solid #E7EAEC;
    // border-top: none;
  }
</style>
