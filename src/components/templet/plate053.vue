<!-- 图表plate temp_007 for 脱贫攻坚 贫困人口概述  -->
<template>
  <div class="vis-temp-main" style="position: relative;">
    <div class="vis-cou-title">
      <h2>{{oData.plateName}}</h2>
    </div>
    <div class="vis-cou-content vis-pt053-main" style="color: #fff;">
      <div class="as-trans50-l">
        <ul class="vis-pt053-ull">
          <li>
            <img src="../../assets/img/plate/p053-03.png" alt="">
            <div>
              <h4 class="as-ellipsis">引入工业招商项目商项目</h4>
              <p>122<span>个</span></p>
            </div>
          </li>
          <li>
            <img src="../../assets/img/plate/p053-03.png" alt="">
            <div>
              <h4 class="as-ellipsis">合同引进资金</h4>
              <p>19.2<span>亿元</span></p>
            </div>
          </li>
          <li>
            <img src="../../assets/img/plate/p053-03.png" alt="">
            <div>
              <h4 class="as-ellipsis">实际到位资金</h4>
              <p>6.8<span>亿元</span></p>
            </div>
          </li>
        </ul>
        <img src="../../assets/img/plate/p053-01.png" alt="">
        <ul class="vis-pt053-ulr">
          <li>
            <img src="../../assets/img/plate/p053-03.png" alt="">
            <div>
              <h4 class="as-ellipsis">新增规模企业</h4>
              <p>4<span>家</span></p>
            </div>
          </li>
          <li>
            <img src="../../assets/img/plate/p053-03.png" alt="">
            <div>
              <h4 class="as-ellipsis">新建续建工业项目</h4>
              <p>64<span>个</span></p>
            </div>
          </li>
          <li>
            <img src="../../assets/img/plate/p053-03.png" alt="">
            <div>
              <h4 class="as-ellipsis">完成总投入</h4>
              <p>16.8<span>亿元</span></p>
            </div>
          </li>
        </ul>
        <div class="vis-pt053-ifb">完成规模工业增加值(亿元)</div>
        <div class="vis-pt053-ifi as-trans50-lt">
          <div style="font-size: 1.5rem;">29.6</div>
          <div class="vis-plate-up">
            <i>&nbsp;</i>20.2%
          </div>
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
  .vis-pt053-main {
    > div {
      position: absolute; top: 0; left: 50%;
      height: 100%;
      word-break: keep-all; white-space: nowrap;
      > .vis-pt053-ifi {
        position: absolute; top: 50%; left: 50%;
        text-align: center;
      }
      > .vis-pt053-ifb {
        position: absolute; bottom: 0; left: 0;
        width: 100%;
        text-align: center;
        color: #fff;
      }
      > ul {
        display: inline-block; height: 100%; position: absolute; top: 0;
        &.vis-pt053-ull {
          right: 100%;
          > li {
            right: 0;
          }
        }
        &.vis-pt053-ulr {
          left: 100%;
          > li {
            left: 0;
          }
        }
        > li {
          height: 4rem;
          background-color: #001834;
          position: absolute; top: 0;
          margin-top: -2rem;
          &:first-child { top: 20%; }
          &:nth-child(2) { top: 50%; }
          &:nth-child(3) { top: 80%; }
          > img {
            height: 100%;
          }
          > div {
            position: absolute; left: 0; top: 0.7rem;
            width: 100%;
            > h4 {
              color: #999;
              height: 1.2rem; line-height:1rem;
              padding: 0 1rem;
            }
            > p {
              font-size: 1.5rem;
              padding: 0 1rem;
              > span {
                font-size: 1rem;
                display: inline-block;
                padding-left: .2rem;
              }
            }
          }
        }
      }
      > img {
        display: inline-block; height: 100%;
      }
    }
  }
</style>
