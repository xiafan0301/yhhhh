<!-- 图表plate temp_007 for 脱贫攻坚 贫困人口概述  -->
<template>
  <div class="vis-temp-main" style="position: relative;">
    <div class="vis-cou-title">
      <h2>{{oData.plateName}}</h2>
    </div>
    <div class="vis-cou-content" id="vis_temp_021"></div>
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
      {reason: '乡镇医院', cnt: 43},
      {reason: '卫生监督所', cnt: 1},
      {reason: '综合医院', cnt: 1},
      {reason: '妇幼保健所', cnt: 1},
      {reason: '中医医院', cnt: 1},
      {reason: '皮肤病预防所', cnt: 1},
      {reason: '疾病预防控制中心', cnt: 1}
    ];
    for (let i = 0; i < data.length; i++) {
      data[i].cnt2 = data[i].cnt;
    }
    this.theReport(data);
  },
  methods: {
    theReport (data) {
      let dv = new View().source(data);
      dv.transform({
        type: 'percent',
        field: 'cnt2',
        dimension: 'reason',
        as: 'percent'
      });
      let temp021 = document.getElementById('vis_temp_021');
      const chart = new G2.Chart({
        container: 'vis_temp_021',
        forceFit: true,
        padding: [ 2 * intRem, 9 * intRem, intRem, intRem ],
        width: G2.DomUtil.getWidth(temp021),
        height: G2.DomUtil.getHeight(temp021)
      });
      chart.source(dv, {
        percent: {
          formatter: function formatter (val) {
            val = (val * 100).toFixed(2) + '%';
            return val;
          }
        }
      });
      chart.coord('theta', {
        radius: 0.75,
        innerRadius: 0.6
      });
      chart.legend({
        title: null,
        // marker: 'line',
        position: 'right',
        // offsetY: -1 * intRem,
        offsetX: -5 * intRem,
        useHtml: true,
        /* containerTpl: '<div class="g2-legend" style="position:absolute;top:20px;right:60px;width: 10rem;">' +
          '<ul class="g2-legend-list" style="list-style-type:none;margin:0;padding:0;"></ul>' +
          '</div>', */
        itemTpl: (value, color, checked, index) => {
          const obj = dv.rows[index];
          checked = checked ? 'checked' : 'unChecked';
          return '<li class="g2-legend-list-item item-' + index + ' ' + checked +
            '" data-value="' + value + '" data-color=' + color + ' style="cursor: pointer;word-break:keep-all; white-space:nowrap;">' +
            '<i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;background-color:' + color + ';"></i>' +
            '<span class="g2-legend-text" style="color: #fff;">' + value + '：' + obj.cnt + '人</span>' +
            '</li>';
        }
      });
      chart.axis(false);
      chart.intervalStack()
        .position('cnt')
        .color('reason', ['#4d8fff', '#fa9624', '#0000fe', '#9e9e9e', '#14c2c3', '#830dff', '#3cbf4f'])
        .label('percent', {
          offset: 30, // 设置坐标轴文本 label 距离坐标轴线的距离
          textStyle: {
            textAlign: 'center', // 文本对齐方向，可取值为： start middle end
            fill: '#fff', // 文本的颜色
            fontSize: intRem, // 文本大小
            // rotate: 30,
            textBaseline: 'middle' // 文本基准线，可取 top middle bottom，默认为middle
          }, // 支持回调
          autoRotate: false, // 是否需要自动旋转，默认为 true
          htmlTemplate: (text, item, index) => {
            const point = item.point; // 每个弧度对应的点
            let percent = point['percent'];
            percent = (percent * 100).toFixed(0) + '%';
            return '<span style="display: inline-block; color:' + point.color + '; padding: .2rem .5rem;">' + percent + '</span>'; // 自定义 html 模板
          }
          // htmlTemplate: {function}, // 使用 html 自定义 label
        })
        .style({
          lineWidth: 0,
          stroke: '#fff'
        });
      chart.render();
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
