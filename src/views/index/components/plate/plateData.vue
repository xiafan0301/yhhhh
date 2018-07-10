<template>
  <div>
    <el-form :inline="true" :model="dataForm" class="demo-form-inline" size="small">
      <el-form-item label="板块名称">
        <el-input v-model="dataForm.plateName" placeholder="板块名称"></el-input>
      </el-form-item>
      <el-form-item label="注释">
        <el-input v-model="dataForm.remark" placeholder="注释"></el-input>
      </el-form-item>
    </el-form>
    <div class="ecl2-cr-list">
      <h3>第一步：添加项</h3>
      <table class="plate-table" style="width: 100%;">
        <thead>
        <tr>
          <th>项名称</th>
          <th v-for="item in valueSize" :key="'nmb' + item">值{{item}}单位</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in projectList" :key="'wwa' + index">
          <td><input type="text" v-model="item.name" placeholder="请填项名称"></td>
          <td v-for="(sitem, sindex) in valueSize" :key="'nmb2' + sitem">
            <input type="text" v-model="item['unit' + (sindex + 1)]" placeholder="请填单位">
          </td>
          <td>
            <i v-if="projectList.length > 1" style="font-size: 16px; cursor: pointer; color: #000;" class="el-icon-minus" @click="editProject(false, index)" title="删除此项"></i>
            <i style="font-size: 16px; cursor: pointer;  color: #000;" class="el-icon-plus" @click="editProject(true, index)" title="新增项"></i>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="ecl2-cr-list" style="margin-top: 20px;">
      <h3>第二步：添加数值</h3>
      <table class="plate-table" style="width: 100%;">
        <thead>
        <tr>
          <th>项名称</th>
          <th v-for="item in valueSize" :key="'nmb' + item">值{{item}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in projectList" :key="'wwa2' + index">
          <td class="plate-table-td-dis">{{item.name}}</td>
          <td v-for="(sitem, sindex) in valueSize" :key="'mdzz2' + sitem">
            <input type="text" v-model="item['value' + (sindex + 1)]" placeholder="添加数据">
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 填充数据
      dataForm: {
        plateName: '',
        remark: ''
      },

      baseData: [],
      reportData: [],

      oData: {
        baseData: [
          {}
        ],
        reportData: []
      },

      valueSize: 2,
      projectList: [
        {name: '测试的项目名'},
        {name: ''}
      ]
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>
