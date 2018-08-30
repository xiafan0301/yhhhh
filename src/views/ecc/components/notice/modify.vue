<template>
  <div class="bg-release">
    <div style=" margin-bottom: 20px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>消息管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'notice-atmanagementList'}"  v-if="this.$route.query.status === 'modifyatgment'">公告管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'system' }"  v-if="this.$route.query.status === 'modifysystem'">系统消息</el-breadcrumb-item>
        <el-breadcrumb-item >{{status}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bg-release-cot">
      <el-form ref="form" :model="form" label-width="80px"  v-if="this.$route.query.status === 'modifyatgment'">
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
      <el-form ref="form1" :model="form1" label-width="80px" v-if="this.$route.query.status === 'modifysystem'">
        <el-form-item label="接收者">
          <el-checkbox label="移动端" name="type" v-model="form1.resource" disabled ></el-checkbox>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form1.type" placeholder="系统消息" style="width: 500px">
            <el-option label="APP应用升级" value="39728bba-9b6f-11e8-8a14-3f814d634dc3"></el-option>
            <el-option label="应急小秘书" value="39728bba-9b6f-11e8-8a14-3f814d634dc4"></el-option>
            <el-option label="民众互助" value="39728bba-9b6f-11e8-8a14-3f814d634dc1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容">
          <div style="width: 500px; position: relative">
            <el-input type="textarea" v-model="form1.desc" style="display: inline-block;"  :autosize="{ minRows: 5, maxRows: 7}" rows="7"></el-input>
            <span style="display: inline-block; position: absolute; right: 0; bottom: -3px">{{form1.desc.length}}/100</span>
          </div>
        </el-form-item>
        <el-form-item label="发送时间">
          <el-radio-group v-model="form1.time" style="width: 100%">
            <div style="display: inline-block" >;
              <el-radio :label="1" >实时</el-radio>
              <el-radio :label="2">定时</el-radio>
            </div>
            <div  style="display: inline-block; margin-left: 20px;">
              <el-date-picker
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="form1.publishTime"
                :disabled = "!(form1.time === 2)"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
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
      status: '',
      form: {
        publishTime: '',
        terminal: 0,
        checkList: [],
        desc: '',
        time: '',
        title: '',
        messageType: ''
      },
      form1: {
        time: '',
        publishTime: '',
        type: '',
        resource: true,
        desc: ''
      },
      value: ''
    }
  },
  computed: {
  },
  created () {
    this.getmessagedetial();
  },
  mounted () {
    if (this.$route.query.status === 'modifyatgment') {
      this.status = '修改公告'
    } else if (this.$route.query.status === 'modifysystem') {
      this.status = '修改消息'
    }
  },
  methods: {
    getmessagedetial () {
      let messageId = this.$route.query.messageId;
      this.axios.get('A2/messageService/' + messageId)
        .then((res) => {
          if (this.$route.query.status === 'modifyatgment') {
            console.log(res);
            if (res.data.emiMessage.terminal === 1) {
              this.form.checkList.push('1')
            } else if (res.data.emiMessage.terminal === 2) {
              this.form.checkList.push('2')
            } else if (res.data.emiMessage.terminal === 3) {
              this.form.checkList.push('2', '1')
            } else if (res.data.emiMessage.terminal === 4) {
              this.form.checkList.push()
            }
            this.form.title = res.data.emiMessage.title;
            this.form.desc = res.data.emiMessage.details;
            if (res.data.emiMessage.publishTime === null) {
              this.form.time = 1
            } else {
              this.form.time = 2;
              this.form.publishTime = res.data.emiMessage.publishTime;
            }
            this.form.messageType = res.data.emiMessage.messageType
          } else {
            if (res.data.emiMessage.publishTime === null) {
              this.form1.time = 1
            } else {
              this.form1.time = 2;
            }
            this.form1.desc = res.data.emiMessage.details;
            this.form1.publishTime = res.data.emiMessage.publishTime;
            this.form1.type = res.data.emiMessage.messageType
          }
        })
    },
    onSubmit () {
      if (this.$route.query.status === 'modifyatgment') {
        if (this.form.time === 1) {
          this.form.publishTime = null
        }
        if (this.form.checkList[0] === '1' && this.form.checkList.length === 1) {
          this.form.terminal = 1
        } else if (this.form.checkList[0] === '2' && this.form.checkList.length === 1) {
          this.form.terminal = 2
        } else if (this.form.checkList.length === 2) {
          this.form.terminal = 3
        } else if (this.form.checkList.length === 0) {
          this.form.terminal = 4
        }
        console.log(this.form.publishTime);
        let messageId = this.$route.query.messageId;
        let params = {
          messageId: messageId,
          title: this.form.title,
          details: this.form.desc,
          messageType: this.form.messageType,
          publishTime: this.form.publishTime,
          terminal: this.form.terminal
        };
        this.axios.put('A2/messageService/updateOne', params)
          .then((res) => {
            this.$router.push({name: 'notice-atmanagementList'})
          })
          .catch(() => {
          });
      } else {
        let messageId = this.$route.query.messageId;
        let params = {
          messageId: messageId,
          details: this.form1.desc,
          messageType: this.form1.type,
          publishTime: this.form1.publishTime,
          terminal: 1
        };
        this.axios.put('A2/messageService/updateOne', params)
          .then((res) => {
            this.$router.push({name: 'system'})
          })
          .catch(() => {
          });
      }
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
  .el-form-item {
    margin-bottom: 15px;
  }
</style>
