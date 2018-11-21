<template>
  <div>
    <!-- 面包屑 -->
    <div class="e_stat_bd">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>事件管理</el-breadcrumb-item>
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
              <h3>2088</h3>
              <p>事件数量</p>
            </div>
          </div>
        </li>
        <li>
          <div>
            <span></span>
            <div>
              <h3>2088</h3>
              <p>处理完成</p>
            </div>
          </div>
        </li>
        <li>
          <div>
            <span></span>
            <div>
              <h3>2088</h3>
              <p>处理中</p>
            </div>
          </div>
        </li>
        <li>
          <div>
            <span></span>
            <div>
              <h3>2088</h3>
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
              <li v-for="(item) in 5" :key="item">
                <span></span>
                <h5>桥江镇</h5>
                <div><span>124</span>&nbsp;件</div>
              </li>
            </ul>
          </div>
          <div class="stat_map_cr" id="drawEdge"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import G2 from '@antv/g2';
import { View } from '@antv/data-set';
import {mapXupuxian} from '@/config/config.js';
export default {
  data () {
    return {
      searchLoading: false,
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
      }
    }
  },
  mounted () {
    this.intitReportSize();
    this.initMap();
    this.initStats();
  },
  methods: {
    intitReportSize () {
      let $list = $('.stat_tt_item');
      if ($list && $list.length > 0) {
        let iw = $list.width();
        $list.height(iw * 0.4);
      }
    },
    initStats () {
      this.setStats1(); // 统计图表1
      this.setStats2(); // 统计图表2
      this.setStats3(); // 统计图表3
      this.setStats4(); // 统计图表4
    },
    setStats1 () {
      let _this = this;
      let data = [{
        item: '事例一',
        count: 40,
        percent: 0.4
      }, {
        item: '事例二',
        count: 21,
        percent: 0.21
      }, {
        item: '事例三',
        count: 17,
        percent: 0.17
      }, {
        item: '事例四',
        count: 13,
        percent: 0.13
      }, {
        item: '事例五',
        count: 9,
        percent: 0.09
      }];
      let temp = document.getElementById('stat_1');
      let chart = new G2.Chart({
        container: 'stat_1',
        forceFit: true,
        padding: [ 12, 12 * 10, 12, 0 ],
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
        containerTpl: '<div class="g2-legend e_stat_tb_ld1" style="position:absolute;top:20px;right:60px;width:auto;">' +
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
              '<i style="background-color: rgba(' + _this.colors[1][index][0] + ', ' + _this.colors[1][index][1] + ', ' + _this.colors[1][index][2] + ', 1)"></i></i>' + value + '</div>' +
              '<p>' + '1级事件(件）' + '' + '</p>' +
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
    },
    setStats2 () {
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
      let data = [{
        year: '1951 年',
        sales: 38
      }, {
        year: '1952 年',
        sales: 52
      }, {
        year: '1956 年',
        sales: 61
      }, {
        year: '1957 年',
        sales: 145
      }, {
        year: '1958 年',
        sales: 48
      }, {
        year: '1959 年',
        sales: 38
      }, {
        year: '1960 年',
        sales: 38
      }, {
        year: '1962 年',
        sales: 38
      }];
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
    },
    setStats3 () {
      let _this = this;
      let data = [{
        year: '1991',
        value: 15468
      }, {
        year: '1992',
        value: 16100
      }, {
        year: '1993',
        value: 15900
      }, {
        year: '1994',
        value: 17409
      }, {
        year: '1995',
        value: 17000
      }, {
        year: '1996',
        value: 31056
      }, {
        year: '1997',
        value: 31982
      }, {
        year: '1998',
        value: 32040
      }, {
        year: '1999',
        value: 33233
      }];
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
    },
    setStats4 () {
      let _this = this;
      let data = [{
        value: 451,
        name: '民众互助'
      }, {
        value: 1048,
        name: '应急事件'
      }];
      // chart
      let temp = document.getElementById('stat_4');
      let chart = new G2.Chart({
        container: 'stat_4',
        forceFit: true,
        padding: [ 12 * 1, 12 * 12, 12 * 1, 12 * 1 ],
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
        containerTpl: '<div class="g2-legend e_stat_tb_ld4" style="position:absolute;top:20px;right:30px;width:auto;left: auto;">' +
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
              '<div><p>1231</p><div>应急事件(件)</div>' +
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
        .color('name', ['#bf2cfe', '#1774f2'])
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
        .color('name', ['#d98ff9', '#85b3f3'])
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
        .color('name', ['#efd2fc', '#cee1fa'])
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
    },
    searchSubmit () {
      this.searchLoading = true;
      setTimeout(() => {
        this.searchLoading = false;
      }, 2000);
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
      width: 100%; height: 600px;
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
</style>
