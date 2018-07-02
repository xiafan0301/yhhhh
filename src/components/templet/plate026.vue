<!-- 图表plate temp_007 for 脱贫攻坚 贫困人口概述  -->
<template>
  <div class="vis-temp-main" style="position: relative;">
    <div class="vis-cou-title">
      <h2>{{oData.plateName}}</h2>
    </div>
    <div class="vis-cou-content" style="position: relative;">
      <div class="vis-cou-ctt-t" style="height: 5rem">
        数量（所）
        <ul style="overflow: hidden;">
          <li style="padding: 0.5rem; float: left; width: 25%; color: #fff;">
            <div style="padding: 0.5rem 1rem; border: 1px solid #003a6c; border-radius: .4rem;">演剧院</div>
          </li>
          <li style="padding: 0.5rem; float: left; width: 25%; color: #fff;">
            <div style="padding: 0.5rem 1rem; border: 1px solid #003a6c; border-radius: .4rem;">图书馆</div>
          </li>
          <li style="padding: 0.5rem; float: left; width: 25%; color: #fff;">
            <div style="padding: 0.5rem 1rem; border: 1px solid #003a6c; border-radius: .4rem;">纪念馆</div>
          </li>
          <li style="padding: 0.5rem; float: left; width: 25%; color: #fff;">
            <div style="padding: 0.5rem 1rem; border: 1px solid #003a6c; border-radius: .4rem;">文化馆</div>
          </li>
        </ul>
      </div>
      <div class="vis-cou-ctt-c" style="padding-top: 5rem;">
        <ul style="overflow: hidden; height: 100%;">
          <li style="float: left; width: 25%; height: 100%;" id="vis_temp_026_1"></li>
          <li style="float: left; width: 25%; height: 100%;" id="vis_temp_026_2"></li>
          <li style="float: left; width: 25%; height: 100%;" id="vis_temp_026_3"></li>
          <li style="float: left; width: 25%; height: 100%;" id="vis_temp_026_4"></li>
        </ul>
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
      {
        name: '网络覆盖率',
        value: 98
      },
      {
        name: '电视覆盖率',
        value: 90
      },
      {
        name: '固话覆盖率',
        value: 70
      },
      {
        name: '4G网络覆盖率',
        value: 80
      }
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
      for (let i = 0; i < 32; i++) {
        let item = {};
        item.type = i + '';
        item.value = 10;
        data1.push(item);
      }

      let data2 = [];
      for (let _i = 0; _i < 32; _i++) {
        let _item = {};
        _item.type = _i + '';
        _item.value = 10;
        if (_i > data.value * 32 / 100) {
          _item.value = 0;
        }
        data2.push(_item);
      }

      let temp026 = document.getElementById('vis_temp_026_' + index);
      const chart = new G2.Chart({
        container: 'vis_temp_026_' + index,
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
        innerRadius: 0.75,
        radius: 0.8
      });
      view1.interval().position('type*value').color('value', '#001542').opacity(1).size(2);

      let view2 = chart.view();
      view2.source(data2);
      view2.axis(false);
      view2.coord('polar', {
        innerRadius: 0.75,
        radius: 0.8
      });
      view2.interval().position('type*value').color('value', this.colors[index - 1]).opacity(1).size(2);
      view2.guide().html({
        position: ['50%', '50%'],
        html: '<span style="color: #fff; font-size: 1.5rem;">' + data.value +
          '<span style="font-size: 1rem;">%</span></span>'
      });
      view2.guide().html({
        position: ['50%', '100%'],
        offsetY: 0.6 * intRem,
        html: '<span style="color: #999; font-size: 1rem;">' + data.name + '</span>'
      });
      chart.render();
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
