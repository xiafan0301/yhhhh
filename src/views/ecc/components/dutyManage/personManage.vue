<template>
  <div class="person-manage">
    <div class='header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>值班管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>人员管理</span></el-breadcrumb-item>
      </el-breadcrumb>
      <el-button class='selectBtn add-person' @click='skipAddPerson'>添加人员</el-button>
    </div>
    <div class="clearfix search">
      <el-form :inline="true" class="demo-form-inline" size="small">
        <el-form-item style="width: 220px;">
          <el-input placeholder='请输入姓名或手机号' style='width:220px' v-model='nameOrPhone'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class='selectBtn btnClass' @click='selectPersonList'>查询</el-button>
          <el-button class='btnClass' @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table style="width: 100%" :data='personDataList' class='person-table'>
      <el-table-column fixed label="序号" type="index" align='center'></el-table-column>
      <el-table-column label="姓名" prop='reporterPhone' align='center'></el-table-column>
      <el-table-column label="手机号" prop='reporterRole' align='center'></el-table-column>
      <el-table-column label="岗位" prop='eventSourceName' align='center'></el-table-column>
      <el-table-column label="状态" prop='acceptFlag' align='center'>
        <template slot-scope="scope">
          <span style="color: #555555;" v-if="scope.row.acceptFlag == true">启用</span>
          <span style="color: #FB796C;" v-else>禁用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align='center'>
        <template slot-scope="scope">
          <i class="icon-xiugai-1 icon-hover" @click="skipAddMsg('modify', scope)" title="编辑"></i>
          <i class="icon-shanchu- icon-hover" @click="showDelete(scope)" title="删除"></i>
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
  </div>
</template>
<script>
export default {
  data () {
    return {
      pagination: { total: 0, pageSize: 10, pageNum: 1 },
      nameOrPhone: null, // 姓名或手机号查询
      personDataList: []
    }
  },
  methods: {
    onPageChange (page) {
      this.pagination.pageNum = page;
      this.getPersonList();
    },
    onSizeChange (val) {
      this.pagination.pageNum = 1;
      this.pagination.pageSize = val;
      this.getPersonList();
    },
    getPersonList () {

    },
    skipAddPerson () { // 跳到添加人员页面
      this.$router.push({name: 'add-person'});
    },
    selectPersonList () { // 根据姓名或手机号查询

    },
    resetForm () {
      this.nameOrPhone = null;
    }
  }
}
</script>

<style lang="scss" scoped>
.person-manage {
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
    height: 90px;
    line-height: 90px;
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
  .add-person {
    color: #fff;
    float: right;
  }
  /deep/ .el-table thead th {
    background-color: #FAFAFA !important;
  }
  /deep/ .hover-row>td {
    background-color: #E6F7FF !important;
  }
  .el-button+.el-button {
    margin-left: 2px !important;
  }
  .el-pagination {
    text-align: center;
  }
  .icon-hover {
    font-size: 30px;
    color: #BBBBBB;
  }
  .icon-hover:hover {
    color: #0785FD;
  }
}
</style>
