<!-- 图表plate temp_007 for 脱贫攻坚 贫困人口概述  -->
<template>
  <div class="vis-temp-main" style="position: relative;">
    <div class="vis-cou-title">
      <h2>{{oData.plateName}}</h2>
    </div>
    <div class="vis-cou-content" id="vis_temp_034"></div>
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
      {reason: '1年以内', cnt: 30},
      {reason: '1-5年', cnt: 72},
      {reason: '5-10年', cnt: 98},
      {reason: '11-15年', cnt: 102},
      {reason: '16-20', cnt: 13},
      {reason: '20年以上', cnt: 45}
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
      let temp034 = document.getElementById('vis_temp_034');
      const chart = new G2.Chart({
        container: 'vis_temp_034',
        forceFit: true,
        padding: [ intRem, 8 * intRem, intRem, intRem ],
        width: G2.DomUtil.getWidth(temp034),
        height: G2.DomUtil.getHeight(temp034)
      });
      chart.source(dv, {
        percent: {
          formatter: function formatter (val) {
            val = (val * 100).toFixed(2) + '%';
            return val;
          }
        }
      });
      chart.coord('polar', {
        innerRadius: 0.2
      });
      chart.legend({
        title: null,
        // marker: 'line',
        position: 'right',
        offsetY: -1 * intRem,
        offsetX: -4 * intRem,
        useHtml: true,
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
      chart.interval()
        .position('reason*percent')
        .color('reason', ['#9e9e9e', '#f5349d', '#0ad03f', '#967bfc', '#fa9624', '#4d8fff'])
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
            percent = (percent * 100).toFixed(2) + '%';
            return '<span class="title" style="display: inline-block;width: 50px;text-align: left;color:' + point.color + '; padding: .2rem .5rem;word-break:keep-all; white-space:nowrap;">' + point.reason + '</span><br>' +
              '<span style="display: inline-block; color:' + point.color + '; background-color: #001441; padding: .2rem .5rem;">' + percent + '</span>'; // 自定义 html 模板
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
