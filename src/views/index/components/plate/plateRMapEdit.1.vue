<template>
<div class="bg-plate-ecl bg-plate-ecl3" v-show="this.$store.state.progressIndex === 2">
  <div class="plate-relation clearfix">
    <div class="relation-title">
      <div class="page-left">
        <span>关联页面</span>
        <el-select v-model="relationValue" placeholder="选择页面" @change='selectPages'>
          <el-option value=''>请选择</el-option>
          <el-option
            v-for="item in relationPageList"
            :key="item.pageId"
            :value="item.pageName"
          >
            {{item.pageName}}
          </el-option>
        </el-select>
      </div>
      <span class='advice' v-show='fisrtTip'>*请选择要修改的页面</span>
      <span class='advice' v-show='isRepace'>
        *该页面已存在地图版块，是否替换？
        <el-button type='primary' id='sureBtn' size='small' @click='handleSure'>是</el-button>
        <el-button id='preBtn' size='small' @click='handleNo'>否</el-button>
      </span>
    </div>
    <div class="relation-map">
      <img :src='imgUrl' class='map-img' />
      <div class="map-body">
        <ul>
          <li v-for="(item, index) in positionObj" :key="'item'+index">
            <template v-if='item.canChecked === true'>
              <div class="grid-content bg-purple"
                :class="[item.isChecked === true ? 'checkedContent' : 'canChecked']">
                <span>{{item.position}}</span>
                <span class='map-name'>{{item.name}}</span>
              </div>
            </template>
            <template v-else>
              <div class="grid-content bg-purple cannotChecked">
                <span>{{item.position}}</span>
                <span class='map-name'>{{item.name}}</span>
              </div>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- <div class="content">
  </div> -->
  <div class="plate-ecl-b">
    <span style='color:red;float:left;margin-left:5%'>{{tips}}</span>
    <el-button id='preBtn' @click.native="preStep" disabled>&nbsp;&nbsp;&nbsp;&nbsp;上一步&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
    <el-button type="primary" @click.native='nextStep' :disabled='btnDisabled' calss='selectBtn'>&nbsp;&nbsp;&nbsp;&nbsp;下一步&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
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
      fisrtTip: true,
      isRepace: false,
      btnDisabled: true,
      imgUrl: require('../../../../assets/img/temp/map_noselect.png'),
      relationValue: '',
      positionObj:
      [
        {
          id: 11,
          position: '左上',
          name: ''
        }, {
          id: 21,
          position: '右上',
          name: ''
        }, {
          id: 12,
          position: '左中',
          name: ''
        }, {
          id: 22,
          position: '右中',
          name: ''
        }, {
          id: 13,
          position: '左下',
          name: ''
        }, {
          id: 23,
          position: '右下',
          name: ''
        }
      ],
      skipValue: '',
      checkedPageId: '', // 选中的页面id
      plateList: [], // 该页面已经有哪些版块被占用
      relationPageList: [], // 所有的关联页面
      newDataList: {
        pageId: '',
        plateId: ''
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
    this.setInitialData();
  },
  methods: {
    handleSure () {
      this.isRepace = false;
      this.btnDisabled = false;
    },
    handleNo () {
      this.isRepace = false;
      this.btnDisabled = true;
      this.fisrtTip = true;
    },
    preStep () { // 上一步
      this.$store.commit('setProgressIndex', {progressIndex: 1});
      this.relationValue = '';
      this.btnDisabled = true;
      this.imgUrl = require('../../../../assets/img/temp/map_noselect.png');
      this.fisrtTip = true;
      this.positionObj.forEach((item) => {
        item.canChecked = false;
        item.isChecked = false;
        item.name = '';
      });
    },
    nextStep () {
      this.$store.commit('setProgressIndex', {progressIndex: 3});
    },
    selectPages (value) {
      let obj = {};
      this.tips = '';
      this.imgUrl = require('../../../../assets/img/temp/map_select.png');
      obj = this.relationPageList.find((item) => {
        return item.pageName === value;
      });
      this.positionObj.forEach((item) => {
        item.canChecked = false;
        item.isChecked = false;
        item.name = '';
      });
      this.axios.get('/plateServices/managers/byPageId/' + obj.pageId + '')
        .then((res) => {
          if (res) {
            this.plateList = res.data;
            if (res.data.plateList.length > 0) {
              const siderArr = res.data.plateList.filter((item) => {
                return item.serialNumber.toString().substring(0, 1) !== '3';
              });
              siderArr.forEach((items, index) => {
                this.positionObj.forEach((item, idx) => {
                  item.canChecked = true;
                  if (items.serialNumber === item.id) {
                    item.isChecked = true;
                    item.name = items.plateName;
                  }
                });
              });
              const dataArr = res.data.plateList.filter((item) => {
                return item.serialNumber.toString().substring(0, 1) === '3';
              });
              if (dataArr.length > 0) {
                this.fisrtTip = false;
                this.isRepace = true;
                this.btnDisabled = true;
                this.$emit('getMapDataList', dataArr);
              } else {
                this.fisrtTip = false;
                this.isRepace = false;
                this.btnDisabled = false;
                this.$emit('getMapDataList', []);
              }
            } else {
              this.positionObj.forEach((item, index) => {
                item.canChecked = true;
                item.name = '空';
                this.btnDisabled = false;
                this.fisrtTip = false;
                this.isRepace = false;
                this.$emit('getMapDataList', []);
              });
            }
            this.positionObj = Object.assign([], this.positionObj); // 将该数组改变内存地址，为了重新渲染页面
          }
        })
        .catch(() => {});
      this.$store.commit('setMapPageId', {mapPageId: obj.pageId});
    },
    setInitialData () {
      const params = {
        pageNum: -1
      }
      const pageId = this.$store.state.editPlateInfo.visPagePlate.pageId;
      this.axios.get('/pageServices/pages', {params})
        .then((res) => {
          if (res && res.data.list) {
            res.data.list.map((item) => {
              if (item.pageId === pageId) {
                this.relationValue = item.pageName;
                this.btnDisabled = false;
                this.imgUrl = require('../../../../assets/img/temp/map_select.png');
              }
            });
            this.relationPageList = res.data.list;
          }
        })
        .catch(() => {});
      this.axios.get('/plateServices/managers/byPageId/' + pageId + '')
        .then((res) => {
          if (res) {
            this.plateList = res.data.plateList;
            console.log(res.data)
            if (res.data.length > 0) {
              // const siderArr = res.data.plateList.filter((item) => {
              //   return item.serialNumber.toString().substring(0, 1) !== '3';
              // });
              // siderArr.forEach((items, index) => {
              //   this.positionObj.forEach((item, idx) => {
              //     item.canChecked = true;
              //     if (items.serialNumber === item.id) {
              //       item.isChecked = true;
              //       item.name = items.plateName;
              //     }
              //   });
              // });
              // const dataArr = res.data.plateList.filter((item) => {
              //   return item.serialNumber.toString().substring(0, 1) === '3';
              // });
              // if (dataArr.length > 0) {
              this.$emit('getMapDataList', res.data);
              // } else {
              //   this.$emit('getMapDataList', []);
              // }
            // } else {
            //   this.positionObj.forEach((item, index) => {
            //     item.canChecked = true;
            //     item.name = '空';
            //     this.btnDisabled = false;
            //     this.fisrtTip = false;
            //     this.$emit('getMapDataList', []);
            //   });
            }
            this.positionObj = Object.assign([], this.positionObj); // 将该数组改变内存地址，为了重新渲染页面
          }
        })
        .catch(() => {});
    }
  }
}
</script>
<style lang='scss' scoped>
  #preBtn {
    color:#0785FD !important;
    border-color:#0785FD !important;
  }
  .selectBtn {
    background: -webkit-linear-gradient(#07BAFD, #0785FD); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#07BAFD, #0785FD); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#07BAFD, #0785FD); /* Firefox 3.6 - 15 */
    background: linear-gradient(#07BAFD, #0785FD); /* 标准的语法 */
  }
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
        span {
          color: #333333;
          font-size: 14px;
        }
      }
      .advice {
        color: #F8560F;
        font-size: 14px;
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
        top: 5%;
      }
      .bg-purple {
        background-color: #FCFCFE;
      }
      .map-body {
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            width: 50%;
            height: 100px;
          }
          .map-name {
            float:right;
            margin-right: 7%;
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
        margin-bottom: 10%;
        span {
          font-size: 14px;
          margin-left: 5%;
        }
      }
      .cannotChecked {
        span {
          color: #999999;
        }
      }
      .checkedContent {
        border-color: #0785FD;
        span {
          color: #0785FD;
        }
      }
      .canChecked {
        span {
          color: #0785FD;
        }
        .map-name {
          color: #D3D3D3;
        }
      }
    }
  }
  .content {
    width:95px;
    height:27px;
    border:1px solid #0785FD;
    border-radius:3px 3px 0px 3px;
    margin-top: -300px;
    margin-left:600px;
  }
  .content:before {
    content:'';
    display:block;
    width:0;
    height:0;
    position:relative;
    top:0;
    left:95px;
    border-left:9px solid #0785FD;
    border-top:7px solid transparent;
    border-bottom:7px solid transparent;
  }
  .content:after {
    content:'';
    display:block;
    width:0;
    height:0;
    position:relative;
    top:-2px;
    // right:10px;
    border-left:7px solid #fff;
    border-top:5px solid transparent;
    border-bottom:5px solid transparent;
  }
</style>
