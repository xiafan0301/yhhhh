<!-- 图表plate temp_008 for 脱贫攻坚 > 贫困类型  -->
<template>
  <div class="vis-temp-main" style="position: relative;">
    <div class="vis-cou-title">
      <h2>{{oData.plateName}}</h2>
    </div>
    <div class="vis-cou-content clearfix" style="color: #fff; padding: 1rem;">
      <div class="vis-p052-l">
        <ul class="as-trans50-lt">
          <li>
            <h3>公务员(人)</h3>
            <p>700</p>
          </li>
          <li>
            <h3>非编制人员(人)</h3>
            <p>300</p>
          </li>
        </ul>
      </div>
      <div  class="vis-p052-r"  id="vis_temp_052">
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
      {name: '本科生', cnt: 300, unit: '人', inc: 6.4},
      {name: '大专生', cnt: 300, unit: '人', inc: 6.4},
      {name: '其它学历', cnt: 200, unit: '人', inc: 6.4},
      {name: '研究生', cnt: 200, unit: '人', inc: 6.4}
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
        radius: 0.95,
        innerRadius: 0.85
      });
      chart.legend(false);
      chart.axis(false);
      // 辅助文本
      chart.guide().html({
        position: ['50%', '50%'],
        html: '<div style="color:#fff;text-align: center;width: 10em;">' +
        '<p style="font-size:1.5rem;">33%</p>' +
        '<p style="padding-bottom:.5rem;">男性</p>' +
        '<p style="font-size:1.5rem;">67%</p>' +
        '<p>女性</p>' +
        '</div>',
        alignX: 'middle',
        alignY: 'middle'
      });
      chart.intervalStack()
        .position('cnt')
        .color('name', ['#FA9623', '#967BFC', '#1774F2', '#14C2C3'])
        .label('percent', {
          offset: 2 * intRem, // 设置坐标轴文本 label 距离坐标轴线的距离
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
    width: 30%; height: 100%; float: left;
    text-align: center;
    position: relative;
    > ul {
      position: absolute; top: 50%; left: 50%;
      width: 100%;
      > li {
        margin-bottom: 2rem;
        text-align: left;
        background-color: #022343;
        border: 1px solid #01396C;
        border-radius: .3rem;
        padding: 0.5rem 1rem;
        > h3 {
          color: #999;
        }
        > p {
          color: #fff;
          font-size: 1.5rem;
        }
      }
    }
  }
  .vis-p052-r {
    width: 70%; height: 100%; float: left;
    background: url(../../assets/img/plate/p051-01.png) center center no-repeat;
    -webkit-background-size: auto 60%;
    background-size: auto 60%;
  }
</style>
