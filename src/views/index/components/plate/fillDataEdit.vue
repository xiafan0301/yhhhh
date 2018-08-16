<template>
<div class="bg-plate-ecl bg-plate-ecl2" v-show="this.$store.state.progressIndex === 3" style='width:100%'>
  <div class="plate-ecl2-c clearfix" style='border-bottom: 1px solid #ddd'>
    <h2 style='font-weight: bold;padding: 0 190px 10px'>示例注解图 - {{this.$store.state.plateInfo.configCode}}</h2>
    <div class="plate-ecl2-cl">
      <img :src="this.$store.state.plateInfo.markUrl">
    </div>
    <div class="plate-ecl2-cr">
      <div>
        <el-form :inline="true" :model="dataForm" class="demo-form-inline" :rules='rules' ref='dataForm' size="small">
          <el-form-item label="版块名称" prop='plateName'>
            <el-input v-model="dataForm.plateName" placeholder="版块名称" :maxlength='maxlength' @change='changePlateName($event)'></el-input>
          </el-form-item>
          <el-form-item label="注释" prop='remark'>
            <el-input v-model="dataForm.remark" placeholder="注释" :maxlength='maxlength'></el-input>
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
              <span v-show='false'>{{plateAreaId[info.serialNumber] = info.plateAreaId}}</span>
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
                        <td><input type="text" onkeyup="this.value=this.value.replace(/[^\-?\d.]/g, '')" v-model="valueContent[index + '_' + info.serialNumber]" placeholder='请填写'></td>
                        <td>
                          <input type="text" v-model="valueUnit[index + '_' + info.serialNumber]" placeholder='请填写'>
                        </td>
                        <td><input type="text" onkeyup="this.value=this.value.replace(/[^\-?\d.]/g, '')" v-model="percentValueOne[index + '_' + info.serialNumber]" placeholder='请填写'></td>
                      </tr>
                    </tbody>
                  </template>
                </table>
              </div>
            </div>
          </template>
          <template v-if="info.areaDataType === 6">
            <div style="margin-top:3%;">
              <h2 style='font-weight: bold'>位置{{info.serialNumber}}</h2>
              <span v-show='false'>{{configCount = info.configCount}}</span>
              <span v-show='false'>{{plateAreaId[info.serialNumber] = info.plateAreaId}}</span>
              <div v-show="$store.state.typeArr.length > 0">
                <span>关联图表主项数：</span>
                <el-select v-model="value" placeholder="请选择" @change='changeRelation($event, info.serialNumber)'>
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
                <i class='el-icon-question' style='color: #F8560F;font-size:20px' title='关联后基础数据项行数和图标数据数据主项行数一致'></i>
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
                        <td><input type="text" onkeyup="this.value=this.value.replace(/[^\-?\d.]/g, '')" v-model="valueContent[index + '_' + info.serialNumber]" placeholder='请填写'></td>
                        <td>
                          <input type="text" v-model="valueUnit[index + '_' + info.serialNumber]" placeholder='请填写'>
                        </td>
                        <td><input type="text" onkeyup="this.value=this.value.replace(/[^\-?\d.]/g, '')" v-model="percentValueOne[index + '_' + info.serialNumber]" placeholder='请填写'></td>
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
                <h2 style='font-weight: bold'>位置{{info.serialNumber}}</h2>
                <span v-show='false'>{{maxNumber = info.subMaxCount}}</span>
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
                            <img
                              :src='reduceImg'
                              style="cursor: pointer"
                              @click="deleteParentDataThree(item.itemName, index)"
                            />
                          </template>
                          <template v-if='isActiveParent === index'>
                            <img
                              :src="addImg"
                              style="cursor: pointer;"
                              @click="addparentDataThree(item.itemName, index, info.mainMaxCount)"
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
                  </table>
                </div>
                <div class="ecl2-cr-list" style="margin-top: 40px;">
                  <p class="list-title">第二步：添加子项</p>
                  <table class="plate-table" style="width: 100%;" >
                    <thead>
                    <tr>
                      <th>子项名称</th>
                      <th style="width: 80px">单位</th>
                      <th style="width: 80px">直接显示</th>
                      <th style="width: 80px">浮层显示</th>
                      <th>操作</th>
                    </tr>
                    </thead>
                    <tbody  v-for="(item, index) in childDataListThree" :key="'item'+index">
                      <template v-if='item.sumFlag === true'>
                        <tr class="mergetr">
                          <td>
                            合计(<input type="text" v-model="item.contentName" class='sumInput' placeholder='请填写'>)
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
                            <template v-if='childDataListThree.length === 1'>
                              <el-switch
                                v-model="item.graphicFieldFlag"
                                disabled
                              />
                            </template>
                            <template v-else>
                              <el-switch
                                v-model="item.graphicFieldFlag"
                                @change="changeGrapFlagThree($event, index)"
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
                                <img
                                  :src='reduceImg'
                                  style="cursor: pointer;"
                                  @click="deleteContentListThree(item.contentName, index)"
                                />
                              </template>
                            </template>
                            <template v-else>
                              <template v-if="childDataListThree.length > 1">
                                <img
                                  :src='reduceImg'
                                  style="cursor: pointer;"
                                  @click="deleteContentListThree(item.contentName, index)"
                                />
                              </template>
                            </template>
                            <template v-if='isActiveChild=== index'>
                              <img
                                :src="addImg"
                                style="cursor: pointer;"
                                @click="addContentListThree(item.contentName, item.valueUnit, index, info.subMaxCount)"
                              />
                            </template>
                            <template v-else>
                              <img
                                :src="unactiveImg"
                              />
                            </template>
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
                      <th width='150px'>单位</th>
                    </tr>
                    </thead>
                    <tbody v-for="(item, index) in layerDataListThree" :key="'item'+index">
                      <template v-if='item.isMerge === true'>
                        <tr class='mergetr'>
                          <td>合计（{{childDataListThree[index].contentName}}）</td>
                          <td>
                            合计(<input type="text" v-model="item.contentName" class='sumInput' placeholder='请填写'>)
                          </td>
                          <td>{{item.valueUnit}}</td>
                        </tr>
                      </template>
                      <template v-else>
                        <tr>
                          <td class='cannot-modify'>{{childDataListThree[index].contentName}}</td>
                          <td>
                            <input type="text" v-model="item.contentName" placeholder='请填写'>
                          </td>
                          <td>
                            <input type="text" class='layerUnitThree' v-model="item.valueUnit" placeholder='请填写'>
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
                        <th width='80px' rowspan='2' style='border-right:1px solid #ddd'>主项</th>
                        <th colspan='3' style='text-align: center;border-bottom:1px solid #ddd;border-right:1px solid #ddd'>子项</th>
                        <th colspan='3' style='text-align: center;border-bottom:1px solid #ddd' width='300px'>浮层并列项</th>
                      </tr>
                      <tr>
                        <th>子项名称</th>
                        <th>值</th>
                        <th style='border-right:1px solid #ddd'>单位</th>
                        <th>浮层并列项名称</th>
                        <th>值</th>
                        <th>单位</th>
                      </tr>
                    </thead>
                    <tbody v-for="(items, index) in contentItemListThree" :key="'items'+index">
                      <span v-show='false'>{{items.plateAreaId = info.plateAreaId}}</span>
                      <tr v-for="(list, idx) in items.contentSubItemList" :key="'list'+idx">
                        <template v-if='list.sumFlag === true'>
                          <td style="color:#fff;border-color:#fff;background-color:#ccc">{{items.itemName}}</td>
                          <td style="color:#fff;border-color:#fff;background-color:#ccc">合计（{{list.contentName}}）</td>
                          <td style="color:#fff;border-color:#fff;background-color:#ccc">{{list.valueContent}}</td>
                          <td style="color:#fff;border-color:#fff;background-color:#ccc">{{list.valueUnit}}</td>
                          <td style="color:#fff;border-color:#fff;background-color:#ccc">合计（{{list.contnetSubItemExtendList[0].contentName}}）</td>
                          <td style="color:#fff;border-color:#fff;background-color:#ccc">{{list.contnetSubItemExtendList[0].valueContent}}</td>
                          <td style="color:#fff;border-color:#fff;background-color:#ccc">{{list.contnetSubItemExtendList[0].valueUnit}}</td>
                        </template>
                        <template v-else>
                          <td class='cannot-modify'>{{items.itemName}}</td>
                          <td class='cannot-modify'>{{list.contentName}}</td>
                          <td><input type="text" onkeyup="this.value=this.value.replace(/[^\-?\d.]/g, '')" @input='changeThreeObj' v-model="numberObjThree[index + '_' + idx]" placeholder='请填写' /></td>
                          <td class='cannot-modify'>{{list.valueUnit}}</td>
                          <td class='cannot-modify'>{{list.contnetSubItemExtendList[0].contentName}}</td>
                          <td><input type="text" onkeyup="this.value=this.value.replace(/[^\-?\d.]/g, '')" @input='changeThreeLayerObj' v-model="numberLayerObjThree[index + '_' + idx]" placeholder='请填写' /></td>
                          <td class='cannot-modify'>{{list.contnetSubItemExtendList[0].valueUnit}}</td>
                        </template>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </template>
            <template v-if="info.areaDataType === 2">
              <div style="margin-top:5%;">
                <h2 style='font-weight: bold'>位置{{info.serialNumber}}</h2>
                <span v-show='false'>{{maxNumber = info.subMaxCount}}</span>
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
                            <img
                              :src='reduceImg'
                              style="cursor: pointer;"
                              @click="deleteParentDataTwo(item.itemName, idx)"
                            />
                          </template>
                          <template v-if='isActiveParent === idx'>
                            <img
                              :src="addImg"
                              style="cursor: pointer;"
                              @click="addparentDataTwo(item.itemName,idx, info.mainMaxCount)"
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
                  </table>
                </div>
                <div class="ecl2-cr-list" style="margin-top: 40px;">
                  <p class="list-title">第二步：添加子项</p>
                  <table class="plate-table" style="width: 100%;" >
                    <thead>
                    <tr>
                      <th style='width:30%'>子项名称</th>
                      <th style="width: 150px">单位</th>
                      <th style="width: 80px">直接显示</th>
                      <th style="width: 80px">浮层显示</th>
                      <th>操作</th>
                    </tr>
                    </thead>
                    <tbody v-for="(item, idx) in childDataListTwo" :key="'item'+idx">
                      <template v-if="item.sumFlag === true">
                        <tr class='mergetr'>
                          <td>合计(<input v-model='item.contentName' type='text' style="text-align:center;width:50% !important" placeholder='请填写' />)</td>
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
                          <td><input type="text" v-model="item.valueUnit" placeholder='请填写'></td>
                          <td>
                            <template
                              v-if="$store.state.editPlateInfo.configId === '7742d84c-7b41-4167-a5b6-8f1bb24af021' || $store.state.editPlateInfo.configId === 'af8c0d3d-d595-4d56-86bc-0d88b4e8dea4'">
                               <el-switch
                                v-model="item.graphicFieldFlag"
                                disabled
                              />
                            </template>
                            <template v-else-if='childDataListTwo.length === 1'>
                              <el-switch
                                v-model="item.graphicFieldFlag"
                                disabled
                              />
                            </template>
                            <template v-else>
                              <el-switch
                                v-model="item.graphicFieldFlag"
                                @change="changeGrapFlag($event, idx)"
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
                                <img
                                  :src="reduceImg"
                                  style="cursor: pointer;"
                                  @click="deleteContentListTwo(item.contentName, idx)"
                                />
                              </template>
                            </template>
                            <template v-else>
                              <template v-if="childDataListTwo.length > 1">
                                <img
                                  :src="reduceImg"
                                  style="cursor: pointer;"
                                  @click="deleteContentListTwo(item.contentName, idx)"
                                />
                              </template>
                            </template>
                            <template v-if='isActiveChild === idx'>
                              <img
                                :src="addImg"
                                style="cursor: pointer;"
                                @click="addContentListTwo(item.contentName, item.valueUnit, idx, info.subMaxCount)"
                              />
                            </template>
                            <template v-else>
                              <img
                                :src="unactiveImg"
                              />
                            </template>
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
                      <th style="width: 150px">子项</th>
                      <th>值</th>
                      <th>单位</th>
                    </tr>
                    </thead>
                    <tbody  v-for="(item, index) in contentItemListTwo" :key="'item'+index">
                      <span v-show='false'>{{item.plateAreaId = info.plateAreaId}}</span>
                      <tr v-for="(value,idx) in item.contentSubItemList" :key="'value'+idx">
                        <template v-if='value.sumFlag === false'>
                          <td class='cannot-modify'>{{item.itemName}}</td>
                          <td class='cannot-modify'>{{value.contentName}}</td>
                          <td>
                            <input
                              type="text"
                              v-model="numberObj[index + '_' + idx]"
                              placeholder='请填写'
                              @input="changeTwoObj"
                              onkeyup="this.value=this.value.replace(/[^\-?\d.]/g, '')"
                            >
                          </td>
                          <td class='cannot-modify'>{{value.valueUnit}}</td>
                        </template>
                        <template v-else>
                          <td style="color:#fff;border-color:#fff;background-color:#ccc">{{item.itemName}}</td>
                          <td style="color:#fff;border-color:#fff;background-color:#ccc">合计（{{value.contentName}}）</td>
                          <td style="color:#fff;border-color:#fff;background-color:#ccc">{{value.valueContent}}</td>
                          <td style="color:#fff;border-color:#fff;background-color:#ccc">{{value.valueUnit}}</td>
                        </template>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </template>
            <template v-if="info.areaDataType === 4">
              <div style="margin-top:5%;">
                <h2 style='font-weight: bold'>位置{{info.serialNumber}}</h2>
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
                      <tr v-for="(item, index) in parentDataListFour" :key="'item'+index">
                        <template v-if="childDataListFour[index].isPercent !== true">
                          <td>
                            <input type="text" v-model="item.itemName" placeholder='请填写'>
                          </td>
                          <td>
                            <input type="text" v-model="childDataListFour[index].valueUnit" placeholder='请填写'>
                          </td>
                          <td width='15%'>
                            <template v-if="parentDataListFour.length > 1">
                              <img
                                :src='reduceImg'
                                style="cursor: pointer;"
                                @click="deleteChildDataListFour(item.itemName, index)"
                              />
                            </template>
                            <template v-if="isActiveParent === index">
                              <img
                                :src="addImg"
                                style="cursor: pointer;"
                                @click="addChildDataListFour(item.itemName, childDataListFour[index].valueUnit, index, info.mainMaxCount)"
                              />
                            </template>
                            <template v-else>
                              <img
                                :src="unactiveImg"
                              />
                            </template>
                          </td>
                        </template>
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
                    <tbody v-for="(items, index) in contentItemListFour" :key="'items'+index">
                      <span v-show='false'>{{items.plateAreaId = info.plateAreaId}}</span>
                      <tr>
                        <td class='cannot-modify'>{{items.itemName}}</td>
                        <td><input type="text" onkeyup="this.value=this.value.replace(/[^\-?\d.]/g, '')" v-model="valueContentFour[index]" placeholder='请填写'></td>
                        <td><input type="text" onkeyup="this.value=this.value.replace(/[^\-?\d.]/g, '')" v-model="percentValue[index]" placeholder='请填写'></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </template>
            <template v-if="info.areaDataType === 5">
              <div style="margin-top:5%;">
                <h2 style='font-weight: bold'>位置{{info.serialNumber}}</h2>
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
                      <tr v-for="(item, index) in parentDataListFour" :key="'item'+index">
                        <template v-if="childDataListFour[index].isPercent !== true">
                          <td>
                            <input type="text" v-model="item.itemName" placeholder='请填写'>
                          </td>
                          <td>
                            <input type="text" v-model="childDataListFour[index].valueUnit" placeholder='请填写'>
                          </td>
                          <td width='15%'>
                            <template v-if="parentDataListFour.length > 1">
                              <img
                                :src='reduceImg'
                                style="cursor: pointer;"
                                @click="deleteChildDataListFour(item.itemName, index)"
                              />
                            </template>
                            <template v-if="isActiveParent === index">
                              <img
                                :src="addImg"
                                style="cursor: pointer;"
                                @click="addChildDataListFour(item.itemName, childDataListFour[index].valueUnit, index, info.mainMaxCount)"
                              />
                            </template>
                            <template v-else>
                              <img
                                :src="unactiveImg"
                              />
                            </template>
                          </td>
                        </template>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="ecl2-cr-list" style="margin-top: 40px;">
                  <p class="list-title">第二步：添加数值</p>
                  <table class="plate-table" style="width: 100%;" >
                    <thead>
                    <tr>
                      <th style='width:50%'>项名称</th>
                      <th>值</th>
                    </tr>
                    </thead>
                    <tbody v-for="(items, index) in contentItemListFour" :key="'items'+index">
                      <span v-show='false'>{{items.plateAreaId = info.plateAreaId}}</span>
                      <tr>
                        <td class='cannot-modify'>{{items.itemName}}</td>
                        <td><input type="text" onkeyup="this.value=this.value.replace(/[^\-?\d.]/g, '')" v-model="valueContentFour[index]" placeholder='请填写'></td>
                      </tr>
                    </tbody>
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
    <el-button @click.native="nextStep('dataForm')" type="primary" class='selectBtn' :style="[submitDisabled === true ? styleObj : '']">&nbsp;&nbsp;&nbsp;&nbsp;完成&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
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
      maxNumber: '',
      rowspan: 0,
      submitDisabled: false,
      styleObj: {
        background: '#ddd'
      },
      addImg: require('../../../../assets/img/temp/add.png'),
      reduceImg: require('../../../../assets/img/temp/reduce.png'),
      unactiveImg: require('../../../../assets/img/temp/unactiveAdd.png'),
      markUrl: require('../../../../assets/img/temp/1.jpg'),
      rules: {
        plateName: [{
          required: true,
          message: '请输入版块名称',
          trigger: 'blur'
        }]
      },
      noRelation: '不关联',
      isActiveParent: '',
      isActiveChild: '',
      configCount: 0,
      configCountPre: '',
      configCountFour: 1,
      plateAreaId: {},
      indexValue: 0,
      indexValueFour: 0,
      itemName: {},
      valueUnit: {},
      valueContent: {},
      valueContentFour: {},
      checkedMerge: false, // 合并项
      checkedLayerMerge: false, // 浮层合并项
      isCheckBox: false, // 是否能勾选类型二的浮层合并项
      checkBoxThree: false, // 是否能勾选类型三的浮层合并项
      childCheckBox: false, // 类型三中的是否能直接显示
      checkBoxTip: '单位不能为空，请先填写单位', // 浮层合并项提示语
      percentValue: {}, // 类型四的同比值
      percentValueOne: {}, // 类型一的同比值
      value: '不关联',
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
        plateId: '',
        plateType: 1,
        remark: '',
        contentItemList: [],
        areaRelationList: []
      }],
      parentDataListTwo: [], // 类型二的主项列表
      childDataListTwo: [], // 类型二子项列表
      parentDataListThree: [], // 类型三的主项列表
      childDataListThree: [], // 类型三的子项列表
      layerDataListThree: [], // 类型三的浮层列表
      parentDataListFour: [], // 类型四的主项列表
      childDataListFour: [], // 类型四的子项列表
      contentItemListThree: [], // 类型三的所有数据的集合
      contentItemListFour: [], // 类型四的所有数据的集合
      contentItemListTwo: [], // 类型四的所有数据的集合
      contentItemListOne: [] // 类型一的所有数据的集合
    }
  },
  watch: {
    dataList (newVal) { // 要提交的数据
      this.dataList = Object.assign(this.dataList, newVal);
    },
    numberObj: {
      handler: function (newVal) {
        if (newVal) {
          // let twoObj = JSON.parse(JSON.stringify(this.contentItemListTwo));
          // for (let i in newVal) {
          //   let str = i.split('_');
          //   if (this.numberObj[i] !== undefined && this.numberObj[i] !== '') {
          //     twoObj[parseInt(str[0])].contentSubItemList[parseInt(str[1])].valueContent = newVal[i];
          //   } else {
          //     twoObj[parseInt(str[0])].contentSubItemList[parseInt(str[1])].valueContent = '';
          //   }
          // }
          // this.contentItemListTwo = twoObj;
          const parentLength = this.parentDataListTwo.length; // 获取主项的长度
          const childLength = this.childDataListTwo.length; // 获取子项的长度
          for (let i = 0; i < parentLength; i++) {
            let childResult = 0;
            for (let j = 0; j < childLength; j++) {
              if (this.childDataListTwo[j].isMerge !== true) {
                if (this.childDataListTwo[j].supernatantFieldFlag === true) {
                  if (newVal[i + '_' + j] !== undefined && newVal[i + '_' + j] !== '') {
                    childResult = parseInt(childResult + parseInt(newVal[i + '_' + j]));
                  }
                }
              }
            }
            if (this.checkedMerge === true) {
              if (childResult === 0) {
                this.contentItemListTwo[i].contentSubItemList[childLength - 1].valueContent = '';
              } else {
                this.contentItemListTwo[i].contentSubItemList[childLength - 1].valueContent = childResult;
              }
            }
          }
          let twoObj = JSON.parse(JSON.stringify(this.contentItemListTwo));
          for (let i in newVal) {
            let str = i.split('_');
            if (this.numberObj[i] !== undefined && this.numberObj[i] !== '') {
              twoObj[parseInt(str[0])].contentSubItemList[parseInt(str[1])].valueContent = newVal[i];
            } else {
              twoObj[parseInt(str[0])].contentSubItemList[parseInt(str[1])].valueContent = '';
            }
          }
          this.contentItemListTwo = twoObj;
        }
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
    parentDataListFour: { // 监听类型四的项
      handler: function (newVal) {
        this.parentDataListFour.map((item, index) => {
          this.childDataListFour[index].contentName = item.itemName;
        });
        this.contentItemListFour.map((items, index) => {
          items.itemName = this.parentDataListFour[index].itemName;
          items.plateAreaId = this.parentDataListFour[0].plateAreaId;
          items.contentSubItemList.map((item, idx) => {
            if (item.serialNumber === 1) {
              item.contentName = this.childDataListFour[index].contentName;
              item.valueUnit = this.childDataListFour[index].valueUnit;
              item.valueContent = this.childDataListFour[index].valueContent;
            }
          });
        });
      },
      deep: true
    },
    childDataListFour: { // 监听类型四的子项
      handler: function (newVal) {
        this.contentItemListFour.map((items, index) => {
          items.contentSubItemList.map((item, idx) => {
            if (item.serialNumber === 1) {
              if (item.valueUnit !== this.childDataListFour[index].valueUnit) {
                this.childDataListFour.map((value) => {
                  value.valueUnit = this.childDataListFour[index].valueUnit;
                });
              }
              item.contentName = this.childDataListFour[index].contentName;
              item.valueUnit = this.childDataListFour[index].valueUnit;
              item.valueContent = this.childDataListFour[index].valueContent;
            }
          });
        });
      },
      deep: true
    },
    childDataListTwo: { // 监听类型二的子项
      handler: function (newVal) {
        // let unitArr = [];
        // newVal.map((item, index) => {
        //   unitArr.push(item.valueUnit);
        // });
        // this.contentItemListTwo.map((items, index) => {
        //   if (items.contentSubItemList) {
        //     items.contentSubItemList.map((item, idx) => {
        //       const length = unitArr.length;
        //       const result = unitArr.every((value, index, unitArr) => {
        //         return value === unitArr[length - 1];
        //       });
        //       if (item.isMerge === true) {
        //         if (result === false) {
        //           this.checkedMerge = false; // 将浮层合并项设为未选中
        //           items.contentSubItemList[idx].graphicFieldFlag = false; // 将直接显示设为false
        //           this.childDataListTwo[idx].graphicFieldFlag = false; // 将直接显示设为false
        //           // this.childDataListTwo.splice(length - 1, 1);
        //           // items.contentSubItemList.splice(items.contentSubItemList.length - 1, 1);
        //           return;
        //         }
        //       }
        //       item.contentName = this.childDataListTwo[idx].contentName;
        //       item.valueUnit = this.childDataListTwo[idx].valueUnit;
        //     });
        //   }
        // });
        let result = [];
        this.contentItemListTwo.map((items, index) => {
          if (items.contentSubItemList) {
            items.contentSubItemList.map((item, idx) => {
              item.contentName = this.childDataListTwo[idx].contentName;
              item.valueUnit = this.childDataListTwo[idx].valueUnit;
              if (item.graphicFieldFlag === true) {
                result = newVal.filter((value) => {
                  return value.valueUnit === item.valueUnit;
                });
              }
            });
          }
        });
        if (this.$store.state.plateInfo.configCode === 'plate015' && this.$store.state.plateInfo.configCode === 'plate041') {
          if (result.length > 0) {
            this.childDataListTwo.map((value) => {
              if (value.graphicFieldFlag === true) {
                result.map((item) => {
                  if (item.valueUnit === value.valueUnit) {
                    value.graphicFieldFlag = true;
                  } else {
                    value.graphicFieldFlag = false;
                  }
                });
              }
            });
          }
          this.contentItemListTwo.map((items) => {
            items.contentSubItemList.map((item, idx) => {
              item.graphicFieldFlag = this.childDataListTwo[idx].graphicFieldFlag;
            });
          });
        }
        this.isCheckBox = this.judgeUnit();
      },
      deep: true
    },
    childDataListThree: { // 监听类型三的子项
      handler: function (newVal) {
        let result = [];
        this.contentItemListThree.map((items, index) => {
          if (items.contentSubItemList) {
            items.contentSubItemList.map((item, idx) => {
              item.contentName = this.childDataListThree[idx].contentName;
              item.valueUnit = this.childDataListThree[idx].valueUnit;
              if (item.graphicFieldFlag === true) {
                result = newVal.filter((value) => {
                  return value.valueUnit === item.valueUnit;
                });
              }
            });
          }
        });
        if (result.length > 0) {
          this.childDataListThree.map((value) => {
            if (value.graphicFieldFlag === true) {
              result.map((item) => {
                if (item.valueUnit === value.valueUnit) {
                  value.graphicFieldFlag = true;
                } else {
                  value.graphicFieldFlag = false;
                }
              });
            }
          });
        }
        this.contentItemListThree.map((items) => {
          items.contentSubItemList.map((item, idx) => {
            item.graphicFieldFlag = this.childDataListThree[idx].graphicFieldFlag;
          });
        });
        this.checkBoxThree = this.judgeUnitThree(); // 判断所有的单位是否一致
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
    },
    numberObjThree: {
      handler (newVal) {
        if (newVal) {
          const parentLength = this.parentDataListThree.length; // 获取主项的长度
          const childLength = this.childDataListThree.length; // 获取子项的长度
          for (let i = 0; i < parentLength; i++) {
            let childResult = 0;
            for (let j = 0; j < childLength; j++) {
              childResult = 0;
              if (this.childDataListThree[j].supernatantFieldFlag === true) {
                if (newVal[i + '_' + j] !== undefined && newVal[i + '_' + j] !== '') {
                  childResult = parseInt(childResult + parseInt(newVal[i + '_' + j]));
                }
              }
            }
            if (this.checkedLayerMerge === true) {
              if (childResult === 0) {
                this.contentItemListThree[i].contentSubItemList[childLength - 1].valueContent = '';
              } else {
                this.contentItemListThree[i].contentSubItemList[childLength - 1].valueContent = childResult;
              }
            }
          }
          // let threeObj = JSON.parse(JSON.stringify(this.contentItemListThree));
          // for (let i in newVal) {
          //   let str = i.split('_');
          //   if (this.numberObjThree[i] !== undefined && this.numberObjThree[i] !== '') {
          //     threeObj[parseInt(str[0])].contentSubItemList[parseInt(str[1])].valueContent = newVal[i];
          //   } else {
          //     threeObj[parseInt(str[0])].contentSubItemList[parseInt(str[1])].valueContent = '';
          //   }
          // }
          // this.contentItemListThree = threeObj;
        }
      },
      deep: true
    },
    numberLayerObjThree: {
      handler: function (newVal) {
        if (newVal) {
          const parentLength = this.parentDataListThree.length; // 获取主项的长度
          const childLength = this.childDataListThree.length; // 获取子项的长度
          for (let i = 0; i < parentLength; i++) {
            let layerResult = 0;
            for (let j = 0; j < childLength; j++) {
              if (this.childDataListThree[j].supernatantFieldFlag === true) {
                if (newVal[i + '_' + j] !== undefined && newVal[i + '_' + j] !== '') {
                  layerResult = parseInt(layerResult + parseInt(newVal[i + '_' + j]));
                }
              }
            }
            if (this.checkedLayerMerge === true) {
              if (layerResult === 0) {
                this.contentItemListThree[i].contentSubItemList[childLength - 1].contnetSubItemExtendList[0].valueContent = '';
              } else {
                this.contentItemListThree[i].contentSubItemList[childLength - 1].contnetSubItemExtendList[0].valueContent = layerResult;
              }
            }
          }
          let threeObj = JSON.parse(JSON.stringify(this.contentItemListThree));
          for (let i in newVal) {
            let str = i.split('_');
            if (this.numberLayerObjThree[i] !== undefined && this.numberLayerObjThree[i] !== '') {
              threeObj[parseInt(str[0])].contentSubItemList[parseInt(str[1])].contnetSubItemExtendList[0].valueContent = newVal[i];
            } else {
              threeObj[parseInt(str[0])].contentSubItemList[parseInt(str[1])].contnetSubItemExtendList[0].valueContent = '';
            }
          }
          this.contentItemListThree = threeObj;
        }
      },
      deep: true
    }
  },
  mounted () {
    this.setInitialData(); // 初始化数据
    // this.plateConfigInfoArr = this.$store.state.plateConfigInfo;
    this.$store.state.plateConfigInfo.map((item) => {
      if (item.serialNumber === 6) {
        this.configCountPre = item.configCount;
      }
    });
  },
  methods: {
    preStep () {
      this.$store.commit('setProgressIndex', {progressIndex: 2});
      this.isActiveChild = 0;
      this.isActiveParent = 0;
      this.tip = '';
    },
    nextStep (dataForm) {
      this.dataObjTwo[0].contentItemList = [];
      this.contentItemListOne = [];
      let threeObj = JSON.parse(JSON.stringify(this.contentItemListThree));
      let twoObj = JSON.parse(JSON.stringify(this.contentItemListTwo));
      let fourObj = JSON.parse(JSON.stringify(this.contentItemListFour));
      for (let i in this.numberObjThree) {
        let str = i.split('_');
        if (this.numberObjThree[i] !== undefined && this.numberObjThree[i] !== '') {
          threeObj[parseInt(str[0])].contentSubItemList[parseInt(str[1])].valueContent = this.numberObjThree[i];
        } else {
          threeObj[parseInt(str[0])].contentSubItemList[parseInt(str[1])].valueContent = '';
        }
      }
      for (let i in this.numberLayerObjThree) {
        let str = i.split('_');
        if (this.numberLayerObjThree[i] !== undefined && this.numberLayerObjThree[i] !== '') {
          threeObj[parseInt(str[0])].contentSubItemList[parseInt(str[1])].contnetSubItemExtendList[0].valueContent = this.numberLayerObjThree[i];
        } else {
          threeObj[parseInt(str[0])].contentSubItemList[parseInt(str[1])].contnetSubItemExtendList[0].valueContent = '';
        }
      }
      for (let i in this.numberObj) {
        let str = i.split('_');
        if (this.numberObj[i] !== undefined && this.numberObj[i] !== '') {
          twoObj[parseInt(str[0])].contentSubItemList[parseInt(str[1])].valueContent = this.numberObj[i];
        } else {
          twoObj[parseInt(str[0])].contentSubItemList[parseInt(str[1])].valueContent = '';
        }
      }
      for (let i in this.valueContentFour) {
        if (this.valueContentFour[i] !== undefined && this.valueContentFour[i] !== '') {
          fourObj[parseInt(i)].contentSubItemList[0].valueContent = this.valueContentFour[i];
        } else {
          fourObj[parseInt(i)].contentSubItemList[0].valueContent = '';
        }
      }
      this.contentItemListTwo = twoObj;
      this.contentItemListThree = threeObj;
      this.contentItemListFour = fourObj;
      let twoUnit = [], threeUnit = [], twoValueContent = [], threeValueContent = [], threeLayerContent = [];
      this.contentItemListTwo.map((items, index) => {
        if (items.itemName !== '') {
          items.serialNumber = index + 1;
          items.contentSubItemList.map((item, idx) => {
            item.serialNumber = idx + 1;
          });
          this.dataObjTwo[0].contentItemList.push(items);
          twoUnit = items.contentSubItemList.filter((list) => {
            return list.graphicFieldFlag === false && list.supernatantFieldFlag === false;
          });
          if (this.checkedMerge === false) {
            twoValueContent = items.contentSubItemList.filter((list) => {
              return list.valueContent === '';
            });
          } else {
            const length = items.contentSubItemList.length - 1;
            for (let i = 0; i < length; i++) {
              if (items.contentSubItemList[i].valueContent === '') {
                twoValueContent.push(items.contentSubItemList[i]);
              }
            }
          }
        }
      });
      this.contentItemListThree.map((items, index) => {
        if (items.itemName !== '') {
          items.serialNumber = index + 1;
          items.contentSubItemList.map((item, idx) => {
            item.serialNumber = idx + 1;
          });
          this.dataObjTwo[0].contentItemList.push(items);
          threeUnit = items.contentSubItemList.filter((list) => {
            return list.graphicFieldFlag === false && list.supernatantFieldFlag === false;
          });
          if (this.checkedLayerMerge === false) {
            threeLayerContent = items.contentSubItemList.filter((list) => {
              return list.valueContent === '';
            });
            items.contentSubItemList.map((item) => {
              if (item.contnetSubItemExtendList[0].valueContent === '') {
                threeLayerContent.push(item.contnetSubItemExtendList[0]);
              }
            });
          } else {
            const length = items.contentSubItemList.length - 1;
            for (let i = 0; i < length; i++) {
              if (items.contentSubItemList[i].valueContent === '') {
                threeValueContent.push(items.contentSubItemList[i]);
              }
              if (items.contentSubItemList[i].contnetSubItemExtendList[0].valueContent === '') {
                threeLayerContent.push(items.contnetSubItemExtendList[0]);
              }
            }
          }
        }
      });
      let data = {};
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
      this.contentItemListOne.map((item) => {
        item.serialNumber = this.dataObjTwo[0].contentItemList.length + 1;
        if (item.itemName !== '') {
          this.dataObjTwo[0].contentItemList.push(item);
        }
      });
      this.contentItemListFour.map((items, index) => {
        items.serialNumber = this.dataObjTwo[0].contentItemList.length + 1;
        if (items.contentSubItemList.length > 1) {
          items.contentSubItemList.map((item, idx) => {
            if (item.serialNumber === 2) {
              item.valueContent = this.percentValue[index];
            }
          });
          if (this.percentValue[index] === '') {
            this.contentItemListFour[index].contentSubItemList.splice(1, 1);
          }
        } else {
          if (this.percentValue[index] !== undefined) {
            const data = {
              contentName: '',
              valueContent: this.percentValue[index],
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
        if (items.itemName !== '') {
          this.dataObjTwo[0].contentItemList.push(items);
        }
      });
      if (this.value !== '不关联') {
        const areaList = {
          plateAreaId: this.parentDataListTwo[0].plateAreaId,
          relationPlateAreaId: this.plateAreaId[2]
        }
        this.dataObjTwo[0].areaRelationList.push(areaList);
      } else {
        this.dataObjTwo[0].areaRelationList = [];
      }
      this.dataObjTwo[0].positionId = this.dataList.positionId;
      this.dataObjTwo[0].pageId = this.dataList.pageId;
      this.dataObjTwo[0].jumpPageId = this.dataList.jumpPageId;
      this.dataObjTwo[0].plateId = this.dataList.plateId;
      if (this.dataObjTwo[0].contentItemList.length > 0) {
        console.log(this.dataObjTwo[0])
        const params = {
          visPlates: this.dataObjTwo
        }
        this.$refs[dataForm].validate((valid) => {
          if (valid) {
            if (twoUnit.length > 0 || threeUnit.length > 0) {
              this.tip = '同一个子项中直接显示和浮层显示必须打开一个';
            } else if (twoValueContent.length > 0 || threeLayerContent.length > 0 || threeValueContent.length > 0) {
              this.tip = '子项的值不能为空';
            } else {
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
            }
          } else {
            this.tip = '请输入版块名称';
          }
        });
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
      if (this.value !== '不关联') {
        this.$store.state.plateConfigInfo.map((item, index) => {
          if (item.serialNumber === 2) {
            item.configCount = this.parentDataListTwo.length;
          }
        });
      }
    },
    addparentDataThree (name, idx, maxNumber) { // 类型三添加主项
      if (this.checkedLayerMerge === true) {
        this.tip = '请先取消勾选浮层子项合计项';
        return false;
      }
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
      // if (this.value.length > 0) {
      //   for (let i = 0; i < this.value.length; i++) {
      //     if (this.value[i] !== undefined && this.value[i] !== '不关联') {
      //       this.$store.state.plateConfigInfo.map((item, index) => {
      //         if (item.serialNumber === i) {
      //           item.configCount = this.parentDataListThree.length;
      //         }
      //       });
      //     }
      //   }
      // }
    },
    addChildDataListFour (name, unit, idx, maxNumber) { // 类型四添加项
      if (name || unit) {
        const length = this.childDataListFour.length;
        if (length < maxNumber) {
          const parentData = {
            itemName: '',
            plateAreaId: this.parentDataListFour[0].plateAreaId,
            serialNumber: this.childDataListFour.length + 1
          }
          const childData = {
            contentName: '',
            valueContent: '',
            valueUnit: '',
            serialNumber: 1,
            graphicFieldFlag: false,
            supernatantFieldFlag: false,
            sumFlag: false
          }
          const value = {
            itemName: '',
            plateAreaId: this.parentDataListFour[0].plateAreaId,
            serialNumber: this.childDataListFour.length + 1,
            contentSubItemList: [{
              contentName: '',
              valueContent: '',
              valueUnit: '',
              serialNumber: 1,
              graphicFieldFlag: false,
              supernatantFieldFlag: false,
              sumFlag: false
            }]
          };
          this.isActiveParent = idx + 1;
          this.childDataListFour.push(childData);
          this.parentDataListFour.push(parentData);
          this.contentItemListFour.push(value);
        } else {
          this.tip = '项可添加条数已达到上线';
        }
      } else {
        this.tip = '请先填写信息';
      }
    },
    addContentListTwo (name, unit, index, maxNumber) { // 类型二的添加子项
      let numTwo = {};
      if (name === '' && unit === '') {
        this.tip = '请填写信息';
      } else {
        if (this.checkedMerge === true) {
          this.checkedMerge = false; // 将浮层合并项的值设为false
          this.childDataListTwo.splice(this.childDataListTwo.length - 1, 1);
          this.contentItemListTwo.map((item) => {
            item.contentSubItemList.splice(item.contentSubItemList.length - 1, 1);
          });
        }
        this.contentItemListTwo.map((items, index) => {
          items.contentSubItemList.map((item, idx) => {
            numTwo[index + '_' + idx] = item.valueContent;
          });
        });
        this.numberObj = numTwo;
        if (this.childDataListTwo.length < maxNumber) {
          this.tip = '';
          let data;
          if (this.$store.state.editPlateInfo.configId === '7742d84c-7b41-4167-a5b6-8f1bb24af021' || this.$store.state.editPlateInfo.configId === 'af8c0d3d-d595-4d56-86bc-0d88b4e8dea4') {
            data = {
              contentName: '',
              valueContent: '',
              valueUnit: '',
              serialNumber: this.childDataListTwo.length + 1,
              graphicFieldFlag: true,
              supernatantFieldFlag: true,
              sumFlag: false,
              contnetSubItemExtendList: [],
              isMerge: false
            }
          } else {
            data = {
              contentName: '',
              valueContent: '',
              valueUnit: '',
              serialNumber: this.childDataListTwo.length + 1,
              graphicFieldFlag: false,
              supernatantFieldFlag: true,
              sumFlag: false,
              contnetSubItemExtendList: [],
              isMerge: false
            }
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
      let numThree = {}, numLayerThree = {};
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
          };
          const childData = {
            contentName: '',
            valueContent: '',
            valueUnit: '',
            serialNumber: this.childDataListThree.length + 1,
            graphicFieldFlag: false,
            supernatantFieldFlag: true,
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
          this.contentItemListThree.map((item) => {
            item.contentSubItemList.push(data);
          });
          if (this.checkedLayerMerge === true) {
            this.checkedLayerMerge = false; // 将浮层合并项的值设为false
            this.childDataListThree.splice(this.childDataListThree.length - 1, 1);
            this.layerDataListThree.splice(this.layerDataListThree.length - 1, 1);
            this.contentItemListThree.map((item) => {
              item.contentSubItemList.splice(item.contentSubItemList.length - 1, 1);
            });
          }
          this.contentItemListThree.map((items, index) => {
            items.contentSubItemList.map((item, idx) => {
              numThree[index + '_' + idx] = item.valueContent;
              numLayerThree[index + '_' + idx] = item.contnetSubItemExtendList[0].valueContent;
            });
          });
          this.numberLayerObjThree = numLayerThree;
          this.numberObjThree = numThree;
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
      let numberTwo = {};
      this.contentItemListTwo.map((item, index) => {
        if (item.itemName === name) {
          this.contentItemListTwo.splice(index, 1);
        }
      });
      this.isActiveParent = this.parentDataListTwo.length - 1;
      this.contentItemListTwo.map((items, index) => {
        items.contentSubItemList.map((item, idx) => {
          numberTwo[index + '_' + idx] = item.valueContent;
        });
      });
      this.numberObj = numberTwo;
      if (this.value !== '不关联') {
        this.$store.state.plateConfigInfo.map((item, index) => {
          if (item.serialNumber === 2) {
            item.configCount = this.parentDataListTwo.length;
          }
        });
      }
      let itemNameObj = {}, valueContentObj = {}, valueUnitObj = {}, percentValueOneObj = {};
      if (this.value !== '不关联') {
        const i = 2;
        this.parentDataListTwo.map((item, index) => {
          itemNameObj[index + '_' + i] = this.itemName[index + '_' + i];
          valueContentObj[index + '_' + i] = this.valueContent[index + '_' + i];
          valueUnitObj[index + '_' + i] = this.valueUnit[index + '_' + i];
          percentValueOneObj[index + '_' + i] = this.percentValueOne[index + '_' + i];
        });
        this.itemName = itemNameObj;
        this.valueContent = valueContentObj;
        this.valueUnit = valueUnitObj;
        this.percentValueOne = percentValueOneObj;
      }
    },
    deleteParentDataThree (name, idx) { // 类型三的删除主项
      this.parentDataListThree.splice(idx, 1);
      this.contentItemListThree.map((item, index) => {
        if (item.itemName === name) {
          this.contentItemListThree.splice(index, 1);
        }
      });
      this.isActiveParent = this.parentDataListThree.length - 1;
      let numThree = {}, numLayerThree = {};
      this.contentItemListThree.map((items, index) => {
        items.contentSubItemList.map((item, idx) => {
          numThree[index + '_' + idx] = item.valueContent;
          numLayerThree[index + '_' + idx] = item.contnetSubItemExtendList[0].valueContent;
        });
      });
      this.numberLayerObjThree = numLayerThree;
      this.numberObjThree = numThree;
    },
    deleteChildDataListFour (name, idx) { // 类型四的删除项
      this.parentDataListFour.splice(idx, 1);
      this.childDataListFour.map((item, index) => {
        if (item.contentName === name) {
          this.childDataListFour.splice(index, 1);
        }
      });
      let valueFour = {}, percentFour = {};
      this.contentItemListFour.splice(idx, 1);
      this.contentItemListFour.map((item, index) => {
        item.contentSubItemList.map((list, idx) => {
          if (list.serialNumber === 2) {
            percentFour[index] = list.valueContent;
          } else {
            valueFour[index] = list.valueContent;
          }
        });
      });
      this.valueContentFour = valueFour;
      this.percentValue = percentFour;
      this.isActiveParent = this.parentDataListFour.length - 1;
    },
    deleteContentListTwo (name, idx) { // 类型二的删除子项
      let numberTwo = {};
      this.childDataListTwo.splice(idx, 1);
      this.contentItemListTwo.map((items, index) => {
        items.contentSubItemList.map((item, num) => {
          if (idx === num) {
            items.contentSubItemList.splice(idx, 1);
          }
        });
      });
      this.contentItemListTwo.map((items, index) => {
        items.contentSubItemList.map((item, idx) => {
          numberTwo[index + '_' + idx] = item.valueContent;
        });
      });
      this.numberObj = numberTwo;
      if (this.checkedMerge === true) {
        if (this.childDataListTwo.length === 2) {
          this.childDataListTwo[0].graphicFieldFlag = true;
          this.contentItemListTwo.map((items, index) => {
            items.contentSubItemList[0].graphicFieldFlag = true;
          });
        }
      } else {
        if (this.childDataListTwo.length === 1) {
          this.childDataListTwo[0].graphicFieldFlag = true;
          this.contentItemListTwo.map((items) => {
            items.graphicFieldFlag = true;
          });
        }
      }
      if (this.checkedMerge === true) {
        this.isActiveChild = this.childDataListTwo.length - 2;
      } else {
        this.isActiveChild = this.childDataListTwo.length - 1;
      }
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
      let numThree = {}, numLayerThree = {};
      this.contentItemListThree.map((items, index) => {
        items.contentSubItemList.map((item, idx) => {
          numThree[index + '_' + idx] = item.valueContent;
          numLayerThree[index + '_' + idx] = item.contnetSubItemExtendList[0].valueContent;
        });
      });
      this.numberLayerObjThree = numLayerThree;
      this.numberObjThree = numThree;
      if (this.checkedLayerMerge === true) {
        if (this.childDataListThree.length === 2) {
          this.childDataListThree[0].graphicFieldFlag = true;
          this.contentItemListThree.map((items, index) => {
            this.contentSubItemList[0].graphicFieldFlag = true;
          });
        }
      } else {
        if (this.childDataListThree.length === 1) {
          this.childDataListThree[0].graphicFieldFlag = true;
          this.contentItemListThree.map((items) => {
            items.graphicFieldFlag = true;
          });
        }
      }
      if (this.checkedLayerMerge === true) {
        this.isActiveChild = this.childDataListThree.length - 2;
      } else {
        this.isActiveChild = this.childDataListThree.length - 1;
      }
    },
    changeGrapFlag (value, index) { // 类型二的改变直接显示的switch
      let checkResult = this.childDataListTwo.filter((value) => {
        return value.valueUnit === this.childDataListTwo[index].valueUnit;
      });
      this.contentItemListTwo.map((items) => {
        // items.contentSubItemList[index].graphicFieldFlag = value;
        // items.contentSubItemList.map((item, index) => {
        //   if (checkResult.length > 0) {
        //     checkResult.map((list) => {
        //       if (item.graphicFieldFlag === true) {
        //         if (list.valueUnit === item.valueUnit) {
        //           item.graphicFieldFlag = value;
        //         }
        //       }
        //     })
        //   }
        // });
        items.contentSubItemList[index].graphicFieldFlag = value;
      });
      this.childDataListTwo[index].graphicFieldFlag = value;
    },
    changeSuperFlag (value, index) { // 类型二的改变浮层显示的switch
      this.childDataListTwo[index].supernatantFieldFlag = value;
      this.contentItemListTwo.map((items) => {
        items.contentSubItemList[index].supernatantFieldFlag = value;
      });
    },
    changeGrapFlagThree (value, index) { // 类型三的改变直接显示的switch
      let checkResult = this.childDataListThree.filter((value) => {
        return value.valueUnit === this.childDataListThree[index].valueUnit;
      });
      this.contentItemListThree.map((items) => {
        items.contentSubItemList.map((item, index) => {
          if (checkResult.length > 0) {
            checkResult.map((list) => {
              if (item.graphicFieldFlag === true) {
                if (list.valueUnit === item.valueUnit) {
                  item.graphicFieldFlag = value;
                }
              }
            })
          }
        });
        items.contentSubItemList[index].graphicFieldFlag = value;
      });
      this.childDataListThree[index].graphicFieldFlag = value;
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
              if (this.numberObj[i + '_' + j] !== undefined && this.numberObj[i + '_' + j] !== '') {
                result = parseInt(result + parseInt(this.numberObj[i + '_' + j]));
              }
            }
          }
          if (result === 0) {
            data = {
              contentName: '',
              valueContent: '',
              valueUnit: this.childDataListTwo[0].valueUnit,
              serialNumber: 1,
              graphicFieldFlag: false,
              supernatantFieldFlag: true,
              sumFlag: true,
              contnetSubItemExtendList: [],
              isMerge: true
            }
          } else {
            data = {
              contentName: '',
              valueContent: result,
              valueUnit: this.childDataListTwo[0].valueUnit,
              serialNumber: 1,
              graphicFieldFlag: false,
              supernatantFieldFlag: true,
              sumFlag: true,
              contnetSubItemExtendList: [],
              isMerge: true
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
        let numTwo = {};
        this.contentItemListTwo.map((items, index) => {
          items.contentSubItemList.map((item, idx) => {
            numTwo[index + '_' + idx] = item.valueContent;
          });
        });
        this.numberObj = numTwo;
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
              if (this.numberObjThree[i + '_' + j] !== undefined && this.numberObjThree[i + '_' + j] !== '') {
                childResult = parseInt(childResult + parseInt(this.numberObjThree[i + '_' + j]));
              }
              if (this.numberLayerObjThree[i + '_' + j] !== undefined && this.numberLayerObjThree[i + '_' + j] !== '') {
                layerResult = parseInt(layerResult + parseInt(this.numberLayerObjThree[i + '_' + j]));
              }
            }
          }
          if (childResult === 0) {
            childResult = '';
          }
          if (layerResult === 0) {
            layerResult = '';
          }
          childData = {
            contentName: '',
            valueContent: childResult,
            valueUnit: this.childDataListThree[0].valueUnit,
            serialNumber: this.childDataListThree.length + 1,
            graphicFieldFlag: false,
            supernatantFieldFlag: true,
            sumFlag: true,
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
            sumFlag: true,
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
        let numThree = {}, numLayerThree = {};
        this.childDataListThree.splice(childLength - 1, 1);
        this.layerDataListThree.splice(childLength - 1, 1);
        this.contentItemListThree.map((item, index) => {
          item.contentSubItemList.splice(item.contentSubItemList.length - 1, 1);
        });
        this.contentItemListThree.map((items, index) => {
          items.contentSubItemList.map((item, idx) => {
            numThree[index + '_' + idx] = item.valueContent;
            numLayerThree[index + '_' + idx] = item.contnetSubItemExtendList[0].valueContent;
          });
        });
        this.numberLayerObjThree = numLayerThree;
        this.numberObjThree = numThree;
      }
    },
    judgeUnit () { // 类型二的判断单位是否为空或不一样
      if (this.maxNumber !== '') {
        if (this.maxNumber > 1) {
          let valueArr = [];
          let result;
          this.childDataListTwo.map((item) => {
            valueArr.push(item.valueUnit);
          });
          if (valueArr.indexOf('') === -1) {
            this.checkBoxTip = '';
            result = valueArr.every((value, index, valueArr) => {
              return value === valueArr[0];
            });
            if (result === false) {
              this.checkBoxTip = '单位不一致';
            }
          } else {
            this.checkBoxTip = '单位不能为空，请先填写单位';
            return false;
          }
          return result;
        } else {
          this.checkBoxTip = '子项只有一项，不能勾选';
          return false;
        }
      } else {
        // let valueArr = [];
        // let result;
        // this.childDataListTwo.map((item) => {
        //   valueArr.push(item.valueUnit);
        // });
        // if (valueArr.indexOf('') === -1) {
        //   this.checkBoxTip = '';
        //   result = valueArr.every((value, index, valueArr) => {
        //     return value === valueArr[0];
        //   });
        //   if (result === false) {
        //     this.checkBoxTip = '单位不一致';
        //   }
        // } else {
        //   this.checkBoxTip = '单位不能为空，请先填写单位';
        //   return false;
        // }
        // return result;
      }
    },
    judgeUnitThree () { // 类型三的判断单位是否为空或不一样
      if (this.maxNumber !== '') {
        if (this.maxNumber > 1) {
          let childUnitArr = [], layerUnitArr = [];
          let childResult, layerResult;
          for (let i = 0; i < this.childDataListThree.length; i++) {
            childUnitArr.push(this.childDataListThree[i].valueUnit);
          }
          for (let i = 0; i < this.layerDataListThree.length; i++) {
            layerUnitArr.push(this.layerDataListThree[i].valueUnit);
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
        } else {
          this.checkBoxTip = '子项只有一项，不能勾选';
          return false;
        }
      } else {
        // let childUnitArr = [], layerUnitArr = [];
        // let childResult, layerResult;
        // for (let i = 0; i < this.childDataListThree.length; i++) {
        //   childUnitArr.push(this.childDataListThree[i].valueUnit);
        // }
        // for (let i = 0; i < this.layerDataListThree.length; i++) {
        //   layerUnitArr.push(this.layerDataListThree[i].valueUnit);
        // }
        // if (childUnitArr.indexOf('') === -1 && layerUnitArr.indexOf('') === -1) {
        //   this.checkBoxTip = '';
        //   childResult = childUnitArr.every((value, index, childUnitArr) => {
        //     return value === childUnitArr[0];
        //   });
        //   layerResult = layerUnitArr.every((value, index, layerUnitArr) => {
        //     return value === layerUnitArr[0];
        //   });
        //   if (childResult === false || layerResult === false) {
        //     this.checkBoxTip = '单位不一致';
        //   }
        // } else {
        //   this.checkBoxTip = '单位不能为空，请先填写单位';
        //   return false;
        // }
        // if (childResult && layerResult) {
        //   return true;
        // } else {
        //   return false;
        // }
      }
    },
    changeRelation (value, number) {
      if (value === '不关联') {
        this.$store.state.plateConfigInfo.map((items, index) => {
          if (items.serialNumber === number) {
            items.configCount = this.$store.state.oneType[index];
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
        }
      }
    },
    setInitialData () {
      const areaDataList = this.$store.state.editPlateInfo.areaInfoList;
      const configId = this.$store.state.editPlateInfo.configId;
      let plateConfigInfoObj = JSON.parse(JSON.stringify(this.$store.state.plateConfigInfo));
      this.dataForm = {
        plateName: this.$store.state.editPlateInfo.plateName,
        remark: this.$store.state.editPlateInfo.remark
      }
      this.axios.get('/plateServices/areaInfos/' + configId + '')
        .then((res) => {
          if (res) {
            this.$store.commit('setConfigInfo', {plateConfigInfo: res.data});
            let typeArr = [];
            let oneType = [];
            res.data.map((item, index) => {
              oneType.push(item.configCount);
              if (item.areaDataType === 2 || item.areaDataType === 3) {
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
                    } else if (items.areaDataType === 2) {
                      const areaRelationList = this.$store.state.editPlateInfo.areaRelationList;
                      if (areaRelationList.length > 0) {
                        this.value = '位置' + items.serialNumber;
                        plateConfigInfoObj.map((itm, idx) => {
                          if (itm.areaDataType === 6) {
                            itm.configCount = items.contentItemList.length;
                          }
                        });
                        this.$store.commit('setConfigInfo', {plateConfigInfo: plateConfigInfoObj});
                      }
                      let unitArr = [];
                      if (items.contentItemList.length > 0) {
                        let length;
                        let parentArr = [];
                        items.contentItemList.map((list, index) => {
                          list.plateAreaId = items.plateAreaId;
                          const data = {
                            itemName: list.itemName,
                            plateAreaId: items.plateAreaId,
                            serialNumber: list.serialNumber
                          }
                          this.parentDataListTwo.push(data);
                          if (list.contentSubItemList.length > 0) {
                            length = list.contentSubItemList.length;
                            list.contentSubItemList.map((value, idx) => {
                              unitArr.push(value.valueUnit);
                              const data = {
                                contentName: value.contentName,
                                valueContent: value.valueContent,
                                valueUnit: value.valueUnit,
                                serialNumber: value.serialNumber,
                                graphicFieldFlag: value.graphicFieldFlag,
                                supernatantFieldFlag: value.supernatantFieldFlag,
                                sumFlag: value.sumFlag,
                                isMerge: value.sumFlag,
                                contnetSubItemExtendList: value.contnetSubItemExtendList
                              }
                              if (value.sumFlag === true) {
                                this.isCheckBox = true;
                                this.checkedMerge = true;
                                value.isMerge = true;
                              }
                              this.childDataListTwo.push(data);
                              let numObj = JSON.parse(JSON.stringify(this.numberObj));
                              numObj[index + '_' + idx] = value.valueContent;
                              this.numberObj = numObj;
                            });
                          }
                          this.parentDataListTwo.concat(parentArr);
                        });
                        this.contentItemListTwo = JSON.parse(JSON.stringify(items.contentItemList));
                        const newData = this.childDataListTwo.slice(0, length);
                        this.childDataListTwo = JSON.parse(JSON.stringify(newData));
                        if (this.checkedMerge === true) {
                          this.isActiveChild = this.childDataListTwo.length - 2;
                        } else {
                          this.isActiveChild = this.childDataListTwo.length - 1;
                        }
                        this.isActiveParent = this.parentDataListTwo.length - 1;
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
                          graphicFieldFlag: false,
                          supernatantFieldFlag: true,
                          sumFlag: false,
                          contnetSubItemExtendList: [],
                          isMerge: false
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
                            graphicFieldFlag: false,
                            supernatantFieldFlag: true,
                            sumFlag: false,
                            contnetSubItemExtendList: [],
                            isMerge: false
                          }]
                        }
                        this.parentDataListTwo.push(parentData);
                        this.childDataListTwo.push(childData);
                        this.contentItemListTwo.push(data);
                        console.log(this.parentDataListTwo)
                        this.isActiveChild = 0;
                        this.isActiveParent = 0;
                      }
                      const length = unitArr.length;
                      const result = unitArr.every((value, index, unitArr) => {
                        return value === unitArr[length - 1];
                      });
                      if (result === false) {
                        this.isCheckBox = false;
                        this.checkedMerge = false;
                        this.checkBoxTip = '单位不一致';
                      }
                    } else if (items.areaDataType === 3) {
                      if (items.contentItemList.length > 0) {
                        let length;
                        let parentArr = [];
                        items.contentItemList.map((list, index) => {
                          list.plateAreaId = items.plateAreaId;
                          const data = {
                            itemName: list.itemName,
                            plateAreaId: items.plateAreaId,
                            serialNumber: list.serialNumber
                          }
                          this.parentDataListThree.push(data);
                          if (list.contentSubItemList.length > 0) {
                            length = list.contentSubItemList.length;
                            list.contentSubItemList.map((value, idx) => {
                              const data = {
                                contentName: value.contentName,
                                valueContent: value.valueContent,
                                valueUnit: value.valueUnit,
                                serialNumber: value.serialNumber,
                                graphicFieldFlag: value.graphicFieldFlag,
                                supernatantFieldFlag: value.supernatantFieldFlag,
                                sumFlag: value.sumFlag,
                                isMerge: value.sumFlag,
                                contnetSubItemExtendList: []
                              }
                              if (value.sumFlag === true) {
                                this.checkBoxThree = true;
                                this.checkedLayerMerge = true;
                                value.isMerge = true;
                              }
                              this.childDataListThree.push(data);
                              this.numberObjThree[index + '_' + idx] = value.valueContent;
                              if (value.contnetSubItemExtendList.length > 0) {
                                const layerData = {
                                  contentName: value.contnetSubItemExtendList[0].contentName,
                                  valueContent: value.contnetSubItemExtendList[0].valueContent,
                                  valueUnit: value.contnetSubItemExtendList[0].valueUnit,
                                  serialNumber: value.contnetSubItemExtendList[0].serialNumber,
                                  isMerge: value.sumFlag
                                };
                                this.layerDataListThree.push(layerData);
                                this.numberLayerObjThree[index + '_' + idx] = value.contnetSubItemExtendList[0].valueContent;
                              }
                            });
                          }
                          this.parentDataListThree.concat(parentArr);
                        });
                        this.contentItemListThree = JSON.parse(JSON.stringify(items.contentItemList));
                        const newData = this.childDataListThree.slice(0, length);
                        const newLayerData = this.layerDataListThree.slice(0, length);
                        this.childDataListThree = JSON.parse(JSON.stringify(newData));
                        this.layerDataListThree = JSON.parse(JSON.stringify(newLayerData));
                        if (this.checkedLayerMerge === true) {
                          this.isActiveChild = this.childDataListThree.length - 2;
                        } else {
                          this.isActiveChild = this.childDataListThree.length - 1;
                        }
                        this.isActiveParent = this.parentDataListThree.length - 1;
                        this.rowspan = this.contentItemListThree.length;
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
                          graphicFieldFlag: false,
                          supernatantFieldFlag: true,
                          sumFlag: false,
                          contnetSubItemExtendList: [],
                          isMerge: false
                        }
                        const layerData = {
                          contentName: '',
                          valueContent: '',
                          valueUnit: '',
                          serialNumber: 1,
                          isMerge: false
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
                            graphicFieldFlag: false,
                            supernatantFieldFlag: true,
                            sumFlag: false,
                            contnetSubItemExtendList: [{
                              contentName: '',
                              valueContent: '',
                              valueUnit: '',
                              serialNumber: 1,
                              isMerge: false
                            }],
                            isMerge: false
                          }]
                        }
                        this.parentDataListThree.push(parentData);
                        this.childDataListThree.push(childData);
                        this.layerDataListThree.push(layerData);
                        this.contentItemListThree.push(data);
                        this.isActiveChild = 0;
                        this.isActiveParent = 0;
                      }
                    } else if (items.areaDataType === 4) {
                      if (items.contentItemList.length > 0) {
                        let length;
                        let parentArr = [];
                        let childData;
                        items.contentItemList.map((list, index) => {
                          list.plateAreaId = items.plateAreaId;
                          const data = {
                            itemName: list.itemName,
                            plateAreaId: items.plateAreaId,
                            serialNumber: list.serialNumber
                          }
                          this.parentDataListFour.push(data);
                          if (list.contentSubItemList.length > 0) {
                            length = list.contentSubItemList.length;
                            list.contentSubItemList.map((value, idx) => {
                              if (value.serialNumber === 2) {
                                this.percentValue[index] = value.valueContent;
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
                                this.valueContentFour[index] = value.valueContent;
                              }
                            });
                          }
                          this.childDataListFour.push(childData);
                        });
                        this.contentItemListFour = JSON.parse(JSON.stringify(items.contentItemList));
                        this.isActiveParent = this.parentDataListFour.length - 1;
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
                          graphicFieldFlag: false,
                          supernatantFieldFlag: false,
                          sumFlag: false,
                          contnetSubItemExtendList: [],
                          isMerge: false
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
                            graphicFieldFlag: false,
                            supernatantFieldFlag: false,
                            sumFlag: false,
                            contnetSubItemExtendList: [],
                            isMerge: false
                          }]
                        }
                        this.parentDataListFour.push(parentData);
                        this.childDataListFour.push(childData);
                        this.contentItemListFour.push(data);
                        this.isActiveParent = 0;
                      }
                    } else if (items.areaDataType === 5) {
                      if (items.contentItemList.length > 0) {
                        let length;
                        let parentArr = [];
                        let childData;
                        items.contentItemList.map((list, index) => {
                          list.plateAreaId = items.plateAreaId;
                          const data = {
                            itemName: list.itemName,
                            plateAreaId: items.plateAreaId,
                            serialNumber: list.serialNumber
                          }
                          this.parentDataListFour.push(data);
                          if (list.contentSubItemList.length > 0) {
                            length = list.contentSubItemList.length;
                            list.contentSubItemList.map((value, idx) => {
                              // if (value.serialNumber === 2) {
                              //   this.percentValue[index] = value.valueContent;
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
                              this.valueContentFour[index] = value.valueContent;
                              // }
                            });
                          }
                          this.childDataListFour.push(childData);
                        });
                        this.contentItemListFour = JSON.parse(JSON.stringify(items.contentItemList));
                        this.isActiveParent = this.parentDataListFour.length - 1;
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
                          graphicFieldFlag: false,
                          supernatantFieldFlag: false,
                          sumFlag: false,
                          contnetSubItemExtendList: [],
                          isMerge: false
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
                            graphicFieldFlag: false,
                            supernatantFieldFlag: false,
                            sumFlag: false,
                            contnetSubItemExtendList: [],
                            isMerge: false
                          }]
                        }
                        this.parentDataListFour.push(parentData);
                        this.childDataListFour.push(childData);
                        this.contentItemListFour.push(data);
                        this.isActiveParent = 0;
                      }
                    } else if (items.areaDataType === 6) {
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
                    }
                  }
                });
              }
            });
            this.$store.commit('setType', {typeArr: typeArr});
            this.$store.commit('setOneType', {oneType: oneType});
          }
        })
        .catch(() => {});
    },
    changePlateName (value) {
      if (value) {
        this.submitDisabled = false;
      } else {
        this.submitDisabled = true;
      }
    },
    changeThreeObj (value) {
      this.$nextTick(() => {
        this.numberObjThree = JSON.parse(JSON.stringify(this.numberObjThree))
      });
    },
    changeThreeLayerObj () {
      this.$nextTick(() => {
        this.numberLayerObjThree = JSON.parse(JSON.stringify(this.numberLayerObjThree))
      });
    },
    changeTwoObj () {
      this.$nextTick(() => {
        this.numberObj = JSON.parse(JSON.stringify(this.numberObj))
      });
    }
  }
}
</script>
<style lang='scss'>
  .bg-plate-ecl {
    height: 100%;
  }
  .cannot-modify {
    background: #eee;
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
      max-width: 100% !important;
      width: 75% !important;
      min-width: 25% !important;
      text-align: left;
    }
    thead tr th {
      font-weight: 400 !important;
      font-size: 14px;
      // border-top: 1px solid #ddd;
      background-color: #F7F7F7 !important;
    }
    thead th, tbody tr, thead tr th, tbody tr td {
      text-align: left;
    }
    .mergetr {
      color: #ffffff;
      td {
        background-color: #ccc;
        border-color: #fff;
      }
      .sumInput {
        text-align: center;
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
