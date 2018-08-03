<template>
  <div class="vis-bg-plate">
    <div class="bg-plate-bd">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>页面管理</el-breadcrumb-item>
        <el-breadcrumb-item ><span style="color:#0785FD;font-size:14px;">数据维护</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bg-plate-sf">
      <el-button type="primary" size="small" @click="dialogFormVisible = true" class="add-plate-btn" icon="el-icon-plus">添加版块</el-button>
    </div>
    <div class="bg-plate-tb">
      <el-table :data="plateList"  highlight-current-row style="width: 100%;">
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="plateName" label="预览" min-width="180"></el-table-column>
        <el-table-column prop="serialNumber" label="编码" min-width="100">
          <template slot-scope="scope">
            {{scope.row.serialNumber | filterPagePosition}}
          </template>
        </el-table-column>
        <el-table-column prop="" label="基础数据项数" min-width="180"></el-table-column>
        <el-table-column prop="pageName" label="图表数据主项上限数" min-width="200"></el-table-column>
        <el-table-column prop="" label="图表数据子项上限数" min-width="200"></el-table-column>
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
    <!-- 新增/修改样式  -->
    <el-dialog
      title="新增/修改版块"
      :visible.sync="dialogFormVisible"
      width="729px">
        <el-form :model="form">
          <el-form-item label="编码" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择" style="width: 340px">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="缩略图链接" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off" style="width: 340px"></el-input>
          </el-form-item>
          <el-form-item label="注解图链接" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off" style="width: 340px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">完成</el-button>
        </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      plateList: [],
      pager: { total: 0, pageSize: 10, pageNum: 1 },
      // 定义对话框form表单
      dialogFormVisible: false,
      form: {
      },
      formLabelWidth: '120px'
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
  .vis-bg-plate {
    padding: 20px 20px 0 20px;
  }
  .bg-plate-bd {
    border-bottom: 1px solid #E3E3E3;
    padding: 2px 0 18px 2px;
  }
  .bg-plate-sf {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .bg-plate-tb {
    border: 1px solid #E3E3E3;
    padding-bottom: 20px;
    > .bg-plate-tbp {
      text-align: right;
      padding: 20px 20px 0 0;
    }
  }
</style>
