<template>
  <div class='event-end'>
    <div class='event-end-header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>事件管理</el-breadcrumb-item>
        <el-breadcrumb-item>事件详情</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>反馈情况</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='event-end-body'>
      <el-form class='event-end-form' :model='endForm' ref='endForm' :rules='rules'>
        <el-form-item label="请输入事件反馈" label-width='150px' prop='eventSummary'>
          <el-input type='textarea' v-model='endForm.eventSummary' style="width: 500px;" rows='9' placeholder='请输入事件反馈情况...'></el-input>
        </el-form-item>
        <el-form-item style='margin-left: 150px'>
          <el-upload
            action="http://10.16.4.50:8001/api/network/upload/new"
            list-type="picture-card"
            accept=".png,.jpg,.bmp"
            :before-upload='handleBeforeUpload'
            :on-remove="handleRemove"
            :on-success='handleSuccess'
            :limit='9'
          >
            <i class="el-icon-plus" style='width: 36px;height:36px;color:#D8D8D8'></i>
            <span class='add-img-text'>添加图片</span>
          </el-upload>
        </el-form-item>
        <el-form-item label="任务是否完成" label-width='150px' prop='casualties'>
          <el-radio-group style='width: 330px' v-model='addForm.casualties'>
            <el-radio label="是"></el-radio>
            <el-radio label="否" style='margin-left:22%'></el-radio>
          </el-radio-group>
          <span>任务全部完成后则不能再反馈信息</span>
        </el-form-item>
      </el-form>
    </div>
    <div class='operation-btn-event-end'>
      <el-button @click='back'>返回</el-button>
      <el-button style='background: #0785FD;color:#fff' @click="endEvent('endForm')">确定</el-button>
    </div>
  </div>
</template>
<script>
import {dictType} from '@/config/data.js';
export default {
  data () {
    return {
      endForm: {
        eventId: '',
        eventSummary: '', // 事件总结
        attachmentList: [] // 附件列表
      },
      rules: {
        eventSummary: [
          { max: 10000, message: '最多可以输入10000个字' },
          { required: true, message: '请输入事件反馈情况', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.endForm.eventId = this.$route.query.eventId;
    if (this.$route.query.eventLevel) {
      this.endForm.eventLevel = this.$route.query.eventLevel;
    }
    this.getEventLevel();
  },
  methods: {
    back () {
      this.$router.back(-1);
    },
    deleteImg (obj, index) { // 删除图片
      this.imgList.splice(index, 1);
      this.endForm.attachmentList && this.endForm.attachmentList.map((item, idx) => {
        if (item.url === obj.newFileName) {
          this.endForm.attachmentList.splice(idx, 1);
        }
      });
    },
    deleteFile (obj, index) { // 删除文件
      this.fileList.splice(index, 1);
      this.endForm.attachmentList && this.endForm.attachmentList.map((item, idx) => {
        if (item.url === obj.newFileName) {
          this.endForm.attachmentList.splice(idx, 1);
        }
      });
    },
    handleSuccess (res, file) {
      if (res && res.data) {
        const fileName = res.data.fileName;
        const type = fileName.substring(fileName.lastIndexOf('.'));
        let data;
        res.data.fileName = file.name;
        if (type === '.png' || type === '.jpg' || type === '.bmp') {
          data = {
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
          this.imgList.push(res.data);
        } else {
          data = {
            attachmentType: dictType.fileId,
            url: res.data.newFileName,
            attachmentName: res.data.fileName,
            attachmentSize: res.data.fileSize
          }
          this.fileList.push(res.data);
        }
        this.endForm.attachmentList.push(data);
      }
    },
    handleBeforeUpload (file) { // 附件上传之前
      const isLtTenM = file.size / 1024 / 1024 < 10;
      if (!isLtTenM) {
        this.$message.error('上传的附件大小不能超过10M');
      }
      return isLtTenM;
    },
    getEventLevel () { // 获取事件等级
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.eventLevelId)
        .then((res) => {
          if (res && res.data) {
            this.eventLevelList = res.data;
          }
        })
        .catch(() => {})
    },
    endEvent (form) { // 结束事件
      console.log(this.endForm)
      const eventId = this.$route.query.eventId;
      this.$refs[form].validate((valid) => {
        if (valid) {
          const data = {
            eventFinishDto: this.endForm
          }
          this.axios.put('A2/eventServices/events/finish/' + eventId, data.eventFinishDto)
            .then((res) => {
              if (res) {
                console.log(res)
                this.$message({
                  message: '宣布事件结束成功',
                  type: 'success'
                });
                this.$router.push({name: 'event-list'});
              } else {
                this.$message.error('宣布事件结束失败');
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
  .event-end {
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
  }
</style>
