<template>
  <div>
    <div style = "margin:20px 20px 20px 30px; padding-bottom: 20px;">
      <div style="float: left">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }" ><span style="color:#0785FD;font-size:14px; margin-right:8px">页面管理</span><i class="el-icon-arrow-right" style="color:#0785FD"></i>
        </el-breadcrumb-item>
      </el-breadcrumb>
      </div>
      <div style="float: right;">
        <el-button type="primary" size="small" @click="dialogFormVisible = true">添加页面</el-button>
        <el-dialog title="添加页面" :visible.sync="dialogFormVisible" width="500px">
          <el-form :model="form" ref ="form">
            <el-form-item label="页面名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addPage()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <div style = "margin:20px 20px 20px 30px;">
    <el-table
    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    style="width: 100%;">
    <el-table-column
      type="index"
      label="序号"
      width="103">
    </el-table-column>
    <el-table-column
      prop="pageName"
      label="页面名称"
      width="200">
    </el-table-column>
    <el-table-column
      prop="plateList.length"
      label="版块展示数量">
    </el-table-column>
      <el-table-column
        prop=""
        label="版块详情"
        width=""
        :showOverflowTooltip = true>
        <template slot-scope="scope">
          <span v-for="(item, index)  in scope.row.plateList" :key="'fawe' + index">{{item.plateName}}/</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="modular"
        label=""
        width=" ">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope)" type="text" size="small" v-show="scope.row.plateList.length > 0" style="padding-left: 10px">管理模块</el-button>
          <el-button @click="handleClick(scope)" type="text" size="small" v-show="scope.row.plateList.length == 0">添加模块</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="operation"
        label="操作"
        width="">
        <template slot-scope="scope">
          <el-button @click="modify(scope.row)" type="text" size="small" >修改</el-button>
          <el-dialog title="修改" :visible.sync="dialogFormVisible1" width="500px">
            <el-form :model="form1" ref ="form1">
              <el-form-item label="修改" :label-width="formLabelWidth">
                <el-input v-model="form1.name" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="sure(scope.row)">确 定</el-button>
            </div>
          </el-dialog>
          <i style="display: inline-block; width:1px;height:11px;background:rgba(221,221,221,1);margin: 0 12px 0 12px"></i>
          <el-button type="text" size="small"  @click="schu(scope)">删除</el-button>
          <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" >
            <span>点击确认删除后，设置到该页面上的版块将变为异常状态，确认删除吗？</span>
            <span slot="footer" class="dialog-footer">
           <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="qued()">确 定</el-button>
           </span>
          </el-dialog>
        </template>
      </el-table-column>
  </el-table>
      <div class="block" style="float:right; margin-top:20px">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page ="currentPage"
          :page-size="pagesize"
          :page-sizes="[10, 20]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      shchupar: {},
      par: {},
      tableData: [
      ],
      currentPage: 1,
      pagesize: 10,
      total: 0,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogVisible: false,
      form: {
        name: ''
      },
      formLabelWidth: '120px',
      form1: {
        name: ''
      }
    }
  },
  computed: {
  },
  mounted () {
    this.getAdviceList();
  },
  methods: {
    // 获取数据
    getAdviceList () {
      let params = {
        pagesize: this.pagesize,
        pageNum: this.pageNum
      };
      this.axios.get('/vis/pageServices/pages', {params})
        .then(res => {
          if (res.data.list) {
            this.total = res.data.total;
            this.tableData = res.data.list;
            console.log(res)
          }
        })
    },
    // 添加页面
    addPage () {
      this.dialogFormVisible = false;
      let params = this.form;
      params.pageName = this.form.name;
      this.axios.post('/vis/pageServices/page', params)
        .then(res => {
          this.getAdviceList();
        });
      this.form.name = '';
    },
    // 删除页面
    schu (scope) {
      this.dialogVisible = true;
      this.shchupar = {
        pageId: scope.row.pageId
      };
    },
    qued () {
      this.dialogVisible = false;
      this.axios.delete('/vis/pageServices/page/' + this.shchupar.pageId)
        .then(res => {
          this.getAdviceList();
        })
    },
    // 选择管理还是添加
    handleClick (scope) {
      console.log(scope);
    },
    // 修改页面
    modify (scope) {
      this.dialogFormVisible1 = true;
      this.par = {
        pageName: scope.pageName,
        pageId: scope.pageId
      };
      this.form1.name = scope.pageName
    },
    sure () {
      this.dialogFormVisible1 = false;
      this.par.pageName = this.form1.name;
      this.axios.put('/vis/pageServices/pages', this.par)
        .then(res => {
          this.getAdviceList();
        });
      this.form1.name = '';
    },
    // 分页
    handleCurrentChange (currentPage) {
      this.pageNum = currentPage;
      this.getAdviceList()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
