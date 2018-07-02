<!-- 图表plate temp_031 for 社会民生 文化教育  -->
<template>
  <div class="vis-temp-main" style="position: relative;">
    <div class="vis-cou-title">
      <h2>{{oData.plateName}}</h2>
    </div>
    <div class="vis-cou-content" id="vis_temp_042">
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
      { name: '高中生', '2015': 2312, '2016': 2642, '2017': 3390 },
      { name: '中职生', '2015': 2112, '2016': 2442, '2017': 3190 },
      { name: '贫困寄宿生', '2015': 1112, '2016': 942, '2017': 890 },
      { name: '贫困幼儿', '2015': 2012, '2016': 1642, '2017': 1390 }
    ];
    this.theReport(data2);
  },
  methods: {
    theReport (data) {
      var dv = new View().source(data);
      dv.transform({
        type: 'fold',
        fields: ['2015', '2016', '2017'], // 展开字段集
        key: '年份', // key字段
        value: '人数' // value字段
      });
      let temp042 = document.getElementById('vis_temp_042');
      const chart = new G2.Chart({
        container: 'vis_temp_042',
        forceFit: true,
        padding: [ 3 * intRem, 1 * intRem, 3 * intRem, 4 * intRem ],
        width: G2.DomUtil.getWidth(temp042),
        height: G2.DomUtil.getHeight(temp042)
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
      chart.interval()
        .position('年份*人数')
        .shape('cylinder')
        .color('name', ['#7c87fd', '#03cce6', '#1775f3', '#ad1aee'])
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
