<template>
  <div class="bg-release">
    <div style=" margin-bottom: 20px; position: relative">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>应急库</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'emergency-planList'}">预案管理</el-breadcrumb-item>
        <el-breadcrumb-item>查看预案</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="position: absolute; top: -10px; right: 0;">
        <el-button type="primary" size="small"  @click.native="showEditDialog(true)" icon="el-icon-plus">发布</el-button>
      </div>
    </div>
    <div class="bg-release-cot">
      <ul class="listxf" >
        <li><span class="title">预案名称</span><span class="content">APP端、联动单位A、联动</span></li>
        <li><span class="title">预案类型</span><span class="content"> admin（谭某）</span></li>
        <li><span class="title">适用事件等级</span><span class="content"> 应急指挥中心</span></li>
        <li><span class="title" style="vertical-align: top">预案正文</span>
          <span class="content" style="margin-left:15px "><el-input type="textarea" v-model="form.desc" style="display: inline-block; width: 500px"  :autosize="{ minRows: 7, maxRows: 7}" rows="7"></el-input></span>
        </li>
        <li><span class="title">附件</span><span class="content"> 应急指挥中心</span></li>
        <li><span class="title">响应处置</span>
        <div style="margin-left: 118px">
          <ul style="background-color: #FAFAFA; width: 500px; padding: 20px ">
            <li><span > 协同部门</span ><span class="content">联动单位B</span></li>
            <li><span > 协同部门</span ><span class="content">联动单位B</span></li>
            <li><span > 协同部门</span ><span class="content">联动单位B</span></li>
          </ul >
        </div>
          <div style="margin-left: 118px; padding-top: 20px">
            <ul style="background-color: #FAFAFA; width: 500px; padding: 20px ">
              <li><span > 协同部门</span ><span class="content">联动单位B</span></li>
              <li><span > 协同部门</span ><span class="content">联动单位B</span></li>
              <li><span > 协同部门</span ><span class="content">联动单位B</span></li>
            </ul >
          </div>
      </li>
        <li><span class="title">发送时间</span> <span class="content">2018-07-13 10:55:55</span></li>
      </ul>
    </div>
    <div style="margin-top: 21px" >
      <el-button >取消</el-button>
      <el-button type="primary" @click="onSubmit" >确定</el-button>
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
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  computed: {
  },
  mounted () {
    this.gg = this.$route.query.modify
  },
  methods: {
    onSubmit () {
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
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
  }
  .bg-release-cot {
    background-color: #FFFFFF;
    padding-top: 55px;
    box-sizing: border-box;
    padding-left: 100px;
    padding-bottom: 86px;
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
</style>
