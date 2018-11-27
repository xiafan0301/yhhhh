<template>
  <div class="add-knowledge-person">
    <div class='add-msg-header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>应急库</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'emergency-knowledgeBase'}" >知识管理</el-breadcrumb-item>
        <el-breadcrumb-item ><span style='color: #0785FD'>{{status}}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='add-msg-body'>
      <div class='add-form-person'>
        <el-form class='form-content-person' :model="form"  ref="form" :inline-message= 'true' label-width='180px' :rules="rules">
          <el-form-item label="标题"  prop="title">
            <el-input  placeholder="填写标题" style='width: 500px' v-model="form.title">
            </el-input>
          </el-form-item>
          <el-form-item label="知识类型"  prop="typeId"  >
            <el-select  placeholder="选择（可填写）" style='width: 500px' v-model="form.typeId"  filterable allow-create default-first-option>
              <el-option
                v-for="item in knowledgeTypeList"
                :key="item.typeId"
                :label="item.knowledgeName"
                :value="item.typeId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关键词"  prop="keyword" >
            <el-input  placeholder="如有多个，请用逗号或顿号分隔…" style='width: 500px;' v-model="form.keyword" onafterpaste="this.value=this.value.replace(/,/g,'，')" onkeyup="this.value=this.value.replace(/,/g,'，')">
            </el-input>
            <span style="font-size: 14px; font-weight: 400; color: #999999">最多添加三个关键词</span>
          </el-form-item>
          <el-form-item label="知识简介"  prop="summary"  style="position: relative">
            <el-input type="textarea" style='width: 500px;' placeholder='请输入知识简介...' rows='7' v-model="form.summary">
            </el-input>
            <span style="position: absolute; left: 445px; bottom: 5px; color: #999999">{{form.summary.length}}/500</span>
          </el-form-item>
          <el-form-item label="附件" class="defint" style="position: relative"   prop="url">
            <div style="display: inline-block; width: 220px; height: 37px; border: 1px solid #dcdfe6; border-radius: 4px; vertical-align: middle;"></div>
            <span style="display: inline-block; position: absolute; left:10px; top: 19px; font-size: 12.5px; font-weight: 400; color: #999999;">{{form.attachmentName}}</span>
            <el-upload style="display: inline-block"
                       :action="uploadUrl + '/upload/new'"
                       :data="imgParam"
                       v-model="form.url"
                       :show-file-list="false"
                       :on-change = "aa"
                       accept=".pdf,.doc,.txt,.docx"
                       :on-success="handSuccess"
                       :before-upload="handpreview">
              <el-button  type="primary" style="width: 90px; height: 39px; position: absolute; top: -1px">上传</el-button>
            </el-upload>
            <div style="display: inline-block; width: 90px"></div>
            <span style="font-size: 14px; font-weight: 400; color: #999999;display: inline-block;">支持PDF、word、txt文档</span>
          </el-form-item>
          <el-form-item label="作者"  prop="author" >
            <el-input  placeholder="选填" style='width: 220px' v-model="form.author">
            </el-input>
          </el-form-item>
          <el-form-item label="发布时间"  prop="publishTime">
            <el-date-picker
              v-model="form.publishTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class='operation-btn-msg' >
        <el-button  @click="back">取消</el-button>
        <el-button type="primary" @click="onSubmit('form')" :loading="addPageLoading">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {dictType} from '@/config/data.js';
import {imgBaseUrl2} from '@/config/config.js';
export default {
  data () {
    const keywords = (rule, value, callback) => {
      if (value) {
        if (!(value.indexOf('，') === -1) && !(value.indexOf('、') === -1)) {
          return callback(new Error('请保持格式一致'));
        } else if (!(value.indexOf('、') === -1)) {
          let keyword = value.split('、');
          if (keyword.length > 3) {
            return callback(new Error('最多添加3个关键词'));
          }
          keyword && keyword.map((item) => {
            if (item.length > 5) {
              return callback(new Error('每个关键词最多5个字'));
            }
          })
        } else if (!(value.indexOf('，') === -1)) {
          let keywords = value.split('，');
          if (keywords.length > 3) {
            return callback(new Error('最多添加3个关键词'));
          }
          keywords && keywords.map((item) => {
            if (item.length > 5) {
              return callback(new Error('每个关键词最多5个字'));
            }
          })
        } else {
          if (value.length > 5) {
            return callback(new Error('每个关键词最多5个字'));
          }
        }
      }
      callback();
    };
    return {
      addPageLoading: false,
      uploadUrl: null,
      placeholderStatus: '未选择文件',
      staskList: [],
      status: '',
      form: {
        publishTime: '',
        title: '',
        typeId: '',
        summary: '',
        author: '',
        keyword: '',
        url: '',
        attachmentType: '',
        attachmentName: '还没上传'
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { max: 75, message: '最多75个字符', trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: '请选择知识类型或者填写', trigger: 'change' }
        ],
        keyword: [
          { required: true, message: '请输入关键词', trigger: 'blur' },
          { validator: keywords, trigger: 'blur' }
        ],
        summary: [
          { required: true, message: '请输入知识简介', trigger: 'blur' },
          { max: 500, message: '最多500个字符', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请上传附件', trigger: 'blur' }
        ],
        author: [
          { max: 4, message: '最多4个字符', trigger: 'blur' }
        ]
      },
      knowledgeTypeList: [],
      eventLevelList: [{dictId: '', dictContent: ''}],
      DepartmentList: [],
      imgParam: {
        projectType: 3
      }
    }
  },
  computed: {
  },
  created () {
    this.getknowledgeType();
    if (this.$route.query.status === 'modify') {
      this.getknowledgedetl()
    }
    this.uploadUrl = imgBaseUrl2;
  },
  mounted () {
    if (this.$route.query.status === 'add') {
      this.status = '添加知识库'
    } else if (this.$route.query.status === 'modify') {
      this.status = '修改知识库'
    }
  },
  methods: {
    change (val) {
      this.DepartmentList && this.DepartmentList.map((item, index) => {
        if (item.uid === val) {
          this.DepartmentList[index].disabled = true;
        } else {
          this.DepartmentList[index].disabled = false;
        }
      });
    },
    onSubmit (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.addPageLoading = true
          let params = {
            emiAttachmentList: [{}],
            emiKnowledgeBank: {
              title: this.form.title,
              publishTime: this.form.publishTime,
              summary: this.form.summary,
              author: this.form.author,
              keyword: this.form.keyword
            }
          };
          if (this.form.url) {
            params.emiAttachmentList[0].url = this.form.url
            params.emiAttachmentList[0].attachmentType = dictType.fileId
            params.emiAttachmentList[0].attachmentName = this.form.attachmentName
          }
          let reg = /^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/
          let val = this.form.typeId.match(reg)
          if (val === null) {
            params.emiKnowledgeBank.knowledgeType = this.form.typeId
          } else {
            params.emiKnowledgeBank.typeId = this.form.typeId
          }
          if (this.$route.query.status === 'add') {
            this.axios.post('A2/knowledgeBankService', params)
              .then((res) => {
                if (res) {
                  this.$message({
                    message: '添加知识成功',
                    type: 'success'
                  });
                  this.$router.push({name: 'emergency-knowledgeBase'})
                  this.addPageLoading = false
                } else {
                  this.addPageLoading = false
                }
              })
          } else {
            params.emiKnowledgeBank.knowledgeId = this.$route.query.knowledgeId;
            this.axios.put('A2/knowledgeBankService', params)
              .then((res) => {
                if (res) {
                  this.$message({
                    message: '修改知识成功',
                    type: 'success'
                  });
                  this.$router.push({name: 'emergency-knowledgeBase'})
                  this.addPageLoading = false
                } else {
                  this.addPageLoading = false
                }
              })
          }
        } else {
          return false;
        }
      });
    },
    back (item) {
      this.$router.push({name: 'emergency-knowledgeBase'})
    },
    getvalue () {
      console.log(this.options.label)
    },
    getknowledgeType () {
      let params = {
        pageSize: 0
      }
      this.axios.get('A2/knowledgeBankService/type/page', {params})
        .then((res) => {
          this.knowledgeTypeList = res.data.list;
        })
    },
    getknowledgedetl () {
      const knowledgeId = this.$route.query.knowledgeId;
      this.axios.get('A2/knowledgeBankService/' + knowledgeId)
        .then((res) => {
          this.form = Object.assign({}, res.data.emiKnowledgeBank, res.data.emiAttachmentList[0])
          console.log(this.form)
          // this.form.title = res.data.emiKnowledgeBank.title;
          // this.form.typeId = res.data.emiKnowledgeBank.typeId;
          // this.form.keyword = res.data.emiKnowledgeBank.keyword;
          // this.form.summary = res.data.emiKnowledgeBank.summary;
          // this.form.author = res.data.emiKnowledgeBank.author
          // this.form.publishTime = res.data.emiKnowledgeBank.publishTime
          // if (res.data.emiAttachmentList.length > 0) {
          //   this.form.attachmentName = res.data.emiAttachmentList[0].attachmentName
          //   this.form.url = res.data.emiAttachmentList[0].url
          // }
          if (this.form.attachmentName === null) {
            this.form.attachmentName = '还没上传'
          }
        })
    },
    submitUpload () {
      this.$refs.upload.submit();
    },
    handSuccess (response, file, fileList) {
      this.form.url = response.data.newFileName;
      this.form.attachmentName = response.data.fileName
      if (response.data) {
        this.$message({
          type: 'success',
          message: '上传成功!'
        });
      }
    },
    handpreview (file) {
      const isImg = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'text/plain' || file.type === 'application/msword' || file.type === 'application/pdf';
      if (!isImg) {
        this.$message.error('上传的文件只能是PDF、Word、txt格式!');
      }
      return isImg
    },
    aa (file) {
      // this.form.attachmentName = file.name;
    },
    handleRemove (response, file, fileList) {
      console.log(response);
      this.attachmentList = response.data
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>
<style lang="scss" scoped>
  .add-knowledge-person {
    padding: 20px;
    .add-msg-header {
      margin-bottom: 20px;
    }
    .add-msg-body {
      .add-form-person {
        background-color: #fff;
        padding-bottom: 2%;
        .form-content-person {
          padding-top: 3%;
          .el-form-item {
            margin-bottom: 15px;
          }
          /deep/ .el-upload-list{
            position: absolute;
            left: 71px;
            top: -2px;
            height: 40px;
            /deep/.el-upload-list__item{
              padding: 0;
            }
            /deep/ .el-upload-list__item-name {
              max-width: 300px;
            }
          }
          .defint{
           /deep/ .el-form-item__content {
              line-height: 0;
            }
          }
          .add-plan {
            width: 100px;
            height: 100px;
            line-height: 100px;
            background-color: #EAEAEA;
            border: 1px solid #EAEAEA;
            position: relative;
            margin: 1% 0 2% 150px;
            border-radius: 6px;
            box-sizing: border-box;
            display: inline-block;
            text-align: center;
            cursor: pointer;
            outline: 0;
            i {
              font-size: 28px;
              margin: 0 auto;
              font-weight: bold;
            }
            .add-img-text {
              color: #C4C2C2;
              font-size: 13px;
              display: block;
              width: 100px;
              height: 13px;
              position: absolute;
              top: 25%;
              left: 0;
            }
          }
        }
      }
    }
    ul{
      li{
        padding: 20px;
        .content{
          margin-left: 20px;
          display: inline-block;
        }
      }
    }
    .xfinput{
      /deep/ input{
        padding-left: 70px;
      }
    }
    .operation-btn-msg {
      margin-top: 2%;
    }
    /deep/.el-upload--picture-card {
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
</style>
