<template>
  <div class="bg-release">
    <div style=" margin-bottom: 20px; position: relative">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>应急库</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'emergency-knowledgeBase'}">知识库管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>查看知识库</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bg-release-cot">
      <ul class="listxf" >
        <li><span class="title">标题</span><span class="content">{{seeKnowledgeList.title}}</span></li>
        <li><span class="titletype">知识类型</span><span class="contentype" v-for="(item, index) in knowledgeTypeList" :key="index" >{{seeKnowledgeList.typeId === item.typeId? item.knowledgeName: ''}}</span></li>
        <li><span class="title">关键词</span><span class="content"> {{ seeKnowledgeList.keyword}}</span></li>
        <li><span class="title" style="vertical-align: top">知识简介</span>
          <span class="content" style="margin-left:15px "><el-input type="textarea" v-model="seeKnowledgeList.summary" style="display: inline-block; width: 500px"  :autosize="{ minRows: 8, maxRows: 11}" rows="7" disabled></el-input></span>
        </li>
        <li><span class="title">附件</span><span class="content" v-if="!attachmentName">无</span><a class="content" :href="url" style="color:#0785FD;text-decoration:none;"> {{attachmentName}}<el-button  type="primary" style="margin-left: 20px" size="medium" v-if="attachmentName">下载</el-button></a></li>
        <li><span class="title">作者</span><span class="content">{{ seeKnowledgeList.author}}</span><span class="title">发布时间</span> <span class="content">{{seeKnowledgeList.publishTime | moment}}</span></li>
        <li><span class="title">上传用户</span><span class="content">{{ seeKnowledgeList.uploadUser}}</span><span class="title">上传时间</span> <span class="content">{{seeKnowledgeList.createTime | moment}}</span></li>
      </ul>
    </div>
    <div style="margin-top: 21px; position: relative" >
      <el-button @click="back" >返回</el-button>
      <el-button type="primary" @click="onSubmit" >修改</el-button>
    </div>
  </div>
</template>
<script>
import {ajaxCtx2} from '@/config/config.js';
export default {
  data () {
    return {
      seeKnowledgeList: {},
      attachmentName: '',
      knowledgeTypeList: '',
      url: '',
      ajaxCtx2: ''
    }
  },
  computed: {
  },
  created () {
    this.getknowledgeType();
  },
  mounted () {
    this.ajaxCtx2 = ajaxCtx2
    this.$nextTick(() => {
      this.getknowledgedetl()
    })
  },
  methods: {
    getknowledgedetl () {
      const knowledgeId = this.$route.query.knowledgeId;
      this.axios.get('A2/knowledgeBankService/' + knowledgeId)
        .then((res) => {
          this.seeKnowledgeList = res.data.emiKnowledgeBank;
          if (!(res.data.emiAttachmentList.length === 0)) {
            this.attachmentName = res.data.emiAttachmentList[0].attachmentName
            this.url = res.data.emiAttachmentList[0].url
          }
        })
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
    onSubmit () {
      const knowledgeId = this.$route.query.knowledgeId;
      const status = 'modify';
      this.$router.push({name: 'emergency-addKnowledgeBase', query: {knowledgeId: knowledgeId, status: status}})
    },
    back () {
      this.$router.push({name: 'emergency-knowledgeBase'})
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
      padding-bottom: 30px;
      .title {
        color: #222222;
        font-size: 13px;
        display: inline-block;
        width: 100px;
        text-align: right;
      }
      .titletype {
        color: #222222;
        font-size: 13px;
        display: inline-block;
        width: 100px;
        text-align: right;
        margin-right:26px;
      }
      .content {
        color: #777777;
        font-size: 14px;
        margin-left:26px;
        text-align: left;
        display: inline-block;
      }
      .contentype {
        color: #777777;
        font-size: 14px;
        text-align: left;
        display: inline-block;
      }
    }
  }
  /deep/.el-textarea.is-disabled .el-textarea__inner{
    background-color: #fff!important;
    color: #6f7180!important;
    line-height: 20px;
  }
</style>
