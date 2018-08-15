<template>
<div class="bg-plate-ecl bg-plate-ecl2" v-show="this.$store.state.progressIndex === 3" style='width:100%'>
  <div class="plate-ecl2-c clearfix" style='border-bottom: 1px solid #ddd'>
    <h2 style='font-weight: bold;padding: 0 190px 10px'>示例注解图 - {{this.$store.state.plateInfo.configCode}}</h2>
    <div class="plate-ecl2-cl">
      <img :src="this.$store.state.plateInfo.markUrl">
      <!-- <img :src="markUrl" alt=""> -->
    </div>
    <div class="plate-ecl2-cr">
      <div>
        <el-form :inline="true" :model="dataForm" class="demo-form-inline" ref='dataForm' :rules='rules' size="small">
          <el-form-item label="版块名称" prop='plateName'>
            <el-input v-model="dataForm.plateName" placeholder="必填" :maxlength='maxlength' @change='changePlateName($event)'></el-input>
          </el-form-item>
          <el-form-item label="注释" prop='remark'>
            <el-input v-model="dataForm.remark" placeholder="选填" :maxlength='maxlength'></el-input>
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
                        <span v-show='false'>{{item.plateAreaId=info.plateAreaId}}</span>
                        <td><input type="text" v-model="item.itemName" placeholder='请填写'></td>
                        <td width='15%'>
                          <template v-if="parentDataListThree.length > 1">
                            <img
                              :src='reduceImg'
                              style="cursor: pointer;"
                              @click="deleteParentDataThree(item.itemName, index)"
                            />
                          </template>
                          <template v-if="isActiveParent === index">
                            <img
                              :src="addImg"
                              style="cursor: pointer;"
                              @click="addparentDataThree(item.itemName, index, info.mainMaxCount)"
                            />
                          </template>
                          <template v-else>
                            <img :src="unactiveImg" />
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
                          <td class='cannot-modify'>{{item.valueUnit}}</td>
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
                                  :src="reduceImg"
                                  style="cursor: pointer;"
                                  @click="deleteContentListThree(item.contentName, index)"
                                />
                              </template>
                            </template>
                            <template v-else>
                              <template v-if="childDataListThree.length > 1">
                                <img
                                  :src="reduceImg"
                                  style="cursor: pointer;"
                                  @click="deleteContentListThree(item.contentName, index)"
                                />
                              </template>
                            </template>
                            <template v-if="isActiveChild=== index">
                              <img
                                :src="addImg"
                                style="cursor: pointer;"
                                @click="addContentListThree(item.contentName, item.valueUnit, index, info.subMaxCount)"
                              />
                            </template>
                            <template v-else>
                              <img :src="unactiveImg" />
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
                      <th>单位</th>
                    </tr>
                    </thead>
                    <tbody v-for="(item, index) in layerDataListThree" :key="'item'+index">
                      <template v-if='item.isMerge === true'>
                        <tr class='mergetr'>
                          <td class='cannot-modify'>合计（{{childDataListThree[index].contentName}}）</td>
                          <td>
                            合计(<input type="text" v-model="item.contentName" placeholder='请填写'>)
                          </td>
                          <td class='cannot-modify'>{{item.valueUnit}}</td>
                        </tr>
                      </template>
                      <template v-else>
                        <tr>
                          <td class='cannot-modify'>{{childDataListThree[index].contentName}}</td>
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
                        @change="changeLayerMerge($event, info.subMaxCount)"
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
                        <th rowspan='2' style='border-right: 1px solid #DDDDDD'>主项</th>
                        <th colspan='3' style='border-right: 1px solid #DDDDDD;text-align: center;border-bottom:1px solid #ddd'>子项</th>
                        <th colspan='3' style='text-align: center;border-bottom:1px solid #ddd'>浮层并列项</th>
                      </tr>
                      <tr>
                        <th width='100px'>子项名称</th>
                        <th>值</th>
                        <th style='border-right: 1px solid #DDDDDD'>单位</th>
                        <th width='100px'>浮层并列项名称</th>
                        <th>值</th>
                        <th>单位</th>
                      </tr>
                    </thead>
                    <tbody v-for="(items, index) in contentItemListThree" :key="'items'+index">
                      <span v-show='false'>{{items.plateAreaId = info.plateAreaId}}</span>
                      <span v-show='false'>{{items.serialNumber = parseInt(index+1)}}</span>
                      <tr v-for="(list, idx) in items.contentSubItemList" :key="'list'+idx">
                        <template v-if='list.isMerge === true'>
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
                          <td><input type="text" onkeyup="this.value=this.value.replace(/[^\-?\d.]/g, '')" v-model="numberObjThree[index + '_' + idx]" placeholder='请填写'></td>
                          <td class='cannot-modify'>{{list.valueUnit}}</td>
                          <td class='cannot-modify'>{{list.contnetSubItemExtendList[0].contentName}}</td>
                          <td><input type="text" onkeyup="this.value=this.value.replace(/[^\-?\d.]/g, '')" v-model="numberLayerObjThree[index + '_' + idx]" placeholder='请填写'></td>
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
                        <span v-show='false'>{{item.plateAreaId=info.plateAreaId}}</span>
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
                          <template v-if="isActiveParent === idx">
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
                          <td class='cannot-modify'>{{item.valueUnit}}</td>
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
                            <!-- <template v-if='isCheckBox === true'> -->
                            <template v-if="$store.state.plateInfo.configCode === 'plate015' || $store.state.plateInfo.configCode === 'plate041'">
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
                                  :src='reduceImg'
                                  style="cursor: pointer;"
                                  @click="deleteContentListTwo(item.contentName, idx, info.subMaxCount)"
                                />
                              </template>
                            </template>
                            <template v-else>
                              <template v-if="childDataListTwo.length > 1">
                                <img
                                  :src='reduceImg'
                                  style="cursor: pointer;"
                                  @click="deleteContentListTwo(item.contentName, idx, info.subMaxCount)"
                                />
                              </template>
                            </template>
                            <template v-if="isActiveChild === idx">
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
                        @change="changeMerge($event, info.subMaxCount)"
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
                          <td class='cannot-modify'>{{item.itemName}}</td>
                          <td class='cannot-modify'>{{value.contentName}}</td>
                          <td>
                            <input
                              type="text"
                              v-model="numberObj[index + '_' + idx]"
                              placeholder='请填写'
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
                          <template v-if='isActiveParent === index'>
                            <img
                              :src="addImg"
                              style="cursor: pointer;"
                              @click="addChildDataListFour(item.itemName, childDataListFour[index].valueUnit, index, info.mainMaxCount)"
                            />
                          </template>
                          <template v-else>
                            <img :src="unactiveImg" />
                          </template>
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
                    <tbody v-for="(items, index) in contentItemListFour" :key="'items'+index">
                      <tr>
                        <span v-show='false'>{{items.plateAreaId = info.plateAreaId}}</span>
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
                          <template v-if='isActiveParent === index'>
                            <img
                              :src="addImg"
                              style="cursor: pointer;"
                              @click="addChildDataListFour(item.itemName, childDataListFour[index].valueUnit, index, info.mainMaxCount)"
                            />
                          </template>
                          <template v-else>
                            <img :src="unactiveImg" />
                          </template>
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
                        <th style='width:50%'>项名称</th>
                        <th>值</th>
                      </tr>
                    </thead>
                    <tbody v-for="(items, index) in contentItemListFour" :key="'items'+index">
                      <tr>
                        <span v-show='false'>{{items.plateAreaId = info.plateAreaId}}</span>
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
    <el-button
      @click.native="nextStep('dataForm')"
      type="primary" class='selectBtn'
      :disabled='submitDisabled' :style="[submitDisabled === true ? styleObj : '']">&nbsp;&nbsp;&nbsp;&nbsp;完成&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
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
      maxNumber: '', // 子项的最大项
      styleObj: {
        background: '#ddd'
      },
      submitDisabled: true,
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
      isActiveParent: 0,
      isActiveChild: 0,
      configCount: 0,
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
      percentValue: [], // 类型四的同比值
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
        plateType: 1,
        plateId: '',
        remark: '',
        contentItemList: [],
        areaRelationList: []
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
      contentItemListFour: [{
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
        if (newVal) {
          const parentLength = this.parentDataListTwo.length; // 获取主项的长度
          const childLength = this.childDataListTwo.length; // 获取子项的长度
          for (let i = 0; i < parentLength; i++) {
            let childResult = 0;
            for (let j = 0; j < childLength; j++) {
              if (this.childDataListTwo[j].supernatantFieldFlag === true) {
                if (newVal[i + '_' + j] !== undefined && newVal[i + '_' + j] !== '') {
                  childResult = parseInt(childResult + parseInt(newVal[i + '_' + j]));
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
          for (let i in this.numberObj) {
            let str = i.split('_');
            if (this.numberObj[i] !== undefined && this.numberObj[i] !== '') {
              twoObj[parseInt(str[0])].contentSubItemList[parseInt(str[1])].valueContent = this.numberObj[i];
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
    parentDataListFour: {
      handler: function (newVal) {
        this.contentItemListFour.map((items, index) => {
          items.itemName = this.parentDataListFour[index].itemName;
          items.contentSubItemList.map((item, idx) => {
            item.contentName = this.parentDataListFour[index].itemName;
          });
        });
        this.parentDataListFour.map((item, index) => {
          this.childDataListFour[index].contentName = item.itemName;
        });
      },
      deep: true
    },
    childDataListFour: { // 监听类型四的项
      handler: function (newVal) {
        this.contentItemListFour.map((items, index) => {
          items.contentSubItemList.map((item, idx) => {
            if (item.valueUnit !== this.childDataListFour[index].valueUnit) {
              this.childDataListFour.map((value) => {
                value.valueUnit = this.childDataListFour[index].valueUnit;
              });
            }
            item.contentName = this.childDataListFour[index].contentName;
            item.valueUnit = this.childDataListFour[index].valueUnit;
            item.valueContent = this.childDataListFour[index].valueContent;
          });
        });
      },
      deep: true
    },
    childDataListTwo: { // 监听类型二的子项
      handler: function (newVal) {
        let result = [];
        let unitArr = [];
        newVal.map((item, index) => {
          unitArr.push(item.valueUnit);
        });
        this.contentItemListTwo.map((items, index) => {
          if (items.contentSubItemList) {
            items.contentSubItemList.map((item, idx) => {
              const length = unitArr.length;
              const resultArr = unitArr.every((value, index, unitArr) => {
                return value === unitArr[length - 1];
              });
              if (item.isMerge === true) {
                if (resultArr === false) {
                  this.checkedMerge = false; // 将浮层合并项设为未选中
                  this.childDataListTwo.splice(length - 1, 1);
                  items.contentSubItemList.splice(items.contentSubItemList.length - 1, 1);
                  return;
                }
              }
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
        if (this.$store.state.plateInfo.configCode !== 'plate015' && this.$store.state.plateInfo.configCode !== 'plate041') {
          if (result.length > 0) {
            this.childDataListTwo.map((list, index) => {
              if (list.graphicFieldFlag === true) {
                result.map((item) => {
                  if (item.valueUnit === list.valueUnit) {
                    list.graphicFieldFlag = true;
                  } else {
                    list.graphicFieldFlag = false;
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
      handler: function (newVal) {
        if (newVal) {
          const parentLength = this.parentDataListThree.length; // 获取主项的长度
          const childLength = this.childDataListThree.length; // 获取子项的长度
          for (let i = 0; i < parentLength; i++) {
            let childResult = 0;
            for (let j = 0; j < childLength; j++) {
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
          let threeObj = JSON.parse(JSON.stringify(this.contentItemListThree));
          for (let i in newVal) {
            let str = i.split('_');
            if (this.numberObjThree[i] !== undefined && this.numberObjThree[i] !== '') {
              threeObj[parseInt(str[0])].contentSubItemList[parseInt(str[1])].valueContent = newVal[i];
            } else {
              threeObj[parseInt(str[0])].contentSubItemList[parseInt(str[1])].valueContent = '';
            }
          }
          this.contentItemListThree = threeObj;
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
      this.contentItemListFour.map((item, index) => {
        item.serialNumber = this.dataObjTwo[0].contentItemList.length + 1;
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
          item.contentSubItemList.push(data);
        }
        if (item.itemName !== '') {
          this.dataObjTwo[0].contentItemList.push(item);
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
      this.dataObjTwo[0].plateId = '';
      if (this.dataObjTwo[0].contentItemList.length > 0) {
        const params = {
          visPlates: this.dataObjTwo
        }
        this.$refs[dataForm].validate((valid) => {
          if (valid) {
            this.tip = '';
            this.axios.post('/plateServices/plateBatch', params.visPlates)
              .then((res) => {
                if (res) {
                  if (res.data.length > 0) {
                    this.$message({
                      showClose: true,
                      message: '添加版块成功',
                      type: 'success'
                    });
                    this.$store.commit('setProgressIndex', {progressIndex: 4});
                    this.$router.push({name: 'plate-list'});
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
          } else {
            this.tip = '请输入版块名称';
          }
        });
      }
      // this.submitDisabled = true;
    },
    addparentDataTwo (name, idx, maxNumber) { // 类型二添加主项
      let arr = [];
      this.childDataListTwo.map((item, index) => {
        if (item) {
          arr.push(item);
        }
      });
      const valueData = {
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
          this.contentItemListTwo.push(valueData);
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
    },
    addChildDataListFour (name, unit, idx, maxNumber) { // 类型四添加项
      const length = this.parentDataListFour.length;
      if (name || unit) {
        if (length < maxNumber) {
          const parentData = {
            itemName: '',
            plateAreaId: this.contentItemListFour[0].plateAreaId,
            serialNumber: this.contentItemListFour.length + 1
          }
          const childData = {
            contentName: '',
            valueContent: '',
            valueUnit: this.childDataListFour[0].valueUnit,
            serialNumber: 1,
            graphicFieldFlag: false,
            supernatantFieldFlag: false,
            sumFlag: false
          }
          const data = {
            itemName: '',
            plateAreaId: this.contentItemListFour[0].plateAreaId,
            serialNumber: this.contentItemListFour.length + 1,
            contentSubItemList: [{
              contentName: '',
              valueContent: '',
              valueUnit: this.childDataListFour[0].valueUnit,
              serialNumber: 1,
              graphicFieldFlag: false,
              supernatantFieldFlag: false,
              sumFlag: false
            }]
          }
          this.parentDataListFour.push(parentData);
          this.childDataListFour.push(childData);
          this.contentItemListFour.push(data);
          this.isActiveParent = idx + 1;
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
          let data;
          if (this.$store.state.plateInfo.configCode === 'plate015' || this.$store.state.plateInfo.configCode === 'plate041') {
            data = {
              contentName: '',
              valueContent: '',
              valueUnit: '',
              serialNumber: this.childDataListTwo.length + 1,
              graphicFieldFlag: true,
              supernatantFieldFlag: false,
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
              supernatantFieldFlag: false,
              sumFlag: false,
              contnetSubItemExtendList: [],
              isMerge: false
            }
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
      let numberTwo = {};
      this.parentDataListTwo.splice(idx, 1);
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
      this.parentDataListFour.map((item, index) => {
        if (item.itemName === name) {
          this.parentDataListFour.splice(idx, 1);
        }
      });
      this.contentItemListFour.map((item, index) => {
        if (item.itemName === name) {
          this.contentItemListFour.splice(idx, 1);
        }
      });
      this.isActiveParent = this.parentDataListFour.length - 1;
    },
    deleteContentListTwo (name, idx, maxNumber) { // 类型二的删除子项
      let numberTwo = {};
      this.childDataListTwo.splice(idx, 1);
      this.contentItemListTwo.map((items, index) => {
        items.contentSubItemList.map((item, num) => {
          if (idx === num) {
            items.contentSubItemList.splice(idx, 1);
          }
        });
      });
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
      this.contentItemListTwo.map((items, index) => {
        items.contentSubItemList.map((item, idx) => {
          numberTwo[index + '_' + idx] = item.valueContent;
        });
      });
      this.numberObj = numberTwo;
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
      this.isActiveChild = this.childDataListThree.length - 1;
    },
    changeGrapFlag (value, index) { // 类型二的改变直接显示的switch
      let checkResult = this.childDataListTwo.filter((value) => {
        return value.valueUnit === this.childDataListTwo[index].valueUnit;
      });
      this.contentItemListTwo.map((items) => {
        items.contentSubItemList[index].graphicFieldFlag = value;
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
      });
      this.childDataListThree[index].graphicFieldFlag = value;
    },
    changeSuperFlagThree (value, index) { // 类型三的改变浮层显示的switch
      this.childDataListThree[index].supernatantFieldFlag = value;
      this.contentItemListThree.map((items) => {
        items.contentSubItemList[index].supernatantFieldFlag = value;
      });
    },
    changeMerge (value, maxNumber) { // 类型二的勾选合并项
      if (maxNumber > 1) {
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
                if (result === 0) {
                  result = '';
                }
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
      }
    },
    changeLayerMerge (value, maxNumber) { // 类型三的勾选浮层合并项
      if (maxNumber > 1) {
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
          this.childDataListThree.splice(childLength - 1, 1);
          this.layerDataListThree.splice(childLength - 1, 1);
          this.contentItemListThree.map((item) => {
            item.contentSubItemList.splice(item.contentSubItemList.length - 1, 1);
          });
        }
      }
    },
    judgeUnit () { // 类型二的判断单位是否为空或不一样
      if (this.maxNumber > 1) {
        let valueArr = [];
        let result;
        for (let i = 0; i < this.childDataListTwo.length; i++) {
          valueArr.push(this.childDataListTwo[i].valueUnit);
        }
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
        this.checkBoxTip = '只有一项子项，不能勾选';
        return false;
      }
    },
    judgeUnitThree () { // 类型三的判断单位是否为空或不一样
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
        this.checkBoxTip = '只有一项子项，不能勾选';
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
        }
      }
    },
    changePlateName (value) {
      if (value) {
        this.submitDisabled = false;
      } else {
        this.submitDisabled = true;
      }
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
      width: 75% !important;
      text-align: left;
      min-width: 25% !important;
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
        background-color: #cccccc;
        border-color: #fff;
      }
      input {
        background:transparent;
        color:#fff;
        text-align: center;
      }
    }
  }
  .stepH2 {
    font-weight: bolder !important;
  }
</style>
