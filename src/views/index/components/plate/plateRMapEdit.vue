<template>
<div class="bg-plate-ecl bg-plate-ecl3" v-show="this.$store.state.progressIndex === 2">
  <div class="plate-relation clearfix">
    <div class="relation-title">
      <div class="page-left">
        <span><span style='color:red'>*</span>关联页面</span>
        <el-select v-model="relationValue" placeholder="选择页面" @change='selectPages' class='relationPage'>
          <el-option
            v-for="item in relationPageList"
            :key="item.pageId"
            :value="item.pageName"
            :disabled='item.isDisabled'
            :title="[item.isDisabled === true ? '该页面已存在版块数据' : '']"
          >
            {{item.pageName}}
          </el-option>
        </el-select>
      </div>
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
      <div class="tag">
        <em></em>
        <span></span>
        展示在此处
      </div>
    </div>
  </div>
  <div class="plate-ecl-b">
    <span class='advice'>{{tips}}</span>
    <el-button @click.native="preStep" disabled style='background: #ddd;color:#fff;border-color:#ddd'>&nbsp;&nbsp;&nbsp;&nbsp;上一步&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
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
      tips: '如不将版块修改到其它页面，请操作下一步按钮',
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
      this.tips = '操作下一步按钮继续';
      // this.axios.get('/plateServices/managers/byPageId/' + obj.pageId + '')
      //   .then((res) => {
      //     if (res) {
      //       this.plateList = res.data;
      //       if (res.data.length > 0) {
      //         this.tips = '该页面已存在地图版块，如需替换则请操作下一步按钮';
      //         this.btnDisabled = false;
      //         this.$emit('getMapDataList', res.data);
      //       } else {
      //         this.positionObj.forEach((item, index) => {
      //           item.canChecked = true;
      //           item.name = '空';
      //           this.btnDisabled = false;
      //           this.tips = '操作下一步按钮继续';
      //         });
      //         // this.$emit('getMapDataList', []);
      //       }
      //       this.positionObj = Object.assign([], this.positionObj); // 将该数组改变内存地址，为了重新渲染页面
      //     }
      //   })
      //   .catch(() => {});
      this.$store.commit('setMapPageId', {mapPageId: obj.pageId});
    },
    setInitialData () {
      const params = {
        pageNum: -1
      }
      const pageId = this.$store.state.editPlateInfo.visPagePlate.pageId;
      this.$store.commit('setMapPageId', {mapPageId: pageId});
      this.axios.get('/pageServices/pages', {params})
        .then((res) => {
          if (res && res.data.list) {
            res.data.list.map((item) => {
              if (item.pageId === pageId) {
                this.relationValue = item.pageName;
                this.currentPage = item.pageName;
                this.btnDisabled = false;
                this.imgUrl = require('../../../../assets/img/temp/map_select.png');
              }
            });
            this.relationPageList = res.data.list;
            this.relationPageList.map((item) => {
              const list = item.plateList.filter((value, idx) => {
                return value.plateType === 2;
              });
              if (list.length > 0) {
                if (this.currentPage !== item.pageName) {
                  item.isDisabled = true;
                }
              }
            });
          }
        })
        .catch(() => {});
      this.axios.get('/plateServices/managers/byPageId/' + pageId + '')
        .then((res) => {
          if (res) {
            this.plateList = res.data;
            console.log(res.data)
            if (res.data.length > 0) {
              this.$emit('getMapDataList', res.data);
            } else {
              this.btnDisabled = false;
              this.fisrtTip = false;
              // this.$emit('getMapDataList', []);
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
.tag{
    width:98px;
    height:27px;
    border:1px solid #0785FD;
    position:relative;
    background-color:#FFF;
    color: #0785FD;
    font-size: 14px;
    line-height: 27px;
    text-align: center;
    position: absolute;
    left: 48%;
    top: 7%;
    border-radius:3px 3px 0px 3px;
  }
  .tag em{
    display:block;
    border-width:5px;
    position:absolute;
    top: 0;
    right:-10px;
    border-style:solid dashed dashed;
    border-color:transparent transparent transparent #0785FD;
    font-size:0;
    line-height:0;
  }
  .tag span{
    display:block;
    border-width:5px;
    position:absolute;
    top:0;
    right:-9px;
    border-style:solid dashed dashed;
    border-color:transparent transparent transparent #FFF;
    font-size:0;
    line-height:0;
  }
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
      // .advice {
      //   color: #F8560F;
      //   font-size: 14px;
      // }
    }
    .relation-map {
      background: url('../../../../assets/img/temp/map@3x.png') no-repeat;
      background-size: 100% 100%;
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
        padding: 0 20px;
        margin-top: 20px;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            width: 50%;
            height: 65px;
            margin-bottom: 1%;
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
  .advice {
    color: #F8560F;
    font-size: 14px;
    margin-right: 5%;
  }
  .relationPage /deep/ .el-input__inner {
    border: 1px solid red !important;
  }
  .relationPage /deep/ .el-input__inner:focus {
    border: 1px solid #0785FD !important;
  }
</style>
