<template>
  <div class="vis-bg-plate">
    <div class="bg-plate-bd">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>版块管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bg-plate-sf">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="small">
        <el-form-item label="刷选条件">
          <el-select @change="pageChange" v-model="searchForm.pageId" placeholder="选择页面" style="width: 200px;">
            <el-option  v-for="(item, index) in pageList" :label="item.pageName" :value="item.pageId" :key="'spl_' + index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click.native="searchFormSubmit" type="primary">查询</el-button>
          <el-button @click.native="searchFormReset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="small" @click.native="showEditDialog(true)" class="add-plate-btn">添加板块</el-button>
    </div>
    <div class="bg-plate-tb">
      <el-table :data="plateList"  highlight-current-row style="width: 100%;">
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="plateName" label="版块名称" min-width="180" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="serialNumber" label="区域" min-width="100">
          <template slot-scope="scope">
            {{scope.row.serialNumber | filterPagePosition}}
          </template>
        </el-table-column>
        <el-table-column prop="configCode" label="样式编码" min-width="180"></el-table-column>
        <el-table-column prop="pageName" label="所属页面" min-width="120" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="" label="展示状态" min-width="100">
          <template slot-scope="scope">
            <el-switch
              @change="showTypeChange(scope)"
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
    <!-- 新增/修改板块 dialog :close-on-click-modal="false" -->
    <el-dialog
      title="新增/修改板块"
      :visible.sync="editDialogVisible"
      width="800px">
      <div>
        <el-steps :space="200" :active="1" finish-status="success" align-center>
          <el-step title="已完成"></el-step>
          <el-step title="进行中"></el-step>
          <el-step title="步骤 3"></el-step>
        </el-steps>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import store from '../../../../store/store.js';
export default {
  data () {
    return {
      plateList: [],
      pager: { total: 0, pageSize: 10, pageNum: 1 },
      pageList: [],
      searchForm: {
        pageId: ''
      },
      editDialogVisible: false
    }
  },
  computed: {
  },
  created () {
    this.getPageList();
  },
  mounted () {
    this.searchForm.pageId = this.$route.query.pageId;
    this.getPlateList();
  },
  methods: {
    // 获取所有的页面
    getPageList () {
      let params = {
        // orderBy: '',
        // order: '',
        // where: '',
        pageNum: 1,
        pageSize: 1000
      };
      this.axios.get('/pageServices/pages', {params})
        .then((res) => {
          this.pageList = res.data.list;
        })
        .catch(() => {});
    },

    pageChange (val) {
      // console.log(val)
      this.$nextTick(() => {
        this.pager.pageNum = 1;
        this.getPlateList();
      });
    },
    searchFormSubmit () {
      this.pager.pageNum = 1;
      this.getPlateList();
    },
    searchFormReset () {
      this.pager.pageNum = 1;
      this.searchForm.pageId = '';
      this.getPlateList();
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
      let params = {
        'where.pageId': this.searchForm.pageId,
        pageNum: this.pager.pageNum,
        pageSize: this.pager.pageSize
      };
      this.axios.get('/plateServices/plates', {params})
        .then((res) => {
          this.pager.total = res.data.total;
          this.plateList = res.data.list;
          console.log(res)
        })
        .catch(() => {});
    },
    showEditDialog (flag) {
      this.$store.commit('setProgressIndex', {progressIndex: 1});
      this.$router.push({name: 'plate-edit', params: {plateId: '0'}});
    },
    showTypeChange (item) {
      console.log(item)
      // active 已经变了
    }
  }
}
/*
* serialNumber
* 序号，11：左上，12：左中，13：左下，21：右上，22：右中，23：右下，
* 31：中间地图第一个tab，32：中间地图第二tab，中间地图其它类推
*
* plateType
* 板块类型，1：为图形板块默认，2：地图板块
* */
function getTestData () {
  return [
    {plateId: '1', plateName: '贫困人口概述', pageId: '002', pageName: '脱贫攻坚', serialNumber: 11, plateType: 1, jumpPageId: '', active: true, remark: '2017年数据'},
    {plateId: '2', plateName: '人口分布', pageId: '003', pageName: '脱贫攻坚', serialNumber: 32, plateType: 1, jumpPageId: '', active: false, remark: '2017年数据'}
  ];
}
</script>
<style lang="scss" scoped>
  .vis-bg-plate {
    padding: 20px 20px 20px 20px;
    height: 100%;
    overflow: auto;
  }
  .bg-plate-bd {
    border-bottom: 1px solid #E3E3E3;
    padding: 2px 0 18px 2px;
  }
  .bg-plate-sf {
    padding-top: 20px;
    position: relative;
    .add-plate-btn {
      position: absolute; top: 23px; right: 0;
    }
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
