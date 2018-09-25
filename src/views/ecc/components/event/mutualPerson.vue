<template>
  <div class="mutual-person">
    <div class='header-person'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>事件管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>APP互助消息管理</span></el-breadcrumb-item>
      </el-breadcrumb>
      <el-button class='selectBtn add-msg' @click="skipAddMsg('add')">添加消息</el-button>
    </div>
    <div class="clearfix search-person">
      <el-form style="float: left;width:100%" :inline="true" :model='selectForm' ref='selectForm' class="demo-form-inline" size="small">
        <el-form-item style="width: 280px;" prop='reportTime'>
          <el-date-picker
            v-model='selectForm.reportTime'
            type="daterange"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item style="width: 150px;" prop='eventStatus'>
          <el-select placeholder="事件状态" style="width: 100%;" v-model='selectForm.eventStatus'>
            <el-option value='全部状态'></el-option>
            <el-option
              v-for="item in eventStatusList"
              :key="item.dictId"
              :label="item.dictContent"
              :value="item.dictId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class='selectBtn btnClass' @click='selectData'>查询</el-button>
          <el-button class='btnClass' @click="resetForm('selectForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table style="width: 100%" class='person-table' :data='appEventDataList'>
      <el-table-column fixed type='index' label="序号" align='center'></el-table-column>
      <el-table-column prop='reportTime' label="上报时间" align='center'></el-table-column>
      <el-table-column prop='eventAddress' label="事件地点" align='center' show-overflow-tooltip></el-table-column>
      <el-table-column prop='eventDetail' label="事件情况" align='center' show-overflow-tooltip></el-table-column>
      <el-table-column prop='eventStatusName' label="事件状态" align='center' >
         <template slot-scope="scope">
          <span style="color: #0785FD;" v-if="scope.row.eventStatusName == '处理中'">处理中</span>
          <span style="color: #666666;" v-else-if="scope.row.eventStatusName == '已结束'">已结束</span>
        </template>
      </el-table-column>
      <el-table-column prop='commentNumbers' label="评论数量" align='center' ></el-table-column>
      <el-table-column label="操作" align='center' width='200px'>
        <template slot-scope="scope">
          <i class="icon-chakan- icon-hover" @click="skipPersonDetail(scope)" title="查看"></i>
          <i class="icon-xiugai-1 icon-hover" @click="skipAddMsg('modify', scope)" title="编辑"></i>
          <i class="icon-shanchu- icon-hover" @click="showDelete(scope)" title="删除"></i>
          <!-- <img title="查看" src="../../../../assets/img/temp/select.png" @click="skipPersonDetail(scope)" />
          <img title="编辑" src="../../../../assets/img/temp/edit.png" @click="skipAddMsg('modify', scope)" />
          <img title="删除" src="../../../../assets/img/temp/delete.png" @click="showDelete(scope)" /> -->
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
      title="操作提示"
      :visible.sync="deleteVisiable"
      width="480px"
      height='285px'
      center>
      <span style='text-align:center'>删除后APP端将无法再查看，是否确认删除?</span>
      <span slot="footer" class="dialog-footer">
        <el-button class='sureBtn' @click="deletEvent">确定删除</el-button>
        <el-button class='noSureBtn' @click="deleteVisiable = false">暂不删除</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {dictType} from '@/config/data.js';
import {formatDate} from '@/utils/method.js';
export default {
  data () {
    return {
      deleteVisiable: false,
      delEventId: '', // 要删除的eventid
      selectForm: {
        eventStatus: '4037156e-97b5-11e8-b784-93a0bc9b77e5',
        reportTime: []
      },
      eventStatusList: [],
      appEventDataList: [],
      pagination: { total: 0, pageSize: 10, pageNum: 1 }
    }
  },
  computed: {
  },
  mounted () {
    this.getEventStatus();
    this.getOneMonth();
    this.getAppEventList();
  },
  methods: {
    skipAddMsg (status, scope) { // 跳转到添加消息页面
      if (status === 'add') {
        this.$router.push({name: 'add-message', query: {status: status}});
      } else {
        this.$router.push({name: 'add-message', query: {status: status, eventId: scope.row.eventId}});
      }
    },
    skipPersonDetail (scope) { // 查看
      this.$router.push({name: 'mutual-detail', query: {eventId: scope.row.eventId, eventStatus: scope.row.eventStatusName}});
    },
    onPageChange (page) {
      this.pagination.pageNum = page;
      this.getAppEventList();
    },
    onSizeChange (val) {
      this.pagination.pageNum = 1;
      this.pagination.pageSize = val;
      this.getAppEventList();
    },
    getEventStatus () { // 获取事件状态
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.eventStateId)
        .then((res) => {
          if (res) {
            res.data.map((item) => {
              if (item.dictContent !== '未处理') {
                this.eventStatusList.push(item);
              }
            })
          }
        })
        .catch(() => {})
    },
    getOneMonth () { // 设置默认一个月
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      const startDate = formatDate(start, 'yyyy-MM-dd');
      const endDate = formatDate(end, 'yyyy-MM-dd');
      this.selectForm.reportTime.push(startDate);
      this.selectForm.reportTime.push(endDate);
    },
    getAppEventList () {
      let eventStatus;
      if (this.selectForm.eventStatus === '全部状态') {
        eventStatus = '';
      } else {
        eventStatus = this.selectForm.eventStatus;
      }
      const params = {
        'where.eventFlag': false,
        'where.mutualFlag': true,
        'where.reportTimeStart': this.selectForm.reportTime[0],
        'where.reportTimeEnd': this.selectForm.reportTime[1],
        'where.eventStatus': eventStatus,
        pageNum: this.pagination.pageNum
      }
      this.axios.get('A2/eventServices/events/page', {params})
        .then((res) => {
          if (res && res.data.list) {
            this.appEventDataList = res.data.list;
            this.pagination.total = res.data.total;
          }
        })
        .catch(() => {})
    },
    selectData () {
      this.getAppEventList();
    },
    resetForm (form) { // 重置查询条件
      this.$refs[form].resetFields();
      this.getOneMonth();
      this.getAppEventList();
    },
    showDelete (scope) { // 显示删除提示框
      this.delEventId = scope.row.eventId;
      this.deleteVisiable = true;
    },
    deletEvent () { // 删除事件
      const deleteId = this.delEventId;
      if (deleteId) {
        this.axios.delete('A2/eventServices/event/' + deleteId)
          .then((res) => {
            if (res) {
              this.$message({
                message: '删除事件成功',
                type: 'success'
              });
              this.getAppEventList();
              this.deleteVisiable = false;
            } else {
              this.$message.error('删除事件失败');
              this.deleteVisiable = false;
            }
          })
          .catch(() => {})
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .mutual-person {
    padding: 20px;
    .header-person {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
    }
    .btnClass {
      width: 80px;
    }
    .add-msg {
      color: #fff;
      float: right;
    }
    .selectBtn {
      background: #0785FD;
      color:#fff;
    }
    .search-person {
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
    .el-button+.el-button {
      margin-left: 2px !important;
    }
    .el-pagination {
      text-align: center;
    }
    .person-table {
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
  }
</style>
