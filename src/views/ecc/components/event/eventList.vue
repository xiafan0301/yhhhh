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
      <el-form :inline="true" :model='selectForm' class="demo-form-inline" size="small">
        <el-form-item style="width: 250px;" prop='reportTime'>
          <el-date-picker
            v-model='selectForm.reportTime'
            type="daterange"
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
          <el-button type="primary" class='selectBtn btnClass'>查询</el-button>
          <el-button class='btnClass'>重置</el-button>
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
          <el-button type='text' style='color: #0785FD' @click='skipEventDetail'>查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div is='pagination'></div>
  </div>
</template>
<script>
import pagination from '@/components/common/pagination.vue';
import {dictType} from '@/config/data.js';
export default {
  components: {pagination},
  data () {
    return {
      selectForm: {
        reportTime: [], // 时间
        // reportTimeEnd: '', // 结束时间
        eventStatus: '', // 事件状态
        eventLevel: '全部等级', // 事件等级
        eventSource: '全部来源', // 事件来源
        phoneOrNumber: '' // 事件编号或提交人手机号
      },
      eventStatusList: [],
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
    skipEventDetail () { // 跳转到事件详情页面
      // this.$router.push({name: 'event-detail'});
      this.$router.push({name: 'event-untreated'});
    },
    getEventStatus () { // 获取事件状态
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.eventStateId)
        .then((res) => {
          if (res) {
            res.data.map((item) => {
              if (item.dictContent === '未处理') {
                this.selectForm.eventStatus = item.dictId;
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
      if (this.selectForm.eventLevel === '全部等级') {
        this.selectForm.eventLevel = '';
      }
      if (this.selectForm.eventSource === '全部来源') {
        this.selectForm.eventSource = '';
      }
      const params = {
        'where.reportTimeStart': this.selectForm.reportTime[0],
        'where.reportTimeEnd': this.selectForm.reportTime[1],
        'where.eventStatus': this.selectForm.eventStatus,
        'where.eventLevel': this.selectForm.eventLevel,
        'where.eventSource': this.selectForm.eventSource,
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
      this.selectForm.reportTime.push(start);
      this.selectForm.reportTime.push(end);
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
