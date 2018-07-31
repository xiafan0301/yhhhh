<template>
  <div class="vis-bg-header clearfix">
    <div>&nbsp;</div>
    <h1>智慧城市运营管理系统</h1>
    <ul>
      <li style="padding-left: 16px; cursor: pointer;" @click="loginOut">
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
  methods: {
    loginOut () {
      let _this = this;
      _this.$msgbox({
        title: '退出提示',
        message: '确定退出登录吗？',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '正在退出...';
            // ajax
            _this.axios.post('/authServices/logOut', []).then(function (res) {
              if (res) {
              }
              instance.confirmButtonText = '确定';
              instance.confirmButtonLoading = false;
              done();
              window.location.href = './index.html#/login';
            }).catch(function () {
              instance.confirmButtonText = '确定';
              instance.confirmButtonLoading = false;
              done();
              window.location.href = './index.html#/login';
            });
          } else {
            done();
          }
        }
      }).then(action => {
      });
      // window.location.href = './index.html#/login';
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .vis-bg-header {
    position: absolute; top: 0; left: 0;
    width: 100%; height: 62px;
    background-color: #022344;
    > div {
      float: left;
      background: url(../../assets/img/aorise-logo.png) center center no-repeat;
      width: 200px; height: 100%;
    }
    > h1 {
      float: left;
      height: 62px; line-height: 62px;
      color: #fff; font-weight: 600; font-size: 16px;
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
        color: #fff; font-size: 12px;
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
