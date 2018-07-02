// 全局过滤器
import Vue from 'vue';
Vue.filter('fmTenThousand', function (numer, currency) {
  if (isNaN(numer)) { return 0; }
  if (numer < 10000) { return numer; }
  if (!currency) { currency = '万'; }
  numer = Math.round((numer / 10000) * 100) / 100;
  numer = numer + currency;
  return numer;
});
