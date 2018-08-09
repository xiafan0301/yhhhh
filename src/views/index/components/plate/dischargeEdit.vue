<template>
<div class="bg-plate-ecl bg-plate-ecl2" v-show="this.$store.state.progressIndex === 3" style='width:100%'>
  <div class="plate-ecl2-c clearfix">
    <h2>图表数据</h2>
    <div class="plate-ecl2-cl">
      <img :src="this.$store.state.plateInfo.markUrl" alt="" style="width:75%">
    </div>
    <div class="plate-ecl2-cr">
      <div>
        <el-form :inline="true" :model="dataForm" class="demo-form-inline" ref='dataForm' :rules='rules' size="small">
          <el-form-item label="版块名称" prop='plateName'>
            <el-input v-model="dataForm.plateName" placeholder="版块名称" :maxlength='maxlength'></el-input>
          </el-form-item>
          <el-form-item label="注释" prop='remark'>
            <el-input v-model="dataForm.remark" placeholder="注释" :maxlength='maxlength'></el-input>
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
              <span v-show='false'>{{plateAreaId[info.serialNumber] = info.plateAreaId}}</span>
              <div class="ecl2-cr-list">
                <table class="plate-table" style="width: 100%;">
                  <thead>
                  <tr>
                    <th style='border-left: 1px solid #DDDDDD'>项</th>
                    <th>值</th>
                    <th>单位</th>
                    <th style='border-right: 1px solid #DDDDDD'>同比值(%)</th>
                  </tr>
                  </thead>
                  <template v-if='info.configCount !== 0'>
                    <tbody v-for='(item, index) in info.configCount' :key='index'>
                      <tr>
                        <td><input type="text" v-model="itemName[index + '_' + info.serialNumber]" placeholder='请填写'></td>
                        <td><input type="number" v-model="valueContent[index + '_' + info.serialNumber]" placeholder='请填写'></td>
                        <td>
                          <input type="text" v-model="valueUnit[index + '_' + info.serialNumber]" placeholder='请填写'>
                        </td>
                        <td><input type="number" v-model="percentValueOne[index + '_' + info.serialNumber]" placeholder='请填写'></td>
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
                <div class="ecl2-cr-list">
                  <p class="list-title">第一步：添加项</p>
                  <table class="plate-table" style="width: 100%;">
                    <thead>
                    <tr>
                      <th style='border-left: 1px solid #DDDDDD'>项名称</th>
                      <th>单位</th>
                      <th style='border-right: 1px solid #DDDDDD'>操作</th>
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
                            <template v-if="parentDataFour3.length > 1">
                              <img
                                :src="reduceImg"
                                style="cursor: pointer;"
                                @click="deleteChildDataListFour(item.itemName, index, info.serialNumber)"
                              />
                            </template>
                            <template v-if='isActive3 === index'>
                              <img
                                :src="addImg"
                                style="cursor: pointer;"
                                @click="addChildDataListFour3(item.itemName, childDataFour3[index].valueUnit, index, info.mainMaxCount)"
                              />
                            </template>
                            <template v-else>
                              <img
                                :src="unactiveImg"
                              />
                            </template>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                    <template v-if ='info.serialNumber === 5'>
                      <tbody>
                        <tr v-for="(item, index) in parentDataFour5" :key="'item'+index">
                          <td>
                            <input type="text" v-model="item.itemName" placeholder='请填写'>
                          </td>
                          <td>
                            <input type="text" v-model="childDataFour5[index].valueUnit" placeholder='请填写'>
                          </td>
                          <td width='15%'>
                            <template v-if="parentDataFour5.length > 1">
                              <img
                                :src="reduceImg"
                                style="cursor: pointer;"
                                @click="deleteChildDataListFour(item.itemName, index, info.serialNumber)"
                              />
                            </template>
                            <template v-if='isActive5 === index'>
                              <img
                                :src="addImg"
                                style="cursor: pointer;"
                                @click="addChildDataListFour5(item.itemName, childDataFour5[index].valueUnit, index, info.mainMaxCount)"
                              />
                            </template>
                            <template v-else>
                              <img
                                :src="unactiveImg"
                              />
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
                      <tbody v-for="(items, index) in contentItemListFour3" :key="'items'+index">
                        <tr>
                          <span v-show='false'>{{items.plateAreaId = info.plateAreaId}}</span>
                          <td>{{items.itemName}}</td>
                          <td><input type="number" v-model="valueContentFour3[index + '_' + info.serialNumber]" placeholder='请填写'></td>
                          <td><input type="number" v-model="percentValue3[index + '_' + info.serialNumber]" placeholder='请填写'></td>
                        </tr>
                      </tbody>
                    </template>
                    <template v-if ='info.serialNumber === 5'>
                      <tbody v-for="(items, index) in contentItemListFour5" :key="'items'+index">
                        <tr>
                          <span v-show='false'>{{items.plateAreaId = info.plateAreaId}}</span>
                          <td>{{items.itemName}}</td>
                          <td><input type="number" v-model="valueContentFour5[index + '_' + info.serialNumber]" placeholder='请填写'></td>
                          <td><input type="number" v-model="percentValue5[index + '_' + info.serialNumber]" placeholder='请填写'></td>
                        </tr>
                      </tbody>
                    </template>
                  </table>
                </div>
              </div>
            </template>
            <template v-else-if="info.areaDataType === 5">
              <div style="margin-top:5%;">
                <h2 style='font-weight: bold'>位置{{info.serialNumber}}</h2>
                <div class="ecl2-cr-list">
                  <p class="list-title">第一步：添加项</p>
                  <table class="plate-table" style="width: 100%;">
                    <thead>
                    <tr>
                      <th style='border-left: 1px solid #DDDDDD'>项名称</th>
                      <th>单位</th>
                      <th style='border-right: 1px solid #DDDDDD'>操作</th>
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
                            <template v-if="parentDataFour3.length > 1">
                              <img
                                :src="reduceImg"
                                style="cursor: pointer;"
                                @click="deleteChildDataListFour(item.itemName, index, info.serialNumber)"
                              />
                            </template>
                            <template v-if='isActive3 === index'>
                              <img
                                :src="addImg"
                                style="cursor: pointer;"
                                @click="addChildDataListFour3(item.itemName, childDataFour3[index].valueUnit, index, info.mainMaxCount)"
                              />
                            </template>
                            <template v-else>
                              <img
                                :src="unactiveImg"
                              />
                            </template>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                    <template v-if ='info.serialNumber === 5'>
                      <tbody>
                        <tr v-for="(item, index) in parentDataFour5" :key="'item'+index">
                          <td>
                            <input type="text" v-model="item.itemName" placeholder='请填写'>
                          </td>
                          <td>
                            <input type="text" v-model="childDataFour5[index].valueUnit" placeholder='请填写'>
                          </td>
                          <td width='15%'>
                            <template v-if="parentDataFour5.length > 1">
                              <img
                                :src="reduceImg"
                                style="cursor: pointer;"
                                @click="deleteChildDataListFour(item.itemName, index, info.serialNumber)"
                              />
                            </template>
                            <template v-if='isActive5 === index'>
                              <img
                                :src="addImg"
                                style="cursor: pointer;"
                                @click="addChildDataListFour5(item.itemName, childDataFour5[index].valueUnit, index, info.mainMaxCount)"
                              />
                            </template>
                            <template v-else>
                              <img
                                :src="unactiveImg"
                              />
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
                      <!-- <th>同比值(%)</th> -->
                    </tr>
                    </thead>
                    <template v-if ='info.serialNumber === 3'>
                      <tbody v-for="(items, index) in contentItemListFour3" :key="'items'+index">
                        <tr>
                          <span v-show='false'>{{items.plateAreaId = info.plateAreaId}}</span>
                          <td>{{items.itemName}}</td>
                          <td><input type="number" v-model="valueContentFour3[index + '_' + info.serialNumber]" placeholder='请填写'></td>
                          <!-- <td><input type="text" v-model="percentValue3[index + '_' + info.serialNumber]" placeholder='请填写'></td> -->
                        </tr>
                      </tbody>
                    </template>
                    <template v-if ='info.serialNumber === 5'>
                      <tbody v-for="(items, index) in contentItemListFour5" :key="'items'+index">
                        <tr>
                          <span v-show='false'>{{items.plateAreaId = info.plateAreaId}}</span>
                          <td>{{items.itemName}}</td>
                          <td><input type="number" v-model="valueContentFour5[index + '_' + info.serialNumber]" placeholder='请填写'></td>
                          <!-- <td><input type="text" v-model="percentValue5[index + '_' + info.serialNumber]" placeholder='请填写'></td> -->
                        </tr>
                      </tbody>
                    </template>
                  </table>
                </div>
              </div>
            </template>
          </template>
        </div>
        <span style='color:#F8560F;font-size:12px;margin-top:2%;display: inline-block'>如不按样式注解图填写，有可能会展示不正常</span>
      </div>
    </div>
  </div>
  <div class="plate-ecl-b">
    <span style='color:red;float:left;margin-left:5%'>{{tip}}</span>
    <el-button id='preBtn' @click.native="preStep">&nbsp;&nbsp;&nbsp;&nbsp;上一步&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
    <el-button @click.native="nextStep('dataForm')" type="primary" class='selectBtn'>&nbsp;&nbsp;&nbsp;&nbsp;完成&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
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
      maxlength: 20,
      addImg: require('../../../../assets/img/temp/add.png'),
      reduceImg: require('../../../../assets/img/temp/reduce.png'),
      unactiveImg: require('../../../../assets/img/temp/unactiveAdd.png'),
      rules: {
        plateName: [{
          required: true,
          message: '请输入版块名称',
          trigger: 'blur'
        }]
      },
      configCount: 0,
      plateInfoList: [],
      configCountFour: 1,
      plateAreaId: {},
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
      valueContentFour3: {},
      valueContentFour5: {},
      percentValue3: {}, // 类型四的同比值
      percentValue5: {}, // 类型四的同比值
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
        plateId: '',
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
    },
    parentDataFour3: {
      handler: function (newVal) {
        this.contentItemListFour3.map((items, index) => {
          items.itemName = this.parentDataFour3[index].itemName;
          items.contentSubItemList.map((item, idx) => {
            if (item.serialNumber === 1) {
              item.contentName = this.parentDataFour3[index].itemName;
              item.valueUnit = this.childDataFour3[idx].valueUnit;
              item.valueContent = this.childDataFour3[idx].valueContent;
            }
          });
        });
        this.parentDataFour3.map((item, index) => {
          this.childDataFour3[index].contentName = item.itemName;
        });
      },
      deep: true
    },
    parentDataFour5: {
      handler: function (newVal) {
        this.contentItemListFour5.map((items, index) => {
          items.itemName = this.parentDataFour5[index].itemName;
          items.contentSubItemList.map((item, idx) => {
            if (item.serialNumber === 1) {
              item.contentName = this.parentDataFour5[index].itemName;
              item.valueUnit = this.childDataFour5[idx].valueUnit;
              item.valueContent = this.childDataFour5[idx].valueContent;
            }
          });
        });
        this.parentDataFour5.map((item, index) => {
          this.childDataFour5[index].contentName = item.itemName;
        });
      },
      deep: true
    },
    childDataFour3: {
      handler: function (newVal) {
        this.contentItemListFour3.map((item, index) => {
          item.contentSubItemList.map((value, idx) => {
            if (value.serialNumber === 1) {
              value.valueUnit = this.childDataFour3[idx].valueUnit;
              value.valueContent = this.childDataFour3[idx].valueContent;
            }
          });
        });
      },
      deep: true
    },
    childDataFour5: {
      handler: function (newVal) {
        this.contentItemListFour5.map((item, index) => {
          item.contentSubItemList.map((value, idx) => {
            if (value.serialNumber === 1) {
              value.valueUnit = this.childDataFour5[idx].valueUnit;
              value.valueContent = this.childDataFour5[idx].valueContent;
            }
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
    nextStep (dataForm) {
      this.dataObjTwo[0].contentItemList = [];
      let data = {}, numberFour3 = [], numberFour5 = [];
      for (let i in this.valueContentFour3) {
        numberFour3.push(this.valueContentFour3[i]);
      }
      for (let i in this.valueContentFour5) {
        numberFour5.push(this.valueContentFour5[i]);
      }
      let objFour3 = JSON.parse(JSON.stringify(this.contentItemListFour3));
      let objFour5 = JSON.parse(JSON.stringify(this.contentItemListFour5));
      objFour3.map((items, index) => {
        items.contentSubItemList.map((item, idx) => {
          item.valueContent = numberFour3[index];
        });
      });
      objFour5.map((items, index) => {
        items.contentSubItemList.map((item, idx) => {
          item.valueContent = numberFour5[index];
        });
      });
      this.contentItemListFour3 = objFour3;
      this.contentItemListFour5 = objFour5;
      for (let i in this.itemName) {
        let str = i.split('_');
        if (this.percentValueOne[i] !== undefined) {
          data = {
            itemName: this.itemName[i],
            serialNumber: ++this.indexValue,
            plateAreaId: this.plateAreaId[parseInt(str[1])],
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
            plateAreaId: this.plateAreaId[parseInt(str[1])],
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
      this.contentItemListFour3.map((items, index) => {
        items.serialNumber = this.dataObjTwo[0].contentItemList.length + 1;
        if (items.contentSubItemList.length > 1) {
          items.contentSubItemList.map((item, idx) => {
            if (item.serialNumber === 2) {
              for (let i in this.percentValue3) {
                let str = i.split('_');
                if (parseInt(str[0]) === index) {
                  item.valueContent = this.percentValue3[i];
                }
              }
            }
          });
          for (let i in this.percentValue3) {
            let str = i.split('_');
            if (parseInt(str[0]) === index) {
              if (this.percentValue3[i] === '') {
                this.contentItemListFour3[index].contentSubItemList.splice(1, 1);
              }
            }
          }
        } else {
          for (let i in this.percentValue3) {
            let str = i.split('_');
            if (parseInt(str[0]) === index) {
              if (this.percentValue3[i] !== '') {
                const data = {
                  contentName: '',
                  valueContent: this.percentValue3[i],
                  valueUnit: '%',
                  graphicFieldFlag: false,
                  supernatantFieldFlag: false,
                  sumFlag: false,
                  serialNumber: 2,
                  contnetSubItemExtendList: [],
                  isPercent: true
                }
                items.contentSubItemList.push(data);
              }
            }
          }
        }
        if (items.itemName !== '') {
          this.dataObjTwo[0].contentItemList.push(items);
        }
      });
      this.contentItemListFour5.map((items, index) => {
        items.serialNumber = this.dataObjTwo[0].contentItemList.length + 1;
        if (items.contentSubItemList.length > 1) {
          items.contentSubItemList.map((item, idx) => {
            if (item.serialNumber === 2) {
              for (let i in this.percentValue5) {
                let str = i.split('_');
                if (parseInt(str[0]) === index) {
                  item.valueContent = this.percentValue5[i];
                }
              }
            }
          });
          for (let i in this.percentValue5) {
            let str = i.split('_');
            if (parseInt(str[0]) === index) {
              if (this.percentValue5[i] === '') {
                this.contentItemListFour5[index].contentSubItemList.splice(1, 1);
              }
            }
          }
        } else {
          for (let i in this.percentValue5) {
            let str = i.split('_');
            if (parseInt(str[0]) === index) {
              if (this.percentValue5[i] !== '') {
                const data = {
                  contentName: '',
                  valueContent: this.percentValue5[i],
                  valueUnit: '%',
                  graphicFieldFlag: false,
                  supernatantFieldFlag: false,
                  sumFlag: false,
                  serialNumber: 2,
                  contnetSubItemExtendList: [],
                  isPercent: true
                }
                items.contentSubItemList.push(data);
              }
            }
          }
        }
        if (items.itemName !== '') {
          this.dataObjTwo[0].contentItemList.push(items);
        }
      });
      this.contentItemListOne.map((item) => {
        item.serialNumber = this.dataObjTwo[0].contentItemList.length + 1;
        if (item.itemName !== '') {
          this.dataObjTwo[0].contentItemList.push(item);
        }
      });
      this.dataObjTwo[0].positionId = this.dataList.positionId;
      this.dataObjTwo[0].pageId = this.dataList.pageId;
      this.dataObjTwo[0].jumpPageId = this.dataList.jumpPageId;
      this.dataObjTwo[0].plateId = this.dataList.plateId;
      if (this.dataObjTwo[0].contentItemList.length > 0) {
        const params = {
          visPlates: this.dataObjTwo
        }
        this.$refs[dataForm].validate((valid) => {
          if (valid) {
            this.tip = '';
            this.axios.put('/plateServices/platesBatch', params.visPlates)
              .then((res) => {
                if (res) {
                  if (res.data.length > 0) {
                    this.$message({
                      showClose: true,
                      message: '修改版块成功',
                      type: 'success'
                    });
                    this.$store.commit('setProgressIndex', {progressIndex: 4});
                    this.$router.push({name: 'plate-list'});
                  } else {
                    this.$message({
                      showClose: true,
                      message: '修改版块失败',
                      type: 'error'
                    });
                  }
                }
              })
              .catch(() => {});
          } else {
            this.tip = '请输入版块名称';
          }
        });
      }
    },
    addChildDataListFour3 (name, unit, idx, maxNumber) { // 类型四添加项
      const length = this.parentDataFour3.length;
      if (name || unit) {
        if (length < maxNumber) {
          const parentData = {
            itemName: '',
            serialNumber: this.contentItemListFour3.length + 1,
            plateAreaId: this.contentItemListFour3[0].plateAreaId
          }
          const childData = {
            contentName: '',
            valueContent: '',
            valueUnit: '',
            graphicFieldFlag: false,
            supernatantFieldFlag: false,
            sumFlag: false,
            serialNumber: 1,
            contnetSubItemExtendList: []
          }
          const data = {
            itemName: '',
            serialNumber: this.contentItemListFour3.length + 1,
            plateAreaId: this.contentItemListFour3[0].plateAreaId,
            contentSubItemList: [{
              contentName: '',
              valueContent: '',
              valueUnit: '',
              graphicFieldFlag: false,
              supernatantFieldFlag: false,
              sumFlag: false,
              serialNumber: 1,
              contnetSubItemExtendList: []
            }]
          }
          this.parentDataFour3.push(parentData);
          this.childDataFour3.push(childData);
          this.contentItemListFour3.push(data);
          this.isActive3 = idx + 1;
        } else {
          this.tip = '项可添加条数已达到上线';
        }
      } else {
        this.tip = '请先填写信息';
      }
    },
    addChildDataListFour5 (name, unit, idx, maxNumber) { // 类型四添加项
      const length = this.parentDataFour5.length;
      if (name || unit) {
        if (length < maxNumber) {
          const parentData = {
            itemName: '',
            serialNumber: this.contentItemListFour5.length + 1,
            plateAreaId: this.contentItemListFour5[0].plateAreaId
          }
          const childData = {
            contentName: '',
            valueContent: '',
            valueUnit: '',
            graphicFieldFlag: false,
            supernatantFieldFlag: false,
            sumFlag: false,
            serialNumber: 1,
            contnetSubItemExtendList: []
          }
          const data = {
            itemName: '',
            serialNumber: this.contentItemListFour5.length + 1,
            plateAreaId: this.contentItemListFour5[0].plateAreaId,
            contentSubItemList: [{
              contentName: '',
              valueContent: '',
              valueUnit: '',
              graphicFieldFlag: false,
              supernatantFieldFlag: false,
              sumFlag: false,
              serialNumber: 1,
              contnetSubItemExtendList: []
            }]
          }
          this.parentDataFour5.push(parentData);
          this.childDataFour5.push(childData);
          this.contentItemListFour5.push(data);
          this.isActive5 = idx + 1;
        } else {
          this.tip = '项可添加条数已达到上线';
        }
      } else {
        this.tip = '请先填写信息';
      }
    },
    deleteChildDataListFour (name, idx, sortNumber) { // 类型四的删除项
      if (sortNumber === 3) {
        this.parentDataFour3.splice(idx, 1);
        this.childDataFour3.splice(idx, 1);
        this.contentItemListFour3.map((item, index) => {
          if (item.itemName === name) {
            this.contentItemListFour3.splice(idx, 1);
          }
        });
        let valueFour3 = {}, percentFour3 = {};
        this.contentItemListFour3.map((item, index) => {
          valueFour3[index + '_' + sortNumber] = item.contentSubItemList[0].valueContent;
          percentFour3[index + '_' + sortNumber] = item.contentSubItemList[1].valueContent;
        });
        this.valueContentFour3 = valueFour3;
        this.percentValue3 = percentFour3;
        this.isActive3 = this.parentDataFour3.length - 1;
      } else if (sortNumber === 5) {
        this.parentDataFour5.splice(idx, 1);
        this.childDataFour5.splice(idx, 1);
        this.contentItemListFour5.map((item, index) => {
          if (item.itemName === name) {
            this.contentItemListFour5.splice(idx, 1);
          }
        });
        let valueFour5 = {}, percentFour5 = {};
        this.contentItemListFour5.map((item, index) => {
          valueFour5[index + '_' + sortNumber] = item.contentSubItemList[0].valueContent;
          percentFour5[index + '_' + sortNumber] = item.contentSubItemList[1].valueContent;
        });
        this.valueContentFour5 = valueFour5;
        this.percentValue5 = percentFour5;
        this.isActive5 = this.parentDataFour5.length - 1;
      }
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
                        items.contentItemList.map((item, index) => {
                          item.plateAreaId = items.plateAreaId;
                          if (items.serialNumber === 3) {
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
                                  this.percentValue3[index + '_' + items.serialNumber] = value.valueContent;
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
                                  this.valueContentFour3[index + '_' + items.serialNumber] = value.valueContent;
                                  this.childDataFour3.push(childData);
                                }
                              });
                            }
                          } else if (items.serialNumber === 5) {
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
                                  this.percentValue5[index + '_' + items.serialNumber] = value.valueContent;
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
                                  this.valueContentFour5[index + '_' + items.serialNumber] = value.valueContent;
                                  this.childDataFour5.push(childData);
                                }
                              });
                            }
                          }
                        });
                        if (items.serialNumber === 3) {
                          this.contentItemListFour3 = JSON.parse(JSON.stringify(items.contentItemList));
                          this.isActive3 = this.parentDataFour3.length - 1;
                        } else if (items.serialNumber === 5) {
                          this.contentItemListFour5 = JSON.parse(JSON.stringify(items.contentItemList));
                          this.isActive5 = this.parentDataFour5.length - 1;
                        }
                      } else {
                        const parentData = {
                          itemName: '',
                          plateAreaId: '',
                          serialNumber: 1
                        }
                        const childData = {
                          contentName: '',
                          valueContent: '',
                          valueUnit: '',
                          serialNumber: 1,
                          graphicFieldFlag: true,
                          supernatantFieldFlag: true,
                          sumFlag: false
                        }
                        const data = {
                          itemName: '',
                          plateAreaId: '',
                          serialNumber: 1,
                          contentSubItemList: [{
                            contentName: '',
                            valueContent: '',
                            valueUnit: '',
                            serialNumber: 1,
                            graphicFieldFlag: true,
                            supernatantFieldFlag: true,
                            sumFlag: false
                          }]
                        }
                        if (items.serialNumber === 3) {
                          this.parentDataFour3.push(parentData);
                          this.childDataFour3.push(childData);
                          this.contentItemListFour3.push(data);
                          this.isActive3 = 0;
                        } else if (items.serialNumber === 5) {
                          this.parentDataFour5.push(parentData);
                          this.childDataFour5.push(childData);
                          this.contentItemListFour5.push(data);
                          this.isActive5 = 0;
                        }
                      }
                    } else if (items.areaDataType === 5) {
                      if (items.contentItemList.length > 0) {
                        items.contentItemList.map((item, index) => {
                          item.plateAreaId = items.plateAreaId;
                          if (items.serialNumber === 3) {
                            let childData;
                            const data = {
                              itemName: item.itemName,
                              plateAreaId: items.plateAreaId,
                              serialNumber: item.serialNumber
                            }
                            this.parentDataFour3.push(data);
                            if (item.contentSubItemList.length > 0) {
                              item.contentSubItemList.map((value, idx) => {
                                // if (value.serialNumber === 2) {
                                //   this.percentValue3[index + '_' + items.serialNumber] = value.valueContent;
                                // } else {
                                childData = {
                                  contentName: value.contentName,
                                  valueContent: value.valueContent,
                                  valueUnit: value.valueUnit,
                                  serialNumber: value.serialNumber,
                                  graphicFieldFlag: value.graphicFieldFlag,
                                  supernatantFieldFlag: value.supernatantFieldFlag,
                                  sumFlag: value.sumFlag
                                }
                                this.valueContentFour3[index + '_' + items.serialNumber] = value.valueContent;
                                this.childDataFour3.push(childData);
                                // }
                              });
                            }
                          } else if (items.serialNumber === 5) {
                            let childData;
                            const data = {
                              itemName: item.itemName,
                              plateAreaId: items.plateAreaId,
                              serialNumber: item.serialNumber
                            }
                            this.parentDataFour5.push(data);
                            if (item.contentSubItemList.length > 0) {
                              item.contentSubItemList.map((value, idx) => {
                                // if (value.serialNumber === 2) {
                                //   this.percentValue5[index + '_' + items.serialNumber] = value.valueContent;
                                // } else {
                                childData = {
                                  contentName: value.contentName,
                                  valueContent: value.valueContent,
                                  valueUnit: value.valueUnit,
                                  serialNumber: value.serialNumber,
                                  graphicFieldFlag: value.graphicFieldFlag,
                                  supernatantFieldFlag: value.supernatantFieldFlag,
                                  sumFlag: value.sumFlag
                                }
                                this.valueContentFour5[index + '_' + items.serialNumber] = value.valueContent;
                                this.childDataFour5.push(childData);
                                // }
                              });
                            }
                          }
                        });
                        if (items.serialNumber === 3) {
                          this.contentItemListFour3 = JSON.parse(JSON.stringify(items.contentItemList));
                          this.isActive3 = this.parentDataFour3.length - 1;
                        } else if (items.serialNumber === 5) {
                          this.contentItemListFour5 = JSON.parse(JSON.stringify(items.contentItemList));
                          this.isActive5 = this.parentDataFour5.length - 1;
                        }
                      } else {
                        const parentData = {
                          itemName: '',
                          plateAreaId: '',
                          serialNumber: 1
                        }
                        const childData = {
                          contentName: '',
                          valueContent: '',
                          valueUnit: '',
                          serialNumber: 1,
                          graphicFieldFlag: true,
                          supernatantFieldFlag: true,
                          sumFlag: false
                        }
                        const data = {
                          itemName: '',
                          plateAreaId: '',
                          serialNumber: 1,
                          contentSubItemList: [{
                            contentName: '',
                            valueContent: '',
                            valueUnit: '',
                            serialNumber: 1,
                            graphicFieldFlag: true,
                            supernatantFieldFlag: true,
                            sumFlag: false
                          }]
                        }
                        if (items.serialNumber === 3) {
                          this.parentDataFour3.push(parentData);
                          this.childDataFour3.push(childData);
                          this.contentItemListFour3.push(data);
                          this.isActive3 = 0;
                        } else if (items.serialNumber === 5) {
                          this.parentDataFour5.push(parentData);
                          this.childDataFour5.push(childData);
                          this.contentItemListFour5.push(data);
                          this.isActive5 = 0;
                        }
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
  .selectBtn {
    background: -webkit-linear-gradient(#07BAFD, #0785FD); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#07BAFD, #0785FD); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#07BAFD, #0785FD); /* Firefox 3.6 - 15 */
    background: linear-gradient(#07BAFD, #0785FD); /* 标准的语法 */
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
    >tbody td input {
      width: 100% !important;
      min-width: 25% !important;
      text-align: left;
    }
    >thead th {
      font-weight: 400 !important;
      font-size: 14px;
      background-color: #F7F7F7 !important;
    }
    thead th, tbody tr, thead tr th, tbody tr td {
      text-align: left;
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
