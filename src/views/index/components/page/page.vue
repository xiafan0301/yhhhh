<template>
  <div class="vis-bg-page">
      <div class="bg-page-bd">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><span style="color:#0785FD; font-size: 14px ">页面管理</span></el-breadcrumb-item>
      </el-breadcrumb>
      </div>
      <div class="bg-page-sf">
        <el-button type="primary" size="small" @click="filin('form')" class="add-page-btn">添加页面</el-button>
        <el-dialog title="添加页面" :visible.sync="dialogFormVisible" width="500px">
          <el-form :model="form" ref ="form" :rules="rules"  style="padding-right: 60px;" size="small">
            <el-form-item label="页面名称" :label-width="formLabelWidth" prop="name">
              <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" size="small">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button :loading="addPageLoading" type="primary" @click="addPage('form')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    <div class="bg-page-tb">
    <el-table
    :data="tableData"
    style="width: 100%;">
    <el-table-column
      type="index"
      label="序号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="pageName"
      label="页面名称"
      min-width="100">
    </el-table-column>
    <el-table-column
      prop="plateList.length"
      label="版块展示数量"
      min-width="100">
    </el-table-column>
      <el-table-column
        label="版块详情"
        min-width="220"
        :showOverflowTooltip = true>
        <template slot-scope="scope">
          <span v-for="(item, index)  in scope.row.plateList" :key="'fawe' + index" v-if="item">{{item.plateName}}/</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="modular"
        label=""
        min-width="100">
        <template slot-scope="scope">
          <el-button @click.native="showEditDialog(scope.row)" type="text"  v-show="scope.row.plateList.length > 0" style="padding-left: 10px">管理版块</el-button>
          <el-button @click.native="showEditDialog(scope.row)" type="text"  v-show="scope.row.plateList.length == 0">添加版块</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="operation"
        label="操作"
        min-width="100">
        <template slot-scope="scope">
          <el-button @click="modify(scope.row)" type="text"  >修改</el-button>
          <el-dialog title="修改" :visible.sync="dialogFormVisible1" width="500px">
            <el-form :model="form1" ref ="form1" :rules="rules1"  style="padding-right: 60px;" size="small">
              <el-form-item label="页面名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form1.name" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="sure('form1')">确 定</el-button>
            </div>
          </el-dialog>
          <i style="display: inline-block; width:1px;height:11px;background:rgba(221,221,221,1);margin: 0 12px 0 12px"></i>
          <el-button v-if="scope.row.homeFlag == true" type="text" size="small" disabled>删除</el-button>
          <el-button type="text" class="vis-bg-del-btn" size="small"  @click="schu(scope)" v-if="scope.row.homeFlag == false">删除</el-button>
          <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" >
            <span>确认删除吗？</span>
            <span slot="footer" class="dialog-footer">
           <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="qued()">确 定</el-button>
           </span>
          </el-dialog>
          <el-dialog title="提示" :visible.sync="dialogVisible1" width="30%"  >
            <span>无法删除，请先删除该页面中关联的版块</span>
          </el-dialog>
        </template>
      </el-table-column>
  </el-table>
      <div class="bg-page-tbp">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          @size-change="pagerSizeChange"
          :current-page ="pageNum"
          :page-size="pagesize"
          :page-sizes="[ 10, 20, 50, 100]"
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
      pageNum: 1,
      total: 0,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogVisible: false,
      dialogVisible1: false,
      addPageLoading: false,
      form: {
        name: ''
      },
      formLabelWidth: '120px',
      form1: {
        name: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ]
      },
      rules1: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ]
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
        pageSize: this.pagesize,
        pageNum: this.pageNum
      };
      this.axios.get('/pageServices/pages', {params})
        .then(res => {
          if (res.data.list) {
            this.total = res.data.total;
            this.tableData = res.data.list;
            console.log(res)
          }
        })
    },
    // 添加页面
    filin (formName) {
      this.dialogFormVisible = true;
      this.resetEditFormf('form');
    },
    resetEditFormf (formRef) {
      if (this.$refs[formRef]) {
        this.$refs[formRef].resetFields();
      }
    },
    addPage (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let params = this.form;
          params.pageName = this.form.name;
          this.addPageLoading = true;
          this.axios.post('/pageServices/page', params)
            .then(res => {
              this.getAdviceList();
              this.dialogFormVisible = false;
              this.addPageLoading = false;
            })
            .catch(() => {
              this.addPageLoading = false
            });
        } else {
          return false;
        }
      });
    },
    // 删除页面
    schu (scope) {
      if (scope.row.plateList.length === 0) {
        this.dialogVisible = true;
        this.shchupar = {
          pageId: scope.row.pageId
        };
      } else {
        this.dialogVisible1 = true;
      }
    },
    qued () {
      this.dialogVisible = false;
      this.axios.delete('/pageServices/page/' + this.shchupar.pageId)
        .then(res => {
          this.getAdviceList();
        })
    },
    // 选择管理还是添加
    showEditDialog (scope) {
      this.$router.push({name: 'plate-list', query: {pageId: scope.pageId}});
    },
    // 修改页面
    modify (scope) {
      this.resetEditForm('form1');
      this.dialogFormVisible1 = true;
      this.par = {
        pageName: scope.pageName,
        pageId: scope.pageId
      };
      this.form1.name = scope.pageName
    },
    resetEditForm (formRef) {
      if (this.$refs[formRef]) {
        this.$refs[formRef].resetFields();
      }
    },
    sure (form1) {
      this.$refs[form1].validate((valid) => {
        if (valid) {
          this.dialogFormVisible1 = false;
          this.par.pageName = this.form1.name;
          this.axios.put('/pageServices/pages', this.par)
            .then(res => {
              this.getAdviceList();
            });
          this.form1.name = '';
        } else {
          return false;
        }
      });
    },
    // 分页
    handleCurrentChange (currentPage) {
      this.pageNum = currentPage;
      this.getAdviceList()
    },
    pagerSizeChange (val) {
      this.pageNum = 1;
      this.pagesize = val;
      this.getAdviceList()
    }
  }
}
</script>
<style lang="scss" scoped>
  .vis-bg-page {
    padding: 20px 20px 20px 20px;
    height: 100%;
    overflow: auto;
  }
  .bg-page-bd {
    padding: 2px 0 10px 2px;
  }
  .bg-page-sf {
    padding-top: 14px;
    position: relative;
    .add-page-btn {
      position: absolute; top: -32px; right: 0;
      background: linear-gradient(to top, #0785FD, #07BAFD);
    }
  }
  .bg-page-tb {
    border: 1px solid #E3E3E3;
    padding-bottom: 20px;
    > .bg-page-tbp {
      text-align: right;
      padding: 20px 20px 0 0;
    }
  }
</style>
