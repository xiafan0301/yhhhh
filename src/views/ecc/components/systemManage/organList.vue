<template>
  <div class="organ-list">
    <div class='header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>组织架构</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="clearfix search">
      <el-form :inline="true" :model='selectForm' ref='selectForm' class="demo-form-inline" size="small">
        <el-form-item>
          <el-input placeholder='请输入部门名称搜索' style="width: 250px;" v-model='selectForm.organName'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class='selectBtn btnClass' @click="selectDepart">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="add-depart-box">
        <el-button class='selectBtn add-depart' @click="showAddDialog">新建部门</el-button>
      </div>
    </div>
    <el-table style="width: 100%;" :data='departmentList' class='event-table' @row-click="goDetail">
      <el-table-column fixed label="序号" type="index" align='center'></el-table-column>
      <el-table-column label="名称" prop='organName' align='center'></el-table-column>
      <el-table-column label="上报部门" prop='parentOrganName' align='center'></el-table-column>
      <el-table-column label="部门负责人" prop='chargeUserName' align='center'></el-table-column>
      <el-table-column label="操作" align='center' class="operation">
        <template slot-scope="scope">
          <img title="编辑" src="../../../../assets/img/temp/edit.png" @click="editDepart(scope, $event)" />
          <img title="删除" src="../../../../assets/img/temp/delete.png" @click="deleteDepart(scope, $event)" />
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: right; padding-top: 10px;">
      <template v-if="pagination.total > 0">
        <el-pagination
          background
          @size-change="onSizeChange"
          @current-change="onPageChange"
          :current-page.sync="pagination.pageNum"
          :page-size="pagination.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </template>
    </div>
    <el-dialog
      title="删除"
      :visible.sync="deleteDepartmentDialog"
      width="340px"
      height='205px'
      center>
      <span style='text-align:center;color:#333333;font-size:14px'>是否确认删除此部门?</span>
      <p style='text-align:center;color:#999999;font-size:12px;margin-top:10px'>删除后数据不可恢复</p>
      <span slot="footer" class="dialog-footer">
        <el-button class='sureBtn' @click='submitdeletDepart'>确认</el-button>
        <el-button class='noSureBtn' @click="deleteDepartmentDialog = false">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新建部门" :visible.sync="dialogFormVisible" center width='400px' class="new-department">
      <el-form class='add-depart-form' :model='addForm' ref="addForm">
        <el-form-item label="部门名称" label-width='85px' prop='organName'>
          <el-input type="text" placeholder='请输入部门名称' @change="onNewDepartChange" style='width: 98%' v-model='addForm.organName'></el-input>
        </el-form-item>
        <el-form-item label="上级部门" label-width='85px'>
          <el-select placeholder="请选择上级部门" style='width: 98%' v-model='addForm.organPid'>
            <el-option v-for="item in departmentList" :key="item.uid" :label="item.organName" :value="item.uid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门负责人" label-width='85px'>
          <el-input type="text" placeholder='请输入部门负责人姓名' style='width: 98%' v-model='addForm.chargeUserName'></el-input>
        </el-form-item>
        <el-form-item label-width='85px' v-show="isShowError">
          <div class="error-msg">
            <i class="el-icon-error"></i>
            <span>{{errorMsg}}</span>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class='sureBtn' @click="cancelAdd">取 消</el-button>
        <el-button class='noSureBtn' type="primary" @click="submitAddData">确认</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑部门" :visible.sync="editFormVisible" center width='400px' class="new-department">
      <el-form class='add-depart-form' :model='editForm'>
        <el-form-item label="部门名称" label-width='85px'>
          <el-input type="text" placeholder='请输入部门名称' @change="onNewDepartChange" style='width: 98%' v-model='editForm.organName'></el-input>
        </el-form-item>
        <el-form-item label="部门负责人" label-width='85px'>
          <el-input type="text" placeholder='请输入部门负责人姓名' style='width: 98%' v-model='editForm.chargeUserName'></el-input>
        </el-form-item>
        <el-form-item label-width='85px' v-show="isShowError">
          <div class="error-msg">
            <i class="el-icon-error"></i>
            <span>{{errorMsg}}</span>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class='sureBtn' @click="cancelEdit">取 消</el-button>
        <el-button class='noSureBtn' type="primary" @click="submitEditData">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      deleteDepartmentDialog: false, // 删除部门
      dialogFormVisible: false, // 新建部门
      editFormVisible: false, // 编辑部门
      selectForm: {
        organName: ''
      },
      pagination: { total: 0, pageSize: 10, pageNum: 1 },
      departmentList: [],
      addForm: {
        organName: null,
        organPid: null,
        chargeUserName: null
      },
      editForm: {
        organName: null,
        uid: null,
        chargeUserName: null
      },
      errorMsg: '',
      isShowError: false,
      deleteId: '', // 要删除的部门id
      editDepartment: {} // 要编辑的部门信息
    }
  },
  mounted () {
    this.getDepartmentList();
  },
  methods: {
    goDetail (row) {
      // e.preventDefault();
      this.$router.push({path: 'organDetail/' + row.uid});
    },
    selectDepart () { // 查询
      this.getDepartmentList();
    },
    onPageChange (page) {
      this.pagination.pageNum = page;
      this.getDepartmentList();
    },
    onSizeChange (val) {
      this.pagination.pageNum = 1;
      this.pagination.pageSize = val;
      this.getDepartmentList();
    },
    getDepartmentList () {
      if (!this.selectForm.organName) {
        this.selectForm.organName = null;
      }
      const params = {
        'where.organName': this.selectForm.organName,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      }
      this.axios.get('A3/authServices/organInfos', {params})
        .then((res) => {
          if (res && res.data.list) {
            this.departmentList = res.data.list;
            this.pagination.total = res.data.total;
          }
        })
        .catch(() => {})
    },
    onNewDepartChange (val) { // 判断组织机构名称是否重复
      let params = {
        organName: val
      }
      this.axios.get('A3/authServices/organName', {params})
        .then(res => {
          if (res && res.data === true) {
            this.isShowError = true;
            this.errorMsg = '该用户组已存在';
          } else {
            this.isShowError = false;
            this.errorMsg = '';
          }
        })
        .catch(() => {})
    },
    deleteDepart (scope, e) { // 删除部门显示弹出框
      e.stopPropagation();
      this.deleteId = scope.row.uid;
      this.deleteDepartmentDialog = true;
    },
    submitdeletDepart () { // 删除部门
      if (this.deleteId) {
        this.axios.delete('A3/authServices/organInfo?uids=' + this.deleteId)
          .then(res => {
            if (res) {
              this.$message.success('删除成功');
              this.getDepartmentList();
              this.deleteDepartmentDialog = false;
            }
          })
          .catch(() => {});
      }
    },
    editDepart (scope, e) { // 显示编辑部门弹出框
      e.stopPropagation();
      this.editForm.uid = scope.row.uid;
      this.editForm.organName = scope.row.organName;
      this.editForm.chargeUserName = scope.row.chargeUserName;
      this.editFormVisible = true;
    },
    showAddDialog () { // 显示添加部门弹出框
      this.dialogFormVisible = true;
      this.addForm.organName = null;
      this.addForm.organPid = null;
      this.addForm.chargeUserName = null;
      this.isShowError = false;
      this.errorMsg = '';
    },
    submitAddData () { // 添加部门
      if (!this.addForm.organName) {
        this.isShowError = true;
        this.errorMsg = '部门名称不可为空';
        return;
      } else if (!this.addForm.chargeUserName) {
        this.isShowError = true;
        this.errorMsg = '部门负责人不可为空';
        return;
      }
      this.axios.post('A3/authServices/organInfo', this.addForm)
        .then((res) => {
          if (res) {
            this.$message.success('创建成功');
            this.dialogFormVisible = false;
            this.getDepartmentList();
          }
        })
        .catch(() => {});
    },
    cancelAdd () { // 取消添加部门
      this.addForm.organName = null;
      this.addForm.organPid = null;
      this.addForm.chargeUserName = null;
      this.isShowError = false;
      this.errorMsg = '';
      this.dialogFormVisible = false;
    },
    cancelEdit () { // 取消编辑部门
      this.isShowError = false;
      this.errorMsg = '';
      this.editFormVisible = false;
    },
    submitEditData () { // 编辑部门
      if (!this.editForm.organName) {
        this.errorMsg = '部门名称不可为空';
        this.isShowError = true;
        return;
      }
      this.axios.put('A3/authServices/organInfo', this.editForm)
        .then((res) => {
          if (res) {
            this.$message.success('修改成功');
            this.editFormVisible = false;
            this.getDepartmentList();
          }
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang='scss' scoped>
  .organ-list {
    padding: 20px;
    .header {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
    }
    .search {
      position: relative;
      width: 100%;
      background: #fff;
      display: flex;
      height: 90px;
      line-height: 90px;
      margin-top: 20px;
      margin-bottom: 1%;
      .demo-form-inline {
        float: left;
        padding-left: 1%;
        padding-top: 30px;
        width:100%;
        height: 45px;
      }
    }
    .btnClass {
      width: 80px;
    }
    .selectBtn {
      background-color: #0785FD;
    }
    /deep/ .el-table thead th {
      background-color: #FAFAFA !important;
    }
    /deep/ .hover-row>td {
      background-color: #E6F7FF !important;
    }
    .add-depart-box {
      margin-right: 20px;
      .add-depart {
        color: #fff;
      }
    }
     /deep/ .el-dialog__header {
      background: #F0F0F0 !important;
      text-align: left !important;
      color: #555555;
      font-weight: bold;
      font-size: 16px;
    }
    /deep/  .el-dialog--center .el-dialog__body {
      text-align: center !important;
      padding: 25px 25px 10px;
    }
    .noSureBtn {
      background:#0785FD;
      height:35px;
      color: #fff;
      line-height: 10px;
    }
    .sureBtn {
      border-color:#e5e5e5;
      height:35px;
      line-height: 10px;
      color:#666666;
    }
    .new-department {
      .add-depart-form {
        width: 100%;
        /deep/ .el-form-item__label {
          text-align: left;
          line-height: 32px;
        }
        /deep/ .el-input__inner {
          height: 32px;
          line-height: 32px;
        }
        /deep/ .el-form-item {
          margin-bottom: 10px;
        }
        /deep/ .el-form-item:first-child label:after {
          content: '*';
          color: #f56c6c;
          margin-left: 4px;
        }
        .error-msg {
          width: 98%;
          height:32px;
          line-height: 32px;
          text-align: left;
          background: #FFF6F6;
          padding-left: 10px;
          border: 1px solid #FDC9C9;
          border-radius: 3px;
          i {
            color: #FF0000;
          }
          span {
            color: #FF0000;
            font-size: 12px;
          }
        }
      }
    }
    .el-pagination {
      text-align: center;
    }
  }
</style>
