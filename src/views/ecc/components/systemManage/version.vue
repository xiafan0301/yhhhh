<template>
  <div class="main">
    <div class='header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>版本更新</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="clearfix" style="position: relative;background-color: #FFFFFF; padding-top: 20px; padding-left: 10px; margin-bottom: 20px " >
      <el-form style="float: left; margin-right: 200px;" :inline="true" :model="searchForm" class="demo-form-inline" size="small">
        <el-form-item>
          <el-input v-model="searchForm.softPubversion" style="width: 180px;" placeholder="请输入版本号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch" class='selectBtn'>查询</el-button>
          <el-button type="" @click="doSearch1">重置</el-button>
        </el-form-item>
      </el-form>
      <div style="position: absolute; top: 20px; right: 10px;">
        <el-button type="primary" size="small" v-show="resouceData && resourceBtn[resouceData.addVersion]" @click="edit(null)" class='selectBtn btnClass'>新增</el-button>
      </div>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
        class="version-table"
        >
        <el-table-column type="index" label="序号" width="80" fixed align="center">
        </el-table-column>
        <el-table-column prop="softPubversion" label="版本号" width="200" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="更新上传时间" width="200" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">
           {{scope.row.updateTime | moment}}
          </template>
        </el-table-column>
        <el-table-column prop="softContent" label="新功能" min-width="200" :show-overflow-tooltip="true" align="center"></el-table-column>
        <!-- force_update 是否需要强制更新, 1强制更新 0不强制更新 -->
        <el-table-column prop="forceUpdate" label="强制更新" align="center" width="100" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.forceUpdate === 1">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <!--soft_flag 是否须版本提醒标志 ：0 须提醒 1 不提醒 2 未知 -->
        <el-table-column prop="softFlag" label="提示更新" align="center" width="100" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.softFlag === 1">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column prop="deviceName" label="操作" align="center" width="150" :show-overflow-tooltip="true">
          <template  slot-scope="scope" >
            <i title="编辑" v-show="resouceData && resourceBtn[resouceData.modifyVersion]" class="icon-xiugai-1 icon-hover" @click="edit(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :title="editObj ? '修改' : '新增'"
      :visible.sync="dialogVisible"
      class="bg-form-dialog"
      width="550px">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm"  style="padding-right: 60px;" size="small" label-width="120px">
        <el-form-item label="版本名称" prop="softName">
          <el-input v-model="editForm.softName" placeholder="请输入版本名称"></el-input>
        </el-form-item>
        <el-form-item label="应用文件" style="position: relative" prop="savePath">
          <el-upload
            class="upload-demo"
            v-model="editForm.savePath"
            :show-file-list ="false"
            :action="uploadUrl + '/upload/'"
            :on-preview="handlePreview"
            :data="imgParam"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handleSuccess"
             :on-change ="handleChange"
            :before-upload="beforeUpload"
            :file-list="fileList">
            <el-button size="small" style="border: 1px solid #0785FD" :loading="loadingstatu"><span style="color:#0785FD; font-size: 14px; font-weight: 400;">{{fileStatus}}</span></el-button>
            <div slot="tip" style="padding-top: 0; margin-top: 10px; font-weight: 400; font-size: 12px; color: #999999">只能上传APK格式文件，文件不能超过100MB</div>
          </el-upload>
          <div style="position: absolute; top: 0; left: 27%">
            <span style="display: inline-block; margin-left: 10px; font-weight: 400; font-size: 14px; color: #333333; word-wrap: break-word;">{{fileName&&fileName.slice(0,19)}}<span v-if="fileName&&fileName.length > 19">....</span></span>
            <span style="display: inline-block; margin-left: 10px; color: #0785FD; cursor: pointer" @click="delfile" v-if="fileName">删除</span>
          </div>
        </el-form-item>
        <el-form-item label="版本描述" prop="softContent">
          <el-input type="textarea" :rows="4" v-model="editForm.softContent" placeholder="请输入版本描述"></el-input>
        </el-form-item>
        <el-form-item label="提示更新" prop="softFlag">
          <el-radio-group v-model="editForm.softFlag">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <!--<el-form-item label="强制更新" prop="forceUpdate">-->
          <!--<el-radio-group v-model="editForm.forceUpdate">-->
            <!--<el-radio label="是" :value="1"></el-radio>-->
            <!--<el-radio label="否" :value="0"></el-radio>-->
          <!--</el-radio-group>-->
        <!--</el-form-item>-->
        <el-form-item>
          <el-checkbox v-model="checked"></el-checkbox>
          <span style="display: inline-block; margin-left: 6px">需要过旧版本强制更新时请勾选</span>
        </el-form-item>
        <el-form-item v-if="checked">
          <el-select  v-model="editForm.minVersion" placeholder="请选择" style="width: 330px">
            <el-option
              v-for="item in tableDataSp"
              :key="item.uid"
              :label="item.softPubversion"
              :value="item.softPubversion">
            </el-option>
          </el-select>
          <!--<div style="font-size: 14px; font-weight: 400; color: #FF0000; margin-left: 5px">单个版本强制更新，请前去历史版本编辑。</div>-->
        </el-form-item>
      </el-form>
      <div style="text-align: center;">
         <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" :loading="editSubmitLoading" @click="editSubmit('editForm')" size="medium" :disabled="fileStatus === '上传失败'">提交</el-button>
      </span>
      </div>
      <div style="height: 50px"></div>
    </el-dialog>
    <div style="text-align: center; padding-top: 10px;">
      <template v-if="pagination.total > 0">
        <el-pagination
          background
          :page-sizes="[5, 10, 20, 50, 100]"
          @size-change="onSizeChange"
          @current-change="onPageChange"
          :current-page.sync="pagination.pageNum"
          :page-size="pagination.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </template>
    </div>
  </div>
</template>
<script>
import {imgBaseUrl2} from '@/config/config.js';
import {resouceData} from '@/config/data.js';
export default {
  data () {
    return {
      resourceBtn: {},
      resouceData: resouceData,
      temp: {a: 1},
      numbers: [1, 2, 3, 4, 5, 1, 1, 2],
      uploadUrl: null,
      loadingstatu: false,
      fileStatus: '上传文件',
      fileName: '',
      checked: false,
      searchForm: {
        softPubversion: ''
      },
      tableData: [],
      tableDataSp: [],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      imgParam: {
        projectType: 4
      },
      dialogVisible: false,
      initEditForm: {
        softName: '',
        softContent: '',
        softFlag: '',
        forceUpdate: '',
        savePath: '',
        saveFile: '',
        softType: 1,
        softCurversion: '',
        projectType: 4,
        minVersion: ''
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
  created () {
    this.resourceBtn = JSON.parse(sessionStorage.getItem('resourcebtn'));
    this.getTableData()
    this.getSoftPubversion()
    this.uploadUrl = imgBaseUrl2;
  },
  methods: {
    doSearch () {
      this.pagination.pageNum = 1;
      this.getTableData();
    },
    doSearch1 () {
      this.searchForm.softPubversion = '';
      this.pagination.pageNum = 1;
      this.getTableData();
    },
    getTableData () {
      let params = {
        'where.softPubversion': this.searchForm.softPubversion,
        // 'where.deviceAddress': this.searchForm.deviceAddress,
        // 'where.deviceIp': this.searchForm.deviceIp,
        // 'where.deviceStatus': this.searchForm.deviceStatus,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize,
        orderBy: 'soft_pubversion',
        order: 'desc'
      };
      this.axios.get('A4/InfSoftwareVersionController/softwaredVersion?' + $.param(params))
        .then((res) => {
          if (res && res.data) {
            this.tableData = res.data.list;
            this.pagination.total = res.data.total;
          }
        })
        .catch(() => {
        });
    },
    getSoftPubversion () {
      let params = {
        pageSize: 99999999
      }
      this.axios.get('A4/InfSoftwareVersionController/softwaredVersion', {params})
        .then((res) => {
          if (res && res.data) {
            this.tableDataSp = res.data.list;
          }
        })
        .catch(() => {
        });
    },
    edit (item) {
      this.checked = false;
      this.resetEditForm('editForm');
      if (item) {
        this.editObj = true;
        this.editForm = Object.assign({}, item);
        this.fileStatus = '上传文件'
        if (item.minVersion) {
          this.checked = true
        }
        this.fileName = item.saveFile
        console.log(item)
      } else {
        this.editFormClear();
        this.editObj = false;
        this.fileName = ''
        this.fileStatus = '上传文件'
      }
      this.dialogVisible = true;
    },
    resetEditForm (formRef) {
      if (this.$refs[formRef]) {
        this.$refs[formRef].resetFields();
      }
    },
    editSubmit (formRef) {
      this.$refs[formRef].validate((valid) => {
        if (valid) {
          let params = Object.assign({}, this.editForm);
          this.editSubmitLoading = true;
          if (this.editObj) {
            if (this.checked === false) {
              params.minVersion = ''
              params.forceUpdate = 0
            } else if (params.minVersion && this.checked === true) {
              params.forceUpdate = 1
            }
            this.axios.put('A4/InfSoftwareVersionController/softwaredVersion/modify', params)
              .then((res) => {
                if (res && res.data) {
                  this.editSubmitLoading = false;
                  this.dialogVisible = false;
                  this.editObj = false;
                  this.doSearch();
                } else {
                  this.editSubmitLoading = false;
                }
              })
              .catch(() => {
              });
          } else {
            if (this.checked === true && params.minVersion) {
              params.forceUpdate = 1
            }
            this.editSubmitLoading = true;
            this.axios.post('A4/InfSoftwareVersionController/softwaredVersion', params)
              .then((res) => {
                this.editSubmitLoading = false;
                this.dialogVisible = false;
                this.editObj = false;
                this.doSearch();
              })
              .catch(() => {
              });
          }
        } else {
          return false;
        }
      });
    },
    editFormClear () {
      this.editForm = Object.assign({}, this.initEditForm)
    },
    onPageChange (page) {
      this.pagination.pageNum = page;
      this.getTableData();
    },
    onSizeChange (val) {
      this.pagination.pageNum = 1;
      this.pagination.pageSize = val;
      this.getTableData();
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
    },
    handleSuccess (response, file, fileList) {
      console.log(response)
      this.loadingstatu = false
      this.fileName = file.name
      this.loadingstatu = false
      if (response.newFileName) {
        this.fileStatus = '上传成功'
        this.editForm.savePath = response.newFileName
        this.editForm.saveFile = file.name
      } else {
        this.$message.error(response.fileName);
        this.fileStatus = '上传失败'
      }
      console.log(this.editForm.savePath)
    },
    handleChange () {
    },
    beforeUpload (file) {
      console.log(file)
      if (file.name.substring(file.name.lastIndexOf('.')) === '.apk' || file.name.substring(file.name.lastIndexOf('.')) === '.APK') {
        this.fileStatus = '上传中'
        this.loadingstatu = true
      }
      const isJPG = file.name.substring(file.name.lastIndexOf('.')) === '.apk' || file.name.substring(file.name.lastIndexOf('.')) === '.APK';
      const isLt2M = file.size / 1024 / 1024 < 100;

      if (!isJPG) {
        this.$message.error('上传文件只能是 APK 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 100MB!');
      }
      return isJPG && isLt2M;
    },
    delfile () {
      this.fileName = ''
      this.editForm.savePath = ''
      this.fileStatus = '上传文件'
    }
  }
}
var ll = '';
function makeAdder (x) {
  return function (y) {
    return x + y;
  };
}

</script>
<style lang="scss" scoped>
  .main {
    padding: 20px;
    .header {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
    }
    .btnClass {
      width: 100px;
    }
    .selectBtn {
      background-color: #0785FD;
    }
    .el-table {
      >thead th {
        color: #555555 !important;
      }
    }
    /deep/ .el-table thead th {
      background-color: #FAFAFA !important;
    }
    /deep/ .hover-row>td {
      background-color: #E6F7FF !important;
    }
    .version-table {
      i {
        margin: 0 10px;
      }
    }
    .icon-hover {
      font-size: 30px !important;
      color: #BBBBBB !important;
    }
    .icon-hover:hover {
      color: #0785FD !important;
    }
    /deep/ .el-dialog__header {
      background: #F0F0F0 !important;
      text-align: left !important;
      color: #333333;
      font-weight: 400;
      font-size: 16px;
      margin-bottom: 15px;
    }
  }
</style>
