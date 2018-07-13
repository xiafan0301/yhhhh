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
          <el-select v-model="searchForm.dataTypeId" placeholder="选择数据" style="width: 160px;" @change="getValue">
            <el-option  v-for="(item, index) in pageList" :label="item.typeName" :value="item.dataTypeId" :key="'spl_' + index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" style="color:#0785FD;font-size:14px; border-color:#0785FD" size="mini" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
      <!--贫困村添加-->
      <el-button
        type="primary" size="small"
        class="add-plate-btn" icon="el-icon-plus"
        v-show="this.searchForm.dataTypeId == '4fce5edb-7092-4455-971b-6f8526d6a827'" @click="dialogFormVisible = true">添加</el-button>
      <el-button style="color:#0785FD;font-size:14px; border-color:#0785FD" size="mini" class="add-plate-btnf" >一键导入</el-button>
      <a style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns" v-if="this.searchForm.dataTypeId  == '4fce5edb-7092-4455-971b-6f8526d6a827'" href="http://10.16.3.40:8080/api/vis/mapServices/template/download/4fce5edb-7092-4455-971b-6f8526d6a827">模块下载</a>
      <a style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns" v-if="this.searchForm.dataTypeId  == 'e46c60f2-b1ea-46b7-9f83-51c51a5738b2'" href="http://10.16.3.40:8080/api/vis/mapServices/template/download/e46c60f2-b1ea-46b7-9f83-51c51a5738b2">模块下载</a>
    </div>
    <div class="bg-plate-tb">
      <router-view></router-view>
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
        {dataTypeId: '001', typeName: '选择数据'}
      ],
      searchForm: {
        dataTypeId: ''
      }
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
    getValue: function (scope) {
      console.log(scope)
    },
    // 点击事件
    query: function () {
      let scope = this.searchForm.dataTypeId;
      if (scope === '4fce5edb-7092-4455-971b-6f8526d6a827') {
        this.$router.push({name: 'poor-village'});
      } else if (scope === 'e46c60f2-b1ea-46b7-9f83-51c51a5738b2') {
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
    // 查询地图应用类型
    getPlateList () {
      this.axios.get('/vis/mapServices/dataTypes')
        .then(res => {
          this.pageList = res.data;
        })
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
      position: absolute; top: 26px; right: 20px;
      border: none;
      display: inline-block;
    }
  }
</style>
