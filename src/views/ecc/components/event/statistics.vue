<template>
  <div>
    <!-- 面包屑 -->
    <div class="e_stat_bd">
      <el-breadcrumb separator-class="el-icon-ESlint-right">
        <el-breadcrumb-item>事件互助管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>统计分析</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 查询条件 -->
    <div class="e_stat_s">
      <el-form :inline="true" :model="searchForm" size="small">
        <el-form-item>
          <el-date-picker
            class="e_stat_dp"
            v-model="searchForm.time"
            type="daterange"
            align="left"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :editable="false"
            :clearable="false"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="searchLoading"  @click="searchSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="e_stat_content" v-loading="searchLoading">
      <!-- 综合统计 -->
      <ul class="e_stat_zt">
        <li>
          <div>
            <span></span>
            <div>
              <h3>{{generalData.totalCount}}</h3>
              <p>事件数量</p>
            </div>
          </div>
        </li>
        <li>
          <div>
            <span></span>
            <div>
              <h3>{{generalData.finishCount}}</h3>
              <p>处理完成</p>
            </div>
          </div>
        </li>
        <li>
          <div>
            <span></span>
            <div>
              <h3>{{generalData.processingCount}}</h3>
              <p>处理中</p>
            </div>
          </div>
        </li>
        <li>
          <div>
            <span></span>
            <div>
              <h3>{{generalData.pendingCount}}</h3>
              <p>待处理</p>
            </div>
          </div>
        </li>
      </ul>
      <!-- 统计图表 -->
      <ul class="e_stat_tt">
        <li>
          <div>
            <h4 class="stat_title">事件等级分析</h4>
            <div class="stat_tt_item" id="stat_1">
            </div>
          </div>
        </li>
        <li>
          <div>
            <h4 class="stat_title">事件类型分析</h4>
            <div class="stat_tt_item" id="stat_2">
            </div>
          </div>
        </li>
        <li>
          <div>
            <h4 class="stat_title">事件数量趋势</h4>
            <div class="stat_tt_item" id="stat_3">
            </div>
          </div>
        </li>
        <li>
          <div>
            <h4 class="stat_title">事件性质统计</h4>
            <div class="stat_tt_item" id="stat_4">
            </div>
          </div>
        </li>
      </ul>
      <!-- 地图统计 -->
      <div class="e_stat_map">
        <div class="stat_map_c">
          <div class="stat_map_cl">
            <h4 class="stat_title">事件高发地点分析</h4>
            <ul class="stat_map_cl_ul">
              <template v-if="polygons && polygons.length > 0">
                <li v-if="polygons.length > 0">
                  <span></span>
                  <h5>{{polygons[0].areaName}}</h5>
                  <div><span>{{polygons[0].eventCount}}</span>&nbsp;件</div>
                </li>
                <li v-if="polygons.length > 1">
                  <span></span>
                  <h5>{{polygons[1].areaName}}</h5>
                  <div><span>{{polygons[1].eventCount}}</span>&nbsp;件</div>
                </li>
                <li v-if="polygons.length > 2">
                  <span></span>
                  <h5>{{polygons[2].areaName}}</h5>
                  <div><span>{{polygons[2].eventCount}}</span>&nbsp;件</div>
                </li>
                <li v-if="polygons.length > 3">
                  <span></span>
                  <h5>{{polygons[3].areaName}}</h5>
                  <div><span>{{polygons[3].eventCount}}</span>&nbsp;件</div>
                </li>
                <li v-if="polygons.length > 4">
                  <span></span>
                  <h5>{{polygons[4].areaName}}</h5>
                  <div><span>{{polygons[4].eventCount}}</span>&nbsp;件</div>
                </li>
              </template>
            </ul>
          </div>
          <div class="stat_map_cr" id="drawEdge"></div>
          <div class="de-close-btn">
            <span class="de-btn-r" @click="setMapStatus('1')"></span>
            <span class="de-btn-fd" @click="setMapStatus('2')" :class="{'de-btn-dis': mapScale.fd}"></span>
            <span class="de-btn-sx" @click="setMapStatus('3')" :class="{'de-btn-dis': mapScale.sx}"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import G2 from '@antv/g2';
import { View } from '@antv/data-set';
import {mapXupuxian} from '@/config/config.js';
import {formatDate} from '@/utils/util.js';
export default {
  data () {
    return {
      searchLoading: false,
      loadingHandler: true,
      charts: {
        chart1: null,
        chart2: null,
        chart3: null,
        chart4: null
      },
      colors: [
        ['#00A2FF', '#0080FE', '#0054FE', '#BF2CFE', '#218FD5'],
        [
          [0, 162, 255],
          [0, 128, 254],
          [0, 84, 254],
          [191, 44, 254],
          [33, 143, 213]
        ]
      ],
      searchForm: {
        time: [new Date(), new Date()]
      },
      // 事件总体情况统计数据
      generalData: {
        finishCount: 0,
        pendingCount: 0,
        processingCount: 0,
        totalCount: 0
      },
      pickerOptions2: {
        shortcuts: [
          {
            text: '今天',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一周',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一年',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
      amap: null,
      sonPolygons: null,
      polygons: null,
      zoom: 10,
      zooms: [9, 17],
      mapScale: {
        fd: false,
        sx: false
      }
    }
  },
  mounted () {
    this.intitReportSize();
    this.initMap();
    this.getSonBoundary();
    this.searchSubmit();
  },
  methods: {
    intitReportSize () {
      let $list = $('.stat_tt_item');
      if ($list && $list.length > 0) {
        let iw = $list.width();
        $list.height(iw * 0.4);
      }
    },
    searchSubmit () {
      this.searchLoading = true;
      this.loadingHandler = true;
      this.initDatas();
    },
    initDatas () {
      // 事件总体情况统计
      this.getGeneralData();
      // 事件性质统计
      this.getPropertyData();
      // 事件数量趋势分析
      this.getQuantitativetyData();
      // 事件等级分析
      this.getRankAnalysisData();
      // 事件类型分析
      this.getTypeAnalysisData();
      // 事件高发地点分析
      this.getHotLocationData();
    },
    // 事件总体情况统计
    getGeneralData () {
      let params = this.getSearchParams();
      this.axios.get('A2/eventCountServices/generalCondition/?' + $.param(params))
        .then((res) => {
          if (res && res.data) {
            // console.log('事件总体情况统计', res);
            this.generalData = res.data;
            this.loadHandler();
          }
        })
        .catch(() => { this.loadHandler(); })
    },
    // 事件性质统计
    getPropertyData () {
      let params = this.getSearchParams();
      this.axios.get('A2/eventCountServices/propertyStatistics/?' + $.param(params))
        .then((res) => {
          if (res && res.data) {
            // console.log('事件性质统计', res);
            let _data = [{
              value: Number(res.data.eventCount),
              name: '应急事件'
            }, {
              value: Number(res.data.mutualCount),
              name: '民众互助'
            }, {
              value: Number(res.data.otherCount),
              name: '其它'
            }];
            this.setStats4(_data);
            this.loadHandler();
          }
        })
        .catch(() => { this.loadHandler(); })
    },
    // 事件数量趋势分析
    getQuantitativetyData () {
      let params = this.getSearchParams();
      this.axios.get('A2/eventCountServices/quantitativeTrend/?' + $.param(params))
        .then((res) => {
          if (res) {
            // console.log('事件数量趋势分析', res);
            let _data = [];
            for (let i = 0; i < res.data.length; i++) {
              _data.push({
                year: res.data[i].time,
                sales: Number(res.data[i].count)
              });
            }
            this.setStats3(_data);
            this.loadHandler();
          }
        })
        .catch(() => { this.loadHandler(); })
    },
    // 事件等级分析
    getRankAnalysisData () {
      let params = this.getSearchParams();
      this.axios.get('A2/eventCountServices/rankAnalysis/?' + $.param(params))
        .then((res) => {
          if (res && res.data) {
            // console.log('事件等级分析', res);
            let _data = [];
            for (let i = 0; i < res.data.length; i++) {
              _data.push({
                item: res.data[i].level,
                count: res.data[i].count,
                percent: isNaN(res.data[i].proportion) ? 0 : (Number(res.data[i].proportion) / 100)
              });
            }
            this.setStats1(_data);
            this.loadHandler();
          }
        })
        .catch(() => { this.loadHandler(); })
    },
    // 事件类型分析
    getTypeAnalysisData () {
      let params = this.getSearchParams();
      this.axios.get('A2/eventCountServices/typeAnalysis/?' + $.param(params))
        .then((res) => {
          // console.log('事件类型分析', res);
          if (res && res.data) {
            let _data = [];
            for (let i = 0; i < res.data.length; i++) {
              _data.push({
                year: res.data[i].type,
                sales: Number(res.data[i].count)
              });
            }
            this.setStats2(_data);
            this.loadHandler();
          }
        })
        .catch(() => { this.loadHandler(); })
    },
    // 事件高发地点分析
    getHotLocationData () {
      let params = this.getSearchParams();
      this.axios.get('A2/eventCountServices/hotLocation/?' + $.param(params))
        .then((res) => {
          if (res && res.data) {
            // console.log('事件高发地点分析', res);
            this.polygons = res.data;
            this.setsonPolygons(res.data);
          }
        })
        .catch(() => { this.loadHandler(); })
    },
    // 查询参数
    getSearchParams () {
      return {
        'where.reportTimeStart': formatDate(this.searchForm.time[0], 'yyyy-MM-dd'),
        'where.reportTimeEnd': formatDate(this.searchForm.time[1], 'yyyy-MM-dd')
      }
    },
    setsonPolygons (data) {
      let _this = this;
      if (this.amap && this.sonPolygons) {
        // console.log('remove')
        this.amap.remove(this.sonPolygons);
        this.sonPolygons = null;
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i] && data[i].borderList) {
          // let oDis = result.districtList[0];
          // console.log('this.tableData[i]', this.tableData[i]);
          let borderList = data[i].borderList;
          let bounds = [];
          for (let j = 0; j < borderList.length; j++) {
            if (borderList[j].longitude > 0 && borderList[j].latitude > 0) {
              bounds.push(new AMap.LngLat(borderList[j].longitude, borderList[j].latitude));
            }
          }
          // console.log('setsonPolygons bounds', bounds);
          // 行政区边界渲染，使用多边形覆盖物实现
          // let _name = data[i].areaName;
          let polygonStyles = {
            n: {
              fillOpacity: 1, // 0.95
              strokeColor: '#fff',
              fillColor: '#088bfd'
            },
            s: {
              fillOpacity: 1, // 0.95
              strokeColor: '#fff',
              fillColor: '#f9783f'
            }
          };
          let polygon = new AMap.Polygon(Object.assign({
            map: this.amap,
            path: [bounds],
            bubble: false, // 是否将覆盖物的鼠标或touch等事件冒泡到地图上
            zIndex: 12,
            extData: {
              // areaName: _name
            }
          }, this.getPolygonStyles(i)));
          if (!this.sonPolygons) {
            this.sonPolygons = [];
          }
          this.sonPolygons.push(polygon);
        }
      }
      // console.log('this.sonPolygons', this.sonPolygons)
    },
    getPolygonStyles (_index) {
      let _o = {
        fillOpacity: 1,
        strokeColor: '#fff'
      };
      let fillColors = ['#00A2FF', '#0F70C4', '#0054FE', '#4E2DF6', '#BF2CFE'];
      if (_index < 5) {
        _o.strokeWeight = 4;
        _o.fillColor = fillColors[_index];
      } else {
        _o.fillColor = '#088bfd';
        _o.strokeWeight = 1;
      }
      return _o;
    },
    // 行政边界
    getSonBoundary () {
      let _this = this;
      AMap.service('AMap.DistrictSearch', function () { // 回调函数
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
          if (result && result.districtList && result.districtList[0]) {
            let oDis = result.districtList[0];
            let bounds = oDis.boundaries;
            // 行政区边界渲染，使用多边形覆盖物实现
            let polygon = new AMap.Polygon({
              map: _this.amap,
              strokeWeight: 2,
              path: bounds,
              fillOpacity: 0, // 0.95
              fillColor: '#02269e', // 0b21a0 032488
              strokeColor: '#0dd8ff',
              strokeOpacity: 0.5,
              zIndex: 10
            });
            polygon.on('click', function (e) {
            });
            polygon.on('dblclick', function (e) {
              _this.amap.setZoom(_this.amap.getZoom() + 1);
            });
          }
          // map.setFitView();
        })
        // map.setZooms(9.8);
      });
    },
    loadHandler () {
      if (this.loadingHandler) {
        setTimeout(() => {
          this.searchLoading = false;
        }, 500);
        this.loadingHandler = false;
      }
    },
    setStats1 (data) {
      if (this.charts.chart1) {
        this.charts.chart1.source(data);
        this.charts.chart1.guide().clear();// 清理guide
        this.charts.chart1.repaint();
        return false;
      }
      let _this = this;
      let temp = document.getElementById('stat_1');
      let chart = new G2.Chart({
        container: 'stat_1',
        forceFit: true,
        padding: [ 12, 12 * 14, 12, 0 ],
        width: G2.DomUtil.getWidth(temp),
        height: G2.DomUtil.getHeight(temp)
      });
      chart.source(data, {
        percent: {
          formatter: function formatter (val) {
            val = val * 100 + '%';
            return val;
          }
        }
      });
      chart.coord('theta');
      chart.tooltip({
        showTitle: false
      });
      chart.legend({
        position: 'right',
        title: null,
        textStyle: {
          fill: '#f1f1f1', // 文本的颜色
          fontSize: 12
        },
        offsetY: 0, // -G2.DomUtil.getHeight(temp005) / 2 + 4 * intRem,
        offsetX: -11 * 12,
        // itemGap: 20, // 图例项之间的间距
        useHtml: true,
        containerTpl: '<div class="g2-legend e_stat_tb_ld1 as-trans50-t" style="position:absolute;top:20px;right:60px;width:auto;">' +
        '<ul class="g2-legend-list" style="list-style-type:none;margin:0;padding:0;"></ul>' +
        '</div>',
        itemTpl: (value, color, checked, index) => {
          if (index > 4) {
            return value;
          }
          return '<li class="g2-legend-list-item item-' + index + ' ' + checked +
            '" data-value="' + value + '" data-color=' + color + '>' +
            '<div>' +
              '<div><i style="background-color: rgba(' + _this.colors[1][index][0] + ', ' + _this.colors[1][index][1] + ', ' + _this.colors[1][index][2] + ', 0.4)">' +
              '<i style="background-color: rgba(' + _this.colors[1][index][0] + ', ' + _this.colors[1][index][1] + ', ' + _this.colors[1][index][2] + ', 1)"></i></i>' + data[index].count + '</div>' +
              '<p>' + value + '' + '</p>' +
            '</div>' +
          '</li>';
        }
      });
      chart.intervalStack().position('percent')
        .color('item', _this.colors[0])
        .label('percent', {
          offset: -40,
          // autoRotate: false,
          textStyle: {
            rotate: 0,
            textAlign: 'center',
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)'
          }
        }).tooltip('item*percent', function (item, percent) {
          percent = percent * 100 + '%';
          return {
            name: item,
            value: percent
          };
        }).style({
          lineWidth: 1,
          stroke: '#fff'
        });
      chart.render();
      this.charts.chart1 = chart;
    },
    setStats2 (data) {
      if (this.charts.chart2) {
        this.charts.chart2.source(data);
        this.charts.chart2.guide().clear();// 清理guide
        this.charts.chart2.repaint();
        return false;
      }
      const Shape = G2.Shape;
      /*  圆柱（圆角柱状图） */
      Shape.registerShape('interval', 'cylinder', {
        draw (cfg, group) {
          let points = cfg.points;
          // const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
          let path = [];
          path.push(['M', points[0].x, points[0].y]);
          path.push(['L', points[1].x, points[1].y]);
          path.push(['L', points[2].x, points[2].y]);
          path.push(['L', points[3].x, points[3].y]);
          path.push('Z');
          path = this.parsePath(path); // 将 0 - 1 转化为画布坐标
          let iRadius = (path[2][1] - path[1][1]) / 2;
          let iY = (path[0][2] - path[1][2]) / 2;
          if (iRadius > iY) { iRadius = iY }
          return group.addShape('rect', {
            attrs: {
              x: path[1][1], // 矩形起始点为左上角
              y: path[1][2],
              width: path[2][1] - path[1][1],
              height: path[0][2] - path[1][2],
              fill: cfg.color,
              radius: iRadius
            }
          });
        }
      });
      let _this = this;
      let temp = document.getElementById('stat_2');
      let chart = new G2.Chart({
        container: 'stat_2',
        forceFit: true,
        padding: [ 12 * 2, 12 * 3, 12 * 4.5, 12 * 6 ],
        width: G2.DomUtil.getWidth(temp),
        height: G2.DomUtil.getHeight(temp)
      });
      chart.source(data);
      chart.scale('sales', {
        tickInterval: 20
      });
      chart.legend(false);
      chart.interval()
        .position('year*sales')
        .size(20)
        .color('year', [ 'l(90) 0:#009AFF 1:#00C6FF' ])
        .shape('cylinder');
      chart.render();
      this.charts.chart2 = chart;
    },
    setStats3 (data) {
      if (this.charts.chart3) {
        this.charts.chart3.source(data);
        this.charts.chart3.guide().clear();// 清理guide
        this.charts.chart3.repaint();
        return false;
      }
      let _this = this;
      let temp = document.getElementById('stat_3');
      let chart = new G2.Chart({
        container: 'stat_3',
        forceFit: true,
        padding: [ 12 * 2, 12 * 3, 12 * 4.5, 12 * 6 ],
        width: G2.DomUtil.getWidth(temp),
        height: G2.DomUtil.getHeight(temp)
      });
      chart.source(data);
      chart.scale({
        value: {
          min: 10000
        },
        year: {
          range: [0, 1]
        }
      });
      chart.axis('value', {
        label: {
          formatter: function formatter (val) {
            return (val / 10000).toFixed(1) + 'k';
          }
        }
      });
      chart.tooltip({
        crosshairs: {
          type: 'line'
        }
      });
      chart.legend(false);
      chart.area().position('year*value')
        .opacity(1)
        // .color(['#33C8FF'])
        .color(['l(270) 0:#0785FD 1:#33C8FF'])
        .shape('smooth');
      chart.line().position('year*value')
        .color('value', ['#33C8FF'])
        .shape('smooth')
        .size(1);
      chart.render();
      this.charts.chart3 = chart;
    },
    setStats4 (data) {
      if (this.charts.chart4) {
        this.charts.chart4.source(data);
        this.charts.chart4.guide().clear();// 清理guide
        this.charts.chart4.repaint();
        return false;
      }
      let _this = this;
      // chart
      let temp = document.getElementById('stat_4');
      let chart = new G2.Chart({
        container: 'stat_4',
        forceFit: true,
        padding: [ 12 * 1, 12 * 14, 12 * 1, 12 * 1 ],
        width: G2.DomUtil.getWidth(temp),
        height: G2.DomUtil.getHeight(temp)
      });
      chart.legend({
        position: 'right',
        title: null,
        textStyle: {
          fill: '#f1f1f1', // 文本的颜色
          fontSize: 12
        },
        offsetY: 0, // -G2.DomUtil.getHeight(temp005) / 2 + 4 * intRem,
        offsetX: -11 * 11,
        // itemGap: 20, // 图例项之间的间距
        useHtml: true,
        containerTpl: '<div class="g2-legend e_stat_tb_ld4 as-trans50-t" style="position:absolute;top:20px;right:30px;width:auto;left: auto;">' +
        '<ul class="g2-legend-list" style="list-style-type:none;margin:0;padding:0;"></ul>' +
        '</div>',
        itemTpl: (value, color, checked, index) => {
          if (index > 4) {
            return value;
          }
          return '<li class="g2-legend-list-item item-' + index + ' ' + checked +
            '" data-value="' + value + '" data-color=' + color + '>' +
            '<div>' +
              '<span style="background-color: ' + color + ';"></span>' +
              '<div><p>' + data[index].value + '</p><div>' + data[index].name + '(件)</div>' +
              '</div>' +
              '<i></i>' +
            '</div>' +
          '</li>';
        }
      });
      // 通过 DataSet 计算百分比
      let dv = new View();
      dv.source(data).transform({
        type: 'percent',
        field: 'value',
        dimension: 'name',
        as: 'percent'
      });
      let outterView = chart.view();
      outterView.source(dv, {
        percent: {
          formatter: function formatter (val) {
            val = (val * 100).toFixed(2) + '%';
            return val;
          }
        }
      });
      outterView.coord('theta', {
        innerRadius: 0.8,
        radius: 0.8
      });
      outterView.intervalStack()
        .position('percent')
        .color('name', ['#bf2cfe', '#1774f2', '#228ed6'])
        .label('name')
        .tooltip('name*percent', function (item, percent) {
          percent = (percent * 100).toFixed(2) + '%';
          return {
            name: item,
            value: percent
          };
        }).select(false).style({
          lineWidth: 1,
          stroke: '#fff'
        });

      let middleView = chart.view();
      middleView.source(dv, {
        percent: {
          formatter: function formatter (val) {
            val = (val * 100).toFixed(2) + '%';
            return val;
          }
        }
      });
      middleView.coord('theta', {
        innerRadius: 0.8,
        radius: 0.65
      });
      middleView.intervalStack()
        .position('percent')
        .color('name', ['#d98ff9', '#85b3f3', '#8ac2e5'])
        // .label('name')
        .tooltip('name*percent', function (item, percent) {
          percent = (percent * 100).toFixed(2) + '%';
          return {
            name: item,
            value: percent
          };
        }).select(false).style({
          lineWidth: 1,
          stroke: '#fff'
        });

      let innerView = chart.view();
      innerView.source(dv, {
        percent: {
          formatter: function formatter (val) {
            val = (val * 100).toFixed(2) + '%';
            return val;
          }
        }
      });
      innerView.coord('theta', {
        innerRadius: 0.7,
        radius: 0.52
      });
      innerView.intervalStack()
        .position('percent')
        .color('name', ['#efd2fc', '#cee1fa', '#d0e6f4'])
        // .label('name')
        .tooltip('name*percent', function (item, percent) {
          percent = (percent * 100).toFixed(2) + '%';
          return {
            name: item,
            value: percent
          };
        }).select(false).style({
          lineWidth: 1,
          stroke: '#fff'
        });
      // render
      chart.render();
      this.charts.chart4 = chart;
    },

    // 地图
    initMap () {
      let _this = this;
      let map = new AMap.Map('drawEdge', {
        // defaultCursor: 'point',
        resizeEnable: true,
        center: mapXupuxian.center, // e.g. 溆浦县中心点
        zoom: this.zoom,
        zooms: this.zooms
      });
      map.setMapStyle('amap://styles/light');
      this.amap = map;
    },
    setMapStatus (status) {
      if (this.amap) {
        if (status === '1') {
          this.amap.setZoomAndCenter(this.zoom, mapXupuxian.center);
        } else if (status === '2') {
          let iZoom = this.amap.getZoom() + 1;
          if (iZoom <= this.zooms[1]) {
            this.amap.setZoom(iZoom);
          }
        } else if (status === '3') {
          let iZoom = this.amap.getZoom() - 1;
          if (iZoom >= this.zooms[0]) {
            this.amap.setZoom(iZoom);
          }
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .e_stat_bd {
    padding: 20px;
  }
  .e_stat_s {
    padding: 20px 0 0 20px;
    margin: 0 20px 0 20px;
    background-color: #fff;
  }
  .e_stat_content {
    overflow: hidden;
  }
  .e_stat_zt {
    padding: 10px 10px 0 10px;
    overflow: hidden;
    > li {
      width: 25%;
      float: left;
      padding: 10px;
      > div {
        position: relative;
        background-color: #fff;
        padding-right: 10px;
        > span {
          display: block;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 100% 100%;
          width: 30px; height: 30px;
          position: absolute; top: 50%; left: 10px;
          margin-top: -15px;
        }
        > div {
          background-repeat: no-repeat;
          background-position: right center;
          padding-left: 50px;
          background-size: auto 40%;
          height: 55px;
          > h3 {
            padding-top: 12px;
            font-size: 16px; color: #666;
          }
          > p {
            font-size: 12px; color: #999;
          }
        }
      }
      &:nth-child(1) > div {
        > span { background-image: url(../../../../assets/img/stat/stat-011.png); }
        > div { background-image: url(../../../../assets/img/stat/stat-001.png); }
      }
      &:nth-child(2) > div {
        > span { background-image: url(../../../../assets/img/stat/stat-012.png); }
        > div { background-image: url(../../../../assets/img/stat/stat-002.png); }
      }
      &:nth-child(3) > div {
        > span { background-image: url(../../../../assets/img/stat/stat-013.png); }
        > div { background-image: url(../../../../assets/img/stat/stat-003.png); }
      }
      &:nth-child(4) > div {
        > span { background-image: url(../../../../assets/img/stat/stat-014.png); }
        > div { background-image: url(../../../../assets/img/stat/stat-004.png); }
      }
    }
  }
  .e_stat_tt {
    padding: 0 10px 0 10px;
    overflow: hidden;
    > li {
      width: 50%;
      float: left;
      padding: 10px;
      > div {
        padding: 20px 0 10px 0;
        background-color: #fff;
      }
    }
  }
  .e_stat_map {
    padding: 10px 20px 20px 20px;
    > .stat_map_c {
      position: relative;
      width: 100%; height: 1000px;
      background-color: #fff;
      > .stat_map_cl {
        width: 300px; height: 100%;
        background-color: #fff;
        float: left;
        padding-top: 20px;
        border: 1px solid #E9F7FF;
        border-left: 0;
      }
      > .stat_map_cr {
        margin-left: 300px;
        height: 100%;
        border: 1px solid #ddd;
      }
    }
  }
  .stat_title {
    border-left: 3px solid #0785FD;
    color: #0785FD; font-weight: bold;
    padding: 0 0 0 10px;
  }
  .stat_map_cl_ul {
    padding-top: 20px;
    > li {
      position: relative;
      border-top: 1px solid #E9F7FF;
      border-bottom: 1px solid #E9F7FF;
      height: 80px;
      background-image: url(../../../../assets/img/stat/stat_031.png);
      background-repeat: no-repeat;
      background-position: -10px center;
      background-size: auto 120%;
      color: #00A2FF;
      > span {
        position: absolute; top: 30px; left: 20px;
        width: 20px; height: 20px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        background-image: url(../../../../assets/img/stat/stat-041.png);
      }
      > h5 {
        padding: 30px 0 0 45px;
      }
      > div {
        position: absolute; top: 30px; right: 20px;
        color: #666; font-size: 12px;
        > span {
          font-weight: bold;
          font-size: 20px;
        }
      }
      &:nth-child(2) {
        color: #0F70C4;
        background-position: -22px center;
        > span { background-image: url(../../../../assets/img/stat/stat-043.png); }
      }
      &:nth-child(3) {
        color: #0054FE;
        background-position: -34px center;
        > span { background-image: url(../../../../assets/img/stat/stat-042.png); }
      }
      &:nth-child(4) {
        color: #4E2DF6;
        background-position: -46px center;
        > span { background-image: url(../../../../assets/img/stat/stat-044.png); }
      }
      &:nth-child(5) {
        color: #BF2CFE;
        background-position: -58px center;
        > span { background-image: url(../../../../assets/img/stat/stat-045.png); }
      }
    }
  }
  .stat_tt_item {
    position: relative;
  }

  .de-close-btn {
    position: absolute; top: 10px; right: 10px; z-index:11;
    > span {
      float: left;
      display: inline-block;
      background-color: #f7f7f7;
      border: 1px solid #D3D3D3;
      background-repeat: no-repeat;
      background-position: center center;
      -webkit-background-size: 60% 60%;
      background-size: 60% 60%;
      width: 40px; height: 40px;
      cursor: pointer;
    }
    > .de-btn-r {
      background-image: url(../../../../assets/img/icons/draw/de-010.png);
      border-radius: 8px;
      margin-right: 12px;
    }
    > .de-btn-fd {
      background-image: url(../../../../assets/img/icons/draw/de-011.png);
      border-radius: 8px 0 0 8px;
      &.de-btn-dis {
        background-image: url(../../../../assets/img/icons/draw/de-011d.png);
        cursor: default;
      }
    }
    > .de-btn-sx {
      background-image: url(../../../../assets/img/icons/draw/de-012.png);
      border-left: 0;
      border-radius: 0 8px 8px 0;
      &.de-btn-dis {
        background-image: url(../../../../assets/img/icons/draw/de-012d.png);
        cursor: default;
      }
    }
  }
</style>
