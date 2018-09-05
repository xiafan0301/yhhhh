<template>
  <div class="vis-bg-login">
    <div class="bg-forget">
      <h2 class="find-title">找回密码</h2>
      <p class="find-tip">已有账号,&nbsp;&nbsp;<a href="/views/ecc.html#/login">马上登录</a></p>
      <el-form style="padding: 0 80px 80px 80px;" :inline="false" ref="loginForm" :model="loginForm" :rules="loginFormRules" class="xs-lg-form">
        <el-form-item prop="userMobile" class="login-form-item">
          <el-input v-model="loginForm.userMobile" placeholder="请输入手机号" @keyup.enter.native="loginSubmit('loginForm')"></el-input>
          <i class="el-icon-circle-close" style="color: #0785FD;font-size: 24px;position:absolute;top: 12px;right: 10px"></i>
          <img src="../../../assets/img/login/phone.png" />
        </el-form-item>
        <el-form-item prop="userPassword" class="login-form-item">
          <el-input v-model="loginForm.userPassword" :type="'text'" placeholder="请输入短信验证码" @keyup.enter.native="loginSubmit('loginForm')">
          </el-input>
          <span style="position:absolute;top: 5px;right: 10px;color:#ACAAA7;">|&nbsp;&nbsp;<span style="color: #666666;font-size:14px;cursor:pointer;">发送验证码</span></span>
          <!-- <i class="el-icon-circle-close" style="color: #0785FD;font-size: 24px;position:absolute;top: 12px;right: 10px"></i> -->
          <img src="../../../assets/img/login/msg.png" />
        </el-form-item>
        <el-form-item prop="userPassword" class="login-form-item">
          <el-input v-model="loginForm.userPassword" :type="'password'" placeholder="设置新密码" @keyup.enter.native="loginSubmit('loginForm')"></el-input>
          <i class="el-icon-circle-close" style="color: #0785FD;font-size: 24px;position:absolute;top: 12px;right: 10px"></i>
          <img src="../../../assets/img/login/lock.png" />
        </el-form-item>
        <el-form-item prop="userPassword" class="login-form-item">
          <el-input v-model="loginForm.userPassword" :type="'password'" placeholder="确认新密码" @keyup.enter.native="loginSubmit('loginForm')"></el-input>
          <i class="el-icon-circle-close" style="color: #0785FD;font-size: 24px;position:absolute;top: 12px;right: 10px"></i>
          <img src="../../../assets/img/login/lock.png" />
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%;background:#0785FD;box-shadow:1px 4px 5px 0px rgba(7,133,253,0.38)" type="primary" :disabled="!loginForm.userMobile || !loginForm.userPassword" class="xs-lg-btn" size="" @click="loginSubmit('loginForm')" :loading="loginBtnLoading">修改密码</el-button>
        </el-form-item>
      </el-form>
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
        userMobile: '',
        oldPwd: '',
        newPwd: ''
      },
      loginBtnLoading: false,
      loginFormRules: {
        userMobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        oldPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
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
  .bg-forget {
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
      font-size: 21px;
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
    .find-title {
      width: 100%;
      text-align: center;
      padding: 40px 0 20px 0;
      color: #0785FD;
    }
    .find-tip {
      width: 100%;
      text-align: right;
      color: #D3D3D3;
      font-size: 14px;
      padding-bottom: 40px;
      padding-right: 55px;
      a {
        color: #0785FD;
        text-decoration: none;
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
