<template>
  <div class="ba-xf">
    <div style="padding-bottom: 20px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>应急库</el-breadcrumb-item>
        <el-breadcrumb-item>物资管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="display: flex;">
    <div style=" width: 20%; height:500px; background-color: #FAFAFA" class="warehouse">
      <div style="padding:20px 10px; box-sizing: border-box" class="clearfix">
        <span class="doubt" style="display: inline-block; margin-top: 8px;color:#fff; margin-right: 5px">?</span>
        <span style="display: inline-block;float: left; padding-top: 5px;font-size:18px; color: #555555; font-weight:bold" >仓库名称</span><el-button style="float: right;" size="small" @click.native="showEditDialog(true)">添加仓库</el-button>
      </div>
      <ul>
        <li @click="registrationChoice(0)" :class="{active: visitType === 0}"> 所有仓库</li>
        <li @click="registrationChoice(2)" :class="{active: visitType === 2}">应急A仓 <el-popover placement="bottom"  width="100px" trigger="click">
          <div style="text-align: center; margin: 0;">
            <el-button type="text" @click="seeck" style="display: block; margin: 0 auto;">查看</el-button>
            <el-button type="text"  @click="modifyck" style="display: block; margin: 0 auto">修改</el-button>
            <el-button type="text"  @click="visible2 = false" style="display: block; margin: 0 auto">删除</el-button>
          </div>
          <div slot="reference"><i></i><i></i><i></i></div></el-popover></li>
        <li @click="registrationChoice(1)" :class="{active: visitType === 1}">应急A仓 <div><i></i><i></i><i></i></div></li>
        <li @click="registrationChoice(3)" :class="{active: visitType === 3}">应急A仓 <div><i></i><i></i><i></i></div></li>
      </ul>
    </div>
    <div style="width: 80%">
      <div class="clearfix" style="position: relative; background-color: #FFFFFF; margin-bottom: 16px">
        <el-form style="float: left; margin-left: 20px; padding-top: 20px" :inline="true" :model="searchForm" class="demo-form-inline" size="small">
          <el-form-item >
          <el-input v-model="searchForm.deviceStatus" placeholder="搜索预案名称..." style="width: 220px" ></el-input>
        </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doSearch">查询</el-button>
            <el-button @click.native="searchFormReset">重置</el-button>
          </el-form-item>
        </el-form>
        <div style="position: absolute; right: 20px; top: 20px">
          <el-button type="primary" size="small"  >添加物资</el-button>
        </div>
      </div>
    <el-table
      :data="tableData"
      style="width: 100%;">
      <!--<el-table-column prop="cameraId" label="摄像头ID" width="150"></el-table-column>-->
      <el-table-column prop="deviceName" label="序号"  :show-overflow-tooltip="true" type="index"></el-table-column>
      <el-table-column prop="protocolType" label="物资名称" >
        <template slot-scope="scope">
          <span v-if="scope.row.protocolType == 1">http</span>
          <span v-else-if="scope.row.deviceStatus == 2">https</span>
        </template>
      </el-table-column>
      <el-table-column prop="deviceIp" label="数量" ></el-table-column>
      <el-table-column prop="channelId" label="单位" ></el-table-column>
      <el-table-column prop="streamType" label="所属仓库" >
      </el-table-column>
      <el-table-column prop="zeroChannelFlag" label="发布单位">
        <template slot-scope="scope">
          <span v-if="scope.row.zeroChannelFlag">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="see()">查看</el-button>
          <el-button type="text" slot="reference" @click="modify()">修改</el-button>
          <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible2: false,
      visitType: 0,
      searchForm: {
        deviceName: '',
        deviceAddress: '',
        deviceIp: '',
        deviceStatus: 0
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    // 状态切换
    registrationChoice (type) {
      this.visitType = type;
      if (type === 0) {
      }
      if (type === 1) {
      }
      if (type === 2) {
      }
      if (type === 3) {
      }
    },
    edit () {
    },
    doSearch () {
    },
    showEditDialog (flag) {
      // this.editDialogVisible = flag;
      this.$router.push({name: 'emergency-addWarehouse', query: {modify: true}});
    },
    seeck () {
      this.$router.push({name: 'emergency-seeWarehouse'});
    },
    modifyck () {
      this.$router.push({name: 'emergency-addWarehouse', query: {modify: false}});
    },
    modify () {
      this.$router.push({name: 'notice-modify', query: {modify: false}, params: {plateId: '0'}});
    },
    modifyxt () {
      this.visible2 = false;
      this.$router.push({name: 'notice-modify', query: {modify: false}, params: {plateId: '0'}});
    },
    see () {
      this.visible2 = false;
      this.$router.push({name: 'notice-see', query: {modify: true}, params: {plateId: '0'}});
    }
  }
}
</script>
<style lang="scss" scoped>
  .ba-xf {
    padding: 20px;
    background-color: #F0F3F4;
    height: 100%;
    .warehouse{
      margin-right: 2%;
      .doubt{
        display: inline-block; width: 20px; height: 20px;border-radius:50%; background-color:#0785FD; vertical-align: middle;
        text-align: center;
        float: left;
      }
      ul{
        li{
          height: 60px;
          background-color: #fff;
          border-bottom: 1px solid #EAEAEA;
          padding: 20px 0 20px 20px;
          position: relative;
          .el-popover{
            min-width: 100px!important;
          }
          div{
            position: absolute;
            top: 40%;
            right: 5%;
            i{
              display: block;
              width: 15px;
              height: 2px;
              background-color:#0785FD ;
              margin-bottom: 4px;
            }
          }
        }
      }
      .active{
        color: #ffffff;
        background: #13C2C2;
        position: relative;
        &:after{
          content: '';
          display: block;
          width: 12px;
          height: 12px;
          background: #13C2C2;
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          -o-transform: rotate(45deg);
          transform: rotate(45deg);
          position: absolute;
          right: -6px;
          top: 50%;
        }
      }
    }
  }
</style>
