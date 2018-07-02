<!-- temp_001 for 柱状图  -->
<template>
  <div class="vis-temp-main">
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
    <div class="vis-cou-content">
      <div class="vis-cou-content-c" style="padding-top: 5rem;">
        <div class="vis-cou-content-ct" style="height: 5rem;">
          <ul style="overflow: hidden; text-align: center; height: 3rem;">
            <li style="float: left; width: 50%; height: 3rem; line-height: 3rem; overflow: hidden;">县长信箱<span style="color: #fff;"> 246 </span>件，处理率<span style="color: #fff; font-size: 2rem;">100%</span></li>
            <li style="float: left; width: 50%; height: 3rem; line-height: 3rem; overflow: hidden;">信访<span style="color: #fff;"> 215 </span>件，处理率<span style="color: #fff; font-size: 2rem;">100%</span></li>
          </ul>
          <div style="color: #fff; height: 2rem; line-height: 2rem; padding-left: 2rem;">政务处理总量（件）</div>
        </div>
        <div class="vis-cou-content-cc" id="vis_temp_003"></div>
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
    return {}
  },
  mounted () {
    this.laodVisCou6(); // 精准扶贫
  },
  methods: {
    // 精准扶贫
    laodVisCou6 () {
      let data = [
        { name: '2012', count: 2414, count2: 20 },
        { name: '2013', count: 1289, count2: 30 },
        { name: '2014', count: 3212, count2: 40 },
        { name: '2015', count: 2013, count2: 50 },
        { name: '2016', count: 3821, count2: 60 },
        { name: '2017', count: 4399, count2: 70 }
      ];
      let temp003 = document.getElementById('vis_temp_003');
      const chart = new G2.Chart({
        container: 'vis_temp_003',
        forceFit: true,
        padding: [ intRem, 0 * intRem, 2.4 * intRem, 4 * intRem ],
        width: G2.DomUtil.getWidth(temp003),
        height: G2.DomUtil.getHeight(temp003)
      });
      chart.source(data);
      // chart.line().position('name*70').color('#90ed7d').size(2).shape('smooth');
      chart.scale('sales', {
        tickInterval: 20
      });
      chart.tooltip({
        showTitle: false,
        itemTpl: '<li>{name}年处理量：{value}件</li>'
      });
      // axis 坐标轴配置
      chart.axis('count', {
        // line: null,
        label: {
          offset: intRem,
          textStyle: {
            fill: '#999', // 文本的颜色
            fontSize: intRem // 文本大小
          }
        },
        // tickLine: null, // 刻度线
        grid: { // 网格
          type: 'line', // 声明网格的类型，line 表示线，polygon 表示矩形框
          lineStyle: {
            stroke: '#021E45', // 网格线的颜色
            lineWidth: 1, // 网格线的粗细
            lineDash: [4, 0] // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
          }
        }
      });
      chart.axis('count2', {
        position: 'right',
        line: null,
        label: {
          offset: intRem,
          textStyle: {
            fill: '#999', // 文本的颜色
            fontSize: intRem // 文本大小
          }
        },
        tickLine: null, // 刻度线
        grid: null // 网格
      });
      chart.axis('name', {
        line: null,
        label: {
          offset: intRem,
          textStyle: {
            fill: '#999', // 文本的颜色
            fontSize: intRem // 文本大小
          }
        },
        tickLine: null, // 刻度线
        grid: null // 网格
      });
      chart.interval()
        .position('name*count')
        .color('name', [
          '#0c7bb0',
          '#205b97',
          '#0f7dba',
          '#019aff',
          '#15b5e9',
          '#0cc6c3'
        ]);
      // .shape('name', [ 'rect', 'hollowRect', 'line', 'tick' ]); // 指定形状;
      chart.render();
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
