<template>
  <div class="bg-release">
    <div style=" margin-bottom: 20px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>消息管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'notice-atmanagementList'}" v-if="this.$route.query.status === 'atgment'">公告管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'system'}"  v-if="this.$route.query.status === 'system'">系统消息</el-breadcrumb-item>
        <el-breadcrumb-item >{{status}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bg-release-cot">
      <div style="width: 500px">
      <el-form ref="form" :model="form" label-width="80px"  v-if="this.$route.query.status === 'atgment'">
        <el-form-item label="接收者">
            <div style="display: inline-block">
              <el-checkbox-group v-model="form.checkList">
                <el-checkbox label= 1>移动端</el-checkbox>
                <el-checkbox label= 2 name="type" >PC端</el-checkbox>
              </el-checkbox-group>
             </div>
            <div style="display: inline-block; margin-left: 20px;" >
              <el-select v-model="value" placeholder="请选择" size="medium" :disabled= "!(form.checkList[0] === '2'|| form.checkList[1] === '2') " style="width: 170px">
              </el-select>
            </div>
        </el-form-item>
        <el-form-item label="主题">
          <el-input v-model="form.title" style="width: 500px"></el-input>
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
              <el-radio :label="1" >实时</el-radio>
              <el-radio :label="2">定时</el-radio>
            </div>
            <div  style="display: inline-block; margin-left: 20px;">
              <el-date-picker
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="form.publishTime"
                :disabled = "!(form.time === 2)"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-form ref="form1" :model="form1" label-width="80px" v-if="this.$route.query.status === 'system'">
        <el-form-item label="接收者">
            <el-checkbox label="移动端" name="type" v-model="form1.receive" disabled></el-checkbox>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form1.type" placeholder="系统消息" disabled style="width: 500px">
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
    </div>
    <div style="margin-top: 21px" >
      <el-button @click="back">取消</el-button>
      <el-button type="primary" @click="onSubmit" >确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      status: '',
      form: {
        publishTime: '',
        terminal: 0,
        checkList: [],
        desc: '',
        time: '',
        title: ''
      },
      form1: {
        type: '',
        receive: true,
        desc: '',
        checked: false,
        time: ''
      },
      value: ''
    }
  },
  computed: {
  },
  mounted () {
    if (this.$route.query.status === 'atgment') {
      this.status = '添加公告'
    } else if (this.$route.query.status === 'system') {
      this.status = '添加消息'
    }
  },
  methods: {
    onSubmit (val) {
      if (this.$route.query.status === 'system') {
        let params = {
          emiMessage: {
            details: this.form1.desc,
            messageType: '39728bba-9b6f-11e8-8a14-3f814d634dc1',
            terminal: 1,
            title: 'string'
          }
        };
        this.axios.post('A2/messageService', params)
          .then((res) => {
            console.log(res);
          })
      } else {
        if (this.form.checkList[0] === '1' && this.form.checkList.length === 1) {
          this.form.terminal = 1
        } else if (this.form.checkList[0] === '2' && this.form.checkList.length === 1) {
          this.form.terminal = 2
        } else if (this.form.checkList.length === 2) {
          this.form.terminal = 3
        } else if (this.form.checkList.length === 0) {
          this.form.terminal = 4
        }
        let params = {
          emiMessage: {
            details: this.form.desc,
            messageType: '39728bba-9b6f-11e8-8a14-3f814d634dc2',
            terminal: this.form.terminal,
            title: this.form.title,
            publishTime: this.form.publishTime
          }
          // receiveRelations: [
          //   {
          //     messageId: 'string',
          //     receiveUser: ''
          //   }
          // ]
        };
        this.axios.post('A2/messageService', params)
          .then((res) => {
            console.log(res);
          })
      }
    },
    back () {
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
    background-color: #F0F3F4;
  }
  .bg-release-cot {
    background-color: #FFFFFF;
    padding-top: 55px;
    box-sizing: border-box;
    padding-left: 100px;
    padding-bottom: 50px;
  }
  .el-form-item {
    margin-bottom: 15px;
  }
</style>
