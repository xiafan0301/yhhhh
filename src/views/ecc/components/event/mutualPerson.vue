<template>
  <div class="ba-not">
    <div style="padding-bottom: 20px; border-bottom: 1px solid #eee; margin-bottom: 20px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>事件管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="clearfix" style="position: relative;width: 100%">
      <el-form style="float: left;width:100%" :inline="true" :model='selectForm' class="demo-form-inline" size="small">
        <el-form-item style="width: 140px;">
          <el-date-picker v-model='beginDate' type="date" placeholder="开始日期" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item style="width: 140px;">
          <el-date-picker v-model='endDate' type="date" placeholder="结束日期" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item style="width: 110px;">
          <el-select placeholder="事件状态" style="width: 100%;">
            <el-option label="全部状态" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon='el-icon-search' class='selectBtn'>查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button type='primary' @click='skipAddEvent'>添加消息</el-button>
    </div>
    <el-table border style="width: 100%">
      <el-table-column label="序号"></el-table-column>
      <el-table-column label="上报时间"></el-table-column>
      <el-table-column label="事件地点"></el-table-column>
      <el-table-column label="事件情况"></el-table-column>
      <el-table-column label="事件数量"></el-table-column>
      <el-table-column label="评论数量"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button>查看</el-button>
          <el-button>修改</el-button>
          <el-button>删除</el-button>
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
    skipAddEvent () {
      this.$router.push({name: 'add-event'});
    }
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
