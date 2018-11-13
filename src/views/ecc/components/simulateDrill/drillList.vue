<template>
  <div class="drill-list">
    <div class='header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>模拟演练</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>演练记录</span></el-breadcrumb-item>
      </el-breadcrumb>
      <el-button class='selectBtn add-drill' @click='skipAddDrill'>新建演练</el-button>
    </div>
    <div class="clearfix search-drill">
      <el-form style="float: left;width:100%" :inline="true" ref='selectForm' :model='selectForm' class="demo-form-inline" size="small">
        <el-form-item style="width: 250px;" prop='reportTime'>
          <el-date-picker
            v-model='selectForm.reportTime'
            value-format="yyyy-MM-dd"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 250px;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item style="width: 200px;" prop='eventStatus'>
          <el-select placeholder="状态" style="width: 100%;" v-model='selectForm.eventStatus'>
            <el-option value='全部状态'></el-option>
            <el-option
              v-for="item in eventStatusList"
              :key="item.dictId"
              :label="item.dictContent"
              :value="item.dictId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 200px;" prop='projectName'>
          <el-input type="text" v-model="selectForm.projectName" placeholder="请输入演练项目名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class='selectBtn' style='width: 80px' @click='selectData'>查询</el-button>
          <el-button style='width: 80px' @click="resetForm('selectForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table style="width: 100%" :data='drillDataList' class="table-ctc">
      <el-table-column fixed prop='eventCode' label="演练项目名称" align='center'></el-table-column>
      <el-table-column prop='eventTypeName' label="创建人" align='center'></el-table-column>
      <el-table-column prop='reportTime' label="开始时间" align='center'></el-table-column>
      <el-table-column prop='duration' label="演练时长" align='center'>
        <template slot-scope="scope">
          <span v-if="scope.row.duration">{{scope.row.duration}}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop='eventStatusName' label="状态" align='center'>
        <template slot-scope="scope">
          <span style="color: #FB796C;" v-if="scope.row.eventStatusName == '处理中' && scope.row.isOverReportTime === false">未开始</span>
          <span style="color: #0785FD;" v-else-if="scope.row.eventStatusName == '处理中'">进行中</span>
          <span style="color: #666666;" v-else>已结束</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align='center' width='200px'>
        <template slot-scope="scope">
          <i class="icon-chakan- icon-hover" title="查看" @click="skipDrillDetail(scope)"></i>
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
import {dictType} from '@/config/data.js';
import {formatDate} from '@/utils/method.js';
export default {
  data () {
    return {
      selectForm: {
        projectName: null,
        reportTime: [],
        eventStatus: '全部状态'
      },
      drillDataList: [],
      eventStatusList: [],
      pagination: { total: 0, pageSize: 10, pageNum: 1 }
    }
  },
  mounted () {
    this.getEventStatus();
    this.getOneMonth();
    this.getDrillList();
  },
  methods: {
    getOneMonth () { // 设置默认一个月
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      const startDate = formatDate(start, 'yyyy-MM-dd');
      const endDate = formatDate(end, 'yyyy-MM-dd');
      this.selectForm.reportTime.push(startDate);
      this.selectForm.reportTime.push(endDate);
    },
    onPageChange (page) {
      this.pagination.pageNum = page;
      this.getDrillList();
    },
    onSizeChange (val) {
      this.pagination.pageNum = 1;
      this.pagination.pageSize = val;
      this.getDrillList();
    },
    skipDrillDetail (scope) { // 跳到详情页
      const params = {
        eventId: scope.row.eventId,
        acceptFlag: true
      }
      if (scope.row.eventStatusName === '处理中' && scope.row.isOverReportTime === false) {
        this.$router.push({name: 'unreated-drill', query: {eventId: scope.row.eventId}});
      } else if (scope.row.eventStatusName === '已结束') {
        this.$router.push({name: 'drill-detail-end', query: {eventId: scope.row.eventId}});
      } else {
        this.$router.push({name: 'drill-detail-reat', query: {eventId: scope.row.eventId}});
        // this.$router.push({name: 'unreated-drill', query: {eventId: scope.row.eventId}});
      }
    },
    getEventStatus () { // 获取事件状态
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.eventStateId)
        .then((res) => {
          if (res && res.data) {
            res.data.map(item => {
              if (item.dictContent === '未处理') {
                item.dictContent = '未开始';
              }
              if (item.dictContent === '处理中') {
                item.dictContent = '进行中';
              }
            });
            this.eventStatusList = res.data;
          }
        })
        .catch(() => {})
    },
    selectData () { // 根据条件查询
      this.getDrillList();
    },
    resetForm (form) { // 重置表单
      this.$refs[form].resetFields();
      this.getOneMonth();
      this.getDrillList();
    },
    skipAddDrill () { // 跳转到新建演练的页面
      this.$router.push({name: 'new-drill'});
    },
    getDrillList () { // 分页获取模拟事件
      let eventStatus;
      if (this.selectForm.eventStatus === '全部状态') {
        eventStatus = '';
      } else {
        eventStatus = this.selectForm.eventStatus;
      }
      const params = {
        'where.eventFlag': true,
        'where.reportTimeStart': this.selectForm.reportTime[0],
        'where.reportTimeEnd': this.selectForm.reportTime[1],
        'where.eventStatus': eventStatus,
        'where.otherQuery': this.selectForm.projectName,
        'where.simulateFlag': true,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      }
      this.axios.get('A2/eventServices/events/page', {params})
        .then((res) => {
          if (res && res.data.list) {
            console.log(res.data);
            this.drillDataList = res.data.list;
            this.pagination.total = res.data.total;
          }
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.drill-list {
  padding: 20px;
  .header {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }
  .selectBtn {
    background-color: #0785FD;
  }
  .add-drill {
    color: #fff;
    float: right;
  }
  .search-drill {
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
  .selectBtn {
    background: #0785FD;
  }
  .el-button+.el-button {
    margin-left: 2px !important;
  }
  /deep/ .el-table thead th {
    background-color: #FAFAFA !important;
  }
  /deep/ .hover-row>td {
    background-color: #E6F7FF !important;
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
