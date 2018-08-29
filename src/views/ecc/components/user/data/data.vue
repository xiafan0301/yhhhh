<template>
  <div class="main">
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>{{plateName}}</el-breadcrumb-item>
      <el-breadcrumb-item>数据接入</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main-top">
      <div class="t-img"></div>
      <div class="t-text">使用说明PDF</div>
    </div>
    <div class="main-bottom">
      <div class="one">请根据《使用说明》选择适合的方案</div>
      <el-radio-group v-model="scheme" class="two">
        <el-radio :label="1">方案一</el-radio>
        <el-radio :label="2">方案二</el-radio>
        <el-radio :label="3">方案三</el-radio>
      </el-radio-group>
      <div class="line">
        <span class="title" style="height: 40px; line-height: 40px;">接口地址</span>
        <el-input/>
      </div>
      <div class="line">
        <span class="title">执行方式</span>
        <el-radio-group v-model="type">
          <el-radio :label="1">立即执行</el-radio>
          <el-radio :label="2">定时执行</el-radio>
        </el-radio-group>
        <div v-if="type === 2" class="time">
          <span style="color: #606266;">间隔时间</span>
          <el-input v-model.number="time" class="cTime">
            <el-select v-model="timeType" class="select-ticket-type" placeholder=" " slot="suffix" size="small">
              <el-option label="秒" :value="1"/>
              <el-option label="分" :value="2"/>
              <el-option label="小时" :value="3"/>
            </el-select>
          </el-input>
        </div>
      </div>
      <div class="bottom-btn">
        <span>返 回</span>
        <span>确 定</span>
      </div>
    </div>
  </div>
</template>

<script>
import { setCookie, getCookie } from '@/utils/util.js';
export default {
  data () {
    return {
      plateName: getCookie('plateName'),
      scheme: 1,
      type: 1,
      time: 5,
      timeType: 1
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  .main-top {
    margin-top: 10px;
    width: 100%; height:210px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    .t-img {
      width: 92px; height: 104px;
      background: url(../../../../assets/img/pdf.png) no-repeat;
      background-size: 92px 104px;
    }
    .t-text {
      font-size: 16px;
      color: #333;
      padding-top: 12px;
      margin-left: 10px;
    }
  }
  .main-bottom {
    width: 100%; height: 525px;
    background: #FFF;
    margin-top: 8px;
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .one {
      width: 53%; height: 54px;
      line-height: 54px;
      text-align: center;
      background:#F5F5F5;
      border-radius: 27px;
      font-size: 18px;
      color: #333;
    }
    .two {
      width: 50%;
      display: flex;
      justify-content: space-around;
      margin-top: 40px;
      /deep/ .el-radio__input.is-checked .el-radio__inner {
        border-color: #1AB394;
        background: #1AB394;
      }
      /deep/ .el-radio__input.is-checked+.el-radio__label {
        color: #606266;
      }
      /deep/ .el-radio__inner:hover {
        border-color: #1AB394;
      }
    }
    .line {
      width: 45%;
      margin-top: 34px;
      display: flex;
      position: relative;
      .title {
        display: inline-block;
        width: 70px;
        color: #555;
        font-weight: 600;
        font-size: 14px;
      }
      .el-input {
        width: calc(100% - 75px);
      }
      .el-radio-group {
        display: flex;
        flex-direction: column;
        width: calc(100% - 75px);
        margin-left: 12px;
        padding-top: 4px;
        /deep/ .el-radio {
          margin-bottom: 12px;
        }
      }
      /deep/ .el-radio__input.is-checked .el-radio__inner {
        border-color: #1AB394;
        background: #1AB394;
      }
      /deep/ .el-radio__input.is-checked+.el-radio__label {
        color: #606266;
      }
      /deep/ .el-radio__inner:hover {
        border-color: #1AB394;
      }
      /deep/ .el-radio+.el-radio {
        margin-left: 0;
      }
      .cTime {
        width: 130px;
      }
      .time {
        width: 250px; height: 30px;
        position: absolute;
        bottom: -25px;
        left: 105px;
        /deep/ .el-input__inner { height: 30px; line-height: 30px; }
        .select-ticket-type {
          width: 80px;
          height: 30px;
          background: #E5E6E7;
          position: absolute;
          left: -75px;
          border: 0;
        }
      }
    }
    .bottom-btn {
      margin-top: 90px;
      > span {
        display: inline-block;
        width: 120px; height: 42px;
        border-radius: 3px;
        text-align: center;
        line-height: 42px;
        font-size: 16px;
        cursor: pointer;
      }
      span:nth-child(1) {
        border: 1px solid #DBDBDB;
        color: #666;
      }
      span:nth-child(2) {
        background: #1AB394;
        color: #FFF;
        margin-left: 20px;
      }
    }
  }
}
</style>
