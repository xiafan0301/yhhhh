<template>
  <div class="add-plan-person">
    <div class='add-msg-header'>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>应急库</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'emergency-planList'}" >预案管理</el-breadcrumb-item>
        <el-breadcrumb-item >{{status}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='add-msg-body'>
      <div class='add-form-person'>
        <el-form class='form-content-person' :model="form"  ref="form" :inline-message= true>
          <el-form-item label="预案名称" label-width='150px' prop="planName" :rules="[{ required: true, message: '请输入预案名称', trigger: 'blur' }]">
            <el-input  placeholder="请输入预案名称" style='width: 500px' v-model="form.planName">
            </el-input>
          </el-form-item>
          <el-form-item label="预案类型" label-width='150px' prop="eventType"  :rules="[{ required: true, message: '请选择预案类型', trigger: 'change' }]">
            <el-select  placeholder="选择预案类型" style='width: 500px' v-model="form.eventType">
              <el-option
                v-for="item in eventTypeList"
                :key="item.dictId"
                :label="item.dictContent"
                :value="item.dictId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="适用事件等级" label-width='150px' prop="levelList" :rules="[{ required: true, message: '请选择事件等级（可多选）', trigger: 'change' }]">
            <el-select  placeholder="选择事件等级(可多选)" style='width: 500px' v-model="form.levelList" multiple>
              <el-option
                v-for="item in eventLevelList"
                :key="item.dictId"
                :label="item.dictContent"
                :value="item.dictId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预案正文" label-width='150px' prop="planDetail" :rules="[ { required: true, message: '请输入预案正文', trigger: 'blur' }]">
            <el-input type="textarea" style='width: 500px' placeholder='请输入预案正文...' rows='7' v-model="form.planDetail"></el-input>
          </el-form-item>
          <el-form-item label="附件" label-width='150px'>
            <el-input  style='width: 389px; position: relative;' class="xfinput" disabled  :placeholder='placeholderStatus'>
            </el-input>
            <el-upload style="display: inline-block"
                       action="http://10.16.4.50:8001/api/network/upload/new"
                       ref="upload"
                       :limit = "1"
                       :on-change = "aa"
                       :on-success="handSuccess"
                       :auto-upload="false"
                       :before-upload="handpreview">
              <el-button  type="primary" size="mini" style="position: absolute; left: 5px; top: 6px; background-color: #FAFAFA; border: 1px solid #EAEAEA"  >
              <span style="font-size:12px;color:#555555">浏览..</span></el-button>
            </el-upload>
            <el-button type="primary" size="medium"  @click="submitUpload" v-if="status === '添加预案'">上传</el-button>
            <el-button type="primary" size="medium"  @click="submitUpload" v-if = "form.attachmentName && status === '修改预案'">重新上传</el-button>
            <el-button type="primary" size="medium"  @click="submitUpload" v-if = "!form.attachmentName && status === '修改预案'">上传</el-button>
            <span style="font-size: 14px; font-weight: 400; color: #0785FD">支持PDF、word、txt文档</span>
          </el-form-item>
            <!--<div style="background-color: #FAFAFA; margin-left: 150px;width: 500px; margin-bottom: 20px"  v-for="(item, index) in staskList" :key="'fawe' + index">-->
              <!--<ul>-->
                <!--<li><span class="title">协同部门</span><span class="content">{{item.departmentName}}</span></li>-->
                <!--<li><span class="title">协同部门</span><span class="content">{{item.taskName}}</span></li>-->
                <!--<li><span class="title">协同部门</span><span class="content">{{item.taskContent}}</span></li>-->
              <!--</ul>-->
            <!--</div>-->
          <el-form-item label="响应处置" label-width='150px'>
            <div style="width: 570px;background-color:#FAFAFA; padding: 20px; margin-bottom: 15px" v-for="(item, index) in form.taskList" :key="'fawe' + index" :value="item.departmentName">
            <el-form-item label="协同部门" label-position="left" :prop="'taskList.'+ index + '.departmentId'" :rules ="[{ required: true, message: '请选择协同部门', trigger: 'change' }]">
              <el-select style="width: 358px" placeholder='选择协同部门' v-model="form.taskList[index].departmentId" @change="change" >
                <el-option
                  :disabled="item.disabled"
                  v-for="item in DepartmentList"
                  :key="item.uid"
                  :label="item.organName"
                  :value="item.uid">
                </el-option>
              </el-select>
            </el-form-item>
              <el-form-item label="任务名称" label-position="left" :prop="'taskList.'+ index + '.taskName'" :rules ="[{ required: true, message: '请输入任务名称', trigger: 'blur' }]">
                <el-input style="width: 358px" placeholder='请输入任务名称' v-model="form.taskList[index].taskName" ></el-input>
              </el-form-item>
              <el-form-item label="任务内容" label-position="left" :prop="'taskList.'+ index + '.taskContent'" :rules ="[{ required: true, message: '请输入任务名称', trigger: 'blur' }]">
                <el-input type="textarea" style='width: 358px' placeholder='请输入任务内容' rows='5' v-model="form.taskList[index].taskContent"></el-input>
              </el-form-item>
              <el-button type='text' @click="del(index)" v-if="index>0">删除</el-button>
            </div>
          </el-form-item>
          <div class='add-plan' @click="addPlan('taskForm')">
            <i class="el-icon-plus" style='width: 36px;height:36px;color:#D8D8D8'></i>
            <span class='add-img-text'>添加协同部门</span>
          </div>
          <!--<el-form-item style='margin-left: 150px'>-->
            <!--<el-upload-->
              <!--action="http://10.16.4.50:8001/api/network/upload/new"-->
              <!--list-type="picture-card"-->
              <!--:on-preview="handlePictureCardPreview"-->
              <!--:on-success="handleRemove"-->
            <!--&gt;-->
              <!--<i class="el-icon-plus" style='width: 36px;height:36px;color:#D8D8D8'></i>-->
              <!--<span class='add-img-text'>添加图片</span>-->
            <!--</el-upload>-->
          <!--</el-form-item>-->
        </el-form>
      </div>
      <div class='operation-btn-msg' >
        <el-button  @click="back">取消</el-button>
        <el-button type="primary" @click="onSubmit('form')" >确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {dictType} from '@/config/data.js';
export default {
  data () {
    return {
      placeholderStatus: '未选择文件',
      staskList: [],
      status: '',
      form: {
        planName: '',
        eventType: '',
        levelList: [],
        planDetail: '',
        taskList: [{
          departmentName: '',
          taskName: '',
          taskContent: '',
          departmentId: '',
          taskId: ''
        }],
        url: '',
        attachmentType: '',
        attachmentName: ''
      },
      rules: {
        planName: [
          { required: true, message: '请输入预案名称', trigger: 'blur' }
        ],
        eventType: [
          { required: true, message: '请选择预案类型', trigger: 'change' }
        ],
        levelList: [
          { required: true, message: '请选择事件等级（可多选）', trigger: 'change' }
        ],
        planDetail: [
          { required: true, message: '请输入预案正文', trigger: 'blur' }
        ]
        // departmentId: [
        //   { required: true, message: '请选择协同部门', trigger: 'change' }
        // ],
        // taskName: [
        //   { required: true, message: '请输入任务名称', trigger: 'blur' }
        // ],
        // taskContent: [
        //   { required: true, message: '请输入任务内容', trigger: 'blur' }
        // ]
      },
      eventTypeList: [],
      eventLevelList: [{dictId: '', dictContent: ''}],
      DepartmentList: []
    }
  },
  computed: {
  },
  created () {
    this.getEventLevel();
    this.getEventType();
    if (this.$route.query.status === 'modify') {
      this.getplans()
    }
    this.getDepartmentList();
  },
  mounted () {
    if (this.$route.query.status === 'add') {
      this.status = '添加预案'
    } else if (this.$route.query.status === 'modify') {
      this.status = '修改预案'
    }
  },
  methods: {
    del (index) {
      this.form.taskList.splice(index, 1)
    },
    change (val) {
      this.DepartmentList && this.DepartmentList.map((item, index) => {
        if (item.uid === val) {
          this.DepartmentList[index].disabled = true;
        } else {
          this.DepartmentList[index].disabled = false;
        }
      });
    },
    addPlan () {
      this.form.taskList.push({departmentName: '',
        taskName: '',
        taskContent: '',
        departmentId: '',
        taskId: ''});
      console.log(this.departmentsList)
      // this.staskList = JSON.parse(JSON.stringify(this.form.taskList));
    },
    onSubmit (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.$route.query.status === 'add') {
            this.DepartmentList && this.DepartmentList.map((item, index) => {
              this.form.taskList && this.form.taskList.map((ite, ind) => {
                if (item.uid === ite.departmentId) {
                  this.form.taskList[ind].departmentName = item.organName;
                }
              });
            });
            let params = this.form;
            // let params = {
            //   attachmentName: this.form.attachmentName,
            //   attachmentType: this.form.attachmentType,
            //   eventType: this.form.eventType,
            //   levelList: this.form.levelList,
            //   planDetail: this.form.planDetail,
            //   planName: this.form.planName,
            //   taskList: [
            //     {
            //       departmentName: this.form.taskList[this.index].departmentName,
            //       departmentId: this.form.taskList[this.index].departmentId,
            //       taskContent: this.form.taskList[this.index].taskContent,
            //       taskName: this.form.taskList[this.index].taskName
            //     }
            //   ],
            //   url: this.form.Url
            // // };
            this.axios.post('A2/planServices/plan', params)
              .then((res) => {
                this.$router.push({name: 'emergency-planList'})
              })
          } else {
            this.DepartmentList && this.DepartmentList.map((item, index) => {
              this.form.taskList && this.form.taskList.map((ite, ind) => {
                if (item.uid === ite.departmentId) {
                  this.form.taskList[ind].departmentName = item.organName;
                }
              });
            });
            this.form.attachmentType = dictType.fileId;
            let params = this.form;
            params.planId = this.$route.query.planId;
            if (this.form.url === null) {
              this.form.url = '';
              this.form.attachmentName = '';
              this.form.attachmentType = '';
            }
            console.log(this.form);
            // let params = {
            //   attachmentName: this.form.attachmentName,
            //   attachmentType: this.form.attachmentType,
            //   eventType: this.form.eventType,
            //   levelList: this.form.levelList,
            //   planDetail: this.form.planDetail,
            //   planId: this.$route.query.planId,
            //   planName: this.form.planName,
            //   taskList: [
            //     {
            //       departmentId: this.form.taskList[0].departmentId,
            //       taskContent: this.form.taskList[0].taskContent,
            //       taskId: this.form.taskList[0].taskId,
            //       taskName: this.form.taskList[0].taskName,
            //       departmentName: this.form.taskList[0].departmentName
            //     }
            //   ],
            //   url: this.form.url
            // };
            this.axios.put('A2/planServices/plans', params)
              .then((res) => {
                this.$router.push({name: 'emergency-planList'})
              })
          }
        } else {
          return false;
        }
      });
    },
    back (item) {
      this.$router.push({name: 'emergency-planList'})
    },
    getvalue () {
      console.log(this.options.label)
    },
    getEventLevel () {
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.eventLevelId)
        .then((res) => {
          this.eventLevelList = res.data
        })
    },
    getEventType () {
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.eventTypeId)
        .then((res) => {
          this.eventTypeList = res.data;
        })
    },
    getDepartmentList () {
      this.axios.get('A3/authServices/organInfos')
        .then((res) => {
          if (res && res.data.list) {
            console.log(res)
            this.DepartmentList = res.data.list
          }
        })
        .catch(() => {})
    },
    getplans () {
      const planId = this.$route.query.planId;
      this.axios.get('A2/planServices/plans/' + planId)
        .then((res) => {
          this.form = Object.assign({}, res.data);
          this.form.url = res.data.url;
          this.placeholderStatus = this.form.attachmentName
          console.log(this.form.url);
          console.log(this.form)
        })
    },
    submitUpload () {
      this.$refs.upload.submit();
    },
    handSuccess (response, file, fileList) {
      this.form.url = response.data.newFileName;
      this.form.attachmentType = dictType.fileId;
      if (response.data) {
        this.$message({
          type: 'success',
          message: '上传成功!'
        });
      }
    },
    handpreview (file) {
      this.form.attachmentName = file.name;
    },
    aa (file) {
      this.placeholderStatus = '';
      this.form.attachmentName = file.name;
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
<style lang="scss">
  .add-plan-person {
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
          /deep/.el-upload-list{
            position: absolute;
            left: 71px;
            top: -2px;
            height: 40px;
            /deep/.el-upload-list__item{
              padding: 0;
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
      input{
        padding-left: 70px;
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
    }
  }
</style>
