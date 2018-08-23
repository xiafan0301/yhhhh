<template>
  <div class="bg-de">
    <div class="bg-de-t">
      <div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>地图绘边</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="bg-de-c">
      <div class="bg-de-cl">
        <div style="width: 100%; height: 100%;" id="drawEdge">
        </div>
        <div class="de-add-btn">
          <el-tooltip class="item" effect="dark" placement="right">
            <div slot="content">鼠标左键在地图上单击开始绘制多边形，<br/>鼠标左键双击或右键单击结束当前多边形的绘制</div>
            <el-button @click="addPolygon" class="de-add-btn" size="small" type="primary" icon="el-icon-plus">
              新增区块
            </el-button>
          </el-tooltip>
        </div>
        <el-button v-show="drawActive" @click="closePolygon" class="de-close-btn" size="small">
          关闭/清除当前绘制
        </el-button>
      </div>
      <div class="bg-de-cr">
        <el-table
          ref="polygonTable"
          :data="tableData"
          highlight-current-row
          @current-change="handleCurrentChange"
          height="100%"
          border
          class="bg-form-dialog"
          style="width: 100%; height: 100%;">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="areaName" label="区域名称" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="del(scope.row)" class="vis-bg-del-btn" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          :title="'新增区块'"
          :visible.sync="dialogVisible"
          width="600px">
          <el-form :model="editForm" :rules="editFormRules" ref="editForm"  style="padding-right: 60px;" size="small" label-width="150px">
            <el-form-item label="区块名称" prop="areaData">
              <el-select v-model="editForm.areaData" value-key="sid" placeholder="请选择">
                <el-option
                  v-for="item in sonList"
                  :filterable="true"
                  :key="item.sid"
                  :label="item.name"
                  :value="item"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" :loading="editSubmitLoading" @click="editSubmit('editForm')">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import {mapXupuxian} from '@/config/config.js';
export default {
  data () {
    return {
      amap: null,
      mouseTool: null,
      defaultCursor: '',
      zoom: 10,
      zooms: [8, 18],

      drawActive: false,
      dialogVisible: false,

      drawPaths: null,

      editForm: {
        areaName: '',
        areaData: null,
        borderList: []
      },
      sonList: [],
      sonPolygons: null,
      polygonStyles: {
        n: {
          fillOpacity: 0.5, // 0.95
          strokeColor: '#CC66CC',
          fillColor: '#CCF3FF'
        },
        s: {
          fillOpacity: 0.8, // 0.95
          strokeColor: '#c85fcc',
          fillColor: '#cbe4ff'
        }
      },
      tableData: [],
      editFormRules: {
        areaName: [
          { required: true, message: '请输入区块名称', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ],
        areaData: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      editSubmitLoading: false
    }
  },
  computed: {
  },
  watch: {
    dialogVisible () {
      this.$nextTick(() => {
        if (!this.dialogVisible) {
          this.closePolygon();
        }
      });
    }
  },
  mounted () {
    this.initMap();
  },
  methods: {
    initMap () {
      let _this = this;
      let map = new AMap.Map('drawEdge', {
        // defaultCursor: 'point',
        resizeEnable: true,
        center: mapXupuxian.center, // e.g. 溆浦县中心点
        zoom: this.zoom,
        zooms: this.zooms
      });
      // map.setMapStyle('amap://styles/a00b8c5653a6454dd8a6ec3b604ec50c');
      // console.log('_config', _config)
      _this.amap = map;
      _this.defaultCursor = _this.amap.getDefaultCursor();
      // 在地图中添加MouseTool插件
      let mouseTool = new AMap.MouseTool(map);
      _this.mouseTool = mouseTool;
      // 绘制行政区域边界
      this.drawBoundary();
      // 添加事件
      AMap.event.addListener(mouseTool, 'draw', function (e) {
        _this.drawPaths = e.obj.getPath();
        // console.log('drawPaths', _this.drawPaths); // 获取路径/范围
        setTimeout(() => {
          _this.editForm.areaData = null;
          _this.dialogVisible = true;
          _this.amap.setDefaultCursor(_this.defaultCursor);
        }, 100);
      });
      // 获取乡镇
      // this.getSonBoundary();
      this.getAreas();
    },
    getAreas () {
      this.axios.get('/mapServices/borders/' + mapXupuxian.adcode)
        .then((res) => {
          if (res && res.data) {
            this.tableData = res.data;
            // 获取乡镇
            this.getSonBoundary();
            this.setsonPolygons();
          }
        })
        .catch(() => {
        });
    },
    setsonPolygons () {
      let _this = this;
      if (this.amap && this.sonPolygons) {
        // console.log('remove')
        this.amap.remove(this.sonPolygons);
        this.sonPolygons = null;
      }
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i] && this.tableData[i].borderList) {
          // let oDis = result.districtList[0];
          // console.log('this.tableData[i]', this.tableData[i]);
          let borderList = this.tableData[i].borderList;
          let bounds = [];
          for (let j = 0; j < borderList.length; j++) {
            bounds.push({
              Q: borderList[j].longitude,
              lng: borderList[j].longitude,
              P: borderList[j].latitude,
              lat: borderList[j].latitude
            });
          }
          // console.log('setsonPolygons bounds', bounds);
          // 行政区边界渲染，使用多边形覆盖物实现
          let _name = this.tableData[i].areaName;
          let polygon = new AMap.Polygon(Object.assign({
            map: this.amap,
            strokeWeight: 2,
            path: [bounds],
            bubble: false, // 是否将覆盖物的鼠标或touch等事件冒泡到地图上
            zIndex: 12,
            extData: {
              areaName: _name
            }
          }, this.polygonStyles.n));
          polygon.on('click', function (mEvent) {
            _this.handleCurrentChange2(_name);
          });
          if (!this.sonPolygons) {
            this.sonPolygons = [];
          }
          this.sonPolygons.push(polygon);
        }
      }
      // console.log('this.sonPolygons', this.sonPolygons)
    },
    handleCurrentChange (val) {
      if (val) {
        for (let i = 0; i < this.sonPolygons.length; i++) {
          let _o = this.sonPolygons[i];
          if (_o.D.extData && _o.D.extData.areaName === val.areaName) {
            _o.setOptions(this.polygonStyles.s);
          } else {
            // this.polygonStyles.n
            _o.setOptions(this.polygonStyles.n);
          }
        }
      }
    },
    handleCurrentChange2 (name) {
      if (name) {
        for (let i = 0; i < this.tableData.length; i++) {
          let _o = this.tableData[i];
          if (name === _o.areaName) {
            this.$refs.polygonTable.setCurrentRow(_o);
          }
        }
        this.handleCurrentChange({areaName: name});
      }
    },
    addPolygon () {
      if (this.amap && this.mouseTool) {
        this.mouseTool.close(true);
        this.mouseTool.polygon();
        this.drawActive = true;
        this.amap.setDefaultCursor('crosshair');
      }
    },
    closePolygon () {
      if (this.amap && this.mouseTool) {
        this.mouseTool.close(true);
        this.drawActive = false;
        this.amap.setDefaultCursor(this.defaultCursor);
      }
    },
    editSubmit (formRef) {
      this.$refs[formRef].validate((valid) => {
        if (valid) {
          let _abd = [];
          // console.log('this.drawPaths', this.drawPaths);
          for (let m = 0; m < this.drawPaths.length; m++) {
            _abd.push({
              longitude: this.drawPaths[m].lng,
              latitude: this.drawPaths[m].lat
            })
          }
          let params = {
            areaCode: this.editForm.areaData.adcode,
            areaName: this.editForm.areaData.name,
            borderList: _abd
          };
          this.editSubmitLoading = true;
          this.axios.post('/mapServices/borders/', params)
            .then((res) => {
              this.editSubmitLoading = false;
              this.dialogVisible = false;
              this.getAreas();
              this.closePolygon();
            })
            .catch(() => {
              this.editSubmitLoading = false;
            });
        } else {
          return false;
        }
      });
    },
    del (item) {
      // console.log('item', item)
      let _this = this;
      _this.$msgbox({
        title: '删除提示',
        message: '确定删除吗？',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '删除中...';
            // ajax
            _this.axios.delete('/mapServices/borders/' + item.areaCode + '/' + item.areaName).then(function (res) {
              instance.confirmButtonText = '确定';
              instance.confirmButtonLoading = false;
              done();
              _this.getAreas();
            }).catch(function () {
              instance.confirmButtonText = '确定';
              instance.confirmButtonLoading = false;
              done();
            });
          } else {
            done();
          }
        }
      }).then(action => {
      });
    },
    // 绘制行政区域边界
    drawBoundary () {
      let _this = this;
      // AMap.service('AMap.DistrictSearch', function () { // 回调函数
      // 实例化DistrictSearch
      let districtSearch = new AMap.DistrictSearch({
        level: 'biz_area', // country、province、city、district、biz_area
        subdistrict: 0, // 返回下一级行政区
        showbiz: true, // 最后一级返回街道信息
        extensions: 'all' // 返回行政区边界坐标组等具体信息
      });
      // 使用districtSearch对象调用行政区查询的功能
      districtSearch.search(mapXupuxian.adcode, function (status, result) {
        // console.log('result', result)
        if (result && result.districtList[0]) {
          let oDis = result.districtList[0];
          let bounds = oDis.boundaries;
          // console.log('drawBoundary bounds', bounds);
          // 行政区边界渲染，使用多边形覆盖物实现
          let polygon = new AMap.Polygon({
            map: _this.amap,
            strokeWeight: 2,
            path: bounds,
            zIndex: 11,
            fillOpacity: 0.2, // 0.95
            strokeColor: '#CC66CC',
            fillColor: '#CCF3FF'
          });
        }
        // _this.amap.setFitView();
      })
      // map.setZooms(9.8);
      // });
    },
    getSonBoundary () {
      // 行政区划查询
      let _this = this;
      if (_this.sonList && _this.sonList.length > 0) {
        _this.setDisableds();
        return false;
      }
      var opts = {
        subdistrict: 1, // 返回下一级行政区
        showbiz: false // 最后一级返回街道信息
      };
      let district = new AMap.DistrictSearch(opts); // 注意：需要使用插件同步下发功能才能这样直接使用
      district.search(mapXupuxian.adcode, function (status, result) {
        if (status === 'complete') {
          // console.log('result', result)
          // getData(result.districtList[0]);
          let _d = result.districtList[0].districtList;
          for (let i = 0; i < _d.length; i++) {
            _d[i].sid = _d[i].adcode + '_' + i;
          }
          _this.sonList = _d;
          _this.setDisableds();
          // console.log('this.sonList', _this.sonList)
        }
      });
    },
    setDisableds () {
      for (let i = 0; i < this.sonList.length; i++) {
        // _d[i].sid = _d[i].adcode + '_' + i;
        let _o = this.sonList[i], _flag = false;
        for (let j = 0; j < this.tableData.length; j++) {
          if (this.tableData[j].areaName === _o.name) {
            _flag = true;
          }
        }
        _o.disabled = _flag;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .bg-de {
    width: 100%; height: 100%;
    padding: 0 20px 20px 20px;
    position: relative;
    > .bg-de-t {
      width: 100%; height: 52px;
      position: absolute; top: 0; left: 0;
      padding: 20px 20px 0 20px;
      > div {
        border-bottom: 1px solid #eee;
        height: 32px;
      }
    }
    > .bg-de-c {
      padding-top: 72px;
      height: 100%;
      overflow: hidden;
      > .bg-de-cl {
        float: left;
        width: 65%; height: 100%;
        position: relative;
      }
      > .bg-de-cr {
        float: left;
        width: 35%; height: 100%;
        overflow: auto;
        padding-left: 20px;
      }
    }
  }
  .de-add-btn {
    position: absolute; top: 10px; left: 10px; z-index:11;
  }
  .de-close-btn {
    position: absolute; top: 10px; right: 10px; z-index:11;
  }
</style>
