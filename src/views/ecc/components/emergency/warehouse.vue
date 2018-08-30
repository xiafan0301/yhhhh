<template>
  <div class="add-plan-person">
    <div class='add-msg-header'>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>应急库</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'emergency-materialList'}" >物资管理</el-breadcrumb-item>
        <el-breadcrumb-item >{{status}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='add-msg-body'>
      <div class='add-form-person'>
        <el-form class='form-content-person' :model="form">
          <el-form-item label="仓库名称" label-width='150px'>
            <el-input  placeholder="请选择APP用户" style='width: 500px' v-model="form.warehouseName">
            </el-input>
          </el-form-item>
          <el-form-item label="仓库地点" label-width='150px'>
            <el-input  placeholder="请选择APP用户" style='width: 500px' v-model="form.coordinate">
            </el-input>
          </el-form-item>
          <el-form-item label="上报单位" label-width='150px'>
            <el-select  placeholder="请选择APP用户" style='width: 500px' v-model="form.reportingUnit">
              <el-option label="联动单位" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责人" label-width='150px'>
            <el-input  placeholder="请选择APP用户" style='width: 500px' v-model="form.administrators">
            </el-input>
          </el-form-item>
          <el-form-item label="联系电话" label-width='150px'>
            <el-input  placeholder="请选择APP用户" style='width: 500px' v-model="form.adminTel">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class='operation-btn-msg' >
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="onSubmit" >确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      status: '',
      form: {
        adminTel: '',
        administrators: '',
        coordinate: '',
        reportingUnit: '1f1a9b3e-ddc3-4def-9825-aaa4c1f53458',
        warehouseAddress: '',
        warehouseId: '',
        warehouseName: ''
      },
      gg: ''
    }
  },
  created () {
    if (this.$route.query.status === 'modify') {
      this.getmaterialck()
    }
  },
  computed: {
  },
  mounted () {
    if (this.$route.query.status === 'add') {
      this.status = '添加仓库'
    } else if (this.$route.query.status === 'modify') {
      this.status = '修改仓库'
    }
  },
  methods: {
    getmaterialck () {
      const warehouseId = this.$route.query.warehouseId;
      this.axios.get('A2/warehouseService/' + warehouseId)
        .then((res) => {
          this.form = Object.assign({}, res.data);
          this.form.coordinate = res.data.longitude + ',' + res.data.latitude
        })
    },
    onSubmit () {
      if (this.$route.query.status === 'add') {
        let params = this.form;
        params.longitude = this.form.coordinate.split(',')[0];
        params.latitude = this.form.coordinate.split(',')[1];
        console.log(params);
        this.axios.post('A2/warehouseService', params)
          .then((res) => {
            console.log(res);
            this.$router.push({name: 'emergency-materialList'});
          })
      } else {
        let params = this.form;
        params.longitude = this.form.coordinate.split(',')[0];
        params.latitude = this.form.coordinate.split(',')[1];
        this.axios.put('A2/warehouseService/updateOne', params)
          .then((res) => {
            console.log(res);
            this.$router.push({name: 'emergency-materialList'});
          })
      }
    },
    cancel () {
      this.$router.push({name: 'emergency-materialList'});
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>
<style lang="scss">
  .add-plan-person {
    padding: 20px;
    .add-msg-header {
      margin-bottom: 20px;
    }
    .add-msg-body {
      .add-form-person {
        background-color: #fff;
        padding-bottom: 5%;
        .form-content-person {
          padding-top: 2%;
          .el-form-item {
            margin-bottom: 15px;
          }
        }
      }
    }
    .operation-btn-msg {
      margin-top: 2%;
    }
  }
</style>
