<template>
  <div class="schedule-manage">
    <div class='header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>值班管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>排班管理</span></el-breadcrumb-item>
      </el-breadcrumb>
      <el-button class='selectBtn preview'>预览排班</el-button>
    </div>
    <div class="date-week">
      <div class="week-box active-week" @click="clickActiveWeek">
        <p class="weekday">周一</p>
        <p class="dotted-line"></p>
        <div class="week-detail">
          <div class="week-list">
            <p>
              <span class="name">AM0800:</span>
              <span class="number">4</span>
              <span class="person">人</span>
            </p>
          </div>
          <div class="week-list">
            <p>
              <span class="name">AM0800:</span>
              <span class="number">4</span>
              <span class="person">人</span>
            </p>
          </div>
          <div class="week-list">
            <p>
              <span class="name">AM0800:</span>
              <span class="number">4</span>
              <span class="person">人</span>
            </p>
          </div>
          <div class="week-list">
            <p>
              <span class="name">AM0800:</span>
              <span class="number">4</span>
              <span class="person">人</span>
            </p>
          </div>
          <div class="expand">
            <i class="el-icon-arrow-down"></i>
            <i class="el-icon-arrow-down"></i>
          </div>
        </div>
        <div class="tips">
          <span class="triangle"></span>
          <span class="info" style="font-weight: bold">日期：</span>
          <span class="info">点击日期添加人员</span>
          <img src="../../../../assets/img/temp/ecc-logo.png" alt="">
          <i class="el-icon-circle-close" @click="closeTips"></i>
        </div>
      </div>
      <div class="week-box">
        <p class="weekday">周二</p>
        <p class="dotted-line"></p>
        <div class="week-detail">
          <div class="week-list">
            <p>
              <span style="color: #555555;">AM0800:</span>
              <span style="color: #0785FD;">4</span>
              <span style="color: #999999;">人</span>
            </p>
          </div>
          <div class="week-list">
            <p>
              <span style="color: #555555;">P1400:</span>
              <span style="color: #0785FD;">4</span>
              <span style="color: #999999;">人</span>
            </p>
          </div>
          <div class="week-list">
            <p>
              <span style="color: #555555;">A1-0600:</span>
              <span style="color: #0785FD;">4</span>
              <span style="color: #999999;">人</span>
            </p>
          </div>
          <div class="week-list">
            <p>
              <span style="color: #555555;">N0000:</span>
              <span style="color: #0785FD;">123</span>
              <span style="color: #999999;">人</span>
            </p>
          </div>
          <div class="expand">
            <i class="el-icon-arrow-down"></i>
            <i class="el-icon-arrow-down"></i>
          </div>
        </div>
      </div>
      <div class="week-box active-week">
        <p class="weekday">周三</p>
        <p class="dotted-line"></p>
        <div class="week-detail">
          <div class="week-list">
            <p>
              <span style="color: #555555;">AM0800:</span>
              <span style="color: #0785FD;">4</span>
              <span style="color: #999999;">人</span>
            </p>
          </div>
          <div class="week-list">
            <p>
              <span style="color: #555555;">P1400:</span>
              <span style="color: #0785FD;">4</span>
              <span style="color: #999999;">人</span>
            </p>
          </div>
          <div class="week-list">
            <p>
              <span style="color: #555555;">A1-0600:</span>
              <span style="color: #0785FD;">4</span>
              <span style="color: #999999;">人</span>
            </p>
          </div>
          <div class="week-list">
            <p>
              <span style="color: #555555;">N0000:</span>
              <span style="color: #0785FD;">123</span>
              <span style="color: #999999;">人</span>
            </p>
          </div>
          <div class="expand">
            <i class="el-icon-arrow-down"></i>
            <i class="el-icon-arrow-down"></i>
          </div>
        </div>
        <div class="tips">
          <span class="triangle"></span>
          <span class="info" style="font-weight: bold">日期：</span>
          <span class="info">点击日期添加人员</span>
          <img src="../../../../assets/img/temp/ecc-logo.png" alt="">
          <i class="el-icon-circle-close" @click="closeTips"></i>
        </div>
      </div>
      <div class="week-box">
        <p class="weekday">周四</p>
        <p class="dotted-line"></p>
        <div class="week-detail">
          <div class="week-list">
            <p>
              <span style="color: #555555;">AM0800:</span>
              <span style="color: #0785FD;">4</span>
              <span style="color: #999999;">人</span>
            </p>
          </div>
          <div class="week-list">
            <p>
              <span style="color: #555555;">P1400:</span>
              <span style="color: #0785FD;">4</span>
              <span style="color: #999999;">人</span>
            </p>
          </div>
          <div class="week-list">
            <p>
              <span style="color: #555555;">A1-0600:</span>
              <span style="color: #0785FD;">4</span>
              <span style="color: #999999;">人</span>
            </p>
          </div>
          <div class="week-list">
            <p>
              <span style="color: #555555;">N0000:</span>
              <span style="color: #0785FD;">123</span>
              <span style="color: #999999;">人</span>
            </p>
          </div>
          <div class="expand">
            <i class="el-icon-arrow-down"></i>
            <i class="el-icon-arrow-down"></i>
          </div>
        </div>
      </div>
      <div class="week-box">
        <p class="weekday">周五</p>
        <p class="dotted-line"></p>
        <div class="week-detail">
          <div class="week-list">
            <p>
              <span style="color: #555555;">AM0800:</span>
              <span style="color: #0785FD;">4</span>
              <span style="color: #999999;">人</span>
            </p>
          </div>
          <div class="week-list">
            <p>
              <span style="color: #555555;">P1400:</span>
              <span style="color: #0785FD;">4</span>
              <span style="color: #999999;">人</span>
            </p>
          </div>
          <div class="week-list">
            <p>
              <span style="color: #555555;">A1-0600:</span>
              <span style="color: #0785FD;">4</span>
              <span style="color: #999999;">人</span>
            </p>
          </div>
          <div class="week-list">
            <p>
              <span style="color: #555555;">N0000:</span>
              <span style="color: #0785FD;">123</span>
              <span style="color: #999999;">人</span>
            </p>
          </div>
          <div class="expand">
            <i class="el-icon-arrow-down"></i>
            <i class="el-icon-arrow-down"></i>
          </div>
        </div>
      </div>
      <div class="week-box">
        <p class="weekday">周六</p>
        <p class="dotted-line"></p>
        <div class="week-detail">
          <div class="week-list">
            <p>
              <span class="name">AM0800:</span>
              <span class="number">4</span>
              <span class="person">人</span>
            </p>
          </div>
          <div class="week-list">
            <p>
              <span style="color: #555555;">P1400:</span>
              <span style="color: #0785FD;">4</span>
              <span style="color: #999999;">人</span>
            </p>
          </div>
          <div class="week-list">
            <p>
              <span style="color: #555555;">A1-0600:</span>
              <span style="color: #0785FD;">4</span>
              <span style="color: #999999;">人</span>
            </p>
          </div>
          <div class="week-list">
            <p>
              <span style="color: #555555;">N0000:</span>
              <span style="color: #0785FD;">123</span>
              <span style="color: #999999;">人</span>
            </p>
          </div>
          <div class="expand">
            <i class="el-icon-arrow-down"></i>
            <i class="el-icon-arrow-down"></i>
          </div>
        </div>
      </div>
      <div class="week-box">
        <p class="weekday">周日</p>
        <p class="dotted-line"></p>
        <div class="week-detail">
          <p style="color: #555555;text-align: center;width:100%;">无</p>
          <!-- <div class="week-list">
            <p>
              <span style="color: #555555;">AM0800:</span>
              <span style="color: #0785FD;">4</span>
              <span style="color: #999999;">人</span>
            </p>
          </div>
          <div class="week-list">
            <p>
              <span style="color: #555555;">P1400:</span>
              <span style="color: #0785FD;">4</span>
              <span style="color: #999999;">人</span>
            </p>
          </div>
          <div class="week-list">
            <p>
              <span style="color: #555555;">A1-0600:</span>
              <span style="color: #0785FD;">4</span>
              <span style="color: #999999;">人</span>
            </p>
          </div>
          <div class="week-list">
            <p>
              <span style="color: #555555;">N0000:</span>
              <span style="color: #0785FD;">123</span>
              <span style="color: #999999;">人</span>
            </p>
          </div>
          <div class="expand">
            <i class="el-icon-arrow-down"></i>
            <i class="el-icon-arrow-down"></i>
          </div> -->
        </div>
      </div>
    </div>
    <div class="clearfix search">
      <el-form :inline="true" class="demo-form-inline" size="small">
        <el-form-item style="width: 150px;">
          <el-select  placeholder="请选择人员" style='width: 150px' v-model="selectForm.status">
            <!-- <el-option
              v-for="item in options5"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item style="width: 150px;">
          <el-select  placeholder="请选择班次" style='width: 150px' v-model="selectForm.status">
            <!-- <el-option
              v-for="item in options5"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class='selectBtn btnClass'>添加</el-button>
        </el-form-item>
        <el-form-item>
          <div class="error-tip">该人员班次冲突不可添加</div>
        </el-form-item>
      </el-form>
    </div>
    <el-table style="width: 100%" :data='personDataList' class='person-table'>
      <el-table-column fixed label="序号" type="index" align='center'></el-table-column>
      <el-table-column label="姓名" prop='reporterPhone' align='center'></el-table-column>
      <el-table-column label="手机号" prop='reporterRole' align='center'></el-table-column>
      <el-table-column label="岗位" prop='eventSourceName' align='center'></el-table-column>
      <el-table-column label="班次" prop='acceptFlag' align='center'>
        <template slot-scope="scope">
          <span style="color: #555555;" v-if="scope.row.acceptFlag == true">启用</span>
          <span style="color: #FB796C;" v-else>禁用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align='center'>
        <template slot-scope="scope">
          <i class="icon-shanchu- icon-hover" @click="showDelete(scope)" title="删除"></i>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: right; padding-top: 10px;">
      <template v-if="pagination.total > 0">
        <el-pagination
          background
          @size-change="onSizeChange"
          @current-change="onPageChange"
          :current-page.sync="pagination.pageNum"
          :page-size="pagination.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selectForm: {
        status: null
      },
      pagination: { total: 0, pageSize: 10, pageNum: 1 },
      personDataList: [],
      isActiveWeek: 0
    }
  },
  methods: {
    onPageChange (page) {
      this.pagination.pageNum = page;
      // this.getPersonList();
    },
    onSizeChange (val) {
      this.pagination.pageNum = 1;
      this.pagination.pageSize = val;
      // this.getPersonList();
    },
    clickActiveWeek () { // 点击选中某个星期
    },
    closeTips () { // 关闭提示
    }
  }
}
</script>

<style lang="scss" scoped>
.schedule-manage {
  padding: 20px;
  .header {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }
  .preview {
    color: #fff;
    float: right;
  }
  .date-week {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .active-week {
      background: #0785FD !important;
      position: relative;
      .weekday {
        color: #fff !important;
      }
      .week-detail {
        .week-list {
          .name {
            color: #fff !important;
          }
          .person {
            color: #fff !important;
          }
          .number {
            color: #fff !important;
          }
        }
        .expand {
          i {
            color: #fff !important;
          }
        }
      }
      .tips, .tips-one {
        width: 260px;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        background: #fff;
        border: 1px solid #D9D9D9;
        position: absolute;
        top: -50px;
        left: 170px;
        .triangle {
          width: 15px;
          height: 15px;
          display: inline-block;
          position: absolute;
          bottom: -8px;
          left: 30px;
          background-color: #fff;
          border-top: 1px solid #D9D9D9;
          border-left: 1px solid #D9D9D9;
          transform:rotate(225deg);
          -ms-transform:rotate(225deg);     /* IE 9 */
          -moz-transform:rotate(225deg);    /* Firefox */
          -webkit-transform:rotate(225deg); /* Safari 和 Chrome */
          -o-transform:rotate(225deg);  /* Opera */
        }
        .info {
          color: #FF0000;
          float: left;
        }
        img {
          float: right;
          margin-top: -35px;
          margin-right: 30px;
        }
        i {
          position: absolute;
          right: -10px;
          top: -10px;
          font-size: 25px;
          color: #666666;
          cursor: pointer;
        }
      }
    }
    .week-box {
      padding: 20px;
      width: 230px;
      background: #fff;
      margin: 10px 10px 10px 0;
      min-height: 170px;
      .weekday {
        color: #555555;
        font-size: 20px;
        font-weight: bold;
        width: 100%;
        text-align: center;
      }
      .dotted-line {
        margin: 20px 0 10px 0;
        height: 1px;
        width: 100%;
        border-bottom: 1px #EAEAEA dashed;
      }
      .week-detail {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .week-list {
          width: 50%;
          margin-top: 10px;
          .name {
            color: #555555;
          }
          .person {
            color: #999999;
          }
          .number {
            color: #0785FD;
          }
        }
        .expand {
          margin: 10px auto 0 auto;
          i {
            display: block;
            color: #D3D3D3;
            line-height: 5px;
          }
        }
      }
    }
  }
  .search {
    position: relative;
    width: 100%;
    background: #fff;
    height: 90px;
    line-height: 90px;
    margin-bottom: 1%;
    .demo-form-inline {
      float: left;
      padding-left: 1%;
      padding-top: 30px;
      width:100%;
      height: 45px;
    }
  }
  .btnClass {
    width: 80px;
  }
  .selectBtn {
    background-color: #0785FD;
  }
  .error-tip {
    padding: 0 13px 0 26px;
    background: #FEE6E0;
    border: 1px solid #FA796C;
    color: #FF0000;
    border-radius:1px;
  }
  .error-tip:before {
    content: '!';
    position: absolute;
    left: 5px;
    top: 9px;
    width: 15px;
    height: 15px;
    text-align: center;
    line-height: 16px;
    color: #FFF;
    font-weight: bold;
    background-color: #FA796C;
    border-radius: 50%;
  }
}
</style>
