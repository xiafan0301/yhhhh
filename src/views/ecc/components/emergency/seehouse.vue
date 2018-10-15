<template>
  <div class="bg-release">
    <div style=" margin-bottom: 20px; position: relative">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>应急库</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'emergency-materialList'}">物资管理</el-breadcrumb-item>
        <el-breadcrumb-item ><span style='color: #0785FD'>查看仓库</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bg-release-cot">
      <ul class="listxf" >
        <li><span class="title">仓库名称</span><span class="content">{{this.obj.warehouseName}}</span></li>
        <li><span class="title">仓库地点</span><span class="content"> {{this.obj.warehouseAddress}}</span></li>
        <li><span class="title">上报单位</span><span class="content" v-for="(item, index) in  DepartmentList" :key="index + 'y'" v-show="item.uid === obj.reportingUnit"> {{item.uid === obj.reportingUnit? item.organName: ''}}</span></li>
        <li><span class="title">负责人</span><span class="content"> {{this.obj.administrators}}</span></li>
        <li><span class="title">联系电话</span><span class="content"> {{this.obj.adminTel}}</span></li>
        <li><span class="title">创建用户</span><span class="content"> {{this.obj.createrName}}</span></li>
        <li><span class="title">创建时间</span><span class="content"> {{this.obj.createTime | moment}}</span></li>
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
        warehouseName: '',
        warehouseAddress: '',
        reportingUnit: '',
        administrators: '',
        adminTel: '',
        authUserId: '',
        createTime: '',
        coordinate: 0
      },
      DepartmentList: []
    }
  },
  created () {
    this.getmaterialck();
    this.getDepartmentList();
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    getmaterialck () {
      const warehouseId = this.$route.query.warehouseId;
      this.axios.get('A2/warehouseService/' + warehouseId)
        .then((res) => {
          this.obj = res.data;
          this.obj.coordinate = res.data.longitude + ',' + res.data.latitude
          console.log(res)
        })
    },
    getDepartmentList () {
      this.axios.get('A3/authServices/organInfos')
        .then((res) => {
          if (res && res.data.list) {
            this.DepartmentList = res.data.list;
          }
        })
        .catch(() => {})
    },
    back () {
      this.$router.push({name: 'emergency-materialList'});
    },
    onSubmit (status) {
      const warehouseId = this.$route.query.warehouseId;
      this.$router.push({name: 'emergency-addWarehouse', query: {status: status, warehouseId: warehouseId}});
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
