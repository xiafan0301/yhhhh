<!-- 图表plate temp_007 for 脱贫攻坚 贫困人口概述  -->
<template>
  <div class="vis-temp-main" style="position: relative;">
    <div class="vis-cou-title">
      <h2>{{oData.plateName}}</h2>
    </div>
    <div class="vis-cou-content" style="position: relative;">
      <div style="height: 3rem; position: absolute; top: 0; left: 0; width: 100%; padding-left: 2rem; color: #fff; text-align: center; padding-right: 2rem;">
        <span style="display: inline-block;">
          <i style="width: 1rem; height: 1rem; display: inline-block; margin-right: 1rem;
            background-color: #0768ce;
            border-radius: 50%; vertical-align: middle;"></i>
          贫困人数
        </span>
        <span style="display: inline-block; margin-left: 2rem;">
          <i style="width: 1.4rem; height: 2px; display: inline-block; margin-right: 8px;
            background-color: #fa9623;
            border-radius: 50%; vertical-align: middle;"></i>
          脱贫进度
        </span>
      </div>
      <div style="padding-top: 3rem; height: 100%;">
        <div style="height: 100%;" id="vis_temp_012"></div>
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
      plateData: {}
    }
  },
  created () {
  },
  mounted () {
    let data = [
      { item: '2015', count: 1040, inc: 1.2, progress: 75 },
      { item: '2016', count: 520, inc: 1.2, progress: 95 },
      { item: '2017', count: 1040, inc: -1.2, progress: 90 }
    ];
    this.leftReport(data);
  },
  methods: {
    leftReport (data) {
      let temp012 = document.getElementById('vis_temp_012');
      const chart = new G2.Chart({
        container: 'vis_temp_012',
        forceFit: true,
        padding: [ 0.5 * intRem, 5 * intRem, 4 * intRem, 5 * intRem ],
        width: G2.DomUtil.getWidth(temp012),
        height: G2.DomUtil.getHeight(temp012)
      });
      chart.source(data, {
        progress: {
          min: 0,
          max: 100
        }
      });
      // axis 坐标轴配置
      chart.axis('item', {
        line: {
          stroke: '#021E45', // 坐标轴线的颜色
          strokeOpacity: 1, // 坐标轴线的透明度，数值范围为 0 - 1
          lineDash: [4, 0], // 设置虚线的样式，如 [2, 3]第一个用来表示实线的像素，第二个用来表示空白的像素。如果提供了奇数个值，则这个值的数列重复一次，从而变成偶数个值
          lineWidth: 1 // 设置坐标轴线的粗细
        },
        label: {
          textStyle: {
            fill: '#fff', // 文本的颜色
            fontSize: intRem // 文本大小
          }
        },
        tickLine: null, // 刻度线
        grid: null // 网格
      });
      chart.axis('count', {
        line: null,
        label: {
          textStyle: {
            fill: '#999', // 文本的颜色
            fontSize: intRem // 文本大小
          },
          formatter (text, item, index) {
            return text + '人';
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
      chart.axis('progress', {
        line: null,
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
      chart.legend(false);
      chart.tooltip({
        showTitle: false,
        crosshairs: {
          type: 'y'
        },
        itemTpl: '<li data-index={index} style="margin-bottom:4px;">' +
        // '<span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}<br/>' +
        '<span style="color: #fff;font-size: 1.1rem;padding-left: .8rem;margin-bottom: .3rem;">贫困人数：{count}人</span><br/>' +
        '<span style="color: #bbb;padding-left: .8rem;margin-bottom: .3rem;">脱贫进度：{progress}%</span><br/>' + '</li>'
      });
      chart.interval()
        .position('item*count')
        .color('item', ['l(90) 0:#01c1e8 1:#0b39c0'])
        .tooltip('count*progress', function (count, progress) {
          return {
            count: count,
            progress: progress
          };
        });
      chart.line().position('item*progress').color('#fa9624').size(2).shape('smooth').tooltip(false);
      chart.point().position('item*progress').color('#fa9624').shape('diamond').tooltip(false);
      // .shape('name', [ 'rect', 'hollowRect', 'line', 'tick' ]); // 指定形状;
      chart.render();
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
