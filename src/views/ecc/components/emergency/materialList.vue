<template>
  <div class="ba-xf">
    <div style="padding-bottom: 20px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>应急库</el-breadcrumb-item>
        <el-breadcrumb-item>物资管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="display: flex;">
    <div style=" width: 21%;background-color: #FAFAFA" class="warehouse">
      <div style="padding:20px 10px; box-sizing: border-box" class="clearfix">
        <span style="display: inline-block;float: left; padding-top: 5px;font-size:18px; color: #0785FD; font-weight:bold" >仓库管理</span><el-button style="float: right;" size="small" @click.native="showEditDialog('add')">添加仓库</el-button>
      </div>
        <div @click="registrationChoice(0)"  style="padding:20px 20px 20px 15px; background-color: #fff; border-bottom: 1px solid #EAEAEA"> 所有仓库</div>
        <div>
          <!--<ul style="width: 100%">-->
            <!--<li v-for="(item, index) in tableDatack" :key="index"  @click="registrationChoice(index + 1)" :class="{active: visitType === index + 1}"><span>{{item.warehouseName}}</span>-->
              <!--<el-popover trigger="click" width="50" style="padding: 0" class="tanchu">-->
              <!--<div style="text-align: center; margin: 0">-->
              <!--<div style="margin-bottom: 5px; border-bottom: 1px solid #E8E8E8">-->
              <!--<el-button type="text" @click.native="showEditDialog('modify', scope.row)">修改</el-button>-->
              <!--</div>-->
              <!--<div style="margin-bottom: 5px; border-bottom: 1px solid #E8E8E8">-->
              <!--<el-button type="text" @click="seeck(scope.row)">查看</el-button>-->
              <!--</div>-->
              <!--<el-button  type="text" @click="del('warehouse',scope.row)">删除</el-button>-->
              <!--</div>-->
              <!--<i class="icon iconfont" style="color: #0785FD; cursor: pointer;" slot="reference">&#xe6f4;</i>-->
              <!--</el-popover>-->
            <!--</li>-->
          <!--</ul>-->
          <el-table
            :highlight-current-row ="true"
            :row-class-name="bb"
            @row-click="rowclick"
            :data="tableDatack"
            empty-text ="还没有可用仓库,请先添加仓库"
            style="width: 100%;" width="60%">
            <el-table-column
              prop="warehouseName" >
            </el-table-column>
            <el-table-column width="40%">
              <template slot-scope="scope">
                <el-popover trigger="click" width="50" style="padding: 0" class="tanchu">
                  <div style="text-align: center; margin: 0">
                    <div style="margin-bottom: 5px; border-bottom: 1px solid #E8E8E8">
                    <el-button type="text" @click.native="showEditDialog('modify', scope.row)">修改</el-button>
                    </div>
                    <div style="margin-bottom: 5px; border-bottom: 1px solid #E8E8E8">
                      <el-button type="text" @click="seeck(scope.row)">查看</el-button>
                    </div>
                    <el-button  type="text" @click="del('warehouse',scope.row)">删除</el-button>
                  </div>
                <i class="icon iconfont anbutton" style="cursor: pointer;" slot="reference">&#xe6f4;</i>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
    </div>
    <div style="width: 80%">
      <div class="clearfix" style="position: relative; background-color: #FFFFFF; margin-bottom: 16px">
        <el-form style="float: left; margin-left: 20px; padding-top: 20px" :inline="true" :model="searchForm" class="demo-form-inline" size="small">
          <el-form-item >
          <el-input v-model="searchForm.materialsName" placeholder="搜索物资名称..." style="width: 220px" ></el-input>
        </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doSearch">查询</el-button>
            <el-button @click.native="searchFormReset">重置</el-button>
          </el-form-item>
        </el-form>
        <div style="position: absolute; right: 20px; top: 20px">
          <el-button type="primary" size="small" @click.native="addmodify('add')" >添加物资</el-button>
        </div>
      </div>
    <el-table
      :data="tableData"
      style="width: 100%;">
      <!--<el-table-column prop="cameraId" label="摄像头ID" width="150"></el-table-column>-->
      <el-table-column  label="序号" type="index" width="80"></el-table-column>
      <el-table-column prop="materialsName" label="物资名称" >
      </el-table-column>
      <el-table-column prop="amount" label="数量" ></el-table-column>
      <el-table-column prop="measurementUnit" label="单位" ></el-table-column>
      <el-table-column prop="warehouseName" label="所属仓库" >
        <template slot-scope="scope">
          <el-popover placement="bottom" v-for="(item, index) in tableDatack" :key="index" effect="light"  trigger="hover">
            <div>
              <div style="padding-bottom: 15px"><span style="color: #555555; font-size: 14px; font-weight: bold">负责人：</span>{{scope.row.warehouseId === item.warehouseId ? item.administrators : ''}}</div>
              <div><span style="color: #555555; font-size: 14px; font-weight: bold">电话：</span>{{scope.row.warehouseId === item.warehouseId ? item.adminTel : ''}}</div>
            </div>
          <span style="cursor: pointer" slot="reference">{{scope.row.warehouseId === item.warehouseId ?  (item.warehouseName).slice(0,30): ''}}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <img title="查看" src="../../../../assets/img/temp/select.png"   @click="see(scope.row)" />
          <img title="编辑" src="../../../../assets/img/temp/edit.png" @click="addmodify('modify',scope.row)" />
          <img title="删除" src="../../../../assets/img/temp/delete.png" @click="del('material',scope.row)" />
          <!--<el-button size="mini" type="text" @click="see(scope.row)">查看</el-button>-->
          <!--<el-button type="text"  @click="addmodify('modify',scope.row)">修改</el-button>-->
          <!--<el-button @click="del('material',scope.row)" type="text" size="small">删除</el-button>-->
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
    </div>
  </div>
</template>
<script>
var list = [];
export default {
  data () {
    return {
      visible2: false,
      visitType: 0,
      searchForm: {
        materialsName: '',
        warehouseId: ''
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [{streamType: '11'}],
      tableDatack: []
    }
  },
  computed: {
  },
  created () {
    this.getTableData();
    this.getTableDatack();
  },
  mounted () {
  },
  methods: {
    bb (row, rowindex) {
      return 'active'
    },
    rowclick (row, event, column) {
      console.log(row);
      this.searchForm.warehouseId = row.warehouseId;
      this.getTableData();
    },
    getTableData () {
      let params = {
        // 'where.beginTime': this.searchForm.beginTime,
        // 'where.endTime': this.searchForm.endTime,
        // 'where.publishState': this.searchForm.publishState,
        'where.warehouseId': this.searchForm.warehouseId,
        'where.materialsName': this.searchForm.materialsName,
        // 'where.publishUnitId': this.searchForm.publishUnitId,
        // 'where.receiverId': this.searchForm.receiverId,
        // 'where.isReceive': this.searchForm.isReceive,
        // 'where.publishTime': this.searchForm.publishTime,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      this.axios.get('A2/materialService/page?' + $.param(params))
        .then((res) => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        })
        .catch(() => {
        });
    },
    getTableDatack () {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      this.axios.get('A2/warehouseService/page', params)
        .then((res) => {
          this.tableDatack = res.data.list;
          console.log(res)
          // this.tableDatack && this.tableDatack.map((item, index) => {
          //   this.tableData && this.tableData.map((ite, inde) => {
          //     if (item.warehouseId === ite.warehouseId) {
          //       this.tableData[inde].warehouseName = item.warehouseName;
          //       console.log(this.tableData)
          //     }
          //   });
          // });
        })
        .catch(() => {
        });
    },
    // 状态切换
    registrationChoice (type) {
      this.searchForm.warehouseId = '';
      this.getTableData();
      if (type === 1) {
      }
      if (type === 2) {
      }
      if (type === 3) {
      }
    },
    edit () {
    },
    doSearch () {
      this.getTableData();
    },
    del (status, scope) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (scope) {
          const params = {
            materialsId: scope.materialsId,
            warehouseId: scope.warehouseId
          };
          if (status === 'material') {
            this.axios.delete('A2/materialService/' + scope.materialsId, {params})
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
          } else {
            this.axios.delete('A2/warehouseService/' + scope.warehouseId, {params})
              .then((res) => {
                if (res) {
                  this.getTableDatack();
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                } else {
                  this.$message.error('删除失败');
                }
              })
          }
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    searchFormReset () {
      this.searchForm.materialsName = '';
      this.getTableData()
    },
    showEditDialog (status, scope) {
      if (status === 'add') {
        this.$router.push({name: 'emergency-addWarehouse', query: {status: status}});
      } else {
        this.$router.push({name: 'emergency-addWarehouse', query: {status: status, warehouseId: scope.warehouseId}});
      }
    },
    seeck (scope) {
      this.$router.push({name: 'emergency-seeWarehouse', query: {status: status, warehouseId: scope.warehouseId}});
    },
    addmodify (status, scope) {
      if (this.tableDatack.length > 0) {
        if (status === 'add') {
          this.$router.push({name: 'emergency-addMaterial', query: {status: status}});
        } else {
          this.$router.push({name: 'emergency-addMaterial', query: {status: status, materialsId: scope.materialsId}});
        }
      } else {
        this.$message.error('请先添加仓库');
      }
    },
    see (scope) {
      this.$router.push({name: 'emergency-seeMaterial', query: {status: status, materialsId: scope.materialsId}});
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
    }
  },
  filters: {
    warehouseFilter: function (warehouseId) {
      // this.tableDatack && this.tableDatack.map((item, index) => {
      // });
      // console.log(this.tableDatack);
      list.map((item, index) => {
        if (item.warehouseId === warehouseId) {
          console.log(item.warehouseName);
          return item.warehouseName;
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
  .ba-xf {
    padding: 20px;
    background-color: #F0F3F4;
    height: 100%;
    .warehouse{
      margin-right: 2%;
      .el-table /deep/ .el-table__header .has-gutter{
          display: none !important;
        }
      .active{
        color: #ffffff;
        background: #0785FD;
        position: relative;
        &:after{
          content: '';
          display: block;
          width: 12px;
          height: 12px;
          background: #0785FD;
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          -o-transform: rotate(45deg);
          transform: rotate(45deg);
          position: absolute;
          right: -6px;
          top: 50%;
        }
      }
      .anbutton{
        &:hover {
          color: #0785FD;
        }
      }
    }
    ul {
      li {
        width: 100%;
        height: 60px;
        background-color: #fff;
        border-bottom: 1px solid #FAFAFA;
        position: relative;
        i{
          position: absolute;
          display: inline-block;
          top: 40%;
          right: 10px;
        }
      }
    }
  }
  .bg-plan-tbp{
    padding: 20px 0;
    text-align: center;
  }
  /deep/ .el-popover {
    min-width: 130px!important;
  }
</style>
