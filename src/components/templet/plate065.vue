<!-- 图表plate temp_007 for 脱贫攻坚 贫困人口概述  -->
<template>
  <div class="vis-temp-main" style="position: relative;">
    <div class="vis-cou-title">
      <h2>{{oData.plateName}}</h2>
    </div>
    <div class="vis-cou-content" style="overflow: hidden;position: relative;">
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 3rem;">
        <div style="width: 50%; float: left; padding-right: 2rem; padding-top: 1rem; color: #177ee0; text-align: right;font-weight: 600; font-size: 1.1rem;">扶贫人数（人）</div>
        <div style="width: 50%; float: left; padding-left: 2rem; padding-top: 1rem; color: #028ba1; text-align: left;font-weight: 600; font-size: 1.1rem;">投入金额（万元）</div>
      </div>
      <div style="padding-top: 3rem; height: 100%;overflow: hidden; position: relative;">
        <div style="width: 50%; float: left; height: 100%; padding-right: 2rem;">
          <div style="height: 100%; width: 100%;"  id="vis_temp_0111"></div>
        </div>
        <div style="float: left; width: 50%; height: 100%; position: relative;">
          <div style="position: absolute; left: -2rem; top: 0;
            width: 100%; width: calc(100% + 2rem); height: 100%;"  id="vis_temp_0112"></div>
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
      plateData: {}
    }
  },
  created () {
  },
  mounted () {
    let data = [
      { item: '就业帮扶', count: 1040, count2: 4000, inc: 1.2, progress: 85 },
      { item: '长夜帮扶', count: 520, count2: 3000, inc: 1.2, progress: 95 },
      { item: '社保保障', count: 1140, count2: 5000, inc: -1.2, progress: 90 },
      { item: '医保救助', count: 1340, count2: 4500, inc: -1.2, progress: 90 },
      { item: '住房改造', count: 1440, count2: 5100, inc: -1.2, progress: 90 }
    ];
    this.theLeftReport(data);
    this.theRightReport(data);
  },
  methods: {
    theRightReport (data) {
      let temp0112 = document.getElementById('vis_temp_0112');
      const chart = new G2.Chart({
        container: 'vis_temp_0112',
        forceFit: true,
        padding: [ 0 * intRem, 2 * intRem, 4 * intRem, 5 * intRem ],
        width: G2.DomUtil.getWidth(temp0112),
        height: G2.DomUtil.getHeight(temp0112)
      });
      chart.source(data, {
        count2: {
          min: 0,
          tickCount: 5
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
          offset: 1 * intRem,
          textStyle: {
            fill: '#fff', // 文本的颜色
            fontSize: intRem // 文本大小
          }
        },
        tickLine: null, // 刻度线
        grid: null // 网格
      });
      chart.axis('count2', {
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
      chart.legend(false);
      chart.tooltip({
        showTitle: false,
        crosshairs: {
          type: 'y'
        },
        itemTpl: '<li data-index={index} style="margin-bottom:4px;">' +
        // '<span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}<br/>' +
        // '<span style="color: #fff;font-size: 1.1rem;padding-left: .8rem;margin-bottom: .3rem;">贫困人数：{count}人</span><br/>' +
        '<span style="color: #fff;padding-left: .8rem;margin-bottom: .3rem;">投入金额：{count2}万元</span>' + '</li>'
      });
      chart.coord().transpose();
      chart.interval()
        .position('item*count2')
        .color('item', ['#03cce6'])
        .tooltip('count2', function (count2) {
          return {
            count2: count2
          };
        });
      // .shape('name', [ 'rect', 'hollowRect', 'line', 'tick' ]); // 指定形状;
      chart.render();
    },
    // 罚恶恶
    theLeftReport (data) {
      let temp0111 = document.getElementById('vis_temp_0111');
      const chart = new G2.Chart({
        container: 'vis_temp_0111',
        forceFit: true,
        padding: [ 0 * intRem, intRem, 4 * intRem, 2 * intRem ],
        width: G2.DomUtil.getWidth(temp0111),
        height: G2.DomUtil.getHeight(temp0111)
      });
      chart.source(data, {
        count: {
          min: 0,
          tickCount: 5
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
      chart.legend(false);
      chart.tooltip({
        showTitle: false,
        crosshairs: {
          type: 'y'
        },
        itemTpl: '<li data-index={index} style="margin-bottom:4px;">' +
        '<span style="color: #fff;padding-left: .8rem;margin-bottom: .3rem;">扶贫人数：{count}人</span>' + '</li>'
      });
      chart.coord().transpose().reflect('x');
      chart.interval()
        .position('item*count')
        .color('item', ['#1b91ff'])
        .tooltip('count', function (count) {
          return {
            count: count
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
