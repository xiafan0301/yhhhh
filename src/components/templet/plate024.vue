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
      <div class="vis-cou-ctt-t" style="height: 2rem; color: #999; padding-left: 1rem;">
        数量（所）
      </div>
      <div class="vis-cou-ctt-c" style="padding-top: 2rem;">
        <div class="vis-cou-ctt-cc" id="vis_temp_024"></div>
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
    }
  },
  mounted () {
    this.laodVisCou6(); // 精准扶贫
  },
  methods: {
    // 精准扶贫
    laodVisCou6 () {
      let data = [
        { name: '小学', count: 50 },
        { name: '初中', count: 82 },
        { name: '高中', count: 15 },
        { name: '职业中专', count: 24 },
        { name: '特殊学校', count: 5 }
      ];
      let temp024 = document.getElementById('vis_temp_024');
      const chart = new G2.Chart({
        container: 'vis_temp_024',
        forceFit: true,
        padding: [ 1 * intRem, 0, 2 * intRem, 4 * intRem ],
        width: G2.DomUtil.getWidth(temp024),
        height: G2.DomUtil.getHeight(temp024)
      });
      chart.source(data, {
        count: {
          min: 0,
          max: 100,
          tickCount: 5
        }
      });
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
          },
          formatter (text, item, index) {
            return text + '';
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
          offset: 1.2 * intRem,
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
        itemTpl: '<li>{name}：{value}所</li>'
      });
      chart.interval()
        .position('name*count')
        .color('name', [
          'l(270) 0:#0a3ac0 1:#02a0c6'
        ])
        .label('count', {
          offset: intRem,
          textStyle: {
            fill: '#fff'
          },
          formatter (text, item, index) {
            return text + '';
          }
        })
        .tooltip('name*count', function (name, count) {
          count = count + '';
          return {
            name: name,
            value: count
          };
        });
      // .shape('name', [ 'rect', 'hollowRect', 'line', 'tick' ]); // 指定形状;
      chart.render();
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
