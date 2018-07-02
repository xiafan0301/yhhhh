<template>
  <div class="vis-main" :class="{'vis-show': visShow}">
    <div class="vis-map" id="visMap"></div>
    <div is="visHeader" :title="title"></div>
    <div is="visNav"></div>
    <ul class="vis-menu vis-bg-cover" v-if="mapDataList && mapDataList.length > 0">
      <li v-for="(item, index) in mapDataList" :key="'map_tab_' + index"
          :class="{'vis-menu-li-sed': menuActive === item.uid}" @click="changeMenu(index, item)">{{item.name}}</li>
    </ul>
    <ul class="vis-info-tip">
      <li v-if="menuActive === 1">全县人口总数：<span class="vis-info-tip-nb">{{ 512312 | fmTenThousand }}</span></li>
      <li v-if="menuActive === 2">全县企业总数：<span class="vis-info-tip-nb">{{ 12312 | fmTenThousand }}</span><span>&nbsp;家</span></li>
      <li v-if="menuActive === 3">全县贫困村总数：<span class="vis-info-tip-nb">{{ 123 | fmTenThousand }}</span><span>&nbsp;个</span></li>
      <li v-if="menuActive === 4">当前应急事件：<span class="vis-info-tip-nb">{{ 12312 | fmTenThousand }}</span><span>&nbsp;件</span></li>
    </ul>
    <!-- 图表板块 -->
    <div class="vis-cou vis-bg-cover" v-for="(item, index) in aPlates"
         :class="'vis-cou' + item.positionIndex" :key="'plate-list' + index">
      <div :is="item.sPlate" :oData="item"></div>
      <span class="vis-cou-j vis-cou-j1"></span>
      <span class="vis-cou-j vis-cou-j2"></span>
      <span class="vis-cou-j vis-cou-j3"></span>
      <span class="vis-cou-j vis-cou-j4"></span>
    </div>
    <!-- 归位 -->
    <span class="vis-map-reset-btn" id="mapResetBtn"></span>
  </div>
</template>
<script>
import G2 from '@antv/g2';
import { View } from '@antv/data-set';
import {xpxVillagesArray, xpxRKFBArray, testPageData, testMapData} from '@/config/data.js';
import {intRem} from '@/utils/util.js';
import {plateRelations, pageRelations} from '@/config/config.js';
import {myAMap} from '@/config/amap.js';
import visHeader from '@/components/common/header.vue';
import visNav from '@/components/common/nav.vue';
export default {
  components: {visHeader, visNav},
  data () {
    return {
      aPlates: [],
      title: '', // 溆浦县可视化大数据平台
      visShow: false,
      menuActive: 1,
      amap: null,
      allMapMarkers: [],
      emergencyDialog: false,
      emergencyData: {},
      // 地图数据对象
      mapDataList: testMapData.index
    }
  },
  computed: {
    emergencyIconClass (idx) {
      let oClass = {};
      oClass['vis-wn-0' + this.emergencyData.level] = true;
      return oClass;
    }
  },
  watch: {
  },
  mounted () {
    // 动态设置地图大小
    $('#visMap').width($(window).width());
    $('#visMap').height($(window).height());
    let aCenter = [110.664313, 27.895532], iZoom = 10;
    // 初始化地图
    let map = myAMap.init('visMap', {
      center: aCenter, // 溆浦县中心点
      name: '溆浦县',
      zoom: iZoom
    });
    this.amap = map;
    // 归位按钮事件
    AMap.event.addDomListener(document.getElementById('mapResetBtn'), 'click', function () {
      // map.panTo([110.664313, 27.895532]);
      map.setZoomAndCenter(iZoom, aCenter);
    });

    if (this.mapDataList && this.mapDataList.length > 0) {
      // default menu
      this.menuActive = this.mapDataList[0].uid;
      // myAMap.drawHandler(map, this.mapDataList[0], this.allMapMarkers);
      this.initMapMarkers(this.mapDataList[0], false);
    }
    console.log('this.allMapMarkers', this.allMapMarkers.length);
    // 地图浮层

    // 乡镇信息
    setTimeout(() => {
      // this.populationCover();
    }, 1600);
    // 人口分布
    setTimeout(() => {
      // this.setVillages();
    }, 2400);

    // 图表
    setTimeout(() => {
      this.visShow = true;
      setTimeout(() => {
        this.initPlates();
      }, 200);
    }, 800);
  },
  methods: {
    initPlates () {
      let pageId = this.$route.params.pageId;
      // console.log('params pageId', pageId);
      if (!pageId) {
        pageId = 'index';
      }
      let oData = testPageData[pageId];
      if (!oData) {
        oData = testPageData['index'];
      }
      // console.log('last pageId', pageId);
      // console.log('pageData', oData);
      this.title = oData.pageName;
      $('title').text(this.title + ' - 溆浦县可视化大数据平台');
      let apls = [];
      for (let i = 0; i < oData.plates.length; i++) {
        let sPlate = plateRelations[oData.plates[i].plateId];
        let _o = Object.assign({}, oData.plates[i], {
          sPlate: sPlate,
          positionIndex: oData.plates[i].serialNumber
        });
        apls.push(_o);
      }
      this.aPlates = apls;
    },
    initMapMarkers (mapData, isClear) {
      if (isClear) {
        myAMap.clearMarkers(this.amap, this.allMapMarkers);
      }
      myAMap.drawHandler(this.amap, mapData, this.allMapMarkers);
    },
    changeMenu (index, item) {
      if (item.uid !== this.menuActive) {
        this.menuActive = item.uid;
        this.initMapMarkers(this.mapDataList[index], true);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .vis-eg-dialog {
    position: absolute; bottom: 6%; right: 28%;
    width: 13%;
    > .vis-eg-dialog-title {
      color: #fff;
      padding: 0 10% 0 10%;
      position: relative;
      > .vis-wn-icon {
        position: absolute; top: 0; left: 7%;
        animation: null;
      }
      > h3 {
        font-size: 1.3rem;
        height: 3rem; line-height: 3rem;
        padding-left: 3.2rem;
        vertical-align: middle;
        position: relative; top: .4rem;
      }
    }
    > .vis-eg-dialog-img {
      padding: 1rem 10%;
      img {
        max-width: 100%;
      }
    }
    > .vis-eg-dialog-ul {
      padding: 0 10%;
      margin-bottom: .5rem;
      > li {
        color: #fff;
        padding-bottom: .3rem;
        > span {
          color: #6a717d;
        }
      }
    }
  }
  .vis-cou-content-ic1 {
    display: inline-block;
    position: relative;
    margin-left: 1rem; padding-left: 1.5rem;
    color: #F5359D;
  }
  .vis-cou-content-ic1 > i {
    position: absolute; top: 50%; left: 0;
    width: 1.15rem;
    height: 1.5rem;
    margin-top: -0.9rem;
    background: url(../../../assets/img/icons/vis-ud-up.png) left center no-repeat;
    -webkit-background-size: auto 100%;
    background-size: auto 100%;
  }

  .vis-map-reset-btn {
    display: block;
    position: absolute; bottom: 8%; left: 30%;
    width: 2rem; height: 2rem;
    background: url(../../../assets/img/map/ic-reset.png);
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    cursor: pointer;
    opacity: .8;
    transition: all .6s;
  }
  .vis-map-reset-btn:hover {
    opacity: 1;
    transform: scale(1.5);
  }
</style>
