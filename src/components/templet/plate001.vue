<!-- 图表plate temp_001 for 脱贫攻坚、 （环状图）  -->
<template>
  <div class="vis-temp-main" style="position: relative;">
    <div class="vis-cou-title">
      <h2>
        <template v-if="oData.jumpPageId">
          <router-link target="_blank" :to="{ name: 'vis-page', params: { 'pageId': oData.jumpPageId}}">
            {{oData.plateName}}
          </router-link>
        </template>
        <template v-else>
          {{oData.plateName}}
        </template>
      </h2>
    </div>
    <div class="vis-cou-content" id="vis_temp_001"></div>
    <div class="vis-tp1-f vis-tp1-f1">
      <h3>贫困户籍（万户）</h3>
      <div>25.16</div>
    </div>
    <div class="vis-tp1-f vis-tp1-f2">
      <h3>脱贫投入（人）</h3>
      <div>32516</div>
    </div>
    <div class="vis-tp1-f vis-tp1-f3">
      <h3>脱贫人数（人）</h3>
      <div>32516</div>
    </div>
    <div class="vis-tp1-f vis-tp1-f4">
      <h3>贫困人员（万人）</h3>
      <div>32516</div>
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
    }
  },
  created () {
    console.log('this.oData', this.oData);
  },
  mounted () {
    let data = [
      { item: '贫困人数', count: 42332 },
      { item: '脱贫人数', count: 123123 }
    ];
    let dv = new View();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent'
    });
    let temp001 = document.getElementById('vis_temp_001');
    const chart = new G2.Chart({
      container: 'vis_temp_001',
      forceFit: true,
      padding: [ 0, 4 * intRem, 0, 4 * intRem ],
      width: G2.DomUtil.getWidth(temp001),
      height: G2.DomUtil.getHeight(temp001)
    });
    chart.source(dv, {
      percent: {
        formatter: function formatter (val) {
          val = Math.round(val * 100) + '%';
          return val;
        }
      }
    });
    chart.coord('theta', {
      radius: 0.75, // 设置半径，值范围为 0 至 1
      innerRadius: 0.6 // 空心圆的半径，值范围为 0 至 1
    });
    chart.tooltip({
      showTitle: false,
      itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
    });
    // 辅助文本
    chart.guide().html({
      position: ['50%', '50%'],
      html: '<div style="color:#05BCFF;font-size: ' + 1 * intRem + 'px;text-align: center;width: 10rem;">完成<br><span style="font-size: ' + 2 * intRem + 'px">80%</span></div>',
      alignX: 'middle',
      alignY: 'middle'
    });
    chart.intervalStack()
      .position('percent')
      .color('item', ['#333029', 'l(180) 0:#00C0FF 1:#BF19FF'])
      .tooltip('item*percent', function (item, percent) {
        percent = Math.round(percent * 100) + '%';
        return {
          name: item,
          value: percent
        };
      })
      .style({
        lineWidth: 0,
        stroke: '#fff'
      });
    chart.render();
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
  .vis-tp1-f {
    position: absolute;
    color: #fff;
    border: 1px solid #053e77;
    border-radius: 4px;
    background-color: #022344;
    padding: 1rem 0;
    width: 10rem;
    text-align: center;
    > h3 {
      color: #999;
      padding-bottom: .5rem;
    }
    > div {
      font-size: 1.6rem;
    }
  }
  .vis-tp1-f1 {
    top: 4rem; left: 1rem;
  }
  .vis-tp1-f2 {
    top: 4rem; right: 1rem;
  }
  .vis-tp1-f3 {
    bottom: 1rem; left: 1rem;
  }
  .vis-tp1-f4 {
    bottom: 1rem; right: 1rem;
    > h3 {
      color: #05BCFF;
    }
    > div {
      color: #05BCFF;
    }
  }
</style>
