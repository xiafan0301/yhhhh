<!-- 图表plate temp_031 for 社会民生 文化教育  -->
<template>
  <div class="vis-temp-main" style="position: relative;">
    <div class="vis-cou-title">
      <h2>{{oData.plateName}}</h2>
    </div>
    <div class="vis-cou-content" style="overflow: hidden;position: relative;">
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 3rem; padding-top: 1rem; text-align: center; color: #fff;">
        <span style="display: inline-block;">
          <span style="display: inline-block; width: 1rem; height: 1rem; background-color: #02befe;"></span>
          教师</span>
        <span style="display: inline-block; margin-left: 2rem;">
          <span style="display: inline-block; width: 1rem; height: 1rem; background-color: #1775f3;"></span>
          学生</span>
      </div>
      <div style="padding-top: 3rem; height: 100%;overflow: hidden; position: relative;">
        <div style="width: 50%; float: left; height: 100%;">
          <div style="height: 100%; width: 100%;"  id="vis_temp_0311"></div>
        </div>
        <div style="float: left; width: 50%; height: 100%; position: relative;">
          <div style="height: 100%; width: 100%;"  id="vis_temp_0312"></div>
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
      { item: '特殊教育', count: 532, count2: 6500, inc: -1.2, progress: 90 },
      { item: '职业中专', count: 144, count2: 2000, inc: -1.2, progress: 90 },
      { item: '中学', count: 322, count2: 5000, inc: 1.2, progress: 95 },
      { item: '小学', count: 213, count2: 3000, inc: 1.2, progress: 85 }
    ];
    this.theLeftReport(data);
    this.theRightReport(data);
  },
  methods: {
    theRightReport (data) {
      let temp0312 = document.getElementById('vis_temp_0312');
      const chart = new G2.Chart({
        container: 'vis_temp_0312',
        forceFit: true,
        padding: [ 0 * intRem, 1 * intRem, 3 * intRem, 0 ],
        width: G2.DomUtil.getWidth(temp0312),
        height: G2.DomUtil.getHeight(temp0312)
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
        .color('item', ['#1775f3'])
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
      let temp0311 = document.getElementById('vis_temp_0311');
      const chart = new G2.Chart({
        container: 'vis_temp_0311',
        forceFit: true,
        padding: [ 0 * intRem, 0, 3 * intRem, 6 * intRem ],
        width: G2.DomUtil.getWidth(temp0311),
        height: G2.DomUtil.getHeight(temp0311)
      });
      chart.source(data, {
        count: {
          min: 0,
          tickCount: 5
        }
      });
      // axis 坐标轴配置
      chart.axis('item', {
        position: 'top',
        line: {
          stroke: '#021E45', // 坐标轴线的颜色
          strokeOpacity: 1, // 坐标轴线的透明度，数值范围为 0 - 1
          lineDash: [4, 0], // 设置虚线的样式，如 [2, 3]第一个用来表示实线的像素，第二个用来表示空白的像素。如果提供了奇数个值，则这个值的数列重复一次，从而变成偶数个值
          lineWidth: 1 // 设置坐标轴线的粗细
        },
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
        .color('item', ['#02befe'])
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
