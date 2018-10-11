<template>
  <div class="vis-bg-login">
    <div class="bg-login">
      <h1>XUPU SMART CITY</h1>
      <h2>溆浦县智慧城市运营管理系统</h2>
      <el-form style="padding: 0 60px;" :inline="false" ref="loginForm" :model="loginForm" :rules="loginFormRules" class="xs-lg-form">
        <el-form-item prop="userName">
          <el-input v-model="loginForm.userName" placeholder="请输入用户名" @keyup.enter.native="loginSubmit('loginForm')">
            <i class="oa-login-ibg oa-login-ibg1" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="userPassword">
          <el-input v-model="loginForm.userPassword" :type="'password'" placeholder="请输入密码" @keyup.enter.native="loginSubmit('loginForm')">
            <i class="oa-login-ibg oa-login-ibg2" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%;" type="primary" :disabled="!loginForm.userName || !loginForm.userPassword" class="xs-lg-btn" size="" @click="loginSubmit('loginForm')" :loading="loginBtnLoading">登&nbsp;录</el-button>
        </el-form-item>
      </el-form>
      <p>后台管理系统@copyrightXXX</p>
    </div>
  </div>
</template>
<script>
import { cookieUserId, cookieUserName, cookieTime } from '@/config/config.js';
import { setCookie, getCookie } from '@/utils/util.js';
export default {
  data () {
    return {
      loginForm: {
        userName: '',
        userPassword: ''
      },
      loginBtnLoading: false,
      loginFormRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        userPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
  },
  mounted () {
    let _this = this;
    $(window).on('keyup', function (event) {
      if (event && event.keyCode === 13) {
        _this.loginSubmit('loginForm');
      }
    });
  },
  methods: {
    loginSubmit (formName) {
      let _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          // 登陆中 登录按钮不可用
          _this.loginBtnLoading = true;
          let params = this.loginForm;
          _this.axios.post('/authServices/login?' + $.param(params)).then(function (response) {
            if (response) {
              let oUser = response.data;
              setCookie(cookieUserId, oUser.authUserId, cookieTime, '/');
              // 保存用户姓名到cookie
              setCookie(cookieUserName, oUser.userName, cookieTime, '/');
              _this.$store.commit('setLoginUser', {loginUser: {
                userId: oUser.authUserId,
                userName: oUser.userName
              }});
              _this.$router.push({name: 'page'});
            }
            _this.loginBtnLoading = false;
          }).catch(function () {
            _this.loginBtnLoading = false;
          });
        } else {
          return false;
        }
      });
    }
  },
  destroyed () {
    $(window).off('keyup');
  }
}
</script>
<style lang="scss" scoped>
  .vis-bg-login {
    width: 100%; height: 100%;
    position: relative;
    background: url(../../../assets/img/login/lg-bg.png) center center no-repeat #000;
  }
  .bg-login {
    position: absolute; top: 50%; left: 50%;
    margin-top: -250px; margin-left: -220px;
    width: 440px; height: 500px;
    border-radius:8px;
    background-color: #fff;
    box-shadow:1px 2px 14px rgba(2,35,68,0.53);
    > h1 {
      text-align: center;
      font-size: 36px; color: #1F2B5D; font-weight: 600;
      padding-top: 50px; padding-bottom: 10px;
    }
    > h2 {
      text-align: center;
      font-size: 20px; color: #022344;
      padding-bottom: 50px;
    }
    > .bg-login-li {
      position: relative;
      padding: 0 60px;
    }
    > p {
      color: #999;
      text-align: center;
    }
  }
  @-webkit-keyframes bgScale {
    0% { -webkit-background-size: 100%; background-size: 100%; }
    30% { -webkit-background-size: 130%; background-size: 130%; }
    50% { -webkit-background-size: 130%; background-size: 130%; }
    80%{ -webkit-background-size: 100%; background-size: 100%; }
    100%{ -webkit-background-size: 100%; background-size: 100%; }
  }
  @keyframes bgScale {
    0% { -webkit-background-size: 100%; background-size: 100%; }
    30% { -webkit-background-size: 130%; background-size: 130%; }
    50% { -webkit-background-size: 130%; background-size: 130%; }
    80%{ -webkit-background-size: 100%; background-size: 100%; }
    100%{ -webkit-background-size: 100%; background-size: 100%; }
  }
</style>
