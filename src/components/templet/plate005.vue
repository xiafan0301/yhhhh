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
    <div class="vis-cou-content" id="vis_temp_005">
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
    console.log('this.oData', this.oData);
  },
  mounted () {
    let data = [
      { item: '第一产业', count: 73.12, inc: 3.4, unit: '亿元' },
      { item: '第二产业', count: 86.25, inc: -1.2, unit: '亿元' },
      { item: '第三产业', count: 94.31, inc: 6.4, unit: '亿元' }
    ];
    let dv = new View();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent'
    });
    let temp005 = document.getElementById('vis_temp_005');
    const chart = new G2.Chart({
      container: 'vis_temp_005',
      // forceFit: true,
      padding: [ intRem, intRem, intRem, intRem ],
      width: (G2.DomUtil.getWidth(temp005) - 11 * intRem),
      height: G2.DomUtil.getHeight(temp005)
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
      html: '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">GDP<br>' +
        '<span style="color:#fff;font-size:20px">123123</span><br>' +
        '<span class="vis-jjfz-ud vis-plate-up"><i></i>&nbsp;' + 6.5 + '%</span>' +
      '</div>',
      alignX: 'middle',
      alignY: 'middle'
    });
    chart.legend({
      position: 'right',
      title: null,
      textStyle: {
        fill: '#f1f1f1', // 文本的颜色
        fontSize: intRem
      },
      offsetY: 0, // -G2.DomUtil.getHeight(temp005) / 2 + 4 * intRem,
      offsetX: -1 * intRem,
      // itemGap: 20, // 图例项之间的间距
      useHtml: true,
      containerTpl: '<div class="g2-legend vis-jjfz-d" style="position:absolute;top:20px;right:60px;width:auto;">' +
          '<ul class="g2-legend-list" style="list-style-type:none;margin:0;padding:0;"></ul>' +
        '</div>',
      itemTpl: (value, color, checked, index) => {
        const obj = dv.rows[index];
        checked = checked ? 'checked' : 'unChecked';
        let sClass = 'up';
        if (obj.inc < 0) {
          sClass = 'down';
        }
        return '<li class="vis-jjfz-li g2-legend-list-item item-' + index + ' ' + checked +
          '" data-value="' + value + '" data-color=' + color + '>' +
            '<span style="width:' + 0.5 * intRem + 'px;background-color:' + color + ';"></span>' +
            '<div style="padding-left:' + intRem + 'px;font-size:' + intRem + 'px;color:#999;">' + value + '（' + obj.unit + '）' + '</div>' +
            '<div style="padding-left:' + intRem + 'px;font-size:' + 1.5 * intRem + 'px;color:#fff;">' + obj.count +
              '<span class="vis-jjfz-ud vis-plate-' + sClass + '"><i></i>&nbsp;' + obj.inc + '%</span>' +
            '</div>' +
          '</li>';
      }
    });
    chart.intervalStack()
      .position('percent')
      .color('item', ['#4b68dd', '#20b6d9', '#1674f2'])
      .label('percent', {
        textStyle: {
          fill: '#fff', // 文本的颜色
          fontSize: intRem, // 文本大小
          fontWeight: 'bold', // 文本粗细
          textBaseline: 'middle' // 文本基准线，可取 top middle bottom，默认为middle
        },
        formatter: function formatter (val, item) {
          // return item.point.item + ': ' + val;
          return val;
        }
      })
      .tooltip('item*percent', function (item, percent) {
        percent = Math.round(percent * 100) + '%';
        return {
          name: item,
          value: percent
        };
      })
      .style({
        lineWidth: 1,
        stroke: '#000'
      });
    chart.render();
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>
