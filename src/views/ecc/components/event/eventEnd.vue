<template>
  <div class='event-end'>
    <div class='event-end-header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>事件管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>事件详情</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='event-end-body'>
      <el-form class='event-end-form' :model='endForm' ref='endForm' :rules='rules'>
        <el-form-item label="请确认事件等级" label-width='150px'>
          <el-select  placeholder="请选择事件等级" style='width: 500px' v-model='endForm.eventLevel'>
            <el-option
              v-for="item in eventLevelList"
              :key="item.dictId"
              :label="item.dictContent"
              :value="item.dictId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请输入事件总结" label-width='150px'>
          <el-input type='textarea' v-model='endForm.eventSummary' style="width: 500px;" rows='9' placeholder='请输入事件详细情况...'></el-input>
        </el-form-item>
        <el-form-item style='margin-left: 150px'>
          <el-upload
            action="http://10.16.4.50:8001/api/network/upload/new"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus" style='width: 36px;height:36px;color:#D8D8D8'></i>
            <span class='add-img-text'>上传附件</span>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div class='operation-btn-event-end'>
      <el-button @click='back'>返回</el-button>
      <el-button style='background: #0785FD;color:#fff' @click="endEvent('endForm')">确定</el-button>
    </div>
  </div>
</template>
<script>
import {dictType} from '@/config/data.js';
export default {
  data () {
    return {
      endForm: {
        eventId: '',
        eventLevel: '', // 事件等级
        eventSummary: '' // 事件总结
      },
      rules: {
        eventLevel: [
          { required: true, message: '请选择事件等级', trigger: 'blur' }
        ],
        eventSummary: [
          { max: 10000, message: '最多可以输入10000个字' }
        ]
      },
      eventLevelList: [] // 事件等级列表
    }
  },
  mounted () {
    this.endForm.eventId = this.$route.params.eventId;
    this.getEventLevel();
  },
  methods: {
    back () {
      this.$router.back(-1);
    },
    getEventLevel () { // 获取事件等级
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.eventLevelId)
        .then((res) => {
          if (res && res.data) {
            this.eventLevelList = res.data;
          }
        })
        .catch(() => {})
    },
    endEvent (form) { // 结束事件
      console.log(this.endForm)
      const eventId = this.$route.params.eventId;
      this.$refs[form].validate((valid) => {
        if (valid) {
          const data = {
            eventFinishDto: this.endForm
          }
          this.axios.put('A2/eventServices/events/finish/' + eventId, data.eventFinishDto)
            .then((res) => {
              if (res) {
                console.log(res)
                this.$message({
                  message: '宣布事件结束成功',
                  type: 'success'
                });
                this.$router.push({name: 'event-list'});
              } else {
                this.$message.error('宣布事件结束失败');
              }
            })
            .catch(() => {})
        }
      });
    }
  }
}
</script>
<style lang='scss'>
  .event-end {
    padding: 20px;
    height: 100%;
    .event-end-header {
      margin-bottom: 20px;
    }
    .event-end-body {
      width: 100%;
      height: 85%;
      // padding-bottom: 20%;
      background: #fff;
      .event-end-form {
        padding-top: 2%;
      }
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
    .operation-btn-event-end {
      margin-top: 1%;
    }
  }
</style>
