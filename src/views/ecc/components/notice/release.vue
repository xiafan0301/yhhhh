<template>
  <div class="bg-release">
    <div style="padding-bottom: 20px; border-bottom: 1px solid #eee; margin-bottom: 20px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>发布消息</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'notice-list'}">消息管理</el-breadcrumb-item>
        <el-breadcrumb-item>发布</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bg-release-cot">
      <el-form ref="form" :model="form" label-width="80px" >
        <el-form-item label="发布类型">
          <el-radio-group v-model="form.resource">
            <el-radio label="公告"></el-radio>
            <el-radio label="系统消息"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="接收者">
          <el-checkbox-group v-model="form.type">
            <div style="display: inline-block">
            <el-checkbox label="移动端" name="type"></el-checkbox>
            <el-checkbox label="PC端" name="type"></el-checkbox>
             </div>
            <div style="display: inline-block; margin-left: 20px;" >
            <el-input size="mini"></el-input>
            </div>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="主题">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="form.desc" rows="5"></el-input>
        </el-form-item>
        <el-form-item >
          <el-upload
            action=""
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove" >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="发送时间">
          <el-radio-group v-model="form.resource" style="width: 100%">
            <div style="width: 150px;float: left;" >;
              <el-radio label="实时" style="line-height: 40px"></el-radio>
              <el-radio label="定时"></el-radio>
            </div>
            <div  style="width: 200px;float: left;">
              <el-input style=""  size = "mini"></el-input>
            </div>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
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
        type: [],
        resource: '',
        desc: ''
      }
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
<style lang="scss" scoped>
  .bg-release {
    padding: 20px;
  }
  .bg-release-cot {
    width: 500px;
    margin: 0 auto;
  }
</style>
