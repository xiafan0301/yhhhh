<!-- 图表plate temp_008 for 脱贫攻坚 > 贫困类型  -->
<template>
  <div class="vis-temp-main" style="position: relative;">
    <div class="vis-cou-title">
      <h2>{{oData.plateName}}</h2>
    </div>
    <div class="vis-cou-content clearfix" style="color: #fff; padding: 1rem;">
      <div class="vis-p052-l" id="vis_temp_052">
      </div>
      <div  class="vis-p052-r">
        <h3 style="color: #999; ">生产总值(亿元)<span style="color:#fff; font-size: 1.6rem; display: inline-block; padding: 0 .5rem;">61.59</span><span class="vis-plate-up"><i>&nbsp;</i>6.4%</span></h3>
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
      colors: ['#fa9624', '#e53695', '#0663e4']
    }
  },
  created () {
  },
  mounted () {
    let data = [
      {name: '农业', cnt: 22.85, unit: '亿元', inc: 6.4},
      {name: '林业', cnt: 47.22, unit: '亿元', inc: 6.4},
      {name: '畜牧业', cnt: 32.56, unit: '亿元', inc: 6.4},
      {name: '渔业', cnt: 1.73, unit: '亿元', inc: 6.4},
      {name: '农业服务业', cnt: 0.03, unit: '亿元', inc: 6.4}
    ];
    for (let i = 0; i < data.length; i++) {
      data[i].cnt2 = data[i].cnt;
    }
    this.theReport(data);
  },
  methods: {
    theReport (data) {
      let dv = new View().source(data);
      dv.transform({
        type: 'percent',
        field: 'cnt2',
        dimension: 'name',
        as: 'percent'
      });
      let temp052 = document.getElementById('vis_temp_052');
      const chart = new G2.Chart({
        container: 'vis_temp_052',
        forceFit: true,
        padding: [ 1 * intRem, 1 * intRem, intRem, intRem ],
        width: G2.DomUtil.getWidth(temp052),
        height: G2.DomUtil.getHeight(temp052)
      });
      chart.source(dv, {
        percent: {
          formatter: function formatter (val) {
            val = (val * 100).toFixed(2) + '%';
            return val;
          }
        }
      });
      chart.coord('theta', {
        radius: 0.75,
        innerRadius: 0.70
      });
      chart.legend({
        title: null,
        // marker: 'line',
        position: 'right',
        offsetY: 0.5 * intRem,
        offsetX: 0,
        useHtml: true,
        /* containerTpl: '<div class="g2-legend" style="position:absolute;top:20px;right:60px;width: 10rem;">' +
         '<ul class="g2-legend-list" style="list-style-type:none;margin:0;padding:0;"></ul>' +
         '</div>', */
        itemTpl: (value, color, checked, index) => {
          const obj = dv.rows[index];
          checked = checked ? 'checked' : 'unChecked';
          return '<li class="g2-legend-list-item item-' + index + ' ' + checked +
            '" data-value="' + value + '" data-color=' + color + ' style="cursor: pointer;word-break:keep-all; white-space:nowrap; text-align: left;">' +
            '<i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;background-color:' + color + ';"></i>' +
            '<span class="g2-legend-text" style="color: #fff;">' + value + '：' + obj.cnt + '人</span>' +
            '<span class="vis-plate-up" style="display:inline-block; padding-left: 5px;"><i style="top: 4px;">&nbsp;</i>6.4%</span>' +
            '</li>';
        }
      });
      chart.axis(false);
      chart.intervalStack()
        .position('cnt')
        .color('name', ['#7B87FC', '#1774F2', '#02CCE6', '#FA9623', '#FB2B9C', '#830dff', '#3cbf4f'])
        .label('percent', {
          offset: 4 * intRem, // 设置坐标轴文本 label 距离坐标轴线的距离
          textStyle: {
            textAlign: 'center', // 文本对齐方向，可取值为： start middle end
            fill: '#fff', // 文本的颜色
            fontSize: intRem, // 文本大小
            // rotate: 30,
            textBaseline: 'middle' // 文本基准线，可取 top middle bottom，默认为middle
          }, // 支持回调
          autoRotate: false, // 是否需要自动旋转，默认为 true
          htmlTemplate: (text, item, index) => {
            const point = item.point; // 每个弧度对应的点
            let percent = point['percent'];
            percent = (percent * 100).toFixed(0) + '%';
            return '<span style="display: inline-block; color:' + point.color + '; padding: .2rem .5rem;word-break:keep-all; white-space:nowrap;">' + dv.rows[index].name + '</span>' +
              '<span style="display: inline-block; color:' + point.color + '; padding: .2rem .5rem;">' + percent + '</span>'; // 自定义 html 模板
          }
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
  .vis-p052-l {
    width: 60%; height: 100%; float: left;
    background: url(../../assets/img/plate/p055-01.png) center center no-repeat;
    -webkit-background-size: auto 100%;
    background-size: auto 100%;
    text-align: center;
  }
  .vis-p052-r {
    width: 40%; height: 100%; float: left;
    position: relative;
    > h3 {
      position: absolute; top: 0; left: 0;
      word-break:keep-all; white-space:nowrap;
    }
  }
</style>
