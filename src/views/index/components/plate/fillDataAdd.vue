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
        <div v-for="(info, index) in this.$store.state.plateConfigInfo" :key="'info'+index">
          <span v-show='false'>{{dataObjTwo[0].configId=info.configId}}</span>
          <span v-show='false'>{{dataObjTwo[0].plateName=dataForm.plateName}}</span>
          <span v-show='false'>{{dataObjTwo[0].remark=dataForm.remark}}</span>
          <template v-if="info.areaDataType === 1">
            <div style="margin-top:3%;">
              <h2 style='font-weight: bold'>位置{{info.serialNumber}}</h2>
              <span v-show='false'>{{configCount = info.configCount}}</span>
              <span v-show='false'>{{plateAreaId = info.plateAreaId}}</span>
              <div v-show="$store.state.typeArr.length > 0">
                <span>关联图表主项数：</span>
                <el-select v-model="value[info.serialNumber]" placeholder="请选择" @change='changeRelation($event, info.serialNumber)'>
                  <el-option
                    :value="noRelation"
                  >
                  </el-option>
                  <el-option
                    v-for="item in $store.state.typeArr"
                    :key="item.serialNumber"
                    :value="'位置'+item.serialNumber"
                  >
                  </el-option>
                </el-select>
              </div>
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
            <template v-if="info.areaDataType === 3">
              <div style="margin-top:5%;">
                <h2 class='stepH2'>位置{{info.serialNumber}}</h2>
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
                        <td><input type="text" v-model="item.itemName" placeholder='请填写'></td>
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
                            class="el-icon-circle-plus-outline"
                            :class="[isActiveParent === index ? 'active' : 'unactive']"
                            @click="addparentDataThree(item.itemName, index, info.mainMaxCount)"
                            title="新增项"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
                    <tbody  v-for="(item, index) in childDataListThree" :key="'item'+index">
                      <span v-show='false'>{{item.serialNumber = parseInt(index+1)}}</span>
                      <template v-if='item.isMerge === true'>
                        <tr class="mergetr">
                          <td>
                            合计(<input type="text" v-model="item.contentName" placeholder='请填写'>)
                          </td>
                          <td>{{item.valueUnit}}</td>
                          <td></td>
                          <td>
                            <el-switch
                              v-model="item.supernatantFieldFlag"
                              disabled
                            />
                          </td>
                          <td width='15%'></td>
                        </tr>
                      </template>
                      <template v-else>
                        <tr>
                          <td>
                            <input type="text" v-model="item.contentName" placeholder='请填写'>
                          </td>
                          <td>
                            <input type="text" v-model="item.valueUnit" class='childUnitThree' placeholder='请填写'>
                          </td>
                          <td>
                            <template v-if='childCheckBox === true'>
                              <el-switch
                                v-model="item.graphicFieldFlag"
                                @change="changeGrapFlagThree($event, index)"
                              />
                            </template>
                            <template v-else>
                              <el-switch
                                v-model="item.graphicFieldFlag"
                                disabled
                              />
                            </template>
                          </td>
                          <td>
                            <el-switch
                              v-model="item.supernatantFieldFlag"
                              @change="changeSuperFlagThree($event, index)"
                            />
                          </td>
                          <td width='15%'>
                            <template v-if='checkedLayerMerge === true'>
                              <template v-if="childDataListThree.length > 2">
                                <i
                                  style="font-size: 25px; cursor: pointer; color: #DDDDDD;"
                                  class="active el-icon-remove-outline"
                                  @click="deleteContentListThree(item.contentName, index)"
                                  title="删除此项"
                                ></i>
                              </template>
                            </template>
                            <template v-else>
                              <template v-if="childDataListThree.length > 1">
                                <i
                                  style="font-size: 25px; cursor: pointer; color: #DDDDDD;"
                                  class="active el-icon-remove-outline"
                                  @click="deleteContentListThree(item.contentName, index)"
                                  title="删除此项"
                                ></i>
                              </template>
                            </template>
                            <i
                              style="font-size: 25px; cursor: pointer; color: #0785FD;"
                              class="el-icon-circle-plus-outline"
                              :class="[isActiveChild=== index ? 'active' : 'unactive']"
                              @click="addContentListThree(item.contentName, item.valueUnit, index, info.subMaxCount)"
                              title="新增项"
                            ></i>
                          </td>
                        </tr>
                      </template>
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
                    <tbody v-for="(item, index) in layerDataListThree" :key="'item'+index">
                      <template v-if='item.isMerge === true'>
                        <tr class='mergetr'>
                          <td>合计（{{childDataListThree[index].contentName}}）</td>
                          <td>
                            合计(<input type="text" v-model="item.contentName" placeholder='请填写'>)
                          </td>
                          <td>{{item.valueUnit}}</td>
                        </tr>
                      </template>
                      <template v-else>
                        <tr>
                          <td>{{childDataListThree[index].contentName}}</td>
                          <td>
                            <input type="text" v-model="item.contentName" placeholder='请填写'>
                          </td>
                          <td>
                            <input type="text" v-model="item.valueUnit" class='layerUnitThree' placeholder='请填写'>
                          </td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                  <div class="checkbox">
                    <template v-if='checkBoxThree === true'>
                      <el-checkbox
                        v-model="checkedLayerMerge"
                        @change="changeLayerMerge"
                      >
                        添加浮层子项合计项
                      </el-checkbox>
                    </template>
                    <template v-else>
                      <el-checkbox
                        disabled
                        v-model="checkedLayerMerge"
                      >
                        添加浮层子项合计项
                        （<span style="color:red;">{{checkBoxTip}}</span>）
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
                      <span v-show='false'>{{items.plateAreaId = info.plateAreaId}}</span>
                      <span v-show='false'>{{items.serialNumber = parseInt(index+1)}}</span>
                      <tr v-for="(list, idx) in items.contentSubItemList" :key="'list'+idx">
                        <template v-if='list.isMerge === true'>
                          <td style="color:#fff;border-color:#fff;background-color:#999999">{{items.itemName}}</td>
                          <td style="color:#fff;border-color:#fff;background-color:#999999">合计（{{list.contentName}}）</td>
                          <td style="color:#fff;border-color:#fff;background-color:#999999">{{list.valueContent}}</td>
                          <td style="color:#fff;border-color:#fff;background-color:#999999">{{list.valueUnit}}</td>
                          <td style="color:#fff;border-color:#fff;background-color:#999999">合计（{{list.contnetSubItemExtendList[0].contentName}}）</td>
                          <td style="color:#fff;border-color:#fff;background-color:#999999">{{list.contnetSubItemExtendList[0].valueContent}}</td>
                          <td style="color:#fff;border-color:#fff;background-color:#999999">{{list.contnetSubItemExtendList[0].valueUnit}}</td>
                        </template>
                        <template v-else>
                          <td>{{items.itemName}}</td>
                          <td>{{list.contentName}}</td>
                          <td><input type="text" v-model="numberObjThree[index + '_' + idx]" placeholder='请填写'></td>
                          <td>{{list.valueUnit}}</td>
                          <td>{{list.contnetSubItemExtendList[0].contentName}}</td>
                          <td><input type="text" v-model="numberLayerObjThree[index + '_' + idx]" placeholder='请填写'></td>
                          <td>{{list.contnetSubItemExtendList[0].valueUnit}}</td>
                        </template>
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
                          <input type="text" v-model="item.itemName" placeholder='请填写'>
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
                            class="el-icon-circle-plus-outline"
                            :class="[isActiveParent === idx ? 'active' : 'unactive']"
                            @click="addparentDataTwo(item.itemName,idx, info.mainMaxCount)" title="新增项"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
                    <tbody v-for="(item, idx) in childDataListTwo" :key="'item'+idx">
                      <template v-if="item.isMerge === true">
                        <tr class='mergetr'>
                          <td>合计(<input v-model='item.contentName' type='text' style="padding-left:3%;" placeholder='请填写' />)</td>
                          <td>{{item.valueUnit}}</td>
                          <td></td>
                          <td>
                            <el-switch
                              v-model="item.supernatantFieldFlag"
                              class='superFlag'
                              disabled
                            />
                          </td>
                          <td width='15%'></td>
                        </tr>
                      </template>
                      <template v-else>
                        <tr>
                          <td><input type="text" v-model="item.contentName" placeholder='请填写'></td>
                          <td><input type="text" v-model="item.valueUnit" class='valueUnit' placeholder='请填写'></td>
                          <td>
                            <template v-if='isCheckBox === true'>
                              <el-switch
                                v-model="item.graphicFieldFlag"
                                @change="changeGrapFlag($event, idx)"
                              />
                            </template>
                            <template v-else>
                              <el-switch
                                v-model="item.graphicFieldFlag"
                                disabled
                              />
                            </template>
                          </td>
                          <td>
                            <el-switch
                              v-model="item.supernatantFieldFlag"
                              @change="changeSuperFlag($event, idx)"
                            />
                          </td>
                          <td width='15%'>
                            <template v-if="checkedMerge === true">
                              <template v-if="childDataListTwo.length > 2">
                                <i
                                  style="font-size: 25px; cursor: pointer; color: #DDDDDD;"
                                  class="active el-icon-remove-outline"
                                  @click="deleteContentListTwo(item.contentName, idx)"
                                  title="删除此项"
                                ></i>
                              </template>
                            </template>
                            <template v-else>
                              <template v-if="childDataListTwo.length > 1">
                                <i
                                  style="font-size: 25px; cursor: pointer; color: #DDDDDD;"
                                  class="active el-icon-remove-outline"
                                  @click="deleteContentListTwo(item.contentName, idx)"
                                  title="删除此项"
                                ></i>
                              </template>
                            </template>
                            <i
                              style="font-size: 25px; cursor: pointer;  color: #0785FD;"
                              class="el-icon-circle-plus-outline"
                              :class="[isActiveChild === idx ? 'active' : 'unactive']"
                              @click="addContentListTwo(item.contentName, item.valueUnit, idx, info.subMaxCount)"
                              title="新增项"
                            ></i>
                          </td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                  <template v-if="isCheckBox === true">
                    <div class="checkbox">
                      <el-checkbox
                        v-model="checkedMerge"
                        @change="changeMerge"
                      >
                        添加浮层合计项
                      </el-checkbox>
                    </div>
                  </template>
                  <template v-else>
                    <div class="checkbox">
                      <el-checkbox
                        v-model="checkedMerge"
                        disabled
                      >
                        添加浮层合计项
                        （<span style="color:red;">{{checkBoxTip}}</span>）
                      </el-checkbox>
                    </div>
                  </template>
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
                      <span v-show='false'>{{item.serialNumber = parseInt(index+1) }}</span>
                      <tr v-for="(value,idx) in item.contentSubItemList" :key="'value'+idx">
                        <span v-show='false'>{{value.serialNumber = parseInt(idx+1)}}</span>
                        <template v-if='value.isMerge === false'>
                          <td>{{item.itemName}}</td>
                          <td>{{value.contentName}}</td>
                          <td>
                            <input
                              type="text"
                              v-model="numberObj[index + '_' + idx]"
                              placeholder='请填写'
                            >
                          </td>
                          <td>{{value.valueUnit}}</td>
                        </template>
                        <template v-else>
                          <td style="color:#fff;border-color:#fff;background-color:#999999">{{item.itemName}}</td>
                          <td style="color:#fff;border-color:#fff;background-color:#999999">合计（{{value.contentName}}）</td>
                          <td style="color:#fff;border-color:#fff;background-color:#999999">{{value.valueContent}}</td>
                          <td style="color:#fff;border-color:#fff;background-color:#999999">{{value.valueUnit}}</td>
                        </template>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </template>
            <template v-if="info.areaDataType === 4">
              <div style="margin-top:5%;">
                <h2>位置{{info.serialNumber}}</h2>
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
                    <tbody>
                      <tr v-for="(item, index) in info.mainMinCount" :key="'item'+index">
                        <td>
                          <input type="text" v-model="itemNameFour[index + '_' + info.serialNumber]" placeholder='请填写'>
                        </td>
                        <td>
                          <input type="text" v-model="valueUnitFour[index + '_' + info.serialNumber]" placeholder='请填写'>
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
                          <i
                            style="font-size: 25px; cursor: pointer;  color: #0785FD;"
                            class="el-icon-circle-plus-outline"
                            :class="[isActiveParent === index ? 'active' : 'unactive']"
                            @click="addChildDataListFour(itemNameFour[index + '_' + info.serialNumber], valueUnitFour[index + '_' + info.serialNumber], index, info.mainMaxCount, info.serialNumber)"
                            title="新增项"
                          >
                          </i>
                        </td>
                      </tr>
                    </tbody>
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
                    <tbody v-for="(items, index) in info.mainMinCount" :key="'items'+index">
                      <tr>
                        <td>{{itemNameFour[index + '_' + info.serialNumber]}}</td>
                        <td><input type="text" v-model="valueContent[index + '_' + info.serialNumber]" placeholder='请填写'></td>
                        <td><input type="text" v-model="percentValue[index + '_' + info.serialNumber]" placeholder='请填写'></td>
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
      noRelation: '不关联',
      isActiveParent: 0,
      isActiveChild: 0,
      configCount: 0,
      configCountFour: 1,
      plateAreaId: '',
      indexValue: 0,
      indexValueFour: 0,
      itemName: {},
      valueUnit: {},
      valueContent: {},
      itemNameFour: {},
      contentNameFour: {},
      valueContentFour: {},
      valueUnitFour: {},
      checkedMerge: false, // 合并项
      checkedLayerMerge: false, // 浮层合并项
      isCheckBox: false, // 是否能勾选类型二的浮层合并项
      checkBoxThree: false, // 是否能勾选类型三的浮层合并项
      childCheckBox: false, // 类型三中的是否能直接显示
      checkBoxTip: '单位不能为空，请先填写单位', // 浮层合并项提示语
      percentValue: [], // 类型四的同比值
      percentValueOne: {}, // 类型一的同比值
      value: [],
      dataForm: {
        plateName: '',
        remark: ''
      },
      tip: '', // 提示语
      numberObj: {}, // 类型二的数值计算对象
      numberObjThree: {}, // 类型三的子项数值计算对象
      numberLayerObjThree: {}, // 类型三的浮层合并项数值计算对象
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
        contnetSubItemExtendList: [],
        isMerge: false
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
        sumFlag: false,
        isMerge: false
      }], // 类型三的子项列表
      layerDataListThree: [{
        contentName: '',
        valueContent: '',
        valueUnit: '',
        serialNumber: 1,
        isMerge: false
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
      contentItemListThree: [{
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
          sumFlag: false,
          isMerge: false,
          contnetSubItemExtendList: [{
            contentName: '',
            valueContent: '',
            valueUnit: '',
            serialNumber: 1,
            isMerge: false
          }]
        }]
      }], // 类型三的所有数据的集合
      contentItemListFour: [], // 类型四的所有数据的集合
      contentItemListTwo: [{
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
          sumFlag: false,
          contnetSubItemExtendList: [],
          isMerge: false
        }]
      }], // 类型四的所有数据的集合
      contentItemListOne: [] // 类型一的所有数据的集合
    }
  },
  watch: {
    dataList (newVal) { // 要提交的数据
      this.dataList = Object.assign(this.dataList, newVal);
    },
    numberObj: {
      handler: function (newVal) {
        for (let i in newVal) {
          let str = i.split('_');
          if (newVal[i] !== undefined) {
            this.contentItemListTwo.map((items, index) => {
              items.contentSubItemList[parseInt(str[1])].valueContent = newVal[i];
            });
          } else {
            this.contentItemListTwo.map((items, index) => {
              items.contentSubItemList[parseInt(str[1])].valueContent = '';
            });
          }
        }
      },
      deep: true
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
      handler: function (newVal, oldVal) {
        let unitArr = [];
        newVal.map((item, index) => {
          unitArr.push(item.valueUnit);
        });
        this.contentItemListTwo.map((items, index) => {
          if (items.contentSubItemList) {
            items.contentSubItemList.map((item, idx) => {
              const length = unitArr.length;
              const result = unitArr.every((value, index, unitArr) => {
                return value === unitArr[length - 1];
              });
              if (item.isMerge === true) {
                if (result === false) {
                  this.checkedMerge = false; // 将浮层合并项设为未选中
                  this.childDataListTwo.splice(length - 1, 1);
                  items.contentSubItemList.splice(items.contentSubItemList.length - 1, 1);
                  items.contentSubItemList[idx].graphicFieldFlag = false; // 将直接显示设为false
                  this.childDataListTwo[idx].graphicFieldFlag = false; // 将直接显示设为false
                  return;
                }
              }
              item.contentName = this.childDataListTwo[idx].contentName;
              item.valueUnit = this.childDataListTwo[idx].valueUnit;
            });
          }
        });
        this.isCheckBox = this.judgeUnit();
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
        this.checkBoxThree = this.judgeUnitThree(); // 判断所有的单位是否一致
        this.childCheckBox = this.judgeUnitChild(); // 判断子项的单位是否一样
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
        this.checkBoxThree = this.judgeUnitThree(); // 判断单位是否一致
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
  methods: {
    preStep () {
      this.$store.commit('setProgressIndex', {progressIndex: 2});
      this.isActiveChild = 0;
      this.isActiveParent = 0;
      this.tip = '';
      // this.$store.commit('setType', {typeArr: []});
      // this.$store.commit('setConfigInfo', {setConfigInfo: []});
      Object.assign(this.$data, this.$options.data()); // 恢复初始化data值
    },
    nextStep () {
      this.dataObjTwo[0].contentItemList = [];
      let numberThree = [], numberLayerThree = [];
      for (let i in this.numberObjThree) {
        numberThree.push(this.numberObjThree[i]);
      }
      for (let i in this.numberLayerObjThree) {
        numberLayerThree.push(this.numberLayerObjThree[i]);
      }
      let obj = JSON.parse(JSON.stringify(this.contentItemListThree)); // 改变一下该数组的内存地址，防止其他地方的改变影响现在的操作
      obj.map((items, index) => {
        let length;
        if (this.checkedLayerMerge === true) {
          length = items.contentSubItemList.length - 1;
        } else {
          length = items.contentSubItemList.length;
        }
        const data = index * length;
        const newArr = numberThree.slice(data, length * (index + 1));
        const newLayerArr = numberLayerThree.slice(data, length * (index + 1));
        items.contentSubItemList.map((item, idx) => {
          item.valueContent = newArr[idx];
          item.contnetSubItemExtendList[0].valueContent = newLayerArr[idx];
        });
      });
      this.contentItemListThree = obj;
      this.contentItemListTwo.map((item) => {
        if (item.itemName !== '') {
          this.dataObjTwo[0].contentItemList.push(item);
        }
      });
      this.contentItemListThree.map((item, index) => {
        if (item.itemName !== '') {
          this.dataObjTwo[0].contentItemList.push(item);
        }
      });
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
    addparentDataTwo (name, idx, maxNumber) { // 类型二添加主项
      let arr = [];
      this.childDataListTwo.map((item, index) => {
        if (item) {
          arr.push(item);
        }
      });
      const value = {
        itemName: '',
        plateAreaId: this.parentDataListTwo[0].plateAreaId,
        serialNumber: this.parentDataListTwo.length + 1,
        contentSubItemList: arr
      }
      const data = {
        itemName: '',
        plateAreaId: this.parentDataListTwo[0].plateAreaId,
        serialNumber: this.parentDataListTwo.length + 1
      }
      if (name) {
        if (this.parentDataListTwo.length < maxNumber) {
          this.parentDataListTwo.push(data);
          this.contentItemListTwo.push(value);
          this.tip = '';
          this.isActiveParent = idx + 1;
        } else {
          this.tip = '主项可添加条数已达到上线';
        }
      } else {
        this.tip = '请先填写主项';
      }
      if (this.value.length > 0) {
        for (let i = 0; i < this.value.length; i++) {
          if (this.value[i] !== undefined && this.value[i] !== '不关联') {
            this.$store.state.plateConfigInfo.map((item, index) => {
              if (item.serialNumber === i) {
                item.configCount = this.parentDataListTwo.length;
              }
            });
          }
        }
      }
    },
    addparentDataThree (name, idx, maxNumber) { // 类型三添加主项
      let arr = [];
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
        plateAreaId: this.parentDataListThree[0].plateAreaId,
        serialNumber: this.parentDataListThree.length + 1,
        contentSubItemList: arr
      }
      const data = {
        itemName: '',
        plateAreaId: this.parentDataListThree[0].plateAreaId,
        serialNumber: this.parentDataListThree.length + 1
      }
      if (name) {
        if (this.parentDataListThree.length < maxNumber) {
          this.parentDataListThree.push(data);
          this.contentItemListThree.push(value);
          this.tip = '';
          this.isActiveParent = idx + 1;
        } else {
          this.tip = '主项可添加条数已达到上线';
        }
      } else {
        this.tip = '请先填写主项';
      }
      if (this.value.length > 0) {
        for (let i = 0; i < this.value.length; i++) {
          if (this.value[i] !== undefined && this.value[i] !== '不关联') {
            this.$store.state.plateConfigInfo.map((item, index) => {
              if (item.serialNumber === i) {
                item.configCount = this.parentDataListThree.length;
              }
            });
          }
        }
      }
    },
    addChildDataListFour (name, unit, idx, maxNumber, sortNumber) { // 类型四添加项
      const configLength = this.$store.state.plateConfigInfo.length;
      if (name || unit) {
        this.isActiveParent = idx + 1;
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
    addContentListTwo (name, unit, index, maxNumber) { // 类型二的添加子项
      if (name === '' && unit === '') {
        this.tip = '请填写信息';
      } else {
        if (this.childDataListTwo.length < maxNumber) {
          this.tip = '';
          const data = {
            contentName: '',
            valueContent: '',
            valueUnit: '',
            serialNumber: this.childDataListTwo.length + 1,
            graphicFieldFlag: false,
            supernatantFieldFlag: false,
            sumFlag: false,
            contnetSubItemExtendList: [],
            isMerge: false
          }
          if (this.checkedMerge === true) {
            this.checkedMerge = false; // 将浮层合并项的值设为false
            this.childDataListTwo.splice(this.childDataListTwo.length - 1, 1);
            this.contentItemListTwo.map((item) => {
              item.contentSubItemList.splice(item.contentSubItemList.length - 1, 1);
            });
          }
          this.contentItemListTwo.map((item) => {
            item.contentSubItemList.push(data);
          });
          this.childDataListTwo.push(data);
          this.isActiveChild = index + 1;
        } else {
          this.tip = '子项可添加条数已达到上线';
        }
      }
    },
    addContentListThree (name, unit, index, maxNumber) { // 类型三的添加子项
      if (name === '' && unit === '') {
        this.tip = '请填写信息';
      } else {
        if (this.childDataListThree.length < maxNumber) {
          this.tip = '';
          const data = {
            contentName: '',
            valueContent: '',
            valueUnit: '',
            serialNumber: this.childDataListThree.length + 1,
            graphicFieldFlag: false,
            supernatantFieldFlag: false,
            sumFlag: false,
            isMerge: false,
            contnetSubItemExtendList: [{
              contentName: '',
              valueContent: '',
              valueUnit: '',
              serialNumber: 1,
              isMerge: false
            }]
          };
          const childData = {
            contentName: '',
            valueContent: '',
            valueUnit: '',
            serialNumber: this.childDataListThree.length + 1,
            graphicFieldFlag: false,
            supernatantFieldFlag: false,
            sumFlag: false,
            isMerge: false
          };
          const value = {
            contentName: '',
            valueContent: '',
            valueUnit: '',
            serialNumber: this.layerDataListThree.length + 1,
            isMerge: false
          };
          if (this.checkedLayerMerge === true) {
            this.checkedLayerMerge = false; // 将浮层合并项的值设为false
            this.childDataListThree.splice(this.childDataListThree.length - 1, 1);
            this.layerDataListThree.splice(this.layerDataListThree.length - 1, 1);
            this.contentItemListThree.map((item) => {
              item.contentSubItemList.splice(item.contentSubItemList.length - 1, 1);
            });
          }
          this.contentItemListThree.map((item) => {
            item.contentSubItemList.push(data);
          });
          this.childDataListThree.push(childData);
          this.layerDataListThree.push(value);
          this.isActiveChild = index + 1;
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
      this.isActiveParent = this.parentDataListTwo.length - 1;
      if (this.value.length > 0) {
        for (let i = 0; i < this.value.length; i++) {
          if (this.value[i] !== undefined) {
            this.$store.state.plateConfigInfo.map((item, index) => {
              if (item.serialNumber === i) {
                item.configCount = this.parentDataListTwo.length;
              }
            });
          }
        }
      }
    },
    deleteParentDataThree (name, idx) { // 类型三的删除主项
      this.parentDataListThree.splice(idx, 1);
      this.contentItemListThree.map((item, index) => {
        if (item.itemName === name) {
          this.contentItemListThree.splice(index, 1);
        }
      });
      console.log(this.contentItemListThree)
      this.isActiveParent = this.parentDataListThree.length - 1;
      if (this.value.length > 0) {
        for (let i = 0; i < this.value.length; i++) {
          if (this.value[i] !== undefined) {
            this.$store.state.plateConfigInfo.map((item, index) => {
              if (item.serialNumber === i) {
                item.configCount = this.parentDataListThree.length;
              }
            });
          }
        }
      }
    },
    deleteChildDataListFour (name, idx, sortNumber) { // 类型四的删除项
      this.$store.state.plateConfigInfo.map((item) => {
        if (item.serialNumber === sortNumber) {
          --item.mainMinCount;
          this.isActiveParent = item.mainMinCount - 1;
        }
      });
    },
    deleteContentListTwo (name, idx) { // 类型二的删除子项
      this.childDataListTwo.splice(idx, 1);
      this.contentItemListTwo.map((items, index) => {
        items.contentSubItemList.map((item, num) => {
          if (idx === num) {
            items.contentSubItemList.splice(idx, 1);
          }
        });
      });
      this.isActiveChild = this.childDataListTwo.length - 1;
    },
    deleteContentListThree (name, idx) { // 类型三的删除子项
      this.childDataListThree.splice(idx, 1);
      this.layerDataListThree.splice(idx, 1);
      this.contentItemListThree.map((items, index) => {
        items.contentSubItemList.map((item, num) => {
          if (idx === num) {
            items.contentSubItemList.splice(idx, 1);
          }
        });
      });
      this.isActiveChild = this.childDataListThree.length - 1;
    },
    changeGrapFlag (value, index) { // 类型二的改变直接显示的switch
      this.childDataListTwo[index].graphicFieldFlag = value;
      this.contentItemListTwo.map((items) => {
        items.contentSubItemList[index].graphicFieldFlag = value;
      });
    },
    changeSuperFlag (value, index) { // 类型二的改变浮层显示的switch
      this.childDataListTwo[index].supernatantFieldFlag = value;
      this.contentItemListTwo.map((items) => {
        items.contentSubItemList[index].supernatantFieldFlag = value;
      });
    },
    changeGrapFlagThree (value, index) { // 类型三的改变直接显示的switch
      this.childDataListThree[index].graphicFieldFlag = value;
      this.contentItemListThree.map((items) => {
        items.contentSubItemList[index].graphicFieldFlag = value;
      });
    },
    changeSuperFlagThree (value, index) { // 类型三的改变浮层显示的switch
      this.childDataListThree[index].supernatantFieldFlag = value;
      this.contentItemListThree.map((items) => {
        items.contentSubItemList[index].supernatantFieldFlag = value;
      });
    },
    changeMerge (value) { // 类型二的勾选合并项
      let data;
      const parentLength = this.parentDataListTwo.length; // 获取主项的长度
      const childLength = this.childDataListTwo.length; // 获取子项的长度
      if (value === true) {
        for (let i = 0; i < parentLength; i++) {
          let result = 0;
          for (let j = 0; j < childLength; j++) {
            if (this.childDataListTwo[j].supernatantFieldFlag === true) {
              if (this.numberObj[i + '_' + j] !== undefined) {
                result = parseInt(result + parseInt(this.numberObj[i + '_' + j]));
              }
              data = {
                contentName: '',
                valueContent: result,
                valueUnit: this.childDataListTwo[0].valueUnit,
                serialNumber: 1,
                graphicFieldFlag: false,
                supernatantFieldFlag: true,
                sumFlag: false,
                contnetSubItemExtendList: [],
                isMerge: true
              }
            }
          }
          this.contentItemListTwo[i].contentSubItemList.push(data);
        }
        this.childDataListTwo.push(data);
      } else {
        const childLength = this.childDataListTwo.length;
        this.childDataListTwo.splice(childLength - 1, 1);
        this.contentItemListTwo.map((items, index) => {
          const length = items.contentSubItemList.length;
          items.contentSubItemList.splice(length - 1, 1);
        });
      }
    },
    changeLayerMerge (value) { // 类型三的勾选浮层合并项
      const parentLength = this.parentDataListThree.length; // 获取主项的长度
      const childLength = this.childDataListThree.length; // 获取子项的长度
      let childData, layerData, layerArr = [], childResult = 0, layerResult = 0;
      if (value === true) {
        for (let i = 0; i < parentLength; i++) {
          let childResult = 0, layerResult = 0, data;
          for (let j = 0; j < childLength; j++) {
            if (this.childDataListThree[j].supernatantFieldFlag === true) {
              console.log('aaaa')
              if (this.numberObjThree[i + '_' + j] !== undefined) {
                childResult = parseInt(childResult + parseInt(this.numberObjThree[i + '_' + j]));
                console.log(childResult)
              }
              if (this.numberLayerObjThree[j] !== '') {
                layerResult = parseInt(layerResult + parseInt(this.numberLayerObjThree[i + '_' + j]));
              }
            }
          }
          childData = {
            contentName: '',
            valueContent: childResult,
            valueUnit: this.childDataListThree[0].valueUnit,
            serialNumber: this.childDataListThree.length + 1,
            graphicFieldFlag: false,
            supernatantFieldFlag: true,
            sumFlag: false,
            isMerge: true
          };
          layerData = {
            contentName: '',
            valueContent: layerResult,
            valueUnit: this.layerDataListThree[0].valueUnit,
            serialNumber: 1,
            isMerge: true
          };
          data = {
            contentName: '',
            valueContent: childResult,
            valueUnit: this.childDataListThree[0].valueUnit,
            serialNumber: this.childDataListThree.length + 1,
            graphicFieldFlag: false,
            supernatantFieldFlag: true,
            sumFlag: false,
            isMerge: true,
            contnetSubItemExtendList: [{
              contentName: '',
              valueContent: layerResult,
              valueUnit: this.layerDataListThree[0].valueUnit,
              serialNumber: 1,
              isMerge: true
            }]
          }
          this.contentItemListThree[i].contentSubItemList.push(data);
        }
        this.childDataListThree.push(childData);
        this.layerDataListThree.push(layerData);
      } else {
        this.childDataListThree.splice(childLength - 1, 1);
        this.layerDataListThree.splice(childLength - 1, 1);
        this.contentItemListThree.map((item) => {
          item.contentSubItemList.splice(item.contentSubItemList.length - 1, 1);
        });
      }
    },
    judgeUnit () { // 类型二的判断单位是否为空或不一样
      let valueArr = [];
      let result;
      const valueUnit = document.getElementsByClassName('valueUnit'); // 获取子项所有的单位
      for (let i = 0; i < valueUnit.length; i++) {
        valueArr.push(valueUnit[i].value);
      }
      if (valueArr.indexOf('') === -1) {
        this.checkBoxTip = '';
        result = valueArr.every((value, index, valueArr) => {
          return value === valueArr[0];
        });
        if (result === false) {
          this.checkBoxTip = '单位不一致';
          this.contentItemListTwo.map((items, index) => {
            items.contentSubItemList.map((item, idx) => {
              items.contentSubItemList[idx].graphicFieldFlag = false;
              this.childDataListTwo[idx].graphicFieldFlag = false;
            });
          });
        }
      } else {
        this.checkBoxTip = '单位不能为空，请先填写单位';
        return false;
      }
      return result;
    },
    judgeUnitChild () { // 类型三的判断子项的单位是否为空或不一样
      let valueArr = [];
      let result;
      const valueUnit = document.getElementsByClassName('childUnitThree'); // 获取子项所有的单位
      for (let i = 0; i < valueUnit.length; i++) {
        valueArr.push(valueUnit[i].value);
      }
      if (valueArr.indexOf('') === -1) {
        this.checkBoxTip = '';
        result = valueArr.every((value, index, valueArr) => {
          return value === valueArr[0];
        });
        if (result === false) {
          this.checkBoxTip = '单位不一致';
          this.contentItemListThree.map((items, index) => {
            items.contentSubItemList.map((item, idx) => {
              items.contentSubItemList[idx].graphicFieldFlag = false;
              this.childDataListThree[idx].graphicFieldFlag = false;
            });
          });
        }
      } else {
        this.checkBoxTip = '单位不能为空，请先填写单位';
        return false;
      }
      return result;
    },
    judgeUnitThree () { // 类型三的判断单位是否为空或不一样
      let childUnitArr = [], layerUnitArr = [];
      let childResult, layerResult;
      const childUnitThree = document.getElementsByClassName('childUnitThree'); // 获取子项所有的单位
      const layerUnitThree = document.getElementsByClassName('layerUnitThree'); // 获取浮层所有的单位
      for (let i = 0; i < childUnitThree.length; i++) {
        childUnitArr.push(childUnitThree[i].value);
      }
      for (let i = 0; i < layerUnitThree.length; i++) {
        layerUnitArr.push(layerUnitThree[i].value);
      }
      if (childUnitArr.indexOf('') === -1 && layerUnitArr.indexOf('') === -1) {
        this.checkBoxTip = '';
        childResult = childUnitArr.every((value, index, childUnitArr) => {
          return value === childUnitArr[0];
        });
        layerResult = layerUnitArr.every((value, index, layerUnitArr) => {
          return value === layerUnitArr[0];
        });
        if (childResult === false || layerResult === false) {
          this.checkBoxTip = '单位不一致';
          this.contentItemListThree.map((items, index) => {
            items.contentSubItemList.map((item, idx) => {
              items.contentSubItemList[idx].graphicFieldFlag = false;
              this.childDataListThree[idx].graphicFieldFlag = false;
            });
          });
        }
      } else {
        this.checkBoxTip = '单位不能为空，请先填写单位';
        return false;
      }
      if (childResult && layerResult) {
        return true;
      } else {
        return false;
      }
    },
    changeRelation (value, number) {
      if (value === '不关联') {
        this.$store.state.plateConfigInfo.map((item, index) => {
          if (item.serialNumber === number) {
            item.configCount = this.$store.state.oneType[index];
          }
        });
      } else {
        let obj = {};
        obj = this.$store.state.typeArr.find((item) => {
          return item.serialNumber === parseInt(value.substring(2));
        });
        if (obj.areaDataType === 2) {
          this.$store.state.plateConfigInfo.map((item, index) => {
            if (item.serialNumber === number) {
              item.configCount = this.parentDataListTwo.length;
            }
          });
        } else if (obj.areaDataType === 3) {
          this.$store.state.plateConfigInfo.map((item, index) => {
            if (item.serialNumber === number) {
              item.configCount = this.parentDataListThree.length;
            }
          });
        }
      }
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
