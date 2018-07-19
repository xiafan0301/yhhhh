<template>
  <div class="vis-bg-plate">
    <div class="bg-plate-bd">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>页面管理</el-breadcrumb-item>
        <el-breadcrumb-item ><span style="color:#0785FD;font-size:14px;">数据维护</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bg-plate-sf">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="small">
        <el-form-item label="地图组件">
          <el-select v-model="searchForm.pageId" placeholder="选择数据" style="width: 160px;" @change="getValue">
            <el-option  v-for="(item, index) in pageList" :label="item.pageName" :value="item.uid" :key="'spl_' + index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" style="color:#0785FD;font-size:14px; border-color:#0785FD" size="mini" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="small" @click.native="showEditDialog(true)" class="add-plate-btn" icon="el-icon-plus">添加</el-button>
      <el-button style="color:#0785FD;font-size:14px; border-color:#0785FD" size="mini" class="add-plate-btnf">一键导入</el-button>
      <el-button style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns">模块下载</el-button>
    </div>
    <div class="bg-plate-tb">
      <router-view></router-view>
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
export default {
  data () {
    return {
      plateList: [],
      pager: { total: 0, pageSize: 10, pageNum: 1 },
      pageList: [
        {uid: '001', pageName: '人口分布'},
        {uid: '002', pageName: '贫困村'},
        {uid: '003', pageName: '选择数据'}
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
    // 点击事件
    query: function () {
      let scope = this.searchForm.pageId;
      if (scope === '002') {
        this.$router.push({name: 'poor-village'});
      } else if (scope === '001') {
        this.$router.push({name: 'population-distribution'});
      }
    },
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
  .vis-bg-plate {
    padding: 20px 20px 0 20px;
  }
  .bg-plate-bd {
    border-bottom: 1px solid #E3E3E3;
    padding: 2px 0 18px 2px;
  }
  .bg-plate-sf {
    padding-top: 20px;
    position: relative;
    .add-plate-btn {
      position: absolute; top: 23px; right: 195px;
    }
    .add-plate-btnf{
      position: absolute; top: 23px; right: 95px
    }
    .add-plate-btns{
      position: absolute; top: 23px; right: 9px;
      border: none;
    }
  }
</style>
