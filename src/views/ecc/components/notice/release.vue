<template>
  <div class="bg-release">
    <div style=" margin-bottom: 20px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>消息管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'notice-atmanagementList'}" v-if="this.$route.query.status === 'atgment'">公告管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'system'}"  v-if="this.$route.query.status === 'system'">系统消息</el-breadcrumb-item>
        <el-breadcrumb-item >{{status}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bg-release-cot">
      <div>
      <el-form ref="form" :model="form" label-width="80px"  :rules="rules"  :inline-message="true"  v-if="this.$route.query.status === 'atgment'">
        <el-form-item label="接收者">
            <div style="display: inline-block">
              <el-checkbox-group v-model="form.checkList">
                <el-checkbox label= 1>移动端</el-checkbox>
                <el-checkbox label= 2 name="type" >PC端</el-checkbox>
              </el-checkbox-group>
             </div>
            <div style="display: inline-block; margin-left: 20px;" >
              <el-select v-model="value" placeholder="请选择" size="medium" :disabled= "!(form.checkList[0] === '2'|| form.checkList[1] === '2') " style="width: 170px" multiple collapse-tags>
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
          <div style=" position: relative; display: inline-block ">
          <el-input type="textarea" v-model="form.desc" style="display: inline-block; width: 500px"  :autosize="{ minRows: 5, maxRows: 7}" rows="7"></el-input>
            <span style="display: inline-block; position: absolute; right: 0; bottom: -3px">{{form.desc.length}}/100</span>
          </div>
        </el-form-item>
        <el-form-item>
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
        <el-form-item label="发送时间" prop = 'time'>
          <el-radio-group v-model="form.time">
            <div style="display: inline-block" >;
              <el-radio :label="1" >实时</el-radio>
              <el-radio :label="2">定时</el-radio>
            </div>
            <div  style="display: inline-block; margin-left: 20px;">
              <el-date-picker
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
      <el-form ref="form1" :model="form1" label-width="80px" v-if="this.$route.query.status === 'system'" :rules="rule"  :inline-message="true">
        <el-form-item label="接收者">
            <el-checkbox label="移动端" name="type" v-model="form1.receive" disabled></el-checkbox>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="form1.type" placeholder="系统消息"  style="width: 500px" >
            <el-option label="APP应用升级" value="39728bba-9b6f-11e8-8a14-3f814d634dc3"></el-option>
            <el-option label="应急小秘书" value="39728bba-9b6f-11e8-8a14-3f814d634dc4"></el-option>
            <el-option label="民众互助" value="39728bba-9b6f-11e8-8a14-3f814d634dc1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="desc">
          <div style="position: relative; display: inline-block">
          <el-input type="textarea" v-model="form1.desc" style="display: inline-block; width: 500px"  :autosize="{ minRows: 7, maxRows: 8}" rows="7"></el-input>
          <span style="display: inline-block; position: absolute; right: 0; bottom: -3px">{{form1.desc.length}}/100</span>
          </div>
        </el-form-item>
        <el-form-item label="发送时间" prop="time">
          <el-radio-group v-model="form1.time" >
            <div style="display: inline-block" >;
              <el-radio :label="1" >实时</el-radio>
              <el-radio :label="2">定时</el-radio>
            </div>
            <div  style="display: inline-block; margin-left: 20px;">
              <el-date-picker
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
    </div>
    <div style="margin-top: 21px" >
      <el-button @click="back">取消</el-button>
      <el-button type="primary" @click="onSubmit('form', 'form1')" >确定</el-button>
    </div>
  </div>
</template>
<script>
import {dictType} from '@/config/data.js';
export default {
  data () {
    return {
      status: '',
      form: {
        publishTime: '',
        terminal: 0,
        checkList: [],
        desc: '',
        time: '',
        title: '',
        attachmentList: [],
        receiveRelations: []
      },
      form1: {
        publishTime: '',
        type: '',
        receive: true,
        desc: '',
        time: ''
      },
      value: [],
      DepartmentList: [],
      rules: {
        title: [
          { required: true, message: '请输入主题', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入内容', trigger: 'blur' }
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
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        time: [
          {required: true, message: '请选择发送时间'}
        ]
      }
    }
  },
  created () {
    this.getDepartmentList();
  },
  computed: {
  },
  mounted () {
    if (this.$route.query.status === 'atgment') {
      this.status = '添加公告'
    } else if (this.$route.query.status === 'system') {
      this.status = '添加消息'
    }
  },
  methods: {
    onSubmit (val, val1) {
      if (this.$route.query.status === 'system') {
        this.$refs[val1].validate((valid) => {
          if (valid) {
            let params = {
              emiMessage: {
                details: this.form1.desc,
                messageType: this.form1.type,
                terminal: 1,
                publishTime: this.form1.publishTime
              }
            };
            this.axios.post('A2/messageService', params)
              .then((res) => {
                this.$router.push({name: 'system'})
              })
          } else {
            return false;
          }
        });
      } else {
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
            if (this.form.attachmentList.length === 0) {
              this.form.attachmentList = null;
            }
            if (this.form.receiveRelations.length === 0) {
              this.form.receiveRelations = null;
            }
            // if (this.value === '') {
            //   this.value = null
            // }
            this.value && this.value.map((item, index) => {
              this.form.receiveRelations.push({receiveUser: item});
              console.log(this.form.receiveRelations);
              console.log(1)
            });
            let params = {
              emiMessage: {
                details: this.form.desc,
                messageType: '39728bba-9b6f-11e8-8a14-3f814d634dc2',
                terminal: this.form.terminal,
                title: this.form.title,
                publishTime: this.form.publishTime
              },
              emiAttachments: this.form.attachmentList,
              receiveRelations: this.form.receiveRelations
              // receiveRelations: [
              //   {
              //     messageId: 'string',
              //     receiveUser: ''
              //   }
              // ]
            };
            this.axios.post('A2/messageService', params)
              .then((res) => {
                this.$router.push({name: 'notice-atmanagementList'})
              })
          } else {
            return false;
          }
        });
      }
    },
    getDepartmentList () {
      this.axios.get('A3/authServices/organInfos')
        .then((res) => {
          if (res && res.data.list) {
            this.DepartmentList = res.data.list
          }
        })
        .catch(() => {})
    },
    back () {
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
        };
        this.form.attachmentList.push(data);
      }
    },
    handleRemove (file, fileList) { // 删除图片
      if (file && file.response) {
        if (this.form.attachmentList.length > 0) {
          this.form.attachmentList.map((item, index) => {
            if (item.url === file.response.data.newFileName) {
              this.form.attachmentList.splice(index, 1);
            }
          });
        }
      }
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
    }
  }
}
</script>
<style lang="scss" scoped>
  .bg-release {
    padding: 20px;
    background-color: #F0F3F4;
  }
  .bg-release-cot {
    background-color: #FFFFFF;
    padding-top: 55px;
    box-sizing: border-box;
    padding-left: 100px;
    padding-bottom: 50px;
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
</style>
