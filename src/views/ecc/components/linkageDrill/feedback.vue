<template>
  <div class='link-drill-feedback'>
    <div class='event-end-header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <template v-if="$route.query.text === 'ctc'">
          <el-breadcrumb-item>模拟调度指挥</el-breadcrumb-item>
        </template>
        <template v-else>
          <el-breadcrumb-item>演练记录</el-breadcrumb-item>
        </template>
        <el-breadcrumb-item>事件详情</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>反馈情况</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='event-end-body'>
      <el-form class='event-end-form' :model='feedbackForm' ref='feedbackForm' :rules='rules'>
        <el-form-item label="请输入事件反馈" label-width='150px' prop='processContent' class="event-summary">
          <el-input type='textarea' v-model='feedbackForm.processContent' style="width: 500px;" rows='9' placeholder='请输入事件反馈情况...' @input="calNumber(feedbackForm.processContent)"></el-input>
          <span class="number-tip">{{currentNum}}/{{totalNum}}</span>
        </el-form-item>
        <el-form-item style='margin-left: 150px' class="img-form-item">
          <el-upload
            :action="uploadUrl + '/upload/new'"
            list-type="picture-card"
            :data="imgParam"
            accept=".png,.jpg,.bmp"
            :on-preview="handlePictureCardPreview"
            :on-exceed="handleImgNumber"
            :before-upload='handleBeforeUpload'
            :on-remove="handleRemove"
            :on-success='handleSuccess'
            :limit='9'
          >
            <i class="el-icon-plus" style='width: 36px;height:36px;color:#D8D8D8'></i>
            <span class='add-img-text'>添加图片</span>
            <span class="imgTips" v-show="isImgNumber">图片最多上传9张</span>
          </el-upload>
        </el-form-item>
        <el-form-item label="任务是否完成" label-width='150px' prop='taskStatus'>
          <el-radio-group style='width: 120px' v-model='feedbackForm.taskStatus'>
            <el-radio label="是"></el-radio>
            <el-radio label="否" style='margin-left:22%'></el-radio>
          </el-radio-group>
          <span style="color:#cccccc;font-size:13px">任务全部完成后则不能再反馈信息</span>
        </el-form-item>
      </el-form>
    </div>
    <div class='operation-btn-event-end'>
      <el-button @click='back'>返回</el-button>
      <el-button style='background: #0785FD;color:#fff' :loading="isLoading" @click="feedbackEvent('feedbackForm')">确定</el-button>
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
    <el-dialog :visible.sync="dialogVisible" class="img-dialog">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import {dictType} from '@/config/data.js';
import {imgBaseUrl2} from '@/config/config.js';
export default {
  data () {
    return {
      isLoading: false,
      uploadUrl: null,
      dialogImageUrl: null,
      dialogVisible: false,
      currentNum: 0, // 事件反馈当前字数
      totalNum: 10000, // 可输入的总字数
      feedbackForm: {
        simulateFlag: true,
        processType: '',
        processContent: '', // 事件总结
        taskStatus: '否',
        attachmentList: [] // 附件列表
      },
      imgParam: {
        projectType: 4
      },
      rules: {
        processContent: [
          { max: 10000, message: '最多可以输入10000个字' },
          { required: true, message: '请输入事件反馈情况', trigger: 'blur' }
        ]
      },
      closeReturnVisiable: false,
      isImgNumber: false,
      taskTypeId: '' // 任务状态id
    }
  },
  created () {
    this.getProcessTypeList();
    this.getTaskTypeList();
    this.uploadUrl = imgBaseUrl2;
  },
  mounted () {
    setTimeout(() => {
      this.dataStr = JSON.stringify(this.feedbackForm); // 将初始数据转成字符串
    }, 1000);
  },
  methods: {
    calNumber (val) { // 计算事件情况字数
      this.currentNum = val.length;
    },
    back () {
      const data = JSON.stringify(this.feedbackForm);
      if (this.dataStr === data) {
        this.$router.back(-1);
      } else {
        this.closeReturnVisiable = true;
      }
    },
    sureBack () {
      this.closeReturnVisiable = false;
      this.$router.back(-1);
    },
    handleImgNumber (files, fileList) { // 图片超出最大个数限制
      this.isImgNumber = true;
    },
    handleRemove (file, fileList) { // 删除图片
      if (file && file.response) {
        if (this.feedbackForm.attachmentList.length > 0) {
          this.feedbackForm.attachmentList.map((item, index) => {
            if (file.response) {
              if (item.url === file.response.data.newFileName) {
                this.feedbackForm.attachmentList.splice(index, 1);
              }
            }
            if (file.attachmentId) {
              if (item.attachmentId === file.attachmentId) {
                this.feedbackForm.attachmentList.splice(index, 1);
              }
            }
          });
        }
      }
      if (fileList.length < 9) {
        this.isImgNumber = false;
      }
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess (res, file) { // 图片上传成功
      if (res && res.data) {
        const data = {
          attachmentType: dictType.imgId,
          url: res.data.newFileName,
          attachmentName: res.data.fileName,
          attachmentSize: res.data.fileSize,
          attachmentWidth: res.data.imageWidth,
          attachmentHeight: res.data.imageHeight,
          thumbnailUrl: res.data.thumbnailUrl,
          thumbnailWidth: res.data.thumbImageWidth,
          thumbnailHeight: res.data.thumbImageHeight
        }
        this.feedbackForm.attachmentList.push(data);
      }
    },
    handleBeforeUpload (file) { // 附件上传之前
      const isLtTenM = file.size / 1024 / 1024 < 10;
      if (!isLtTenM) {
        this.$message.error('上传的附件大小不能超过10M');
      }
      return isLtTenM;
    },
    getProcessTypeList () { // 获取事件处理过程
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.processTypeId)
        .then((res) => {
          if (res && res.data) {
            res.data.map((item, index) => {
              if (item.dictContent === '联动单位反馈') {
                this.feedbackForm.processType = item.dictId;
              }
            });
          }
        })
        .catch(() => {})
    },
    getTaskTypeList () { // 获取任务状态
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.taskStateId)
        .then((res) => {
          if (res && res.data) {
            res.data.map((item, index) => {
              if (item.dictContent === '已完成') {
                this.taskTypeId = item.dictId;
              }
            });
          }
        })
        .catch(() => {})
    },
    feedbackEvent (form) { // 反馈事件
      const eventId = this.$route.query.eventId;
      const taskId = this.$route.query.taskId;
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.feedbackForm.taskStatus === '是') {
            this.feedbackForm.taskStatus = this.taskTypeId;
          } else {
            this.feedbackForm.taskStatus = '';
          }
          this.isLoading = true;
          this.axios.post('A2/taskServices/task/process/' + eventId + '/' + taskId, this.feedbackForm)
            .then((res) => {
              if (res) {
                console.log(res)
                this.isLoading = false;
                this.$message({
                  message: '反馈成功',
                  type: 'success'
                });
                if (this.$route.query.text === 'ctc') {
                  this.$router.push({name: 'link-simulate-ctc-detail', query: {eventId: eventId, taskId: taskId}});
                } else {
                  this.$router.push({name: 'link-drill-detail', query: {eventId: eventId, taskId: taskId}});
                }
                // this.$router.push({name: 'link-drill-detail', query: {eventId: eventId, taskId: taskId}});
              } else {
                this.isLoading = false;
                this.$message.error('反馈失败');
              }
            })
            .catch(() => {})
        }
      });
    }
  }
}
</script>
<style lang='scss'>
  .link-drill-feedback {
    padding: 20px;
    height: 100%;
    .event-end-header {
      margin-bottom: 20px;
    }
    .event-end-body {
      width: 100%;
      padding-bottom: 5%;
      background: #fff;
      .event-end-form {
        padding-top: 2%;
        .event-summary {
          position: relative;
          .number-tip {
            position: absolute;
            bottom: 0;
            left: 440px;
            color: #999999;
            font-size: 13px;
          }
        }
        .img-form-item /deep/ .el-form-item__content{
          display: flex;
          .img-list {
            // width: 100px;
            height: 100px;
            margin-left: 10px;
            margin-bottom: 10px;
            display: flex;
            .error-item {
              position: absolute;
              top: -10px;
              right: -8px;
              font-size: 18px;
              color: #666;
              z-index: 1;
            }
          }
        }
        .imgTips {
          border: 1px solid #FA796C;
          height: 35px;
          line-height: 35px;
          background-color: #FEE6E0;
          border-radius: 2px;
          position: absolute;
          color: #FA796C;
          padding-top: 0;
          padding: 0 13px 0 26px;
          -ms-flex-item-align: center;
          align-self: center;
          width: 160px;
          left: 105px;
          top: 50px;
        }
        .imgTips:before {
          content: '!';
          position: absolute;
          left: 5px;
          right: 0px;
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
      .show-img-div {
        width: 500px;
        margin-left: 150px;
        display: flex;
        flex-wrap: wrap;
        .img-list {
          width: 100px;
          height: 100px;
          margin-left: 10px;
          margin-bottom: 10px;
          position: relative;
          img {
            width: 100px;
            height: 100px;
          }
          .delete-img {
            width: 100%;
            height: 100%;
            position: absolute;
            background-color: rgba(0,0,0,.5);
            transition: opacity .3s;
            opacity: 0;
            border-radius: 3px;
            top:0;
            left:0;
            i {
              position: absolute;
              cursor: pointer;
              font-size: 20px;
              top: 40px;
              color: #fff;
              left: 40px;
            }
          }
          &:hover {
            .delete-img {
              opacity: 1;
            }
            box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6),
              0 2px 4px 0 rgba(232, 237, 250, .5);
          }
        }
      }
      .show-file-div {
        width: 500px;
        margin-left: 150px;
        .show-file-div-list {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          margin-top: 10px;
          span {
            color: #0785FD;
            font-size: 14px;
            margin: 0 5px;
          }
          i {
            font-size: 18px;
            color: #5D5D5D;
            cursor: pointer;
          }
        }
      }
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
    .operation-btn-event-end {
      margin-top: 1%;
    }
    .el-upload-list--picture-card .el-upload-list__item {
      width: 100px !important;
      height: 100px !important;
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
