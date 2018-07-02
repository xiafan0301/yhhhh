<!-- 图表plate temp_007 for 脱贫攻坚 贫困人口概述  -->
<template>
  <div class="vis-temp-main" style="position: relative;">
    <div class="vis-cou-title">
      <h2>{{oData.plateName}}</h2>
    </div>
    <div class="vis-cou-content" id="vis_temp_036">
    </div>
  </div>
</template>
<script>
import G2 from '@antv/g2';
import { View } from '@antv/data-set';
import {intRem} from '@/utils/util.js';
import {wordCloud} from '@/config/data.js';
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
    this.theReport(wordCloud);
  },
  methods: {

    theReport (data) {
      let _this = this;
      // 给point注册一个词云的shape
      G2.Shape.registerShape('point', 'cloud', {
        drawShape: function drawShape (cfg, container) {
          let attrs = _this.getTextAttrs(cfg);
          return container.addShape('text', {
            attrs: Object.assign(attrs, {
              x: cfg.x,
              y: cfg.y
            })
          });
        }
      });
      var dv = new View().source(data);
      var range = dv.range('value');
      var min = range[0];
      var max = range[1];
      dv.transform({
        type: 'tag-cloud',
        fields: ['x', 'value'],
        size: [window.innerWidth, window.innerHeight],
        font: 'Verdana',
        padding: 0,
        timeInterval: 5000, // max execute time
        rotate: function rotate () {
          var random = ~~(Math.random() * 4) % 4;
          if (random === 2) {
            random = 0;
          }
          return random * 90;
          // return 0;
          // return random * 90; // 0, 90, 270
        },
        fontSize: function fontSize (d) {
          if (d.value) {
            return (d.value - min) / (max - min) * (3 * intRem - intRem) + intRem;
          }
          return 0;
        }
      });
      let temp036 = document.getElementById('vis_temp_036');
      const chart = new G2.Chart({
        container: 'vis_temp_036',
        forceFit: true,
        padding: [1 * intRem, 1 * intRem, 1 * intRem, 1 * intRem],
        width: G2.DomUtil.getWidth(temp036),
        height: G2.DomUtil.getHeight(temp036)
      });
      chart.source(dv, {
        x: {
          nice: false
        },
        y: {
          nice: false
        }
      });
      chart.legend(false);
      chart.axis(false);
      chart.tooltip({
        showTitle: false
      });
      chart.coord().reflect();
      chart.point().position('x*y').color('category').shape('cloud').tooltip('value*category');
      chart.render();
    },

    getTextAttrs (cfg) {
      return Object.assign({}, {
        fillOpacity: cfg.opacity,
        fontSize: cfg.origin._origin.size,
        rotate: cfg.origin._origin.rotate,
        text: cfg.origin._origin.text,
        textAlign: 'center',
        fontFamily: cfg.origin._origin.font,
        fill: cfg.color,
        textBaseline: 'Alphabetic'
      }, cfg.style);
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
