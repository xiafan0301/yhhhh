<template>
<div class="bg-plate-ecl bg-plate-ecl2" v-show="this.$store.state.progressIndex === 3" style='width:100%'>
  <div class="plate-ecl2-c clearfix">
    <h2>图表数据</h2>
    <div class="plate-ecl2-cl">
      <img :src="this.$store.state.plateInfo.markUrl" alt="" style="width:75%">
    </div>
    <div class="plate-ecl2-cr">
      <div>
        <el-form :inline="true" :model="dataForm" class="demo-form-inline" size="small">
          <el-form-item label="板块名称" required>
            <el-input v-model="dataForm.plateName" placeholder="板块名称" maxlength='20'></el-input>
          </el-form-item>
          <el-form-item label="注释">
            <el-input v-model="dataForm.remark" placeholder="注释" maxlength='20'></el-input>
          </el-form-item>
        </el-form>
        <div v-for="(info, index) in plateInfoList" :key="'info'+index">
          <span v-show='false'>{{dataObjTwo[0].configId=info.configId}}</span>
          <span v-show='false'>{{dataObjTwo[0].plateName=dataForm.plateName}}</span>
          <span v-show='false'>{{dataObjTwo[0].remark=dataForm.remark}}</span>
          <template v-if="info.areaDataType === 1">
            <div style="margin-top:3%;">
              <h2 style='font-weight: bold'>位置{{info.serialNumber}}</h2>
              <span v-show='false'>{{configCount = info.configCount}}</span>
              <span v-show='false'>{{plateAreaId = info.plateAreaId}}</span>
              <div class="ecl2-cr-list">
                <table class="plate-table" style="width: 100%;">
                  <thead>
                  <tr>
                    <th>项</th>
                    <th>值</th>
                    <th>单位</th>
                    <th>同比值(%)</th>
                  </tr>
                  </thead>
                  <template v-if='info.configCount !== 0'>
                    <tbody v-for='(item, index) in info.configCount' :key='index'>
                      <tr>
                        <td><input type="text" v-model="itemName[index + '_' + info.serialNumber]" placeholder='请填写'></td>
                        <td><input type="text" v-model="valueContent[index + '_' + info.serialNumber]" placeholder='请填写'></td>
                        <td>
                          <input type="text" v-model="valueUnit[index + '_' + info.serialNumber]" placeholder='请填写'>
                        </td>
                        <td><input type="text" v-model="percentValueOne[index + '_' + info.serialNumber]" placeholder='请填写'></td>
                      </tr>
                    </tbody>
                  </template>
                </table>
              </div>
            </div>
          </template>
          <template v-if="info.areaDataType !== 1">
            <template v-if="info.areaDataType === 4">
              <div style="margin-top:5%;">
                <h2 style='font-weight: bold'>位置{{info.serialNumber}}</h2>
                <span v-show='false'>{{plateAreaId = info.plateAreaId}}</span>
                <span v-show='false'>{{configCountFour = info.mainMinCount}}</span>
                <div class="ecl2-cr-list">
                  <p class="list-title">第一步：添加项</p>
                  <table class="plate-table" style="width: 100%;">
                    <thead>
                    <tr>
                      <th>项名称</th>
                      <th>单位</th>
                      <th>操作</th>
                    </tr>
                    </thead>
                    <template v-if ='info.serialNumber === 3'>
                      <tbody>
                        <tr v-for="(item, index) in parentDataFour3" :key="'item'+index">
                          <td>
                            <input type="text" v-model="item.itemName" placeholder='请填写'>
                          </td>
                          <td>
                            <input type="text" v-model="childDataFour3[index].valueUnit" placeholder='请填写'>
                          </td>
                          <td width='15%'>
                            <template v-if="info.mainMinCount > 1">
                              <i
                                style="font-size: 25px; cursor: pointer; color: #DDDDDD;"
                                class="active el-icon-remove-outline"
                                @click="deleteChildDataListFour(itemNameFour[index + '_' + info.serialNumber], index, info.serialNumber)"
                                title="删除此项"
                              >
                              </i>
                            </template>
                            <template v-if='info.serialNumber === 3'>
                              <i
                                style="font-size: 25px; cursor: pointer;  color: #0785FD;"
                                class="el-icon-circle-plus-outline"
                                :class="[isActive3 === index ? 'active' : 'unactive']"
                                @click="addChildDataListFour(itemNameFour[index + '_' + info.serialNumber], valueUnitFour[index + '_' + info.serialNumber], index, info.mainMaxCount, info.serialNumber)"
                                title="新增项"
                              >
                              </i>
                            </template>
                            <template v-else-if='info.serialNumber === 5'>
                              <i
                                style="font-size: 25px; cursor: pointer;  color: #0785FD;"
                                class="el-icon-circle-plus-outline"
                                :class="[isActive5 === index ? 'active' : 'unactive']"
                                @click="addChildDataListFour(itemNameFour[index + '_' + info.serialNumber], valueUnitFour[index + '_' + info.serialNumber], index, info.mainMaxCount, info.serialNumber)"
                                title="新增项"
                              >
                              </i>
                            </template>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </table>
                </div>
                <div class="ecl2-cr-list" style="margin-top: 40px;">
                  <p class="list-title">第二步：添加数值</p>
                  <table class="plate-table" style="width: 100%;" >
                    <thead>
                    <tr>
                      <th>项名称</th>
                      <th>值</th>
                      <th>同比值(%)</th>
                    </tr>
                    </thead>
                    <template v-if ='info.serialNumber === 3'>
                      <tbody v-for="(items, index) in info.mainMinCount" :key="'items'+index">
                        <tr>
                          <td>{{allItemNameFour3[index]}}</td>
                          <td><input type="text" v-model="valueContentFour[index + '_' + info.serialNumber]" placeholder='请填写'></td>
                          <td><input type="text" v-model="percentValue[index + '_' + info.serialNumber]" placeholder='请填写'></td>
                        </tr>
                      </tbody>
                    </template>
                    <template v-if ='info.serialNumber === 5'>
                      <tbody v-for="(items, index) in info.mainMinCount" :key="'items'+index">
                        <tr>
                          <td>{{allItemNameFour5[index]}}</td>
                          <td><input type="text" v-model="valueContentFour[index + '_' + info.serialNumber]" placeholder='请填写'></td>
                          <td><input type="text" v-model="percentValue[index + '_' + info.serialNumber]" placeholder='请填写'></td>
                        </tr>
                      </tbody>
                    </template>
                  </table>
                </div>
              </div>
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
  <div class="plate-ecl-b">
    <span style='color:red;float:left;margin-left:5%'>{{tip}}</span>
    <el-button id='preBtn' @click.native="preStep">&nbsp;&nbsp;&nbsp;&nbsp;上一步&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
    <el-button @click.native="nextStep" type="primary">&nbsp;&nbsp;&nbsp;&nbsp;完成&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
  </div>
</div>
</template>
<script>
import store from '../../../../store/store.js';
export default {
  props: ['dataList'],
  data () {
    return {
      typeArr: [],
      configCount: 0,
      plateInfoList: [],
      configCountFour: 1,
      plateAreaId: '',
      indexValue: 0,
      indexValueFour: 0,
      itemName: {},
      valueUnit: {},
      valueContent: {},
      isActive3: 0,
      isActive5: 0,
      itemNameFour: {},
      contentNameFour: {},
      valueContentFour: {},
      allItemNameFour3: [],
      allItemNameFour5: [],
      valueUnitFour: {},
      percentValue: [], // 类型四的同比值
      percentValueOne: {}, // 类型一的同比值
      value: [],
      dataForm: {
        plateName: '',
        remark: ''
      },
      tip: '', // 提示语
      dataObjTwo: [{
        plateName: '',
        positionId: '',
        jumpPageId: '',
        configId: '',
        pageId: '',
        plateType: 1,
        remark: '',
        contentItemList: []
      }],
      parentDataFour3: [],
      parentDataFour5: [],
      childDataFour3: [],
      childDataFour5: [],
      contentItemListFour3: [], // 类型四的所有数据的集合
      contentItemListFour5: [], // 类型四的所有数据的集合
      contentItemListOne: [] // 类型一的所有数据的集合
    }
  },
  watch: {
    dataList (newVal) { // 要提交的数据
      this.dataList = Object.assign(this.dataList, newVal);
    },
    percentValue: { // 监听同比值的变化
      handler: function (newVal) {
        let newArr;
        if (newVal.length >= 1) {
          this.contentItemListFour.map((items, index) => {
            if (newVal[index] !== '') {
              const data = {
                contentName: '',
                valueContent: newVal[index],
                valueUnit: items.contentSubItemList[0].valueUnit,
                graphicFieldFlag: false,
                supernatantFieldFlag: false,
                sumFlag: false,
                serialNumber: 2,
                contnetSubItemExtendList: []
              }
              items.contentSubItemList.push(data);
            }
          });
        }
        this.contentItemListFour.map((items, index) => { // 去除contentSubItemList中重复的元素
          const newArr = items.contentSubItemList.slice(0, 2);
          items.contentSubItemList = JSON.parse(JSON.stringify(newArr));
        });
      },
      deep: true
    },
    contentItemListOne: { // 监听类型一的值变化
      handler: function (newVal) {
        this.contentItemListOne.map((items, index) => {
          items.itemName = newVal[index].itemName;
          items.contentSubItemList.map((item, idx) => {
            item.valueContent = newVal[index].contentSubItemList[idx].valueContent;
            item.valueUnit = newVal[index].contentSubItemList[idx].valueUnit;
          });
        });
      },
      deep: true
    }
  },
  mounted () {
    this.setInitialData();
  },
  methods: {
    preStep () {
      this.$store.commit('setProgressIndex', {progressIndex: 2});
      this.tip = '';
      // this.$store.commit('setType', {typeArr: []});
      // this.$store.commit('setConfigInfo', {setConfigInfo: []});
      // Object.assign(this.$data, this.$options.data()); // 恢复初始化data值
    },
    nextStep () {
      this.dataObjTwo[0].contentItemList = [];
      let data = {}, dataFour = {};
      for (let i in this.itemName) {
        if (this.percentValueOne[i] !== undefined) {
          data = {
            itemName: this.itemName[i],
            serialNumber: ++this.indexValue,
            plateAreaId: this.plateAreaId,
            contentSubItemList: [
              {
                contentName: this.itemName[i],
                valueContent: this.valueContent[i] ? this.valueContent[i] : '',
                valueUnit: this.valueUnit[i] ? this.valueUnit[i] : '',
                graphicFieldFlag: false,
                supernatantFieldFlag: false,
                sumFlag: false,
                serialNumber: 1,
                contnetSubItemExtendList: []
              },
              {
                contentName: '',
                valueContent: this.percentValueOne[i] ? this.percentValueOne[i] : '',
                valueUnit: '%',
                graphicFieldFlag: false,
                supernatantFieldFlag: false,
                sumFlag: false,
                serialNumber: 2,
                contnetSubItemExtendList: []
              }
            ]
          }
        } else {
          data = {
            itemName: this.itemName[i],
            serialNumber: ++this.indexValue,
            plateAreaId: this.plateAreaId,
            contentSubItemList: [{
              contentName: this.itemName[i],
              valueContent: this.valueContent[i] ? this.valueContent[i] : '',
              valueUnit: this.valueUnit[i] ? this.valueUnit[i] : '',
              graphicFieldFlag: false,
              supernatantFieldFlag: false,
              sumFlag: false,
              serialNumber: 1,
              contnetSubItemExtendList: []
            }]
          }
        }
        this.contentItemListOne.push(data);
      }
      for (let i in this.itemNameFour) {
        if (this.percentValue[i] !== undefined) {
          dataFour = {
            itemName: this.itemNameFour[i],
            serialNumber: ++this.indexValueFour,
            plateAreaId: this.plateAreaId,
            contentSubItemList: [
              {
                contentName: this.itemNameFour[i],
                valueContent: this.valueContentFour[i] ? this.valueContentFour[i] : '',
                valueUnit: this.valueUnitFour[i] ? this.valueUnitFour[i] : '',
                graphicFieldFlag: false,
                supernatantFieldFlag: false,
                sumFlag: false,
                serialNumber: 1,
                contnetSubItemExtendList: []
              },
              {
                contentName: '',
                valueContent: this.percentValue[i] ? this.percentValue[i] : '',
                valueUnit: '%',
                graphicFieldFlag: false,
                supernatantFieldFlag: false,
                sumFlag: false,
                serialNumber: 2,
                contnetSubItemExtendList: []
              }
            ]
          }
        } else {
          dataFour = {
            itemName: this.itemNameFour[i],
            serialNumber: ++this.indexValueFour,
            plateAreaId: this.plateAreaId,
            contentSubItemList: [{
              contentName: this.itemNameFour[i],
              valueContent: this.valueContentFour[i] ? this.valueContentFour[i] : '',
              valueUnit: this.valueUnitFour[i] ? this.valueUnitFour[i] : '',
              graphicFieldFlag: false,
              supernatantFieldFlag: false,
              sumFlag: false,
              serialNumber: 1,
              contnetSubItemExtendList: []
            }]
          }
        }
        this.contentItemListFour.push(dataFour);
      }
      this.contentItemListOne.map((item) => {
        item.serialNumber = this.dataObjTwo[0].contentItemList.length + 1;
        if (item.itemName !== '') {
          this.dataObjTwo[0].contentItemList.push(item);
        }
      });
      this.contentItemListFour.map((item) => {
        item.serialNumber = this.dataObjTwo[0].contentItemList.length + 1;
        if (item.itemName !== '') {
          this.dataObjTwo[0].contentItemList.push(item);
        }
      });
      this.dataObjTwo[0].positionId = this.dataList.positionId;
      this.dataObjTwo[0].pageId = this.dataList.pageId;
      this.dataObjTwo[0].jumpPageId = this.dataList.jumpPageId;
      if (this.dataObjTwo[0].contentItemList.length > 0) {
        const params = {
          visPlates: this.dataObjTwo
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
                this.$store.commit('setProgressIndex', {progressIndex: 4});
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
    },
    addChildDataListFour (name, unit, idx, maxNumber, sortNumber) { // 类型四添加项
      const configLength = this.$store.state.plateConfigInfo.length;
      if (name || unit) {
        if (sortNumber === 3) {
          this.isActive3 = idx + 1;
        } else if (sortNumber === 5) {
          this.isActive5 = idx + 1;
        }
        if (this.configCountFour < maxNumber) {
          for (let i = 0; i < configLength; i++) {
            if (this.$store.state.plateConfigInfo[i].serialNumber === sortNumber) {
              this.$store.state.plateConfigInfo[i].mainMinCount++;
            }
          }
        } else {
          this.tip = '项可添加条数已达到上线';
        }
      } else {
        this.tip = '请先填写信息';
      }
    },
    deleteChildDataListFour (name, idx, sortNumber) { // 类型四的删除项
      this.$store.state.plateConfigInfo.map((item) => {
        if (item.serialNumber === sortNumber) {
          --item.mainMinCount;
          if (sortNumber === 3) {
            this.isActive3 = item.mainMinCount - 1;
          } else if (sortNumber === 5) {
            this.isActive5 = item.mainMinCount - 1;
          }
        }
      });
    },
    setInitialData () {
      this.plateInfoList = JSON.parse(JSON.stringify(this.$store.state.plateConfigInfo))
      const areaDataList = this.$store.state.editPlateInfo.areaInfoList;
      const configId = this.$store.state.editPlateInfo.configId;
      this.dataForm = {
        plateName: this.$store.state.editPlateInfo.plateName,
        remark: this.$store.state.editPlateInfo.remark
      }
      this.axios.get('/plateServices/areaInfos/' + configId + '')
        .then((res) => {
          if (res) {
            let typeArr = [];
            let oneType = [];
            res.data.map((item, index) => {
              oneType.push(item.configCount);
              if (item.areaDataType !== 1 && item.areaDataType !== 4) {
                typeArr.push(item);
              }
              if (areaDataList.length > 0) {
                areaDataList.map((items, idx) => {
                  if (items.areaDataType === item.areaDataType && items.serialNumber === item.serialNumber) {
                    if (items.areaDataType === 1) {
                      if (items.contentItemList.length > 0) {
                        items.contentItemList.map((item, index) => {
                          this.itemName[index + '_' + items.serialNumber] = item.itemName;
                          if (item.contentSubItemList.length > 0) {
                            item.contentSubItemList.map((value, idx) => {
                              if (value.serialNumber === 1) {
                                this.valueContent[index + '_' + items.serialNumber] = value.valueContent;
                                this.valueUnit[index + '_' + items.serialNumber] = value.valueUnit;
                              } else {
                                this.percentValueOne[index + '_' + items.serialNumber] = value.valueContent;
                              }
                            });
                          }
                        });
                      }
                    } else if (items.areaDataType === 4) {
                      if (items.contentItemList.length > 0) {
                        console.log(items.contentItemList)
                        items.contentItemList.map((item, index) => {
                          item.plateAreaId = items.plateAreaId;
                          if (items.serialNumber === 3) {
                            console.log('3', items.contentItemList)
                            let childData;
                            const data = {
                              itemName: item.itemName,
                              plateAreaId: items.plateAreaId,
                              serialNumber: item.serialNumber
                            }
                            this.parentDataFour3.push(data);
                            if (item.contentSubItemList.length > 0) {
                              item.contentSubItemList.map((value, idx) => {
                                if (value.serialNumber === 2) {
                                  this.percentValue[index + '_' + items.serialNumber] = value.valueContent;
                                } else {
                                  childData = {
                                    contentName: value.contentName,
                                    valueContent: value.valueContent,
                                    valueUnit: value.valueUnit,
                                    serialNumber: value.serialNumber,
                                    graphicFieldFlag: value.graphicFieldFlag,
                                    supernatantFieldFlag: value.supernatantFieldFlag,
                                    sumFlag: value.sumFlag
                                  }
                                  this.valueContentFour[index + '_' + items.serialNumber] = value.valueContent;
                                }
                              });
                            }
                            this.childDataFour3.push(childData);
                          } else if (items.serialNumber === 5) {
                            console.log('5', items.contentItemList)
                            let childData;
                            const data = {
                              itemName: item.itemName,
                              plateAreaId: items.plateAreaId,
                              serialNumber: item.serialNumber
                            }
                            this.parentDataFour5.push(data);
                            if (item.contentSubItemList.length > 0) {
                              item.contentSubItemList.map((value, idx) => {
                                if (value.serialNumber === 2) {
                                  this.percentValue[index + '_' + items.serialNumber] = value.valueContent;
                                } else {
                                  childData = {
                                    contentName: value.contentName,
                                    valueContent: value.valueContent,
                                    valueUnit: value.valueUnit,
                                    serialNumber: value.serialNumber,
                                    graphicFieldFlag: value.graphicFieldFlag,
                                    supernatantFieldFlag: value.supernatantFieldFlag,
                                    sumFlag: value.sumFlag
                                  }
                                  this.valueContentFour[index + '_' + items.serialNumber] = value.valueContent;
                                }
                              });
                            }
                            this.childDataFour5.push(childData);
                          }
                        });
                        if (items.serialNumber === 3) {
                          this.contentItemListFour3 = JSON.parse(JSON.stringify(items.contentItemList));
                        } else if (items.serialNumber === 5) {
                          this.contentItemListFour5 = JSON.parse(JSON.stringify(items.contentItemList));
                        }
                        console.log(this.parentDataFour3);
                        console.log(this.childDataFour3);
                        console.log(this.contentItemListFour3)
                      }
                    }
                  }
                });
              }
            });
            this.$store.commit('setConfigInfo', {plateConfigInfo: res.data});
            this.$store.commit('setType', {typeArr: typeArr});
            this.$store.commit('setOneType', {oneType: oneType});
          }
        })
        .catch(() => {});
    }
  }
}
</script>
<style lang='scss'>
  .bg-plate-ecl {
    height: 100%;
  }
  #preBtn {
    color:#0785FD !important;
    border-color:#0785FD !important;
  }
  .plate-body-left {
    margin: 5% 0;
    p {
      color: #333333;
      font-size: 14px;
      font-weight: bold;
    }
    .plate-ul {
      margin-top: 3%;
      .plate-first {
        color: #333333;
        font-size: 12px;
        font-weight: bold;
      }
      ul {
        display: flex;
        li {
          width:33.3%;
        }
      }
      .plate-detail {
        margin-top: 2%;
        .title-left {
          color: #666666;
          font-size: 14px;
          margin-right: 3%;
        }
        .title-right {
          color: #999999;
          font-size: 12px;
        }
        li {
          height: 1.1em;
        }
      }
    }
  }
  .plate-ecl2-cr {
    .ecl2-cr-list {
      margin-top: 3%;
      .list-title {
        color: #333333;
        font-size: 14px;
        font-weight: bold;
        margin: 2% 0;
      }
    }
    .checkbox {
      margin-top: 2%;
      color: #e3e3e3;
    }
  }

  .el-form-item--small {
    .el-form-item__label {
      color: #333333;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .plate-table {
    border: 0;
    >tbody td input {
      width: 100% !important;
      min-width: 25% !important;
    }
    >thead th {
      font-weight: 400 !important;
      font-size: 14px;
      background-color: #dddddd !important;
    }
    thead th, tbody tr, thead tr th, tbody tr td {
      text-align: center;
      border: 1px solid #cccccc;
    }
    .unactive {
      color: #cccccc !important;
    }
    .active {
      color: #0785FD !important;
    }
    .mergetr {
      color: #ffffff;
      td {
        background-color: #999999;
        border-color: #fff;
      }
      input {
        background:transparent;
        color:#fff;
      }
    }
  }
  .stepH2 {
    font-weight: bolder !important;
  }
</style>
