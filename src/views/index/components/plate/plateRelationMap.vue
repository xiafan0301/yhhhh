<template>
<div class="bg-plate-ecl bg-plate-ecl3" v-show="this.$store.state.progressIndex === 2">
  <div class="plate-relation clearfix">
    <div class="relation-title">
      <div class="page-left">
        <span>关联页面</span>
        <el-select v-model="relationValue" placeholder="选择页面" @change='selectPages'>
          <el-option
            v-for="item in relationPageList"
            :key="item.pageId"
            :value="item.pageName"
          >
            {{item.pageName}}
          </el-option>
        </el-select>
      </div>
    </div>
    <!-- <div class="relation-map">
      <img :src='imgUrl' class='map-img' />
      <div class="map-body">
        <ul>
          <li v-for="(item, index) in positionObj" :key="'item'+index">
            <template v-if='item.canChecked === true'>
              <div class="grid-content bg-purple"
                :class="[item.isChecked === true ? 'checkedContent' : item.finishChecked === true ? 'finishChecked' : 'canChecked']">
                <span>{{item.position}}</span>
                <button class="map-button" @click='selectPosition(item.id)'>{{item.name}}</button>
              </div>
            </template>
            <template v-else>
              <div class="grid-content bg-purple cannotChecked">
                <span>{{item.position}}</span>
                <button class="map-button">{{item.name}}</button>
              </div>
            </template>
          </li>
        </ul>
      </div>
    </div> -->
  </div>
  <div class="plate-ecl-b">
    <span style='color:red;float:left;margin-left:5%'>{{tips}}</span>
    <el-button @click.native="preStep">&nbsp;&nbsp;&nbsp;&nbsp;上一步&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
    <el-button type="primary" @click.native='nextStep'>&nbsp;&nbsp;&nbsp;&nbsp;下一步&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
  </div>
</div>
</template>
<script>
import store from '../../../../store/store.js';
export default {
  props: ['dataList'],
  data () {
    return {
      tips: '',
      imgUrl: require('../../../../assets/img/temp/map_noselect.png'),
      relationValue: '',
      positionObj:
      [
        {
          id: 11,
          position: '左上',
          name: '展示到该位置'
        }, {
          id: 21,
          position: '右上',
          name: '展示到该位置'
        }, {
          id: 12,
          position: '左中',
          name: '展示到该位置'
        }, {
          id: 22,
          position: '右中',
          name: '展示到该位置'
        }, {
          id: 13,
          position: '左下',
          name: '展示到该位置'
        }, {
          id: 23,
          position: '右下',
          name: '展示到该位置'
        }
      ],
      skipValue: '',
      checkedPageId: '', // 选中的页面id
      plateList: [], // 该页面已经有哪些板块被占用
      relationPageList: [], // 所有的关联页面
      skipPageList: [], // 所有的跳转页面
      newDataList: {
        pageId: ''
      },
      ltId: '',
      rtId: '',
      lcId: '',
      rcId: '',
      lbId: '',
      rbId: ''
    }
  },
  watch: {
    dataList (newVal) {
      this.newDataList = newVal;
    }
  },
  mounted () {
    const params = {
      pageNum: -1
    }
    this.axios.get('/pageServices/pages', {params})
      .then((res) => {
        if (res) {
          this.relationPageList = res.data.list;
          this.skipPageList = res.data.list;
        }
      })
      .catch(() => {});
    this.axios.get('/plateServices/positions')
      .then((res) => {
        if (res) {
          if (res.data.length > 0) {
            res.data.map((item, index) => {
              switch (item.serialNumber) {
                case 11:
                  this.ltId = item.positionId;
                  break;
                case 12:
                  this.lcId = item.positionId;
                  break;
                case 13:
                  this.lbId = item.positionId;
                  break;
                case 21:
                  this.rtId = item.positionId;
                  break;
                case 22:
                  this.rcId = item.positionId;
                  break;
                case 23:
                  this.rbId = item.positionId;
                  break;
                default:
                  break;
              }
            });
          }
        }
      })
      .catch(() => {});
  },
  methods: {
    preStep () { // 上一步
      this.$store.commit('setProgressIndex', {progressIndex: 1});
      this.relationValue = '';
      // Object.assign(this.$data, this.$options.data()); // 恢复初始化data值
    },
    nextStep () {
      this.$store.commit('setProgressIndex', {progressIndex: 3});
    },
    selectPages (value) {
      let obj = {};
      obj = this.relationPageList.find((item) => {
        return item.pageName === value;
      });
      this.positionObj.forEach((item) => {
        item.canChecked = false;
        item.isChecked = false;
        item.finishChecked = false;
        item.name = '展示到该位置';
      });
      this.skipPageList.map((item, index) => { // 当点击关联页面时，对应的跳转页面的值不能点
        if (item.pageName === value) {
          item.isDisabled = true;
        } else {
          item.isDisabled = false;
        }
      });
      this.axios.get('/plateServices/managers/byPageId/' + obj.pageId + '')
        .then((res) => {
          console.log(res)
          if (res.data.length > 0) {
            this.$store.commit('setMapDataList', {mapPageDataList: res.data});
            this.tips = '该页面已有位置被选，若继续，则会被替换';
          } else {
            this.tips = '';
          }
        })
        .catch(() => {});
      this.$store.commit('setPageId', {pageId: obj.pageId});
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
      position: relative;
      .map-img {
        position: absolute;
        left: 50%;
        top: 25%;
      }
      .bg-purple {
        background-color: #FCFCFE;
      }
      .map-body {
        margin-top: 3%;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            width: 50%;
            height: 100px;
          }
          li:nth-child(even) {
            >div {
              float: right;
            }
          }
        }
      }
      .grid-content {
        box-shadow: 2px 1px 8px rgba(79,84,90,0.31);
        border-radius: 4px;
        border: 1px solid #fff;
        height:65px;
        width:289px;
        line-height: 65px;
        display: flex;
        justify-content: space-around;
        margin-bottom: 10%;
        span {
          font-size: 14px;
          float: left;
        }
        .map-button {
          border-radius:4px;
          height: 50px;
          margin-top:2%;
          margin-right: -10%;
          border: 0;
          padding: 12px 20px;
        }
      }
      .checkedContent {
        border-color: #0785FD;
        span {
          color: #0785FD;
        }
        .map-button {
          background-color: transparent;
          color: #0785FD;
          border: 0;
        }
      }
      .cannotChecked {
        span {
          color: #0785FD;
        }
        .map-button {
          background-color: #D3D3D3;
          color: #fff;
        }
      }
      .canChecked {
        span {
          color: #0785FD;
        }
        .map-button {
          background-color: #0785FD;
          color: #fff;
        }
      }
      .finishChecked {
        background-color: #0785FD;
        span {
          color: #ffffff;
        }
        .map-button {
          background-color: transparent;
          color: #fff;
          border: 0;
        }
      }
    }
  }
</style>
