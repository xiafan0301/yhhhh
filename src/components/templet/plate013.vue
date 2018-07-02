<!-- 图表plate temp_007 for 脱贫攻坚 贫困人口概述  -->
<template>
  <div class="vis-temp-main" style="position: relative;">
    <div class="vis-cou-title">
      <h2>{{oData.plateName}}</h2>
    </div>
    <div class="vis-cou-content" id="vis_temp_009"></div>
  </div>
</template>
<script>
import G2 from '@antv/g2';
import { View } from '@antv/data-set';
import {intRem} from '@/utils/util.js';
export default {
  props: ['oData'],
  data () {
    return {
      plateData: {}
    }
  },
  created () {
  },
  mounted () {
    let data = [
      {year: '2012', ncdb: 312, yljz: 812, lsjz: 1223, csdb: 1723, wbfsjy: 2232},
      {year: '2013', ncdb: 512, yljz: 712, lsjz: 1123, csdb: 1923, wbfsjy: 2332},
      {year: '2014', ncdb: 712, yljz: 612, lsjz: 723, csdb: 423, wbfsjy: 2732},
      {year: '2015', ncdb: 512, yljz: 1212, lsjz: 1223, csdb: 1223, wbfsjy: 2232},
      {year: '2016', ncdb: 1512, yljz: 1412, lsjz: 1523, csdb: 1623, wbfsjy: 1632},
      {year: '2017', ncdb: 2312, yljz: 2212, lsjz: 2223, csdb: 2223, wbfsjy: 2232}
    ];
    for (let i = 0; i < data.length; i++) {
      let od = data[i];
      //       ncdb: { alias: '农村低保' },
      //      yljz: { alias: '医疗救助' },
      //      lsjz: { alias: '临时救助' },
      //      csdb: { alias: '城市低保' },
      //      wbfsjy: { alias: '五保分散供养' }
      od['农村低保'] = od.ncdb;
      od['医疗救助'] = od.yljz;
      od['临时救助'] = od.lsjz;
      od['城市低保'] = od.csdb;
      od['五保分散供养'] = od.wbfsjy;
      od.sum = od.ncdb + od.yljz + od.lsjz + od.csdb + od.wbfsjy;
      od.cost = od.sum - (i + 1) * 500;
    }
    this.theReport(data);
  },
  methods: {
    theReport (data) {
      let dv = new View().source(data);
      dv.transform({
        type: 'fold',
        fields: ['农村低保', '医疗救助', '临时救助', '城市低保', '五保分散供养'], // 展开字段集
        key: 'city', // key字段
        value: 'temperature' // value字段
      });
      let temp009 = document.getElementById('vis_temp_009');
      const chart = new G2.Chart({
        container: 'vis_temp_009',
        forceFit: true,
        padding: [ 4 * intRem, 0, 3 * intRem, 4.5 * intRem ],
        width: G2.DomUtil.getWidth(temp009),
        height: G2.DomUtil.getHeight(temp009)
      });
      chart.source(dv, {
        month: {
          year: [0, 1]
        }
      });
      /* chart.scale({
        ncdb: { alias: '农村低保' },
        yljz: { alias: '医疗救助' },
        lsjz: { alias: '临时救助' },
        csdb: { alias: '城市低保' },
        wbfsjy: { alias: '五保分散供养' }
      }); */
      chart.axis('temperature', {
        label: {
          textStyle: {
            fill: '#999', // 文本的颜色
            fontSize: intRem // 文本大小
          },
          formatter: function formatter (val) {
            return val + '人';
          }
        },
        grid: { // 网格
          type: 'line', // 声明网格的类型，line 表示线，polygon 表示矩形框
          lineStyle: {
            stroke: '#021E45', // 网格线的颜色
            lineWidth: 1, // 网格线的粗细
            lineDash: [4, 0] // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
          }
        }
      });
      chart.axis('year', {
        label: {
          textStyle: {
            fill: '#999', // 文本的颜色
            fontSize: intRem // 文本大小
          },
          formatter: function formatter (val) {
            return val + '年';
          }
        },
        line: {
          stroke: '#021E45', // 坐标轴线的颜色
          strokeOpacity: 1, // 坐标轴线的透明度，数值范围为 0 - 1
          lineDash: [4, 0], // 设置虚线的样式，如 [2, 3]第一个用来表示实线的像素，第二个用来表示空白的像素。如果提供了奇数个值，则这个值的数列重复一次，从而变成偶数个值
          lineWidth: 1 // 设置坐标轴线的粗细
        },
        tickLine: null,
        grid: null
      });
      chart.legend({
        marker: 'circle',
        position: 'top', // 设置图例的显示位置
        offsetX: intRem,
        offsetY: -0,
        textStyle: {fill: '#fff'},
        itemGap: 1 * intRem // 图例项之间的间距
      });
      chart.tooltip({
        showTitle: false,
        crosshairs: {
          type: 'y'
        },
        itemTpl: '<li data-index={index} style="margin-bottom:4px;">' +
        // '<span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}<br/>' +
        '<span style="color: #fff;font-size: 1.1rem;padding-left: .8rem;margin-bottom: .3rem;">总贫困人数：{sum}人，扶贫补助：{cost}万元</span><br/>' +
        '<span style="color: #bbb;padding-left: .8rem;margin-bottom: .3rem;">农村低保：{ncdb}人，扶贫补助：{ncdb}万元</span><br/>' +
        '<span style="color: #bbb;padding-left: .8rem;margin-bottom: .3rem;">医疗救助：{yljz}人，扶贫补助：{yljz}万元</span><br/>' +
        '<span style="color: #bbb;padding-left: .8rem;margin-bottom: .3rem;">临时救助：{lsjz}人，扶贫补助：{lsjz}万元</span><br/>' +
        '<span style="color: #bbb;padding-left: .8rem;margin-bottom: .3rem;">城市低保：{csdb}人，扶贫补助：{csdb}万元</span><br/>' +
        '<span style="color: #bbb;padding-left: .8rem;margin-bottom: .3rem;">五保分散供养：{wbfsjy}人，扶贫补助：{wbfsjy}万元</span><br/>' + '</li>'
      });
      chart.line().position('year*temperature').color('city').shape('smooth').tooltip(false);
      chart.point().position('year*temperature').color('city').size(4).shape('circle').style({
        stroke: '#fff',
        lineWidth: 1
        // ['ncdb', 'yljz', 'lsjz', 'csdb', 'wbfsjy'] sum cost
      }).tooltip('year*ncdb*yljz*lsjz*csdb*wbfsjy*sum*cost', function (year, ncdb, yljz, lsjz, csdb, wbfsjy, sum, cost) {
        return {
          name: year,
          ncdb: ncdb,
          yljz: yljz,
          lsjz: lsjz,
          csdb: csdb,
          wbfsjy: wbfsjy,
          sum: sum,
          cost: cost
        };
      });
      chart.render();
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
