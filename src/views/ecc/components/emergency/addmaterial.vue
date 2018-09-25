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
        <el-form class='form-content-person' :model="form" :rules="rules" ref="form" :inline-message= true>
          <el-form-item label="资源名称" label-width='150px' prop="materialsName">
            <el-input  placeholder="请输入资源名称" style='width: 500px' v-model="form.materialsName">
            </el-input>
          </el-form-item>
          <el-form-item label="数量" label-width='150px' prop="amount">
            <el-input  placeholder="请输入资源数量" style='width: 500px' v-model="form.amount">
            </el-input>
          </el-form-item>
          <el-form-item label="单位" label-width='150px' prop="measurementUnit">
            <el-input  placeholder="请输入单位" style='width: 500px' v-model="form.measurementUnit">
            </el-input>
          </el-form-item>
          <el-form-item label="所属仓库" label-width='150px' prop="warehouseId">
            <el-select  placeholder="请选择仓库" style='width: 500px' v-model="form.warehouseId">
              <el-option
                v-for="item in  tableDatack"
                :key="item.warehouseId"
                :label="item.warehouseName"
                :value="item.warehouseId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class='operation-btn-msg' >
        <el-button @click="back">取消</el-button>
        <el-button type="primary" @click="onSubmit('form')" >确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {dictType} from '@/config/data.js';
export default {
  data () {
    return {
      status: '',
      form: {
        materialsName: '',
        amount: '',
        measurementUnit: '',
        warehouseId: '',
        materialsId: ''
      },
      tableDatack: [],
      rules: {
        materialsName: [
          { required: true, message: '请输入资源名称', trigger: 'blur' }
        ],
        amount: [
          { required: true, message: '请输入资源数量', trigger: 'blur' },
          {pattern: /^-?\d*\.?\d*$/, message: '必须为数字值'}
        ],
        measurementUnit: [
          { required: true, message: '请输入单位', trigger: 'blur' }
        ],
        warehouseId: [
          {required: true, message: '请选择仓库'}
        ]
      }
    }
  },
  computed: {
  },
  created () {
    if (this.$route.query.status === 'modify') {
      this.getmaterial()
    }
    this.getTableDatack();
  },
  mounted () {
    if (this.$route.query.status === 'add') {
      this.status = '添加物资'
      this.form.warehouseId = this.$route.query.warehouseId
    } else if (this.$route.query.status === 'modify') {
      this.status = '修改物资'
    }
  },
  methods: {
    getTableDatack () {
      let params = {
        pageSize: 99999999
      };
      this.axios.get('A2/warehouseService/page', {params})
        .then((res) => {
          this.tableDatack = res.data.list;
          console.log(res)
        })
        .catch(() => {
        });
    },
    getmaterial () {
      const materialsId = this.$route.query.materialsId;
      this.axios.get('A2/materialService/' + materialsId)
        .then((res) => {
          this.form = Object.assign({}, res.data);
        })
    },
    onSubmit (val) {
      this.$refs[val].validate((valid) => {
        if (valid) {
          if (this.$route.query.status === 'add') {
            let params = this.form;
            this.axios.post('A2/materialService', params)
              .then((res) => {
                if (res === undefined) {
                  this.$message.error('已存在同名记录');
                }
                if (res && res.data) {
                  console.log(res)
                  this.$router.push({name: 'emergency-materialList'});
                }
              })
          } else {
            let params = this.form;
            this.axios.put('A2/materialService/updateOne', params)
              .then((res) => {
                this.$router.push({name: 'emergency-materialList'});
              })
          }
        } else {
          return false;
        }
      });
    },
    back () {
      this.$router.push({name: 'emergency-materialList'});
    }
  }
}
</script>
<style lang="scss" scoped>
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
    .xfinput{
      input{
        padding-left: 70px;
      }
    }
    .operation-btn-msg {
      margin-top: 2%;
    }
    .el-upload--picture-card {
      width: 100px;
      height: 100px;
      line-height: 100px;
      background-color: #EAEAEA;
      border: 1px solid #EAEAEA;
      position: relative;
      i {
        margin: 0 auto;
        font-weight: bold;
      }
      .add-img-text {
        color: #C4C2C2;
        font-size: 13px;
        display: block;
        width: 54px;
        height: 13px;
        position: absolute;
        top: 25%;
        left: 25%;
      }
    }
  }
</style>
