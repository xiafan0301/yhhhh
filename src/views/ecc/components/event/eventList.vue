<template>
  <div class="ba-not">
    <div style="padding-bottom: 20px; border-bottom: 1px solid #eee; margin-bottom: 20px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>事件管理</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>消息管理</el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>
    <div class="clearfix" style="position: relative;">
      <el-form style="float: left;" :inline="true" class="demo-form-inline" size="small">
        <el-form-item>
          <el-date-picker type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="设备状态" style="width: 150px;">
            <el-option label="全部" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="设备状态" style="width: 150px;">
            <el-option label="全部" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select  placeholder="设备状态" style="width: 150px;">
            <el-option label="全部" :value="0"></el-option>
            <el-option label="可用" :value="1"></el-option>
            <el-option label="异常" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input placeholder='请输入提交者手机号或事件编号' style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon='el-icon-search'>查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table border style="width: 100%">
      <el-table-column label="事件编号"></el-table-column>
      <el-table-column label="报案人"></el-table-column>
      <el-table-column label="角色"></el-table-column>
      <el-table-column label="来源"></el-table-column>
      <el-table-column label="上报时间"></el-table-column>
      <el-table-column label="事件地点"></el-table-column>
      <el-table-column label="事件等级"></el-table-column>
      <el-table-column label="事件状态"></el-table-column>
      <el-table-column label="是否查看"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button>查看详请</el-button>
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
          :total="pagination.total"
        >
        </el-pagination>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
  .ba-not {
    padding: 20px;
  }
</style>
