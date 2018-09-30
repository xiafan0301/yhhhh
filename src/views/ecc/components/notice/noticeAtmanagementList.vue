<template>
  <div class="ba-not">
    <div style="padding-bottom: 20px; position: relative">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>消息管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>公告管理</span></el-breadcrumb-item>
      </el-breadcrumb>
      <div style="position: absolute; top: -10px; right: 0;">
        <el-button type="primary" size="small"  @click.native="showEditDialog('atgment')" icon="el-icon-plus">发布</el-button>
      </div>
    </div>
    <div class="clearfix" style="position: relative; background-color: #FFFFFF; margin-bottom: 16px">
      <el-form style="float: left; margin-left: 20px; padding-top: 20px" :inline="true" :model="searchForm" class="demo-form-inline" size="small">
        <el-form-item style="width: 220px;">
          <el-date-picker
            v-model='searchForm.publishTime'
            range-separator="至"
            type="daterange"
            format="yyyy/MM/dd"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item >
          <el-select v-model="searchForm.publishState" style="width: 140px;" placeholder="发布状态">
            <el-option label="全部状态" value=''></el-option>
            <el-option label="待发送" :value="1"></el-option>
            <el-option label="发送成功" :value="2"></el-option>
            <el-option label="已撤销" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-select v-model="searchForm.publishUnitId" style="width: 140px;" placeholder="发布单位">
            <el-option label="全部发布单位" :value='null'></el-option>
            <el-option
              v-for="item in DepartmentList"
              :key="item.uid"
              :label="item.organName"
              :value="item.uid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch">查询</el-button>
          <el-button @click.native="searchFormReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <!--<el-table-column prop="cameraId" label="摄像头ID" width="150"></el-table-column>-->
      <el-table-column  label="序号" width="60"  type="index"></el-table-column>
      <el-table-column prop="emiMessage.title" label="主题" min-width="150" align="center"  :show-overflow-tooltip="true">
        <!--<template slot-scope="scope">-->
          <!--&lt;!&ndash;{{ scope.row.emiMessage.title && scope.row.emiMessage.title.length}}&ndash;&gt;-->
          <!--<div>{{ scope.row.emiMessage.title && scope.row.emiMessage.title.length > 20 ? (scope.row.emiMessage.title).slice(0,20) + '....': scope.row.emiMessage.title }}</div>-->
        <!--</template>-->
      </el-table-column>
      <el-table-column prop="emiMessage.details" label="摘要"  min-width="150" align="center"  :show-overflow-tooltip="true">
        <!--<template slot-scope="scope">-->
          <!--&lt;!&ndash;<div>{{scope.row.emiMessage.details.length > 20 ? (scope.row.emiMessage.details).slice(0,20) + '....': scope.row.emiMessage.details }}</div>&ndash;&gt;-->
        <!--</template>-->
      </el-table-column>
      <el-table-column prop="emiMessage.terminal" label="接收者" min-width="100" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span  v-if="scope.row.emiMessage.terminal == 1 || scope.row.emiMessage.terminal == 3">App端</span>
          <span v-if="scope.row.receiveRelations.length > 0" >/</span>
          <span v-for="(item, index) in scope.row.receiveRelations" :key="index" v-if="item.receiveUserName"> {{item.receiveUserName}}/</span>
        </template>
      </el-table-column>
      <el-table-column prop="emiMessage.publishUserName" label="发布用户" min-width="100" align="center">
      </el-table-column>
      <el-table-column prop="emiMessage.publishUnitName" label="发布单位" min-width="100" align="center">
      </el-table-column>
      <el-table-column prop="emiMessage.publishTime" label="发布时间" min-width="100" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="emiMessage.publishState" label="发布状态" min-width="100" align="center">
        <template slot-scope="scope">
          <span style="color: #1AAC19;" v-if="scope.row.emiMessage.publishState == 1">待发送</span>
          <span style="color: #0785FD;" v-else-if="scope.row.emiMessage.publishState == 2">发送成功</span>
          <span style="color: #CCCCCC;" v-else-if="scope.row.emiMessage.publishState == 3" >已撤销</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150" align="center">
        <template slot-scope="scope">
          <i class="icon-chakan- icon-hover" @click="see(scope.row.emiMessage)" title="查看"></i>
          <i class="icon-xiugai-1 icon-hover"  title="编辑" @click="modify('modifyatgment',scope.row.emiMessage)" v-if="scope.row.emiMessage.publishState === 3"></i>
          <i class="icon-shanchu- icon-hover"  title="删除" @click="del(scope.row.emiMessage)" v-if="scope.row.emiMessage.publishState === 3"></i>
          <i class="icon-chexiao- icon-hover"  title="撤消" @click="Revoke(scope.row.emiMessage)" v-if="scope.row.emiMessage.publishState === 1" style="margin-left: 5px"></i>
          <!-- <img title="查看" src="../../../../assets/img/temp/select.png" @click="see(scope.row.emiMessage)" />
          <img title="编辑" src="../../../../assets/img/temp/edit.png" @click="modify('modifyatgment',scope.row.emiMessage)" v-if="scope.row.emiMessage.publishState === 3"/>
          <img title="删除" src="../../../../assets/img/temp/delete.png" @click="del(scope.row.emiMessage)" v-if="scope.row.emiMessage.publishState === 3" />
          <img title="撤消" src="../../../../assets/img/temp/revoek.png" @click="Revoke(scope.row.emiMessage)" v-if="scope.row.emiMessage.publishState === 1" width="26px" height="28"/> -->
          <!--<el-button size="mini" type="text" @click="see(scope.row.emiMessage)">查看</el-button>-->
          <!--<el-button type="text"  @click="modify('modifyatgment',scope.row.emiMessage)">修改</el-button>-->
          <!--<el-button @click="del(scope.row.emiMessage)" type="text" size="small">删除</el-button>-->
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
        layout="total, prev, pager, next, sizes, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {formatDate} from '@/utils/method.js';
export default {
  data () {
    return {
      searchForm: {
        publishState: '',
        messageType: '39728bba-9b6f-11e8-8a14-3f814d634dc2',
        publishUnitId: null,
        receiverId: null,
        isReceive: '',
        publishTime: []
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      DepartmentList: []
    }
  },
  computed: {
  },
  created () {
    this.getDepartmentList();
  },
  mounted () {
    this.getOneMonth();
    this.getTableData();
  },
  methods: {
    getTableData () {
      let params = {
        'where.beginTime': this.searchForm.publishTime[0],
        'where.endTime': this.searchForm.publishTime[1],
        'where.publishState': this.searchForm.publishState,
        'where.messageType': this.searchForm.messageType,
        // 'where.publishUnitId': this.searchForm.publishUnitId,
        // 'where.receiverId': this.searchForm.receiverId,
        // 'where.isReceive': this.searchForm.isReceive,
        // 'where.publishTime': this.searchForm.publishTime,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      if (this.searchForm.publishUnitId) {
        params['where.publishUnitId'] = this.searchForm.publishUnitId
      }
      this.axios.get('A2/messageService/page?' + $.param(params))
        .then((res) => {
          console.log(res);
          this.tableData = res.data.list;
          this.total = res.data.total;
        })
        .catch(() => {
        });
    },
    getDepartmentList () {
      let params = {
        pageSize: 99999
      }
      this.axios.get('A3/authServices/organInfos', {params})
        .then((res) => {
          if (res && res.data.list) {
            console.log(res)
            this.DepartmentList = res.data.list
          }
        })
        .catch(() => {})
    },
    edit () {
    },
    doSearch () {
      this.getTableData();
    },
    Revoke (scope) {
      let params = {
        messageId: scope.messageId,
        publishState: 3
      };
      this.axios.put('A2/messageService/update', params)
        .then((res) => {
          if (res && res.data) {
            this.$message.success('撤销成功');
            this.getTableData();
          } else {
            this.$message.error('撤销失败');
          }
        })
        .catch(() => {})
    },
    searchFormReset () {
      this.searchForm.publishTime = [];
      this.searchForm.publishState = '';
      this.searchForm.publishUnitId = null;
      this.getOneMonth();
      this.getTableData();
    },
    del (scope) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (scope) {
          console.log(scope.messageId);
          const params = {
            messageId: scope.messageId
          };
          this.axios.delete('A2/messageService/' + scope.messageId, {params})
            .then((res) => {
              if (res) {
                this.getTableData();
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              } else {
                this.$message.error('删除失败');
              }
            })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    getOneMonth () { // 设置默认一个月
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      const startDate = formatDate(start, 'yyyy-MM-dd');
      const endDate = formatDate(end, 'yyyy-MM-dd');
      this.searchForm.publishTime.push(startDate);
      this.searchForm.publishTime.push(endDate);
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
      // this.editDialogVisible = flag;
      this.$router.push({name: 'notice-release', query: {status: status}});
    },
    modify (status, scope) {
      this.$router.push({name: 'notice-modify', query: {status: status, messageId: scope.messageId}});
    },
    see (scope) {
      const status = '查看公告';
      this.$router.push({name: 'notice-see', query: {status: status, messageId: scope.messageId, publishState: scope.publishState}});
    }
  }
}
</script>
<style lang="scss" scoped>
  .ba-not {
    padding: 20px;
    background-color: #F0F3F4;
    height: 100%;
    .bg-plan-tbp{
      padding: 20px 0;
      text-align: center;
    }
    .el-date-editor /deep/.el-range-separator{
      width: 15%!important;
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
