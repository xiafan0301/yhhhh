<template>
  <div class="add-plan-person">
    <div class='add-msg-header'>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>应急库</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'emergency-materialList'}" >物资管理</el-breadcrumb-item>
        <el-breadcrumb-item  v-if="gg === true ">添加仓库</el-breadcrumb-item>
        <el-breadcrumb-item  v-if="gg === false ">修改仓库</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='add-msg-body'>
      <div class='add-form-person'>
        <el-form class='form-content-person' :model="form">
          <el-form-item label="仓库名称" label-width='150px'>
            <el-input  placeholder="请选择APP用户" style='width: 500px' v-model="form.name">
            </el-input>
          </el-form-item>
          <el-form-item label="仓库地点" label-width='150px'>
            <el-input  placeholder="请选择APP用户" style='width: 500px' v-model="form.name">
            </el-input>
          </el-form-item>
          <el-form-item label="上报单位" label-width='150px'>
            <el-select  placeholder="请选择APP用户" style='width: 500px' v-model="form.name">
              <el-option label="联动单位" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责人" label-width='150px'>
            <el-input  placeholder="请选择APP用户" style='width: 500px' v-model="form.name">
            </el-input>
          </el-form-item>
          <el-form-item label="联系电话" label-width='150px'>
            <el-input  placeholder="请选择APP用户" style='width: 500px' v-model="form.name">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class='operation-btn-msg' >
        <el-button >取消</el-button>
        <el-button type="primary" @click="onSubmit" >确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        resource: '',
        desc: '',
        checked: false,
        time: ''
      },
      form1: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        resource: true,
        desc: '',
        checked: false,
        time: ''
      },
      gg: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  computed: {
  },
  mounted () {
    this.gg = this.$route.query.modify
  },
  methods: {
    onSubmit () {
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
