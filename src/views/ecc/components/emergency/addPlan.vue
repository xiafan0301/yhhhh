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
        <el-form class='form-content-person' :model="form">
          <el-form-item label="预案名称" label-width='150px'>
            <el-input  placeholder="请输入预案名称" style='width: 500px' v-model="form.planName">
            </el-input>
          </el-form-item>
          <el-form-item label="预案类型" label-width='150px'>
            <el-select  placeholder="选择预案类型" style='width: 500px' v-model="form.eventType">
              <el-option
                v-for="item in eventTypeList"
                :key="item.dictId"
                :label="item.dictContent"
                :value="item.dictId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="适用事件等级" label-width='150px'>
            <el-select  placeholder="选择事件等级(可多选)" style='width: 500px' v-model="form.levelList" multiple>
              <el-option
                v-for="item in eventLevelList"
                :key="item.dictId"
                :label="item.dictContent"
                :value="item.dictId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预案正文" label-width='150px'>
            <el-input type="textarea" style='width: 500px' placeholder='请输入预案正文...' rows='7' v-model="form.planDetail"></el-input>
          </el-form-item>
          <el-form-item label="附件" label-width='150px'>
            <el-input  style='width: 389px; position: relative;'  v-model="form.attachmentName" class="xfinput" disabled>
            </el-input>
            <el-upload style="display: inline-block"
                       action="http://10.16.4.50:8001/api/network/upload/new"
                       ref="upload"
                       :on-success="handSuccess"
                       :show-file-list ="false"
                       :before-upload="handpreview">
              <el-button  type="primary" size="mini" style="position: absolute; left: 5px; top: 6px; background-color: #FAFAFA; border: 1px solid #EAEAEA"  >
              <span style="font-size:12px;color:#555555">浏览..</span></el-button>
            </el-upload>
            <el-button type="primary" size="medium"  @click="submitUpload">上传</el-button>
          </el-form-item>
            <!--<div style="background-color: #FAFAFA; margin-left: 150px;width: 500px; margin-bottom: 20px"  v-for="(item, index) in staskList" :key="'fawe' + index">-->
              <!--<ul>-->
                <!--<li><span class="title">协同部门</span><span class="content">{{item.departmentName}}</span></li>-->
                <!--<li><span class="title">协同部门</span><span class="content">{{item.taskName}}</span></li>-->
                <!--<li><span class="title">协同部门</span><span class="content">{{item.taskContent}}</span></li>-->
              <!--</ul>-->
            <!--</div>-->
          <el-form-item label="响应处置" label-width='150px'>
            <div style="width: 500px;background-color:#FAFAFA; padding: 20px; margin-bottom: 15px" v-for="(item, index) in form.taskList" :key="'fawe' + index" :value="item.departmentName">
            <el-form-item label="协同部门" label-position="left">
              <el-select style="width: 358px" placeholder='选择协同部门' v-model="form.taskList[index].departmentId" :value="form.taskList[index].departmentName">
                <el-option
                  v-for="item in  departmentsList"
                  :key="item.departmentId"
                  :label="item.departmentName"
                  :value="item.departmentId">
                </el-option>
              </el-select>
            </el-form-item>
              <el-form-item label="任务名称" label-position="left">
                <el-input style="width: 358px" placeholder='请输入任务名称' v-model="form.taskList[index].taskName" ></el-input>
              </el-form-item>
              <el-form-item label="任务内容" label-position="left">
                <el-input type="textarea" style='width: 358px' placeholder='请输入任务内容' rows='5' v-model="form.taskList[index].taskContent"></el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <div class='add-plan' @click="addPlan('taskForm')">
            <i class="el-icon-plus" style='width: 36px;height:36px;color:#D8D8D8'></i>
            <span class='add-img-text'>添加任务</span>
          </div>
          <el-form-item style='margin-left: 150px'>
            <el-upload
              action="http://10.16.4.50:8001/api/network/upload/new"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-success="handleRemove"
            >
              <i class="el-icon-plus" style='width: 36px;height:36px;color:#D8D8D8'></i>
              <span class='add-img-text'>添加图片</span>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div class='operation-btn-msg' >
        <el-button  @click="back">取消</el-button>
        <el-button type="primary" @click="onSubmit" >确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {dictType} from '@/config/data.js';
export default {
  data () {
    return {
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
          departmentId: ''
        }],
        Url: '',
        attachmentType: '',
        attachmentName: ''
      },
      eventTypeList: [],
      eventLevelList: [{dictId: '', dictContent: ''}],
      departmentsList: []
    }
  },
  computed: {
  },
  created () {
    this.getEventLevel();
    this.getEventType();
    this.getdepartments();
    if (this.$route.query.status === 'modify') {
      this.getplans()
    }
  },
  mounted () {
    if (this.$route.query.status === 'add') {
      this.status = '添加预案'
    } else if (this.$route.query.status === 'modify') {
      this.status = '修改预案'
    }
  },
  methods: {
    addPlan () {
      this.form.taskList.push({departmentName: '',
        taskName: '',
        taskContent: '',
        departmentId: ''});
      this.staskList.push(this.tasklis);
      // this.staskList = JSON.parse(JSON.stringify(this.form.taskList));
    },
    onSubmit () {
      if (this.$route.query.status === 'add') {
        this.departmentsList && this.departmentsList.map((item, index) => {
          if (item.departmentId === this.form.taskList[0].departmentId) {
            this.form.taskList[0].departmentName = item.departmentName;
            console.log(this.form)
          }
        });
        if (this.form.taskList.length === 2) {
          this.departmentsList && this.departmentsList.map((item, index) => {
            if (item.departmentId === this.form.taskList[1].departmentId) {
              this.form.taskList[1].departmentName = item.departmentName;
              console.log(this.form)
            }
          });
        }
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
        // };
        this.axios.post('A2/planServices/plan', params)
          .then((res) => {
            this.$router.push({name: 'emergency-planList'})
          })
      } else {
        this.departmentsList && this.departmentsList.map((item, index) => {
          if (item.departmentId === this.form.taskList[0].departmentId) {
            this.form.taskList[0].departmentName = item.departmentName
          }
        });
        this.form.attachmentType = dictType.fileId;
        let params = {
          attachmentName: this.form.attachmentName,
          attachmentType: this.form.attachmentType,
          eventType: this.form.eventType,
          levelList: this.form.levelList,
          planDetail: this.form.planDetail,
          planId: this.$route.query.planId,
          planName: this.form.planName,
          taskList: [
            {
              departmentId: this.form.taskList[0].departmentId,
              taskContent: this.form.taskList[0].taskContent,
              taskId: this.form.taskList[0].taskId,
              taskName: this.form.taskList[0].taskName,
              departmentName: this.form.taskList[0].departmentName
            }
          ],
          url: this.form.Url
        };
        console.log(this.form.Url);
        this.axios.put('A2/planServices/plans', params)
          .then((res) => {
            this.$router.push({name: 'emergency-planList'})
          })
      }
    },
    back (item) {
      console.log($('div')[this.label])
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
    getdepartments () {
      this.axios.get('A2/departmentServices/departments')
        .then((res) => {
          this.departmentsList = res.data;
        })
    },
    getplans () {
      const planId = this.$route.query.planId;
      this.axios.get('A2/planServices/plans/' + planId)
        .then((res) => {
          console.log(res);
          this.form = Object.assign({}, res.data);
          this.form.Url = res.data.url
        })
    },
    submitUpload () {
      this.$refs.upload.submit();
    },
    handSuccess (response, file, fileList) {
      this.form.Url = response.data.newFileName;
      this.form.attachmentType = dictType.fileId;
    },
    handpreview (file) {
      this.form.attachmentName = file.name;
      console.log(file)
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
              width: 54px;
              height: 13px;
              position: absolute;
              top: 25%;
              left: 25%;
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
  }
</style>
