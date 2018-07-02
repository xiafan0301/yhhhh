import {markersType} from '@/config/data.js';
import {intRem} from '@/utils/util.js';
export const myAMap = {
  /*
  * @param {string} sid 容器ID
  * oInit
  * @param {array}  center 中心点
  * @param {string} name 县级市名称
  * @param {int} zoom
  * */
  init (sid, oInit) {
    // 初始化地图
    let map = new AMap.Map(sid, {
      resizeEnable: true,
      center: oInit.center, // e.g. 溆浦县中心点
      zoom: oInit.zoom
    });
    // map.setCity('溆浦县');
    map.setMapStyle('amap://styles/darkblue');
    if (oInit.name) {
      setTimeout(() => {
        myAMap.drawBoundary(map, oInit);
      }, 20)
    }
    return map;
  },

  drawHandler (map, oData, aMarkers) {
    if (oData.itemList && oData.itemList.length > 0) {
      let infoWindow = null;
      for (let i = 0; i < oData.itemList.length; i++) {
        let obj = oData.itemList[i];
        let marker = new AMap.Marker({ // 添加自定义点标记
          map: map,
          position: obj.center, // 基点位置 [116.397428, 39.90923]
          offset: new AMap.Pixel(-1.5 * intRem, -3 * intRem), // 相对于基点的偏移位置
          draggable: false, // 是否可拖动
          extData: obj,
          // 自定义点标记覆盖物内容
          content: '<div class="vis-map-mk ' + markersType[obj.showType] + '"></div>'
        });
        // mouseover click
        marker.on('mouseover', function (mEvent) {
          let iW = Math.round($(window).width() * 0.15);
          // let extD = mEvent.target.F.extData;
          let sContent = '<div class="vis-bsns-info" style="width: ' + iW + 'px;">' +
            '<h3>' + obj.name + '</h3>';
          if (obj.sitemList && obj.sitemList.length > 0) {
            sContent += '<ul>';
            for (let j = 0; j < obj.sitemList.length; j++) {
              let sObj = obj.sitemList[j];
              sContent += '<li class="as-ellipsis">';
              if (sObj.key) {
                sContent += sObj.key + '：';
              }
              sContent += '<span>' + sObj.value + '' + sObj.unit + '</span></li>';
            }
            sContent += '</ul>';
          }
          sContent += '</div>';
          infoWindow = new AMap.InfoWindow({
            isCustom: true,
            closeWhenClickMap: true,
            offset: new AMap.Pixel(iW / 2 + 2 * intRem, 0), // 相对于基点的偏移位置
            content: sContent
          });
          infoWindow.open(map, mEvent.target.F.position);
          infoWindow.on('close', function () {
            console.log('infoWindow close')
          });
          marker.on('mouseout', function (mEvent) {
            if (infoWindow) { infoWindow.close(); }
          });
          marker.on('click', function (mEvent) {
            map.setZoomAndCenter(16, obj.center);
          });
        });
        aMarkers.push(marker);
      }
    }
  },

  /* 清楚所有标记 */
  clearMarkers (map, mapMarkers, callback) {
    map.remove(mapMarkers);
    mapMarkers = [];
    if (callback) {
      callback();
    }
  },

  // 绘制行政区域边界
  drawBoundary (map, oInit) {
    AMap.service('AMap.DistrictSearch', function () { // 回调函数
      // 实例化DistrictSearch
      let districtSearch = new AMap.DistrictSearch({
        level: 'biz_area', // country、province、city、district、biz_area
        subdistrict: 0, // 返回下一级行政区
        showbiz: true, // 最后一级返回街道信息
        extensions: 'all' // 返回行政区边界坐标组等具体信息
      });
      // 使用districtSearch对象调用行政区查询的功能
      districtSearch.search(oInit.name, function (status, result) {
        if (result && result.districtList[0]) {
          let oDis = result.districtList[0];
          let bounds = oDis.boundaries;
          console.log(oInit.name + '边界 bounds', bounds);
          // 行政区边界渲染，使用多边形覆盖物实现
          let polygon = new AMap.Polygon({
            map: map,
            strokeWeight: 2,
            path: bounds,
            fillOpacity: 0.2, // 0.95
            fillColor: '#032488',
            strokeColor: '#2e7de3'
          });
        }
        // map.setFitView();
      })
      // map.setZooms(9.8);
    });
  }
};
