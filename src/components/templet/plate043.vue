<!-- 图表plate temp_031 for 社会民生 文化教育  -->
<template>
  <div class="vis-temp-main" style="position: relative;">
    <div class="vis-cou-title">
      <h2>{{oData.plateName}}</h2>
    </div>
    <div class="vis-cou-content" style="overflow: hidden;position: relative; color: #fff;">
      <div style="float: left; width: 50%; height: 100%; position: relative; text-align: center;">
        <img class="as-trans50-lt" src="../../assets/img/plate/p043-01.png" alt="" style="max-width: 80%; max-height: 80%;
          position: absolute; top: 50%; left: 50%;">
        <div style="position: absolute; top: 50%; left: 50%; text-align: center;" class="as-trans50-lt">
          <h3 style="padding-bottom: .2rem;">就诊率</h3>
          <p style="font-size: 1.6rem;">99%</p>
        </div>
      </div>
      <div class="vis-t43-lb" style="float: left; width: 25%; height: 100%; position: relative;">
        <ul>
          <li>
            <div>
              <div>门诊数（个）</div>
              <p>2586</p>
            </div>
          </li>
          <li>
            <div>
              <div>门诊数（个）</div>
              <p>2586</p>
            </div>
          </li>
          <li>
            <div>
              <div>门诊数（个）</div>
              <p>2586</p>
            </div>
          </li>
        </ul>
      </div>
      <div style="float: left; width: 25%; height: 100%; position: relative;">
        <ul class="vis-t43-lu as-trans50-t">
          <li style="color: #fff;">主要疾病</li>
          <li>精神病</li>
          <li>肠胃炎（包括痢疾）</li>
          <li>甲亢</li>
          <li>过敏性鼻炎</li>
          <li>流行性感冒及肺炎</li>
        </ul>
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
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
  .vis-t43-lb {
    > ul {
      position: absolute; left: 0; top: 50%;
      transform: translate3d(0, -50%, 0);
      li {
        overflow: hidden;
        > div {
          float: left;
          background-color: #060a27;
          border: 1px solid #143466;
          text-align: center;
          padding: .5rem 1rem;
          border-radius: 8px;
          > div {
          }
          > p {
            font-size: 1.6rem;
            text-align: left;
          }
        }

      }
    }
  }
  .vis-t43-lu {
    position: absolute; top: 50%; left: 0;
    > li {
      padding-bottom: .2rem;
      color: #999;
    }
  }
</style>
