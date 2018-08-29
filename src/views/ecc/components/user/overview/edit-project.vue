<template>
  <div class="pm-main">
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/main/overview' }">{{plateName}}</el-breadcrumb-item>
      <el-breadcrumb-item>编辑项目</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="pa-box">
      <el-form
        ref="form"
        :model="detailData"
        class="pa-box-form"
        label-width="120px"
        :rules="rules">
        <el-form-item label="项目名称" prop="plateName">
          <el-input v-model="detailData.plateName" placeholder="请输入项目名称"/>
        </el-form-item>
        <el-form-item label="关键词" prop="plateNo">
          <el-input v-model="detailData.plateNo" placeholder="请输入项目关键词"/>
        </el-form-item>
        <el-form-item label="项目类型" prop="projectType">
          <el-select
            v-model="detailData.projectType"
            style="width: 100%;"
            clearable
            placeholder="请选择项目类型">
          <el-option label="默认" :value="0"/>
          <el-option label="智慧城市" :value="1"/>
          <el-option label="大数据管理" :value="2"/>
        </el-select>
        </el-form-item>
        <el-form-item label="项目使用机构" prop="useOrgName">
          <el-input v-model="detailData.useOrgName" placeholder="请输入项目使用机构名称"/>
        </el-form-item>
        <el-form-item label="项目负责人" prop="chargeUserName">
          <el-input v-model="detailData.chargeUserName" placeholder="请输入负责人姓名"/>
        </el-form-item>
        <el-form-item label="负责人手机号码" prop="chargeUserPhone">
          <el-input v-model="detailData.chargeUserPhone" placeholder="请输入负责人手机号码作为登录账号"/>
        </el-form-item>
        <el-form-item label="回调地址" prop="redirectUrl">
          <el-input v-model="detailData.redirectUrl  " placeholder="请输入url地址"/>
        </el-form-item>
        <el-form-item label="项目开发公司" prop="developerOrg">
          <el-input v-model="detailData.developerOrg" placeholder="请输入公司名称"/>
        </el-form-item>
        <el-form-item label="开发公司执照">
          <div v-if="detailData.licenseImage" class="corporate-photo">
            <img v-if="detailData.licenseImage.length > 60" :src="detailData.licenseImage" alt="" width="136px" height="98px">
            <img v-else :src="$store.state.imgBaseUrl + detailData.licenseImagePath + '/' + detailData.licenseImage" alt="" width="136px" height="98px">
            <i @click="deletePhoto" class="el-icon-close"></i>
          </div>
          <el-input v-else placeholder="未选择任何文件" disabled>
            <el-upload
              slot="append"
              class="singe-upload"
              :action="$store.state.fileUploadUrl + '/api/network/upload/new'"
              :limit="1"
              :show-file-list="false"
              :on-success="onSelectPhoto">
              <el-button size="small" type="primary">选择文件</el-button>
            </el-upload>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="bottom-btn">
        <span @click="onCancle">取 消</span>
        <span @click="onConfirmAccess">确 认</span>
      </div>
    </div>
  </div>
</template>

<script>
import {checkTel} from '../../../../utils/validator';
import { setCookie, getCookie } from '@/utils/util.js';
export default {
  data () {
    let checkName = (rule, value, callback) => {
      this.axios.get('S2/auth/authServices/plate/isRename', {params: {plateName: value}})
        .then(res => {
          if (res) {
            if (res.data && value !== this.name) {
              callback(new Error('项目名称已被使用'));
            } else {
              callback();
            }
          }
        })
    }
    let checkPlateNo = (rule, value, callback) => {
      let reg = /^[a-zA-Z]+$/;
      if (!reg.test(value)) {
        callback(new Error('关键字只能是英文'));
      }
      if (value.length > 10) {
        callback(new Error('关键字位数须小于十位'));
      }
      this.axios.get('S2/auth/authServices/plate/isReno', {params: {plateNo: value}})
        .then(res => {
          if (res) {
            if (res.data && value !== this.keyword) {
              callback(new Error('此关键字已经存在'));
            } else {
              callback();
            }
          }
        })
    }
    return {
      plateName: getCookie('plateName'),
      detailData: {},
      name: null,
      keyword: null,
      rules: {
        plateName: [
          { required: true, message: '该项内容不可为空' },
          { validator: checkName, trigger: 'blur' }
        ],
        plateNo: [
          { required: true, message: '该项内容不可为空' },
          { validator: checkPlateNo, trigger: 'blur' }
        ],
        // projectType: [{ required: true, message: '该项内容不可为空' }],
        useOrgName: [{ required: true, message: '该项内容不可为空' }],
        chargeUserName: [{ required: true, message: '该项内容不可为空' }],
        chargeUserPhone: [
          { required: true, message: '该项内容不可为空' },
          { validator: checkTel, trigger: 'blur' }
        ],
        // redirectUrl: [{ required: true, message: '该项内容不可为空' }],
        developerOrg: [{ required: true, message: '该项内容不可为空' }]
      }
    }
  },
  created () {
    this.getDetail();
  },
  methods: {
    // 获取详情数据
    getDetail () {
      this.axios.get('S2/auth/authServices/plate/' + getCookie('projectId'))
        .then(res => {
          if (res) {
            this.detailData = res.data;
            this.name = this.detailData.plateName;
            this.keyword = this.detailData.plateNo;
          }
        })
    },
    // 上传公司执照成功时回调
    onSelectPhoto (response, file, fileList) {
      console.log(response);
      this.detailData.licenseImage = response.data.newFileName;
    },
    // 删除公司执照图片
    deletePhoto () {
      this.detailData.licenseImagePath = null;
      this.detailData.licenseImage = null;
    },
    // 确认创建
    onConfirmAccess () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          console.log(this.detailData);
          this.axios.put('S2/auth/authServices/plate', this.detailData)
            .then(res => {
              if (res) {
                this.$message.success('修改成功');
                this.getDetail();
                this.$router.push({name: 'overview'});
              }
            })
        }
      });
    },
    // 取消创建
    onCancle () {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss" scoped>
.pm-main {
  .pa-box {
    background: #FFF;
    margin-top: 5px;
    .pa-box-form {
      padding: 28px 220px;
      /deep/ .el-form-item__label { font-weight: 600; }
      .corporate-photo {
        width: 136px; height: 98px;
        position: relative;
        > i {
          display: inline-block;
          width: 20px; height: 20px;
          line-height: 20px;
          text-align: center;
          background: rgba(0, 0, 0, 0.38);
          color: #fff;
          position: absolute;
          top: 0; right: 0;
          cursor: pointer;
        }
      }
      .retire-page-datepicker {
        width: 100%;
        /deep/ .el-input__prefix {
          right: 5px;
          left: auto;
        }
        /deep/ .el-input__inner {
          padding-left: 15px;
        }
      }
      .retire-page-radio {
        /deep/ .el-radio__input.is-checked .el-radio__inner {
          border-color: #009688;
          background: #009688;
        }
        /deep/ .el-radio__input.is-checked+.el-radio__label {
          color: #606266;
        }
        /deep/ .el-radio__inner:hover {
          border-color: #009688;
        }
      }
      .explain-project {
        font-size: 14px;
        color: #666;
        margin-left: 30px;
      }
      .el-form-item {
        margin-bottom: 28px;
        /deep/ .el-form-item__content {
          width: 80%;
          .el-form-item__error {
            right: -105px;
            top: 11px;
            left: auto;
          }
        }
      }
      .el-form-item.is-required /deep/ .el-form-item__label:before {
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
        display: none;
      }
      .el-form-item.is-required /deep/ .el-form-item__label:after {
        content: '*';
        color: #f56c6c;
        margin-left: 4px;
      }
    }
    .bottom-btn {
      text-align: center;
      padding-bottom: 50px;
      span {
        display: inline-block;
        width: 120px; height: 42px;
        line-height: 42px;
        text-align: center;
        cursor: pointer;
        border-radius:3px;
      }
      span:nth-child(1) {
        border: 1px solid #DBDBDB;
        color: #666;
        margin-right: 20px;
      }
      span:nth-child(2) {
        color: #fff;
        background: #1AB394;
      }
    }
  }
}
</style>
