<!-- 图表plate temp_007 for 脱贫攻坚 贫困人口概述  -->
<template>
  <div class="vis-temp-main" style="position: relative;">
    <div class="vis-cou-title">
      <h2>{{oData.plateName}}</h2>
    </div>
    <div class="vis-cou-content" style="position: relative;">
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 2rem;
        padding-left: 2rem; color: #fff;">单位(件)</div>
      <div style="padding-top: 2rem; height: 100%;">
        <div style="height: 100%;" id="vis_temp_033"></div>
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
      plateData: {},
      colors: ['#23D0FF', '#F8BD0D']
    }
  },
  created () {
  },
  mounted () {
    let data = [
      {name: '一季度', '信访办': 96, '县长信箱': 241},
      {name: '二季度', '信访办': 286, '县长信箱': 321},
      {name: '三季度', '信访办': 186, '县长信箱': 251},
      {name: '四季度', '信访办': 226, '县长信箱': 351}
    ];
    let dv = new View().source(data);
    dv.transform({
      type: 'fold',
      fields: ['信访办', '县长信箱'], // 展开字段集
      key: 'type', // key字段
      value: 'value', // value字段
      retains: ['name', '信访办', '县长信箱'] // 保留字段集，默认为除 fields 以外的所有字段
    });
    let temp033 = document.getElementById('vis_temp_033');
    const chart = new G2.Chart({
      container: 'vis_temp_033',
      forceFit: true,
      padding: [ 1 * intRem, 2 * intRem, 4 * intRem, 5 * intRem ],
      width: G2.DomUtil.getWidth(temp033),
      height: G2.DomUtil.getHeight(temp033)
    });
    chart.source(dv, {
      name: {
        range: [0, 1]
      },
      value: {
        min: 0,
        tickCount: 5
      }
    });
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.axis('value', {
      label: {
        textStyle: {
          fill: '#999', // 文本的颜色
          fontSize: intRem // 文本大小
        },
        formatter: function formatter (val) {
          return val + '';
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
    chart.axis('name', {
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
    chart.tooltip({
      showTitle: false,
      containerTpl: '<div class="g2-tooltip">' +
        '<ul class="g2-tooltip-list" style="height:3rem;overflow: hidden; margin-bottom: 1rem;"></ul></div>',
      itemTpl: '<li style="margin:0; height:1.5rem; line-height:1.5rem;">{name}：{value}件</li>'
    });
    chart.legend({
      title: null,
      // marker: 'line',
      position: 'top',
      offsetY: -0.5 * intRem,
      offsetX: 3 * intRem,
      useHtml: true,
      itemTpl: (value, color, checked, index) => {
        const obj = dv.rows[index];
        let _rows = dv.rows, _sum = 0;
        for (let i = 0; i < _rows.length; i++) {
          _sum += _rows[i][value];
        }
        checked = checked ? 'checked' : 'unChecked';
        return '<li class="g2-legend-list-item item-' + index + ' ' + checked +
          '" data-value="' + value + '" data-color=' + color + ' style="cursor: pointer;word-break:keep-all; white-space:nowrap;">' +
          '<i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;background-color:' + this.colors[index] + ';"></i>' +
          '<span class="g2-legend-text" style="color: #fff;">' + value + '(件)：<span style="font-size:1.2rem;">' + _sum + '</span></span>' +
          '</li>';
      }
    });
    chart.area()
      .position('name*value')
      .shape('smooth')
      .color('type', ['l(270) 0:#000000 1:#23D0FF', 'l(270) 0:#000000 1:#F8BD0D']);
    chart.line()
      .position('name*value')
      .shape('smooth')
      .color('type', ['#23D0FF', '#F8BD0D'])
      // .color('type')
      .size(1);
    chart.render();
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>
