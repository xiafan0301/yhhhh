<template>
<div class="bg-plate-ecl bg-plate-ecl2" v-show="this.$store.state.progressIndex === 3" style='width:100%'>
  <div class="plate-ecl2-c clearfix">
    <h2>图表数据</h2>
    <div class="plate-ecl2-cl">
      <img :src="this.$store.state.plateInfo.markUrl" alt="" style="width:100%">
    </div>
    <div class="plate-ecl2-cr">
      <div class='position-select'>
        <div>
          <span>位置1</span>
          <el-select v-model='relationValue1' :class="{isActive: borderActive === 1}" placeholder="选择数据组件" @change="changeMapType1">
            <el-option value=''>请选择数据组件</el-option>
            <el-option
              v-for='item in mapTypeList1'
              :key='item.dataTypeId'
              :value='item.typeName'
              :disabled="item.isDisabled"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <span>位置2</span>
          <el-select :disabled="isDisabled2" v-model="relationValue2" :class="{isActive: borderActive === 2}" placeholder="选择数据组件" @change='changeMapType2'>
            <el-option value=''>请选择数据组件</el-option>
            <el-option
              v-for='item in mapTypeList2'
              :key='item.dataTypeId'
              :value='item.typeName'
              :disabled="item.isDisabled"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <span>位置3</span>
          <el-select :disabled="isDisabled3" v-model="relationValue3" :class="{isActive: borderActive === 3}" placeholder="选择数据组件" @change='changeMapType3'>
            <el-option value=''>请选择数据组件</el-option>
            <el-option
              v-for='item in mapTypeList3'
              :key='item.dataTypeId'
              :value='item.typeName'
              :disabled="item.isDisabled"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <span>位置4</span>
          <el-select :disabled="isDisabled4" v-model="relationValue4" :class="{isActive: borderActive === 4}" placeholder="选择数据组件" @change='changeMapType4'>
            <el-option value=''>请选择数据组件</el-option>
            <el-option
              v-for='item in mapTypeList4'
              :key='item.dataTypeId'
              :value='item.typeName'
              :disabled="item.isDisabled"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class='position-table'>
        <div class='navigation'>
          <ul>
            <li :class='{activeLi: isChanged === 1}' @click='handleClick(1)'>位置1信息</li>
            <li :class='{activeLi: isChanged === 2}' @click='handleClick(2)'>位置2信息</li>
            <li :class='{activeLi: isChanged === 3}' @click='handleClick(3)'>位置3信息</li>
            <li :class='{activeLi: isChanged === 4}' @click='handleClick(4)'>位置4信息</li>
          </ul>
        </div>
        <div class='table-content'>
          <template v-if='isChanged === 1'>
            <table class="plate-table" style="width: 100%;">
              <thead>
              <tr>
                <th>排序</th>
                <th>项</th>
                <th>单位</th>
                <th>值</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in dataList1" :key="'item'+index">
                  <td>{{index + 1}}</td>
                  <td>
                    <input type="text" v-model="item.name" placeholder="请填项名称">
                  </td>
                  <td>
                    <input type="text" v-model="item.unit" placeholder="请填单位">
                  </td>
                  <td>
                    <input type="text" v-model="item.value" placeholder="请填值">
                  </td>
                  <td width='15%'>
                    <template v-if="dataList1.length > 1">
                      <i
                        style="font-size: 25px; cursor: pointer; color: #DDDDDD;"
                        class="active el-icon-remove-outline"
                        @click="deleteDataListOne(item.name, index)"
                        title="删除此项"
                      >
                      </i>
                    </template>
                    <i
                      style="font-size: 25px; cursor: pointer;  color: #0785FD;"
                      class="el-icon-circle-plus-outline"
                      :class="[isActive1 === index ? 'active' : 'unactive']"
                      @click="addDataListOne(item.name, item.value, item.unit, index)"
                      title="新增项"
                    >
                    </i>
                  </td>
                </tr>
              </tbody>
            </table>
            <p class="tip" style="color:red;">{{tip}}</p>
          </template>
          <template v-if='isChanged === 2'>
            <table class="plate-table" style="width: 100%;">
              <thead>
              <tr>
                <th>排序</th>
                <th>项</th>
                <th>单位</th>
                <th>值</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in dataList2" :key="'item'+index">
                  <td>{{index + 1}}</td>
                  <td>
                    <input type="text" v-model="item.name" placeholder="请填项名称">
                  </td>
                  <td>
                    <input type="text" v-model="item.unit" placeholder="请填单位">
                  </td>
                  <td>
                    <input type="text" v-model="item.value" placeholder="请填值">
                  </td>
                  <td width='15%'>
                    <template v-if="dataList2.length > 1">
                      <i
                        style="font-size: 25px; cursor: pointer; color: #DDDDDD;"
                        class="active el-icon-remove-outline"
                        @click="deleteDataListTwo(item.name, index)"
                        title="删除此项"
                      >
                      </i>
                    </template>
                    <i
                      style="font-size: 25px; cursor: pointer;  color: #0785FD;"
                      class="el-icon-circle-plus-outline"
                      :class="[isActive2 === index ? 'active' : 'unactive']"
                      @click="addDataListTwo(item.name, item.value, item.unit, index)"
                      title="新增项"
                    >
                    </i>
                  </td>
                </tr>
              </tbody>
            </table>
            <p class="tip" style="color:red;">{{tip}}</p>
          </template>
          <template v-if='isChanged === 3'>
            <table class="plate-table" style="width: 100%;">
              <thead>
              <tr>
                <th>排序</th>
                <th>项</th>
                <th>单位</th>
                <th>值</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in dataList3" :key="'item'+index">
                  <td>{{index + 1}}</td>
                  <td>
                    <input type="text" v-model="item.name" placeholder="请填项名称">
                  </td>
                  <td>
                    <input type="text" v-model="item.unit" placeholder="请填单位">
                  </td>
                  <td>
                    <input type="text" v-model="item.value" placeholder="请填值">
                  </td>
                  <td width='15%'>
                    <template v-if="dataList3.length > 1">
                      <i
                        style="font-size: 25px; cursor: pointer; color: #DDDDDD;"
                        class="active el-icon-remove-outline"
                        @click="deleteDataListThree(item.name, index)"
                        title="删除此项"
                      >
                      </i>
                    </template>
                    <i
                      style="font-size: 25px; cursor: pointer;  color: #0785FD;"
                      class="el-icon-circle-plus-outline"
                      :class="[isActive3 === index ? 'active' : 'unactive']"
                      @click="addDataListThree(item.name, item.value, item.unit, index)"
                      title="新增项"
                    >
                    </i>
                  </td>
                </tr>
              </tbody>
            </table>
            <p class="tip" style="color:red;">{{tip}}</p>
          </template>
          <template v-if='isChanged === 4'>
            <table class="plate-table" style="width: 100%;">
              <thead>
              <tr>
                <th>排序</th>
                <th>项</th>
                <th>单位</th>
                <th>值</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in dataList4" :key="'item'+index">
                  <td>{{index + 1}}</td>
                  <td>
                    <input type="text" v-model="item.name" placeholder="请填项名称">
                  </td>
                  <td>
                    <input type="text" v-model="item.unit" placeholder="请填单位">
                  </td>
                  <td>
                    <input type="text" v-model="item.value" placeholder="请填值">
                  </td>
                  <td width='15%'>
                    <template v-if="dataList4.length > 1">
                      <i
                        style="font-size: 25px; cursor: pointer; color: #DDDDDD;"
                        class="active el-icon-remove-outline"
                        @click="deleteDataListFour(item.name, index)"
                        title="删除此项"
                      >
                      </i>
                    </template>
                    <i
                      style="font-size: 25px; cursor: pointer;  color: #0785FD;"
                      class="el-icon-circle-plus-outline"
                      :class="[isActive4 === index ? 'active' : 'unactive']"
                      @click="addDataListFour(item.name, item.value, item.unit, index)"
                      title="新增项"
                    >
                    </i>
                  </td>
                </tr>
              </tbody>
            </table>
            <p class="tip" style="color:red;">{{tip}}</p>
          </template>
        </div>
      </div>
    </div>
  </div>
  <div class="plate-ecl-b">
    <el-button id='preBtn' @click.native="preStep">&nbsp;&nbsp;&nbsp;&nbsp;上一步&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
    <el-button @click.native="nextStep" type="primary" class='selectBtn'>&nbsp;&nbsp;&nbsp;&nbsp;完成&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
  </div>
</div>
</template>
<script>
import store from '../../../../store/store.js';
export default {
  props: ['mapDataList'],
  data () {
    return {
      tip: '',
      borderActive: 1,
      isActive1: 0,
      isActive2: 0,
      isActive3: 0,
      isActive4: 0,
      isChanged: 1,
      relationValue1: '',
      relationValue2: '',
      relationValue3: '',
      relationValue4: '',
      typeId1: '',
      typeId2: '',
      typeId3: '',
      typeId4: '',
      plateId1: '',
      plateId2: '',
      plateId3: '',
      plateId4: '',
      displayType1: '',
      displayType2: '',
      displayType3: '',
      displayType4: '',
      isDisabled4: true,
      isDisabled3: true,
      isDisabled2: true,
      positionId1: '',
      positionId2: '',
      positionId3: '',
      positionId4: '',
      positionList: [],
      mapTypeList1: [], // 位置1地图应用类型列表
      mapTypeList2: [], // 位置2地图应用类型列表
      mapTypeList3: [], // 位置3地图应用类型列表
      mapTypeList4: [], // 位置4地图应用类型列表
      dataList1: [], // 位置1的表格数据
      dataList2: [], // 位置2的表格数据
      dataList3: [], // 位置3的表格数据
      dataList4: [], // 位置4的表格数据
      positionIdList: []
    }
  },
  watch: {
    mapDataList (newVal) {
      this.mapDataList = Object.assign(this.mapDataList, newVal);
      if (this.mapDataList.length > 0) {
        this.mapDataList.map((items, index) => {
          const serialNumber = items.visPagePlate.visPlatePosition.serialNumber;
          if (serialNumber === 31) {
            this.relationValue1 = items.plateName;
            this.isDisabled2 = false;
            this.typeId1 = items.typeId;
            this.displayType1 = items.displayType;
            this.plateId1 = items.plateId;
          } else if (serialNumber === 32) {
            this.relationValue2 = items.plateName;
            this.isDisabled3 = false;
            this.typeId2 = items.typeId;
            this.plateId2 = items.plateId;
            this.displayType2 = items.displayType;
          } else if (serialNumber === 33) {
            this.relationValue3 = items.plateName;
            this.isDisabled4 = false;
            this.typeId3 = items.typeId;
            this.plateId3 = items.plateId;
            this.displayType3 = items.displayType;
          } else if (serialNumber === 34) {
            this.relationValue4 = items.plateName;
            this.plateId4 = items.plateId;
            this.typeId4 = items.typeId;
            this.displayType4 = items.displayType;
          }
          if (items.areaInfoList) {
            if (items.areaInfoList[0].contentItemList.length > 0) {
              items.areaInfoList[0].contentItemList.map((item, idx) => {
                const data = {
                  name: item.itemName,
                  value: item.contentSubItemList[0].valueContent,
                  unit: item.contentSubItemList[0].valueUnit
                }
                if (serialNumber === 31) {
                  this.dataList1.push(data);
                  this.isActive1 = items.areaInfoList[0].contentItemList.length - 1;
                } else if (serialNumber === 32) {
                  this.dataList2.push(data);
                  this.isActive2 = items.areaInfoList[0].contentItemList.length - 1;
                } else if (serialNumber === 33) {
                  this.dataList3.push(data);
                  this.isActive3 = items.areaInfoList[0].contentItemList.length - 1;
                } else if (serialNumber === 34) {
                  this.dataList4.push(data);
                  this.isActive4 = items.areaInfoList[0].contentItemList.length - 1;
                }
              });
            }
          }
        });
      } else {
        this.relationValue1 = '';
        this.relationValue2 = '';
        this.relationValue3 = '';
        this.relationValue4 = '';
        this.dataList1 = [];
        this.dataList2 = [];
        this.dataList3 = [];
        this.dataList4 = [];
      }
    }
  },
  mounted () {
    this.axios.get('/mapServices/dataTypes')
      .then((res) => {
        if (res) {
          this.mapTypeList1 = res.data;
          this.mapTypeList2 = res.data;
          this.mapTypeList3 = res.data;
          this.mapTypeList4 = res.data;
        }
      })
      .catch(() => {})
    this.axios.get('/plateServices/positions')
      .then((res) => {
        if (res) {
          if (res.data.length > 0) {
            res.data.map((item) => {
              if (item.serialNumber.toString().substr(0, 1) === '3') {
                this.positionIdList.push(item);
              }
            });
          }
        }
      })
      .catch(() => {})
  },
  methods: {
    handleClick (index) {
      this.isChanged = index;
      this.borderActive = index;
    },
    preStep () {
      this.$store.commit('setProgressIndex', {progressIndex: 2});
    },
    nextStep () {
      let totalDataList = [];
      this.positionIdList.map((item, index) => {
        if (item.serialNumber === 31) {
          this.positionId1 = item.positionId;
        } else if (item.serialNumber === 32) {
          this.positionId2 = item.positionId;
        } else if (item.serialNumber === 33) {
          this.positionId3 = item.positionId;
        } else if (item.serialNumber === 34) {
          this.positionId4 = item.positionId;
        }
      });
      let dataArrOne = {
        pageId: this.$store.state.mapPageId,
        configId: this.$store.state.plateInfo.configId,
        plateName: this.relationValue1,
        remark: '',
        plateType: 2,
        plateId: this.plateId1,
        positionId: this.positionId1,
        jumpPageId: '',
        displayType: this.displayType1,
        typeId: this.typeId1,
        contentItemList: []
      };
      let dataArrTwo = {
        pageId: this.$store.state.mapPageId,
        configId: this.$store.state.plateInfo.configId,
        plateName: this.relationValue2,
        remark: '',
        plateType: 2,
        plateId: this.plateId2,
        positionId: this.positionId2,
        jumpPageId: '',
        displayType: this.displayType2,
        typeId: this.typeId2,
        contentItemList: []
      };
      let dataArrThree = {
        pageId: this.$store.state.mapPageId,
        configId: this.$store.state.plateInfo.configId,
        plateName: this.relationValue3,
        remark: '',
        positionId: this.positionId3,
        jumpPageId: '',
        plateId: this.plateId3,
        plateType: 2,
        displayType: this.displayType3,
        typeId: this.typeId3,
        contentItemList: []
      };
      let dataArrFour = {
        pageId: this.$store.state.mapPageId,
        configId: this.$store.state.plateInfo.configId,
        plateName: this.relationValue4,
        plateId: this.plateId4,
        remark: '',
        positionId: this.positionId4,
        jumpPageId: '',
        plateType: 2,
        displayType: this.displayType4,
        typeId: this.typeId4,
        contentItemList: []
      };
      this.dataList1.map((item, index) => {
        if (item.name || item.value || item.unit) {
          const data = {
            itemName: item.name,
            plateAreaId: this.$store.state.plateConfigInfo[0].plateAreaId,
            serialNumber: index + 1,
            contentSubItemList: [{
              contentName: item.name,
              valueContent: item.value,
              valueUnit: item.unit,
              serialNumber: 1,
              graphicFieldFlag: false,
              supernatantFieldFlag: false,
              sumFlag: false,
              contnetSubItemExtendList: []
            }]
          }
          dataArrOne.contentItemList.push(data);
        }
      });
      this.dataList2.map((item, index) => {
        if (item.name || item.value || item.unit) {
          const data = {
            itemName: item.name,
            plateAreaId: this.$store.state.plateConfigInfo[0].plateAreaId,
            serialNumber: index + 1,
            contentSubItemList: [{
              contentName: item.name,
              valueContent: item.value,
              valueUnit: item.unit,
              serialNumber: 1,
              graphicFieldFlag: false,
              supernatantFieldFlag: false,
              sumFlag: false,
              contnetSubItemExtendList: []
            }]
          }
          dataArrTwo.contentItemList.push(data);
        }
      });
      this.dataList3.map((item, index) => {
        if (item.name || item.value || item.unit) {
          const data = {
            itemName: item.name,
            plateAreaId: this.$store.state.plateConfigInfo[0].plateAreaId,
            serialNumber: index + 1,
            contentSubItemList: [{
              contentName: item.name,
              valueContent: item.value,
              valueUnit: item.unit,
              serialNumber: 1,
              graphicFieldFlag: false,
              supernatantFieldFlag: false,
              sumFlag: false,
              contnetSubItemExtendList: []
            }]
          }
          dataArrThree.contentItemList.push(data);
        }
      });
      this.dataList4.map((item, index) => {
        if (item.name || item.value || item.unit) {
          const data = {
            itemName: item.name,
            plateAreaId: this.$store.state.plateConfigInfo[0].plateAreaId,
            serialNumber: index + 1,
            contentSubItemList: [{
              contentName: item.name,
              valueContent: item.value,
              valueUnit: item.unit,
              serialNumber: 1,
              graphicFieldFlag: false,
              supernatantFieldFlag: false,
              sumFlag: false,
              contnetSubItemExtendList: []
            }]
          }
          dataArrFour.contentItemList.push(data);
        }
      });
      if (dataArrFour.contentItemList.length > 0) {
        totalDataList.push(dataArrFour);
      }
      if (dataArrThree.contentItemList.length > 0) {
        totalDataList.push(dataArrThree);
      }
      if (dataArrTwo.contentItemList.length > 0) {
        totalDataList.push(dataArrTwo);
      }
      if (dataArrOne.contentItemList.length > 0) {
        totalDataList.push(dataArrOne);
      }
      const params = {
        visPlates: totalDataList
      }
      this.axios.put('/plateServices/platesBatch', params.visPlates)
        .then((res) => {
          if (res) {
            if (res.data.length > 0) {
              this.$message({
                showClose: true,
                message: '添加版块成功',
                type: 'success'
              });
              this.$router.push({name: 'plate-list'});
              this.$store.commit('setProgressIndex', {progressIndex: 4});
            } else {
              this.$message({
                showClose: true,
                message: '添加版块失败',
                type: 'error'
              });
            }
          }
        })
        .catch(() => {});
    },
    changeMapType1 (value) { // 位置1的选择框change方法
      let obj = {};
      this.isActive = 0;
      this.dataList1 = [];
      if (value) {
        obj = this.mapTypeList1.find((item) => {
          return item.typeName === value;
        });
        this.typeId1 = obj.dataTypeId;
        this.displayType1 = obj.displayType;
        if (this.relationValue1 !== '') {
          this.isChanged = 1;
          this.isDisabled2 = false;
        }
        this.axios.get('/mapServices/calcCount/' + obj.dataTypeId + '')
          .then((res) => {
            if (res) {
              if (res.data.length > 0) {
                this.dataList1 = res.data;
              } else {
                const data = {
                  name: '',
                  unit: '',
                  value: ''
                }
                this.dataList1.push(data);
              }
            }
          })
          .catch(() => {})
      }
    },
    changeMapType2 (value) {
      let obj = {};
      this.dataList2 = [];
      this.isActive = 0;
      if (value) {
        obj = this.mapTypeList2.find((item) => {
          return item.typeName === value;
        });
        this.typeId2 = obj.dataTypeId;
        this.displayType2 = obj.displayType;
        if (this.relationValue2 !== '') {
          this.isChanged = 2;
          this.isDisabled3 = false;
        }
        this.axios.get('/mapServices/calcCount/' + obj.dataTypeId + '')
          .then((res) => {
            if (res) {
              if (res.data.length > 0) {
                this.dataList2 = res.data;
              } else {
                const data = {
                  name: '',
                  unit: '',
                  value: ''
                }
                this.dataList2.push(data);
              }
            }
          })
          .catch(() => {})
      }
    },
    changeMapType3 (value) {
      let obj = {};
      this.isActive = 0;
      this.dataList3 = [];
      if (value) {
        obj = this.mapTypeList3.find((item) => {
          return item.typeName === value;
        });
        this.typeId3 = obj.dataTypeId;
        this.displayType3 = obj.displayType;
        if (this.relationValue3 !== '') {
          this.isChanged = 3;
          this.isDisabled4 = false;
        }
        this.axios.get('/mapServices/calcCount/' + obj.dataTypeId + '')
          .then((res) => {
            if (res) {
              if (res.data.length > 0) {
                this.dataList3 = res.data;
              } else {
                const data = {
                  name: '',
                  unit: '',
                  value: ''
                }
                this.dataList3.push(data);
              }
            }
          })
          .catch(() => {})
      }
    },
    changeMapType4 (value) {
      let obj = {};
      this.isActive = 0;
      this.dataList4 = [];
      if (value) {
        obj = this.mapTypeList4.find((item) => {
          return item.typeName === value;
        });
        this.typeId4 = obj.dataTypeId;
        this.displayType4 = obj.displayType;
        if (this.relationValue4 !== '') {
          this.isChanged = 4;
        }
        this.axios.get('/mapServices/calcCount/' + obj.dataTypeId + '')
          .then((res) => {
            if (res) {
              if (res.data.length > 0) {
                this.dataList4 = res.data;
              } else {
                const data = {
                  name: '',
                  unit: '',
                  value: ''
                }
                this.dataList4.push(data);
              }
            }
          })
          .catch(() => {})
      }
    },
    addDataListOne (name, value, unit, index) { // 位置1的添加一行
      if (name || value || unit) {
        this.tip = '';
        const data = {
          name: '',
          value: '',
          unit: ''
        }
        this.isActive = index + 1;
        this.dataList1.push(data);
      } else {
        this.tip = '请先填写信息';
      }
    },
    deleteDataListOne (name, index) { // 位置1删除一行
      this.dataList1.map((item) => {
        if (item.name === name) {
          this.dataList1.splice(index, 1);
        }
      });
      this.isActive = this.dataList1.length - 1;
    },
    addDataListTwo (name, value, unit, index) { // 位置2的添加一行
      if (name || value || unit) {
        this.tip = '';
        const data = {
          name: '',
          value: '',
          unit: ''
        }
        this.isActive = index + 1;
        this.dataList2.push(data);
      } else {
        this.tip = '请先填写信息';
      }
    },
    deleteDataListTwo (name, index) { // 位置2删除一行
      this.dataList2.map((item) => {
        if (item.name === name) {
          this.dataList2.splice(index, 1);
        }
      });
      this.isActive = this.dataList2.length - 1;
    },
    addDataListThree (name, value, unit, index) { // 位置3的添加一行
      if (name || value || unit) {
        this.tip = '';
        const data = {
          name: '',
          value: '',
          unit: ''
        }
        this.isActive = index + 1;
        this.dataList3.push(data);
      } else {
        this.tip = '请先填写信息';
      }
    },
    deleteDataListThree (name, index) { // 位置3删除一行
      this.dataList3.map((item) => {
        if (item.name === name) {
          this.dataList3.splice(index, 1);
        }
      });
      this.isActive = this.dataList3.length - 1;
    },
    addDataListFour (name, value, unit, index) { // 位置4的添加一行
      if (name || value || unit) {
        this.tip = '';
        const data = {
          name: '',
          value: '',
          unit: ''
        }
        this.isActive = index + 1;
        this.dataList4.push(data);
      } else {
        this.tip = '请先填写信息';
      }
    },
    deleteDataListFour (name, index) { // 位置4删除一行
      this.dataList4.map((item) => {
        if (item.name === name) {
          this.dataList4.splice(index, 1);
        }
      });
      this.isActive = this.dataList4.length - 1;
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
  .plate-ecl2-cr {
    .position-select {
      display: flex;
      flex-wrap: wrap;
      >div {
        margin-left: 2%;
        margin-bottom: 3%;
        span {
          color: #333333;
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
    .position-table {
      margin-top: 3%;
      margin-left: 2%;
      .navigation {
        >ul {
          display: flex;
          li {
            width:30%;
            color: #999999;
            font-size: 14px;
            cursor: pointer;
          }
          .activeLi {
            color: #0785FD;
            font-weight: bold;
          }
        }
      }
      .table-content {
        margin-top: 2%;
      }
    }
  }
  .unactive {
    color: #cccccc !important;
  }
  .active {
    color: #0785FD !important;
  }
  .el-select.isActive .el-input .el-input__inner {
    border-color: #409EFF;
  }
</style>
