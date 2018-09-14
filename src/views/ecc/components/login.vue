<template>
  <div class="vis-bg-login">
    <div class="bg-login">
      <div class="img-div">
        <img src="../../../assets/img/login/title.png" class="img-title"/>
      </div>
      <el-form style="padding: 0 80px;" :inline="false" ref="loginForm" :model="loginForm" :rules="loginFormRules" class="xs-lg-form">
        <el-form-item prop="userMobile" class="login-form-item">
          <el-input v-model="loginForm.userMobile" placeholder="请输入手机号" @keyup.enter.native="loginSubmit('loginForm')"></el-input>
          <img src="../../../assets/img/login/phone.png" />
        </el-form-item>
        <el-form-item prop="userPassword" class="login-form-item">
          <el-input v-model="loginForm.userPassword" :type="'password'" placeholder="请输入密码" @keyup.enter.native="loginSubmit('loginForm')">
          </el-input>
          <img src="../../../assets/img/login/lock.png" />
        </el-form-item>
        <el-form-item prop="code" class="code-item" style="margin-bottom: 10px">
          <el-input v-model="loginForm.code" :type="'text'" placeholder="请输入验证码" @keyup.enter.native="loginSubmit('loginForm')"></el-input>
          <div class="img-code" @click="changeImg">
            <img class="img-code-box" :src="imgSrc" />
          </div>
        </el-form-item>
        <el-form-item class="login-form-item clearfix">
          <el-checkbox style="color: #999999" v-model="isRemember" @change="changeRemember">记住用户名</el-checkbox>
          <span style="float:right;color:#999999;cursor:pointer" @click="forgetPwd">忘记密码?</span>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%;background:#0785FD;box-shadow:1px 4px 5px 0px rgba(7,133,253,0.38);" type="primary" class="xs-lg-btn" size="" @click="loginSubmit('loginForm')" :loading="loginBtnLoading">登&nbsp;录</el-button>
        </el-form-item>
      </el-form>
      <p style="margin-bottom:80px;color:#999999;font-size:12px;">后台管理系统@copyrightXXX</p>
    </div>
  </div>
</template>
<script>
import { cookieTime, ajaxCtx2 } from '@/config/config.js';
import { setCookie, getCookie, delCookie } from '@/utils/util.js';
import {valiPhone, checkPwd} from '@/utils/validator.js';
export default {
  data () {
    return {
      imgSrc: ajaxCtx2 + '/authServices/users/validCodeImg?' + Math.random(),
      loginForm: {
        userMobile: '',
        userPassword: '',
        code: null
      },
      loginBtnLoading: false,
      isRemember: false, // 是否记住用户名
      loginFormRules: {
        userMobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: valiPhone, trigger: 'blur' }
        ],
        userPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: checkPwd, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
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
    _this.isRemember = Boolean(getCookie('cookieStatus'));
    if (Boolean(getCookie('cookieStatus')) === true) {
      this.loginForm.userMobile = getCookie('cookieUserName');
    } else {
      this.loginForm.userMobile = null;
    }
  },
  methods: {
    loginSubmit (formName) {
      let _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          // 登陆中 登录按钮不可用
          _this.loginBtnLoading = true;
          let params = this.loginForm;
          _this.axios.post('A2/authServices/users/login', params).then(function (response) {
            if (response) {
              let oUser = response.data;
              // 保存用户手机号到cookie
              if (_this.isRemember === true) {
                setCookie('cookieUserName', oUser.userMobile, 24, '/');
                setCookie('cookieStatus', _this.isRemember, 24, '/');
              }
              _this.$store.commit('setLoginUser', {loginUser: {
                userId: oUser.authUserId,
                userName: oUser.userName
              }});
              _this.$router.push({name: 'event-list'});
            }
            _this.loginBtnLoading = false;
          }).catch(function () {
            _this.loginBtnLoading = false;
          });
        } else {
          return false;
        }
      });
    },
    changeRemember (val) {
      this.isRemember = val;
      if (val === false) {
        // setCookie('cookieUserName', oUser.userMobile, 24, '/');
        setCookie('cookieStatus', this.isRemember, -1, '/');
      }
    },
    forgetPwd () {
      this.$router.push({name: 'forget'});
    },
    changeImg () { // 点击更换图片验证码
      const img = ajaxCtx2 + '/authServices/users/validCodeImg?' + Math.random();
      this.imgSrc = img;
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
    background: url(../../../assets/img/login/ecc-bg.png) center center no-repeat #000;
    -webkit-animation: bgScale 60s ease-out both infinite;
    animation: bgScale 60s ease-out both infinite;
  }
  .bg-login {
    position: absolute; top: 50%; left: 50%;
    margin-top: -291px; margin-left: -270px;
    width: 540px;
    height: 582px;
    border-radius:8px;
    background-color: #fff;
    box-shadow:1px 4px 5px 0px rgba(7,133,253,0.38);
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
    .img-div {
      width: 100%;
      text-align: center;
      padding: 40px 0;
      .img-title {
        display: inline-block;
      }
    }
    .login-form-item {
      position: relative;
      img {
        position: absolute;
        left: 10px;
        top: 10px;
      }
    }
    .code-item /deep/ .el-form-item__content{
      display: flex;
      .img-code {
        width: 140px;
        height: 48px;
        cursor:pointer;
        border: 1px dashed #000;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
    .code-item /deep/ .el-input__inner {
      padding: 0 10px;
      width: 250px;
    }
    /deep/ .el-input__inner {
      padding: 0 38px;
    }
    /deep/ .xs-lg-form .el-form-item {
      margin-bottom: 26px;
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
