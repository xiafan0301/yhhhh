<template>
  <div class="add-msg-person">
    <div class='add-msg-header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>事件管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>{{status}}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='add-msg-body'>
      <div class='add-form-person'>
        <el-form class='form-content-person' :model='operationForm' ref='operationForm' :rules='rules'>
          <el-form-item label="事发时间" label-width='150px' prop='reportTime'>
            <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model='operationForm.reportTime' type="datetime" placeholder="选择事发时间" style="width: 500px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="事发地点" label-width='150px' class="address" prop='eventAddress'>
            <el-input style='width: 500px' placeholder='请选择事发地点...' v-model='operationForm.eventAddress'></el-input>
            <!-- <span class='look-map' style='color:#0785FD;font-size:13px;position:relative;right:75px'>选择地点</span> -->
            <div class='map-ecc'><img src="../../../../assets/img/temp/map-ecc.png" /></div>
          </el-form-item>
          <el-form-item label="事件情况" label-width='150px' prop='eventDetail'>
            <el-input type="textarea" v-model='operationForm.eventDetail' style='width: 500px' placeholder='请选择事件详细情况...' rows='7'></el-input>
          </el-form-item>
          <el-form-item style='margin-left: 150px'>
            <el-upload
              action="http://10.16.4.50:8001/api/network/upload/new"
              list-type="picture-card"
              :on-remove="handleRemove"
              :on-success='handleSuccess'
              :limit='9'
            >
              <i class="el-icon-plus" style='width: 36px;height:36px;color:#D8D8D8'></i>
              <span class='add-img-text'>添加图片</span>
            </el-upload>
          </el-form-item>
          <el-form-item label="是否推送消息" label-width='150px'>
            <el-radio-group style='width: 330px' v-model='operationForm.radius'>
              <el-radio label="不推送"></el-radio>
              <el-radio label="推送" style='margin-left:22%'></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="接受的APP用户" label-width='150px'>
            <el-select  placeholder="请选择APP用户" style='width: 500px'>
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="部分" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class='operation-btn-msg'>
        <el-button>返回</el-button>
        <el-button style='background: #0785FD;color:#fff'>确认发布</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {dictType} from '@/config/data.js';
export default {
  data () {
    return {
      status: '', // 添加或修改消息
      operationForm: {
        eventSource: '',
        reportTime: '',
        eventAddress: '',
        eventDetail: '',
        attachmentList: [], // 附件列表
        radius: '不推送' // 是否推送消息
      },
      rules: {
        reportTime: [
          { required: true, message: '请选择事发时间', trigger: 'blur' }
        ],
        eventAddress: [
          { required: true, message: '请输入事发地点', trigger: 'blur' }
        ],
        eventDetail: [
          { required: true, message: '请输入事件情况', trigger: 'blur' },
          { max: 140, message: '最多可以输入140个字' }
        ]
      },
      radiusNumber: '' // 接受的APP用户
    }
  },
  mounted () {
    if (this.$route.params.status === 'add') {
      this.status = '添加消息';
    } else if (this.$route.params.status === 'modify') {
      this.status = '修改消息';
    }
  },
  methods: {
    handleSuccess (res, file) { // 图片上传成功
      if (res && res.data) {
        const data = {
          attachmentType: dictType.enclosureTypeId,
          url: res.data.newFileName
        }
        this.operationForm.attachmentList.push(data);
      }
    },
    handleRemove (file, fileList) { // 删除图片
      if (file && file.response.data) {
        if (this.operationForm.attachmentList.length > 0) {
          this.operationForm.attachmentList.map((item, index) => {
            if (item.url === file.response.data.newFileName) {
              this.operationForm.attachmentList.splice(index, 1);
            }
          });
        }
      }
    }
  }
}
</script>
<style lang="scss">
  .add-msg-person {
    padding: 20px;
    .add-msg-header {
      margin-bottom: 20px;
    }
    .add-msg-body {
      .add-form-person {
        background-color: #fff;
        padding-bottom: 5%;
        .form-content-person {
          padding-top: 2%;
          .el-form-item {
            margin-bottom: 15px;
          }
        }
      }
    }
    .operation-btn-msg {
      margin-top: 2%;
    }
    .el-upload--picture-card {
      width: 100px;
      height: 100px;
      line-height: 100px;
      background-color: #EAEAEA;
      border: 1px solid #EAEAEA;
      position: relative;
      i {
        margin: 0 auto;
        font-weight: bold;
      }
      .add-img-text {
        color: #C4C2C2;
        font-size: 13px;
        display: block;
        width: 54px;
        height: 13px;
        position: absolute;
        top: 25%;
        left: 25%;
      }
    }
    .el-upload-list--picture-card .el-upload-list__item {
      width: 100px !important;
      height: 100px !important;
    }
    .address /deep/ .el-form-item__content {
      display: flex;
      .map-ecc {
        img {
          padding-top: 5px;
          padding-left: 5px;
        }
      }
    }
  }
</style>
