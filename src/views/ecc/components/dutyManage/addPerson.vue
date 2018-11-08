<template>
  <div class="add-person">
    <div class='header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>值班管理</el-breadcrumb-item>
        <el-breadcrumb-item>人员管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>添加人员</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='add-body'>
      <div class='add-form'>
        <el-form class='form-content' inline-message :model='addForm' :rules='rules' ref='addForm'>
          <el-form-item label="姓名" label-width='150px' prop='userName'>
            <el-input style='width: 400px' placeholder='请输入姓名' v-model='addForm.userName'></el-input>
          </el-form-item>
          <el-form-item label="手机号码" label-width='150px' prop='phone'>
            <el-input style='width: 400px' placeholder='请输入手机号码' v-model='addForm.phone'></el-input>
          </el-form-item>
          <el-form-item label="岗位" label-width='150px' prop='job'>
            <el-select  placeholder="请选择岗位(可填写)"
              style='width: 400px'
              filterable
              clearable
              allow-create
              v-model="addForm.job"
            >
              <el-option
                v-for="item in options5"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" label-width='150px' prop='status'>
            <el-select  placeholder="请选择状态" style='width: 400px' v-model="addForm.status">
              <el-option
                v-for="item in options5"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class='operation-btn'>
        <el-button @click="back('addForm')">返回</el-button>
        <el-button style='background: #0785FD;color:#fff' :loading="isAddLoading" @click="submitForm('addForm')">确认发布</el-button>
      </div>
    </div>
    <el-dialog
      title="操作提示"
      :visible.sync="closeReturnVisiable"
      width="480px"
      height='285px'
      center>
      <span style='text-align:center'>返回后您添加的数据不会保存，是否确认返回?</span>
      <span slot="footer" class="dialog-footer">
        <el-button class='sureBtn' @click='sureBack'>确定返回</el-button>
        <el-button class='noSureBtn' @click="closeReturnVisiable = false">暂不返回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {valiPhone} from '@/utils/validator.js';
export default {
  data () {
    return {
      closeReturnVisiable: false, // 返回对话框
      addForm: {
        userName: null,
        phone: null,
        job: null,
        status: null
      },
      rules: {
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { max: 4, message: '最多可以输入4个字' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: valiPhone, trigger: 'blur' }
        ],
        job: [
          { required: true, message: '请输入或选择岗位', trigger: 'blur' },
          { max: 10, message: '最多可以输入10个字' }
        ]
      },
      options5: [{
        value: 'HTML',
        label: 'HTML'
      }, {
        value: 'CSS',
        label: 'CSS'
      }, {
        value: 'JavaScript',
        label: 'JavaScript'
      }],
      isAddLoading: false
    }
  },
  mounted () {
    this.dataStr = JSON.stringify(this.addForm); // 将初始数据转成字符串
  },
  methods: {
    back (form) {
      const data = JSON.stringify(this.addForm);
      if (this.dataStr === data) {
        this.$router.back(-1);
      } else {
        this.closeReturnVisiable = true;
      }
    },
    submitForm (form) {
      this.$refs[form].validate(valid => {
        if (valid) {

        }
      })
    },
    sureBack () {
      this.closeReturnVisiable = false;
      this.$router.back(-1);
    }
  }
}
</script>

<style lang="scss" scoped>
.add-person {
  padding: 20px;
  .header {
    margin-bottom: 20px;
  }
  .add-body {
    .add-form {
      background-color: #fff;
      padding-bottom: 5%;
      .form-content {
        padding-top: 2%;
        .el-form-item {
          margin-bottom: 15px;
        }
        /deep/ .el-form-item__error {
          border: 1px solid #FA796C;
          height: 35px;
          line-height: 35px;
          background-color: #FEE6E0;
          border-radius: 2px;
          color: #FA796C;
          padding-top: 0;
          padding: 0 13px 0 26px;
        }
        /deep/ .el-form-item__error:before {
          content: '!';
          position: absolute;
          left: 5px;
          top: 9px;
          width: 15px;
          height: 15px;
          text-align: center;
          line-height: 16px;
          color: #FFF;
          font-weight: bold;
          background-color: #FA796C;
          border-radius: 50%;
        }
      }
    }
  }
  .operation-btn {
    margin-top: 3%;
  }
  /deep/ .el-dialog__header {
    background: #F0F0F0 !important;
    text-align: left !important;
    color: #555555;
    font-weight: bold;
    font-size: 16px;
  }
  /deep/  .el-dialog__body {
    text-align: center !important;
  }
  .sureBtn {
    background:#0785FD;
    height:35px;
    color: #fff;
    line-height: 10px;
  }
  .noSureBtn {
    border-color:#e5e5e5;
    height:35px;
    line-height: 10px;
    color:#666666;
  }
}
</style>
