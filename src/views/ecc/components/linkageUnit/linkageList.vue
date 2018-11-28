<template>
  <div class="linkage-data-list">
    <div class='header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>调度指挥</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>调度指挥</span></el-breadcrumb-item>
      </el-breadcrumb>
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
            style="width: 250px;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item style="width: 130px;" prop='eventType'>
          <el-select  placeholder="事件类型" style="width: 100%;" v-model='selectForm.eventType'>
            <el-option value='全部类型'></el-option>
            <el-option
              v-for="item in eventTypeList"
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
        <el-form-item style="width: 110px;" prop='eventStatus'>
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
          <el-button type="primary" class='selectBtn btnClass' @click='selectEventList'>查询</el-button>
          <el-button class='btnClass' @click="resetForm('selectForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table style="width: 100%" :data='eventDataList' class='event-table'>
      <el-table-column fixed label="事件编号" prop='eventCode' align='center'></el-table-column>
      <el-table-column label="事件类型" prop='eventType' align='center'>
        <template slot-scope="scope">
          <span v-if='scope.row.eventType'>{{scope.row.eventType}}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="事件等级" prop='eventLevel' align='center'>
        <template slot-scope="scope">
          <span v-if='scope.row.eventLevel'>{{scope.row.eventLevel}}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="派单时间" prop='createTime' align='center'></el-table-column>
      <el-table-column label="任务名称" prop='taskName' align='center' show-overflow-tooltip></el-table-column>
      <el-table-column label="状态" prop='eventStatusName' align='center'></el-table-column>
      <el-table-column label="是否查看" prop='taskStatusName' align='center'>
        <template slot-scope="scope">
          <span style="color: #555555;" v-if="scope.row.taskStatusName == '已查看'">{{scope.row.taskStatusName}}</span>
          <span style="color: #FB796C;" v-else>{{scope.row.taskStatusName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align='center'>
        <template slot-scope="scope">
          <i class="icon-chakan- icon-hover" v-show="resouceData && resourceBtn[resouceData.lookCtcLinkage]" @click="skipEventDetail(scope)" title="查看"></i>
          <!-- <el-button type='text' style='color:#0785FD;font-size:14px;border-radius:15px;border:1px solid;padding:5px 10px' @click='skipEventDetail(scope)'>查看</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: right; padding-top: 10px;">
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
import {dictType, resouceData} from '@/config/data.js';
import {formatDate} from '@/utils/method.js';
export default {
  data () {
    return {
      resourceBtn: {},
      resouceData: resouceData,
      selectForm: {
        reportTime: [], // 时间
        eventStatus: '4037156e-97b5-11e8-b784-93a0bc9b77e5', // 事件状态
        eventLevel: '全部等级', // 事件等级
        eventType: '全部类型' // 事件类型
      },
      eventStatusList: [],
      dictId: '', // 未处理的id
      eventLevelList: [],
      eventTypeList: [],
      processTypeId: '',
      eventDataList: [],
      pagination: { total: 0, pageSize: 10, pageNum: 1 }
    }
  },
  created () {
    this.resourceBtn = JSON.parse(sessionStorage.getItem('resourcebtn'));
  },
  mounted () {
    this.getEventStatus();
    this.getEventLevel();
    this.getEventType();
    this.getOneMonth();
    this.getEventList();
    this.getProcessTypeList();
  },
  methods: {
    onPageChange (page) {
      this.pagination.pageNum = page;
      this.getEventList();
    },
    onSizeChange (val) {
      this.pagination.pageNum = 1;
      this.pagination.pageSize = val;
      this.getEventList();
    },
    skipEventDetail (scope) { // 跳转到事件详情页面
      if (scope.row.taskStatusName === '未查看') {
        const params = {
          processType: this.processTypeId
        }
        this.axios.post('A2/taskServices/task/process/' + scope.row.eventId + '/' + scope.row.taskId, params)
          .then((res) => {
            console.log(res);
          })
          .catch(() => {})
      }
      if (scope.row.eventStatusName === '已结束') {
        this.$router.push({name: 'linkage-detail-end', query: {eventId: scope.row.eventId}});
      } else {
        this.$router.push({name: 'linkage-detail-reat', query: {eventId: scope.row.eventId, taskId: scope.row.taskId, name: scope.row.taskStatusName}});
      }
    },
    getEventStatus () { // 获取事件状态
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.eventStateId)
        .then((res) => {
          if (res) {
            res.data.map((item) => {
              if (item.dictContent !== '未处理') {
                this.eventStatusList.push(item);
              }
            });
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
    getEventType () { // 获取事件类型
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.eventTypeId)
        .then((res) => {
          if (res) {
            this.eventTypeList = res.data;
          }
        })
        .catch(() => {})
    },
    getProcessTypeList () { // 获取事件处理过程
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.processTypeId)
        .then((res) => {
          if (res && res.data) {
            // console.log(res.data)
            res.data.map((item, index) => {
              if (item.dictContent === '联动单位受理') {
                this.processTypeId = item.dictId;
              }
            });
          }
        })
        .catch(() => {})
    },
    getEventList () { // 分页获取事件
      let eventLevel, eventType, eventStatus;
      if (this.selectForm.eventLevel === '全部等级') {
        eventLevel = '';
      } else {
        eventLevel = this.selectForm.eventLevel;
      }
      if (this.selectForm.eventType === '全部类型') {
        eventType = '';
      } else {
        eventType = this.selectForm.eventType;
      }
      if (this.selectForm.eventStatus === '全部状态') {
        eventStatus = '';
      } else {
        eventStatus = this.selectForm.eventStatus;
      }
      const params = {
        'where.startTime': this.selectForm.reportTime[0],
        'where.endTime': this.selectForm.reportTime[1],
        'where.eventStatus': eventStatus,
        'where.eventLevel': eventLevel,
        'where.eventType': eventType,
        'where.simulateFlag': false,
        pageNum: this.pagination.pageNum
      }
      this.axios.get('A2/taskServices/tasks', {params})
        .then((res) => {
          if (res && res.data.list) {
            this.eventDataList = res.data.list;
            this.pagination.total = res.data.total;
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
      this.getEventList();
    }
  }
}
</script>
<style lang="scss" scoped>
  .linkage-data-list {
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
