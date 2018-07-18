<template>
<div class="plate-ecl2-c clearfix">
  <h2>图表数据</h2>
  <div class="plate-ecl2-cl">
    <img src="../../../../assets/img/temp/temp-t032.png" alt="" style="width:75%">
    <!--<div class="plate-explain">
      <h2 class="explain-title">说明</h2>
      <ul class="explain-ul">
        <li>
          <span class="explain-title-left">主项：</span>
          <span class="explain-title-right">横轴坐标节点</span>
        </li>
        <li>
          <span class="explain-title-left">直接显示：</span>
          <span class="explain-title-right">横轴坐标节点</span>
        </li>
        <li>
          <span class="explain-title-left">浮层显示：</span>
          <span class="explain-title-right">横轴坐标节点</span>
        </li>
        <li>
          <span class="explain-title-left">子项：</span>
          <span class="explain-title-right">横轴坐标节点</span>
        </li>
      </ul>
    </div>
    <div class="plate-body-left">
      <p>参考对应位置</p>
      <div class="plate-ul">
        <ul class="plate-first">
          <li>位置1</li>
          <li>位置2</li>
          <li>位置3</li>
        </ul>
        <ul class="plate-detail">
          <li>
            <span class='title-left'>a1</span><span class='title-right'>全社会用电量</span>
          </li>
          <li>
            <span class='title-left'>a1</span><span class='title-right'>全社会用电量</span>
          </li>
          <li>
            <span class='title-left'>a1</span><span class='title-right'>全社会用电量</span>
          </li>
        </ul>
        <ul class="plate-detail">
          <li>
            <span class='title-left'>a1</span><span class='title-right'>全社会用电量</span>
          </li>
          <li>
            <span class='title-left'>a1</span><span class='title-right'>全社会用电量</span>
          </li>
          <li>
            <span class='title-left'>a1</span><span class='title-right'>全社会用电量</span>
          </li>
        </ul>
        <ul class="plate-detail">
          <li>
            <span class='title-left'>a1</span><span class='title-right'>全社会用电量</span>
          </li>
          <li>
            <span class='title-left'>a1</span><span class='title-right'>全社会用电量</span>
          </li>
          <li>
            <span class='title-left'>a1</span><span class='title-right'>全社会用电量</span>
          </li>
        </ul>
      </div>
    </div>-->
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
      <div style="margin-top:3%;">
        <h2>基础数据</h2>
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
        <div class="ecl2-cr-list">
          <table class="plate-table" style="width: 100%;">
            <thead>
            <tr>
              <th>项</th>
              <th>值</th>
              <th>单位</th>
              <th>同比值(%)</th>
              <th>操作</th>
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
                <td>
                  <i v-if="projectList.length > 1" style="font-size: 16px; cursor: pointer; color: #000;" class="el-icon-minus" @click="editProject(false, index)" title="删除此项"></i>
                  <i style="font-size: 16px; cursor: pointer;  color: #000;" class="el-icon-plus" @click="editProject(true, index)" title="新增项"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style="margin-top:5%;">
        <h2>图表数据</h2>
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
              <tr>
                <td><input type="text" v-model="name" placeholder="请填主项名称"></td>
                <td width='15%'>
                  <i style="font-size: 25px; cursor: pointer; color: #DDDDDD;" class="el-icon-remove-outline" @click="editProject(false, index)" title="删除此项"></i>
                  <i style="font-size: 25px; cursor: pointer;  color: #0785FD;" class="el-icon-circle-plus-outline" @click="editProject(true, index)" title="新增项"></i>
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
            <tbody>
              <tr>
                <td><input type="text" v-model="name" placeholder="请填子项名称"></td>
                <td><input type="text" v-model="unit" placeholder="请填单位"></td>
                <td>
                  <el-switch
                    v-model="value1"
                  />
                </td>
                <td>
                  <el-switch
                    v-model="value2"
                  />
                </td>
                <td width='15%'>
                  <i style="font-size: 25px; cursor: pointer; color: #DDDDDD;" class="el-icon-remove-outline" @click="editProject(false, index)" title="删除此项"></i>
                  <i style="font-size: 25px; cursor: pointer;  color: #0785FD;" class="el-icon-circle-plus-outline" @click="editProject(true, index)" title="新增项"></i>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="checkbox">
            <template>
              <el-checkbox v-model="checked">添加浮层合计项</el-checkbox>
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
            <tbody>
              <tr v-for="(item, index) in projectList" :key="'list'+index">
                <td>{{item.name}}</td>
                <td>{{item.childName}}</td>
                <td><input type="text" v-model="item.value" placeholder="请填值"></td>
                <td>{{item.percent}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      name: '',
      unit: '',
      childName: '',
      value2: 100,
      value1: 0,
      dataForm: {
        plateName: '',
        remark: ''
      },
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
      valueSize: 2,
      options: [{
        value: '不关联',
        label: '不关联'
      }, {
        value: '关联',
        label: '关联'
      }],
      value: ''
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
    thead tr {
      border: 1px solid;
    }
  }
</style>
