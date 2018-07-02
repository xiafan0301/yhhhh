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
    <div class="vis-cou-content">
      <div class="vis-tp2-t" id="vis_temp_002"></div>
      <ul class="vis-tp2-b">
        <li v-for="(item, index) in dataList" :key="'ddlist' + index">
          <div>
            <div>{{item.count}}</div>
            <p>{{item.name}}</p>
          </div>
        </li>
      </ul>
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
      dataList: [
        {
          name: '房屋',
          count: 2458
        },
        {
          name: '路灯',
          count: 4572
        },
        {
          name: '井盖',
          count: 2133
        },
        {
          name: '监控',
          count: 1258
        }
      ]
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
      /* dv.source(data).transform({
        type: 'sort',
        callback: function callback (a, b) {
          return a.count - b.count; // 排序依据，和原生js的排序callback一致
        }
      }); */
      let temp002 = document.getElementById('vis_temp_002');
      const chart = new G2.Chart({
        container: 'vis_temp_002',
        forceFit: true,
        padding: [0, 0, 0.5 * intRem, 6 * intRem],
        width: G2.DomUtil.getWidth(temp002),
        height: G2.DomUtil.getHeight(temp002)
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
  .vis-tp2-t { height: 50%; }
  .vis-tp2-b {
    height: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    > li {
      color: #fff;
      flex: 1;
      text-align: center;
      height: 100%;
      position: relative;
      > div {
        position: absolute; top: 50%; left: 50%;
        transform: translate3d(-50%, -50%, 0);
        padding: 1rem 1.2rem;
        border-radius: .6rem;
        background: #038cd3;
        background: linear-gradient(to top, #01c7e9, #028ed3);
        > div {
          font-size: 2rem;
        }
        > p {
          font-size: 1rem;
        }
      }
      &:nth-child(2) > div {
        background: #647bdd;
        background: linear-gradient(to top, #58a8bf, #676de6);
      }
      &:nth-child(3) > div {
        background: #647bdd;
        background: linear-gradient(to top, #75b1fa, #0465e7);
      }
    }
  }
</style>
