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
            :disabled="item.isDisabled"
            :value="item.pageName"
          >
            {{item.pageName}}
          </el-option>
        </el-select>
      </div>
      <span class='advice'>*{{tips}}</span>
      <div class="page-right">
        <span>跳转页面</span>
        <el-select v-model="skipValue" placeholder="请选择" @change='skipPages'>
          <el-option value=''>请选择</el-option>
          <el-option
            v-for="item in skipPageList"
            :key="item.pageId"
            :disabled="item.isDisabled"
            :value="item.pageName"
          >
            {{item.pageName}}
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="relation-map">
      <div class="map-body">
        <ul>
          <li v-for="(item, index) in positionObj" :key="'item'+index">
            <template v-if='item.canChecked === true'>
              <div class="grid-content bg-purple"
                :class="[item.isChecked === true ? 'checkedContent' : item.finishChecked === true ? 'finishChecked' : 'canChecked']">
                <span>{{item.position}}</span>
                <button class="map-button" @click='selectPosition(item.id)'>{{item.name}}</button>
                <i class='el-icon-circle-close close-icon' @click='againSelect(item.id)' v-show='item.finishChecked === true'></i>
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
    </div>
  </div>
  <div class="plate-ecl-b">
    <el-button id='preBtn' @click.native="preStep" disabled>&nbsp;&nbsp;&nbsp;&nbsp;上一步&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
    <el-button type="primary" :disabled='btnDisabled' @click.native='nextStep'>&nbsp;&nbsp;&nbsp;&nbsp;下一步&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
  </div>
</div>
</template>
<script>
import store from '../../../../store/store.js';
export default {
  data () {
    return {
      relationValue: '',
      btnDisabled: true,
      tips: '请选择关联页面',
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
      skipPausePageList: [],
      newDataList: {
        pageId: '',
        positionId: '',
        jumpPageId: ''
      },
      ltId: '',
      rtId: '',
      lcId: '',
      rcId: '',
      lbId: '',
      rbId: ''
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
          this.skipPausePageList = res.data.list;
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
      this.skipValue = '';
      this.relationValue = '';
      this.btnDisabled = true;
      this.positionObj.forEach((item, idx) => {
        item.canChecked = false;
        item.finishChecked = false;
        item.isChecked = false;
        item.name = '展示到该位置';
      });
      this.tips = '请选择关联页面';
      this.skipPageList = [];
      this.relationPageList.map((item) => {
        item.isDisabled = false;
      });
    },
    nextStep () {
      this.$store.commit('setProgressIndex', {progressIndex: 3});
      this.$emit('setDataList', this.newDataList);
    },
    skipPages (value) { // 要跳转的页面
      let obj = {};
      obj = this.relationPageList.find((item) => {
        return item.pageName === value;
      });
      this.relationPageList.map((item, index) => { // 当点击跳转页面时，对应的关联页面的值不能点
        if (item.pageName === value) {
          item.isDisabled = true;
        } else {
          item.isDisabled = false;
        }
      });
      this.newDataList.jumpPageId = obj.pageId;
    },
    selectPages (value) {
      if (value) {
        this.skipPageList = JSON.parse(JSON.stringify(this.skipPausePageList));
      }
      let obj = {};
      this.tips = '';
      this.btnDisabled = false;
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
      this.axios.get('/pageServices/pages/' + obj.pageId + '')
        .then((res) => {
          if (res) {
            this.plateList = res.data.plateList;
            if (res.data.plateList.length > 0) {
              res.data.plateList.forEach((items, index) => {
                this.positionObj.forEach((item, idx) => {
                  item.canChecked = true;
                  if (items.serialNumber === item.id) {
                    item.isChecked = true;
                    item.name = items.plateName;
                  }
                });
              });
            } else {
              this.positionObj.forEach((item, index) => {
                item.canChecked = true;
              });
            }
            const data = this.positionObj.filter((item) => {
              return item.isChecked !== true;
            });
            if (data.length > 0) {
              this.tips = '点击选择要展示的位置按钮';
              this.btnDisabled = true;
            } else {
              this.tips = '该页面所有位置已经被占，请重新选择';
              this.btnDisabled = true;
            }
            this.positionObj = Object.assign([], this.positionObj); // 将该数组改变内存地址，为了重新渲染页面
          }
        })
        .catch(() => {});
      this.newDataList.pageId = obj.pageId;
    },
    selectPosition (num) { // 选择位置
      this.tips = '';
      this.btnDisabled = false;
      this.positionObj.map((item, index) => {
        if (item.id === num) {
          item = Object.assign(item, {finishChecked: true});
          this.tips = '展示成功，点击下一步';
          this.btnDisabled = false;
        } else if (item.isChecked !== true) {
          item.canChecked = false;
        }
      });
      this.positionObj = Object.assign([], this.positionObj); // 将该数组改变内存地址，为了重新渲染页面
      switch (num) {
        case 11:
          this.newDataList.positionId = this.ltId;
          break;
        case 12:
          this.newDataList.positionId = this.lcId;
          break;
        case 13:
          this.newDataList.positionId = this.lbId;
          break;
        case 21:
          this.newDataList.positionId = this.rtId;
          break;
        case 22:
          this.newDataList.positionId = this.rcId;
          break;
        case 23:
          this.newDataList.positionId = this.rbId;
          break;
        default:
          break;
      }
    },
    againSelect (num) { // 重新选择位置
      this.positionObj.map((item, index) => {
        if (item.isChecked === false) {
          item.canChecked = true;
          item.finishChecked = false;
        }
      });
      this.tips = '点击选择要展示的位置按钮';
      this.btnDisabled = true;
      this.positionObj = Object.assign([], this.positionObj); // 将该数组改变内存地址，为了重新渲染页面
    }
  }
}
</script>
<style lang='scss' scoped>
  #preBtn {
    color:#0785FD !important;
    border-color:#0785FD !important;
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
    }
    .advice {
      color: #F8560F;
      font-size: 14px;
      margin-right: 5%;
    }
    .relation-map {
      width: 96%;
      margin: 2% 2% 3% 2%;
      height: 300px;
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
        position: relative;
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
        .close-icon {
          position: absolute;
          right: -15px;
          font-size: 20px;
          top: -10px;
          color: #ACA7A6;
        }
        .close-icon:hover {
          color: #0789FD;
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
