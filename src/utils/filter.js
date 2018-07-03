// 全局过滤器
import Vue from 'vue';
Vue.filter('filterStringify', function (obj) {
  return JSON.stringify(obj);
});
Vue.filter('filterTenThousand', function (numer, currency) {
  if (isNaN(numer)) { return 0; }
  if (numer < 10000) { return numer; }
  if (!currency) { currency = '万'; }
  numer = Math.round((numer / 10000) * 100) / 100;
  numer = numer + currency;
  return numer;
});
Vue.filter('filterPagePosition', function (type) {
  let objs = {
    '11': '左上',
    '12': '左中',
    '13': '左下',
    '21': '右上',
    '22': '右中',
    '23': '右下',
    '31': '地图第一个tab',
    '32': '地图第二个tab',
    '33': '地图第三个tab',
    '34': '地图第四个tab'
  };
  return objs[type + ''] ? objs[type + ''] : '--';
});
