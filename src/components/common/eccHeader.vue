<template>
  <div class="vis-bg-header clearfix">
    <div>&nbsp;</div>
    <h1>应急指挥中心管理系统</h1>
    <ul>
      <li style="padding-left: 16px; cursor: pointer;" @click="loginOut">
        <i>&nbsp;</i>退出登录
      </li>
      <li>
        <span>HI,{{$store.state.loginUser.userName}}</span>
        <img src="../../assets/img/temp/title.png" alt="">
        <ul class="oa-header-uul">
          <li @click="pwdModal = true">
            <span class="st-icons st-icons-pwd"></span>修改密码
          </li>
        </ul>
      </li>
    </ul>
    <el-dialog center :visible.sync="pwdModal" :append-to-body="true" class="oa-pwd-modal" title="修改密码" width="400px" :loading="pwdModalLoading">
      <el-form ref="pwdForm" :model="pwdForm" :rules="rulePwdForm" label-width="120px" style="padding-right: 40px;">
        <el-form-item label="原密码" prop="oldPwd">
          <el-input size="small" type="password" v-model="pwdForm.oldPwd" :maxlength="64"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input size="small" type="password" v-model="pwdForm.newPwd" :maxlength="64"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPwd">
          <el-input size="small" type="password" v-model="pwdForm.confirmPwd" :maxlength="64"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="sureBtn" size="small" @click="pwdModal = false">取 消</el-button>
        <el-button class="noSureBtn" size="small" type="primary" @click="pwdSubmit('pwdForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['title'],
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        let reg = /^[a-zA-Z0-9]{6,32}$/
        if (!reg.test(value)) {
          return callback(new Error('密码长度必须是6位到32位'));
        }
        if (this.pwdForm.confirmPwd !== '') {
          // 对第二个密码框单独验证
          this.$refs.pwdForm.validateField('confirmPwd');
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.pwdForm.newPwd) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    return {
      pwdModal: false,
      pwdModalLoading: false,
      pwdForm: {
        oldPwd: '',
        newPwd: '',
        confirmPwd: ''
      },
      rulePwdForm: {
        oldPwd: [
          {required: true, message: '原密码不能为空', trigger: 'blur'}
        ],
        newPwd: [
          {required: true, message: '新密码不能为空', trigger: 'blur'},
          {type: 'string', min: 6, max: 32, message: '密码长度6-32位', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'}
        ],
        confirmPwd: [
          {required: true, message: '确认密码不能为空', trigger: 'blur'},
          {type: 'string', min: 6, max: 32, message: '密码为6-32个数字或英文字母组合', trigger: 'blur'},
          {validator: validatePassCheck, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    pwdSubmit (name) {
      let _this = this;
      _this.$refs[name].validate((valid) => {
        if (valid) {
          // this.$message.success('提交成功!');
          const params = {
            userName: _this.$store.state.loginUser.userName,
            oldPwd: _this.pwdForm.oldPwd,
            newPwd: _this.pwdForm.newPwd,
            confirmPwd: _this.pwdForm.confirmPwd
          }
          _this.axios.put('A2/authServices/users/user', params).then(function (response) {
            if (response) {
              console.log(response)
              _this.pwdModal = false;
              _this.$message.success('密码修改成功，请重新登录');
              // setCookie(cookieUserId, _this.loginUser.id, -1, '/');
              _this.$store.commit('setToken', {tokenVal: false});
              window.location.href = './ecc.html#/login';
            }
            _this.pwdModalLoading = false;
            setTimeout(function () {
              _this.pwdModalLoading = true;
            }, 200);
          });
        } else {
          _this.pwdModalLoading = false;
          setTimeout(function () {
            _this.pwdModalLoading = true;
          }, 200);
        }
      });
    },
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
            _this.axios.get('A2/authServices/users/logout').then(function (res) {
              if (res) {
              }
              instance.confirmButtonText = '确定';
              instance.confirmButtonLoading = false;
              done();
              // window.location.href = './ecc.html#/login';
              _this.$router.push({name: 'login'});
            }).catch(function () {
              instance.confirmButtonText = '确定';
              instance.confirmButtonLoading = false;
              done();
              // window.location.href = './ecc.html#/login';
              _this.$router.push({name: 'login'});
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
    z-index: 1000;
    position: absolute; top: 0; left: 0;
    width: 100%; height: 62px;
    background-color: #0785FD;
    > div {
      float: left;
      background: url(../../assets/img/aorise-logo.png) center center no-repeat;
      width: 150px; height: 100%;
    }
    > h1 {
      float: left;
      height: 62px; line-height: 62px;
      color: #fff; font-weight: 600; font-size: 16px;
      // padding-left: 20px;
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
        position: relative;
        > img {
          float: left;
          width: 40px; height: 40px;
          border-radius: 50%;
          margin-left: 10px;
        }
        &:hover {
          .oa-header-uul {
            display: block;
          }
          > img {
            // animation: circle 4s linear 0s infinite;
          }
        }
        > span {
          float: left;
          height: 40px; line-height: 40px;
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
  .oa-header-uul {
    display: none;
    padding: 10px 0;
    position: absolute; top: 100%; right: 15px; z-index: 400;
    background-color: #F7F7F7;
    border-radius: 4px;
    min-width: 100px;
    box-shadow: 0 0 2px #eee;
  }
  .oa-header-uul > li {
    height: 32px; line-height: 32px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    transition: background .3s linear 0s;
    color: #666;
    padding: 0 2rem;
    word-break:keep-all; white-space:nowrap;
  }
  .oa-header-uul > li:hover {
    background: #07BAFD;
    color: #fff;
    background: -webkit-linear-gradient(to bottom, #0785FD, #07BAFD);
    background: -moz-linear-gradient(to bottom, #0785FD, #07BAFD);
    background: linear-gradient(to bottom, #0785FD, #07BAFD);
  }

  .oa-header-uul::after {
    border-bottom-color: rgba(0, 0, 0, 0.2);
    content: "";
    display: inline-block;
    position: absolute;
  }
  .oa-header-uul::after {
    right: 40px;
    top: -6px;
    border-bottom: 6px solid #fff;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }
  /deep/ .el-dialog__header {
    background: #F0F0F0 !important;
    text-align: left !important;
    color: #555555;
    font-weight: bold;
    font-size: 16px;
  }
  /deep/  .el-dialog--center .el-dialog__body {
    text-align: center !important;
    padding: 10px 25px 10px;
  }
  .noSureBtn {
    background:#0785FD;
    height:35px;
    color: #fff;
    line-height: 10px;
  }
  .sureBtn {
    border-color:#e5e5e5;
    height:35px;
    line-height: 10px;
    color:#666666;
  }
  /deep/ .el-form-item {
    margin-bottom: 15px;
  }
</style>
