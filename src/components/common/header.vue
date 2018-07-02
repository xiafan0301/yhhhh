<template>
  <div class="vis-bg-header clearfix">
    <h1>智慧城市运营管理系统</h1>
    <ul>
      <li style="padding-left: 16px; cursor: pointer;">
        <i>&nbsp;</i>退出登录
      </li>
      <li>
        HI,admin
      </li>
      <li>
        <img src="../../assets/img/temp/photo.png" alt="">
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['title'],
  data () {
    return {}
  },
  methods: {}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .vis-bg-header {
    position: absolute; top: 0; left: 0;
    width: 100%; height: 62px;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 0 3px #ccc;
    > h1 {
      float: left;
      height: 61px; line-height: 61px;
      color: #333; font-weight: 600; font-size: 16px;
      padding-left: 20px;
    }
    > ul {
      float: right;
      margin: 10px 20px 0 0;
      height: 40px;
      > li {
        position: relative;
        float: left;
        line-height: 40px;
        margin-left: 20px;
        color: #666; font-size: 14px;
        > img {
          width: 40px; height: 40px;
          border-radius: 50%;
        }
        > i {
          position: absolute; left: 0; top: 50%;
          margin-top: -6px;
          display: inline-block;
          width: 12px; height: 12px;
          background: url(../../assets/img/icons/bg-icon-loginout.png) center center no-repeat;
        }
      }
    }
  }
</style>
