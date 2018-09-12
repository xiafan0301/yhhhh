<template>
  <div class="bg-release">
    <div style=" margin-bottom: 20px; position: relative">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>消息管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'notice-atmanagementList'}" v-if="this.$route.query.status === '查看公告'">公告管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'system' }"  v-else-if="this.$route.query.status === '查看消息'">系统消息</el-breadcrumb-item>
        <el-breadcrumb-item >{{status}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bg-release-cot">
      <ul class="listxf" v-if="this.$route.query.status === '查看公告'">
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
      <ul class="listxf" v-if="this.$route.query.status === '查看消息'">
        <li><span class="title">接收者</span><span class="content">{{messageInfo.emiMessage.terminal}}</span></li>
        <li><span class="title">类型</span><span class="content">{{messageInfo.emiMessage.messageType}}</span></li>
        <li><span class="title">发布单位</span><span class="content">{{messageInfo.emiMessage.publishUnit}}</span></li>
        <li><span class="title">发布用户</span><span class="content">{{messageInfo.emiMessage.title}}</span></li>
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
      <el-button @click="onSubmit">取消</el-button>
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      status: '',
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
      messageInfo: {emiMessage: {terminal: ''}} // 消息详情
    }
  },
  computed: {
  },
  created () {
    this.getMessageDetail();
  },
  mounted () {
    if (this.$route.query.status === '查看消息') {
      this.status = '查看消息'
    } else if (this.$route.query.status === '查看公告') {
      this.status = '查看公告'
    }
  },
  methods: {
    onSubmit () {
      if (this.$route.query.status === '查看消息') {
        this.$router.push({name: 'system'})
      } else if (this.$route.query.status === '查看公告') {
        this.$router.push({name: 'notice-atmanagementList'})
      }
    },
    getMessageDetail () { // 获取消息详情
      const messageId = this.$route.query.messageId;
      if (messageId) {
        this.axios.get('A2/messageService/' + messageId)
          .then((res) => {
            if (res) {
              this.messageInfo = res.data;
              console.log(res);
              if (res.data.emiMessage.terminal === 1) {
                this.messageInfo.emiMessage.terminal = 'App端';
              } else if (res.data.emiMessage.terminal === 2) {
                this.messageInfo.emiMessage.terminal = 'PC端';
              } else if (res.data.emiMessage.terminal === 3) {
                this.messageInfo.emiMessage.terminal = 'PC端和APP端';
              } else if (res.data.emiMessage.terminal === 4) {
                this.messageInfo.emiMessage.terminal = '不发送';
              }
              if (res.data.emiMessage.messageType === '39728bba-9b6f-11e8-8a14-3f814d634dc1') {
                this.messageInfo.emiMessage.messageType = '民众互助';
              } else if (res.data.emiMessage.messageType === '39728bba-9b6f-11e8-8a14-3f814d634dc3') {
                this.messageInfo.emiMessage.messageType = 'APP应用升级';
              } else if (res.data.emiMessage.messageType === '39728bba-9b6f-11e8-8a14-3f814d634dc4') {
                this.messageInfo.emiMessage.messageType = '应急小秘书';
              }
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
