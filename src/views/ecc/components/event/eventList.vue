<template>
  <div class="ba-not">
    <div class='header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>事件管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>事件管理</span></el-breadcrumb-item>
      </el-breadcrumb>
      <el-button class='selectBtn add-event' @click='skipAddEvent'>添加事件</el-button>
    </div>
    <div class="clearfix search">
      <el-form :inline="true" :model='selectForm' class="demo-form-inline" size="small">
        <el-form-item style="width: 280px;" prop='reportTimeStart'>
          <el-date-picker
            v-model='selectForm.reportTimeStart'
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item style="width: 110px;" prop='eventStatus'>
          <el-select placeholder="事件状态" style="width: 100%;" v-model='selectForm.eventStatus'>
            <el-option label="全部状态" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 110px;" prop='eventLevel'>
          <el-select placeholder="事件等级" style="width: 100%;" v-model='selectForm.eventLevel'>
            <el-option label="全部等级" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 110px;" prop='eventSource'>
          <el-select  placeholder="事件来源" style="width: 100%;" v-model='selectForm.eventSource'>
            <el-option label="全部来源" :value="0"></el-option>
            <el-option label="可用" :value="1"></el-option>
            <el-option label="异常" :value="2"></el-option>
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
      <el-table-column label="事件状态" prop='eventStatusName' align='center'></el-table-column>
      <el-table-column label="是否查看" prop='acceptFlag' align='center'></el-table-column>
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
export default {
  components: {pagination},
  data () {
    return {
      selectForm: {
        reportTimeStart: '', // 开始时间
        reportTimeEnd: '', // 结束时间
        eventStatus: '', // 事件状态
        eventLevel: '', // 事件等级
        eventSource: '', // 事件来源
        phoneOrNumber: '' // 事件编号或提交人手机号
      },
      eventStatusList: [],
      eventLevelList: [],
      eventSource: [],
      eventDataList: [{
        eventId: '111111',
        eventCode: '33333',
        reporterUserId: '1111',
        reporterPhone: '1111111111',
        reporterRole: '民众',
        eventSource: 'asda',
        eventSourceName: '撒打算',
        reportTime: '2018-12-09',
        eventAddress: '湖南长沙',
        eventLevel: 'I级',
        eventLevelName: 'sdka',
        eventStatus: '未处理',
        eventStatusName: 'asdad',
        acceptFlag: 0
      }]
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    skipAddEvent () { // 跳转到添加事件页面
      this.$router.push({name: 'add-event'});
    },
    skipEventDetail () { // 跳转到事件详情页面
      // this.$router.push({name: 'event-detail'});
      this.$router.push({name: 'event-untreated'});
    },
    getEventList () { // 根据默认刷选条件获取事件列表
    },
    getEventStatus () { // 获取事件状态
      // const params = {
      //   dictTypeId: 1
      // };
      // this.axios.get("/dictServices/dicts/byDictTypeId/ ' + params.dictTypeId + '")
      //   .then((res) => {
      //     if (res) {
      //       this.eventStatusList = res.data;
      //     }
      //   })
      //   .catch(() => {})
    },
    getEventLevel () { // 获取事件等级
    },
    getEventSource () { // 获取事件来源
    }
  }
}
</script>
<style lang="scss" scoped>
  .ba-not {
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
