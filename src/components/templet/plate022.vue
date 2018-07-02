<!-- 图表plate temp_001 for 脱贫攻坚、 （环状图）  -->
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
    <div class="vis-cou-content" style="position: relative;">
      <div class="vis-tp22-t">
        <ul>
          <li>
            <p>公路货运周转量（亿吨/公里）</p>
            <h3>7.56</h3>
          </li>
          <li>
            <p>公路客运周转量（亿人/公里）</p>
            <h3>8.77</h3>
          </li>
        </ul>
      </div>
      <div  class="vis-tp22-b">
        <div style="width: 100%;height: 100%;" id="vis_temp_022"></div>
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
  created () {
  },
  mounted () {
    //
    // $('#vis_tp2_list').children('li').css('width', 100 / $('#vis_tp2_list').children('li').length + '%');
    this.laodVisCou6(); // 精准扶贫
  },
  methods: {
    laodVisCou6 () {
      let data = [
        {name: '公交车辆', count: 2414},
        {name: '出租车辆', count: 1289},
        {name: '客运车辆', count: 1128},
        {name: '共享单车', count: 2988}
      ];
      let dv = new View().source(data);
      let temp022 = document.getElementById('vis_temp_022');
      const chart = new G2.Chart({
        container: 'vis_temp_022',
        forceFit: true,
        padding: [0, 0, 0.5 * intRem, 6 * intRem],
        width: G2.DomUtil.getWidth(temp022),
        height: G2.DomUtil.getHeight(temp022)
      });
      chart.source(dv);
      chart.tooltip({
        showTitle: false,
        itemTpl: '<li>{name}：{value}</li>'
      });
      chart.axis('name', {
        line: null,
        tickLine: null, // 刻度线
        label: {
          textStyle: {
            fill: '#999', // 文本的颜色
            fontSize: intRem // 文本大小
          },
          offset: intRem * 0.6
        }
      });
      chart.axis('count', false);
      chart.coord().transpose();
      // .shape('square')
      chart.interval()
        .position('name*count')
        .color(['l(0) 0:#011435 1:#019aff'])
        .label('count', {
          offset: intRem,
          textStyle: {
            fill: '#fff',
            fontSize: intRem
          }
        })
        .tooltip('name*count', function (name, count) {
          return {
            name: name,
            value: count
          };
        });
      chart.render();
    }
  }
}
</script>
<style lang="scss" scoped>
  .vis-tp22-t {
    height: 4rem; width: 100%; position: absolute; top: 0; left: 0;
    > ul {
      overflow: hidden;
      > li {
        float: left;
        width: 50%;
        text-align: left;
        > p {
          color: #999;
          padding-bottom: .5rem;
        }
        > h3 {
          font-size: 1.5rem;
          color: #fff;
          padding-left: .5rem;
        }
        &:first-child {
          padding-left: 1rem;
        }
      }
    }
  }
  .vis-tp22-b {
    padding-top: 4rem; height: 100%; width: 100%;
    > div {
      height: 100%;
      width: 100%;
    }
  }
</style>
