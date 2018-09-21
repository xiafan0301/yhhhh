<template>
  <div class="vis-bg-plate">
    <div class="bg-plate-et">
      <div class="bg-plate-bd">
        <el-breadcrumb separator-class=" ">
          <el-breadcrumb-item style='margin-right: 0.4%'>
            <div style='background: #F2F2F2; height: 21px;line-height:21px;padding:0 5px;border-radius:3px'>
              <span style='color:#666666;font-size:14px;padding:0 5px'>版块管理</span>
              <i class='el-icon-close'></i>
            </div>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <div style='background: #F2F2F2; height: 21px;line-height:21px;padding:0 5px;border-radius:3px'>
              <span style='color: #0785FD;font-size:14px;'>修改版块</span>
              <i class='el-icon-close' @click='closePage' style='cursor: pointer'></i>
            </div>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 进度控制 -->
      <div class="pb-plate-pro">
        <div class="plate-pro-i plate-pro-i1" :class="{'plate-pro-ised': this.$store.state.progressIndex >= 1}">
          <div class="plate-pro-ilr"></div>
          <p>选择示图</p>
        </div>
        <div class="plate-pro-i plate-pro-i2" :class="{'plate-pro-ised': this.$store.state.progressIndex >= 2}">
          <div class="plate-pro-ill"></div>
          <div class="plate-pro-ilr"></div>
          <p>关联页面/位置</p>
        </div>
        <div class="plate-pro-i plate-pro-i3" :class="{'plate-pro-ised': this.$store.state.progressIndex >= 3}">
          <div class="plate-pro-ill"></div>
          <div class="plate-pro-ilr"></div>
          <p>填充数据</p>
        </div>
        <div class="plate-pro-i plate-pro-i4" :class="{'plate-pro-ised': this.$store.state.progressIndex >= 4}">
          <div class="plate-pro-ill"></div>
          <p>完成</p>
        </div>
      </div>
    </div>
    <div class="bg-plate-ec">
      <div class="bg-plate-ecc">
        <div is='selStyle'></div>
        <template v-if='this.$store.state.styleType === 1'>
          <div is='plateRelationEdit' @setDataList="getData"></div>
          <template v-if="this.$store.state.plateInfo.configId === 'de096a27-4896-41f7-95c2-990d5594fcc3'">
            <div is='dischargeEdit' :dataList='dataList'></div>
          </template>
          <template v-else>
            <div is='fillDataEdit' :dataList='dataList'></div>
          </template>
        </template>
        <template v-else-if='this.$store.state.styleType === 2'>
          <div is='plateRMapEdit' @getMapDataList='getMapDataList'></div>
          <div is='fillDataMapEdit' :mapDataList='mapDataList'></div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import store from '../../../../store/store.js';
import fillDataEdit from './fillDataEdit.vue';
import selStyle from './selStyle.vue';
import plateRelationEdit from './plateRelationEdit.vue';
import fillDataMapEdit from './fillDataMapEdit.vue';
import plateRMapEdit from './plateRMapEdit.vue';
import dischargeAdd from './dischargeAdd.vue';
import dischargeEdit from './dischargeEdit.vue';
export default {
  components: {fillDataEdit, selStyle, dischargeAdd, dischargeEdit, plateRelationEdit, plateRMapEdit, fillDataMapEdit},
  data () {
    return {
      dataList: {},
      mapDataList: [],
      value: ''
    }
  },
  created () {
    this.$store.commit('setProgressIndex', {progressIndex: 2});
  },
  methods: {
    getData (val) {
      this.dataList = val;
    },
    getMapDataList (val) {
      this.mapDataList = val;
    },
    closePage () {
      this.$router.push({name: 'plate-list'});
    }
  }
}
</script>
<style lang="scss" scoped>
  .pb-plate-pro {
    padding: 0 10% 0 10%;
    overflow: hidden;
    > .plate-pro-i {
      position: relative;
      width: 25%; height: 80px;
      float: left;
      background-position: center center;
      background-repeat: no-repeat;
      &.plate-pro-i1 { background-image: url(../../../../assets/img/icons/bg-icon-31.png); }
      &.plate-pro-ised.plate-pro-i1 { background-image: url(../../../../assets/img/icons/bg-icon-31.png); }
      &.plate-pro-i2 { background-image: url(../../../../assets/img/icons/bg-icon-32.png); }
      &.plate-pro-ised.plate-pro-i2 { background-image: url(../../../../assets/img/icons/bg-icon-32s.png); }
      &.plate-pro-i3 { background-image: url(../../../../assets/img/icons/bg-icon-33.png); }
      &.plate-pro-ised.plate-pro-i3 { background-image: url(../../../../assets/img/icons/bg-icon-33s.png); }
      &.plate-pro-i4 { background-image: url(../../../../assets/img/icons/bg-icon-34.png); }
      > p {
        position: absolute; top: 50%; left: 0;
        margin-top: 15px;
        width: 100%;
        text-align: center;
        color: #D3D3D3;
      }
      &.plate-pro-ised > p { color: #0785FD; }
      > div.plate-pro-ilr {
        position: absolute; top:50%; left: 50%;
        margin-left: 15px;
        width: 50%;
        height: 1px;
        overflow: hidden;
        background-color: #d3d3d3;
      }
      > div.plate-pro-ill {
        position: absolute; top:50%; right: 50%;
        margin-right: 15px;
        width: 50%;
        height: 1px;
        overflow: hidden;
        background-color: #d3d3d3;
      }
      &.plate-pro-ised > div {  background-color: #0785FD; }
    }
  }
  .vis-bg-plate {
    padding: 20px 20px 0 20px;
    // height: 100%;
    position: relative;
  }
  .bg-plate-bd {
    border-bottom: 1px solid #E3E3E3;
    height: 38px;
    padding: 2px 0 18px 2px;
  }
  .bg-plate-et {
    position: absolute; top: 20px; left: 20px;
    width: 100%;
    height: 138px;
  }
  .bg-plate-ec {
    // height: 100%;
    padding-top: 138px; padding-bottom: 20px;
  }
  .bg-plate-ecc {
    width: 100%;
    // height: 100%;
    border: 1px solid #E3E3E3;
  }
  .bg-plate-ecl {
    // height: 100%;
    position: relative;
    > .plate-ecl-b {
      position: absolute; bottom: 0; right: 0;
      width: 100%; height: 80px; line-height: 80px;
      text-align: center;
      border-top: 1px solid #ddd;
    }
  }
  .bg-plate-ecl1 {
    padding: 80px 0 80px 0;
    > .plate-ecl1-tab {
      position: absolute; top: 0; left: 0;
      width: 100%;  height: 80px;
      text-align: center;
      > div {
        width: 500px;
        overflow: hidden;
        margin: 0 auto;
        padding-top: 28px;
        > span {
          display: inline-block;
          float: left;
          border: 1px solid #0785FD;
          background-color: #fff;
          color: #999;
          width: 250px; height: 32px; line-height: 32px;
          cursor: pointer;
          transition: all .4s;
          &.ecl1-tab-sed {
            background-color: #0785FD;
            color: #fff;
            cursor: default;
          }
          &:first-child {
            border-radius: 6px 0 0 6px;
          }
          &:last-child {
            border-radius: 0 6px 6px 0;
          }
        }
      }
    }
    > .plate-ecl1-c {
      height: 100%;
      overflow: auto;
      margin: 0 auto;  padding: 0 20px 0 20px;
      > .plate-ecl1-ul {
        > li {
          width: 320px; height: 230px;
          float: left;
          text-align: center;
          padding: 10px 20px;
          overflow: hidden;
          > img {
            width: 280px; height: 180px;
          }
          > p {
            height: 20px; line-height: 20px;
          }
        }
      }

    }
  }
  .bg-plate-ecl2 {
    padding-bottom: 80px;
  }
  .plate-ecl2-c {
    height: 100%;
    overflow: auto;
    padding: 20px 20px 20px 20px;
    > .plate-ecl2-cl {
      width: 500px;
      float: left;
      text-align: center;
      > img {
        width: 100%;
      }
      > ul {
        text-align: left;
        padding-top: 20px;
        padding-left: 20px;
        > li {
          padding-bottom: 10px;
          overflow: hidden;
          > div {
            &:first-child {
              float: left;
              width: 100px;
              text-align: right;
              display: inline-block;
              color: #333333;
              font-weight: 600;
            }
            &:last-child {
              color: #666666;
              margin-left: 120px;
            }
          }
        }
      }
    }
    > .plate-ecl2-cr {
      margin-left: 560px;
      .remark-item {
        width: 180px;
        .el-form-item__content {
          width: 60%;
        }
      }
    }
  }
  .ecl2-cr-list {
    > h3 {
      font-size: 16px; color: #333; font-weight: 600;
      padding-bottom: 10px;
    }
  }

  .bg-plate-ecl3 {
    padding-bottom: 80px;
  }
  .plate-ecl2-c {
    display:flex;
    width:100%;
    flex-wrap: wrap;
    h2 {
      color: #333333;
      font-size: 18px;
      font-weight: bold !important;
      padding-bottom: 1%;
      width: 100%;
    }
    >div {
      width: 50%;
    }
    .plate-explain {
      margin-top: 3%;
      .explain-title {
        margin-bottom: 2%;
        color: #333333;
        font-size: 14px;
        font-weight: bold;
      }
      .explain-ul {
        li {
          height: 1.8em;
        }
        .explain-title-left {
          font-size: 14px;
          color: #333333;
        }
        .explain-title-right {
          color: #666666;
          font-size: 12px;
        }
      }
    }
  }
  .plate-body-left {
    margin: 5% 0;
    p {
      color: #333333;
      font-size: 14px;
      font-weight: bold;
    }
    .plate-ul {
      margin-top: 3%;
      .plate-first {
        color: #333333;
        font-size: 12px;
        font-weight: bold;
      }
      ul {
        display: flex;
        li {
          width:33.3%;
        }
      }
      .plate-detail {
        margin-top: 2%;
        .title-left {
          color: #666666;
          font-size: 14px;
          margin-right: 3%;
        }
        .title-right {
          color: #999999;
          font-size: 12px;
        }
        li {
          height: 1.1em;
        }
      }
    }
  }
  .plate-ecl2-cr {
    .ecl2-cr-list {
      margin-top: 3%;
      .list-title {
        color: #333333;
        font-size: 14px;
        font-weight: bold;
        margin: 2% 0;
      }
    }
    .checkbox {
      margin-top: 2%;
      color: #e3e3e3;
    }
  }

  .el-form-item--small {
    .el-form-item__label {
      color: #333333;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .plate-table {
    border: 0;
    thead th, tbody tr, thead tr th, tbody tr td {
      text-align: center;
      border: 1px solid #cccccc;
    }
    .unactive {
      color: #cccccc !important;
    }
    .active {
      color: #0785FD !important;
    }
    .mergetr {
      color: #ffffff;
      td {
        background-color: #666666;
        border-color: #fff;
      }
      input {
        background:transparent;
        color:#fff;
      }
    }
  }
</style>
