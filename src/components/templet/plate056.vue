<!-- 图表plate temp_007 for 脱贫攻坚 贫困人口概述  -->
<template>
  <div class="vis-temp-main" style="position: relative;">
    <div class="vis-cou-title">
      <h2>{{oData.plateName}}</h2>
    </div>
    <div class="vis-cou-content" style="position: relative;">
      <ul class="vis-p056-ul" style="color: #fff;">
        <li>
          <div class="as-trans50-lt">
            <img src="../../assets/img/plate/p056-02.png" alt="">
            <h4 class="as-ellipsis">全社会用电量</h4>
            <div>9.68</div>
            <p>亿千瓦时</p>
            <span class="vis-plate-up"><i>&nbsp;</i>6.4%</span>
          </div>
        </li>
        <li>
          <div class="as-trans50-lt">
            <img src="../../assets/img/plate/p056-03.png" alt="">
            <h4 class="as-ellipsis">全社会用电量</h4>
            <div>9.68</div>
            <p>亿千瓦时</p>
            <span class="vis-plate-up"><i>&nbsp;</i>6.4%</span>
          </div>
        </li>
        <li>
          <div class="as-trans50-lt">
            <img src="../../assets/img/plate/p056-01.png" alt="">
            <h4 class="as-ellipsis">全社会用电量</h4>
            <div>9.68</div>
            <p>亿千瓦时</p>
            <span class="vis-plate-up"><i>&nbsp;</i>6.4%</span>
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
  .vis-p056-ul {
    color: #fff;
    overflow: hidden;
    height: 100%;
    padding: 0 1rem;
    > li {
      float: left;
      width: 33.33%; height: 100%;
      padding: 1rem 1rem;
      position: relative;
      > div {
        text-align: center;
        position: absolute; top: 50%; left: 50%;
        > img {
          width: 70%;
        }
        > h4 {
          height: 2rem;
          line-height: 1.5rem;
          color: #999;
          padding-bottom: .2rem;
          padding-top: .2rem;
        }
        > div {
          font-size: 1.5rem;
          padding-bottom: .2rem;
        }
        > p {
          color: #999;
          padding-bottom: .4rem;
        }
      }
    }
  }
</style>
