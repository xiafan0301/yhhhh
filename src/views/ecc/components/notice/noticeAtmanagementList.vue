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
      border
      style="width: 100%">
      <!--<el-table-column prop="cameraId" label="摄像头ID" width="150"></el-table-column>-->
      <el-table-column  label="序号" width="50"  type="index"></el-table-column>
      <el-table-column prop="emiMessage.title" label="主题" min-width="100">
      </el-table-column>
      <el-table-column prop="emiMessage.details" label="摘要" min-width="140"></el-table-column>
      <el-table-column prop="receiveRelations" label="接收者" min-width="100"></el-table-column>
      <el-table-column prop="publishUser" label="发布用户" min-width="100">
      </el-table-column>
      <el-table-column prop="publishUser" label="发布单位" min-width="100">
      </el-table-column>
      <el-table-column prop="publishTime" label="发布时间" min-width="120"></el-table-column>
      <el-table-column prop="publishState" label="发布状态" min-width="120"></el-table-column>
      <el-table-column
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="see()">查看</el-button>
          <el-button type="text"  @click="modify('modifyatgment')">修改</el-button>
          <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
          this.pagination.total = res.data.total;
        })
        .catch(() => {
        });
    },
    edit () {
    },
    doSearch () {
    },
    showEditDialog (status) {
      // this.editDialogVisible = flag;
      this.$router.push({name: 'notice-release', query: {status: status}});
    },
    modify (status) {
      this.$router.push({name: 'notice-modify', query: {status: status}});
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
  }
</style>
