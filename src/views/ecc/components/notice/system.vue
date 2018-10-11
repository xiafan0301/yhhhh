<template>
  <div class="ba-not">
    <div style="padding-bottom: 20px; position: relative">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>消息管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>系统消息</span></el-breadcrumb-item>
      </el-breadcrumb>
      <div style="position: absolute; top: -10px; right: 0;">
        <el-button type="primary" size="small"  @click.native="showEditDialog('system')" icon="el-icon-plus">发布</el-button>
      </div>
    </div>
    <div class="clearfix" style="position: relative; background-color: #FFFFFF; margin-bottom: 16px">
      <el-form style="float: left; margin-left: 20px; padding-top: 20px"  :inline="true" :model="searchForm" class="demo-form-inline" size="small" ref="searchForm">
        <el-form-item style="width: 220px;" prop='reportTime'>
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
          <el-select v-model="searchForm.messageType" style="width: 140px;" placeholder="消息类型">
            <el-option label="全部消息类型" value="39728bba-9b6f-11e8-8a14-3f814d634dc3,39728bba-9b6f-11e8-8a14-3f814d634dc4" ></el-option>
            <el-option label="APP应用升级" value="39728bba-9b6f-11e8-8a14-3f814d634dc3"></el-option>
            <el-option label="应急小秘书" value="39728bba-9b6f-11e8-8a14-3f814d634dc4"></el-option>
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
      <el-table-column  label="序号" width="100"  type="index"></el-table-column>
      <el-table-column prop="emiMessage.messageType" label="消息类型" min-width="140">
        <template slot-scope="scope">
          <span  v-if="scope.row.emiMessage.messageType == '39728bba-9b6f-11e8-8a14-3f814d634dc3'">APP应用升级</span>
          <span  v-else-if="scope.row.emiMessage.messageType == '39728bba-9b6f-11e8-8a14-3f814d634dc4'">应急小秘书</span>
        </template>
      </el-table-column>
      <el-table-column prop="emiMessage.details" label="内容" min-width="180" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="emiMessage.publishUserName" label="发布用户" min-width="100">
      </el-table-column>
      <el-table-column prop="emiMessage.publishUnitName" label="发布单位" min-width="100">
      </el-table-column>
      <el-table-column prop="emiMessage.publishTime" label="发布时间" min-width="120" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="emiMessage.publishState" label="发布状态" min-width="120">
        <template slot-scope="scope">
          <span style="color: #1AAC19;" v-if="scope.row.emiMessage.publishState == 1">待发送</span>
          <span style="color: #0785FD;" v-else-if="scope.row.emiMessage.publishState == 2">发送成功</span>
          <span style="color: #CCCCCC;" v-else-if="scope.row.emiMessage.publishState == 3" >已撤销</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150">
        <template slot-scope="scope">
          <i class="icon-chakan- icon-hover" @click="see(scope.row.emiMessage)" title="查看"></i>
          <i class="icon-xiugai-1 icon-hover"  title="编辑" @click="modify('modifysystem',scope.row.emiMessage)" v-if="scope.row.emiMessage.publishState === 3"></i>
          <i class="icon-shanchu- icon-hover"  title="删除" @click="del(scope.row.emiMessage)" v-if="scope.row.emiMessage.publishState === 3"></i>
          <i class="icon-chexiao- icon-hover"  title="撤消" @click="Revoke(scope.row.emiMessage)" v-if="scope.row.emiMessage.publishState === 1" style="margin-left: 5px;"></i>
          <!-- <img title="查看" src="../../../../assets/img/temp/select.png" @click="see(scope.row.emiMessage)" />
          <img title="编辑" src="../../../../assets/img/temp/edit.png" @click="modify('modifysystem', scope.row.emiMessage)" v-if="scope.row.emiMessage.publishState === 3" />
          <img title="删除" src="../../../../assets/img/temp/delete.png" @click="del(scope.row.emiMessage)"   v-if="scope.row.emiMessage.publishState === 3"/>
          <img title="撤消" src="../../../../assets/img/temp/revoek.png" @click="Revoke(scope.row.emiMessage)" v-if="scope.row.emiMessage.publishState === 1" width="26px" height="28"/> -->
          <!--<el-button size="mini" type="text" @click="see(scope.row.emiMessage)">查看</el-button>-->
          <!--<el-button type="text"  @click="modify('modifysystem', scope.row.emiMessage)">修改</el-button>-->
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
import {dictType} from '@/config/data.js';
import {formatDate} from '@/utils/method.js';
export default {
  data () {
    return {
      searchForm: {
        beginTime: null,
        endTime: null,
        publishState: '',
        messageType: '39728bba-9b6f-11e8-8a14-3f814d634dc3' + ',' + '39728bba-9b6f-11e8-8a14-3f814d634dc4',
        publishUnitId: null,
        receiverId: '',
        isReceive: '',
        publishTime: []
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      messageTypeList: [],
      DepartmentList: []
    }
  },
  computed: {
  },
  mounted () {
    this.getOneMonth();
    this.getTableData();
  },
  created () {
    this.getMessageType();
    this.getDepartmentList();
  },
  methods: {
    getMessageType () {
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.messagetypeId)
        .then((res) => {
          this.messageTypeList = res.data;
        })
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
    getTableData () {
      let params = {
        'where.beginTime': this.searchForm.publishTime[0],
        'where.endTime': this.searchForm.publishTime[1],
        'where.publishState': this.searchForm.publishState,
        'where.messageType': this.searchForm.messageType,
        // 'where.publishUnitId': this.searchForm.publishUnitId,
        // 'where.receiverId': this.searchForm.receiverId,
        // 'where.isReceive': this.searchForm.isReceive,
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
        pageSize: 999999
      }
      this.axios.get('A3/authServices/organInfos', {params})
        .then((res) => {
          if (res && res.data.list) {
            this.DepartmentList = res.data.list
          }
        })
        .catch(() => {})
    },
    edit () {
    },
    doSearch () {
      this.pageNum = 1;
      this.getTableData();
    },
    searchFormReset () {
      this.searchForm.publishTime = []
      this.searchForm.publishState = '';
      this.searchForm.publishUnitId = null;
      this.searchForm.messageType = '39728bba-9b6f-11e8-8a14-3f814d634dc3' + ',' + '39728bba-9b6f-11e8-8a14-3f814d634dc4';
      // this.$refs['searchForm'].resetFields();
      this.getOneMonth();
      this.pageNum = 1;
      this.getTableData();
    },
    // 分页
    pagerSizeChange (val) {
      this.pageNum = 1;
      this.pageSize = val;
      this.getTableData();
    },
    pagerCurrChange (val) {
      this.pageNum = val;
      this.getTableData();
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
    showEditDialog (status) {
      // this.editDialogVisible = flag;
      this.$router.push({name: 'notice-release', query: {status: status}});
    },
    modify (status, scope) {
      this.$router.push({name: 'notice-modify', query: {status: status, messageId: scope.messageId}});
    },
    see (scope) {
      const status = '查看消息';
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
      width: 10%!important;
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
