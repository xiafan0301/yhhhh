<template>
  <div class="bg-release">
    <div style=" margin-bottom: 20px; position: relative">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>应急库</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'emergency-planList'}">预案管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>查看预案</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bg-release-cot">
      <ul class="listxf" >
        <li><span class="title">预案名称</span><span class="content">{{seeplanList.planName}}</span></li>
        <li><span class="title">预案类型</span><span class="content">{{seeplanList.eventTypeName}}</span></li>
        <li><span class="title">适用事件等级</span><span class="content" v-for="(item, index) in seeplanList.levelNameList" :key=" 'fawe' +index"> {{item}}</span></li>
        <li><span class="title" style="vertical-align: top">预案正文</span>
          <span class="content" style="margin-left:15px "><el-input type="textarea" v-model="seeplanList.planDetail" style="display: inline-block; width: 500px"  :autosize="{ minRows: 8, maxRows: 11}" rows="7" disabled></el-input></span>
        </li>
        <li><span class="title">附件</span><span class="content" v-if="!seeplanList.attachmentName">无</span><a class="content" :href="seeplanList.url" style="color:#0785FD;text-decoration:none;"> {{seeplanList.attachmentName}}<el-button  type="primary" style="margin-left: 20px" size="medium" v-if="seeplanList.attachmentName">下载</el-button></a></li>
        <li><span class="title">响应处置</span>
        <div style="margin-left: 118px; padding-bottom: 20px" v-for="(item, index) in seeplanList.taskList" :key="'faw'+index">
          <ul style="background-color: #FAFAFA; width: 500px; padding: 20px ">
            <li><span > 协同部门</span ><span class="content">{{seeplanList.taskList&&seeplanList.taskList[index].departmentName}}</span></li>
            <li><span > 任务名称</span ><span class="content">{{seeplanList.taskList&&seeplanList.taskList[index].taskName}}</span></li>
            <li><span > 任务内容</span ><span class="content">{{seeplanList.taskList&&seeplanList.taskList[index].taskContent}}</span></li>
          </ul >
        </div>
      </li>
        <li><span class="title">发布用户</span><span class="content">{{seeplanList.createUserName && seeplanList.createUserName}}</span><span class="title">发送时间</span> <span class="content">{{seeplanList.createTime}}</span></li>
      </ul>
    </div>
    <div style="margin-top: 21px; position: relative" >
      <el-button @click="back" >取消</el-button>
      <el-button type="primary" @click="onSubmit" >修改</el-button>
      <a target="_blank" :href="ajaxCtx2 + '/planServices/plans/preview/' + this.$route.query.planId">
        <el-button style="margin-left: 10px; background-color: #FB796C; color: #fff" icon="icon-yulan-"> 预览</el-button>
      </a>
    </div>
  </div>
</template>
<script>
import {ajaxCtx2} from '@/config/config.js';
export default {
  data () {
    return {
      seeplanList: {},
      tasklist: [{taskName: ''}],
      taskName: '',
      ajaxCtx2: ''
    }
  },
  computed: {
  },
  created () {
    this.getplans()
  },
  mounted () {
    this.ajaxCtx2 = ajaxCtx2
  },
  methods: {
    getplans () {
      const planId = this.$route.query.planId;
      this.axios.get('A2/planServices/plans/' + planId)
        .then((res) => {
          console.log(res);
          this.seeplanList = res.data;
          console.log(this.seeplanList)
        })
    },
    preview () {
      const planId = this.$route.query.planId;
      this.axios.get('A2/planServices/plans/preview/' + planId)
        .then((res) => {
        })
    },
    onSubmit () {
      const planId = this.$route.query.planId;
      const status = 'modify';
      this.$router.push({name: 'emergency-addPlan', query: {planId: planId, status: status}})
    },
    back () {
      this.$router.push({name: 'emergency-planList'})
    }
  }
}
</script>
<style lang="scss" scoped>
  .bg-release {
    padding: 20px;
  }
  .bg-release-cot {
    background-color: #FFFFFF;
    padding-top: 40px;
    box-sizing: border-box;
    padding-left: 100px;
    padding-bottom: 30px;
  }
  .listxf{
    li{
      padding-bottom: 20px;
      .title {
        color: #222222;
        font-size: 13px;
        display: inline-block;
        width: 100px;
        text-align: right;
      }
      .content {
        color: #777777;
        font-size: 14px;
        margin-left:26px;
        text-align: left;
        display: inline-block;
      }
    }
  }
  .plan-bdg {
    background: url(../../../../assets/img/temp/replan-checked.png)  no-repeat right  center;
    display: inline-block;
    width: 26px;
    height: 28px;
  }
  /deep/.el-textarea.is-disabled .el-textarea__inner{
    background-color: #fff!important;
    color: #6f7180!important;
    line-height: 20px;
  }
</style>
