<template>
  <div class="bg-release">
    <div style="padding-bottom: 20px; border-bottom: 1px solid #eee; margin-bottom: 20px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>消息管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'notice-atmanagementList'}"  v-if="gg">公告管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'system' }"  v-if="!gg">系统消息</el-breadcrumb-item>
        <el-breadcrumb-item  v-if="gg">修改公告</el-breadcrumb-item>
        <el-breadcrumb-item  v-if="!gg">修改系统消息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bg-release-cot">
    <el-form ref="form1" :model="form1" label-width="80px"  v-if="gg">
      <el-form-item label="接收者">
        <div style="display: inline-block">
          <el-checkbox label="移动端" name="type"></el-checkbox>
          <el-checkbox label="PC端" name="type" v-model="form.checked" ></el-checkbox>
        </div>
        <div style="display: inline-block; margin-left: 20px;">
          <el-select v-model="value" placeholder="请选择" size="mini" :disabled= "!form.checked">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="主题">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.desc" style="display: inline-block; position: relative"  :autosize="{ minRows: 3, maxRows: 4}"></el-input>
        <span style="display: inline-block; position: absolute; right: 10px;top: 45px">{{form.desc.length}}/100</span>
      </el-form-item>
      <el-form-item>
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
      <el-form ref="form1" :model="form1" label-width="80px" v-if="!gg" >
        <el-form-item label="接收者">
            <el-checkbox label="移动端" name="type" v-model="form1.resource"></el-checkbox>
        </el-form-item>
        <el-form-item label="类型" size= "small">
          <el-select v-model="form1.region" placeholder="系统消息" disabled>
          </el-select>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="form1.desc" style="display: inline-block; position: relative"  :autosize="{ minRows: 3, maxRows: 4}"></el-input>
          <span style="display: inline-block; position: absolute; right: 10px;top: 45px">{{form1.desc.length}}/100</span>
        </el-form-item>
        <el-form-item label="发送时间">
          <el-radio-group v-model="form1.resource" style="width: 100%">
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
        resource: '',
        desc: '',
        checked: false,
        xtxx: '系统消息'
      },
      form1: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        resource: true,
        desc: '',
        checked: false,
        xtxx: '系统消息'
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
<style lang="scss" scoped>
  .bg-release {
    padding: 20px;
  }
  .bg-release-cot {
    width: 500px;
    margin: 0 auto;
  }
</style>
