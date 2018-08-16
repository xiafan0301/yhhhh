<template>
  <div class="ctc-list">
    <div class='ctc-header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>调度指挥</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>调度指挥</span></el-breadcrumb-item>
      </el-breadcrumb>
      <el-button class='selectBtn look-event' @click='skipLookEvent'>查看事件分布</el-button>
    </div>
    <div class="clearfix search-event" style="position: relative;width: 100%">
      <el-form style="float: left;width:100%" :inline="true" :model='selectForm' class="demo-form-inline" size="small">
        <el-form-item style="width: 280px;">
          <el-date-picker
            v-model='selectForm.reportTime'
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item style="width: 200px;">
          <el-select placeholder="事件类型" style="width: 100%;" v-model='selectForm.eventType'>
            <el-option value='全部类型'></el-option>
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
          <el-select placeholder="事件等级" style="width: 100%;" v-model='selectForm.eventLevel'>
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
        <el-form-item>
          <el-button type="primary" class='selectBtn'>查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table style="width: 100%" :data='ctcDataList'>
      <el-table-column prop='eventCode' label="事件编号" align='center'></el-table-column>
      <el-table-column prop='eventType' label="事件类型" align='center'></el-table-column>
      <el-table-column prop='eventLevel' label="事件等级" align='center'></el-table-column>
      <el-table-column prop='assignTime' label="受理时间" align='center'></el-table-column>
      <el-table-column prop='eventAddress' label="事件地点" align='center'></el-table-column>
      <el-table-column prop='number' label="新反馈数" align='center'>
        <template slot-scope="scope">
          <span style="color: #FB796C;" v-if="scope.row.number > 0">{{scope.row.number}}</span>
          <span style="color: #555555;" v-else>{{scope.row.number}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align='center'>
        <template slot-scope="scope">
          <el-button type='text' style='color:#0785FD;font-size:14px;border-radius:15px;border:1px solid;padding:5px 10px'>查看</el-button>
          <el-button type='text' style='color:#0785FD;font-size:14px;border-radius:15px;border:1px solid;padding:5px 10px' @click='skipCtcDetail'>调度</el-button>
          <el-button type='text' style='color:#0785FD;font-size:14px;border-radius:15px;border:1px solid;padding:5px 10px'>结束</el-button>
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
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </template>
    </div>
  </div>
</template>
<script>
import {dictType} from '@/config/data.js';
export default {
  data () {
    return {
      selectForm: {
        reportTime: [],
        eventLevel: '全部等级',
        eventType: '全部类型'
      },
      ctcDataList: [{
        eventCode: '1111111111',
        eventType: '自然灾害类',
        eventLevel: 'Ⅰ级（特大）',
        assignTime: '2018-2-13 19:10',
        eventAddress: '长沙市芙蓉区远大二路208号12栋208',
        number: 4
      },{
        eventCode: '1111111111',
        eventType: '自然灾害类',
        eventLevel: 'Ⅰ级（特大）',
        assignTime: '2018-2-13 19:10',
        eventAddress: '长沙市芙蓉区远大二路208号12栋208',
        number: 4
      },{
        eventCode: '1111111111',
        eventType: '自然灾害类',
        eventLevel: 'Ⅰ级（特大）',
        assignTime: '2018-2-13 19:10',
        eventAddress: '长沙市芙蓉区远大二路208号12栋208',
        number: 4
      },{
        eventCode: '1111111111',
        eventType: '自然灾害类',
        eventLevel: 'Ⅰ级（特大）',
        assignTime: '2018-2-13 19:10',
        eventAddress: '长沙市芙蓉区远大二路208号12栋208',
        number: 3
      },{
        eventCode: '1111111111',
        eventType: '自然灾害类',
        eventLevel: 'Ⅰ级（特大）',
        assignTime: '2018-2-13 19:10',
        eventAddress: '长沙市芙蓉区远大二路208号12栋208',
        number: 0
      },{
        eventCode: '1111111111',
        eventType: '自然灾害类',
        eventLevel: 'Ⅰ级（特大）',
        assignTime: '2018-2-13 19:10',
        eventAddress: '长沙市芙蓉区远大二路208号12栋208',
        number: 4
      },{
        eventCode: '1111111111',
        eventType: '自然灾害类',
        eventLevel: 'Ⅰ级（特大）',
        assignTime: '2018-2-13 19:10',
        eventAddress: '长沙市芙蓉区远大二路208号12栋208',
        number: 0
      }],
      eventLevelList: [],
      eventTypeList: [],
      pagination: { total: 0, pageSize: 10, pageNum: 1 }
    }
  },
  computed: {
  },
  mounted () {
    this.getEventLevel();
    this.getEventType();
  },
  methods: {
    skipLookEvent () { // 查看事件分布
    },
    skipCtcDetail () { // 跳到调度指挥页面
      this.$router.push({name: 'ctc-detail'});
    },
    onPageChange (page) {
      this.pagination.pageNum = page;
      this.getEventList();
    },
    onSizeChange (val) {
      this.pagination.pageNum = 1;
      this.pagination.pageSize = val;
      this.getEventList();
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
  .ctc-list {
    padding: 20px;
    .ctc-header {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      .look-event {
        color: #fff;
      }
    }
    .search-event {
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
  }
</style>
