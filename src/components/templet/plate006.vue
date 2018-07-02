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
      <div style="height: 45%;">
        <ul class="vis-tp6-b">
          <li>
            <div>
              <div>日均气温</div>
              <p><span>28</span>℃</p>
            </div>
          </li>
          <li>
            <div>
              <div>日均相对湿度</div>
              <p><span>49</span>%</p>
            </div>
          </li>
          <li>
            <div>
              <div>日均降水量</div>
              <p><span>2.1</span>mm</p>
            </div>
          </li>
          <li>
            <div>
              <div>日均日照时数</div>
              <p><span>7</span>h</p>
            </div>
          </li>
        </ul>
      </div>
      <div style="height: 55%;" id="vis_temp_006">
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
  mounted () {
    this.laodVisCou6(); // 精准扶贫
  },
  methods: {
    // 精准扶贫
    laodVisCou6 () {
      var data = [{
        gender: '空气质量达标率',
        value: 99
      }, {
        gender: '污水处理率',
        value: 99
      }, {
        gender: '水质达标率',
        value: 89
      }, {
        gender: '垃圾处理率',
        value: 91
      }];

      let temp006 = document.getElementById('vis_temp_006');
      const chart = new G2.Chart({
        container: 'vis_temp_006',
        forceFit: true,
        padding: [intRem, 0 * intRem, 3 * intRem, 0 * intRem],
        width: G2.DomUtil.getWidth(temp006),
        height: G2.DomUtil.getHeight(temp006)
      });
      chart.source(data, {
        value: {
          min: 0,
          max: 100
        }
      });
      chart.legend(false);
      // chart.axis(false);
      chart.axis('gender', {
        line: null,
        label: {
          textStyle: {
            fill: '#fff', // 文本的颜色
            fontSize: intRem // 文本大小
          }
        },
        tickLine: null, // 刻度线
        grid: null // 网格
      });
      chart.axis('value', {
        line: null,
        label: null,
        tickLine: null, // 刻度线
        grid: null // 网格
      });
      /* chart.legend({
       offsetY: -50
       }); */
      chart.interval().position('gender*value').color('gender', [
        'l(270) 0:#D67705 1:#F4D506',
        'l(270) 0:#F82C8C 1:#E540E2',
        'l(270) 0:#4D58D2 1:#569FF9',
        'l(270) 0:#0590B8 1:#25D6F0'
      ]).shape('liquid-fill-gauge').style({
        lineWidth: 2,
        opacity: 0.75
      });

      data.forEach(function (row) {
        chart.guide().text({
          top: true,
          position: {
            gender: row.gender,
            value: 50
          },
          content: row.value + '%',
          style: {
            fill: '#fff',
            opacity: 0.75,
            fontSize: 1.5 * intRem,
            textAlign: 'center'
          }
        });
      });
      chart.render();
    }
  }
}
</script>
<style lang="scss" scoped>
  .vis-tp6-b {
    height: 100%;
    overflow: hidden;
    align-items: center;
    line-height: normal;
    > li {
      color: #fff;
      text-align: center;
      width: 25%; height: 100%;
      position: relative;
      float: left;
      padding: 0 .5rem;
      &:nth-child(1) {
        > div {
          background: url(../../assets/img/plate/p006-01.png) 5px center no-repeat;
          -webkit-background-size: auto 50%;
          background-size: auto 50%;
          padding-left: 2.2rem;
        }
      }
      &:nth-child(2) {
        > div {
          background: url(../../assets/img/plate/p006-02.png) 5px center no-repeat;
          -webkit-background-size: auto 50%;
          background-size: auto 50%;
          padding-left: 2.4rem;
        }
      }
      &:nth-child(3) {
        > div {
          background: url(../../assets/img/plate/p006-03.png) 5px center no-repeat;
          -webkit-background-size: auto 50%;
          background-size: auto 50%;
          padding-left: 2.4rem;
        }
      }
      &:nth-child(4) {
        > div {
          background: url(../../assets/img/plate/p006-04.png) 5px center no-repeat;
          -webkit-background-size: auto 50%;
          background-size: auto 50%;
          padding-left: 2.6rem;
        }
      }
      > div {
        width: 100%;
        margin-top: 1rem;
        padding: 1rem 0;
        border: 1px solid #053e77;
        background-color: #022344;
        border-radius: .5rem;
        text-align: left;
        > div {
          font-size: 1rem;
          color: #999;
          word-break:keep-all; white-space:nowrap;
        }
        > p {
          word-break:keep-all; white-space:nowrap;
          font-size: 1.2rem;
          padding-left: .5rem;
          > span {
            font-size: 1.6rem;
            display: inline-block;
            padding-right: .3rem;
          }
        }
      }
    }
  }
</style>
