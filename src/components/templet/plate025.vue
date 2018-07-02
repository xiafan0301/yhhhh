<!-- 图表plate temp_007 for 脱贫攻坚 贫困人口概述  -->
<template>
  <div class="vis-temp-main" style="position: relative;">
    <div class="vis-cou-title">
      <h2>{{oData.plateName}}</h2>
    </div>
    <div class="vis-cou-content" style="position: relative;">
      <div style="height: 100%;">
        <div style="height: 100%;">
          <ul style="height: 100%;">
            <li style="float: left; width: 25%; height: 100%;" id="vis_temp_025_1"></li>
            <li style="float: left; width: 25%; height: 100%;" id="vis_temp_025_2"></li>
            <li style="float: left; width: 25%; height: 100%;" id="vis_temp_025_3"></li>
            <li style="float: left; width: 25%; height: 100%;" id="vis_temp_025_4"></li>
          </ul>
        </div>
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
      colors: ['#27d7ea-#01a5e4', '#4294fa-#2b44ff', '#2a9cff-#963cff', '#84d476-#23bfac']
    }
  },
  created () {
  },
  mounted () {
    let data = [
      { name: '房间', value: 90, count: 2645, unit: '间' },
      { name: '监控', value: 90, count: 2645, unit: '个' },
      { name: '路灯', value: 50, count: 4145, unit: '盏' },
      { name: '井盖', value: 80, count: 1023, unit: '个' }
    ];
    for (let i = 0; i < data.length; i++) {
      this.theReport(data[i], i + 1);
    }
  },
  methods: {
    theReport (data, index) {
      // 极坐标下的柱状图
      // 构造数据
      let data1 = [];
      for (let i = 0; i < 100; i++) {
        let item = {};
        item.type = i + '';
        item.value = 10;
        data1.push(item);
      }

      let data2 = [];
      for (let _i = 0; _i < 100; _i++) {
        let _item = {};
        _item.type = _i + '';
        _item.value = 10;
        if (_i > data.value * 100 / 100) {
          _item.value = 0;
        }
        data2.push(_item);
      }

      let temp026 = document.getElementById('vis_temp_025_' + index);
      const chart = new G2.Chart({
        container: 'vis_temp_025_' + index,
        forceFit: true,
        padding: [ 0 * intRem, 0, 2 * intRem, 0 * intRem ],
        width: G2.DomUtil.getWidth(temp026),
        height: G2.DomUtil.getHeight(temp026)
      });
      chart.scale({
        type: {
          range: [0, 1]
        },
        value: {
          sync: true
        }
      });
      // chart.legend(false);
      // chart.tooltip(false);
      let view1 = chart.view();
      view1.source(data1);
      view1.axis(false);
      view1.coord('polar', {
        startAngle: -12 * Math.PI / 16, // 极坐标的起始角度，单位为弧度
        endAngle: -4 * Math.PI / 16, // 极坐标的结束角度，单位为弧度
        innerRadius: 0.6,
        radius: 0.9
      });
      view1.interval().position('type*value').color('value', '#20314f').opacity(1).size(2);

      let view2 = chart.view();
      view2.source(data2);
      view2.axis(false);
      let idx = (Math.PI / 2) * (data.value / 100);
      view2.coord('polar', {
        startAngle: -12 * Math.PI / 16, // 极坐标的起始角度，单位为弧度
        endAngle: -4 * Math.PI / 16, // endAngle: -12 * Math.PI / 16 + idx, // 极坐标的结束角度，单位为弧度
        innerRadius: 0.6,
        radius: 0.9
      });
      view2.interval().position('type*value').color('value', this.colors[index - 1]).opacity(1).size(2);
      view2.guide().html({
        position: ['50%', '70%'],
        html: '<div style="color: #fff; font-size: 1.5rem; text-align: center; transform: translate3d(50%, 0, 0);">' + data.count + '</br>' +
          '<span style="font-size: 1rem; color:#999;">' + data.name + '(' + data.unit + ')</span></div>'
      });
      chart.render();
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
