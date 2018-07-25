<template>
  <div class="bg-cas">
    <div style="padding-bottom: 20px; border-bottom: 1px solid #eee; margin-bottom: 20px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>视频监控管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
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
        <el-button type="primary" size="small" @click="edit(null)" icon="el-icon-plus">新增</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <!--<el-table-column prop="cameraId" label="摄像头ID" width="150"></el-table-column>-->
      <el-table-column prop="deviceName" label="设备名称" width="120"></el-table-column>
      <el-table-column prop="protocolType" label="协议" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.protocolType == 1">http</span>
          <span v-else-if="scope.row.deviceStatus == 2">https</span>
        </template>
      </el-table-column>
      <el-table-column prop="deviceIp" label="设备IP" width="140"></el-table-column>
      <el-table-column prop="devicePort" label="设备端口" width="100"></el-table-column>
      <el-table-column prop="channelId" label="通道ID" width="100"></el-table-column>
      <el-table-column prop="streamType" label="流类型" width="120">
        <template slot-scope="scope">
          <!--// stream 1：main stream  2：sub-stream  3：third stream  4：transcode stream-->
          <span v-if="scope.row.streamType == 1">main stream</span>
          <span v-else-if="scope.row.streamType == 2">sub-stream</span>
          <span v-else-if="scope.row.streamType == 3">third stream</span>
          <span v-else-if="scope.row.streamType == 4">transcode stream</span>
        </template>
      </el-table-column>
      <el-table-column prop="zeroChannelFlag" label="零通道" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.zeroChannelFlag">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="deviceUserName" label="登录名" width="120"></el-table-column>
      <el-table-column prop="deviceUserPassword" label="密码" width="120"></el-table-column>
      <el-table-column prop="deviceAddress" label="地址" width="150" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="longitude" label="经度" width="120"></el-table-column>
      <el-table-column prop="latitude" label="纬度" width="120"></el-table-column>
      <el-table-column prop="deviceStatus" label="状态" width="100" fixed="right">
        <template slot-scope="scope">
          <span style="color: #13ce66;" v-if="scope.row.deviceStatus == 1">可用</span>
          <span style="color: #ff4949;" v-else-if="scope.row.deviceStatus == 2">异常</span>
          <span style="color: #999;" v-else>未知</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: right; padding-top: 10px;">
      <template v-if="pagination.total > 0">
        <el-pagination
          background
          @current-change="onPageChange"
          :current-page.sync="pagination.pageNum"
          :page-size="pagination.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </template>
    </div>
    <el-dialog
      :title="editObj ? '修改' : '新增'"
      :visible.sync="dialogVisible"
      class="bg-form-dialog"
      width="600px">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm"  style="padding-right: 60px;" size="small" label-width="120px">
        <el-form-item label="设备名称" prop="deviceName">
          <el-input v-model="editForm.deviceName" placeholder="设备名称"></el-input>
        </el-form-item>
        <el-form-item label="协议">
          <el-select v-model="editForm.protocolType" placeholder="协议">
            <el-option label="http" :value="1"></el-option>
            <el-option label="https" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备ip" prop="deviceIp">
          <el-input v-model="editForm.deviceIp" placeholder="设备ip"></el-input>
        </el-form-item>
        <el-form-item label="设备端口" prop="devicePort">
          <el-input v-model="editForm.devicePort" placeholder="设备端口"></el-input>
        </el-form-item>
        <el-form-item label="通道ID" prop="channelId">
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
        <el-form-item label="登录名" prop="deviceUserName">
          <el-input v-model="editForm.deviceUserName" placeholder="登录名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="deviceUserPassword">
          <el-input v-model="editForm.deviceUserPassword" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="deviceAddress">
          <el-input v-model="editForm.deviceAddress" placeholder="地址"></el-input>
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
          <el-input v-model="editForm.longitude" placeholder="经度"></el-input>
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
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
        <el-button type="primary" :loading="editSubmitLoading" @click="editSubmit('editForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {checkIp4} from '@/utils/validator.js';
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
      editForm: {},
      initEditForm: {
        cameraId: '',
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
      editFormRules: {
        deviceName: [
          { required: true, message: '请输入设备名称', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ],
        deviceIp: [
          { required: true, message: '请输入设备IP', trigger: 'blur' },
          { validator: checkIp4, trigger: 'blur' }
        ],
        devicePort: [
          { required: true, message: '请输入端口', trigger: 'blur' }
        ],
        channelId: [
          { required: true, message: '请输入通道ID', trigger: 'blur' }
        ],
        deviceUserName: [
          { required: true, message: '请输入登录名', trigger: 'blur' }
        ],
        deviceUserPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: '请输入经度', trigger: 'blur' }
        ],
        latitude: [
          { required: true, message: '请输入纬度', trigger: 'blur' }
        ]
      },
      editObj: null,
      editSubmitLoading: false,

      a: []
    }
  },
  created () {
    this.getTableData();
    this.editForm = this.initEditForm;
  },
  mounted () {
  },
  methods: {
    doSearch () {
      this.pagination.pageNum = 1;
      this.getTableData();
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
      this.axios.get('/cameraServices/devices/page?' + $.param(params))
        .then((res) => {
          if (res && res.data) {
            this.tableData = res.data.list;
            this.pagination.total = res.data.total;
          }
        })
        .catch(() => {
        });
    },
    onPageChange (page) {
      this.pagination.pageNum = page;
      this.getTableData();
    },
    edit (item) {
      this.resetEditForm('editForm');
      if (item) {
        this.editObj = true;
        this.editForm = item;
      } else {
        this.editObj = false;
        this.editReset();
      }
      this.dialogVisible = true;
    },
    editReset () {
      this.editForm = this.initEditForm;
    },
    resetEditForm (formRef) {
      if (this.$refs[formRef]) {
        this.$refs[formRef].resetFields();
      }
    },
    editSubmit (formRef) {
      this.$refs[formRef].validate((valid) => {
        if (valid) {
          let params = this.editForm;
          this.editSubmitLoading = true;
          if (this.editObj) {
            this.axios.put('/cameraServices/devices/' + params.cameraId, params)
              .then((res) => {
                this.editSubmitLoading = false;
                this.dialogVisible = false;
                this.editObj = false;
                this.doSearch();
              })
              .catch(() => {
                this.editSubmitLoading = false;
              });
          } else {
            this.axios.post('/cameraServices/device/', params)
              .then((res) => {
                this.editSubmitLoading = false;
                this.dialogVisible = false;
                this.editObj = false;
                this.doSearch();
              })
              .catch(() => {
                this.editSubmitLoading = false;
              });
          }
        } else {
          return false;
        }
      });
    },

    del (item) {
      let _this = this;
      _this.$msgbox({
        title: '删除提示',
        message: '确定删除吗？',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            // ajax
            _this.axios.delete('/cameraServices/device/' + item.cameraId).then(function (res) {
              instance.confirmButtonText = '确定';
              instance.confirmButtonLoading = false;
              done();
              _this.doSearch();
            }).catch(function () {
              instance.confirmButtonText = '确定';
              instance.confirmButtonLoading = false;
              done();
            });
          } else {
            done();
          }
        }
      }).then(action => {
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
