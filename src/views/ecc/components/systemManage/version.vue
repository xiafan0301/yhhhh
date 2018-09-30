<template>
  <div class="main">
    <div class='header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>版本更新</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="clearfix" style="position: relative; padding-top: 10px;">
      <el-form style="float: left; margin-right: 200px;" :inline="true" :model="searchForm" class="demo-form-inline" size="small">
        <el-form-item label="版本号">
          <el-input v-model="searchForm.softName" style="width: 180px;" placeholder="请输入版本号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch">查询</el-button>
          <el-button type="" @click="doSearch">重置</el-button>
        </el-form-item>
      </el-form>
      <div style="position: absolute; bottom: 18px; right: 0;">
        <el-button type="primary" size="small" @click="edit(null)" icon="el-icon-plus">新增</el-button>
      </div>
    </div>
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column prop="deviceName" label="序号" width="80">
          <template slot-scope="scope">
            {{ scope.$index + 1 + (pagination.pageNum - 1) * pagination.pageSize }}
          </template>
        </el-table-column>
        <el-table-column prop="softName" label="版本号" width="200" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="deviceName" label="更新上传时间" width="200" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="softContent" label="新功能" min-width="200" :show-overflow-tooltip="true"></el-table-column>
        <!-- force_update 是否需要强制更新, 1强制更新 0不强制更新 -->
        <el-table-column prop="forceUpdate" label="强制更新" align="center" width="100" :show-overflow-tooltip="true"></el-table-column>
        <!--soft_flag 是否须版本提醒标志 ：0 须提醒 1 不提醒 2 未知 -->
        <el-table-column prop="softFlag" label="提示更新" align="center" width="100" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="deviceName" label="操作" align="center" width="150" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
    </div>

    <el-dialog
      :title="editObj ? '修改' : '新增'"
      :visible.sync="dialogVisible"
      class="bg-form-dialog"
      width="600px">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm"  style="padding-right: 60px;" size="small" label-width="120px">
        <el-form-item label="版本名称" prop="softName">
          <el-input v-model="editForm.softName" placeholder="请输入版本名称"></el-input>
        </el-form-item>
        <el-form-item label="版本描述" prop="softContent">
          <el-input type="textarea" :rows="4" v-model="editForm.softContent" placeholder="请输入版本描述"></el-input>
        </el-form-item>
        <el-form-item label="提示更新" prop="softFlag">
          <el-radio-group v-model="editForm.softFlag">
            <el-radio label="是" :value="0"></el-radio>
            <el-radio label="否" :value="1"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="强制更新" prop="forceUpdate">
          <el-radio-group v-model="editForm.forceUpdate">
            <el-radio label="是" :value="1"></el-radio>
            <el-radio label="否" :value="0"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="应用文件" prop="savePath">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" style="padding-top: 0; margin-top: 0;">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
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
export default {
  data () {
    return {
      searchForm: {
        softName: ''
      },
      tableData: [{}],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      dialogVisible: false,
      initEditForm: {
        softName: '',
        softContent: '',
        softFlag: '',
        forceUpdate: '',
        savePath: ''
      },
      editForm: {},
      editFormRules: {
        softName: [
          { required: true, message: '请输入版本名称', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ],
        softFlag: [
          { required: true, message: '请选择提示更新', trigger: 'change' }
        ],
        forceUpdate: [
          { required: true, message: '请选择强制更新', trigger: 'change' }
        ],
        savePath: [
          { required: true, message: '请上传应用文件', trigger: 'blur' }
        ]
      },
      editObj: null,
      editSubmitLoading: false,

      fileList: []
    }
  },
  mounted () {
    this.editForm = this.initEditForm;
  },
  methods: {
    doSearch () {
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
    edit (obj) {
      if (obj) {
      } else {
        this.editFormClear();
        this.dialogVisible = true;
      }
    },
    editSubmit (formRef) {
      this.$refs[formRef].validate((valid) => {
        if (valid) {
          let params = Object.assign({}, this.editForm);
          this.editSubmitLoading = true;
        } else {
          return false;
        }
      });
    },
    editFormClear () {
      this.editForm = Object.assign({}, this.initEditForm)
    },

    /* 应用上传函数 */
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove (file, fileList) {
      // return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>
<style lang="scss" scoped>
  .main {
    padding: 20px;
    .header {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
</style>
