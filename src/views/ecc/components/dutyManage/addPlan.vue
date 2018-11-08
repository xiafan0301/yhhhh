<template>
  <div class="add-plan">
    <div class='header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>值班管理</el-breadcrumb-item>
        <el-breadcrumb-item>排班计划</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>添加计划</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='add-body'>
      <div class='add-form'>
        <el-form class='form-content' inline-message :model='addForm' :rules='rules' ref='addForm'>
          <el-form-item label="班次名称" label-width='150px' prop='userName'>
            <el-input style='width: 400px' placeholder='请输入班次名称' v-model='addForm.userName'></el-input>
          </el-form-item>
          <el-form-item label="上班时间" label-width='150px' prop='phone' class="work-time">
            <el-time-picker
              v-model="addForm.phone"
              placeholder="请选择上班时间">
            </el-time-picker>
            <el-time-picker
              v-show="isShowTimeSec"
              v-model="addForm.phone"
              placeholder="请选择上班时间">
            </el-time-picker>
            <el-time-picker
            v-show="isShowTimeThree"
              v-model="addForm.phone"
              placeholder="请选择上班时间">
            </el-time-picker>
            <div class="time-operation">
              <i class="icon-shanchu-1 no-click" v-show="isShowDel" @mouseover="delIconOver"></i>
              <i class="icon-shanchunav- sure-click" v-show="isShowDelIcon" @mouseout="delIconOut" @click="deleteTime"></i>
              <i class="icon-tianjia- no-click"  v-show="isShowAdd" @mouseover="addIconOver"></i>
              <i class="icon-tianjianav- sure-click"  v-show="isShowAddIcon" @mouseout="addIconOut" @click="addTime"></i>
            </div>
          </el-form-item>
          <el-form-item label="工作日" label-width='150px' prop='job'>
            <el-input style='width: 400px' placeholder='单位：天，可支持一位小数' v-model='addForm.job'></el-input>
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
import {valiNumber} from '@/utils/validator.js';
export default {
  data () {
    return {
      isShowAddIcon: false,
      isShowAdd: true,
      isShowDel: false,
      isShowDelIcon: false,
      isShowTimeSec: false,
      isShowTimeThree: false,
      closeReturnVisiable: false, // 返回对话框
      addForm: {
        userName: null,
        phone: null,
        job: null,
        status: null
      },
      rules: {
        userName: [
          { required: true, message: '请输入班次名称', trigger: 'blur' },
          { max: 5, message: '最多可以输入5个字' }
        ],
        phone: [
          { required: true, message: '请选择工作时间', trigger: 'blur' }
        ],
        job: [
          { required: true, message: '请输入工作日', trigger: 'blur' },
          { validator: valiNumber, trigger: 'blur' }
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
    },
    delIconOver () {
      this.isShowDelIcon = true;
      this.isShowDel = false;
    },
    delIconOut () {
      // if (this.isShowTimeSec) {
      //   this.isShowDel = false;
      // } else {
      this.isShowDel = true;
      // }
      this.isShowDelIcon = false;
    },
    addIconOver () {
      this.isShowAddIcon = true;
      this.isShowAdd = false;
    },
    addIconOut () {
      if (this.isShowTimeThree) {
        this.isShowAdd = false;
      } else {
        this.isShowAdd = true;
      }
      this.isShowAddIcon = false;
    },
    deleteTime () {
      console.log('1111')
      if (this.isShowTimeThree) {
        this.isShowAdd = true;
        this.isShowTimeThree = false;
      } else if (this.isShowTimeSec) {
        this.isShowTimeSec = false;
        this.isShowDel = false;
      }
    },
    addTime () {
      if (!this.isShowTimeSec) {
        this.isShowTimeSec = true;
        this.isShowDel = true;
      } else if (!this.isShowTimeThree && this.isShowTimeSec) {
        this.isShowAddIcon = false;
        this.isShowAdd = false;
        this.isShowTimeThree = true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.add-plan {
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
      .work-time /deep/ .el-form-item__content {
        display: flex;
        /deep/ .el-date-editor {
          margin-right: 10px;
        }
        .time-operation {
          i {
            margin-left: 10px;
            font-size: 26px;
            cursor: pointer;
            color:#0785FD;
          }
          // no-click
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
