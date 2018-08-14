<template>
  <div class="add-plan-person">
    <div class='add-msg-header'>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>应急库</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'emergency-planList'}" >预案管理</el-breadcrumb-item>
        <el-breadcrumb-item >添加预案</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='add-msg-body'>
      <div class='add-form-person'>
        <el-form class='form-content-person' :model="form">
          <el-form-item label="预案名称" label-width='150px'>
            <el-select  placeholder="请选择APP用户" style='width: 500px' v-model="form.name">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="部分" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预案类型" label-width='150px'>
            <el-select  placeholder="请选择APP用户" style='width: 500px' v-model="form.name">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="部分" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="适用事件等级" label-width='150px'>
            <el-select  placeholder="请选择APP用户" style='width: 500px' v-model="form.name">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="部分" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预案正文" label-width='150px'>
            <el-input type="textarea" style='width: 500px' placeholder='请选择事件详细情况...' rows='7' v-model="form.region"></el-input>
          </el-form-item>
          <el-form-item label="附件" label-width='150px'>
            <el-input  style='width: 389px; position: relative;' placeholder='请选择事件详细情况...' v-model="form.name" class="xfinput">
            </el-input>
            <el-button  type="primary" size="mini" style="position: absolute; left: 5px; top: 6px; background-color: #FAFAFA; border: 1px solid #EAEAEA" >
              <span style="font-size:12px;color:#555555">浏览..</span></el-button>
            <el-button type="primary" size="medium">重新上传</el-button>
          </el-form-item>
          <el-form-item label="响应处置" label-width='150px'>
            <div style="width: 500px;background-color:#FAFAFA; padding: 20px" >
            <el-form-item label="协同部门" label-position="left">
              <el-input style="width: 358px"></el-input>
            </el-form-item>
              <el-form-item label="任务名称" label-position="left">
                <el-input style="width: 358px"></el-input>
              </el-form-item>
              <el-form-item label="任务名称" label-position="left">
                <el-input type="textarea" style='width: 358px' placeholder='请选择事件详细情况...' rows='5' v-model="form.region"></el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item style='margin-left: 150px'>
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus" style='width: 36px;height:36px;color:#D8D8D8'></i>
              <span class='add-img-text'>添加图片</span>
            </el-upload>
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
