<template>
  <div class="knowledgeBase-not">
    <div style="padding-bottom: 20px; position: relative">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>应急库</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>知识管理</span></el-breadcrumb-item>
      </el-breadcrumb>
      <div style="position: absolute; top: -10px; right: 0;">
        <el-button type="primary" size="small"  class='selectBtn btnClass'  @click.native="showEditDialog('add')"><span style="font-size: 12.5px">添加</span>知识</el-button>
      </div>
    </div>
    <div class="clearfix" style="position: relative; background-color: #FFFFFF; margin-bottom: 16px">
      <el-form style="float: left; margin-left: 20px; padding-top: 20px" :inline="true" :model="searchForm" class="demo-form-inline" size="small">
        <el-form-item >
          <el-select v-model="searchForm.typeIds" style="width: 160px;" placeholder="所有知识类型">
            <el-option
              v-for="item in knowledgeTypeList"
              :key="item.typeId"
              :label="item.knowledgeName"
              :value="item.typeId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-input v-model="searchForm.keyword" placeholder="请输入关键词" style="width: 220px" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class='selectBtn' @click="doSearch">查询</el-button>
          <el-button @click.native="searchFormReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      class="plan-table"
    >
      <el-table-column fixed label="序号" width="80"  type="index" align="center"></el-table-column>
      <el-table-column prop="title" label="标题"  :show-overflow-tooltip="true" align="center">
      </el-table-column>
      <el-table-column prop="knowledgeType" label="知识类型"  :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <span v-for="(item ,index) in knowledgeTypeList" :key="index">{{scope.row.typeId === item.typeId? item.knowledgeName: ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="keyword" label="关键词"  :show-overflow-tooltip="true" align="center">
      </el-table-column>
      <el-table-column prop="summary" label="知识简介"  :show-overflow-tooltip="true" align="center">
      </el-table-column>
      <el-table-column prop="uploadUser" label="上传用户"  :show-overflow-tooltip="true" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="上传时间" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | moment}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <i class="icon-chakan- icon-hover" @click="see(scope.row)" title="查看"></i>
          <i class="icon-xiugai-1 icon-hover" @click="modify('modify', scope.row)" title="编辑"></i>
          <i class="icon-shanchu- icon-hover" @click="del(scope.row)" title="删除"></i>
        </template>
      </el-table-column>
    </el-table>
    <div class="bg-plan-tbp">
      <el-pagination
        background
        @size-change="pagerSizeChange"
        @current-change="pagerCurrChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      title="操作提示"
      :visible.sync="deleteVisiable"
      width="480px"
      height='285px'
      center>
      <span >是否确认删除?</span>
      <span slot="footer" class="dialog-footer">
        <el-button class='sureBtn' @click="deletEvent">确定删除</el-button>
        <el-button class='noSureBtn' @click="deleteVisiable = false">暂不删除</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {dictType} from '@/config/data.js';
export default {
  data () {
    return {
      searchForm: {
        typeIds: '',
        keyword: ''
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      eventLevelList: [{dictId: '', dictContent: ''}],
      knowledgeTypeList: [],
      deleteVisiable: false,
      knowledgeId: ''
    }
  },
  computed: {
  },
  mounted () {
  },
  created () {
    this.getTableData();
    this.getknowledgeType();
  },
  methods: {
    getTableData () {
      let params = {
        // 'where.beginTime': this.searchForm.beginTime,
        // 'where.endTime': this.searchForm.endTime,
        // 'where.publishState': this.searchForm.publishState,
        'where.typeIds': this.searchForm.typeIds,
        'where.keyword': this.searchForm.keyword,
        // 'where.isReceive': this.searchForm.isReceive,
        // 'where.publishTime': this.searchForm.publishTime,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      this.axios.get('A2/knowledgeBankService/page?' + $.param(params))
        .then((res) => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        })
        .catch(() => {
        });
    },
    getknowledgeType () {
      let params = {
        pageSize: 0
      }
      this.axios.get('A2/knowledgeBankService/type/page', {params})
        .then((res) => {
          this.knowledgeTypeList = res.data.list;
        })
    },
    deletEvent () {
      this.axios.delete('A2/knowledgeBankService/' + this.knowledgeId)
        .then((res) => {
          if (res) {
            this.getTableData();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.deleteVisiable = false
          }
        })
    },
    del (scope) {
      this.knowledgeId = scope.knowledgeId
      this.deleteVisiable = true
    },
    edit () {
    },
    doSearch () {
      this.pageNum = 1;
      this.getTableData();
    },
    searchFormReset () {
      this.pageNum = 1;
      this.searchForm.typeIds = '';
      this.searchForm.keyword = '';
      this.getTableData();
    },
    // 分页
    pagerSizeChange (val) {
      this.pageSize = val;
      this.pageNum = 1;
      this.getTableData();
    },
    pagerCurrChange (val) {
      this.pageNum = val;
      this.getTableData();
    },
    showEditDialog (status) {
      this.$router.push({name: 'emergency-addKnowledgeBase', query: {status: status}});
    },
    modify (status, scope) {
      this.$router.push({name: 'emergency-addKnowledgeBase', query: {status: status, knowledgeId: scope.knowledgeId}});
    },
    see (scope) {
      this.$router.push({name: 'emergency-seeKnowledgeBase', query: {knowledgeId: scope.knowledgeId}});
    }
  }
}
</script>
<style lang="scss" scoped>
  .knowledgeBase-not {
    padding: 20px;
    background-color: #F0F3F4;
    height: 100%;
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
    .bg-plan-tbp{
      padding: 20px 0;
      text-align: center;
    }
    .plan-table {
      i {
        margin: 0 10px;
      }
    }
    .icon-hover {
      font-size: 30px;
      color: #BBBBBB;
    }
    .icon-hover:hover {
      color: #0785FD;
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
    }
    .sureBtn {
      background:#0785FD;
      height:35px;
      color: #fff;
      line-height: 10px;
    }
    .noSureBtn {
      border-color:#e5e5e5;
      height:35px;
      line-height: 10px;
      color:#666666;
    }
  }
</style>
