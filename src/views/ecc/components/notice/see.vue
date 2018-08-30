<template>
  <div class="bg-release">
    <div style=" margin-bottom: 20px; position: relative">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>消息管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'notice-atmanagementList'}" v-if="gg">公告管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'system' }"  v-if="!gg">系统消息</el-breadcrumb-item>
        <el-breadcrumb-item v-if="gg">查看公告</el-breadcrumb-item>
        <el-breadcrumb-item  v-if="!gg">查看系统消息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bg-release-cot">
      <ul class="listxf" v-if="gg">
      <li><span class="title">接收者</span><span class="content">{{messageInfo.emiMessage.terminal}}</span></li>
      <li><span class="title">发布用户</span><span class="content">{{messageInfo.emiMessage.publishUser}}</span></li>
      <li><span class="title">发布单位</span><span class="content">{{messageInfo.emiMessage.publishUnit}}</span></li>
      <li><span class="title">主题</span><span class="content">{{messageInfo.emiMessage.title}}</span></li>
      <li><span class="title" style="vertical-align: top">内容</span>
        <span class="content">
          <el-input type="textarea" v-model="messageInfo.emiMessage.details" style="display: inline-block; width: 500px"  :autosize="{ minRows: 7, maxRows: 7}" rows="7"></el-input>
        </span>
      </li>
      <li>
        <span class="title"></span>
        <img
          v-for="item in messageInfo.emiAttachments"
          :key='item.attachmentId'
          :src="item.url"
        />
      </li>
      <li><span class="title">发送时间</span> <span class="content">{{messageInfo.emiMessage.publishTime}}</span></li>
    </ul>
      <ul class="listxf" v-if="!gg">
        <li><span class="title">接收者</span><span class="content">{{messageInfo.emiMessage.terminal}}</span></li>
        <li><span class="title">类型</span><span class="content">{{messageInfo.emiMessage.messageType}}</span></li>
        <li><span class="title">发布单位</span><span class="content">{{messageInfo.emiMessage.publishUnit}}</span></li>
        <li><span class="title">主题</span><span class="content">{{messageInfo.emiMessage.title}}</span></li>
        <li><span class="title" style="vertical-align: top">内容</span>
          <span class="content"><el-input type="textarea" v-model="messageInfo.emiMessage.details" style="display: inline-block; width: 500px"  :autosize="{ minRows: 7, maxRows: 7}" rows="7"></el-input></span>
        </li>
        <li>
          <span class="title"></span>
          <img
            v-for="item in messageInfo.emiAttachments"
            :key='item.attachmentId'
            :src="item.url"
          />
        </li>
        <li><span class="title">发送时间</span> <span class="content">{{messageInfo.emiMessage.publishTime}}</span></li>
      </ul>
    </div>
    <div style="margin-top: 21px" >
      <el-button>取消</el-button>
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        resource: '公告',
        desc: '',
        checked: false,
        xtxx: '系统消息'
      },
      gg: '',
      messageInfo: {} // 消息详情
    }
  },
  computed: {
  },
  mounted () {
    this.gg = this.$route.query.modify;
    this.getMessageDetail();
  },
  methods: {
    onSubmit () {
    },
    getMessageDetail () { // 获取消息详情
      const messageId = this.$route.query.messageId;
      if (messageId) {
        this.axios.get('A2/messageService/' + messageId)
          .then((res) => {
            if (res) {
              this.messageInfo = res.data;
            }
          })
          .catch(() => {})
      }
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
    padding-top: 55px;
    box-sizing: border-box;
    padding-left: 100px;
    padding-bottom: 86px;
  }
  .listxf{
    >li{
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
        margin-left:2%;
        text-align: left;
        display: inline-block;
      }
      img{
        width:100px ;
        height: 100px;
        margin-left: 2%;
      }
    }
  }
</style>
