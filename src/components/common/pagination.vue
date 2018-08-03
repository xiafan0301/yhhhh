<template>
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
</template>
<script>
  export default {
    data () {
      return {
        pagination: {
          total : 0,
          pageNum: 1,
          pageSize: 10,
        }
      }
    }
  }
</script>