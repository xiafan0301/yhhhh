<template>
  <div class="bg-release">
    <div style=" margin-bottom: 20px; position: relative">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>应急库</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'emergency-materialList'}">物资管理</el-breadcrumb-item>
        <el-breadcrumb-item >查看仓库</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bg-release-cot">
      <ul class="listxf" >
        <li><span class="title">仓库名称</span><span class="content">APP端、联动单位A、联动</span></li>
        <li><span class="title">仓库地点</span><span class="content"> admin（谭某）</span></li>
        <li><span class="title">上报单位</span><span class="content"> 应急指挥中心</span></li>
        <li><span class="title">负责人</span><span class="content"> 关于举办《消防知识》培</span></li>
        <li><span class="title">联系电话</span><span class="content"> 关于举办《消防知识》培</span></li>
        <li><span class="title">创建用户</span><span class="content"> 关于举办《消防知识》培</span></li>
        <li><span class="title">创建时间</span><span class="content"> 关于举办《消防知识》培</span></li>
      </ul>
    </div>
    <div style="margin-top: 21px" >
      <el-button >返回</el-button>
      <el-button type="primary" @click="onSubmit" >修改</el-button>
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
