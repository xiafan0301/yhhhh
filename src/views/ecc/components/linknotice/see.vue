<template>
  <div class="bg-release">
    <div style=" margin-bottom: 20px; position: relative">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>消息管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'link-noticeAtmanagementList'}" v-if="this.$route.query.status === '查看公告'">公告管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'system' }"  v-else-if="this.$route.query.status === '查看消息'">系统消息</el-breadcrumb-item>
        <el-breadcrumb-item ><span style='color: #0785FD'>{{status}}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bg-release-cot">
      <ul class="listxf" v-if="this.$route.query.status === '查看公告'">
        <li><div style="display: flex"><div><span class="title">接收者</span></div><div style="width: 100%;" ><span class="content">{{messageInfo.emiMessage.terminal}}</span><span class="content" v-for="(item, index) in messageInfo.receiveRelations" :key="index" v-if="item.receiveUserName">{{item.receiveUserName}}</span></div></div></li>
        <li><span class="title">发布用户</span><span class="content">{{messageInfo.emiMessage.publishUserName}}</span></li>
        <li><span class="title">发布单位</span><span class="content">{{messageInfo.emiMessage.publishUnitName}}</span></li>
        <li><span class="title">主题</span><span class="content">{{messageInfo.emiMessage.title}}</span></li>
        <li><span class="title" style="vertical-align: top">内容</span><span class="content"><el-input type="textarea" v-model="messageInfo.emiMessage.details" style="display: inline-block; width: 500px"  :autosize="{ minRows: 7, maxRows: 7}" rows="7" disabled></el-input></span></li>
        <li style="margin-left: 98px" v-if="messageInfo.emiAttachments">
        <span class="content">
          <div id="imgs"></div>
        </span>
        </li>
        <li><span class="title">发送时间</span> <span class="content">{{messageInfo.emiMessage.publishTime}}</span></li>
      </ul>
      <ul class="listxf" v-if="this.$route.query.status === '查看消息'">
        <li><span class="title">接收者</span><span class="content">{{messageInfo.emiMessage.terminal}}</span></li>
        <li><span class="title">类型</span><span class="content">{{messageInfo.emiMessage.messageType}}</span></li>
        <li><span class="title">发布单位</span><span class="content">{{messageInfo.emiMessage.publishUnitName}}</span></li>
        <li><span class="title">发布用户</span><span class="content">{{messageInfo.emiMessage.publishUserName}}</span></li>
        <li><span class="title" style="vertical-align: top">内容</span><span class="content"><el-input type="textarea" v-model="messageInfo.emiMessage.details" style="display: inline-block; width: 500px"  :autosize="{ minRows: 7, maxRows: 7}" rows="7" disabled></el-input></span>
        </li>
        <li><span class="title">发送时间</span> <span class="content">{{messageInfo.emiMessage.publishTime}}</span></li>
      </ul>
    </div>
    <div style="margin-top: 21px" >
      <el-button @click="onSubmit" v-if="this.$route.query.publishState === 3">修改</el-button>
      <el-button type="primary" @click="back">关闭</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
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
      messageInfo: {emiMessage: {terminal: ''}}, // 消息详情
      data: []
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
        this.$router.push({name: 'notice-modify', query: {status: 'modifysystem', messageId: this.$route.query.messageId}});
      } else if (this.$route.query.status === '查看公告') {
        this.$router.push({name: 'link-modify', query: {status: 'modifyatgment', messageId: this.$route.query.messageId}});
      }
    },
    back () {
      if (this.$route.query.status === '查看消息') {
        this.$router.push({name: 'system'})
      } else if (this.$route.query.status === '查看公告') {
        this.$router.push({name: 'link-noticeAtmanagementList'})
      }
    },
    getMessageDetail () { // 获取消息详情
      const messageId = this.$route.query.messageId;
      if (messageId) {
        this.axios.get('A2/messageService/' + messageId)
          .then((res) => {
            if (res) {
              this.messageInfo = res.data;
              if (this.messageInfo.emiAttachments.length === 0) {
                this.messageInfo.emiAttachments = false
              }
              console.log(this.messageInfo.emiAttachments)
              if (res.data.emiMessage.terminal === 1) {
                this.messageInfo.emiMessage.terminal = 'App端';
              } else if (res.data.emiMessage.terminal === 2) {
                this.messageInfo.emiMessage.terminal = 'PC端';
              } else if (res.data.emiMessage.terminal === 3) {
                this.messageInfo.emiMessage.terminal = 'APP端';
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
              this.messageInfo.emiAttachments.forEach(aa => {
                this.data.push({fileFullPath: aa.url})
              })
              if (this.messageInfo.emiAttachments.length > 0) {
                this.previewPictures(this.data)
              }
            }
          })
          .catch(() => {})
      }
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    previewPictures (data) {
      setTimeout(() => {
        let imgs = data.map(value => value.fileFullPath);// 图片路径要配置好！
        // 图片数组2
        let imgs2 = []
        // 获取图片列表容器
        let $el = document.getElementById('imgs');
        let html = '';
        // 创建img dom
        imgs.forEach(function (src) {
          // 拼接html结构
          html += '<div class="item" style=" float: left;display: flex;align-items: center;justify-content: center;width: 82px;height: 115px;overflow: hidden;box-sizing: border-box;border: 1px solid #f1f1f1;margin: 5px;cursor: pointer;" data-angle="' + 0 + '"><img src="' + src + '" style="width: 100%;height: auto;"></div>';
          // 生成imgs2数组
          imgs2.push({
            url: src,
            angle: 0
          })
        })
        // 将图片添加至图片容器中
        $el.innerHTML = html;
        // 使用方法
        let config = {
          showToolbar: true
        }
        let ziv = new ZxImageView(config, imgs2);
        // console.log(ziv);
        // 查看第几张
        let $images = $el.querySelectorAll('.item');
        for (let i = 0; i < $images.length; i++) {
          (function (index) {
            $images[i].addEventListener('click', function () {
              ziv.view(index);
            })
          }(i))
        }
      }, 100)
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
        text-align: right;
        display: inline-block;
      }
    }
  }
  /deep/  .el-upload-list--picture-card  .el-upload-list__item {
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
  /deep/ .el-upload--picture-card {
    display: none;
  }
  /deep/ .el-upload-list__item-delete {
    display: none !important;
  }
  /deep/.el-textarea.is-disabled .el-textarea__inner{
    background-color: #fff!important;
    color: #6f7180!important;
    line-height: 20px;
  }
</style>
