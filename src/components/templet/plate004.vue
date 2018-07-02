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
      <div class="vis-cou-content-c" style="padding-top: 6rem;">
        <div class="vis-cou-content-ct" style="height: 6rem;">
          <ul style="overflow: hidden; text-align: center;">
            <li style="float: left; width: 33%;">
              <p style="height: 2rem; line-height: 2rem; overflow: hidden;">人均可支配收入（元）</p>
              <h4 style="color: #fff; font-size: 1.8rem; height: 2.2rem; line-height: 2.2rem;">4818</h4>
            </li>
            <li style="float: left; width: 33%;">
              <p style="height: 2rem; line-height: 2rem; overflow: hidden;">人均住房建筑面积（平米）</p>
              <h4 style="color: #fff; font-size: 1.8rem; height: 2.2rem; line-height: 2.2rem;">221</h4>
            </li>
            <li style="float: left; width: 33%;">
              <p style="height: 2rem; line-height: 2rem; overflow: hidden;">新农合参合人数（人）</p>
              <h4 style="color: #fff; font-size: 1.8rem; height: 2.2rem; line-height: 2.2rem;">99231</h4>
            </li>
          </ul>
          <div style="color: #999; line-height: normal; position: absolute; left: 0; bottom: 0;">新农合参合率</div>
        </div>
        <div class="vis-cou-content-cc" id="vis_temp_004"></div>
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
        { name: '2012', count: 2 },
        { name: '2013', count: 24 },
        { name: '2014', count: 30 },
        { name: '2015', count: 40 },
        { name: '2016', count: 50 },
        { name: '2017', count: 60 }
      ];
      let temp004 = document.getElementById('vis_temp_004');
      const chart = new G2.Chart({
        container: 'vis_temp_004',
        forceFit: true,
        padding: [ 2 * intRem, 0, 2 * intRem, 4 * intRem ],
        width: G2.DomUtil.getWidth(temp004),
        height: G2.DomUtil.getHeight(temp004)
      });
      chart.source(data, {
        count: {
          min: 0,
          tickCount: 5
        }
      });
      chart.scale('sales', {
        tickInterval: 20
      });
      // axis 坐标轴配置
      chart.axis('count', {
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
            return text + '%';
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
      chart.tooltip({
        showTitle: false,
        // itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}参合率: {value}</li>'
        itemTpl: '<li>{name}年参合率：{value}</li>'
      });
      chart.interval()
        .position('name*count')
        .shape('cylinder')
        .color('name', [
          'l(270) 0:#0273F2 1:#0D2FB8',
          'l(270) 0:#F748AC 1:#B90858',
          'l(270) 0:#E7B813 1:#D26601',
          'l(270) 0:#01D2ED 1:#0382CF',
          'l(270) 0:#9E9E9E 1:#6D6D6D',
          'l(270) 0:#0AD13F 1:#007E22'
        ])
        .label('count', {
          offset: intRem,
          textStyle: {
            fill: '#fff'
          },
          formatter (text, item, index) {
            return text + '%';
          }
        })
        .tooltip('name*count', function (name, count) {
          count = count + '%';
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
