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
    <div class="vis-cou-content" id="vis_temp_044">
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
  mounted () {
    this.laodVisCou6(); // 精准扶贫
  },
  methods: {
    // 精准扶贫
    laodVisCou6 () {
      let data = [
        { name: '2012', count: 12800 },
        { name: '2013', count: 14132 },
        { name: '2014', count: 16350 },
        { name: '2015', count: 18100 },
        { name: '2016', count: 21000 },
        { name: '2017', count: 28800 }
      ];
      let temp044 = document.getElementById('vis_temp_044');
      const chart = new G2.Chart({
        container: 'vis_temp_044',
        forceFit: true,
        padding: [ 1 * intRem, 0.5 * intRem, 3 * intRem, 4.5 * intRem ],
        width: G2.DomUtil.getWidth(temp044),
        height: G2.DomUtil.getHeight(temp044)
      });
      chart.source(data);
      chart.scale('sales', {
        tickInterval: 20
      });
      // axis 坐标轴配置
      chart.axis('count', {
        line: null,
        label: {
          textStyle: {
            fill: '#999', // 文本的颜色
            fontSize: intRem // 文本大小
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
      chart.axis('name', {
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
          }
        },
        tickLine: null, // 刻度线
        grid: null // 网格
      });
      chart.tooltip({
        showTitle: false,
        // itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}参合率: {value}</li>'
        itemTpl: '<li>{name}年居民收入：{value}</li>'
      });
      chart.interval()
        .position('name*count')
        .color('name', ['#de9a0d'])
        /* .color('name', [
          'l(270) 0:#0273F2 1:#0D2FB8',
          'l(270) 0:#F748AC 1:#B90858',
          'l(270) 0:#E7B813 1:#D26601',
          'l(270) 0:#01D2ED 1:#0382CF',
          'l(270) 0:#9E9E9E 1:#6D6D6D',
          'l(270) 0:#0AD13F 1:#007E22'
        ]) */
        .label('count', {
          offset: intRem,
          textStyle: {
            fill: '#fff'
          }
        })
        .tooltip('name*count', function (name, count) {
          count = count + '元';
          return {
            name: name,
            value: count
          };
        })
        .style('name', {
          fill: function fill (name) {
            return 'p(a)https://gw.alipayobjects.com/zos/rmsportal/nASTPWDPJDMgkDRlAUmw.jpeg';
          }
        });
      // .shape('name', [ 'rect', 'hollowRect', 'line', 'tick' ]); // 指定形状;
      chart.render();
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
