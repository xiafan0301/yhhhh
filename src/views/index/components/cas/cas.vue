<template>
  <div class="bg-cas">
    <div class="clearfix" style="position: relative;">
      <el-form style="float: left; margin-right: 200px;" :inline="true" :model="searchForm" class="demo-form-inline" size="small">
        <el-form-item label="设备名称">
          <el-input v-model="searchForm.deviceName" style="width: 150px;" placeholder="设备名称"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="searchForm.deviceAddress" style="width: 150px;" placeholder="地址"></el-input>
        </el-form-item>
        <el-form-item label="设备ip">
          <el-input v-model="searchForm.deviceIp" style="width: 150px;" placeholder="设备ip"></el-input>
        </el-form-item>
        <el-form-item label="设备状态">
          <el-select v-model="searchForm.deviceStatus" style="width: 100px;" placeholder="设备状态">
            <el-option label="全部" :value="0"></el-option>
            <el-option label="可用" :value="1"></el-option>
            <el-option label="异常" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch">查询</el-button>

        </el-form-item>
      </el-form>
      <div style="position: absolute; bottom: 18px; right: 0;">
        <el-button type="primary" size="small" @click="add" icon="el-icon-plus">查询</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column prop="cameraId" label="摄像头ID" width="150"></el-table-column>
      <el-table-column prop="deviceName" label="设备名称" width="120"></el-table-column>
      <el-table-column prop="protocolType" label="协议" width="120"></el-table-column>
      <el-table-column prop="deviceIp" label="设备IP" width="120"></el-table-column>
      <el-table-column prop="devicePort" label="设备端口" width="120"></el-table-column>
      <el-table-column prop="channelId" label="通道ID" width="120"></el-table-column>
      <el-table-column prop="streamType" label="流类型" width="120"></el-table-column>
      <el-table-column prop="zeroChannelFlag" label="零通道" width="120"></el-table-column>
      <el-table-column prop="deviceUserName" label="登录名" width="120"></el-table-column>
      <el-table-column prop="deviceUserPassword" label="密码" width="120"></el-table-column>
      <el-table-column prop="deviceAddress" label="地址" width="120"></el-table-column>
      <el-table-column prop="longitude" label="经度" width="120"></el-table-column>
      <el-table-column prop="latitude" label="纬度" width="120"></el-table-column>
      <el-table-column prop="deviceStatus" label="状态" width="120"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template v-if="pagination.total > 0">
      <el-pagination
        background
        @current-change="onPageChange"
        :current-page.sync="pagination.pageNum"
        :page-size="pagination.pageSize"
        layout="prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </template>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="600px">
      <el-form style="padding-right: 60px;" :model="editForm" class="demo-form-inline" size="small" label-width="120px">
        <el-form-item label="设备名称">
          <el-input v-model="editForm.deviceName" placeholder="设备名称"></el-input>
        </el-form-item>
        <el-form-item label="协议">
          <el-select v-model="editForm.protocolType" placeholder="协议">
            <el-option label="http" :value="1"></el-option>
            <el-option label="https" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备ip">
          <el-input v-model="editForm.deviceIp" placeholder="设备ip"></el-input>
        </el-form-item>
        <el-form-item label="设备端口">
          <el-input v-model="editForm.devicePort" placeholder="设备端口"></el-input>
        </el-form-item>
        <el-form-item label="通道ID">
          <el-input v-model="editForm.channelId" placeholder="通道ID"></el-input>
        </el-form-item>
        <el-form-item label="流类型">
          <el-select v-model="editForm.streamType" placeholder="流类型">
            <el-option label="main stream" :value="1"></el-option>
            <el-option label="sub-stream" :value="2"></el-option>
            <el-option label="third stream" :value="3"></el-option>
            <el-option label="transcode stream" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="零通道">
          <el-radio-group v-model="editForm.zeroChannelFlag">
            <el-radio :label="false">否</el-radio>
            <el-radio :label="true">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="登录名">
          <el-input v-model="editForm.deviceUserName" placeholder="登录名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="editForm.deviceUserPassword" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="editForm.deviceAddress" placeholder="地址"></el-input>
        </el-form-item>
        <el-form-item label="经度">
          <el-input v-model="editForm.longitude" placeholder="经度"></el-input>
        </el-form-item>
        <el-form-item label="纬度">
          <el-input v-model="editForm.latitude" placeholder="纬度"></el-input>
        </el-form-item>
        <el-form-item label="设备状态">
          <el-select v-model="editForm.deviceStatus" placeholder="设备状态">
            <el-option label="可用" :value="1"></el-option>
            <el-option label="异常" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="editSubmitLoading" @click="editSubmit">确 定</el-button>
      </span>
    </el-dialog>
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
      tableData: [],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      dialogVisible: false,
      editForm: {
        deviceName: '',
        protocolType: 1, // protocol 1：http, 2:https
        deviceIp: '',
        devicePort: '',
        channelId: 1,
        streamType: 1, // stream 1：main stream  2：sub-stream  3：third stream  4：transcode stream
        zeroChannelFlag: false,
        deviceUserName: '',
        deviceUserPassword: '',
        deviceAddress: '',
        longitude: '',
        latitude: '',
        deviceStatus: 1
      },
      editSubmitLoading: false
    }
  },
  created () {
    this.getTableData();
  },
  mounted () {
  },
  methods: {
    doSearch () {
    },
    handleClick (row) {
      console.log(row);
    },
    getTableData () {
      let params = {
        'where.deviceName': this.searchForm.deviceName,
        'where.deviceAddress': this.searchForm.deviceAddress,
        'where.deviceIp': this.searchForm.deviceIp,
        'where.deviceStatus': this.searchForm.deviceStatus,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      };
      this.axios.get('/cameraServices/devices/page/', params)
        .then((res) => {
        })
        .catch(() => {
        });
    },
    nPageChange (page) {
      this.pagination.pageNum = page;
      this.getTableData();
    },
    add () {
      this.dialogVisible = true;
    },
    editSubmit () {
      this.editSubmitLoading = true;
      let params = this.editForm;
      this.axios.post('/cameraServices/device/', params)
        .then((res) => {
          this.editSubmitLoading = false;
        })
        .catch(() => {
          this.editSubmitLoading = false;
        });
    }
  }
}
</script>
<style lang="scss" scoped>
  .bg-cas {
    padding: 20px;
  }
</style>
