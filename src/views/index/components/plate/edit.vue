<template>
  <div class="vis-bg-plate">
    <div class="bg-plate-et">
      <div class="bg-plate-bd">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{name: 'plate-list'}">版块管理</el-breadcrumb-item>
          <el-breadcrumb-item>添加板块</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 进度控制 -->
      <div class="pb-plate-pro">
        <div class="plate-pro-i plate-pro-i1" :class="{'plate-pro-ised': progressIndex >= 1}">
          <div class="plate-pro-ilr"></div>
          <p>选择样式</p>
        </div>
        <div class="plate-pro-i plate-pro-i2" :class="{'plate-pro-ised': progressIndex >= 2}">
          <div class="plate-pro-ill"></div>
          <div class="plate-pro-ilr"></div>
          <p>填充数据</p>
        </div>
        <div class="plate-pro-i plate-pro-i3" :class="{'plate-pro-ised': progressIndex >= 3}">
          <div class="plate-pro-ill"></div>
          <div class="plate-pro-ilr"></div>
          <p>关联页面/位置</p>
        </div>
        <div class="plate-pro-i plate-pro-i4" :class="{'plate-pro-ised': progressIndex >= 4}">
          <div class="plate-pro-ill"></div>
          <p>完成</p>
        </div>
      </div>
    </div>
    <div class="bg-plate-ec">
      <div class="bg-plate-ecc">
        <div class="bg-plate-ecl bg-plate-ecl1" v-show="progressIndex === 1">
          <div class="plate-ecl1-tab">
            <div>
              <span :class="{'ecl1-tab-sed': styleType === 1}" @click="changeStyleType(1)">左右两侧</span>
              <span :class="{'ecl1-tab-sed': styleType === 2}" @click="changeStyleType(2)">地图区域</span>
            </div>
          </div>
          <div class="plate-ecl1-c">
            <ul v-show="styleType === 1" class="plate-ecl1-ul  plate-ecl1-ul1 clearfix">
              <li v-for="item in 42" :key="item">
                <img @click="setStyleRadio(item)" src="../../../../assets/img/temp/temp-t032.png" alt="">
                <p><el-radio v-model="styleRadio" :label="item">样式{{item}}</el-radio></p>
              </li>
            </ul>
            <div v-show="styleType === 2">
              地图区域
            </div>
          </div>
          <div class="plate-ecl-b">
            <el-button :disabled="!styleRadio" @click.native="nextStep(2)" type="primary">&nbsp;&nbsp;&nbsp;&nbsp;下一步&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
          </div>
        </div>

        <div class="bg-plate-ecl bg-plate-ecl2" v-show="progressIndex === 2">
          <div class="plate-ecl2-c clearfix">
            <div class="plate-ecl2-cl">
              <img src="../../../../assets/img/temp/temp-t032.png" alt="">
              <ul>
                <li>
                  <div>板块名称：</div>
                  <div>贫困类型</div>
                </li>
                <li>
                  <div>注释：</div>
                  <div>2017年数据</div>
                </li>
                <li>
                  <div>图表：</div>
                  <div>项：一般户、低保户、五保户
                    值1：数值（1870、520、1870）
                    值2：同比（-1.2、-1.2、-1.2）
                    值3：占比（40、20、40）</div>
                </li>
              </ul>
            </div>
            <div class="plate-ecl2-cr">
              <div is="plateData"></div>
            </div>
          </div>
          <div class="plate-ecl-b">
            <el-button @click.native="nextStep(1)">&nbsp;&nbsp;&nbsp;&nbsp;上一步&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
            <el-button @click.native="nextStep(3)" type="primary">&nbsp;&nbsp;&nbsp;&nbsp;下一步&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
          </div>
        </div>

        <div class="bg-plate-ecl bg-plate-ecl3" v-show="progressIndex === 3">
          <div class="plate-ecl-b">
            <el-button @click.native="nextStep(2)">&nbsp;&nbsp;&nbsp;&nbsp;上一步&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
            <el-button type="primary">&nbsp;&nbsp;&nbsp;&nbsp;完成&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import plateData from './plateData.vue';
export default {
  components: {plateData},
  data () {
    return {
      // 进度
      progressIndex: 1,
      // 选择样式
      styleType: 1, // 1 所有两侧 2 地图区域
      styleRadio: ''
    }
  },
  methods: {
    changeStyleType (type) {
      this.styleType = type;
    },
    setStyleRadio (val) {
      this.styleRadio = val;
    },
    editProject (flag, index) {
      if (flag) { // 新增
        this.projectList.splice(index + 1, 0, {
          name: ''
        });
      } else {
        if (this.projectList.length > 1) {
          this.projectList.splice(index, 1);
        }
      }
    },
    // 下一步
    nextStep (iNext) {
      this.progressIndex = iNext;
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
    height: 100%;
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
    height: 100%;
    padding-top: 138px; padding-bottom: 20px;
  }
  .bg-plate-ecc {
    width: 100%; height: 100%;
    border: 1px solid #E3E3E3;
  }
  .bg-plate-ecl {
    height: 100%;
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
      margin-left: 520px;
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
</style>
