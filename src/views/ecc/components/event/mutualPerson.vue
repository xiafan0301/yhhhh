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
      <el-form style="float: left;width:100%" :inline="true" :model='selectForm' class="demo-form-inline" size="small">
        <el-form-item style="width: 280px;">
          <el-date-picker
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item style="width: 110px;">
          <el-select placeholder="事件状态" style="width: 100%;">
            <el-option label="全部状态" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class='selectBtn'>查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table style="width: 100%" class='person-table' :data='personDataList'>
      <el-table-column type='index' label="序号" align='center' width='60px'></el-table-column>
      <el-table-column prop='reportTime' label="上报时间" align='center' width='150px'></el-table-column>
      <el-table-column prop='eventAddress' label="事件地点" align='center' width='150px' show-overflow-tooltip></el-table-column>
      <el-table-column prop='eventSituation' label="事件情况" align='center' width='400px' show-overflow-tooltip></el-table-column>
      <el-table-column prop='eventStatusName' label="事件状态" align='center' width='80px'></el-table-column>
      <el-table-column prop='commentNumbers' label="评论数量" align='center' width='80px'></el-table-column>
      <el-table-column label="操作" align='center'>
        <template slot-scope="scope">
          <el-button type='text' style='color:#0785FD;font-size:14px' @click='skipPersonDetail'>查看</el-button>
          <i style="display: inline-block; width:1px;height:11px;background:#0785FD;margin: 0 3px 0 3px"></i>
          <el-button type='text' style='color:#0785FD;font-size:14px' @click="skipAddMsg('modify')">修改</el-button>
          <i style="display: inline-block; width:1px;height:11px;background:#0785FD;margin: 0 3px 0 3px"></i>
          <el-button type='text' style='color:#0785FD;font-size:14px' @click='deleteVisiable = true'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div is='pagination'></div> -->
    <el-dialog
      title="操作提示"
      :visible.sync="deleteVisiable"
      width="480px"
      height='285px'
      center>
      <span style='text-align:center'>删除后APP端将无法再查看，是否确认删除?</span>
      <span slot="footer" class="dialog-footer">
        <el-button class='sureBtn' @click="deleteVisiable = false">确定删除</el-button>
        <el-button class='noSureBtn' @click="deleteVisiable = false">暂不删除</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import pagination from '@/components/common/pagination.vue';
export default {
  components: {pagination},
  data () {
    return {
      deleteVisiable: false,
      selectForm: {
        beginDate: '',
        endDate: ''
      },
      personDataList: [{
        reportTime: '2018-9-13 12:20',
        eventAddress: '长沙市芙蓉区远大二路208号',
        eventSituation: '园区门口有电动车起火，园区门口有电动车起火，园区门口有电动车起火...',
        eventStatusName: '处理中',
        commentNumbers: 111
      }]
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    skipAddMsg (status) { // 跳转到添加消息页面
      this.$router.push({name: 'add-message', params: {status: status}});
    },
    skipPersonDetail () { // 查看
      this.$router.push({name: 'mutual-detail'});
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
    /deep/ .el-dialog__header {
      background: #F0F0F0 !important;
      text-align: left !important;
      color: #555555;
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
  }
</style>
