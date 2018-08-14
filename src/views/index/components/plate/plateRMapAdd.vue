<template>
<div class="bg-plate-ecl bg-plate-ecl3" v-show="this.$store.state.progressIndex === 2">
  <div class="plate-relation clearfix">
    <div class="relation-title">
      <div class="page-left">
        <span><span style='color:red'>*</span>关联页面</span>
        <el-select v-model="relationValue" placeholder="选择页面" @change='selectPages' class='relationPage'>
          <!-- <el-option value=''>请选择</el-option> -->
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
    <el-button id='preBtn' @click.native="preStep">&nbsp;&nbsp;&nbsp;&nbsp;上一步&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
    <el-button type="primary" @click.native='nextStep' :disabled='btnDisabled' :style="[btnDisabled === true ? styleObj : '']" class='selectBtn'>&nbsp;&nbsp;&nbsp;&nbsp;下一步&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
  </div>
</div>
</template>
<script>
import store from '../../../../store/store.js';
export default {
  props: ['dataList'],
  data () {
    return {
      tips: '请选择要关联的页面，然后操作下一步按钮',
      fisrtTip: true,
      isRepace: false,
      btnDisabled: true,
      imgUrl: require('../../../../assets/img/temp/map_noselect.png'),
      relationValue: '',
      styleObj: {
        background: '#ddd'
      },
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
    const params = {
      pageNum: -1
    }
    this.axios.get('/pageServices/pages', {params})
      .then((res) => {
        if (res) {
          this.relationPageList = res.data.list;
        }
      })
      .catch(() => {});
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
            this.plateList = res.data.plateList;
            if (res.data.length > 0) {
              this.tips = '该页面已存在地图版块，如需替换则请操作下一步按钮';
              this.btnDisabled = false;
              this.$emit('getMapDataList', res.data);
            } else {
              this.btnDisabled = false;
              this.tips = '操作下一步按钮继续';
              this.$emit('getMapDataList', []);
            }
            this.positionObj = Object.assign([], this.positionObj); // 将该数组改变内存地址，为了重新渲染页面
          }
        })
        .catch(() => {});
      this.$store.commit('setMapPageId', {mapPageId: obj.pageId});
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
      width: 96%;
      margin: 2% 2% 0 2%;
      background: url('../../../../assets/img/temp/map@3x.png') no-repeat;
      background-size: 100% 100%;
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
