<template>
  <div class="vis-bg-menu">
    <ul class="bg-mu-u">
      <li class="bg-mu-li-sed">
        <router-link :to="{ name: 'page'}" class="as-ellipsis">
          <i class="bg-mu-icon bg-mu-icon1"></i>页面管理
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'plate-list'}" class="as-ellipsis">
          <i class="bg-mu-icon bg-mu-icon2"></i>版块管理
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'data'}" class="as-ellipsis">
          <i class="bg-mu-icon bg-mu-icon3"></i>地图数据
        </router-link>
      </li>
      <!--<li>
        <router-link :to="{ name: 'style'}" class="as-ellipsis">
          <i class="bg-mu-icon bg-mu-icon4"></i>样式维护
        </router-link>
      </li>-->
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
          width: 100%; height: 62px; line-height: 62px;
          padding-left: 45px;
          color: #666; font-weight: bold;
          display: block;
          text-decoration: none !important;
          border-left: 3px solid #fff;
          &:hover {
            text-decoration: none;
            color: #0785FD;
          }
          &.router-link-active {
            background-color: #E6F7FF;
            cursor: default;
            color: #0785FD;
            border-left-color: #0785FD;
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
