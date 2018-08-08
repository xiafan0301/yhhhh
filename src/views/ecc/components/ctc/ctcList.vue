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
            v-model='selectForm.reportTimeStart'
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
        <el-form-item style="width: 110px;">
          <el-select placeholder="事件等级" style="width: 100%;">
            <el-option label="全部等级" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class='selectBtn'>查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table border style="width: 100%">
      <el-table-column label="事件编号" align='center'></el-table-column>
      <el-table-column label="事件类型" align='center'></el-table-column>
      <el-table-column label="事件等级" align='center'></el-table-column>
      <el-table-column label="受理时间" align='center'></el-table-column>
      <el-table-column label="事件地点" align='center'></el-table-column>
      <el-table-column label="新反馈数" align='center'></el-table-column>
      <el-table-column label="操作" align='center'>
        <template slot-scope="scope">
          <el-button>查看</el-button>
          <el-button>调度/再次调度</el-button>
          <el-button>结束</el-button>
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
        beginDate: '',
        endDate: ''
      }
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    // skipAddEvent () {
    //   this.$router.push({name: 'add-event'});
    // }
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
  }
  
</style>
