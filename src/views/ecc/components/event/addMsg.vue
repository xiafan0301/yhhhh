<template>
  <div class="add-msg-person">
    <div class='add-msg-header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>事件管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>{{status}}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='add-msg-body'>
      <div class='add-form-person'>
        <el-form class='form-content-person' inline-message :model='operationForm' ref='operationForm' :rules='rules'>
          <el-form-item label="事发时间" label-width='150px' prop='reportTime'>
            <el-date-picker :picker-options="pickerOptions0" value-format="yyyy-MM-dd HH:mm:ss" v-model='operationForm.reportTime' type="datetime" placeholder="选择事发时间" style="width: 500px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="事发地点" label-width='150px' class="address" prop='eventAddress'>
            <el-input style='width: 500px' @input="onPositionChange" id="tipinput" placeholder='请选择事发地点...' v-model='operationForm.eventAddress'></el-input>
            <div class='map-ecc'><img title="选择事发地点" src="../../../../assets/img/temp/map-ecc.png" style='cursor:pointer' @click='showMap' /></div>
          </el-form-item>
          <el-form-item label="事件情况" label-width='150px' prop='eventDetail' class="event-detail">
            <el-input type="textarea" v-model='operationForm.eventDetail' style='width: 500px' placeholder='请选择事件详细情况...' rows='7' @input="calNumber(operationForm.eventDetail)"></el-input>
            <span class="number-tip">{{currentNum}}/{{totalNum}}</span>
          </el-form-item>
          <el-form-item class="img-form-item" style='margin-left: 150px;display: flex;'>
            <div class='video-list' v-show="videoList && videoList.length > 0" style="margin-right:10px;height:100px">
              <video id="my-video" class="video-js" controls preload="auto" width="100" height="100"
              data-setup="{}" v-for="(item, index) in videoList" :key="'item'+index">
                <source :src="item.url" type="video/mp4">
                <source :src="item.url" type="video/webm">
                <source :src="item.url" type="video/ogg">
                <p class="vjs-no-js"> 您的浏览器不支持 video 标签。</p>
              </video>
            </div>
            <template v-if="videoList && videoList.length === 0">
              <el-upload
                :action="uploadUrl + '/upload'"
                list-type="picture-card"
                :data="imgParam"
                accept=".png,.jpg,.bmp"
                :on-preview="handlePictureCardPreview"
                :file-list="imgList"
                :before-upload='handleBeforeUpload'
                :on-remove="handleRemove"
                :on-success='handleSuccess'
                :on-exceed="handleImgNumber"
                :disabled="isImgDisabled"
                :title="[isImgDisabled === true ? '禁用' : '']"
                :limit='9'
              >
                <i class="el-icon-plus" style='width: 36px;height:36px;color:#D8D8D8'></i>
                <span class='add-img-text'>添加图片</span>
                <span class="imgTips" v-show="isImgNumber">图片最多上传9张</span>
              </el-upload>
            </template>
          </el-form-item>
          <el-form-item label="是否推送消息" label-width='150px'>
            <el-radio-group style='width: 330px' v-model='operationForm.radius' @change="changeRadius">
              <el-radio label="不推送"></el-radio>
              <el-radio label="推送" style='margin-left:22%'></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-show="operationForm.radius === '推送'" label="接受的APP用户" prop='radiusNumber' label-width='150px'>
            <el-select  placeholder="请选择APP用户" style='width: 500px' v-model="operationForm.radiusNumber">
              <el-option
                v-for="item in distanceList"
                :key="item.dictId"
                :label="item.dictContent"
                :value="item.dictCode"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" label-width='150px' v-show="isShowRadius === true">
            <p class="radius-tip">此消息已推送过一次，选择"推送"将会再次推送消息到APP</p>
          </el-form-item>
        </el-form>
      </div>
      <div class='operation-btn-msg'>
        <el-button @click='back'>返回</el-button>
        <template v-if="this.$route.query.status === 'add'">
          <el-button style='background: #0785FD;color:#fff' :loading="isAddLoading" @click="submitData('operationForm')">确认发布</el-button>
        </template>
        <template v-else>
          <el-button style='background: #0785FD;color:#fff' :loading="isEditLoading" @click="modifyData('operationForm')">确认修改</el-button>
        </template>
      </div>
    </div>
    <div is="mapPoint" @mapPointSubmit="mapPointSubmit" :open="open" :oConfig="oConfig"></div>
    <el-dialog
      title="操作提示"
      :visible.sync="closeReturnVisiable"
      width="480px"
      height='285px'
      center>
      <span style='text-align:center'>返回后您添加的数据不会保存，是否确认返回?</span>
      <span slot="footer" class="dialog-footer">
        <el-button class='sureBtn' @click='sureBack'>确定返回</el-button>
        <el-button class='noSureBtn' @click="closeReturnVisiable = false">暂不返回</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible" class="img-dialog">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import {dictType} from '@/config/data.js';
import {imgBaseUrl2} from '@/config/config.js';
import mapPoint from '@/components/common/mapPoint.vue';
export default {
  components: {mapPoint},
  data () {
    return {
      uploadUrl: null,
      isAddLoading: false,
      isEditLoading: false,
      isShowRadius: false,
      status: '', // 添加或修改消息
      open: false,
      isImgDisabled: false,
      oConfig: {},
      isImgNumber: false,
      imgParam: {
        projectType: 4
      },
      pickerOptions0: {
        disabledDate (time) {
          return time.getTime() > (new Date().getTime());
        }
      },
      dialogImageUrl: '',
      dialogVisible: false,
      closeReturnVisiable: false,
      videoList: [], // 视频数据列表
      imgList: [], // 图片数据列表
      currentNum: 0, // 事件情况当前字数
      totalNum: 140, // 可输入的总字数
      operationForm: {
        eventSource: 'cee2d05e-97b1-11e8-b784-db60b034ea83',
        reportTime: '',
        eventAddress: '',
        eventDetail: '',
        longitude: '',
        latitude: '',
        eventFlag: false,
        mutualFlag: true,
        attachmentList: [], // 附件列表
        radius: '不推送', // 是否推送消息
        radiusNumber: ''
      },
      rules: {
        reportTime: [
          { required: true, message: '请选择事发时间', trigger: 'blur' }
        ],
        eventAddress: [
          { required: true, message: '请输入事发地点', trigger: 'blur' }
        ],
        eventDetail: [
          { required: true, message: '请输入事件情况', trigger: 'blur' },
          { max: 140, message: '最多可以输入140个字' }
        ],
        radiusNumber: [
          { required: true, message: '请选择推送距离', trigger: 'blur' }
        ]
      },
      distanceList: [], // 距离列表
      radiusNumber: null
    }
  },
  created () {
    if (this.$route.query.status === 'add') {
      this.status = '添加消息';
    } else if (this.$route.query.status === 'modify') {
      this.status = '修改消息';
    }
    this.getDistance();
    this.getAppEventDetail();
    this.uploadUrl = imgBaseUrl2;
  },
  mounted () {
    setTimeout(() => {
      this.dataStr = JSON.stringify(this.operationForm); // 将初始数据转成字符串
    }, 1000);
  },
  methods: {
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
            this.operationForm.longitude = result.geocodes[0].location.lng;
            this.operationForm.latitude = result.geocodes[0].location.lat;
          }
        });
      })
      AMap.event.addListener(auto, 'select', function (e) {
        value = e.poi.name;
        _this.operationForm.eventAddress = e.poi.name;
        AMap.service('AMap.Geocoder', () => {
          var geocoder = new AMap.Geocoder({});
          geocoder.getLocation(e.poi.name, (status, result) => {
            if (status === 'complete' && result.info === 'OK') {
              _this.operationForm.longitude = result.geocodes[0].location.lng;
              _this.operationForm.latitude = result.geocodes[0].location.lat;
            }
          });
        })
      }); // 注册监听，当选中某条记录时会触发
    },
    calNumber (val) { // 计算事件情况字数
      this.currentNum = val.length;
    },
    back () {
      const data = JSON.stringify(this.operationForm);
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
      if (this.operationForm.eventAddress === '') {
        this.oConfig = {};
      } else {
        this.oConfig = {
          _name: this.operationForm.eventAddress,
          center: [Number(this.operationForm.longitude), Number(this.operationForm.latitude)]
        }
      }
      this.open = !this.open;
    },
    mapPointSubmit (val, address) {
      if (val) {
        const str = val.split(',');
        this.operationForm.longitude = Number(str[0]);
        this.operationForm.latitude = Number(str[1]);
        this.operationForm.eventAddress = address;
      }
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
        this.isImgDisabled = false;
        this.imgList.push(data);
      }
    },
    handleRemove (file, fileList) { // 删除图片
      if (file) {
        if (this.imgList.length > 0) {
          this.imgList.map((item, index) => {
            if (item.url === file.url) {
              this.imgList.splice(index, 1);
            }
          });
        }
      }
      if (fileList.length < 9) {
        this.isImgNumber = false;
      }
    },
    handleBeforeUpload (file) { // 图片上传之前
      this.isImgDisabled = true;
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLtTenM = file.size / 1024 / 1024 < 10;
      if (!isImg) {
        this.$message.error('上传的图片只能是bmp、jpg、png格式!');
        this.isImgDisabled = false;
      }
      if (!isLtTenM) {
        this.$message.error('上传的图片大小不能超过10M');
        this.isImgDisabled = false;
      }
      return isImg && isLtTenM;
    },
    handleImgNumber (files, fileList) { // 图片超出最大个数限制
      this.isImgNumber = true;
    },
    submitData (form) { // 确认发布
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.isAddLoading = true;
          if (this.operationForm.radius === '不推送') {
            this.operationForm.radius = -1;
          } else {
            this.operationForm.radius = parseInt(this.operationForm.radiusNumber);
          }
          if (this.imgList.length > 0 && this.videoList.length === 0) {
            this.imgList.map(item => {
              this.operationForm.attachmentList.push(item);
            });
          }
          const param = {
            emiEvent: this.operationForm
          }
          this.axios.post('A2/eventServices/event', param.emiEvent)
            .then((res) => {
              if (res) {
                this.$message({
                  message: '添加消息成功',
                  type: 'success'
                });
                this.$router.push({name: 'mutual-person'});
                this.isAddLoading = false;
              } else {
                this.$message.error('添加消息失败');
                this.isAddLoading = false;
              }
            })
            .catch(() => {})
        }
      });
    },
    getDistance () { // 接受的APP用户--距离
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.distanceId)
        .then((res) => {
          if (res && res.data) {
            this.distanceList = res.data;
            res.data.map((item) => {
              if (item.dictCode === '5000') {
                this.operationForm.radiusNumber = item.dictCode;
              }
            })
          }
        })
        .catch(() => {})
    },
    changeRadius (val) { // 当raduis改变时
      console.log(val);
      if (val === '推送') {
        if (this.radiusNumber) {
          this.isShowRadius = true;
        } else {
          this.isShowRadius = false;
        }
      } else {
        this.isShowRadius = false;
      }
    },
    getAppEventDetail () {
      const eventId = this.$route.query.eventId;
      if (eventId) {
        this.axios.get('A2/eventServices/events/' + eventId)
          .then((res) => {
            if (res) {
              this.operationForm.reportTime = res.data.reportTime;
              this.operationForm.eventAddress = res.data.eventAddress;
              this.operationForm.longitude = res.data.longitude;
              this.operationForm.latitude = res.data.latitude;
              this.operationForm.eventDetail = res.data.eventDetail;
              this.currentNum = res.data.eventDetail.length;
              res.data.attachmentList && res.data.attachmentList.map((item, index) => {
                if (item.attachmentType === dictType.videoId) { // 视频
                  this.videoList.push(item);
                } else {
                  this.imgList.push(item);
                }
              });
              if (res.data.radius) {
                if (res.data.radius !== -1) {
                  // this.operationForm.radius = '推送';
                  this.radiusNumber = res.data.radius;
                  this.operationForm.radiusNumber = (res.data.radius).toString();
                }
              }
            }
          })
          .catch(() => {})
      }
    },
    modifyData (form) { // 修改事件
      const eventId = this.$route.query.eventId;
      if (eventId) {
        this.operationForm.eventId = eventId;
      }
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.isEditLoading = true;
          if (this.operationForm.radius === '不推送') {
            this.operationForm.radius = -1;
          } else {
            this.operationForm.radius = parseInt(this.operationForm.radiusNumber);
          }
          if (this.videoList.length > 0) {
            this.videoList.map(item => {
              this.operationForm.attachmentList.push(item);
            });
          }
          if (this.imgList.length > 0 && this.videoList.length === 0) {
            this.imgList.map(item => {
              this.operationForm.attachmentList.push(item);
            });
          }
          const param = {
            emiEvent: this.operationForm
          }
          this.axios.put('A2/eventServices/events/' + eventId, param.emiEvent)
            .then((res) => {
              if (res) {
                this.$message({
                  message: '修改消息成功',
                  type: 'success'
                });
                this.$router.push({name: 'mutual-person'});
                this.isEditLoading = false;
              } else {
                this.$message.error('修改消息失败');
                this.isEditLoading = false;
              }
              // this.isEditLoading = false;
            })
            .catch(() => {})
        }
      });
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>
<style lang="scss" scoped>
  .add-msg-person {
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
          .radius-tip {
            width: 420px;
          }
          /deep/ .el-form-item__error, .radius-tip {
            border: 1px solid #FA796C;
            height: 35px;
            line-height: 35px;
            background-color: #FEE6E0;
            border-radius: 2px;
            color: #FA796C;
            padding-top: 0;
            padding: 0 13px 0 26px;
          }
          /deep/ .el-form-item__error:before, .radius-tip:before {
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
    }
    .img-name {
      width: 100px;
      height: 100px;
      margin-right: 1%;
      margin-top: 1%;
    }
    .operation-btn-msg {
      margin-top: 2%;
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
    .address /deep/ .el-form-item__content {
      display: flex;
      .map-ecc {
        img {
          padding-top: 5px;
          padding-left: 5px;
        }
      }
    }
    /deep/ .el-dialog__header {
      background: #F0F0F0 !important;
      text-align: left !important;
      color: #555555;
      font-weight: bold;
      font-size: 16px;
    }
    /deep/ .el-dialog--center .el-dialog__body {
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
    .img-dialog {
      /deep/ .el-dialog__header {
        padding: 40px 20px 10px;
      }
       /deep/ .el-dialog__body {
        text-align: center !important;
      }
    }
  }
</style>
