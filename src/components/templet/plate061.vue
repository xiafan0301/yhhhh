<!-- 图表plate temp_007 for 脱贫攻坚 贫困人口概述  -->
<template>
  <div class="vis-temp-main" style="position: relative;">
    <div class="vis-cou-title">
      <h2>{{oData.plateName}}</h2>
    </div>
    <div class="vis-cou-content" style="position: relative;">
      <div style="height: 2rem; position: absolute; top: 0; left: 0; width: 100%; padding-left: 2rem; color: #fff;">贫困人数（人）</div>
      <div style="padding-top: 2rem; height: 100%;">
        <div style="height: 100%;" id="vis_temp_007"></div>
      </div>
    </div>
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
    let data = [{
      year: '2012',
      value: 15468,
      pkc: 23,
      pkh: 123
    }, {
      year: '2013',
      value: 26100,
      pkc: 23,
      pkh: 123
    }, {
      year: '1993',
      value: 15900,
      pkc: 23,
      pkh: 123
    }, {
      year: '2014',
      value: 22409,
      pkc: 23,
      pkh: 123
    }, {
      year: '2015',
      value: 27000,
      pkc: 23,
      pkh: 123
    }, {
      year: '2016',
      value: 31056,
      pkc: 23,
      pkh: 123
    }, {
      year: '2017',
      value: 31982,
      pkc: 23,
      pkh: 123
    }, {
      year: '2018',
      value: 32040,
      pkc: 23,
      pkh: 123
    }];
    let temp007 = document.getElementById('vis_temp_007');
    const chart = new G2.Chart({
      container: 'vis_temp_007',
      forceFit: true,
      padding: [ 1 * intRem, 2 * intRem, 4 * intRem, 5 * intRem ],
      width: G2.DomUtil.getWidth(temp007),
      height: G2.DomUtil.getHeight(temp007)
    });
    chart.source(data);
    chart.scale({
      value: {
        min: 10000,
        alias: '贫困人数'
      },
      pkc: {
        alias: '贫困村'
      },
      pkh: {
        alias: '贫困户'
      }
    });
    chart.axis('value', {
      label: {
        textStyle: {
          fill: '#999', // 文本的颜色
          fontSize: intRem // 文本大小
        },
        formatter: function formatter (val) {
          return (val / 10000).toFixed(1) + '万';
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
      line: {
        stroke: '#021E45', // 坐标轴线的颜色
        strokeOpacity: 1, // 坐标轴线的透明度，数值范围为 0 - 1
        lineDash: [4, 0], // 设置虚线的样式，如 [2, 3]第一个用来表示实线的像素，第二个用来表示空白的像素。如果提供了奇数个值，则这个值的数列重复一次，从而变成偶数个值
        lineWidth: 1 // 设置坐标轴线的粗细
      },
      label: {
        textStyle: {
          fill: '#999', // 文本的颜色
          fontSize: intRem // 文本大小
        }
      },
      tickLine: null, // 刻度线
      grid: null // 网格
    });
    chart.area()
      .position('year*value')
      .color(['l(270) 0:#000421 1:#188aec', 'l(270) 0:#173162 1:#23ABE7'])
      .tooltip();
    chart.tooltip({
      showTitle: false,
      crosshairs: {
        type: 'line'
      },
      itemTpl: '<li data-index={index} style="margin-bottom:4px;">' +
      // '<span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}<br/>' +
      '<span style="color: #fff;font-size: 1.1rem;padding-left: .8rem;">贫困人数：{value}</span><br/>' +
      '<span style="color: #999;padding-left: .8rem;">贫困村：{pkc}</span><br/>' +
      '<span style="color: #999;padding-left: .8rem;">贫困户：{pkh}</span><br/>' + '</li>'
    });
    /* chart.tooltip('value*pkc*pkh', {
      crosshairs: {
        type: 'line'
      },
      containerTpl: '<div class="g2-tooltip">' +
      '<div class="g2-tooltip-title" style="margin:10px 0;"></div>' +
      '<ul class="g2-tooltip-list"></ul></div>',
      itemTpl: '<li data-index={index}>' +
          '{name}: {value}' +
        '</li>'
    }); */
    chart.line()
      .position('year*value')
      .color('value', ['#23ABE7', '#23ABE7'])
      .shape('smooth')
      .tooltip('year*value*pkc*pkh', function (year, value, pkc, pkh) {
        return {
          name: year,
          value: value,
          pkc: pkc,
          pkh: pkh
        };
      })
      .size(1);
    chart.render();
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>
