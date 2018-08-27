<template>
  <div class="ba-not">
    <div style="padding-bottom: 20px; position: relative">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>消息管理</el-breadcrumb-item>
        <el-breadcrumb-item>公告管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="position: absolute; top: -10px; right: 0;">
        <el-button type="primary" size="small"  @click.native="showEditDialog('atgment')" icon="el-icon-plus">发布</el-button>
      </div>
    </div>
    <div class="clearfix" style="position: relative; background-color: #FFFFFF; margin-bottom: 16px">
      <el-form style="float: left; margin-left: 20px; padding-top: 20px" :inline="true" :model="searchForm" class="demo-form-inline" size="small">
        <el-form-item >
          <el-select v-model="searchForm.deviceStatus" style="width: 220px;" placeholder="时间段">
            <el-option label="全部" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-select v-model="searchForm.deviceStatus" style="width: 140px;" placeholder="发布状态">
            <el-option label="待发送" :value="1"></el-option>
            <el-option label="发送成功" :value="2"></el-option>
            <el-option label="已撤销" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-select v-model="searchForm.deviceStatus" style="width: 140px;" placeholder="发布单位">
            <el-option label="联动单位A" :value="0"></el-option>
            <el-option label="联动单位B" :value="1"></el-option>
            <el-option label="联动单位C" :value="2"></el-option>
            <el-option label="应急指挥中心" :value="2"></el-option>
          </el-select>
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
      <el-table-column prop="emiMessage.title" label="主题" min-width="120">
      </el-table-column>
      <el-table-column prop="emiMessage.details" label="摘要" min-width="150"></el-table-column>
      <el-table-column prop="emiMessage.terminal" label="接收者" min-width="100">
        <template slot-scope="scope">
          <span style="color: #13ce66;" v-if="scope.row.emiMessage.terminal == 1">移动端</span>
          <span style="color: #ff4949;" v-else-if="scope.row.emiMessage.terminal == 2">PC端</span>
          <span style="color: #13ce66;" v-else-if ="scope.row.emiMessage.terminal == 3">APP端，Web端</span>
          <span style="color: #999;" v-else >不发送</span>
        </template>
      </el-table-column>
      <el-table-column prop="emiMessage.publishUser" label="发布用户" min-width="100">
      </el-table-column>
      <el-table-column prop="emiMessage.publishUser" label="发布单位" min-width="100">
      </el-table-column>
      <el-table-column prop="emiMessage.publishTime" label="发布时间" min-width="100"></el-table-column>
      <el-table-column prop="emiMessage.publishState" label="发布状态" min-width="100">
        <template slot-scope="scope">
          <span style="color: #13ce66;" v-if="scope.row.emiMessage.publishState == 1">待发送</span>
          <span style="color: #ff4949;" v-else-if="scope.row.emiMessage.publishState == 2">发送成功</span>
          <span style="color: #999;" v-else >已撤销</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="see()">查看</el-button>
          <el-button type="text"  @click="modify('modifyatgment',scope.row.emiMessage)">修改</el-button>
          <el-button @click="del(scope.row.emiMessage)" type="text" size="small">删除</el-button>
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
export default {
  data () {
    return {
      searchForm: {
        beginTime: null,
        endTime: null,
        publishState: 0,
        messageType: '39728bba-9b6f-11e8-8a14-3f814d634dc2',
        publishUnitId: '',
        receiverId: '',
        isReceive: '',
        publishTime: ''
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: []
    }
  },
  computed: {
  },
  created () {
    this.getTableData();
  },
  mounted () {
  },
  methods: {
    getTableData () {
      let params = {
        // 'where.beginTime': this.searchForm.beginTime,
        // 'where.endTime': this.searchForm.endTime,
        // 'where.publishState': this.searchForm.publishState,
        'where.messageType': this.searchForm.messageType,
        // 'where.publishUnitId': this.searchForm.publishUnitId,
        // 'where.receiverId': this.searchForm.receiverId,
        // 'where.isReceive': this.searchForm.isReceive,
        // 'where.publishTime': this.searchForm.publishTime,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      this.axios.get('A2/messageService/page?' + $.param(params))
        .then((res) => {
          console.log(res);
          this.tableData = res.data.list;
          this.total = res.data.total;
        })
        .catch(() => {
        });
    },
    edit () {
    },
    doSearch () {
    },
    del (scope) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (scope) {
          console.log(scope.messageId);
          const params = {
            messageId: scope.messageId
          };
          this.axios.delete('A2/messageService/' + scope.messageId, {params})
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
      // this.editDialogVisible = flag;
      this.$router.push({name: 'notice-release', query: {status: status}});
    },
    modify (status, scope) {
      this.$router.push({name: 'notice-modify', query: {status: status, messageId: scope.messageId}});
    },
    modifyxt () {
      this.visible2 = false;
      this.$router.push({name: 'notice-modify', query: {modify: false}, params: {plateId: '0'}});
    },
    see () {
      this.visible2 = false;
      this.$router.push({name: 'notice-see', query: {modify: true}, params: {plateId: '0'}});
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
  }
</style>
