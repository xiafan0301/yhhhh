<template>
  <div class="ba-not">
    <div style="padding-bottom: 20px; border-bottom: 1px solid #eee; margin-bottom: 20px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>事件管理</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>消息管理</el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>
    <div class="clearfix" style="position: relative;width: 100%">
      <el-form style="float: left;width:100%" :inline="true" :model='selectForm' class="demo-form-inline" size="small">
        <el-form-item style="width: 140px;">
          <el-date-picker v-model='beginDate' type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item style="width: 140px;">
          <el-date-picker v-model='endDate' type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
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
        <el-form-item style="width: 110px;">
          <el-select  placeholder="事件来源" style="width: 100%;">
            <el-option label="全部来源" :value="0"></el-option>
            <el-option label="可用" :value="1"></el-option>
            <el-option label="异常" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 220px;">
          <el-input placeholder='请输入提交者手机号或事件编号' style='width:110%'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon='el-icon-search' class='selectBtn'>查询</el-button>
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
    <div is='pagination'></div>
  </div>
</template>
<script>
import pagination from '@/components/common/pagination.vue';
export default {
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
  }
}
</script>
<style lang="scss" scoped>
  .ba-not {
    padding: 20px;
  }
  .selectBtn {
    background: -webkit-linear-gradient(#07BAFD, #0785FD); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#07BAFD, #0785FD); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#07BAFD, #0785FD); /* Firefox 3.6 - 15 */
    background: linear-gradient(#07BAFD, #0785FD); /* 标准的语法 */
  }
</style>
