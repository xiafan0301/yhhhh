<template>
  <div class="bg-plate-tb" >
    <!--人口分布表格-->
    <el-table :data="plateList"  highlight-current-row style="width: 100%;">
      <el-table-column type="index" width="100" label="序号"></el-table-column>
      <el-table-column prop="plateName" label="镇名" min-width="180"></el-table-column>
      <el-table-column prop="serialNumber" label="坐标" min-width="100">
        <template slot-scope="scope">
          {{scope.row.serialNumber | filterPagePosition}}
        </template>
      </el-table-column>
      <el-table-column prop="" label="样式编码" min-width="180"></el-table-column>
      <el-table-column prop="pageName" label="所属页面" min-width="120"></el-table-column>
      <el-table-column prop="" label="展示状态" min-width="100">
        <template slot-scope="scope">
          <el-switch
            @change="showTypeChange(scope.row)"
            v-model="scope.row.active">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="120">
        <template slot-scope="scope">
          <el-button type="text">修改</el-button>
          <!-- <el-button type="text" :disabled="scope.$index == 0">删除</el-button> -->
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="bg-plate-tbp">
      <el-pagination
        @size-change="pagerSizeChange"
        @current-change="pagerCurrChange"
        :current-page="pager.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pager.pageSize"
        layout="total, prev, pager, next, sizes, jumper"
        :total="pager.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      plateList: [],
      pager: { total: 0, pageSize: 10, pageNum: 1 },
      pageList: [
        {uid: '001', pageName: '首页'},
        {uid: '002', pageName: '脱贫攻坚'}
      ],
      searchForm: {
        pageId: ''
      },
      editDialogVisible: false
    }
  },
  computed: {
  },
  created () {
    this.getPlateList();
  },
  mounted () {
  },
  methods: {
    pageChange () {
    },
    searchFormSubmit () {
    },
    searchFormReset () {
    },
    pagerSizeChange (val) {
      this.pager.pageNum = 1;
      this.pager.pageSize = val;
      this.getPlateList();
    },
    pagerCurrChange (val) {
      this.pager.pageNum = val;
      this.getPlateList();
    },
    getPlateList () {
      setTimeout(() => {
        this.pager.total = 1;
        this.plateList = getTestData();
      }, 100);
    },
    showEditDialog (flag) {
      this.editDialogVisible = flag;
    },
    showTypeChange (item) {
      // console.log(item)
      // active 已经变了
    }
  }
}
function getTestData () {
  return [
    {plateId: '1', plateName: '贫困人口概述', pageId: '002', pageName: '脱贫攻坚', serialNumber: 11, plateType: 1, jumpPageId: '', active: true, remark: '2017年数据'},
    {plateId: '2', plateName: '人口分布', pageId: '003', pageName: '脱贫攻坚', serialNumber: 32, plateType: 1, jumpPageId: '', active: false, remark: '2017年数据'}
  ];
}
</script>
<style lang="scss" scoped>
  .bg-plate-tb {
    border: 1px solid #E3E3E3;
    padding-bottom: 20px;
    > .bg-plate-tbp {
      text-align: right;
      padding: 20px 20px 0 0;
    }
  }
</style>
