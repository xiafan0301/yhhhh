<template>
<div class="bg-plate-ecl bg-plate-ecl3" v-show="this.$store.state.progressIndex === 3">
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
      <div class="page-right">
        <span>跳转页面</span>
        <el-select v-model="skipValue" placeholder="请选择" @change='skipPages'>
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
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="grid-content bg-purple cannot-checked" id='leftTop' :num=11>
              <span>左上</span>
              <button class="map-button" @click='selectPosition($event,11)'>展示到该位置</button>
            </div>
          </el-col>
          <el-col :span="4" :offset="15">
            <div class="grid-content bg-purple cannot-checked" id='rightTop' :num=21>
              <span>右上</span>
              <button class="map-button" @click='selectPosition($event, 21)'>展示到该位置</button>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple cannot-checked" id='leftCenter' :num=12>
              <span>左中</span>
              <button class="map-button" @click='selectPosition($event, 12)'>展示到该位置</button>
            </div>
          </el-col>
          <el-col :span="4" :offset="15">
            <div class="grid-content bg-purple cannot-checked" id='rightCenter' :num=22>
              <span>右中</span>
              <button class="map-button" @click='selectPosition($event, 22)'>展示到该位置</button>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple cannot-checked" id='leftBottom' :num=13>
              <span>左下</span>
              <button class="map-button" @click='selectPosition($event, 13)'>展示到该位置</button>
            </div>
          </el-col>
          <el-col :span="4" :offset="15">
            <div class="grid-content bg-purple cannot-checked" id='rightBottom' :num=23>
              <span>右下</span>
              <button class="map-button" @click='selectPosition($event, 23)'>展示到该位置</button>
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
import store from '../../../../store/store.js';
export default {
  props: ['dataList'],
  data () {
    return {
      relationValue: '',
      skipValue: '',
      checkedPageId: '', // 选中的页面id
      plateList: [], // 该页面已经有哪些板块被占用
      relationPageList: [], // 所有的关联页面
      skipPageList: [], // 所有的跳转页面
      newDataList: [],
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
      this.$store.commit('setProgressIndex', {progressIndex: 2});
    },
    skipPages (value) { // 要跳转的页面
      let obj = {};
      obj = this.relationPageList.find((item) => {
        return item.pageName === value;
      });
      this.newDataList[0].jumpPageId = obj.pageId;
    },
    selectPages (value) {
      let obj = {};
      const content = document.getElementsByClassName('grid-content');
      const button = document.getElementsByClassName('map-button');
      obj = this.relationPageList.find((item) => {
        return item.pageName === value;
      });
      this.skipPageList.map((item, index) => { // 当点击关联页面时，对应的跳转页面的值不能点
        if (item.pageName === value) {
          item.isDisabled = true;
        } else {
          item.isDisabled = false;
        }
      });
      for (let i = content.length - 1; i >= 0; i--) {
        $(content[i]).children('button').attr('disabled', false);
      }
      this.axios.get('/pageServices/pages/' + obj.pageId + '')
        .then((res) => {
          if (res) {
            this.plateList = res.data.plateList;
            let arr = [], text = [];
            if (res.data.plateList.length > 0) {
              res.data.plateList.map((item) => {
                arr.push(item.serialNumber);
                text.push(item.plateName);
              });
              for (let i = content.length - 1; i >= 0; i--) {
                if (arr.indexOf(parseInt($(content[i]).attr('num'))) === -1) {
                  $(content[i]).removeClass('cannot-checked');
                  $(content[i]).addClass('can-checked');
                } else {
                  $(content[i]).removeClass('finish-checked');
                  $(content[i]).removeClass('cannot-checked');
                  $(content[i]).removeClass('can-checked');
                  $(content[i]).addClass('checked-content');
                  $(button[i]).text(text[i]);
                }
              }
            } else {
              for (let i = content.length - 1; i >= 0; i--) {
                $(content[i]).removeClass('checked-content');
                $(content[i]).removeClass('finish-checked');
                $(content[i]).removeClass('cannot-checked');
                $(content[i]).addClass('can-checked');
                $(button[i]).text('展示到该位置');
              }
            }
          }
        })
        .catch(() => {});
      this.newDataList[0].pageId = obj.pageId;
    },
    selectPosition (event, num) { // 选择位置
      let arr = [];
      const parentClass = event.target.parentNode;
      const noCheckedClass = document.getElementsByClassName('can-checked');
      if ($(parentClass).hasClass('cannot-checked')) {
        return false;
      } else {
        $(event.target).attr('disabled', true); // 对当前对象设置不可点
        for (let i = noCheckedClass.length - 1; i >= 0; i--) {
          const numValue = parseInt($(noCheckedClass[i]).attr('num'));
          if (numValue === num) {
            $(noCheckedClass[i]).addClass('finish-checked');
            $(noCheckedClass[i]).removeClass('can-checked');
          } else {
            $(noCheckedClass[i]).addClass('cannot-checked');
            $(noCheckedClass[i]).removeClass('can-checked');
          }
        }
        switch (num) {
          case 11:
            this.newDataList[0].positionId = this.ltId;
            break;
          case 12:
            this.newDataList[0].positionId = this.lcId;
            break;
          case 13:
            this.newDataList[0].positionId = this.lbId;
            break;
          case 21:
            this.newDataList[0].positionId = this.rtId;
            break;
          case 22:
            this.newDataList[0].positionId = this.rcId;
            break;
          case 23:
            this.newDataList[0].positionId = this.rbId;
            break;
          default:
            break;
        }
      }
    },
    commitData () {
      if (this.newDataList) {
        const params = {
          visPlates: this.newDataList
        }
        this.axios.post('/plateServices/plateBatch', params.visPlates)
          .then((res) => {
            if (res) {
              if (res.data.length > 0) {
                this.$message({
                  showClose: true,
                  message: '添加板块成功',
                  type: 'success'
                });
                this.$router.push({name: 'plate-list'});
              } else {
                this.$message({
                  showClose: true,
                  message: '添加板块失败',
                  type: 'error'
                });
              }
            }
          })
          .catch(() => {});
      }
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
      .checked-content {
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
      .cannot-checked {
        span {
          color: #0785FD;
        }
        .map-button {
          background-color: #D3D3D3;
          color: #fff;
        }
      }
      .can-checked {
        span {
          color: #0785FD;
        }
        .map-button {
          background-color: #0785FD;
          color: #fff;
        }
      }
      .finish-checked {
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
