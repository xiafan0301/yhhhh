<!-- 图表plate temp_031 for 社会民生 文化教育  -->
<template>
  <div class="vis-temp-main" style="position: relative;">
    <div class="vis-cou-title">
      <h2>{{oData.plateName}}</h2>
    </div>
    <div class="vis-cou-content" id="vis_temp_045">
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
    let data = [
      {name: '新农合', count: 25},
      {name: '城镇社保', count: 41}
    ];
    this.theReport(data);
  },
  methods: {
    theReport (data) {
      let temp045 = document.getElementById('vis_temp_045');
      const chart = new G2.Chart({
        container: 'vis_temp_045',
        forceFit: true,
        padding: [2 * intRem, intRem, 2 * intRem, 10 * intRem],
        width: G2.DomUtil.getWidth(temp045),
        height: G2.DomUtil.getHeight(temp045)
      });
      chart.source(data, {
        count: {
          min: 0,
          max: 100
        }
      });
      chart.tooltip({
        showTitle: false,
        itemTpl: '<li>{name}：{value}</li>'
      });
      chart.axis('name', {
        line: null,
        tickLine: null, // 刻度线
        label: {
          offset: 7 * intRem,
          htmlTemplate (text, item, index) {
            return '<div>' +
              '<h3 style="color:#fff;word-break:keep-all; white-space:nowrap; text-align:center; font-size: 2rem;">' + data[index].count + '%</h3>' +
              '<p style="color:#999;word-break:keep-all; white-space:nowrap;">参与' + text + '</p>' +
              '</div>';
          },
          textStyle: {
            fill: '#999', // 文本的颜色
            fontSize: intRem // 文本大小
          }
        }
      });
      chart.axis('count', false);
      chart.coord().transpose();
      // .shape('square')
      chart.legend(false);
      chart.interval()
        .position('name*count')
        .color('name', ['l(0) 0:#0668e7 1:#02c7fe', 'l(0) 0:#a332fe 1:#289eff'])
        .tooltip('name*count', function (name, count) {
          return {
            name: name,
            value: count
          };
        });
      chart.render();
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
