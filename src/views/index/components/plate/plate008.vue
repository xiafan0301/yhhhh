<template>
<div class="plate-ecl2-c clearfix">
  <h2>图表数据</h2>
  <div class="plate-ecl2-cl">
    <img :src="markUrl" alt="" style="width:75%">
  </div>
  <div class="plate-ecl2-cr">
    <div>
      <el-form :inline="true" :model="dataForm" class="demo-form-inline" size="small">
        <el-form-item label="板块名称" required>
          <el-input v-model="dataForm.plateName" placeholder="板块名称"></el-input>
        </el-form-item>
        <el-form-item label="注释">
          <el-input v-model="dataForm.remark" placeholder="注释"></el-input>
        </el-form-item>
      </el-form>
      <div v-for="(info, index) in plateConfigInfo" :key="'info'+index">
        <span v-show='false'>{{dataObjTwo[0].configId=info.configId}}</span>
        <span v-show='false'>{{dataObjTwo[0].plateName=dataForm.plateName}}</span>
        <span v-show='false'>{{dataObjTwo[0].remark=dataForm.remark}}</span>
        <template v-if="info.areaDataType === 1">
          <div style="margin-top:3%;">
            <h2>位置{{info.serialNumber}}</h2>
            <template v-if="info.areaDataType === 2 || info.areaDataType === 3">
              <div>
                <span>关联图表主项数：</span>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </template>
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
                <tbody>
                  <tr v-for="(item, index) in projectList" :key="'wwa' + index">
                    <td><input type="text" v-model="item.name" placeholder="请填项名称"></td>
                    <td><input type="text" v-model="item.value" placeholder="请填值"></td>
                    <td>
                      <input type="text" v-model="item.danwei" placeholder="请填单位">
                    </td>
                    <td><input type="text" v-model="item.percent" placeholder="请填同比值"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </template>
        <template v-if="info.areaDataType !== 1">
          <template v-if="info.areaDataType === 3">
            <div style="margin-top:5%;">
              <h2>位置{{info.serialNumber}}</h2>
              <div class="ecl2-cr-list">
                <p class="list-title">第一步：添加主项</p>
                <table class="plate-table" style="width: 100%;">
                  <thead>
                  <tr>
                    <th>主项名称</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in parentDataListThree" :key="'item'+index">
                      <span v-show='false'>{{item.plateAreaId = info.plateAreaId}}</span>
                      <span v-show='false'>{{item.serialNumber = parseInt(index+1)}}</span>
                      <td><input type="text" v-model="item.itemName" placeholder="请填主项名称"></td>
                      <td width='15%'>
                        <template v-if="parentDataListThree.length > 1">
                          <i
                            style="font-size: 25px; cursor: pointer; color: #DDDDDD;"
                            class="active el-icon-remove-outline"
                            @click="deleteParentDataThree(item.itemName, index)"
                            title="删除此项"
                          ></i>
                        </template>
                        <i
                          style="font-size: 25px; cursor: pointer; color: #0785FD;"
                          class="addParentThree el-icon-circle-plus-outline"
                          @click="addparentDataThree(item.itemName, index, info.mainMaxCount)"
                          title="新增项"
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p class="tip" style="color:red;">{{tip}}</p>
              </div>
              <div class="ecl2-cr-list" style="margin-top: 40px;">
                <p class="list-title">第二步：添加子项</p>
                <table class="plate-table" style="width: 100%;" >
                  <thead>
                  <tr>
                    <th>子项名称</th>
                    <th>单位</th>
                    <th>直接显示</th>
                    <th>浮层显示</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in childDataListThree" :key="'item'+index">
                      <span v-show='false'>{{item.serialNumber = parseInt(index+1)}}</span>
                      <td>
                        <input type="text" v-model="item.contentName" placeholder="请填子项名称">
                      </td>
                      <td>
                        <input type="text" v-model="item.valueUnit" placeholder="请填单位">
                      </td>
                      <td>
                        <el-switch
                          v-model="item.graphicFieldFlag"
                        />
                      </td>
                      <td>
                        <el-switch
                          v-model="item.supernatantFieldFlag"
                        />
                      </td>
                      <td width='15%'>
                        <template v-if="childDataListThree.length > 1">
                          <i
                            style="font-size: 25px; cursor: pointer; color: #DDDDDD;"
                            class="active el-icon-remove-outline"
                            @click="deleteContentListThree(item.contentName, index)"
                            title="删除此项"
                          ></i>
                        </template>
                        <i
                          style="font-size: 25px; cursor: pointer; color: #0785FD;"
                          class="addChildThree el-icon-circle-plus-outline"
                          @click="addContentListThree(item.contentName, item.valueUnit, index, info.subMaxCount)"
                          title="新增项"
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="ecl2-cr-list" style="margin-top: 40px;">
                <p class="list-title">第三步：添加浮层并列项</p>
                <table class="plate-table" style="width: 100%;">
                  <thead>
                  <tr>
                    <th>子项名称</th>
                    <th>浮层并列项名称</th>
                    <th>单位</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in layerDataListThree" :key="'item'+index">
                      <td>{{childDataListThree[index].contentName}}</td>
                      <td>
                        <input type="text" v-model="item.contentName" placeholder="请填浮层并列项名称">
                      </td>
                      <td>
                        <input type="text" v-model="item.valueUnit" placeholder="请填单位">
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="checkbox">
                  <template v-if='layerDataListThree.length>1'>
                    <el-checkbox
                      v-model="checkedLayerMerge"
                      @change="changeLayerMerge"
                    >
                      添加浮层子项合计项（各子项单位、浮层并列项单位一致的情况下，才可添加）
                    </el-checkbox>
                  </template>
                  <template v-else>
                    <el-checkbox
                      disabled
                      v-model="changeLayerMerge"
                    >
                      添加浮层子项合计项（各子项单位、浮层并列项单位一致的情况下，才可添加）
                    </el-checkbox>
                  </template>
                </div>
              </div>
              <div class="ecl2-cr-list" style="margin-top: 40px;">
                <p class="list-title">第四步：添加数值</p>
                <table class="plate-table" style="width: 100%;" cellpadding="1" cellspacing="1">
                  <thead>
                  <tr>
                    <th rowspan='2'>主项</th>
                    <th colspan='3'>子项</th>
                    <th colspan='3'>浮层并列项</th>
                  </tr>
                  <tr>
                    <th>子项名称</th>
                    <th>值</th>
                    <th>单位</th>
                    <th>浮层并列项名称</th>
                    <th>值</th>
                    <th>单位</th>
                  </tr>
                  </thead>
                  <tbody v-for="(items, index) in contentItemListThree" :key="'items'+index">
                    <tr v-for="(list, idx) in items.contentSubItemList" :key="'list'+idx">
                      <td>{{items.itemName}}</td>
                      <td>{{list.contentName}}</td>
                      <td><input type="text" v-model="list.valueContent" placeholder="请填值"></td>
                      <td>{{list.valueUnit}}</td>
                      <td>{{list.contnetSubItemExtendList[0].contentName}}</td>
                      <td><input type="text" v-model="list.contnetSubItemExtendList[0].valueContent" placeholder="请填值"></td>
                      <td>{{list.contnetSubItemExtendList[0].valueUnit}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
          <template v-if="info.areaDataType === 2">
            <div style="margin-top:5%;">
              <h2>位置{{info.serialNumber}}</h2>
              <div class="ecl2-cr-list">
                <p class="list-title">第一步：添加主项</p>
                <table class="plate-table" style="width: 100%;">
                  <thead>
                  <tr>
                    <th>主项名称</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,idx) in parentDataListTwo" :key="'item'+idx">
                      <td>
                        <input type="text" v-model="item.itemName" placeholder="请填主项名称">
                      </td>
                      <td width='15%'>
                        <template v-if="parentDataListTwo.length>1">
                          <i
                            style="font-size: 25px; cursor: pointer; color: #DDDDDD;"
                            class="delparent active el-icon-remove-outline"
                            @click="deleteParentDataTwo(item.itemName, idx)" title="删除此项"
                          ></i>
                        </template>
                        <i
                          style="font-size: 25px; cursor: pointer;  color: #0785FD;"
                          class="addparent el-icon-circle-plus-outline"
                          @click="addparentDataTwo(item.itemName,idx, info.mainMaxCount)" title="新增项"
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p class="tip" style="color:red;">{{tip}}</p>
              </div>
              <div class="ecl2-cr-list" style="margin-top: 40px;">
                <p class="list-title">第二步：添加子项</p>
                <table class="plate-table" style="width: 100%;" >
                  <thead>
                  <tr>
                    <th>子项名称</th>
                    <th>单位</th>
                    <th>直接显示</th>
                    <th>浮层显示</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(item, idx) in childDataListTwo" :key="'item'+idx">
                        <td><input type="text" v-model="item.contentName" placeholder="请填子项名称"></td>
                        <td><input type="text" v-model="item.valueUnit" placeholder="请填单位" class='valueUnit'></td>
                        <td>
                          <el-switch
                            v-model="item.graphicFieldFlag"
                            class='grapFlag'
                            :disabled='isGrapDisabled'
                            @change="changeGrapFlag($event, item.valueUnit, idx)"
                          />
                        </td>
                        <td>
                          <el-switch
                            v-model="item.supernatantFieldFlag"
                            class='superFlag'
                            @change="changeSuperFlag(idx)"
                          />
                        </td>
                        <td width='15%'>
                          <template v-if="childDataListTwo.length>1">
                            <i
                              style="font-size: 25px; cursor: pointer; color: #DDDDDD;"
                              class="active el-icon-remove-outline"
                              @click="deleteContentListTwo(item.contentName, idx)"
                              title="删除此项"></i>
                          </template>
                          <i
                            style="font-size: 25px; cursor: pointer;  color: #0785FD;"
                            class="addchild el-icon-circle-plus-outline"
                            @click="addContentListTwo(item.contentName, item.valueUnit, idx, info.subMaxCount)"
                            title="新增项"></i>
                        </td>
                      </tr>
                  </tbody>
                  <template v-if="checkedMerge === true">
                    <tbody>
                      <tr v-for="(list, index) in contnetSubItemExtendList" :key="'list'+index">
                        <td>合计(<input v-model='list.contentName' type='text' style="padding-left:3%;" />)</td>
                        <td>{{list.valueUnit}}</td>
                        <td>
                          <el-switch
                            v-model="list.graphicFieldFlag"
                            class='grapFlag'
                            @change="changeGrapFlag($event, item.valueUnit, idx)"
                          />
                        </td>
                        <td>
                          <el-switch
                            v-model="list.supernatantFieldFlag"
                            class='superFlag'
                            @change="changeSuperFlag(idx)"
                          />
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </template>
                </table>
                <div class="checkbox">
                  <template v-if='childDataListTwo.length>1'>
                    <el-checkbox
                      v-model="checkedMerge"
                      @change="changeMerge"
                    >添加浮层合计项</el-checkbox>
                  </template>
                  <template v-else>
                    <el-checkbox
                      disabled
                      v-model="checkedMerge"
                    >添加浮层合计项</el-checkbox>
                  </template>
                </div>
              </div>
              <div class="ecl2-cr-list" style="margin-top: 40px;">
                <p class="list-title">第三步：添加数值</p>
                <table class="plate-table" style="width: 100%;">
                  <thead>
                  <tr>
                    <th>主项</th>
                    <th>子项</th>
                    <th>值</th>
                    <th>单位</th>
                  </tr>
                  </thead>
                  <tbody  v-for="(item, index) in contentItemListTwo" :key="'item'+index">
                    <span v-show='false'>{{item.plateAreaId=info.plateAreaId}}</span>
                    <span v-show='false'>{{item.serialNumber = parseInt(index+2) }}</span>
                    <tr v-for="(value,idx) in item.contentSubItemList" :key="'value'+idx">
                      <span v-show='false'>{{value.serialNumber = parseInt(idx+2)}}</span>
                      <td>{{item.itemName}}</td>
                      <td>{{value.contentName}}</td>
                      <td>
                        <input
                          type="text"
                          v-model="numberObj[index + '_' + idx]"
                          placeholder="请填值"
                        >
                      </td>
                      <td>{{value.valueUnit}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
          <template v-if="info.areaDataType === 4">
            <div style="margin-top:5%;">
              <h2>位置{{info.serialNumber}}</h2>
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
                  <tbody>
                    <tr v-for="(item, index) in childDataListFour" :key="'item'+index">
                      <span v-show='false'>{{parentDataListFour[0].plateAreaId = info.plateAreaId}}</span>
                      <span v-show='false'>{{item.serialNumber = parseInt(index+1)}}</span>
                      <td>
                        <input type="text" v-model="item.contentName" placeholder="请填项名称">
                      </td>
                      <td>
                        <input type="text" v-model="item.valueUnit" placeholder="请填单位">
                      </td>
                      <td width='15%'>
                        <template v-if="childDataListFour.length > 1">
                          <i
                            style="font-size: 25px; cursor: pointer; color: #DDDDDD;"
                            class="active el-icon-remove-outline"
                            @click="deleteChildDataListFour(item.contentName, index)"
                            title="删除此项"
                          >
                          </i>
                        </template>
                        <i
                          style="font-size: 25px; cursor: pointer;  color: #0785FD;"
                          class="addproject el-icon-circle-plus-outline"
                          @click="addChildDataListFour(item.contentName, item.valueUnit, index, info.mainMaxCount)"
                          title="新增项"
                        >
                        </i>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p class="tip" style="color:red;">{{tip}}</p>
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
                  <tbody v-for="(items, index) in contentItemListFour" :key="'items'+index">
                    <tr>
                      <td>{{items.contentSubItemList[0].contentName}}</td>
                      <td><input type="text" v-model="items.contentSubItemList[0].valueContent" placeholder="请填值"></td>
                      <td><input type="text" v-model="percentValue[index]" placeholder="请填值"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: ['plateConfigInfo', 'markUrl'],
  data () {
    return {
      checkedMerge: false, // 合并项
      checkedLayerMerge: false, // 浮层合并项
      extendGrapFlag: false, // 合并项中的直接显示
      extendSuperFlag: false, // 合并项中的浮层显示
      isGrapDisabled: false, // 直接显示开关
      percentValue: [], // 类型四的同比值
      dataForm: {
        plateName: '',
        remark: ''
      },
      tip: '', // 提示语
      checked: '100',
      options: [{
        value: '关联',
        label: '关联'
      }, {
        value: '不关联',
        label: '不关联'
      }],
      projectList: [
        {
          name: '测试的项目名',
          childName: 9.68,
          value: '亿千瓦时',
          percent: '0.2%'
        },
        {
          name: '测试的项目名',
          childName: 9.68,
          value: '亿千瓦时',
          percent: '0.2%'
        },
        {
          name: '测试的项目名',
          childName: 9.68,
          value: '亿千瓦时',
          percent: '0.2%'
        }
      ],
      numberObj: [], // 数值计算对象
      dataObjTwo: [{
        positionId: '',
        plateName: '',
        configId: '',
        pageId: '',
        plateType: 1,
        remark: '',
        contentItemList: [
          {
            itemName: '',
            plateAreaId: '',
            serialNumber: 1,
            contentSubItemList: [{
              contentName: '',
              valueContent: '',
              valueUnit: '',
              graphicFieldFlag: true,
              supernatantFieldFlag: true,
              sumFlag: false,
              serialNumber: 1,
              contnetSubItemExtendList: [] // 类型二子项并列项
            }],
            contnetSubItemExtendList: []
          }
        ]
      }],
      parentDataListTwo: [{
        itemName: '',
        plateAreaId: '',
        serialNumber: 1
      }], // 类型二的主项列表
      childDataListTwo: [{
        contentName: '',
        valueContent: '',
        valueUnit: '',
        serialNumber: 1,
        graphicFieldFlag: true,
        supernatantFieldFlag: true,
        sumFlag: false,
        contnetSubItemExtendList: []
      }], // 类型二子项列表
      parentDataListThree: [{
        itemName: '',
        plateAreaId: '',
        serialNumber: 1
      }], // 类型三的主项列表
      childDataListThree: [{
        contentName: '',
        valueContent: '',
        valueUnit: '',
        serialNumber: 1,
        graphicFieldFlag: true,
        supernatantFieldFlag: true,
        sumFlag: false
      }], // 类型三的子项列表
      layerDataListThree: [{
        contentName: '',
        valueContent: '',
        valueUnit: '',
        serialNumber: 1
      }], // 类型三的浮层列表
      parentDataListFour: [{
        itemName: '',
        plateAreaId: '',
        serialNumber: 1
      }], // 类型四的主项列表
      childDataListFour: [{
        contentName: '',
        valueContent: '',
        valueUnit: '',
        serialNumber: 1,
        graphicFieldFlag: true,
        supernatantFieldFlag: true,
        sumFlag: false
      }], // 类型四的子项列表
      contentItemListThree: [], // 类型三的所有数据的集合
      contentItemListFour: [], // 类型四的所有数据的集合
      contentItemListTwo: [] // 类型四的所有数据的集合
    }
  },
  mounted () { // 实例创建完成后调用
    // 类型三的contentItemListThree初始化赋值
    // 因为在js中数组和Object都是引用传递,为了让左右两边的对象不同时改变，所以采用下面方式赋值
    // Object.assign(this.contentItemListThree,this.parentDataListThree)
    this.contentItemListThree.push(JSON.parse(JSON.stringify(this.parentDataListThree[0])));
    this.contentItemListThree[0]['contentSubItemList'] = JSON.parse(JSON.stringify(this.childDataListThree));
    this.contentItemListThree[0].contentSubItemList[0]['contnetSubItemExtendList'] = JSON.parse(JSON.stringify(this.layerDataListThree));
    // 类型四的contentItemListFour初始化赋值
    this.contentItemListFour.push(JSON.parse(JSON.stringify(this.parentDataListFour[0])));
    this.contentItemListFour[0]['contentSubItemList'] = JSON.parse(JSON.stringify(this.childDataListFour));
    // 类型二的contentItemListThree初始化赋值
    this.contentItemListTwo.push(JSON.parse(JSON.stringify(this.parentDataListTwo[0])));
    this.contentItemListTwo[0]['contentSubItemList'] = JSON.parse(JSON.stringify(this.childDataListTwo));
  },
  watch: {
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
    parentDataListTwo: { // 监听类型二主项
      handler: function (newVal) {
        this.contentItemListTwo.map((item, index) => {
          item.itemName = this.parentDataListTwo[index].itemName;
        });
      },
      deep: true
    },
    parentDataListThree: { // 监听类型三主项
      handler: function (newVal) {
        this.contentItemListThree.map((item, index) => {
          item.itemName = this.parentDataListThree[index].itemName;
        })
      },
      deep: true
    },
    childDataListFour: { // 监听类型四的项
      handler: function (newVal) {
        this.parentDataListFour.map((item, index) => {
          item.itemName = this.childDataListFour[index].contentName;
          // item.serialNumber = this.childDataListFour[index].contentName;
        });
        this.contentItemListFour.map((items, index) => {
          items.itemName = this.childDataListFour[index].contentName;
          items.plateAreaId = this.parentDataListFour[0].plateAreaId;
          items.contentSubItemList.map((item, idx) => {
            item.valueUnit = this.childDataListFour[index].valueUnit;
            item.contentName = this.childDataListFour[index].contentName;
            item.valueContent = this.childDataListFour[index].valueContent;
          });
        });
      },
      deep: true
    },
    childDataListTwo: { // 监听类型二的子项
      handler: function (newVal) {
        this.contentItemListTwo.map((items, index) => {
          if (items.contentSubItemList) {
            items.contentSubItemList.map((item, idx) => {
              item.contentName = this.childDataListTwo[idx].contentName;
              item.valueUnit = this.childDataListTwo[idx].valueUnit;
            })
          }
        })
      },
      deep: true
    },
    childDataListThree: { // 监听类型三的子项
      handler: function (newVal) {
        this.contentItemListThree.map((items, index) => {
          if (items.contentSubItemList) {
            items.contentSubItemList.map((item, idx) => {
              item.contentName = this.childDataListThree[idx].contentName;
              item.valueUnit = this.childDataListThree[idx].valueUnit;
            });
          }
        });
      },
      deep: true
    },
    layerDataListThree: { // 监听类型三的浮层并列项
      handler: function (newVal) {
        this.contentItemListThree.map((items, index) => {
          items.contentSubItemList.map((item, idx) => {
            if (item.contnetSubItemExtendList) {
              item.contnetSubItemExtendList[0].contentName = this.layerDataListThree[idx].contentName;
              item.contnetSubItemExtendList[0].valueUnit = this.layerDataListThree[idx].valueUnit;
            }
          });
        });
      },
      deep: true
    },
    contnetSubItemExtendList: { // 监听类型二的子项合并项来改变数值
      handler: function (newVal) {
        this.childDataListTwo.map((item, index) => {
          item.graphicFieldFlag = this.contnetSubItemExtendList[0].graphicFieldFlag;
          item.supernatantFieldFlag = this.contnetSubItemExtendList[0].supernatantFieldFlag;
        });
      },
      deep: true
    }
  },
  methods: {
    addparentDataTwo (name, idx, maxNumber) { // 类型二添加主项
      let arr = [];
      const parentAdd = document.getElementsByClassName('addparent');
      if ($(parentAdd[idx]).hasClass('unactive')) {
        return false;
      }
      this.childDataListTwo.map((item, index) => {
        if (item) {
          arr.push(item);
        }
      });
      const value = {
        itemName: '',
        plateAreaId: '',
        serialNumber: this.parentDataListTwo.length + 1,
        contentSubItemList: arr
      }
      const data = {
        itemName: '',
        plateAreaId: '',
        serialNumber: ''
      }
      if (name) {
        if (this.parentDataListTwo.length < maxNumber) {
          this.parentDataListTwo.push(data);
          this.contentItemListTwo.push(value);
          this.tip = '';
          if ($(parentAdd[idx]).hasClass('unactive')) {
            return false;
          } else {
            $(parentAdd[idx]).addClass('unactive');
          }
        } else {
          this.tip = '主项可添加条数已达到上线';
        }
      } else {
        this.tip = '请先填写主项';
      }
    },
    addparentDataThree (name, idx, maxNumber) { // 类型三添加主项
      let arr = [];
      const parentAdd = document.getElementsByClassName('addParentThree');
      if ($(parentAdd[idx]).hasClass('unactive')) {
        return false;
      }
      this.childDataListThree.map((item, index) => {
        if (item) {
          arr.push(item);
        }
      });
      for (var i = 0; i < arr.length; i++) {
        const data = this.layerDataListThree.filter((item, index) => {
          return i === index;
        });
        arr[i].contnetSubItemExtendList = JSON.parse(JSON.stringify(data));
      }
      const value = {
        itemName: '',
        plateAreaId: '',
        serialNumber: '',
        contentSubItemList: arr
      }
      const data = {
        itemName: '',
        plateAreaId: '',
        serialNumber: ''
      }
      if (name) {
        if (this.parentDataListThree.length < maxNumber) {
          this.parentDataListThree.push(data);
          this.contentItemListThree.push(value);
          this.tip = '';
          if ($(parentAdd[idx]).hasClass('unactive')) {
            return false;
          } else {
            $(parentAdd[idx]).addClass('unactive');
          }
        } else {
          this.tip = '主项可添加条数已达到上线';
        }
      } else {
        this.tip = '请先填写主项';
      }
    },
    addChildDataListFour (name, unit, idx, maxNumber) { // 类型四添加项
      const projectAdd = document.getElementsByClassName('addproject');
      if ($(projectAdd[idx]).hasClass('unactive')) {
        return false;
      }
      const parentValue = {
        itemName: '',
        plateAreaId: this.parentDataListFour[0].plateAreaId,
        serialNumber: this.parentDataListFour.length + 1
      }; // 主项
      const childValue = {
        contentName: '',
        valueContent: '',
        valueUnit: '',
        serialNumber: this.childDataListFour.length + 1,
        graphicFieldFlag: false,
        supernatantFieldFlag: false,
        sumFlag: false
      }; // 子项
      const data = {
        itemName: '',
        serialNumber: this.parentDataListFour.length + 1,
        plateAreaId: this.parentDataListFour[0].plateAreaId,
        contentSubItemList: [{
          contentName: '',
          valueContent: '',
          valueUnit: '',
          serialNumber: 1,
          graphicFieldFlag: false,
          supernatantFieldFlag: false,
          contnetSubItemExtendList: []
        }]
      };
      if (name || unit) {
        if (this.parentDataListFour.length < maxNumber) {
          this.parentDataListFour.push(parentValue);
          this.childDataListFour.push(childValue);
          this.contentItemListFour.push(data);
          this.tip = '';
          if ($(projectAdd[idx]).hasClass('unactive')) {
            return false;
          } else {
            $(projectAdd[idx]).addClass('unactive');
          }
        } else {
          this.tip = '项可添加条数已达到上线';
        }
      } else {
        this.tip = '请先填写信息';
      }
    },
    addContentListTwo (name, unit, index, maxNumber) { // 类型二的添加子项
      const childAdd = document.getElementsByClassName('addchild');
      if ($(childAdd[index]).hasClass('unactive')) {
        return false;
      }
      if (name === '' && unit === '') {
        this.tip = '请填写信息';
      } else {
        if (this.childDataListTwo.length < maxNumber) {
          this.tip = '';
          const data = {
            contentName: '',
            valueContent: '',
            valueUnit: '',
            serialNumber: '',
            graphicFieldFlag: false,
            supernatantFieldFlag: false,
            sumFlag: false,
            contnetSubItemExtendList: []
          }
          this.contentItemListTwo.map((item) => {
            item.contentSubItemList.push(data);
          });
          this.childDataListTwo.push(data);
          $(childAdd[index]).addClass('unactive');
        } else {
          this.tip = '子项可添加条数已达到上线';
        }
      }
    },
    addContentListThree (name, unit, index, maxNumber) { // 类型三的添加子项
      const childAdd = document.getElementsByClassName('addChildThree');
      if ($(childAdd[index]).hasClass('unactive')) {
        return false;
      }
      if (name === '' && unit === '') {
        this.tip = '请填写信息';
      } else {
        if (this.childDataListThree.length < maxNumber) {
          this.tip = '';
          const data = {
            contentName: '',
            valueContent: '',
            valueUnit: '',
            serialNumber: '',
            graphicFieldFlag: false,
            supernatantFieldFlag: false,
            sumFlag: false,
            contnetSubItemExtendList: [{
              contentName: '',
              valueContent: '',
              valueUnit: '',
              serialNumber: ''
            }]
          };
          const value = {
            contentName: '',
            valueContent: '',
            valueUnit: '',
            serialNumber: ''
          };
          this.contentItemListThree.map((item) => {
            item.contentSubItemList.push(data);
          });
          this.childDataListThree.push(data);
          this.layerDataListThree.push(value);
          $(childAdd[index]).addClass('unactive');
        } else {
          this.tip = '子项可添加条数已达到上线';
        }
      }
    },
    deleteParentDataTwo (name, idx) { // 类型二的删除主项
      this.parentDataListTwo.splice(idx, 1);
      this.contentItemListTwo.map((item, index) => {
        if (item.itemName === name) {
          this.contentItemListTwo.splice(index, 1);
        }
      });
      const parentAdd = document.getElementsByClassName('addparent');
      const index = idx - 1;
      $(parentAdd[index]).removeClass('unactive');
    },
    deleteParentDataThree (name, idx) { // 类型三的删除主项
      this.parentDataListThree.splice(idx, 1);
      this.contentItemListThree.map((item, index) => {
        if (item.itemName === name) {
          this.contentItemListThree.splice(index, 1);
        }
      });
      const parentAdd = document.getElementsByClassName('addParentThree');
      const index = idx - 1;
      $(parentAdd[index]).removeClass('unactive');
    },
    deleteChildDataListFour (name, idx) { // 类型四的删除项
      this.childDataListFour.splice(idx, 1);
      this.parentDataListFour.splice(idx, 1); // 删除主项
      this.contentItemListFour.splice(idx, 1);
      const projectAdd = document.getElementsByClassName('addproject');
      const index = idx - 1;
      $(projectAdd[index]).removeClass('unactive');
    },
    deleteContentListTwo (name, idx) { // 类型二的删除子项
      this.childDataListTwo.splice(idx, 1);
      this.contentItemListTwo.map((item, index) => {
        item.contentSubItemList.map((item1, index1) => {
          if (item1.contentName === name) {
            item.contentSubItemList.splice(index1, 1);
          }
        });
      });
      const childAdd = document.getElementsByClassName('addchild');
      const index = idx - 1;
      $(childAdd[index]).removeClass('unactive');
    },
    deleteContentListThree (name, idx) { // 类型三的删除子项
      this.childDataListThree.splice(idx, 1);
      this.layerDataListThree.splice(idx, 1);
      this.contentItemListThree.map((items, index) => {
        items.contentSubItemList.map((item, num) => {
          if (item.contentName === name) {
            items.contentSubItemList.splice(num, 1);
          }
        });
      });
      const childAdd = document.getElementsByClassName('addChildThree');
      const index = idx - 1;
      $(childAdd[index]).removeClass('unactive');
    },
    changeGrapFlag (value, unit, index) { // 类型二的改变直接显示的switch
      let unitArr = [];
      this.childDataListTwo.map((item) => {
        unitArr.push(item.valueUnit);
      });
      const result = unitArr.filter((item) => {
        return item !== unitArr[0];
      });
      if (result.length === 0) {
        this.tip = '';
        this.isGrapDisabled = false;
      } else {
        this.tip = '单位不一致';
        this.isGrapDisabled = true;
        return false;
      }
    },
    changeSuperFlag (value, index) { // 类型二的改变浮层显示的switch
    },
    changeMerge (value) { // 类型二的勾选合并项
      const valueUnit = document.getElementsByClassName('valueUnit');
      const parentLength = this.parentDataListTwo.length; // 获取主项的长度
      const childLength = this.childDataListTwo.length; // 获取子项的长度
      let unitArr = [];
      for (let i = 0; i < valueUnit.length; i++) {
        if (valueUnit[i].value !== '') {
          unitArr.push(valueUnit[i].value);
        }
      }
      let data;
      if (value === true) {
        for (let i = 0; i < parentLength; i++) {
          let result = 0;
          for (let j = 0; j < childLength; j++) {
            result = parseInt(result + parseInt(this.numberObj[i + '_' + j]));
            data = {
              contentName: '',
              valueContent: result,
              valueUnit: unitArr[0],
              graphicFieldFlag: false,
              supernatantFieldFlag: false,
              serialNumber: ''
            }
          }
          this.dataObjTwo[0].contentItemList[i].contnetSubItemExtendList.push(data);
        }
      } else {
        this.contnetSubItemExtendList = [];
        this.dataObjTwo[0].contentItemList.map((item, index) => {
          item.contnetSubItemExtendList = [];
        });
      }
    },
    changeLayerMerge (value) { // 类型四的勾选浮层合并项
      const valueUnit = document.getElementsByClassName('valueUnit');
      const parentLength = this.parentDataListTwo.length; // 获取主项的长度
      const childLength = this.childDataListTwo.length; // 获取子项的长度
      let unitArr = [];
      for (let i = 0; i < valueUnit.length; i++) {
        if (valueUnit[i].value !== '') {
          unitArr.push(valueUnit[i].value);
        }
      }
      let data;
      if (value === true) {
        for (let i = 0; i < parentLength; i++) {
          let result = 0;
          for (let j = 0; j < childLength; j++) {
            result = parseInt(result + parseInt(this.numberObj[i + '_' + j]));
            data = {
              contentName: '',
              valueContent: result,
              valueUnit: unitArr[0],
              graphicFieldFlag: false,
              supernatantFieldFlag: false,
              serialNumber: ''
            }
          }
          this.dataObjTwo[0].contentItemList[i].contnetSubItemExtendList.push(data);
        }
      } else {
        this.contnetSubItemExtendList = [];
        this.dataObjTwo[0].contentItemList.map((item, index) => {
          item.contnetSubItemExtendList = [];
        });
      }
    }
  }
}
</script>
<style lang='scss' scoped>
  .plate-ecl2-c {
    display:flex;
    width:100%;
    flex-wrap: wrap;
    h2 {
      color: #333333;
      font-size: 18px;
      font-weight: bold;
      padding-bottom: 1%;
      width: 100%;
    }
    >div {
      width: 50%;
    }
    .plate-explain {
      margin-top: 3%;
      .explain-title {
        margin-bottom: 2%;
        color: #333333;
        font-size: 14px;
        font-weight: bold;
      }
      .explain-ul {
        li {
          height: 1.8em;
        }
        .explain-title-left {
          font-size: 14px;
          color: #333333;
        }
        .explain-title-right {
          color: #666666;
          font-size: 12px;
        }
      }
    }
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
  }
</style>
