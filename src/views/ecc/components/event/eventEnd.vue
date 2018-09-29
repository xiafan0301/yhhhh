<template>
  <div class='event-end'>
    <div class='event-end-header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>事件管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>事件详情</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='event-end-body'>
      <el-form class='event-end-form' :model='endForm' ref='endForm' :rules='rules' inline-message>
        <el-form-item label="请确认事件等级" label-width='150px' prop='eventLevel'>
          <el-select  placeholder="请选择事件等级" style='width: 500px' v-model='endForm.eventLevel'>
            <el-option
              v-for="item in eventLevelList"
              :key="item.dictId"
              :label="item.dictContent"
              :value="item.dictId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请输入事件总结" label-width='150px' prop='eventSummary' class="event-summary">
          <el-input type='textarea' v-model='endForm.eventSummary' style="width: 500px;" rows='9' placeholder='请输入事件详细情况...' @input="calNumber(endForm.eventSummary)"></el-input>
          <span class="number-tip">{{currentNum}}/{{totalNum}}</span>
        </el-form-item>
      </el-form>
      <div class='show-img-div'>
        <el-upload
          action="http://10.16.4.50:8001/api/network/upload/new"
          list-type='picture-card'
          :data="imgParam"
          accept='.png,.jpg,.bmp,.pdf,.doc,.docx,.ppt,.pptx'
          :on-preview="handlePictureCardPreview"
          :before-upload='handleBeforeUpload'
          :on-success="handleSuccess"
          :show-file-list='false'
        >
          <i class="el-icon-plus" style='width: 36px;height:36px;color:#D8D8D8'></i>
          <span class='add-img-text'>上传附件</span>
        </el-upload>
        <div class='img-list' v-for="(item, index) in imgList" :key="'item'+index">
          <img
            :src='item.newFileName'
          />
          <div class='delete-img'>
            <i class='el-icon-zoom-in' @click="enlarge(item, index)"></i>
            <i class='el-icon-delete' @click="deleteImg(item, index)"></i>
          </div>
        </div>
      </div>
      <div class='show-file-div'>
        <div class='show-file-div-list' v-for="(item, index) in fileList" :key="'item'+index">
          <img src='../../../../assets/img/temp/file.png' />
          <span>{{item.fileName}}</span>
          <i class='el-icon-circle-close' @click="deleteFile(item, index)"></i>
        </div>
      </div>
    </div>
    <div class='operation-btn-event-end'>
      <el-button @click='back'>返回</el-button>
      <el-button style='background: #0785FD;color:#fff' :loading="isEndLoading" @click="endEvent('endForm')">确定</el-button>
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
      <img width="50%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import {dictType} from '@/config/data.js';
export default {
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      isEndLoading: false, // 结束加载中
      closeReturnVisiable: false,
      currentNum: 0, // 事件情况当前字数
      totalNum: 10000, // 可输入的总字数
      imgParam: {
        projectType: 3
      },
      endForm: {
        eventId: '',
        eventLevel: '', // 事件等级
        eventSummary: '', // 事件总结
        attachmentList: [] // 附件列表
      },
      rules: {
        eventLevel: [
          { required: true, message: '请选择事件等级', trigger: 'blur' }
        ],
        eventSummary: [
          { max: 10000, message: '最多可以输入10000个字' }
        ]
      },
      eventLevelList: [], // 事件等级列表
      fileList: [], // 要上传的文件列表
      imgList: [] // 图片列表
    }
  },
  created () {
    this.endForm.eventId = this.$route.query.eventId;
    if (this.$route.query.eventLevel) {
      this.endForm.eventLevel = this.$route.query.eventLevel;
    }
    this.getEventLevel();
  },
  mounted () {
    setTimeout(() => {
      this.dataStr = JSON.stringify(this.endForm); // 将初始数据转成字符串
    }, 1000);
  },
  methods: {
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    calNumber (val) { // 计算事件情况字数
      if (val.length > this.totalNum) {
        return;
      }
      this.currentNum = val.length;
    },
    back (form) {
      const data = JSON.stringify(this.endForm);
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
    deleteImg (obj, index) { // 删除图片
      this.imgList.splice(index, 1);
      this.endForm.attachmentList && this.endForm.attachmentList.map((item, idx) => {
        if (item.url === obj.newFileName) {
          this.endForm.attachmentList.splice(idx, 1);
        }
      });
    },
    enlarge (obj, index) {
      this.dialogVisible = true
      this.dialogImageUrl = obj.newFileName
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
        let type;
        console.log(fileName)
        if (fileName) {
          type = fileName.substring(fileName.lastIndexOf('.'));
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
      const eventId = this.$route.query.eventId;
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.isEndLoading = true;
          const data = {
            eventFinishDto: this.endForm
          }
          this.axios.put('A2/eventServices/events/finish/' + eventId, data.eventFinishDto)
            .then((res) => {
              if (res) {
                this.$message({
                  message: '宣布事件结束成功',
                  type: 'success'
                });
                this.$router.push({name: 'event-list'});
                this.isEndLoading = false;
              } else {
                this.$message.error('宣布事件结束失败');
                this.isEndLoading = false;
              }
              // this.isEndLoading = false;
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
            i:first-child {
              position: absolute;
              cursor: pointer;
              font-size: 20px;
              top: 40px;
              color: #fff;
              left: 30px;
            }
            i:last-child {
              position: absolute;
              cursor: pointer;
              font-size: 20px;
              top: 40px;
              color: #fff;
              left: 60px;
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
    .img-dialog {
      /deep/ .el-dialog__header {
        padding: 40px 20px 10px;
      }
       /deep/  .el-dialog__body {
        text-align: center !important;
      }
    }
  }
</style>
