<template>
  <div class="bg-plate-tb">
    <!--贫困村表格-->
    <el-table :data="plateList.slice((currentPage-1)*pageSize,currentPage*pageSize)"  highlight-current-row style="width: 100%;" >
      <el-table-column type="index" width="100" label="序号"></el-table-column>
      <el-table-column prop="locationName" label="村名" min-width="180"></el-table-column>
      <el-table-column prop="longitude" label="坐标" min-width="100">
      </el-table-column>
      <el-table-column prop="dataExtendList[0].valueContent" label="贫困户数" min-width="180"></el-table-column>
      <el-table-column prop="dataExtendList[1].valueContent" label="贫困人数" min-width="120"></el-table-column>
      <el-table-column prop="dataExtendList[2].valueContent" label="地址" min-width="100">
      </el-table-column>
      <el-table-column label="操作" min-width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="modify(scope)">修改</el-button>
          <el-dialog title="修改" :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="form" ref ="form">
              <el-form-item label="村名" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="贫困户数" :label-width="formLabelWidth">
                <el-input v-model="form.households" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="贫困人数" :label-width="formLabelWidth">
                <el-input v-model="form.pople" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="地址" :label-width="formLabelWidth">
                <el-input v-model="form.addrs" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="sure()">确 定</el-button>
            </div>
          </el-dialog>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="bg-plate-tbp">
      <el-pagination
        @size-change="pagerSizeChange"
        @current-change="pagerCurrChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, prev, pager, next, sizes, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      plateList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageList: [
      ],
      dialogFormVisible: false,
      formLabelWidth: '100px',
      form: {
        name: '',
        households: '',
        pople: '',
        addrs: ''
      },
      obj: {}
    }
  },
  computed: {
  },
  created () {
    this.getPlateList();
  },
  mounted () {
  },
  methods: {
    // 分页
    pagerSizeChange (val) {
      this.pager.pageNum = 1;
      this.pager.pageSize = val;
      this.getPlateList();
    },
    pagerCurrChange (val) {
      this.pageNum = val;
      this.getPlateList();
    },
    // 获取数据
    getPlateList () {
      this.axios.get('/vis/mapServices/datas?where.dataTypeId=4fce5edb-7092-4455-971b-6f8526d6a827')
        .then(res => {
          this.plateList = res.data.list;
          this.total = res.data.total;
        })
    },
    // 修改数据
    modify (scope) {
      this.dialogFormVisible = true;
      this.obj = {
        dataExtendList: [
          {
            extendId: scope.row.dataExtendList[0].extendId,
            dataId: scope.row.dataExtendList[0].dataId,
            contentName: scope.row.dataExtendList[0].contentName,
            valueContent: scope.row.dataExtendList[0].valueContent,
            valueUnit: scope.row.dataExtendList[0].valueUnit,
            serialNumber: scope.row.dataExtendList[0].serialNumber,
            createTime: scope.row.dataExtendList[0].createTime,
            updateTime: scope.row.dataExtendList[0].updateTime,
            delFlag: scope.row.dataExtendList[0].delFlag,
            ownerGroupId: scope.row.dataExtendList[0].ownerGroupId,
            ownerOrgId: scope.row.dataExtendList[0].ownerOrgId,
            authUserId: scope.row.dataExtendList[0].authUserId,
            opUserId: scope.row.dataExtendList[0].opUserId
          },
          {
            extendId: scope.row.dataExtendList[1].extendId,
            dataId: scope.row.dataExtendList[1].dataId,
            contentName: scope.row.dataExtendList[1].contentName,
            valueContent: scope.row.dataExtendList[1].valueContent,
            valueUnit: scope.row.dataExtendList[1].valueUnit,
            serialNumber: scope.row.dataExtendList[1].serialNumber,
            createTime: scope.row.dataExtendList[1].createTime,
            updateTime: scope.row.dataExtendList[1].updateTime,
            delFlag: scope.row.dataExtendList[1].delFlag,
            ownerGroupId: scope.row.dataExtendList[1].ownerGroupId,
            ownerOrgId: scope.row.dataExtendList[1].ownerOrgId,
            authUserId: scope.row.dataExtendList[1].authUserId,
            opUserId: scope.row.dataExtendList[1].opUserId
          },
          {
            extendId: scope.row.dataExtendList[2].extendId,
            dataId: scope.row.dataExtendList[2].dataId,
            contentName: scope.row.dataExtendList[2].contentName,
            valueContent: scope.row.dataExtendList[2].valueContent,
            valueUnit: scope.row.dataExtendList[2].valueUnit,
            serialNumber: scope.row.dataExtendList[2].serialNumber,
            createTime: scope.row.dataExtendList[2].createTime,
            updateTime: scope.row.dataExtendList[2].updateTime,
            delFlag: scope.row.dataExtendList[2].delFlag,
            ownerGroupId: scope.row.dataExtendList[2].ownerGroupId,
            ownerOrgId: scope.row.dataExtendList[2].ownerOrgId,
            authUserId: scope.row.dataExtendList[2].authUserId,
            opUserId: scope.row.dataExtendList[2].opUserId
          }
        ],
        dataId: scope.row.dataId,
        dataTypeId: scope.row.dataTypeId,
        iconType: scope.row.iconType,
        latitude: scope.row.latitude,
        locationName: scope.row.locationName,
        locationTag: scope.row.locationTag,
        longitude: scope.row.longitude
      };
      console.log(this.obj)
    },
    sure () {
      this.dialogFormVisible = false;
      let params = this.obj;
      params.locationName = this.form.name;
      params.dataExtendList[0].valueContent = this.form.households;
      params.dataExtendList[1].valueContent = this.form.pople;
      params.dataExtendList[2].valueContent = this.form.addrs;
      this.axios.put('/vis/mapServices/datas', params)
        .then(res => {
          this.getPlateList();
        })
    },
    showEditDialog (flag) {
      this.editDialogVisible = flag;
    },
    showTypeChange (item) {
      // console.log(item)
      // active 已经变了
    }
  }
}
function getTestData () {
  return [
    {plateId: '1', plateName: '贫困人口概述', pageId: '002', pageName: '脱贫攻坚', serialNumber: 11, plateType: 1, jumpPageId: '', active: true, remark: '2017年数据'},
    {plateId: '2', plateName: '人口分布', pageId: '003', pageName: '脱贫攻坚', serialNumber: 32, plateType: 1, jumpPageId: '', active: false, remark: '2017年数据'}
  ];
}
</script>
<style lang="scss" scoped>
  .bg-plate-tb {
    border: 1px solid #E3E3E3;
    padding-bottom: 20px;
    > .bg-plate-tbp {
      text-align: right;
      padding: 20px 20px 0 0;
    }
  }
</style>
