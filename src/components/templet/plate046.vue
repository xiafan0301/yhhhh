<!-- 图表plate temp_031 for 社会民生 文化教育  -->
<template>
  <div class="vis-temp-main" style="position: relative;">
    <div class="vis-cou-title">
      <h2>{{oData.plateName}}</h2>
    </div>
    <div class="vis-cou-content" style="overflow: hidden;position: relative;">
      <ul class="vis-t43-ul">
        <li>
          <div>
            <div>
              <img src="../../assets/img/icons/vis-043-02.png" alt="">
              <div>
                <h3>8231</h3>
                <p>㎡</p>
              </div>
            </div>
            <p>城镇人均住房</p>
          </div>
        </li>
        <li>
          <div>
            <div>
              <img src="../../assets/img/icons/vis-043-01.png" alt="">
              <div>
                <h3>8231</h3>
                <p>㎡</p>
              </div>
            </div>
            <p>农村人均住房</p>
          </div>
        </li>
        <li>
          <div>
            <div>
              <img src="../../assets/img/icons/vis-043-04.png" alt="">
              <div>
                <h3>8231</h3>
                <p>人</p>
              </div>
            </div>
            <p>外出务工</p>
          </div>
        </li>
        <li>
          <div>
            <div>
              <img src="../../assets/img/icons/vis-043-03.png" alt="">
              <div>
                <h3>80%</h3>
                <!--<p>㎡</p>-->
              </div>
            </div>
            <p>就业率</p>
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
  .vis-t43-ul {
    overflow: hidden;
    color: #fff;
    height: 100%;
    > li {
      float: left;
      width: 25%; height: 100%;
      padding: .5rem;
      > div {
        width: 100%;
        height: 100%;
        position: relative;
        padding-top: 2rem;
        > div {
          width: 100%;
          position: relative;
          > img {
            width: 100%;
          }
          > div {
            text-align: center;
            position: absolute; left: 0; top: 50%;
            transform: translate3d(0, -50%, 0);
            width: 100%;
            > h3 {
              font-size: 1.5rem;
            }
            > p {
              color: #aaa;
            }
          }
        }
        > p {
          padding-top: 1rem;
          text-align: center;
        }
        /*> img {
          width: 100%;
        }
        > p {
          color: #999;
        }
        > div {
          position: absolute; left: 0; top: 50%;
          transform: translate3d(0, -50%, 0);
          width: 100%;
          text-align: center;
        }*/
      }
    }
  }
</style>
