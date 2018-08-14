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
            :disabled="item.isDisabled"
            :title="[item.isDisabled === true ? '页面无空余位置' : '']"
            :value="item.pageName"
          >
            {{item.pageName}}
          </el-option>
        </el-select>
      </div>
      <div class="page-right">
        <span>跳转页面</span>
        <el-select v-model="skipValue" placeholder="不跳转" @change='skipPages'>
          <el-option value=''>不跳转</el-option>
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
                :title="[item.isChecked === true ? titleTip : '']"
                :class="[item.isChecked === true ? 'checkedContent' : item.finishChecked === true ? 'finishChecked' : 'canChecked']">
                <span>{{item.position}}</span>
                <template v-if='item.isChecked === true'>
                  <button
                    class="map-button"
                  >
                    {{item.name}}
                  </button>
                </template>
                <template v-else>
                  <button
                    class="map-button"
                    @click='selectPosition(item.id)'>
                    {{item.name}}
                  </button>
                </template>
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
    <span class='advice'>{{tips}}</span>
    <el-button id='preBtn' @click.native="preStep" disabled>&nbsp;&nbsp;&nbsp;&nbsp;上一步&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
    <el-button type="primary" :style="[btnDisabled === true ? styleObj : '']" :disabled='btnDisabled' @click.native='nextStep' class='selectBtn'>&nbsp;&nbsp;&nbsp;&nbsp;下一步&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
  </div>
</div>
</template>
<script>
import store from '../../../../store/store.js';
export default {
  data () {
    return {
      relationValue: '',
      titleTip: '',
      btnDisabled: false,
      currentPage: '',
      tips: '',
      isSerialNumber: 0,
      styleObj: {
        background: '#ddd'
      },
      positionObj:
      [
        {
          id: 11,
          position: '左上',
          name: '替换到该位置'
        }, {
          id: 21,
          position: '右上',
          name: '替换到该位置'
        }, {
          id: 12,
          position: '左中',
          name: '替换到该位置'
        }, {
          id: 22,
          position: '右中',
          name: '替换到该位置'
        }, {
          id: 13,
          position: '左下',
          name: '替换到该位置'
        }, {
          id: 23,
          position: '右下',
          name: '替换到该位置'
        }
      ],
      skipValue: '',
      checkedPageId: '', // 选中的页面id
      plateList: [], // 该页面已经有哪些版块被占用
      relationPageList: [], // 所有的关联页面
      relationPausePageList: [],
      skipPageList: [], // 所有的跳转页面
      skipPausePageList: [],
      newDataList: {
        pageId: '',
        positionId: '',
        jumpPageId: '',
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
  mounted () {
    this.setInitialData();
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
        const list = item.plateList.filter((value, idx) => {
          return value.plateType === 1;
        });
        if (list.length === 6) {
          item.isDisabled = true;
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
        item.isSerialNumber = false;
        this.isSerialNumber = 1;
        item.name = '替换到该位置';
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
                    item.finishChecked = true;
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
              this.tips = '请在目标页面上选择版块要展示的位置';
              this.titleTip = '该位置已占用，请选择其它位置';
              this.btnDisabled = true;
            } else {
              this.tips = '该页面所有位置已经被占，请重新选择';
              this.btnDisabled = true;
              this.titleTip = '该页面没有空余位置可更换，请操作下一步按钮（如需更换，请先到版块管理列表中先删除对应的位置）';
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
      const plateName = this.$store.state.editPlateInfo.plateName;
      const serialNumber = this.$store.state.editPlateInfo.visPagePlate.visPlatePosition.serialNumber;
      this.positionObj.map((item, index) => {
        item.finishChecked = false;
        if (this.relationValue === this.currentPage) {
          if (serialNumber === item.id) {
            item.name = '替换到该位置';
            item.canChecked = true;
            item.isChecked = false;
          }
        }
        if (item.id === num) {
          item.name = plateName;
          item.finishChecked = true;
          this.tips = '您可选择点击该版块是否可跳转到其它页面，或替换到其它空余位置，设置完成后执行下一步';
          this.btnDisabled = false;
        } else if (item.isChecked !== true) {
          item.canChecked = true;
          item.name = '替换到该位置';
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
    setInitialData () { // 设置初始化数据
      const params = {
        pageNum: -1
      }
      const pageId = this.$store.state.editPlateInfo.visPagePlate.pageId;
      const jumpPageId = this.$store.state.editPlateInfo.visPagePlate.jumpPageId;
      const positionId = this.$store.state.editPlateInfo.visPagePlate.positionId;
      const plateId = this.$store.state.editPlateInfo.plateId;
      const serialNumber = this.$store.state.editPlateInfo.visPagePlate.visPlatePosition.serialNumber;
      this.newDataList = {
        jumpPageId: jumpPageId,
        pageId: pageId,
        positionId: positionId,
        plateId: plateId
      }
      this.axios.get('/pageServices/pages', {params})
        .then((res) => {
          if (res && res.data.list) {
            this.skipPausePageList = JSON.parse(JSON.stringify(res.data.list));
            this.relationPausePageList = JSON.parse(JSON.stringify(res.data.list));
            res.data.list.map((item) => {
              if (item.pageId === pageId) {
                this.relationValue = item.pageName;
                this.currentPage = item.pageName;
              } else if (item.pageId === jumpPageId) {
                this.skipValue = item.pageName;
              }
            });
            if (this.skipPausePageList.length > 0) {
              this.skipPausePageList.map((item, index) => { // 当点击关联页面时，对应的跳转页面的值不能点
                if (item.pageName === this.relationValue) {
                  item.isDisabled = true;
                } else {
                  item.isDisabled = false;
                }
              });
              this.skipPageList = JSON.parse(JSON.stringify(this.skipPausePageList));
            }
            this.relationPageList = JSON.parse(JSON.stringify(this.relationPausePageList));
            this.relationPageList.map((item) => {
              const list = item.plateList.filter((value, idx) => {
                return value.plateType === 1;
              });
              if (list.length === 6) {
                item.isDisabled = true;
              }
            });
          }
        })
        .catch(() => {});
      this.axios.get('/pageServices/pages/' + pageId + '')
        .then((res) => {
          if (res) {
            this.plateList = res.data.plateList;
            if (res.data.plateList.length > 0) {
              res.data.plateList.forEach((items, index) => {
                this.positionObj.forEach((item, idx) => {
                  item.canChecked = true;
                  if (items.serialNumber === item.id) {
                    item.isChecked = true;
                    if (serialNumber === item.id) {
                      item.isChecked = false;
                      item.finishChecked = true;
                    }
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
              const serialNumber = this.$store.state.editPlateInfo.visPagePlate.visPlatePosition.serialNumber;
              this.positionObj.map((item) => {
                if (item.id === serialNumber) {
                  item.isSerialNumber = true;
                }
              });
              this.titleTip = '';
              // this.tips = '您可选择点击该版块是否可跳转到其它页面，或替换到其它空余位置，设置完成后执行下一步';
              this.tips = '如不将版块修改到其它页面，请操作下一步按钮';
              this.titleTip = '该位置已占用，请选择其它位置';
              this.btnDisabled = false;
            } else {
              this.tips = '该页面其他位置已经被占，不能更换位置';
              this.titleTip = '该页面没有空余位置可更换，请操作下一步按钮（如需更换，请先到版块管理列表中先删除对应的位置）';
              this.btnDisabled = false;
            }
            this.positionObj = Object.assign([], this.positionObj); // 将该数组改变内存地址，为了重新渲染页面
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
        margin-left: 3%;
        span {
          color: #333333;
          font-size: 14px;
        }
      }
    }
    .relation-map {
      background: url('../../../../assets/img/temp/map@3x.png') no-repeat;
      background-size: 100% 100%;
      width: 96%;
      margin: 2% 2% 3% 2%;
      height: 300px;
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
        height:56px;
        width:289px;
        line-height: 56px;
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
          // width: 100px;
          height: 36px;
          margin-top:2%;
          margin-right: -10%;
          border: 0;
          line-height: 36px;
          // padding: 0 10px;
          font-size: 14px;
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
        border-color: #B1ADAD;
        span {
          color: #B1ADAD;
        }
        .map-button {
          background-color: transparent;
          color: #B1ADAD;
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
        border-color: #0785FD;
        span {
          color: #0785FD;
        }
        .map-button {
          background-color: #0785FD;
          color: #fff;
        }
      }
      .finishChecked {
        background: -webkit-linear-gradient(#07BAFD, #0785FD); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#07BAFD, #0785FD); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#07BAFD, #0785FD); /* Firefox 3.6 - 15 */
        background: linear-gradient(#07BAFD, #0785FD); /* 标准的语法 */
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
