<template>
  <div>
    <div style = "margin:20px 20px 20px 30px;">
      <div style="float: left">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }" ><span style="color:#0785FD;font-size:14px; margin-right:8px">页面管理</span><i class="el-icon-arrow-right" style="color:#0785FD"></i>
        </el-breadcrumb-item>
      </el-breadcrumb>
      </div>
      <div style="float: right"><el-button type="primary" size="small" @click="dialogFormVisible = true">添加页面</el-button>
        <el-dialog title="添加页面" :visible.sync="dialogFormVisible" width="500px">
          <el-form :model="form">
            <el-form-item label="页面名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <div style = "margin:20px 20px 20px 30px;">
    <el-table
    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    style="width: 100%;">
    <el-table-column
      prop="date"
      label="序号"
      width="103">
    </el-table-column>
    <el-table-column
      prop="name"
      label="页面名称"
      width="200">
    </el-table-column>
    <el-table-column
      prop="number"
      label="版块展示数量">
    </el-table-column>
      <el-table-column
        prop="details"
        label="版块详情"
        width="">
      </el-table-column>
      <el-table-column
        prop="modular"
        label=""
        width="">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">管理模块</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small">添加模块</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="operation"
        label="操作"
        width="360">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
          <i style="display: inline-block; width:1px;height:11px;background:rgba(221,221,221,1);margin: 0 12px 0 12px"></i>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
  </el-table>
      <div class="block" style="float:right; margin-top:20px">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page ="currentPage"
          :page-size="pagesize"
          layout="total, prev, pager, next, sizes, jumper"
          :total="tableData.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [{
        date: '1',
        type: 1,
        name: '王小虎',
        number: 1518,
        details: '脱贫攻坚 / 社会民生 / 经济发展 / 公共资源…'
      }, {
        date: '2',
        name: '王小虎',
        number: 67,
        details: '贫困人口概况 / 贫困类型'
      }, {
        date: '3',
        name: '王小虎',
        number: 7,
        details: '社会民生 / 经济发展 / 公共资源'
      }, {
        date: '4',
        name: '王小虎',
        number: 8,
        details: '/'
      }, {
        date: '4',
        name: '王小虎',
        number: 8,
        details: '/'
      }, {
        date: '4',
        name: '王小虎',
        number: 8,
        type: 2,
        details: '/'
      }, {
        date: '4',
        name: '王小虎',
        number: 8,
        details: '/'
      }, {
        date: '4',
        name: '王小虎',
        number: 8,
        details: '/'
      }, {
        date: '4',
        name: '王小虎',
        number: 8,
        details: '/'
      }, {
        date: '4',
        name: '王小虎',
        number: 8,
        details: '/'
      }, {
        date: '4',
        name: '王小虎',
        number: 8,
        details: '/'
      }],
      currentPage: 1,
      pagesize: 10,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    handleClick (row) {
      console.log(row);
    },
    // 分页
    handleSizeChange (size) {
      this.pagesize = size;
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage;
    }
  }
}
</script>
<style lang="scss" scoped>
  .btys label {
    color: #1d8ce0;
  }
</style>
