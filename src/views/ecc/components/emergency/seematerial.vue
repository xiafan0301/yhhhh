<template>
  <div class="bg-release">
    <div style=" margin-bottom: 20px; position: relative">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>应急库</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'emergency-materialList'}">物资管理</el-breadcrumb-item>
        <el-breadcrumb-item >查看物资</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bg-release-cot">
      <ul class="listxf" >
        <li><span class="title">资源名称</span><span class="content">{{this.obj.materialsName}}</span></li>
        <li><span class="title">数量</span><span class="content"> {{this.obj.amount}}</span></li>
        <li><span class="title">单位</span><span class="content"> {{this.obj.measurementUnit}}</span></li>
        <li><span class="title">所属仓库</span><span class="content"> {{this.obj.warehouseId}}</span></li>
        <li><span class="title">创建用户</span><span class="content"> {{this.obj.authUserId}}</span></li>
        <li><span class="title">创建时间</span><span class="content"> {{this.obj.createTime}}</span></li>
      </ul>
    </div>
    <div style="margin-top: 21px" >
      <el-button  @click="back">返回</el-button>
      <el-button type="primary" @click="onSubmit('modify')" >修改</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      obj: {
        materialsName: '',
        amount: '',
        measurementUnit: '',
        warehouseId: '',
        authUserId: '',
        createTime: ''
      }
    }
  },
  created () {
    this.getmaterial()
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    getmaterial () {
      const materialsId = this.$route.query.materialsId;
      this.axios.get('A2/materialService/' + materialsId)
        .then((res) => {
          this.obj = res.data;
        })
    },
    back () {
      this.$router.push({name: 'emergency-materialList'});
    },
    onSubmit (status) {
      const materialsId = this.$route.query.materialsId;
      this.$router.push({name: 'emergency-addMaterial', query: {status: status, materialsId: materialsId}});
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
