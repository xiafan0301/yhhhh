<template>
  <div class="ba-not">
    <div style="padding-bottom: 20px; border-bottom: 1px solid #eee; margin-bottom: 20px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>消息管理</el-breadcrumb-item>
        <el-breadcrumb-item>公告管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="clearfix" style="position: relative;">
      <el-form style="float: left; margin-right: 200px;" :inline="true" :model="searchForm" class="demo-form-inline" size="small">
        <el-form-item label="时间段：">
          <el-select v-model="searchForm.deviceStatus" style="width: 120px;" placeholder="设备状态">
            <el-option label="全部" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布状态：">
          <el-select v-model="searchForm.deviceStatus" style="width: 100px;" placeholder="设备状态">
            <el-option label="全部" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布单位：">
          <el-select v-model="searchForm.deviceStatus" style="width: 100px;" placeholder="设备状态">
            <el-option label="全部" :value="0"></el-option>
            <el-option label="可用" :value="1"></el-option>
            <el-option label="异常" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch">查询</el-button>
          <el-button @click.native="searchFormReset">重置</el-button>
        </el-form-item>
      </el-form>
      <div style="position: absolute; bottom: 18px; right: 0;">
        <el-button type="primary" size="small"  @click.native="showEditDialog(true)" icon="el-icon-plus">发布</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <!--<el-table-column prop="cameraId" label="摄像头ID" width="150"></el-table-column>-->
      <el-table-column prop="deviceName" label="序号" width="50" :show-overflow-tooltip="true" type="index"></el-table-column>
      <el-table-column prop="protocolType" label="主题" min-width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.protocolType == 1">http</span>
          <span v-else-if="scope.row.deviceStatus == 2">https</span>
        </template>
      </el-table-column>
      <el-table-column prop="deviceIp" label="摘要" min-width="140"></el-table-column>
      <el-table-column prop="channelId" label="接收者" width="100"></el-table-column>
      <el-table-column prop="streamType" label="发布用户" width="100">
        <template slot-scope="scope">
          <!--// stream 1：main stream  2：sub-stream  3：third stream  4：transcode stream-->
          <span v-if="scope.row.streamType == 1">main stream</span>
          <span v-else-if="scope.row.streamType == 2">sub-stream</span>
          <span v-else-if="scope.row.streamType == 3">third stream</span>
          <span v-else-if="scope.row.streamType == 4">transcode stream</span>
        </template>
      </el-table-column>
      <el-table-column prop="zeroChannelFlag" label="发布单位" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.zeroChannelFlag">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="deviceUserName" label="发布时间" width="120"></el-table-column>
      <el-table-column prop="deviceUserPassword" label="发布状态" width="120"></el-table-column>
      <el-table-column
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="see()">查看</el-button>
          <el-button type="text" slot="reference" @click="modify()">修改</el-button>
          <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
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
    edit () {
    },
    doSearch () {
    },
    showEditDialog (flag) {
      // this.editDialogVisible = flag;
      this.$router.push({name: 'notice-release', query: {release: true}});
    },
    modify () {
      this.visible2 = false;
      this.$router.push({name: 'notice-modify', query: {modify: true}, params: {plateId: '0'}});
    },
    modifyxt () {
      this.visible2 = false;
      this.$router.push({name: 'notice-modify', query: {modify: false}, params: {plateId: '0'}});
    },
    see () {
      this.visible2 = false;
      this.$router.push({name: 'notice-see', query: {modify: false}, params: {plateId: '0'}});
    }
  }
}
</script>
<style lang="scss" scoped>
  .ba-not {
    padding: 20px;
  }
</style>
