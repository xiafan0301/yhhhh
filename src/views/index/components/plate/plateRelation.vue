<template>
<div class="bg-plate-ecl bg-plate-ecl3" v-show="this.$store.state.progressIndex === 2">
  <div class="plate-relation clearfix">
    <div class="relation-title">
      <div class="page-left">
        <span><span style='color:red'>*</span>关联页面</span>
        <el-select v-model="relationValue" placeholder="选择页面" @change='selectPages'>
          <el-option value=''>请选择</el-option>
          <el-option
            v-for="item in relationPageList"
            :key="item.pageId"
            :disabled="item.isDisabled"
            :value="item.pageName"
            :title="[item.isDisabled ===true ? '页面无空余位置' : '']"
          >
            {{item.pageName}}
          </el-option>
        </el-select>
      </div>
      <div class="page-right">
        <span>跳转页面</span>
        <el-select v-model="skipValue" placeholder="不跳转" @change='skipPages' :disabled='skipDisabled'>
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
                :class="[item.isChecked === true ? 'checkedContent' : item.finishChecked === true ? 'finishChecked' : 'canChecked']">
                <span>{{item.position}}</span>
                <template v-if='item.isChecked === true'>
                  <button class="map-button">{{item.name}}</button>
                </template>
                <template v-else>
                  <button class="map-button" @click='selectPosition(item.id)'>{{item.name}}</button>
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
    <el-button id='preBtn' @click.native="preStep">&nbsp;&nbsp;&nbsp;&nbsp;上一步&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
    <el-button type="primary" :disabled='btnDisabled' :style="[btnDisabled === true ? styleObj : '']" @click.native='nextStep' class='selectBtn'>&nbsp;&nbsp;&nbsp;&nbsp;下一步&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
  </div>
</div>
</template>
<script>
import store from '../../../../store/store.js';
export default {
  data () {
    return {
      relationValue: '',
      skipDisabled: true,
      btnDisabled: true,
      tips: '请把版块绑定到要展示的页面上',
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
          if (res.data.list.length > 0) {
            this.relationPageList = JSON.parse(JSON.stringify(res.data.list));
            this.skipPausePageList = JSON.parse(JSON.stringify(res.data.list));
            this.relationPageList.map((items, index) => {
              const list = items.plateList.filter((item, idx) => {
                return item.plateType === 1;
              });
              if (list.length === 6) {
                items.isDisabled = true;
              }
            });
          }
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
      this.tips = '请把版块绑定到要展示的页面上';
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
        this.skipDisabled = false;
      } else {
        this.skipPageList = [];
        this.skipDisabled = true;
        this.skipValue = '';
        this.tips = '请在目标页面上选择版块要展示的位置';
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
              this.tips = '请在目标页面上选择版块要展示的位置';
              this.btnDisabled = true;
            }
            this.positionObj = Object.assign([], this.positionObj); // 将该数组改变内存地址，为了重新渲染页面
            console.log(this.positionObj)
          }
        })
        .catch(() => {});
      this.newDataList.pageId = obj.pageId;
    },
    selectPosition (num) { // 选择位置
      this.tips = '';
      this.btnDisabled = false;
      this.positionObj.map((item, index) => {
        item.finishChecked = false;
        // item.isChecked = false;
        if (item.id === num) {
          item = Object.assign(item, {finishChecked: true});
          this.tips = '您可选择点击该版块是否可跳转到其它页面，或替换到其它空余位置，设置完成后执行下一步';
          this.btnDisabled = false;
          item.name = '展示到该位置';
        } else if (item.isChecked !== true) {
          item.name = '替换到该位置';
          item.canChecked = true;
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
    // againSelect (num) { // 重新选择位置
    //   this.positionObj.map((item, index) => {
    //     if (item.isChecked === false) {
    //       item.canChecked = true;
    //       item.finishChecked = false;
    //     }
    //   });
    //   this.tips = '*点击选择要展示的位置按钮';
    //   this.btnDisabled = true;
    //   this.positionObj = Object.assign([], this.positionObj); // 将该数组改变内存地址，为了重新渲染页面
    // }
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
      height: 50px;
      line-height: 50px;
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
      width: 96%;
      margin: 2% 2% 3% 2%;
      background: url('../../../../assets/img/temp/map@3x.png') no-repeat;
      background-size: 100% 100%;
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
          height: 36px;
          margin-top:2%;
          margin-right: -10%;
          border: 0;
          line-height: 36px;
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
        border-color: #ddd;
        span {
          color: #ddd;
        }
        .map-button {
          background-color: transparent;
          color: #ddd;
          border: 0;
        }
      }
      .cannotChecked {
        span {
          color: #fff;
        }
        .map-button {
          background-color: #fff;
          color: #fff;
        }
      }
      .canChecked {
        span {
          color: #0785FD;
        }
        .map-button {
          background: -webkit-linear-gradient(#07BAFD, #0785FD); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(#07BAFD, #0785FD); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(#07BAFD, #0785FD); /* Firefox 3.6 - 15 */
          background: linear-gradient(#07BAFD, #0785FD); /* 标准的语法 */
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
</style>
