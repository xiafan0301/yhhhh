<template>
<div class="bg-plate-ecl bg-plate-ecl3" v-show="this.$store.state.progressIndex === 3">
  <div class="plate-relation clearfix">
    <div class="relation-title">
      <div class="page-left">
        <span>关联页面</span>
        <el-select v-model="relationValue" placeholder="选择页面">
          <el-option
            v-for="item in this.$store.state.allPageList"
            :key="item.pageId"
            :value="item.pageName">
          </el-option>
        </el-select>
      </div>
      <div class="page-right">
        <span>跳转页面</span>
        <el-select v-model="skipValue" placeholder="请选择">
          <el-option
            v-for="item in this.$store.state.allPageList"
            :key="item.pageId"
            :value="item.pageName">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="relation-map">
      <div class="map-body">
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <span>左上</span>
              <el-button class="map-button">展示到该位置</el-button>
            </div>
          </el-col>
          <el-col :span="4" :offset="15">
            <div class="grid-content bg-purple">
              <span>右上</span>
              <el-button class="map-button">展示到该位置</el-button>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <span>左中</span>
              <el-button class="map-button">展示到该位置</el-button>
            </div>
          </el-col>
          <el-col :span="4" :offset="15">
            <div class="grid-content bg-purple">
              <span>右中</span>
              <el-button class="map-button">展示到该位置</el-button>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <span>左下</span>
              <el-button class="map-button">展示到该位置</el-button>
            </div>
          </el-col>
          <el-col :span="4" :offset="15">
            <div class="grid-content bg-purple">
              <span>右下</span>
              <el-button class="map-button relation-active">展示到该位置</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
  <div class="plate-ecl-b">
    <el-button @click.native="preStep">&nbsp;&nbsp;&nbsp;&nbsp;上一步&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
    <el-button type="primary" @click.native='commitData'>&nbsp;&nbsp;&nbsp;&nbsp;完成&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
  </div>
</div>
</template>
<script>
// import store from '@/store/store.js';
import store from '../../../../store/store.js';
export default {
  data () {
    return {
      relationValue: '',
      skipValue: ''
    }
  },
  methods: {
    preStep () {
      this.$store.commit('setProgressIndex', {progressIndex: 2});
    }
  }
}
</script>
<style lang='scss' scoped>
  .plate-relation {
    display:flex;
    width:100%;
    flex-wrap: wrap;
    .relation-title {
      width: 100%;
      height: 60px;
      line-height: 60px;
      background-color: #F0F0F0;
      display: flex;
      justify-content: center;
      .page-left, .page-right {
        margin-right: 5%;
        span {
          color: #333333;
          font-size: 14px;
        }
      }
    }
    .relation-map {
      width: 96%;
      margin: 2% 2% 0 2%;
      height: 300px;
      .bg-purple {
        background-color: #FCFCFE;
      }
      .map-body {
        margin-top: 3%;
      }
      .grid-content {
        box-shadow: 2px 1px 8px rgba(79,84,90,0.31);
        border-radius: 4px;
        height:65px;
        width:289px;
        line-height: 65px;
        display: flex;
        justify-content: space-around;
        margin-bottom: 10%;
        span {
          color: #0785FD;
          font-size: 14px;
          float: left;
        }
        .map-button {
          background-color: #D3D3D3;
          border-radius:4px;
          color: #fff;
          height: 50px;
          margin-top:2%;
          margin-right: -10%;
        }
        .relation-active {
          background-color: #0785FD;
        }
      }
    }
  }
</style>
