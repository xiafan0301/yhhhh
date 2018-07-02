<!-- 图表plate temp_008 for 脱贫攻坚 > 贫困类型  -->
<template>
  <div class="vis-temp-main" style="position: relative;">
    <div class="vis-cou-title">
      <h2>{{oData.plateName}}</h2>
    </div>
    <div class="vis-cou-content" style="overflow: hidden;">
      <div style="float: left; width: 60%; height: 100%;" id="vis_temp_0081">
      </div>
      <div style="float: left; width: 40%; height: 100%;" id="vis_temp_0082">b</div>
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
      colors: ['#fa9624', '#e53695', '#0663e4']
    }
  },
  created () {
  },
  mounted () {
    let data = [
      { item: '一般户', count: 1040, inc: 1.2 },
      { item: '低保户', count: 520, inc: 1.2 },
      { item: '五保户', count: 1040, inc: -1.2 }
    ];
    this.leftReport(data);
    this.rightReport(data);
  },
  methods: {
    leftReport (data) {
      let temp0081 = document.getElementById('vis_temp_0081');
      const chart = new G2.Chart({
        container: 'vis_temp_0081',
        forceFit: true,
        padding: [ 4 * intRem, intRem, 4 * intRem, 5 * intRem ],
        width: G2.DomUtil.getWidth(temp0081),
        height: G2.DomUtil.getHeight(temp0081)
      });
      chart.source(data);
      // axis 坐标轴配置
      chart.axis('count', {
        line: null,
        label: {
          textStyle: {
            fill: '#999', // 文本的颜色
            fontSize: intRem // 文本大小
          },
          formatter (text, item, index) {
            return text + '户';
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
      chart.legend({
        position: 'top', // 设置图例的显示位置
        offsetX: intRem,
        offsetY: -intRem,
        textStyle: {fill: '#fff'},
        itemGap: 2 * intRem // 图例项之间的间距
      });
      chart.tooltip({
        showTitle: false,
        itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      });
      chart.interval()
        .position('item*count')
        .color('item', this.colors)
        .label('count', {
          offset: intRem,
          textStyle: {
            fill: '#fff'
          },
          htmlTemplate (text, item, index) {
            let sClass = 'up';
            if (item.point.inc < 0) {
              sClass = 'down';
            }
            return '<div style="word-break:keep-all; white-space:nowrap; color: #fff; padding-left: 1rem;">' + text +
              '<span class="vis-jjfz-ud vis-jjfz-' + sClass + '">' +
                '<i class="el-icon-arrow-' + sClass + '"></i>' + item.point.inc + '%' +
              '</span></div>';
          }
        })
        .tooltip('item*count', function (name, count) {
          return {
            name: name,
            value: count
          };
        });
      // .shape('name', [ 'rect', 'hollowRect', 'line', 'tick' ]); // 指定形状;
      chart.render();
    },
    rightReport (data) {
      let dv = new View();
      dv.source(data).transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent'
      });
      let temp0082 = document.getElementById('vis_temp_0082');
      const chart = new G2.Chart({
        container: 'vis_temp_0082',
        forceFit: true,
        padding: [ 0, 2 * intRem, 3 * intRem, intRem ],
        width: G2.DomUtil.getWidth(temp0082),
        height: G2.DomUtil.getHeight(temp0082)
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
        radius: 1, // 设置半径，值范围为 0 至 1
        innerRadius: 0.6 // 空心圆的半径，值范围为 0 至 1
      });
      chart.tooltip({
        showTitle: false,
        itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      });
      chart.intervalStack()
        .position('percent')
        .color('item', this.colors)
        .tooltip('item*percent', function (item, percent) {
          percent = Math.round(percent * 100) + '%';
          return {
            name: item,
            value: percent
          };
        })
        .label('percent', {
          offset: -2 * intRem, // 设置坐标轴文本 label 距离坐标轴线的距离
          textStyle: {
            textAlign: 'center', // 文本对齐方向，可取值为： start middle end
            fill: '#fff', // 文本的颜色
            fontSize: intRem, // 文本大小
            // fontWeight: 'bold', // 文本粗细
            rotate: 0,
            textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
          },
          autoRotate: true // 是否需要自动旋转，默认为 true
          // formatter: {function}, // 回调函数，用于格式化坐标轴上显示的文本信息
          // htmlTemplate: {function}, // 使用 html 自定义 label
        })
        .style({
          lineWidth: 0,
          stroke: '#fff'
        });
      chart.render();
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
