<template>
  <div class="ba-not">
    <div style="padding-bottom: 20px; position: relative">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>模拟演练</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>模拟发布公告</span></el-breadcrumb-item>
      </el-breadcrumb>
      <div style="position: absolute; top: -10px; right: 0;">
        <el-button type="primary" size="small" v-show="resouceData && resourceBtn[resouceData.linckDirrReckNotice]" @click.native="showEditDialog('atgment')" class='selectBtn btnClass'>发布</el-button>
      </div>
    </div>
    <div class="clearfix" style="position: relative; background-color: #FFFFFF; margin-bottom: 16px">
      <el-form style="float: left; margin-left: 20px; padding-top: 20px" :inline="true" :model="searchForm" class="demo-form-inline" size="small">
        <el-form-item style="width: 250px;">
          <el-date-picker
            v-model='searchForm.publishTime'
            type="daterange"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 250px;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item >
          <el-select v-model="searchForm.publishUnitId" style="width: 140px;" placeholder="发布单位">
            <el-option label="全部发布单位" :value='null'></el-option>
            <el-option
              v-for="item in DepartmentList"
              :key="item.uid"
              :label="item.organName"
              :value="item.uid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch" class='selectBtn'>查询</el-button>
          <el-button @click.native="searchFormReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      class="notice-table"
    >
      <el-table-column fixed label="序号" width="50"  type="index"></el-table-column>
      <el-table-column prop="emiMessage.title" label="主题"  align="center"  :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="emiMessage.details" label="摘要" min-width="150px" align="center" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="emiMessage.terminal" label="接收者"  align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <div v-for="(ite, inde) in scope.row.receiveRelations" :key="inde" v-if="inde < scope.row.receiveRelations[scope.row.receiveRelations.length - 1].allgroup">{{ite.receiveUserName}}</div>
          <p v-if="scope.row.receiveRelations[scope.row.receiveRelations.length - 1].isShowAllGroup && scope.row.receiveRelations.length > 4" class="expand" @click="onOpenAll(scope.row)">展开全部<i class="el-icon-arrow-down"></i></p>
          <p v-if="!scope.row.receiveRelations[scope.row.receiveRelations.length - 1].isShowAllGroup && scope.row.receiveRelations.length > 4" class="expand" @click="onCloseAll(scope.row)">收起<i class="el-icon-arrow-up"></i></p>
        </template>
      </el-table-column>
      <el-table-column prop="emiMessage.publishUserName" label="发布用户"  align="center">
      </el-table-column>
      <el-table-column prop="emiMessage.publishUnitName" label="发布单位"  align="center" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="emiMessage.publishTime" label="发布时间"  align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column
        label="操作"
        width="100" align="center">
        <template slot-scope="scope">
          <i class="icon-chakan- icon-hover" @click="see(scope.row.emiMessage)" title="查看"></i>
          <!--<i class="icon-xiugai-1 icon-hover" v-show="resouceData && resourceBtn[resouceData.modifyNoticeS]" title="编辑" @click="modify('modifyatgment',scope.row.emiMessage)" v-if="scope.row.emiMessage.publishState === 3"></i>-->
          <!--<i class="icon-shanchu- icon-hover" v-show="resouceData && resourceBtn[resouceData.delNoticeS]" title="删除" @click="del(scope.row.emiMessage)" v-if="scope.row.emiMessage.publishState === 3"></i>-->
          <!--<i class="icon-chexiao- icon-hover" v-show="resouceData && resourceBtn[resouceData.revokeNoticeS]" title="撤消" @click="Revoke(scope.row.emiMessage)" v-if="scope.row.emiMessage.publishState === 1" style="margin-left: 5px"></i>-->
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
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      title="操作提示"
      :visible.sync="deleteVisiable"
      width="480px"
      height='285px'
      center>
      <span style='text-align:center'>是否确认删除?</span>
      <span slot="footer" class="dialog-footer">
        <el-button class='sureBtn' @click="deletEvent">确定删除</el-button>
        <el-button class='noSureBtn' @click="deleteVisiable = false">暂不删除</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {formatDate} from '@/utils/method.js';
import {resouceData} from '@/config/data.js';
import {getCookie} from '@/utils/util.js';
export default {
  data () {
    return {
      resourceBtn: {},
      resouceData: resouceData,
      searchForm: {
        publishState: '',
        messageType: '39728bba-9b6f-11e8-8a14-3f814d634dc7',
        publishUnitId: null,
        receiverId: null,
        isReceive: '',
        publishTime: []
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      DepartmentList: [],
      deleteVisiable: false,
      messageId: ''
    }
  },
  created () {
    this.resourceBtn = JSON.parse(sessionStorage.getItem('resourcebtn'));
    this.getDepartmentList();
  },
  mounted () {
    this.getOneMonth();
    this.getTableData();
  },
  methods: {
    getTableData () {
      let params = {
        'where.beginTime': this.searchForm.publishTime[0],
        'where.endTime': this.searchForm.publishTime[1],
        'where.publishState': this.searchForm.publishState,
        'where.messageType': this.searchForm.messageType,
        // 'where.publishUnitId': this.searchForm.publishUnitId,
        // 'where.receiverId': this.searchForm.receiverId,
        // 'where.isReceive': this.searchForm.isReceive,
        // 'where.publishTime': this.searchForm.publishTime,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      params['where.owner'] = getCookie('cookieDepartmentId')
      if (this.searchForm.publishUnitId) {
        params['where.publishUnitId'] = this.searchForm.publishUnitId
      }
      this.axios.get('A2/messageService/page?' + $.param(params))
        .then((res) => {
          res.data.list.map((item) => {
            item.receiveRelations.map((ite) => {
              this.DepartmentList.map((aa) => {
                if (ite.receiveUser === aa.uid) {
                  ite.receiveUserName = aa.organName
                }
              })
            })
          })
          res.data.list.forEach(obj => {
            if (obj.receiveRelations) {
              obj.receiveRelations[obj.receiveRelations.length] = {
                allgroup: 3,
                isShowAllGroup: true
              }
            }
          });
          this.tableData = res.data.list;
          this.total = res.data.total;
          console.log(res);
        })
        .catch(() => {
        });
    },
    onOpenAll (obj) {
      obj.receiveRelations[obj.receiveRelations.length - 1].allgroup = 99999;
      obj.receiveRelations[obj.receiveRelations.length - 1].isShowAllGroup = false;
    },
    onCloseAll (obj) {
      obj.receiveRelations[obj.receiveRelations.length - 1].allgroup = 3;
      obj.receiveRelations[obj.receiveRelations.length - 1].isShowAllGroup = true;
    },
    getDepartmentList () {
      let params = {
        pageSize: 99999
      }
      this.axios.get('A3/authServices/organInfos', {params})
        .then((res) => {
          if (res && res.data.list) {
            console.log(res)
            this.DepartmentList = res.data.list
          }
        })
        .catch(() => {})
    },
    edit () {
    },
    doSearch () {
      this.searchForm.publishTime[0] = this.searchForm.publishTime[0].concat(' ').concat('00:00:00')
      this.searchForm.publishTime[1] = this.searchForm.publishTime[1].concat(' ').concat('23:59:59')
      if (this.searchForm.publishTime[0].length > 19) {
        this.searchForm.publishTime[0] = this.searchForm.publishTime[0].slice(0, 19)
        this.searchForm.publishTime[1] = this.searchForm.publishTime[1].slice(0, 19)
      }
      this.pageNum = 1;
      this.getTableData();
    },
    Revoke (scope) {
      let params = {
        messageId: scope.messageId,
        publishState: 3
      };
      this.axios.put('A2/messageService/update', params)
        .then((res) => {
          if (res && res.data) {
            this.$message.success('撤销成功');
            this.getTableData();
          } else {
            this.$message.error('撤销失败');
          }
        })
        .catch(() => {})
    },
    searchFormReset () {
      this.searchForm.publishTime = [];
      this.searchForm.publishState = '';
      this.searchForm.publishUnitId = null;
      this.getOneMonth();
      this.pageNum = 1;
      this.getTableData();
    },
    deletEvent () {
      const params = {
        messageId: this.messageId
      };
      this.axios.delete('A2/messageService/' + this.messageId, {params})
        .then((res) => {
          if (res) {
            this.getTableData();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.deleteVisiable = false
          }
        })
    },
    del (scope) {
      console.log(scope.messageId)
      this.messageId = scope.messageId
      this.deleteVisiable = true
    },
    getOneMonth () { // 设置默认一个月
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      const startDate = formatDate(start, 'yyyy-MM-dd');
      const endDate = formatDate(end, 'yyyy-MM-dd');
      this.searchForm.publishTime.push(startDate);
      this.searchForm.publishTime.push(endDate);
      this.searchForm.publishTime[0] = this.searchForm.publishTime[0].concat(' ').concat('00:00:00')
      this.searchForm.publishTime[1] = this.searchForm.publishTime[1].concat(' ').concat('23:59:59')
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
      this.$router.push({name: 'link-realse-notice', query: {status: status}});
    },
    modify (status, scope) {
      this.$router.push({name: 'notice-modify', query: {status: status, messageId: scope.messageId}});
    },
    see (scope) {
      const status = '查看公告';
      this.$router.push({name: 'link-see-notice', query: {status: status, messageId: scope.messageId, publishState: scope.publishState}});
    }
  }
}
</script>
<style lang="scss" scoped>
  .ba-not {
    padding: 20px;
    background-color: #F0F3F4;
    height: 100%;
    .btnClass {
      width: 100px;
    }
    .selectBtn {
      background-color: #0785FD;
    }
    .bg-plan-tbp{
      padding: 20px 0;
      text-align: center;
    }
    .el-date-editor /deep/.el-range-separator{
      width: 15%!important;
    }
    .el-table {
      >thead th {
        color: #555555 !important;
      }
    }
    /deep/ .el-table thead th {
      background-color: #FAFAFA !important;
    }
    /deep/ .hover-row>td {
      background-color: #E6F7FF !important;
    }
    .notice-table {
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
    /deep/ .el-dialog__header {
      background: #F0F0F0 !important;
      text-align: left !important;
      color: #555555;
      font-weight: bold;
      font-size: 16px;
    }
    /deep/  .el-dialog--center .el-dialog__body {
      text-align: center !important;
    }
    .sureBtn {
      background:#0785FD;
      height:35px;
      color: #fff;
      line-height: 10px;
    }
    .noSureBtn {
      border-color:#e5e5e5;
      height:35px;
      line-height: 10px;
      color:#666666;
    }
    .expand {
      width:86px; height:26px;
      background:#FFF;
      border-radius:12px;
      line-height: 26px;
      text-align: center;
      font-size: 12px;
      color: #999;
      border: 1px solid #DBDBDB;
      cursor: pointer;
      margin: 0 auto;
      .row-insert-i {
        font-size: 12px;
        color: #999;
        margin-left: 3px;
      }
      &:hover {
        color: #0785FD;
        border: 1px solid #0785FD;
        background:#F4FFFE;
        .row-insert-i {
          color: #0785FD;
        }
      }
    }
  }
</style>
