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
        <el-form-item style="width: 150px;">
          <el-select placeholder="预案类型" style="width: 100%;" v-model='selectForm.planType'>
            <el-option value="全部类型"></el-option>
            <el-option
              v-for="item in eventTypeList"
              :key="item.dictId"
              :label="item.dictContent"
              :value="item.dictId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 150px;">
          <el-select placeholder="适用等级" style="width: 100%;" v-model='selectForm.planLevel'>
            <el-option value="全部等级"></el-option>
            <el-option
              v-for="item in eventLevelList"
              :key="item.dictId"
              :label="item.dictContent"
              :value="item.dictId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 200px;">
          <el-input placeholder='请输入预案名称' style='width:100%' v-model='selectForm.planName'></el-input>
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
          <el-button type='text' style='color:#0785FD;font-size:14px;border-radius:15px;border:1px solid;padding:5px 10px' @click='selectReplanDetail'>查看</el-button>
          <el-button type='text' style='color:#0785FD;font-size:14px;border-radius:15px;border:1px solid;padding:5px 10px'>启用</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {dictType} from '@/config/data.js';
export default {
  data () {
    return {
      selectForm: {
        planLevel: '全部等级', // 预案等级
        planType: '全部类型', // 预案类型
        planName: '' // 预案名称
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
      }],
      eventLevelList: [],
      eventTypeList: []
    }
  },
  computed: {
  },
  mounted () {
    this.getEventLevel();
    this.getEventType();
  },
  methods: {
    selectReplanDetail () { // 查看预案详情
      this.$router.push({name: 'replan-detail'});
    },
    getEventLevel () { // 获取事件等级
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.eventLevelId)
        .then((res) => {
          if (res && res.data) {
            this.eventLevelList = res.data;
          }
        })
        .catch(() => {})
    },
    getEventType () { // 获取事件类型
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.eventTypeId)
        .then((res) => {
          if (res && res.data) {
            this.eventTypeList = res.data;
          }
        })
        .catch(() => {})
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
    .el-button+.el-button {
      margin-left: 2px !important;
    }
  }
</style>
