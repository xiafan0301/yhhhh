<template>
  <div class="vis-main vis-cut4" :class="{'vis-show': visShow}">
    <div class="vis-map" id="visMap"></div>
    <div is="visHeader" :title="title"></div>
    <div is="visNav"></div>
    <div class="vis-cou vis-cou3 vis-bg-cover">
      <div class="vis-cou-title"><h2>周边视频</h2></div>
      <div class="vis-cou-content" id="visCou3">
        <div class="vis-egy-zbsp">
          <ul>
            <li><img src="../../../assets/img/temp/vis-egy-t01.png" alt=""></li>
            <li><img src="../../../assets/img/temp/vis-egy-t02.png" alt=""></li>
            <li><img src="../../../assets/img/temp/vis-egy-t03.png" alt=""></li>
            <li><img src="../../../assets/img/temp/vis-egy-t04.png" alt=""></li>
            <li><img src="../../../assets/img/temp/vis-egy-t05.png" alt=""></li>
            <li><img src="../../../assets/img/temp/vis-egy-t06.png" alt=""></li>
          </ul>
        </div>
      </div>
      <span class="vis-cou-j vis-cou-j1"></span>
      <span class="vis-cou-j vis-cou-j2"></span>
      <span class="vis-cou-j vis-cou-j3"></span>
      <span class="vis-cou-j vis-cou-j4"></span>
    </div>
    <div class="vis-cou vis-cou4 vis-bg-cover">
      <div class="vis-cou-title"><h2>应急事件信息</h2></div>
      <div class="vis-cou-content" id="visCou4">
        <ul class="vis-egy-info">
          <li>
            <div class="vis-egy-info-l">编号：</div>
            <div class="vis-egy-info-r">YSD20180525111111321A</div>
          </li>
          <li>
            <div class="vis-egy-info-l">等级：</div>
            <div class="vis-egy-info-r">五级预警</div>
          </li>
          <li>
            <div class="vis-egy-info-l">类型：</div>
            <div class="vis-egy-info-r">两车超速发生撞击</div>
          </li>
          <li>
            <div class="vis-egy-info-l">时间：</div>
            <div class="vis-egy-info-r">2018-05-25 12:24:21</div>
          </li>
          <li>
            <div class="vis-egy-info-l">地点：</div>
            <div class="vis-egy-info-r">长沙市天心区11号</div>
          </li>
          <li>
            <div class="vis-egy-info-l">内容：</div>
            <div class="vis-egy-info-r">两车超速发生撞击，两车超速发生撞击两车超速发生撞击，两车超速发生撞击，两车超速发生撞击</div>
          </li>
        </ul>
      </div>
      <span class="vis-cou-j vis-cou-j1"></span>
      <span class="vis-cou-j vis-cou-j2"></span>
      <span class="vis-cou-j vis-cou-j3"></span>
      <span class="vis-cou-j vis-cou-j4"></span>
    </div>
    <div class="vis-cou vis-cou5 vis-bg-cover">
      <div class="vis-cou-title"><h2>协同机构</h2></div>
      <div class="vis-cou-content" id="visCou5">
        <ul class="vis-egy-xtjg">
          <li @click="xtjgSel(item)" :class="{'vis-egy-xtjg-sed': xtjgSeds[item]}" v-for="(item, index) in 12" :key="'xtjg' + index">县民政局{{item}}</li>
        </ul>
      </div>
      <span class="vis-cou-j vis-cou-j1"></span>
      <span class="vis-cou-j vis-cou-j2"></span>
      <span class="vis-cou-j vis-cou-j3"></span>
      <span class="vis-cou-j vis-cou-j4"></span>
    </div>
    <div class="vis-cou vis-cou6 vis-bg-cover">
      <div class="vis-cou-title"><h2>现场视频</h2></div>
      <div class="vis-cou-content" id="visCou6"></div>
      <span class="vis-cou-j vis-cou-j1"></span>
      <span class="vis-cou-j vis-cou-j2"></span>
      <span class="vis-cou-j vis-cou-j3"></span>
      <span class="vis-cou-j vis-cou-j4"></span>
    </div>
    <div class="vis-cou vis-cou7 vis-bg-cover">
      <div class="vis-cou-title"><h2>周边警力</h2></div>
      <div class="vis-cou-content" id="visCou7"></div>
      <span class="vis-cou-j vis-cou-j1"></span>
      <span class="vis-cou-j vis-cou-j2"></span>
      <span class="vis-cou-j vis-cou-j3"></span>
      <span class="vis-cou-j vis-cou-j4"></span>
    </div>
    <div class="vis-cou vis-cou8 vis-bg-cover">
      <div class="vis-cou-title"><h2>周边医院</h2></div>
      <div class="vis-cou-content" style="position: relative;">
        <div style="height: 2rem; line-height: 2rem; position: absolute; top: 0; left: 5%; color: #f6f6f6;">
          <span style="color: #999;">最近医院：</span>北京协同医院
        </div>
        <div style="height: 100%; padding-top: 2rem;">
          <div style="height: 100%;" id="visCou8"></div>
        </div>
      </div>
      <span class="vis-cou-j vis-cou-j1"></span>
      <span class="vis-cou-j vis-cou-j2"></span>
      <span class="vis-cou-j vis-cou-j3"></span>
      <span class="vis-cou-j vis-cou-j4"></span>
    </div>
    <!-- 左边菜单 -->
    <div class="vis-egy-mp">
      <ul>
        <li>
          <img src="../../../assets/img/icons/vis-egy-01.png" alt="">
          <h3>摄像头</h3>
          <p>213213</p>
        </li>
        <li>
          <img src="../../../assets/img/icons/vis-egy-03.png" alt="">
          <h3>执勤人员</h3>
          <p>213213</p>
        </li>
        <li>
          <img src="../../../assets/img/icons/vis-egy-02.png" alt="">
          <h3>应急事件</h3>
          <p>213213</p>
        </li>
      </ul>
      <span><i class="el-icon-arrow-right"></i></span>
    </div>
  </div>
</template>
<script>
import G2 from '@antv/g2';
import { View } from '@antv/data-set';
import {xpxVillagesArray, xpxRKFBArray} from '@/config/data.js';
import visHeader from '@/components/common/header.vue';
import visNav from '@/components/common/nav.vue';
export default {
  components: {visHeader, visNav},
  data () {
    return {
      title: '溆浦县应急指挥',
      visShow: false,
      menuActive: 1,
      amap: null,
      allMapMarkers: [],
      // 协同机构 选中对象
      xtjgSeds: {}
    }
  },
  mounted () {
    // 设置主题
    // G2.Global.setTheme('dark');
    // 动态设置地图大小
    $('#visMap').width($(window).width());
    $('#visMap').height($(window).height());
    // 初始化地图
    var map = new AMap.Map('visMap', {
      resizeEnable: true,
      center: [110.596015, 27.907662], // 溆浦县中心点
      zoom: 17
    });
    this.amap = map;
    // map.setCity('溆浦县');
    map.setMapStyle('amap://styles/darkblue');
    // 边界
    setTimeout(() => {
      // this.boundaryCover();
    }, 1200);
    // 乡镇信息
    setTimeout(() => {
      // this.setVillages();
    }, 1600);
    // 图表
    setTimeout(() => {
      this.visShow = true;
      // 周边医院
      this.zbyyReport();
      // 周边警力
      this.zbjlReport();
    }, 800);
  },
  computed: {
  },
  methods: {
    // 周边警力
    zbjlReport () {
      // let DataView = dataSet.DataView;
      let data = [
        { action: '协警', pv: 10 },
        { action: '民警', pv: 20 },
        { action: '交警', pv: 30 },
        { action: '消防车', pv: 40 },
        { action: '待命消防员', pv: 50 }
      ];
      let dv = new View().source(data);
      dv.transform({
        type: 'percent',
        field: 'pv',
        dimension: 'action',
        as: 'percent'
      });
      data = dv.rows;
      let visCou7 = document.getElementById('visCou7');
      var chart = new G2.Chart({
        container: visCou7,
        padding: ['10%', '20%', '20%', '20%'],
        width: G2.DomUtil.getWidth(visCou7),
        height: G2.DomUtil.getHeight(visCou7)
      });
      chart.source(data, {
        // percent: { nice: false }
      });
      chart.axis(false);
      chart.tooltip({
        showTitle: false,
        itemTpl: '<li data-index={index} style="margin-bottom:4px;">' + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' + '{name}' + '：' + '{pv}' + '</li>'
      });
      chart.coord('rect').transpose().scale(1, -1);
      chart.intervalSymmetric().position('action*percent').shape('funnel').color('action', ['#05AF33', '#FF00FF', '#02A3DB', '#DC8F0A', '#055EE0']).label('action*pv', function (action, pv) {
        return action + ' ' + pv;
      }, {
        offset: 15,
        labelLine: {
          lineWidth: 1,
          stroke: 'rgba(0, 0, 0, 0.15)'
        },
        textStyle: {
          fill: '#fff', // 文本的颜色
          fontSize: '12' // 文本大小
        }
      }).tooltip('action*pv*percent', function (action, pv, percent) {
        return {
          name: action,
          percent: parseInt(percent * 100) + '%',
          pv: pv
        };
      });
      chart.render();
    },
    // 周边医院
    zbyyReport () {
      let data = [
        { name: '呼吸科', count: 25 },
        { name: '烧伤科', count: 50 },
        { name: '骨伤科', count: 28 },
        { name: '外科', count: 12 },
        { name: '急诊', count: 48 },
        { name: '重症', count: 25 }
      ];
      let visCou8 = document.getElementById('visCou8');
      const chart = new G2.Chart({
        container: 'visCou8',
        padding: ['10%', '5%', '20%', '10%'],
        width: G2.DomUtil.getWidth(visCou8),
        height: G2.DomUtil.getHeight(visCou8)
      });
      chart.source(data);
      chart.scale('sales', {
        tickInterval: 20
      });
      // axis 坐标轴配置
      chart.axis('count', {
        line: null,
        label: {
          textStyle: {
            fill: '#fff', // 文本的颜色
            fontSize: '12' // 文本大小
          }
        },
        tickLine: null, // 刻度线
        grid: { // 网格
          type: 'line', // 声明网格的类型，line 表示线，polygon 表示矩形框
          lineStyle: {
            stroke: '#021E45', // 网格线的颜色
            lineWidth: 1, // 网格线的粗细
            lineDash: [4, 0] // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
          }
        }
      });
      chart.axis('name', {
        line: null,
        label: {
          textStyle: {
            fill: '#fff', // 文本的颜色
            fontSize: '12' // 文本大小
          }
        },
        tickLine: null, // 刻度线
        grid: null // 网格
      });
      chart.interval()
        .position('name*count')
        .color('name', [
          'l(270) 0:#0273F2 1:#0D2FB8',
          'l(270) 0:#F748AC 1:#B90858',
          'l(270) 0:#E7B813 1:#D26601',
          'l(270) 0:#01D2ED 1:#0382CF',
          'l(270) 0:#9E9E9E 1:#6D6D6D',
          'l(270) 0:#0AD13F 1:#007E22'
        ]);
      // .shape('name', [ 'rect', 'hollowRect', 'line', 'tick' ]); // 指定形状;
      chart.render();
    },
    xtjgSel (item) {
      let o = {};
      if (this.xtjgSeds[item]) {
        o[item] = false;
      } else {
        o[item] = true;
      }
      this.xtjgSeds = Object.assign({}, this.xtjgSeds, o);
    }
  }
}
</script>
<style lang="scss" scoped>
  .vis-egy-zbsp {
    height: 100%;
    width: 100%;
    padding: .5rem .5rem;
    > ul {
      height: 100%;
      width: 100%;
      > li {
        width: 33.333%;
        height: 50%;
        float: left;
        padding: .5rem;
        overflow: hidden;
        > img {
          width: 100%;
          height: 100%;
          border: 1px dashed #4D8FFE;
        }
      }
    }
  }
  .vis-egy-xtjg {
    padding: 1rem 5%;
    > li {
      float: left;
      background-color: #030725;
      color: #4D8FFE;
      border: 1px solid #4D8FFE; border-radius: .4rem;
      margin: 0 1rem 1rem 0; padding: 0 1rem;
      height: 2.4rem; line-height: 2.4rem;
      cursor: pointer;
    }
    .vis-egy-xtjg-sed {
      background-color: #02A3DB;
      border-color: #02A3DB;
      color: #fff;
    }
  }
  .vis-egy-info {
    padding: 1rem 5%;
    > li {
      overflow: hidden;
      padding-bottom: 0.5rem;
      > .vis-egy-info-l {
        width: 4rem;
        text-align: center;
        color: #676872;
        float: left;
      }
      > .vis-egy-info-r {
        margin-left: 4rem;
        color: #d6d7df;
      }
    }
  }
  .vis-egy-mp {
    position: absolute; top: 50%; left: 0;
    margin-top: -18rem;
    background-color: #253898;
    background-color: rgba(37, 56, 152, .95);
    padding: .5rem 2.5rem 0 1rem;
    animation: fadeInLeft .6s ease-out 1s both;
    > span {
      width: 2rem; height: 2rem; line-height: 2rem;
      text-align: center;
      position: absolute; top: 50%;  right: 0;
      margin-top: -1rem;
      color: #fff; cursor: pointer;
      > i {
        font-size: 1.2rem;
      }
    }
    > ul {
      > li {
        padding: 1rem 0;
        text-align: center;
        > img {
          width: 3rem;
          padding-bottom: .2rem;
        }
        > h3 {
          padding-bottom: .2rem;
          color: #fff; font-size: 1.1rem;
          text-align: center;
        }
        > p {
          padding-bottom: .2rem;
          color: #6e7599;
          text-align: center;
        }
      }
    }
  }
  .vis-show .vis-cou6, .vis-show .vis-cou3, .vis-show .vis-cou7, .vis-show .vis-cou8 {
    animation: fadeInUp .6s ease-out .5s both;
  }
</style>
