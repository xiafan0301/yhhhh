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
      <div class="vis-cou-ctt-t" style="height: 3rem; color: #fff; padding-left: 1rem; padding-top: 0;">
        社会消费品零售总额(亿元)
        <span style="font-size: 1.5rem; display: inline-block; margin: 0 .5rem;">67.8</span>
        <span class="vis-plate-up"><i>&nbsp;</i>6.4%</span>
      </div>
      <div class="vis-cou-ctt-c" style="padding-top: 3rem;">
        <div class="vis-cou-ctt-cc vis-pt055-main" id="vis_temp_055">
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
    }
  },
  mounted () {
    this.laodVisCou6();
  },
  methods: {
    laodVisCou6 () {
      let data = [
        { name: '住宿业', count: 32.14, unit: '亿元' },
        { name: '餐饮业', count: 10.86, unit: '亿元' },
        { name: '批发业', count: 32.14, unit: '亿元' },
        { name: '零售业', count: 22.86, unit: '亿元' }
      ];
      let dv = new View();
      dv.source(data).transform({
        type: 'percent',
        field: 'count',
        dimension: 'name',
        as: 'percent'
      });
      // console.log('055 dv', dv)
      let temp055 = document.getElementById('vis_temp_055');
      const chart = new G2.Chart({
        container: 'vis_temp_055',
        forceFit: true,
        padding: [ 0, 0, 0, 0 ],
        width: G2.DomUtil.getWidth(temp055),
        height: G2.DomUtil.getHeight(temp055)
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
        radius: 0.75
      });
      chart.tooltip({
        showTitle: false,
        itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {count}亿元（{value}）</li>'
      });
      chart.intervalStack()
        .position('percent')
        .color('name', ['#8362F9', '#7B87FC', '#01BBE5', '#0080FE'])
        .label('percent', {
          textStyle: {
            rotate: 0,
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)'
          },
          htmlTemplate  (text, item, index) {
            return '<div style="text-align:center;">' +
              '<p style="color: #999; word-break:keep-all; white-space:nowrap;">' + dv.rows[index].name + '(' + dv.rows[index].unit + ')</p>' +
              '<p style="color:#fff; font-size: 1.5rem; word-break:keep-all; white-space:nowrap;">' + dv.rows[index].count + '</p>' +
              '' +
              '</div>';
          }
          // formatter: function formatter (val, item) {
          //  return item.point.name + ': ' + val;
          // }
        })
        /* .label('percent', {
          offset: -2 * intRem,
          // autoRotate: false,
          textStyle: {
            rotate: 0,
            textAlign: 'center',
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)'
          }
        }) */
        .tooltip('name*percent*count', function (name, percent, count) {
          percent = (percent * 100).toFixed(2) + '%';
          return {
            name: name,
            value: percent,
            count: count
          };
        }).style({
          lineWidth: 0,
          stroke: '#fff'
        });
      chart.render();
    }
  }
}
</script>
<style lang="scss" scoped>
  .vis-pt055-main {
    background: url(../../assets/img/plate/p055-01.png) center center no-repeat;
    -webkit-background-size: auto 100%;
    background-size: auto 100%;
    text-align: center;
    > img {
      height: 100%;
    }
  }
</style>
