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
            <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model='operationForm.reportTime' type="datetime" placeholder="选择事发时间" style="width: 500px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="事发地点" label-width='150px' class="address" prop='eventAddress'>
            <el-input style='width: 500px' placeholder='请选择事发地点...' v-model='operationForm.eventAddress'></el-input>
            <!-- <span class='look-map' style='color:#0785FD;font-size:13px;position:relative;right:75px'>选择地点</span> -->
            <div class='map-ecc'><img src="../../../../assets/img/temp/map-ecc.png" style='cursor:pointer' @click='showMap' /></div>
          </el-form-item>
          <!-- <el-form-item label="经度" label-width='150px' prop='longitude' class="address">
            <el-input style='width: 500px' placeholder='请选择经度...' v-model='operationForm.longitude'></el-input>
          </el-form-item>
          <el-form-item label="纬度" label-width='150px' prop='latitude' class="address">
            <el-input style='width: 500px' placeholder='请选择纬度...' v-model='operationForm.latitude'></el-input>
          </el-form-item> -->
          <el-form-item label="事件情况" label-width='150px' prop='eventDetail'>
            <el-input type="textarea" v-model='operationForm.eventDetail' style='width: 500px' placeholder='请选择事件详细情况...' rows='7'></el-input>
          </el-form-item>
          <el-form-item style='margin-left: 150px'>
            <template v-if="this.$route.query.status !== 'add'">
              <img
                v-for='item in operationForm.attachmentList'
                :src='item.url'
                :key='item.attachmentId'
                class='img-name'
              />
            </template>
            <template v-else>
              <el-upload
                action="http://10.16.4.50:8001/api/network/upload/new"
                list-type="picture-card"
                :before-upload='handleBeforeUpload'
                :on-remove="handleRemove"
                :on-success='handleSuccess'
                :limit='9'
              >
                <i class="el-icon-plus" style='width: 36px;height:36px;color:#D8D8D8'></i>
                <span class='add-img-text'>添加图片</span>
              </el-upload>
            </template>
          </el-form-item>
          <el-form-item label="是否推送消息" label-width='150px'>
            <el-radio-group style='width: 330px' v-model='operationForm.radius'>
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
        </el-form>
      </div>
      <div class='operation-btn-msg'>
        <el-button @click='back'>返回</el-button>
        <template v-if="this.$route.query.status === 'add'">
          <el-button style='background: #0785FD;color:#fff' @click="submitData('operationForm')">确认发布</el-button>
        </template>
        <template v-else>
          <el-button style='background: #0785FD;color:#fff' @click="modifyData('operationForm')">确认修改</el-button>
        </template>
      </div>
    </div>
    <div is="mapPoint" @mapPointSubmit="mapPointSubmit" :open="open" :oConfig="oConfig"></div>
  </div>
</template>
<script>
import {dictType} from '@/config/data.js';
import mapPoint from '@/components/common/mapPoint.vue';
export default {
  components: {mapPoint},
  data () {
    return {
      status: '', // 添加或修改消息
      open: false,
      oConfig: {},
      operationForm: {
        eventSource: 'b663a0c6-97b1-11e8-b784-e756beb98040',
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
      distanceList: [] // 距离列表
    }
  },
  mounted () {
    if (this.$route.query.status === 'add') {
      this.status = '添加消息';
    } else if (this.$route.query.status === 'modify') {
      this.status = '修改消息';
    }
    this.getDistance();
    this.getAppEventDetail();
  },
  methods: {
    back () {
      this.$router.back(-1);
    },
    showMap () {
      console.log('2222')
      if (this.operationForm.eventAddress === '') {
        this.oConfig = {};
      } else {
        this.oConfig = {
          _name: this.operationForm.eventAddress,
          center: [Number(this.operationForm.longitude), Number(this.operationForm.latitude)]
        }
      }
      this.open = !this.open;
      console.log(this.open)
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
        this.operationForm.attachmentList.push(data);
      }
    },
    handleRemove (file, fileList) { // 删除图片
      if (file && file.response) {
        if (this.operationForm.attachmentList.length > 0) {
          this.operationForm.attachmentList.map((item, index) => {
            if (item.url === file.response.data.newFileName) {
              this.operationForm.attachmentList.splice(index, 1);
            }
          });
        }
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
    submitData (form) { // 确认发布
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.operationForm.radius === '不推送') {
            this.operationForm.radius = -1;
          } else {
            this.operationForm.radius = parseInt(this.operationForm.radiusNumber);
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
              } else {
                this.$message.error('添加消息失败');
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
              this.operationForm.attachmentList = res.data.attachmentList;
              if (res.data.radius) {
                if (res.data.radius > 0) {
                  this.operationForm.radius = '推送';
                  this.radiusNumber = res.data.radius;
                }
              }
              console.log(res);
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
          if (this.operationForm.radius === '不推送') {
            this.operationForm.radius = -1;
          } else {
            this.operationForm.radius = parseInt(this.operationForm.radiusNumber);
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
              } else {
                this.$message.error('修改消息失败');
              }
            })
            .catch(() => {})
        }
      });
    }
  }
}
</script>
<style lang="scss">
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
    .el-upload-list--picture-card .el-upload-list__item {
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
  }
</style>
