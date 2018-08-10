<template>
  <div class="replan-list">
    <div class='replan-list-header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>调度指挥</el-breadcrumb-item>
        <el-breadcrumb-item>方案制定</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>查询预案</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="clearfix search-replan">
      <el-form :inline="true" :model='selectForm' class="demo-form-inline" size="small">
        <el-form-item style="width: 150px;" prop='eventStatus'>
          <el-select placeholder="预案类型" style="width: 100%;" v-model='selectForm.eventStatus'>
            <el-option label="全部状态" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 150px;" prop='eventLevel'>
          <el-select placeholder="适用等级" style="width: 100%;" v-model='selectForm.eventLevel'>
            <el-option label="全部等级" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 200px;" prop='phoneOrNumber'>
          <el-input placeholder='请输入预案名称' style='width:100%' v-model='selectForm.phoneOrNumber'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class='selectBtn btnClass'>查询</el-button>
          <el-button class='btnClass'>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      style="width: 100%"
      :data='reservePlanList'
      highlight-current-row
      class='ctc-table'
    >
      <el-table-column label="预案名称" prop='planName' align='center' show-overflow-tooltip></el-table-column>
      <el-table-column label="预案类型" prop='planType' align='center'></el-table-column>
      <el-table-column label="适用等级" prop='levelList' align='center'></el-table-column>
      <el-table-column label="操作" align='center'>
        <template slot-scope="scope">
          <el-button type='text' style='color: #0785FD' @click='selectReplanDetail'>查看</el-button>
          <el-button type='text' style='color: #0785FD'>启用</el-button>
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
      reservePlanList: [{
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      }, {
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      }, {
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      }, {
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      }, {
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      }, {
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      }, {
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      }, {
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      }]
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    selectReplanDetail () { // 查看预案详情
      this.$router.push({name: 'replan-detail'});
    }
  }
}
</script>
<style lang="scss" scoped>
  .replan-list {
    padding: 20px;
    .replan-list-header {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
    }
    .search-replan {
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
