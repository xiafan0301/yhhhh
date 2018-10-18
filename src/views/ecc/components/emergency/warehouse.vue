<template>
  <div class="addwarehouse-plan-person">
    <div class='add-msg-header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>应急库</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'emergency-materialList'}" >物资管理</el-breadcrumb-item>
        <el-breadcrumb-item ><span style='color: #0785FD'>{{status}}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='add-msg-body'>
      <div class='add-form-person'>
        <el-form class='form-content-person' :model="form" :rules="rule" ref="form" :inline-message= true>
          <el-form-item label="仓库名称" label-width='150px' prop="warehouseName">
            <el-input  placeholder="请输入仓库名称" style='width: 500px' v-model="form.warehouseName">
            </el-input>
          </el-form-item>
          <el-form-item label="仓库地点" label-width='150px' class="address" prop="warehouseAddress">
            <el-input  placeholder="请输入仓库地点" style='width: 500px' v-model="form.warehouseAddress"  id="tipinput" @input="onPositionChange">
            </el-input>
            <div class='map-ecc' ><img title="选择事发地点" src="../../../../assets/img/temp/map-ecc.png" style='cursor:pointer' @click='showMap' /></div>
          </el-form-item>
          <el-form-item label="上报单位" label-width='150px' >
            <el-select  placeholder="请选择上报单位" style='width: 500px' v-model="form.reportingUnit">
              <el-option
                v-for="item in DepartmentList"
                :key="item.uid"
                :label="item.organName"
                :value="item.uid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责人" label-width='150px' prop="administrators">
            <el-input  placeholder="请输入负责人" style='width: 500px' v-model="form.administrators">
            </el-input>
          </el-form-item>
          <el-form-item label="联系电话" label-width='150px' prop="adminTel">
            <el-input  placeholder="请输入联系电话" style='width: 500px' v-model="form.adminTel">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class='operation-btn-msg' >
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary"  :loading="addLoading" @click="onSubmit('form')" >确定</el-button>
      </div>
    </div>
    <div is="mapPoint" @mapPointSubmit="mapPointSubmit" :open="open" :oConfig="oConfig"></div>
  </div>
</template>
<script>
import mapPoint from '@/components/common/mapPoint.vue';
import { checkZel } from '@/utils/validator.js';
export default {
  components: {mapPoint},
  data () {
    return {
      addLoading: false,
      open: false,
      oConfig: {},
      status: '',
      form: {
        adminTel: '',
        administrators: '',
        coordinate: '',
        reportingUnit: '',
        warehouseAddress: '',
        warehouseId: '',
        warehouseName: ''
      },
      DepartmentList: [],
      rule: {
        warehouseName: [
          { required: true, message: '请输入仓库名称', trigger: 'blur' },
          { max: 50, message: '最多可以输入50个字' }
        ],
        warehouseAddress: [
          { required: true, message: '请输入仓库地点', trigger: 'blur' },
          { max: 125, message: '最多可以输入125个字' }
        ],
        administrators: [
          { required: true, message: '请输入负责人', trigger: 'blur' },
          { max: 4, message: '最多可以输入4个字' }
        ],
        adminTel: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { validator: checkZel, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (this.$route.query.status === 'modify') {
      this.getmaterialck()
    }
    this.getDepartmentList();
  },
  computed: {
  },
  mounted () {
    if (this.$route.query.status === 'add') {
      this.status = '添加仓库'
    } else if (this.$route.query.status === 'modify') {
      this.status = '修改仓库'
    }
  },
  methods: {
    onPositionChange (val) {
      // 地图加载
      let value = val;
      let _this = this;
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
            this.form.coordinate = result.geocodes[0].location.lng + ',' + result.geocodes[0].location.lat
          }
        });
      })
      AMap.event.addListener(auto, 'select', function (e) {
        value = e.poi.name;
        _this.form.warehouseAddress = e.poi.name;
        AMap.service('AMap.Geocoder', () => {
          var geocoder = new AMap.Geocoder({});
          geocoder.getLocation(e.poi.name, (status, result) => {
            if (status === 'complete' && result.info === 'OK') {
              _this.form.coordinate = result.geocodes[0].location.lng + ',' + result.geocodes[0].location.lat
            }
          });
        })
      }); // 注册监听，当选中某条记录时会触发
    },
    showMap () {
      // 编辑状态
      if (this.$route.query.status === 'modify') {
        this.oConfig = {
          _name: this.form.warehouseAddress,
          center: [this.form.coordinate.split(',')[0], this.form.coordinate.split(',')[1]]
        }
      }
      this.open = !this.open;
    },
    mapPointSubmit (val, address) {
      if (val) {
        this.form.coordinate = val;
        this.form.warehouseAddress = address
      }
    },
    getDepartmentList () {
      this.axios.get('A3/authServices/organInfos')
        .then((res) => {
          if (res && res.data.list) {
            this.DepartmentList = res.data.list
          }
        })
        .catch(() => {})
    },
    getmaterialck () {
      const warehouseId = this.$route.query.warehouseId;
      this.axios.get('A2/warehouseService/' + warehouseId)
        .then((res) => {
          this.form = Object.assign({}, res.data);
          this.form.coordinate = res.data.longitude + ',' + res.data.latitude
        })
    },
    onSubmit (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.$route.query.status === 'add') {
            let params = this.form;
            this.addLoading = true
            params.longitude = this.form.coordinate.split(',')[0];
            params.latitude = this.form.coordinate.split(',')[1];
            if (params.reportingUnit === '') {
              params.reportingUnit = null
            }
            this.axios.post('A2/warehouseService', params)
              .then((res) => {
                if (res) {
                  this.addLoading = false
                  this.$router.push({name: 'emergency-materialList', params: {statusindex: 1}});
                  this.$message.success('添加仓库成功');
                } else {
                  this.addLoading = false
                }
              })
          } else {
            let params = this.form;
            params.longitude = this.form.coordinate.split(',')[0];
            params.latitude = this.form.coordinate.split(',')[1];
            this.addLoading = true
            this.axios.put('A2/warehouseService/updateOne', params)
              .then((res) => {
                if (res) {
                  this.addLoading = false
                  this.$router.push({name: 'emergency-materialList'});
                  this.$message.success('修改仓库成功');
                } else {
                  this.addLoading = false
                }
              })
          }
        } else {
          return false;
        }
      });
    },
    cancel () {
      this.$router.push({name: 'emergency-materialList'});
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
  .addwarehouse-plan-person {
    padding: 20px;
    .add-msg-header {
      margin-bottom: 20px;
    }
    .add-msg-body {
      .add-form-person {
        background-color: #fff;
        padding-bottom: 2%;
        .form-content-person {
          padding-top: 2%;
          .el-form-item {
            margin-bottom: 15px;
          }
        }
      }
    }
    .operation-btn-msg {
      margin-top: 2%;
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
    /deep/.el-form-item__error{
      padding-top: 12px;
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
</style>
