<template>
  <div class="main">
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>{{plateName}}</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item v-if="state === 1">用户</el-breadcrumb-item>
      <el-breadcrumb-item v-if="state === 2">用户组</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="ar-tab-nav">
      <router-link :to="{ name: 'user-list'}" @click.native = "state = 1">用户</router-link>
      <router-link :to="{ name: 'group-list'}" @click.native = "state = 2">组</router-link>
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
        color: #333;
        background: #FFF;
        cursor: default;
        border: 1px solid #E7EAEC;
        border-bottom: none;
      }
    }
  }
}
.pm-main {
  background: #fff;
  padding: 25px 25px 80px 25px;
  border: 1px solid #E7EAEC;
  border-top: none;
}
</style>
