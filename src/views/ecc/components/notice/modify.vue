<template>
  <div class="bg-release">
    <div style=" margin-bottom: 20px;position: relative">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>消息管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'notice-atmanagementList'}"  v-if="gg">公告管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'system' }"  v-if="!gg">系统消息</el-breadcrumb-item>
        <el-breadcrumb-item  v-if="gg">修改公告</el-breadcrumb-item>
        <el-breadcrumb-item  v-if="!gg">修改系统消息</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="position: absolute; top: -10px; right: 0;">
        <el-button type="primary" size="small"  @click.native="showEditDialog(true)" icon="el-icon-plus">发布</el-button>
      </div>
    </div>
    <div class="bg-release-cot">
      <el-form ref="form" :model="form" label-width="80px"  v-if="gg">
        <el-form-item label="接收者">
          <div style="display: inline-block">
            <el-checkbox label="移动端" name="type"></el-checkbox>
            <el-checkbox label="PC端" name="type" v-model="form.checked"></el-checkbox>
          </div>
          <div style="display: inline-block; margin-left: 20px;" >
            <el-select v-model="value" placeholder="请选择" size="medium" :disabled= "!form.checked" style="width: 170px">
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
          <el-input v-model="form.name" style="width: 500px"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <div style="width: 500px; position: relative">
            <el-input type="textarea" v-model="form.desc" style="display: inline-block;"  :autosize="{ minRows: 5, maxRows: 7}" rows="7"></el-input>
            <span style="display: inline-block; position: absolute; right: 0; bottom: -3px">{{form.desc.length}}/100</span>
          </div>
        </el-form-item>
        <el-form-item  >
          <el-upload
            action=""
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove" >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="发送时间">
          <el-radio-group v-model="form.time" style="width: 100%">
            <div style="display: inline-block" >;
              <el-radio label="实时" ></el-radio>
              <el-radio label="定时"></el-radio>
            </div>
            <div  style="display: inline-block; margin-left: 20px;">
              <el-input style=""  size = "mini"> <i slot="suffix" class="el-input__icon el-icon-date" style="color: #0785FD"></i></el-input>
            </div>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-form ref="form1" :model="form1" label-width="80px" v-if="!gg">
        <el-form-item label="接收者">
          <el-checkbox label="移动端" name="type" v-model="form1.resource"></el-checkbox>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form1.region" placeholder="系统消息" disabled style="width: 500px">
          </el-select>
        </el-form-item>
        <el-form-item label="内容">
          <div style="width: 500px; position: relative">
            <el-input type="textarea" v-model="form1.desc" style="display: inline-block;"  :autosize="{ minRows: 7, maxRows: 8}" rows="7"></el-input>
            <span style="display: inline-block; position: absolute; right: 0; bottom: -3px">{{form1.desc.length}}/100</span>
          </div>
        </el-form-item>
        <el-form-item label="发送时间">
          <el-radio-group v-model="form1.time" style="width: 100%">
            <div style="display: inline-block" >;
              <el-radio label="实时" ></el-radio>
              <el-radio label="定时"></el-radio>
            </div>
            <div  style="display: inline-block; margin-left: 20px;">
              <el-input style=""  size = "mini"><i slot="suffix" class="el-input__icon el-icon-date" style="color: #0785FD"></i></el-input>
            </div>
          </el-radio-group>
        </el-form-item>
      </el-form >
  </div>
    <div style="margin-top: 21px" >
      <el-button >取消</el-button>
      <el-button type="primary" @click="onSubmit" >确定</el-button>
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
    height: 100%;
    overflow: auto;
    background-color: #F0F3F4;
  }
  .bg-release-cot {
    background-color: #FFFFFF;
    padding-top: 55px;
    padding-left: 100px;
    padding-bottom: 86px;
  }
</style>
