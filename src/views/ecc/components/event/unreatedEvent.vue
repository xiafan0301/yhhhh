<template>
  <div class="untreatedEvent">
    <div style="margin-bottom: 20px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>事件管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>事件详情</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='untreated-body'>
      <div class='untreated-header'>
        <div class='flag'></div>
        <p class='untreated-text'>事件编号：{{detailForm.eventCode}}</p>
      </div>
      <div class='event-status-untreated'>
        <img src='../../../../assets/img/temp/untreated.png' />
      </div>
      <div class='untreated-form'>
        <el-form class='untreated-form-content' :model='detailForm' ref='detailForm' :rules='rules'>
          <el-form-item label="上报人手机号" label-width='150px'>
            <div class="phone-number">
              <span style='color:#333333; font-size: 13px'>{{detailForm.reporterPhone}}</span>
              <img src="../../../../assets/img/temp/voice.png" />
              <img src="../../../../assets/img/temp/video.png" />
            </div>
          </el-form-item>
          <el-form-item label="上报时间" label-width='150px'>
            <span style='color:#333333;font-size:13px'>{{detailForm.reportTime}}</span>
          </el-form-item>
          <el-form-item label="事发地点" label-width='150px' prop='eventAddress' class='address'>
            <el-input style='width: 500px' placeholder='请选择事发地点...' v-model='detailForm.eventAddress'></el-input>
            <!-- <span class='look-map' style='color:#0785FD;font-size:13px;position:relative;right:75px'>查看地图</span> -->
            <div class='map-ecc'><img src="../../../../assets/img/temp/map-ecc.png" @click='showMap' style='cursor:pointer' /></div>
          </el-form-item>
          <el-form-item label="事件情况" label-width='150px' prop='eventDetail'>
            <el-input type="textarea" v-model='detailForm.eventDetail' style='width: 500px' placeholder='请选择事件详细情况...' rows='7'></el-input>
          </el-form-item>
          <el-form-item style='margin-left: 150px'>
            <img
              v-for='item in attachmentList'
              :src='item.url'
              :key='item.attachmentId'
              class='img-list'
            />
          </el-form-item>
          <el-form-item label="事件类型" label-width='150px' prop='eventType'>
            <el-select  placeholder="请选择事件类型" style='width: 500px' v-model='detailForm.eventType'>
              <el-option
                v-for="item in eventTypeList"
                :key="item.dictId"
                :label="item.dictContent"
                :value="item.dictId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="事件等级" label-width='150px' prop='eventLevel'>
            <el-select  placeholder="请选择事件等级" style='width: 500px' v-model='detailForm.eventLevel'>
              <el-option
                v-for="item in eventLevelList"
                :key="item.dictId"
                :label="item.dictContent"
                :value="item.dictId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否有人员伤亡" label-width='150px' prop='casualties'>
            <el-radio-group style='width: 330px' v-model='detailForm.casualties'>
              <el-radio label="无"></el-radio>
              <el-radio label="不确定" style='margin-left:22%'></el-radio>
              <el-radio label="有" style='margin-left:22%'></el-radio>
            </el-radio-group>
            <el-input v-show="detailForm.casualties === '有'" style='width: 150px;margin-left:-1%' placeholder='请输入死亡人数' v-model='dieNumber'></el-input><span v-show="detailForm.casualties === '有'" style='margin-left:1%'>人</span>
          </el-form-item>
          <el-form-item label="事件性质" label-width='150px' prop='flagType'>
            <el-checkbox-group v-model='detailForm.flagType'>
              <el-checkbox label="应急事件" name="type"></el-checkbox>
              <el-checkbox label="民众互助" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class='operation-btn-untreated'>
      <el-button @click='back'>返回</el-button>
      <template v-if="detailForm.flagType.indexOf('民众互助') !== -1">
        <el-button style='background: #0785FD;color:#fff' @click="modifyEvent('detailForm')">保存</el-button>
      </template>
      <template v-else>
        <el-button style='background: #0785FD;color:#fff' @click='dialogFormVisible = true'>关闭事件</el-button>
      </template>
      <el-button style='background: #FB796C;color:#fff' @click='skipCtcDetail'>去调度指挥</el-button>
    </div>
    <el-dialog title="操作提示" :visible.sync="dialogFormVisible" center width='30%' class="close-reason-dialog">
      <p class='close-reason-p'>请选择关闭事件的原因:</p>
      <el-form :model='closeForm' :rules='closeRules' ref='closeForm'>
        <el-form-item prop='closeReason'>
          <el-select placeholder="请选择原因" style='width:100%' v-model='closeForm.closeReason'>
            <el-option
              v-for="item in closeReasonList"
              :key="item.dictId"
              :label="item.dictContent"
              :value="item.dictId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop='closeRemark'>
          <el-input placeholder='备注' type='textarea' rows='7' v-model='closeForm.closeRemark'></el-input>
        </el-form-item>
         <el-form-item prop='harassFlag'>
          <el-checkbox v-model='closeForm.harassFlag'>
            <span>标为骚扰</span>
            <span>(2次被标为骚扰，将不允许用户再上报事件)</span>
          </el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('closeForm')">取 消</el-button>
        <el-button style='color:#fff;background:#0785FD' @click="closeEvent('closeForm')">确 定</el-button>
      </div>
    </el-dialog>
    <div is="mapPoint" @mapPointSubmit="mapPointSubmit" :open="open" :oConfig="oConfig"></div>
    <el-dialog
      title="操作提示"
      :visible.sync="closeReturnVisiable"
      width="480px"
      height='285px'
      class="close-tip"
      center>
      <span style='text-align:center'>返回后您添加的数据不会保存，是否确认返回?</span>
      <span slot="footer" class="dialog-footer">
        <el-button class='sureBtn' @click='sureBack'>确定返回</el-button>
        <el-button class='noSureBtn' @click="closeReturnVisiable = false">暂不返回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {dictType} from '@/config/data.js';
import mapPoint from '@/components/common/mapPoint.vue';
export default {
  components: {mapPoint},
  data () {
    return {
      open: false,
      oConfig: {},
      dialogFormVisible: false,
      closeReturnVisiable: false,
      eventDetail: {}, // 事件详情
      detailForm: { // 详情表单
        eventId: '',
        eventCode: '',
        reporterPhone: '',
        reportTime: '',
        eventAddress: '',
        eventDetail: '',
        eventType: '',
        eventLevel: '',
        eventFlag: false,
        mutualFlag: false,
        casualties: '',
        flagType: [] // 事件性质
      },
      rules: {
        eventDetail: [
          { max: 140, message: '最多可以输入140个字' }
        ],
        eventType: [
          { required: true, message: '请选择事件类型', trigger: 'blur' }
        ],
        flagType: [
          { required: true, message: '请选择事件性质', trigger: 'blur' }
        ]
      },
      attachmentList: [], // 附件列表
      eventLevelList: [],
      eventTypeList: [],
      closeReasonList: [], // 关闭原因类型
      dieNumber: '', // 死亡人数
      closeForm: { // 关闭事件表单
        eventId: '',
        closeReason: '',
        closeRemark: '',
        harassFlag: false // 是否骚扰
      },
      closeRules: {
        closeReason: [
          { required: true, message: '请选择关闭原因', trigger: 'blur' }
        ],
        closeRemark: [
          {max: 1000, message: '最多可以输入1000个字'}
        ]
      }
    }
  },
  created () {
    this.getEventDetail();
    this.getEventType();
    this.getEventLevel();
    this.getCloseReason();
  },
  mounted () {
    setTimeout(() => {
      this.dataStr = JSON.stringify(this.detailForm); // 将初始数据转成字符串
    }, 1000);
  },
  methods: {
    back (form) {
      const data = JSON.stringify(this.detailForm);
      if (this.dataStr === data) {
        this.$router.back(-1);
      } else {
        this.closeReturnVisiable = true;
      }
    },
    sureBack () {
      this.closeReturnVisiable = false;
      this.$router.back(-1);
    },
    showMap () {
      if (this.detailForm.eventAddress === '') {
        this.oConfig = {};
      } else {
        this.oConfig = {
          _name: this.detailForm.eventAddress,
          center: [Number(this.detailForm.longitude), Number(this.detailForm.latitude)]
        }
      }
      this.open = !this.open;
    },
    mapPointSubmit (val, address) {
      if (val) {
        const str = val.split(',');
        this.detailForm.longitude = Number(str[0]);
        this.detailForm.latitude = Number(str[1]);
        this.detailForm.eventAddress = address;
      }
      // this.editForm.gps = val;
    },
    skipCtcDetail () {
      this.$router.push({name: 'ctc-detail', query: {eventId: this.$route.query.eventId}});
    },
    getEventDetail () { // 获取事件详情
      const eventId = this.$route.query.eventId;
      this.closeForm.eventId = eventId;
      if (eventId) {
        this.axios.get('A2/eventServices/events/' + eventId)
          .then((res) => {
            if (res) {
              this.attachmentList = res.data.attachmentList;
              this.detailForm.eventId = eventId;
              this.detailForm.eventCode = res.data.eventCode;
              this.detailForm.reporterPhone = res.data.reporterPhone;
              this.detailForm.reportTime = res.data.reportTime;
              this.detailForm.eventDetail = res.data.eventDetail;
              this.detailForm.eventAddress = res.data.eventAddress;
              this.detailForm.eventLevel = res.data.eventLevel;
              this.detailForm.eventType = res.data.eventType;
              this.detailForm.longitude = res.data.longitude;
              this.detailForm.latitude = res.data.latitude;
              if (res.data.casualties === -1) {
                this.detailForm.casualties = '不确定';
              } else if (res.data.casualties === 0) {
                this.detailForm.casualties = '无';
              } else if (res.data.casualties > 0) {
                this.detailForm.casualties = '有';
                this.dieNumber = res.data.casualties;
              }
              if (res.data.eventFlag === true) {
                this.detailForm.flagType.push('应急事件');
              }
              if (res.data.mutualFlag === true) {
                this.detailForm.flagType.push('民众互助');
              }
            }
          })
          .catch(() => {})
      }
    },
    getEventType () { // 获取事件类型
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.eventTypeId)
        .then((res) => {
          if (res && res.data) {
            this.eventTypeList = res.data;
          }
        })
        .catch(() => {})
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
    getCloseReason () { // 获取关闭原因类型
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.closeReasonId)
        .then((res) => {
          if (res && res.data) {
            this.closeReasonList = res.data;
          }
        })
        .catch(() => {})
    },
    resetForm (form) { // 取消关闭事件
      this.$refs[form].resetFields();
      this.dialogFormVisible = false;
    },
    closeEvent (form) { // 关闭事件
      this.$refs[form].validate((valid) => {
        if (valid) {
          const params = {
            emiEvent: this.closeForm
          }
          this.axios.put('A2/eventServices/events/' + this.$route.query.eventId, params.emiEvent)
            .then((res) => {
              if (res) {
                this.$message({
                  message: '关闭事件成功',
                  type: 'success'
                });
                this.dialogFormVisible = false;
                this.$router.push({name: 'event-list'});
              } else {
                this.$message.error('关闭事件失败');
              }
            })
            .catch(() => {})
        }
      });
    },
    modifyEvent (form) { // 修改事件
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.detailForm.flagType.length > 0) {
            this.detailForm.flagType.map((item, index) => {
              if (item === '应急事件') {
                this.detailForm.eventFlag = true;
              }
              if (item === '民众互助') {
                this.detailForm.mutualFlag = true;
              }
            });
          }
          if (this.detailForm.casualties === '无') {
            this.detailForm.casualties = 0;
          } else if (this.detailForm.casualties === '不确定') {
            this.detailForm.casualties = -1;
          } else if (this.detailForm.casualties === '有') {
            this.detailForm.casualties = this.dieNumber;
          }
        }
        const params = {
          emiEvent: this.detailForm
        }
        this.axios.put('A2/eventServices/events/' + this.$route.query.eventId, params.emiEvent)
          .then((res) => {
            if (res) {
              this.$message({
                message: '修改事件成功',
                type: 'success'
              });
              this.$router.push({name: 'event-list'});
            } else {
              this.$message.error('修改事件失败');
            }
          })
          .catch(() => {})
      });
    }
  }
}
</script>
<style lang="scss">
  .untreatedEvent {
    padding: 20px;
    .untreated-body {
      background: #fff;
      margin-bottom: 2%;
      .untreated-header {
        width: 100%;
        display: flex;
        p {
          margin-top: 25px;
        }
        .flag {
          height:20px;
          width:3px;
          position: relative;
          top: 25px;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          background: #0785FD;
        }
        .untreated-text {
          color: #0785FD;
          font-size: 16px;
          font-weight: bold;
          margin-left: 1%;
        }
      }
      .event-status-untreated {
        color: #fff;
        // background: #1ABC9C;
        width: 100px;
        height: 40px;
        border-radius: 2px;
        font-weight: bold;
        font-size: 14px;
        text-align: center;
        line-height: 40px;
        float: right;
        margin-top: -20px;
        margin-right: 2%;
      }
      .untreated-form {
        padding-top: 1%;
        padding-bottom: 5%;
        .untreated-form-content {
          padding-top: 2%;
          .el-form-item {
            margin-bottom: 15px;
          }
          .phone-number {
            display: flex;
            span {
              margin-right: 20px;
            }
            img {
              width: 34px;
              height: 34px;
              margin-right: 10px;
              cursor: pointer;
            }
          }
        }
      }
    }
    .operation-btn-untreated {
      margin-top: 2%;
    }
    .img-list {
      width: 100px;
      height: 100px;
      line-height: 100px;
      margin-right: 6px;
      border-radius: 6px;
      border: 1px solid #EAEAEA;
    }
    .close-reason-dialog {
      /deep/ .el-dialog__header {
        background: #F0F0F0 !important;
        text-align: left !important;
        color: #555555;
        font-weight: bold;
        font-size: 16px;
      }
      /deep/ .el-dialog__footer {
        padding: 0 20px 20px !important;
      }
      /deep/  .el-dialog--center .el-dialog__body {
        padding: 10px 25px 0 !important;
      }
      .sureBtn {
        background:#0785FD;
        height:35px;
        color: #fff;
        line-height: 10px;
      }
      .noSureBtn {
        border-color:#e5e5e5;
        height:35px;
        line-height: 10px;
        color:#666666;
      }
      .close-reason-p {
        margin-bottom: 10px;
      }
    }
    .address /deep/ .el-form-item__content {
      display: flex;
      .map-ecc {
        img {
          padding-top: 5px;
          padding-left: 5px;
        }
      }
    }
    .close-tip {
      /deep/ .el-dialog__header {
        background: #F0F0F0 !important;
        text-align: left !important;
        color: #555555;
        font-weight: bold;
        font-size: 16px;
      }
      /deep/  .el-dialog--center .el-dialog__body {
        text-align: center !important;
      }
      .sureBtn {
        background:#0785FD;
        height:35px;
        color: #fff;
        line-height: 10px;
      }
      .noSureBtn {
        border-color:#e5e5e5;
        height:35px;
        line-height: 10px;
        color:#666666;
      }
    }
  }
</style>
