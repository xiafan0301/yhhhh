<template>
  <div class="vis-bg-menu">
    <div class="bg-mu-t"></div>
    <ul class="bg-mu-u">
      <li class="bg-mu-li-sed">
        <router-link :to="{ name: 'page'}" class="as-ellipsis">
          <i class="bg-mu-icon bg-mu-icon1"></i>页面管理
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'plate-list'}" class="as-ellipsis">
          <i class="bg-mu-icon bg-mu-icon2"></i>板块管理
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'data'}" class="as-ellipsis">
          <i class="bg-mu-icon bg-mu-icon3"></i>数据维护
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'style'}" class="as-ellipsis">
          <i class="bg-mu-icon bg-mu-icon4"></i>样式维护
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'cas'}" class="as-ellipsis">
          <i class="bg-mu-icon bg-mu-icon4"></i>视频监控
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      menuType: 1
    }
  },
  mounted () {
  },
  methods: {}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .vis-bg-menu {
    > .bg-mu-u {
      > li {
        cursor: pointer;
        > a {
          position: relative;
          width: 100%; height: 60px; line-height: 60px;
          padding-left: 45px;
          color: #B0CBF9; font-weight: bold;
          display: block;
          &:hover {
            text-decoration: none;
            color: #fff;
          }
          &.router-link-active {
            background-color: #0785FD;
            cursor: default;
            color: #fff;
          }
        }
      }
    }
    > .bg-mu-t {
      height: 62px;
      background: url(../../assets/img/aorise-logo.png) center center no-repeat;
    }
    .bg-mu-icon {
      position: absolute; top: 50%; left: 20px;
      margin-top: -12px;
      display: inline-block;
      width: 20px; height: 22px;
      background-repeat: no-repeat;
      background-position: center center;
      /* -webkit-background-size: 100% 100%;
      background-size: 100% 100%; */
      &.bg-mu-icon1 { background-image: url(../../assets/img/icons/bg-icon-011.png); }
      &.bg-mu-icon2 { background-image: url(../../assets/img/icons/bg-icon-012.png); }
      &.bg-mu-icon3 { background-image: url(../../assets/img/icons/bg-icon-013.png); }
      &.bg-mu-icon4 { background-image: url(../../assets/img/icons/bg-icon-014.png); }
    }
    .router-link-active, .bg-mu-u > li > a:hover{
      .bg-mu-icon1 { background-image: url(../../assets/img/icons/bg-icon-011s.png); }
      .bg-mu-icon2 { background-image: url(../../assets/img/icons/bg-icon-012s.png); }
      .bg-mu-icon3 { background-image: url(../../assets/img/icons/bg-icon-013s.png); }
      .bg-mu-icon4 { background-image: url(../../assets/img/icons/bg-icon-014s.png); }
    }
  }
</style>
