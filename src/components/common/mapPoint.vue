<template>
  <el-dialog
    :title="'坐标选择'"
    :visible.sync="dialogVisible"
    :append-to-body="true"
    width="880px"
    class="map-p-dialog">
    <div class="map-p-main">
      <div class="map-p-t">
        <input v-model="searchVal" type="text" placeholder="请输入关键字进行搜索" id="mapSearchInput">
        <div>
          当前获取的经纬度：
          <el-input v-model="jwd" :readonly="true" style="width: 180px;" size="small"></el-input>
          <el-button @click="selSubmit" :disabled="!jwd" type="primary" round size="small" icon="el-icon-check" style="margin-left: 10px;">确定</el-button>
        </div>
      </div>
      <div class="map-p-c">
        <div style="width: 100%; height: 100%;" id="mapPoint-container"></div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: ['open', 'oConfig'],
  data () {
    return {
      amap: null,
      config: {
        _name: '',
        zoom: 16,
        center: [110.596015, 27.907662],
        zooms: [14, 18]
      },
      searchVal: '',
      jwd: '',
      oldMarker: null,
      newMarker: null,

      dialogVisible: false
    }
  },
  watch: {
    open () {
      this.dialogVisible = true;
      // this.jwd = '';
      if (this.amap) {
      } else {
        setTimeout(() => {
          this.initMap();
        }, 200)
      }
    },
    oConfig () {
      // console.log('oConfig', this.oConfig)
      setTimeout(() => {
        this.setMap(this.oConfig);
      }, 300)
    }
  },
  methods: {
    initMap () {
      let _this = this;
      let _config = this.oConfig;
      if (!_config) { _config = {}; }
      _config = Object.assign({}, _config, _this.config);
      // console.log('_config', _config)
      // 初始化地图
      let map = new AMap.Map('mapPoint-container', Object.assign({}, _config));
      // map.setMapStyle('amap://styles/a00b8c5653a6454dd8a6ec3b604ec50c');
      // console.log('_config', _config)
      _this.amap = map;
      _this.$nextTick(() => {
        _this.setMap(_config);
      });
      // 为地图注册click事件获取鼠标点击出的经纬度坐标
      let clickEventListener = map.on('click', function (e) {
        _this.jwd = e.lnglat.getLng() + ',' + e.lnglat.getLat();
        if (_this.newMarker) {
          _this.amap.remove(_this.newMarker);
          _this.newMarker = null;
        }
        let marker = new AMap.Marker({ // 添加自定义点标记
          map: _this.amap,
          position: [e.lnglat.getLng(), e.lnglat.getLat()], // 基点位置
          offset: new AMap.Pixel(-15, -30), // 相对于基点的偏移位置
          draggable: false, // 是否可拖动
          content: '<div class="map-p-marker map-p-marker-new" title="新的位置"><i class="el-icon-location"></i></div>' // 自定义点标记覆盖物内容
        });
        _this.newMarker = marker;
        AMap.service('AMap.Geocoder', function () { // 回调函数
          let geocoder = new AMap.Geocoder({});
          geocoder.getAddress([e.lnglat.getLng(), e.lnglat.getLat()], function (status, result) {
            let sAddr = '';
            if (status === 'complete' && result.info === 'OK') {
              // 获得了有效的地址信息: result.regeocode.formattedAddress
              // console.log(result.regeocode.formattedAddress);
              sAddr = result.regeocode.formattedAddress;
            }
            _this.searchVal = sAddr;
          });
        });
      });
      // 注册监听，当选中某条记录时会触发
      let auto = new AMap.Autocomplete({
        input: 'mapSearchInput'
      });
      AMap.event.addListener(auto, 'select', _this.select);
    },
    setMap (oConfig) {
      if (this.amap) {
        if (this.newMarker) {
          this.amap.remove(this.newMarker);
          this.newMarker = null;
        }
        if (this.oldMarker) {
          this.amap.remove(this.oldMarker);
          this.oldMarker = null;
        }
        if (oConfig) {
          if (oConfig.center) {
            this.amap.setCenter(oConfig.center);
            this.jwd = oConfig.center.join(',');
            // console.log('oConfig.center', oConfig.center)
            let marker = new AMap.Marker({ // 添加自定义点标记
              map: this.amap,
              position: oConfig.center, // 基点位置
              offset: new AMap.Pixel(-15, -30), // 相对于基点的偏移位置
              draggable: true, // 是否可拖动
              content: '<div class="map-p-marker map-p-marker-old" title="原来的位置"><i class="el-icon-location"></i></div>' // 自定义点标记覆盖物内容
            });
            this.oldMarker = marker;
          } else {
            this.jwd = '';
          }
          if (oConfig._name) {
            this.searchVal = oConfig._name;
          } else {
            this.searchVal = '';
          }
        }
      }
    },
    selSubmit () {
      // console.log('获取的经纬度为：', this.jwd);
      this.$emit('mapPointSubmit', this.jwd, this.searchVal);
      this.dialogVisible = false;
    },
    select (e) {
      if (e.poi && e.poi.location) {
        this.amap.setZoom(15);
        this.amap.setCenter(e.poi.location);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .map-p-main {
    position: relative;
    width: 100%; height: 500px;
    margin: 0 auto;
    > .map-p-t {
      position: absolute; top: 0; left: 0;
      width: 100%;
      height: 40px;
      > input {
        width: 200px; height: 30px; line-height: 30px;
        padding: 0 10px;
        border: 1px solid #ddd;
        border-radius: 8px;
      }
      > div {
        position: absolute; top: 0; right: 0;
      }
    }
    > .map-p-c {
      height: 100%;
      width: 100%;
      padding-top: 40px;
    }
  }
</style>
