<template>
  <div class="ba-not">
    <div style="padding-bottom: 20px; position: relative">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>应急库</el-breadcrumb-item>
        <el-breadcrumb-item>预案管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="position: absolute; top: -10px; right: 0;">
        <el-button type="primary" size="small"  @click.native="showEditDialog('add')" icon="el-icon-plus">添加预案</el-button>
      </div>
    </div>
    <div class="clearfix" style="position: relative; background-color: #FFFFFF; margin-bottom: 16px">
      <el-form style="float: left; margin-left: 20px; padding-top: 20px" :inline="true" :model="searchForm" class="demo-form-inline" size="small">
        <el-form-item >
          <el-select v-model="searchForm.planType" style="width: 160px;" placeholder="预案类型">
            <el-option
              v-for="item in eventTypeList"
              :key="item.dictId"
              :label="item.dictContent"
              :value="item.dictId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-select v-model="searchForm.planLevel" style="width: 160px;" placeholder="适用事件等级">
            <el-option
              v-for="item in eventLevelList"
              :key="item.dictId"
              :label="item.dictContent"
              :value="item.dictId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-input v-model="searchForm.planName" placeholder="搜索预案名称..." style="width: 220px" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch">查询</el-button>
          <el-button @click.native="searchFormReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <!--<el-table-column prop="cameraId" label="摄像头ID" width="150"></el-table-column>-->
      <el-table-column  label="序号" width="80"  type="index"></el-table-column>
      <el-table-column prop="planName" label="预案名称"  :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="eventTypeName" label="预案类型"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="levelNameList" label="适用事件等级"  :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-for="(item, index)  in scope.row.levelNameList" :key="'fawe' + index" v-if="item">{{item}} </span>
        </template>
      </el-table-column>
      <el-table-column prop="createRealName" label="创建用户"  :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{(scope.row.createTime).slice(0,16)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="130"
        class="ctc-class"
      >
        <template slot-scope="scope">
          <i class="icon-chakan- icon-hover" @click="see(scope.row)" title="查看"></i>
          <i class="icon-xiugai-1 icon-hover" @click="modify('modify', scope.row)" title="编辑"></i>
          <i class="icon-shanchu- icon-hover" @click="del(scope.row)" title="删除"></i>
          <!-- <img title="查看" src="../../../../assets/img/temp/select.png"  @click="see(scope.row)" />
          <img title="编辑" src="../../../../assets/img/temp/edit.png" @click="modify('modify', scope.row)" />
          <img title="删除" src="../../../../assets/img/temp/delete.png" @click="del(scope.row)" /> -->
          <!--<el-button size="mini" type="text" @click="see(scope.row)">查看</el-button>-->
          <!--<el-button type="text"  @click="modify('modify', scope.row)">修改</el-button>-->
          <!--<el-button @click="del(scope.row)" type="text" size="small">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="bg-plan-tbp">
      <el-pagination
        background
        @size-change="pagerSizeChange"
        @current-change="pagerCurrChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, prev, pager, next, sizes, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {dictType} from '@/config/data.js';
export default {
  data () {
    return {
      searchForm: {
        planType: '',
        planLevel: '',
        planName: ''
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      eventLevelList: [{dictId: '', dictContent: ''}],
      eventTypeList: []
    }
  },
  computed: {
  },
  mounted () {
  },
  created () {
    this.getTableData();
    this.getEventType();
    this.getEventLevel();
  },
  methods: {
    getTableData () {
      let params = {
        // 'where.beginTime': this.searchForm.beginTime,
        // 'where.endTime': this.searchForm.endTime,
        // 'where.publishState': this.searchForm.publishState,
        'where.planType': this.searchForm.planType,
        'where.planLevel': this.searchForm.planLevel,
        'where.planName': this.searchForm.planName,
        // 'where.isReceive': this.searchForm.isReceive,
        // 'where.publishTime': this.searchForm.publishTime,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      this.axios.get('A2/planServices/plans?' + $.param(params))
        .then((res) => {
          console.log(res);
          this.tableData = res.data.list;
          this.total = res.data.total;
        })
        .catch(() => {
        });
    },
    getEventType () {
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.eventTypeId)
        .then((res) => {
          this.eventTypeList = res.data;
        })
    },
    getEventLevel () {
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.eventLevelId)
        .then((res) => {
          this.eventLevelList = res.data
        })
    },
    del (scope) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (scope) {
          const params = {
            planId: scope.planId
          };
          this.axios.delete('A2/planServices/plans/' + scope.planId)
            .then((res) => {
              if (res) {
                this.getTableData();
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              } else {
                this.$message.error('删除失败');
              }
            })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    edit () {
    },
    doSearch () {
      this.getTableData();
    },
    searchFormReset () {
      this.pageNum = 1;
      this.searchForm.planType = '';
      this.searchForm.planLevel = '';
      this.searchForm.planName = '';
      this.getTableData();
    },
    // 分页
    pagerSizeChange (val) {
      this.pageSize = val;
      this.pageNum = 1;
      this.getTableData();
    },
    pagerCurrChange (val) {
      this.pageNum = val;
      this.getTableData();
    },
    showEditDialog (status) {
      this.$router.push({name: 'emergency-addPlan', query: {status: status}});
    },
    modify (status, scope) {
      this.$router.push({name: 'emergency-addPlan', query: {status: status, planId: scope.planId}});
    },
    see (scope) {
      this.$router.push({name: 'emergency-seePlan', query: {planId: scope.planId}});
    }
  }
}
</script>
<style lang="scss" scoped>
  .ba-not {
    padding: 20px;
    background-color: #F0F3F4;
    height: 100%;
    .bg-plan-tbp{
      padding: 20px 0;
      text-align: center;
    }
    .ctc-class {
      i {
        margin: 0 10px;
      }
    }
    .icon-hover {
      font-size: 30px;
      color: #BBBBBB;
    }
    .icon-hover:hover {
      color: #0785FD;
    }
  }
</style>
