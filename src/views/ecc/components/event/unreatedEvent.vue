<template>
  <div class="untreated-event">
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
        <el-form class='untreated-form-content' :model='detailForm' ref='detailForm' :rules='rules' inline-message>
          <el-form-item label="上报人手机号" label-width='150px'>
            <div class="phone-number">
              <span style='color:#333333; font-size: 13px'>{{detailForm.reporterPhone}}</span>
              <a :href="urlDetail + '?eventId=' + this.$route.query.eventId + '&' + userInfoParam()" target="_blank"><div class="relation-person"><i class="el-icon-phone"></i>联系上报人</div></a>
            </div>
          </el-form-item>
          <el-form-item label="上报时间" label-width='150px'>
            <span style='color:#333333;font-size:13px'>{{detailForm.reportTime}}</span>
          </el-form-item>
          <el-form-item label="事发地点" label-width='150px' prop='eventAddress' class='address'>
            <el-input style='width: 500px' @input="onPositionChange" id="tipinput" placeholder='请选择事发地点...' v-model='detailForm.eventAddress'></el-input>
            <div class='map-ecc'><img src="../../../../assets/img/temp/map-ecc.png" @click='showMap' style='cursor:pointer' /></div>
          </el-form-item>
          <el-form-item label="事件情况" label-width='150px' prop='eventDetail' class="event-detail">
            <el-input type="textarea" v-model='detailForm.eventDetail' style='width: 500px' placeholder='请选择事件详细情况...' rows='7' @input="calNumber(detailForm.eventDetail)"></el-input>
            <span class="number-tip">{{currentNum}}/{{totalNum}}</span>
          </el-form-item>
          <el-form-item style='margin-left: 150px;display:flex;' class="img-form-item">
            <div class='video-list' v-show="videoList && videoList.length > 0" style="margin-right:10px;height:100px">
              <video id="my-video" class="video-js" controls preload="auto" width="100" height="100"
              data-setup="{}" v-for="(item, index) in videoList" :key="'item' + index">
                <source :src="item.url" type="video/mp4">
                <source :src="item.url" type="video/webm">
                <source :src="item.url" type="video/ogg">
                <p class="vjs-no-js"> 您的浏览器不支持 video 标签。</p>
              </video>
            </div>
            <template v-if="videoList && videoList.length === 0">
              <el-upload
                action="http://10.16.4.50:8001/api/network/upload/new"
                list-type="picture-card"
                :data="imgParam"
                accept=".png,.jpg,.bmp"
                :on-preview="handlePictureCardPreview"
                :file-list="imgList"
                :before-upload='handleBeforeUpload'
                :on-remove="handleRemove"
                :on-success='handleSuccess'
                :on-exceed="handleImgNumber"
                :limit='9'
              >
                <i class="el-icon-plus" style='width: 36px;height:36px;color:#D8D8D8'></i>
                <span class='add-img-text'>添加图片</span>
                <span class="imgTips" v-show="isImgNumber">图片最多上传9张</span>
              </el-upload>
            </template>
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
          <el-form-item label="事件性质" label-width='150px' prop='flagType' class="flag-type-item">
            <el-checkbox-group v-model='detailForm.flagType' class="flag-type">
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
        <el-button style='background: #0785FD;color:#fff' :loading="isSaveLoading" @click="modifyEvent('detailForm')">保存</el-button>
      </template>
      <template v-else>
        <el-button style='background: #0785FD;color:#fff' @click='dialogFormVisible = true'>关闭事件</el-button>
      </template>
      <el-button style='background: #FB796C;color:#fff' @click="skipCtcDetail('detailForm')">去调度指挥</el-button>
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
        <el-button style='color:#fff;background:#0785FD' :loading="isCloseLoading" @click="closeEvent('closeForm')">确 定</el-button>
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
    <el-dialog :visible.sync="dialogVisible" class="img-dialog">
      <img width="100%;" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import {dictType} from '@/config/data.js';
import {valiPhone} from '@/utils/validator.js';
import {ajaxCtx3} from '@/config/config.js';
import { setCookie, getCookie } from '@/utils/util.js';
import mapPoint from '@/components/common/mapPoint.vue';
export default {
  components: {mapPoint},
  data () {
    return {
      currentNum: 0,
      totalNum: 140,
      isImgNumber: false,
      urlDetail: '',
      isCloseLoading: false, // 关闭事件加载中
      isSaveLoading: false, // 保存加载中
      open: false,
      oConfig: {},
      dialogImageUrl: '',
      imgParam: {
        projectType: 3
      },
      dialogVisible: false,
      dialogFormVisible: false,
      closeReturnVisiable: false,
      videoList: [],
      imgList: [],
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
        attachmentList: [],
        eventFlag: false,
        mutualFlag: false,
        casualties: '',
        flagType: [] // 事件性质
      },
      rules: {
        eventAddress: [
          { required: true, message: '请输入事发地点', trigger: 'blur' }
        ],
        eventDetail: [
          { required: true, message: '请输入事件情况', trigger: 'blur' },
          { max: 140, message: '最多可以输入140个字' }
        ],
        eventType: [
          { required: true, message: '请选择事件类型', trigger: 'blur' }
        ],
        flagType: [
          { required: true, message: '请勾选事件性质', trigger: 'blur' }
        ]
      },
      // attachmentList: [], // 附件列表
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
    this.urlDetail = ajaxCtx3;
  },
  mounted () {
    setTimeout(() => {
      this.dataStr = JSON.stringify(this.detailForm); // 将初始数据转成字符串
    }, 1000);
  },
  methods: {
    calNumber (val) { // 计算事件情况字数
      this.currentNum = val.length;
    },
    onPositionChange (val) { // 事件地点输入框值改变
      let value = val;
      let _this = this;
      // 地图加载
      const map = new AMap.Map('container', {
        resizeEnable: true
      });
      // 输入提示
      const autoOptions = {
        input: 'tipinput'
      };
      const auto = new AMap.Autocomplete(autoOptions);
      const placeSearch = new AMap.PlaceSearch({
        map: map
      }); // 构造地点查询类
      AMap.service('AMap.Geocoder', () => {
        var geocoder = new AMap.Geocoder({});
        geocoder.getLocation(value, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            this.detailForm.longitude = result.geocodes[0].location.lng;
            this.detailForm.latitude = result.geocodes[0].location.lat;
          }
        });
      })
      AMap.event.addListener(auto, 'select', function (e) {
        value = e.poi.name;
        _this.detailForm.eventAddress = e.poi.name;
        AMap.service('AMap.Geocoder', () => {
          var geocoder = new AMap.Geocoder({});
          geocoder.getLocation(e.poi.name, (status, result) => {
            if (status === 'complete' && result.info === 'OK') {
              _this.detailForm.longitude = result.geocodes[0].location.lng;
              _this.detailForm.latitude = result.geocodes[0].location.lat;
            }
          });
        })
      }); // 注册监听，当选中某条记录时会触发
      // AMap.event.addListener(auto, 'select', function (e) {
      //   value = e.poi.name;
      //   _this.operationForm.eventAddress = e.poi.name;
      // }); // 注册监听，当选中某条记录时会触发
      // AMap.service('AMap.Geocoder', () => {
      //   var geocoder = new AMap.Geocoder({});
      //   geocoder.getLocation(value, (status, result) => {
      //     if (status === 'complete' && result.info === 'OK') {
      //       this.detailForm.longitude = result.geocodes[0].location.lng;
      //       this.detailForm.latitude = result.geocodes[0].location.lat;
      //     }
      //   });
      // })
    },
    userInfoParam () {
      let ln = getCookie('cookieUserName');
      if (!ln) { ln = ''; }
      return $.param({ln: ln});
    },
    handleSuccess (res, file) { // 图片上传成功
      if (res && res.data) {
        const data = {
          attachmentType: dictType.imgId,
          url: res.data.newFileName,
          attachmentName: res.data.fileName,
          attachmentSize: res.data.fileSize,
          attachmentWidth: res.data.imageWidth,
          attachmentHeight: res.data.imageHeight,
          thumbnailUrl: res.data.thumbnailUrl,
          thumbnailWidth: res.data.thumbImageWidth,
          thumbnailHeight: res.data.thumbImageHeight
        }
        this.imgList.push(data);
        console.log(this.imgList)
      }
    },
    handleRemove (file, fileList) { // 删除图片
      console.log(file)
      if (file) {
        if (this.imgList.length > 0) {
          this.imgList.map((item, index) => {
            if (item.url === file.url) {
              console.log('111111')
              this.imgList.splice(index, 1);
            }
            // if (file.attachmentId) {
            //   if (item.attachmentId === file.attachmentId) {
            //     console.log('22222')
            //     this.imgList.splice(index, 1);
            //   }
            // }
          });
          console.log(this.imgList)
        }
      }
      if (fileList.length < 9) {
        this.isImgNumber = false;
      }
    },
    handleBeforeUpload (file) { // 图片上传之前
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLtTenM = file.size / 1024 / 1024 < 10;
      if (!isImg) {
        this.$message.error('上传的图片只能是bmp、jpg、png格式!');
      }
      if (!isLtTenM) {
        this.$message.error('上传的图片大小不能超过10M');
      }
      return isImg && isLtTenM;
    },
    handleImgNumber (files, fileList) { // 图片超出最大个数限制
      this.isImgNumber = true;
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
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
    },
    skipCtcDetail (form) {
      this.$refs[form].validate(valid => {
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
          if (this.videoList.length > 0) {
            this.videoList.map(item => {
              this.detailForm.attachmentList.push(item);
            });
          }
          if (this.imgList.length > 0 && this.videoList.length === 0) {
            this.imgList.map(item => {
              this.detailForm.attachmentList.push(item);
            });
          }
          const params = {
            emiEvent: this.detailForm
          }
          this.axios.put('A2/eventServices/events/' + this.$route.query.eventId, params.emiEvent)
            .then((res) => {
              if (res) {
                this.$router.push({name: 'ctc-detail', query: {eventId: this.$route.query.eventId, eventType: this.detailForm.eventType}});
              }
            })
            .catch(() => {})
        }
      });
    },
    getEventDetail () { // 获取事件详情
      const eventId = this.$route.query.eventId;
      this.closeForm.eventId = eventId;
      if (eventId) {
        this.axios.get('A2/eventServices/events/' + eventId)
          .then((res) => {
            if (res) {
              // this.attachmentList = res.data.attachmentList;
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
              this.currentNum = res.data.eventDetail.length;
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
              res.data.attachmentList && res.data.attachmentList.map((item, index) => {
                if (item.attachmentType === dictType.videoId) { // 视频
                  this.videoList.push(item);
                } else {
                  this.imgList.push(item);
                }
              });
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
          this.isCloseLoading = true;
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
                this.isCloseLoading = false;
              } else {
                this.$message.error('关闭事件失败');
                this.isCloseLoading = false;
              }
            })
            .catch(() => {})
        }
      });
    },
    modifyEvent (form) { // 修改事件
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.isSaveLoading = true;
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
          if (this.videoList.length > 0) {
            this.videoList.map(item => {
              this.detailForm.attachmentList.push(item);
            });
          }
          if (this.imgList.length > 0 && this.videoList.length === 0) {
            this.imgList.map(item => {
              this.detailForm.attachmentList.push(item);
            });
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
                this.isSaveLoading = false;
              } else {
                this.$message.error('修改事件失败');
                this.isSaveLoading = false;
              }
            })
            .catch(() => {})
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
  .untreated-event {
    padding: 20px;
    .untreated-body {
      background: #fff;
      margin-bottom: 2%;
      a {
        text-decoration: none;
      }
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
            .relation-person {
              cursor: pointer;
              border: 1px solid #EAEAEA;
              width: 110px;
              color: #0785FD;
              height: 30px;
              line-height: 30px;
              font-size: 14px;
              text-align: center;
              font-weight: 500;
              i {
                margin-right: 5px;
                font-size: 18px;
              }
            }
          }
          .flag-type-item {
            /deep/ .el-form-item__content {
              display: flex;
              align-items: center;
            }
            /deep/ .el-form-item__error {
              margin-top: -10px;
            }
          }
          .event-detail {
            position: relative;
            .number-tip {
              position: absolute;
              bottom: 0;
              left: 450px;
              color: #999999;
              font-size: 13px;
            }
          }
          /deep/ .el-form-item__error {
            border: 1px solid #FA796C;
            height: 35px;
            line-height: 35px;
            background-color: #FEE6E0;
            border-radius: 2px;
            color: #FA796C;
            padding-top: 0;
            padding: 0 13px 0 26px;
          }
          /deep/ .el-form-item__error:before {
            content: '!';
            position: absolute;
            left: 5px;
            top: 9px;
            width: 15px;
            height: 15px;
            text-align: center;
            line-height: 16px;
            color: #FFF;
            font-weight: bold;
            background-color: #FA796C;
            border-radius: 50%;
          }
        }
        .imgTips {
          border: 1px solid #FA796C;
          height: 35px;
          line-height: 35px;
          background-color: #FEE6E0;
          border-radius: 2px;
          position: absolute;
          color: #FA796C;
          padding-top: 0;
          padding: 0 13px 0 26px;
          -ms-flex-item-align: center;
          align-self: center;
          width: 160px;
          left: 105px;
          top: 50px;
        }
        .imgTips:before {
          content: '!';
          position: absolute;
          left: 5px;
          right: 0px;
          top: 9px;
          width: 15px;
          height: 15px;
          text-align: center;
          line-height: 16px;
          color: #FFF;
          font-weight: bold;
          background-color: #FA796C;
          border-radius: 50%;
        }
        .img-form-item /deep/ .el-form-item__content{
          display: flex;
          .img-list {
            // width: 100px;
            height: 100px;
            margin-left: 10px;
            margin-bottom: 10px;
            display: flex;
            .error-item {
              position: absolute;
              top: -10px;
              right: -8px;
              font-size: 18px;
              color: #666;
              z-index: 1;
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
     /deep/ .el-upload--picture-card {
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
    /deep/ .el-upload-list--picture-card .el-upload-list__item {
      width: 100px !important;
      height: 100px !important;
    }
    .img-dialog {
      /deep/ .el-dialog__header {
        padding: 40px 20px 10px;
      }
       /deep/  .el-dialog__body {
        text-align: center !important;
      }
    }
  }
</style>
