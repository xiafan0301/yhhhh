<template>
  <div>
    <!-- 面包屑 -->
    <div class="e_stat_bd">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>事件管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>统计分析</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 查询条件 -->
    <div class="e_stat_s">
      <el-form :inline="true" :model="searchForm" size="small">
        <el-form-item>
          <el-date-picker
            class="e_stat_dp"
            v-model="searchForm.time"
            type="daterange"
            align="left"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="e_stat_content">
      <!-- 综合统计 -->
      <ul class="e_stat_zt">
        <li><div>事件等级分析</div></li>
        <li><div>事件类型分析</div></li>
        <li><div>事件数量趋势</div></li>
        <li><div>事件性质统计</div></li>
      </ul>
      <!-- 统计图表 -->
      <ul class="e_stat_tt">
        <li><div>事件等级分析</div></li>
        <li><div>事件类型分析</div></li>
        <li><div>事件数量趋势</div></li>
        <li><div>事件性质统计</div></li>
      </ul>
      <!-- 地图统计 -->
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchForm: {
        time: [new Date(), new Date()]
      },
      pickerOptions2: {
        shortcuts: [
        {
          text: '今天',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        },{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一年',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    }
  },
  methods: {
    searchSubmit () {
    }
  }
}
</script>
<style lang="scss" scoped>
  .e_stat_bd {
    padding: 20px;
  }
  .e_stat_s {
    padding: 20px 0 0 20px;
    margin: 0 20px 0 20px;
    background-color: #fff;
  }
  .e_stat_content {
  }
  .e_stat_zt {
    padding: 10px 10px 0 10px;
    overflow: hidden;
    > li {
      width: 25%;
      float: left;
      padding: 10px;
      > div {
        background-color: #fff;
      }
    }
  }
  .e_stat_tt {
    padding: 0 10px 0 10px;
    overflow: hidden;
    > li {
      width: 25%;
      float: left;
      padding: 10px;
      > div {
        background-color: #fff;
      }
    }
  }
</style>
