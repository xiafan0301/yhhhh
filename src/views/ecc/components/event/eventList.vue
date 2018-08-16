<template>
  <div class="event-data-list">
    <div class='header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>事件管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>事件管理</span></el-breadcrumb-item>
      </el-breadcrumb>
      <el-button class='selectBtn add-event' @click='skipAddEvent'>添加事件</el-button>
    </div>
    <div class="clearfix search">
      <el-form :inline="true" :model='selectForm' ref='selectForm' class="demo-form-inline" size="small">
        <el-form-item style="width: 250px;" prop='reportTime'>
          <el-date-picker
            v-model='selectForm.reportTime'
            type="daterange"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item style="width: 110px;" prop='eventStatus'>
          <el-select placeholder="事件状态" style="width: 100%;" v-model='selectForm.eventStatus'>
            <el-option
              v-for="item in eventStatusList"
              :key="item.dictId"
              :label="item.dictContent"
              :value="item.dictId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 110px;" prop='eventLevel'>
          <el-select placeholder="事件等级" style="width: 100%;" v-model='selectForm.eventLevel'>
            <el-option value='全部等级'></el-option>
            <el-option
              v-for="item in eventLevelList"
              :key="item.dictId"
              :label="item.dictContent"
              :value="item.dictId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 130px;" prop='eventSource'>
          <el-select  placeholder="事件来源" style="width: 100%;" v-model='selectForm.eventSource'>
            <el-option value='全部来源'></el-option>
            <el-option
              v-for="item in eventSourceList"
              :key="item.dictId"
              :label="item.dictContent"
              :value="item.dictId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 220px;" prop='phoneOrNumber'>
          <el-input placeholder='请输入提交者手机号或事件编号' style='width:110%' v-model='selectForm.phoneOrNumber'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class='selectBtn btnClass' @click='selectEventList'>查询</el-button>
          <el-button class='btnClass' @click="resetForm('selectForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table style="width: 100%" :data='eventDataList' highlight-current-row class='event-table'>
      <el-table-column label="事件编号" prop='eventCode' align='center'></el-table-column>
      <el-table-column label="报案人" prop='reporterPhone' align='center'></el-table-column>
      <el-table-column label="角色" prop='reporterRole' align='center'></el-table-column>
      <el-table-column label="来源" prop='eventSourceName' align='center'></el-table-column>
      <el-table-column label="上报时间" prop='reportTime' align='center'></el-table-column>
      <el-table-column label="事件地点" prop='eventAddress' align='center'></el-table-column>
      <el-table-column label="事件等级" prop='eventLevelName' align='center'></el-table-column>
      <el-table-column label="事件状态" prop='eventStatusName' align='center'>
        <template slot-scope="scope">
          <span style="color: #FB796C;" v-if="scope.row.eventStatusName == '未处理'">未处理</span>
          <span style="color: #0785FD;" v-else-if="scope.row.eventStatusName == '处理中'">处理中</span>
          <span style="color: #666666;" v-else>已结束</span>
        </template>
      </el-table-column>
      <el-table-column label="是否查看" prop='acceptFlag' align='center'>
        <template slot-scope="scope">
          <span style="color: #555555;" v-if="scope.row.acceptFlag == true">是</span>
          <span style="color: #FB796C;" v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align='center'>
        <template slot-scope="scope">
          <el-button type='text' style='color: #0785FD' @click='skipEventDetail(scope)'>查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div is='pagination'></div> -->
  </div>
</template>
<script>
import pagination from '@/components/common/pagination.vue';
import {dictType} from '@/config/data.js';
import {formatDate} from '@/utils/method.js';
export default {
  components: {pagination},
  data () {
    return {
      selectForm: {
        reportTime: [], // 时间
        eventStatus: '', // 事件状态
        eventLevel: '全部等级', // 事件等级
        eventSource: '全部来源', // 事件来源
        phoneOrNumber: '' // 事件编号或提交人手机号
      },
      eventStatusList: [],
      dictId: '', // 未处理的id
      eventLevelList: [],
      eventSourceList: [],
      eventDataList: [],
      pager: { total: 0, pageSize: 10, pageNum: 1 }
    }
  },
  mounted () {
    this.getEventStatus();
    this.getEventLevel();
    this.getEventSource();
    this.getOneMonth();
    this.getEventList();
  },
  methods: {
    skipAddEvent () { // 跳转到添加事件页面
      this.$router.push({name: 'add-event'});
    },
    skipEventDetail (scope) { // 跳转到事件详情页面
      if (scope.row.eventStatusName === '未处理') {
        this.$router.push({name: 'event-untreated', params: {eventId: scope.row.eventId}});
      } else if (scope.row.eventStatusName === '已结束') {
        this.$router.push({name: 'event-detail-end', params: {eventId: scope.row.eventId}});
      } else {
        this.$router.push({name: 'event-detail-reat', params: {eventId: scope.row.eventId}});
      }
    },
    getEventStatus () { // 获取事件状态
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.eventStateId)
        .then((res) => {
          if (res) {
            res.data.map((item) => {
              if (item.dictContent === '未处理') {
                this.selectForm.eventStatus = item.dictId;
                this.dictId = item.dictId;
              }
            })
            this.eventStatusList = res.data;
          }
        })
        .catch(() => {})
    },
    getEventLevel () { // 获取事件等级
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.eventLevelId)
        .then((res) => {
          if (res) {
            this.eventLevelList = res.data;
          }
        })
        .catch(() => {})
    },
    getEventSource () { // 获取事件来源
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.eventSourceId)
        .then((res) => {
          if (res) {
            this.eventSourceList = res.data;
          }
        })
        .catch(() => {})
    },
    getEventList () { // 分页获取事件
      let eventLevel, eventSource;
      if (this.selectForm.eventLevel === '全部等级') {
        eventLevel = '';
      } else {
        eventLevel = this.selectForm.eventLevel;
      }
      if (this.selectForm.eventSource === '全部来源') {
        eventSource = '';
      } else {
        eventSource = this.selectForm.eventSource;
      }
      const params = {
        'where.reportTimeStart': this.selectForm.reportTime[0],
        'where.reportTimeEnd': this.selectForm.reportTime[1],
        'where.eventStatus': this.selectForm.eventStatus,
        'where.eventLevel': eventLevel,
        'where.eventSource': eventSource,
        'where.otherQuery': this.selectForm.phoneOrNumber,
        pageNum: this.pager.pageNum
      }
      this.axios.get('A2/eventServices/events/page', {params})
        .then((res) => {
          if (res && res.data.list) {
            this.eventDataList = res.data.list;
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
    selectEventList () { // 通过条件查询事件列表
      this.getEventList();
    },
    resetForm (form) { // 重置查询条件
      this.$refs[form].resetFields();
      this.getOneMonth();
      this.selectForm.eventStatus = this.dictId;
      this.getEventList();
    }
  }
}
</script>
<style lang="scss" scoped>
  .event-data-list {
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
    .add-event {
      color: #fff;
      float: right;
    }
    .el-table thead th {
      background-color: #FAFAFA !important;
    }
  }
</style>
