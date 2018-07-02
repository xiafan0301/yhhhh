<!-- 图表plate temp_031 for 社会民生 文化教育  -->
<template>
  <div class="vis-temp-main" style="position: relative;">
    <div class="vis-cou-title">
      <h2>{{oData.plateName}}</h2>
    </div>
    <div class="vis-cou-content" id="vis_temp_032" style="position: relative;">
      <h3 style="position: absolute; left: 1rem; top: .6rem; color: #999;">金额(亿元)</h3>
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
    let data2 = [
      { name: '支出', '2012': 32, '2013': 36, '2014': 39, '2015': 42, '2016': 53, '2017': 55 },
      { name: '收入', '2012': 33, '2013': 34, '2014': 38, '2015': 44, '2016': 51, '2017': 56 }
    ];
    this.theReport(data2);
  },
  methods: {
    theReport (data) {
      var dv = new View().source(data);
      dv.transform({
        type: 'fold',
        fields: ['2012', '2013', '2014', '2015', '2016', '2017'], // 展开字段集
        key: '年份', // key字段
        value: '人数' // value字段
      });
      let temp032 = document.getElementById('vis_temp_032');
      const chart = new G2.Chart({
        container: 'vis_temp_032',
        forceFit: true,
        padding: [ 3 * intRem, 1 * intRem, 3 * intRem, 4 * intRem ],
        width: G2.DomUtil.getWidth(temp032),
        height: G2.DomUtil.getHeight(temp032)
      });
      chart.source(dv);
      chart.legend({
        position: 'top', // 设置图例的显示位置
        offsetX: intRem,
        offsetY: 0,
        textStyle: {fill: '#fff'},
        itemGap: 2 * intRem // 图例项之间的间距
      });
      chart.axis('年份', {
        line: {
          stroke: '#021E45',
          strokeOpacity: 1,
          lineDash: [4, 0],
          lineWidth: 1
        },
        label: {
          textStyle: {
            fill: '#999', // 文本的颜色
            fontSize: intRem // 文本大小
          },
          formatter (text, item, index) {
            return text + '';
          }
        },
        tickLine: null, // 刻度线
        grid: null
      });
      chart.axis('人数', {
        line: null,
        label: {
          textStyle: {
            fill: '#999', // 文本的颜色
            fontSize: intRem // 文本大小
          },
          formatter (text, item, index) {
            return text;
          }
        },
        tickLine: null, // 刻度线
        grid: { // 网格
          type: 'line', // 声明网格的类型，line 表示线，polygon 表示矩形框
          lineStyle: {
            stroke: '#021E45', // 网格线的颜色
            lineWidth: 1, // 网格线的粗细
            lineDash: [4, 0] // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
          }
        }
      });
      chart.tooltip({
        showTitle: false,
        itemTpl: '<li>{name}：{value}&nbsp;亿元</li>'
      });
      chart.interval()
        .position('年份*人数')
        .shape('cylinder')
        .color('name', ['#03cce6', '#1775f3'])
        .adjust([{
          type: 'dodge',
          marginRatio: 1 / 32
        }]);
      chart.render();
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
