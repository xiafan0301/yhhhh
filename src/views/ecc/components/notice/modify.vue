<template>
  <div class="bg-release">
    <div style=" margin-bottom: 20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>消息管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'notice-atmanagementList'}"  v-if="this.$route.query.status === 'modifyatgment'">公告管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'system' }"  v-if="this.$route.query.status === 'modifysystem'">系统消息</el-breadcrumb-item>
        <el-breadcrumb-item ><span style='color: #0785FD'>{{status}}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bg-release-cot">
      <el-form ref="form" :model="form" label-width="80px"  v-if="this.$route.query.status === 'modifyatgment'"  :rules="rules" :inline-message="true">
        <el-form-item label="接收者" prop="checkList">
          <div style="display: inline-block">
            <el-checkbox-group v-model="form.checkList">
              <el-checkbox label= 1>移动端</el-checkbox>
              <el-checkbox label= 2 name="type" >PC端</el-checkbox>
            </el-checkbox-group>
          </div>
          <div style="display: inline-block; margin-left: 20px;" >
            <el-select v-model="value" placeholder="请选择" size="medium" :disabled= "!(form.checkList[0] === '2'|| form.checkList[1] === '2') "  multiple collapse-tags style="width: 300px">
              <el-option
                v-for="item in DepartmentList"
                :key="item.uid"
                :label="item.organName"
                :value="item.uid">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="主题" prop= "title">
          <el-input v-model="form.title" style="width: 500px"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop = "desc">
          <div style="width: 500px; position: relative">
            <el-input type="textarea" v-model="form.desc" style="display: inline-block;"  :autosize="{ minRows: 8, maxRows: 9}" ></el-input>
            <span style="display: inline-block; position: absolute; right: 0; bottom: -3px">{{form.desc.length}}/10000</span>
          </div>
        </el-form-item>
        <el-form-item  >
          <el-upload
            action="http://10.16.4.50:8001/api/network/upload/new"
            list-type="picture-card"
            accept=".png,.jpg,.bmp"
            :data="imgParam"
            :before-upload='handleBeforeUpload'
            :on-preview="handlePictureCardPreview"
            :file-list="form.attachmentList"
            :on-remove="handleRemove"
            :on-success='handleSuccess'
            :on-exceed="handleImgNumber"
            :limit='9'
          >
            <i class="el-icon-plus" style='width: 36px;height:36px;color:#D8D8D8'></i>
            <span class='add-img-text'>添加图片</span>
            <span class="imgTips" v-show="isImgNumber">图片最多上传9张</span>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" class="img-dialog">
            <img  :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="发送时间"  prop = 'time'>
          <el-radio-group v-model="form.time" style="width: 100%">
            <div style="display: inline-block" >;
              <el-radio :label="1" >实时</el-radio>
              <el-radio :label="2">定时</el-radio>
            </div>
            <div  style="display: inline-block; margin-left: 20px;">
              <el-date-picker
                :picker-options="pickerOptions0"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="form.publishTime"
                :disabled = "!(form.time === 2)"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-form ref="form1" :model="form1" label-width="80px" v-if="this.$route.query.status === 'modifysystem'" :rules="rule"  :inline-message="true">
        <el-form-item label="接收者">
          <el-checkbox label="移动端" name="type" v-model="form1.resource" disabled ></el-checkbox>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="form1.type" placeholder="系统消息" style="width: 500px">
            <el-option label="APP应用升级" value="39728bba-9b6f-11e8-8a14-3f814d634dc3"></el-option>
            <el-option label="应急小秘书" value="39728bba-9b6f-11e8-8a14-3f814d634dc4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="desc">
          <div style="position: relative; display: inline-block">
            <el-input type="textarea" v-model="form1.desc" style="display: inline-block; width: 500px"  :autosize="{ minRows: 8, maxRows: 9}" rows="7"></el-input>
            <span style="display: inline-block; position: absolute; right: 0; bottom: -3px">{{form1.desc.length}}/10000</span>
          </div>
        </el-form-item>
        <el-form-item label="发送时间" prop="time">
          <el-radio-group v-model="form1.time" style="width: 100%">
            <div style="display: inline-block" >;
              <el-radio :label="1" >实时</el-radio>
              <el-radio :label="2">定时</el-radio>
            </div>
            <div  style="display: inline-block; margin-left: 20px;">
              <el-date-picker
                :picker-options="pickerOptions0"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="form1.publishTime"
                :disabled = "!(form1.time === 2)"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </el-radio-group>
        </el-form-item>
      </el-form >
  </div>
    <div style="margin-top: 21px" >
      <el-button  @click="back">取消</el-button>
      <el-button type="primary" @click="onSubmit('form', 'form1')" :loading="addPageLoading">确定</el-button>
    </div>
  </div>
</template>
<script>
import {dictType} from '@/config/data.js';
export default {
  data () {
    return {
      pickerOptions0: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      addPageLoading: false,
      dialogImageUrl: '',
      dialogVisible: false,
      isImgNumber: false,
      status: '',
      form: {
        publishTime: '',
        terminal: 0,
        checkList: [],
        desc: '',
        time: '',
        title: '',
        messageType: '',
        attachmentList: [],
        receiveRelations: []
      },
      imgParam: {
        projectType: 3
      },
      form1: {
        time: '',
        publishTime: '',
        type: '',
        resource: true,
        desc: ''
      },
      value: [],
      DepartmentList: [],
      rules: {
        checkList: [
          {required: true, message: '请选择接收者'}
        ],
        title: [
          { required: true, message: '请输入主题', trigger: 'blur' },
          { max: 28, message: '最多可以输入28个字' }
        ],
        desc: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { max: 10000, message: '最多可以输入10000个字' }
        ],
        time: [
          {required: true, message: '请选择发送时间'}
        ]
      },
      rule: {
        type: [
          { required: true, message: '请选择消息类型' }
        ],
        desc: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { max: 10000, message: '最多可以输入10000个字' }
        ],
        time: [
          {required: true, message: '请选择发送时间'}
        ]
      }
    }
  },
  computed: {
  },
  created () {
    this.getmessagedetial();
    this.getDepartmentList();
  },
  mounted () {
    if (this.$route.query.status === 'modifyatgment') {
      this.status = '修改公告'
    } else if (this.$route.query.status === 'modifysystem') {
      this.status = '修改消息'
    }
  },
  methods: {
    getmessagedetial () {
      let messageId = this.$route.query.messageId;
      this.axios.get('A2/messageService/' + messageId)
        .then((res) => {
          if (this.$route.query.status === 'modifyatgment') {
            if (res.data.emiMessage.terminal === 1) {
              this.form.checkList.push('1')
            } else if (res.data.emiMessage.terminal === 2) {
              this.form.checkList.push('2')
            } else if (res.data.emiMessage.terminal === 3) {
              this.form.checkList.push('2', '1')
            } else if (res.data.emiMessage.terminal === 4) {
              this.form.checkList.push()
            }
            this.form.title = res.data.emiMessage.title;
            this.form.desc = res.data.emiMessage.details;
            if (res.data.emiMessage.publishTime === null) {
              this.form.time = 1
            } else {
              this.form.time = 2;
              this.form.publishTime = res.data.emiMessage.publishTime;
            }
            this.form.messageType = res.data.emiMessage.messageType;
            this.form.attachmentList = res.data.emiAttachments
            res.data.receiveRelations && res.data.receiveRelations.map((item, index) => {
              this.value.push(item.receiveUser);
            });
          } else {
            if (res.data.emiMessage.publishTime === null) {
              this.form1.time = 1
            } else {
              this.form1.time = 2;
            }
            this.form1.desc = res.data.emiMessage.details;
            this.form1.publishTime = res.data.emiMessage.publishTime;
            this.form1.type = res.data.emiMessage.messageType
          }
        })
    },
    getDepartmentList () {
      let params = {
        pageSize: 0
      }
      this.axios.get('A3/authServices/organInfos', {params})
        .then((res) => {
          if (res && res.data.list) {
            this.DepartmentList = res.data.list
          }
        })
        .catch(() => {})
    },
    onSubmit (val, val1) {
      if (this.$route.query.status === 'modifyatgment') {
        this.$refs[val].validate((valid) => {
          if (valid) {
            if (this.form.checkList[0] === '1' && this.form.checkList.length === 1) {
              this.form.terminal = 1
            } else if (this.form.checkList[0] === '2' && this.form.checkList.length === 1) {
              this.form.terminal = 2
            } else if (this.form.checkList.length === 2) {
              this.form.terminal = 3
            } else if (this.form.checkList.length === 0) {
              this.form.terminal = 4
            }
            if (this.form.time === 1) {
              this.form.publishTime = null;
            }
            if (this.form.terminal === 2 || this.form.terminal === 3) {
              this.value && this.value.map((item, index) => {
                this.form.receiveRelations.push({receiveUser: item, receiverType: 2});
              });
            }
            if (this.form.attachmentList.length === 0) {
              this.form.attachmentList = [];
            }
            let messageId = this.$route.query.messageId;
            let params = {
              emiMessage: {
                messageId: messageId,
                title: this.form.title,
                details: this.form.desc,
                messageType: this.form.messageType,
                publishTime: this.form.publishTime,
                terminal: this.form.terminal
              },
              receiveRelations: this.form.receiveRelations,
              emiAttachments: this.form.attachmentList
            };
            if (this.form.time === 1) {
              params.emiMessage.description = null
            } else {
              params.emiMessage.description = 1
            }
            this.addPageLoading = true
            this.axios.put('A2/messageService/updateOne', params)
              .then((res) => {
                if (res) {
                  this.$router.push({name: 'notice-atmanagementList'})
                  this.addPageLoading = false
                  this.$message.success('修改公告成功');
                } else {
                  this.addPageLoading = false
                }
              })
              .catch(() => {
              });
          } else {
            return false;
          }
        });
      } else {
        this.$refs[val1].validate((valid) => {
          if (valid) {
            let messageId = this.$route.query.messageId;
            let params = {
              emiMessage: {
                messageId: messageId,
                details: this.form1.desc,
                messageType: this.form1.type,
                publishTime: this.form1.publishTime,
                terminal: 1
              }
            };
            if (this.form1.time === 2) {
              params.emiMessage.description = 1;
            }
            this.addPageLoading = true
            this.axios.put('A2/messageService/updateOne', params)
              .then((res) => {
                if (res) {
                  this.$router.push({name: 'system'})
                  this.addPageLoading = false
                  this.$message.success('修改消息成功');
                } else {
                  this.addPageLoading = false
                }
              })
              .catch(() => {
              });
          } else {
            return false;
          }
        });
      }
    },
    back () {
      if (this.$route.query.status === 'modifysystem') {
        this.$router.push({name: 'system'})
      } else {
        this.$router.push({name: 'notice-atmanagementList'})
      }
    },
    handleSuccess (res, file) { // 图片上传成功
      if (res && res.data) {
        console.log(res.data.newFileName)
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
        };
        this.form.attachmentList.push(data);
      }
    },
    handleRemove (file, fileList) { // 删除图片
      this.form.attachmentList.map((aa, index) => {
        if (aa.url === file.url) {
          this.form.attachmentList.splice(index, 1)
        }
      });
      if (fileList.length < 9) {
        this.isImgNumber = false;
      }
    },
    handleImgNumber (files, fileList) { // 图片超出最大个数限制
      this.isImgNumber = true;
    },
    handleBeforeUpload (file) { // 图片上传之前
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLtTenM = file.size / 1024 / 1024 < 10;
      if (!isImg) {
        this.$message.error('上传的图片只能是bmp、jpg、png格式!');
      }
      if (!isLtTenM) {
        this.$message.error('上传的图片大小不能超过10M');
      }
      return isImg && isLtTenM;
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>
<style lang="scss" scoped>
  .bg-release {
    padding: 20px;
    height: 100%;
    overflow: auto;
    background-color: #F0F3F4;
  }
  .bg-release-cot {
    background-color: #FFFFFF;
    padding-top: 55px;
    padding-left: 100px;
    padding-bottom: 86px;
  }
  .el-form-item {
    margin-bottom: 15px;
  }
  /deep/ .el-upload--picture-card {
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
  /deep/ .el-upload-list--picture-card .el-upload-list__item {
    width: 100px !important;
    height: 100px !important;
  }
  /deep/ .el-dialog--center .el-dialog__body {
    text-align: center !important;
  }
  /deep/ .el-dialog__header {
    background: #F0F0F0 !important;
    text-align: left !important;
    color: #555555;
    font-weight: bold;
    font-size: 16px;
  }
  .img-dialog {
    /deep/ .el-dialog__header {
      padding: 40px 20px 10px;
    }
    /deep/  .el-dialog__body {
      text-align: center !important;
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
</style>
