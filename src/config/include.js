/*
* 通用引入，包含element-ui等
* */
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 2.0
// 项目公用样式
import '@/assets/css/style.css';
// import 全局filter
import '@/utils/filter.js';
// import 全局方法
import '@/utils/method.js';
// import 自定义shape for AntV/g2
import '@/config/shape.js';
// use element-ui 2.0
Vue.use(ElementUI);

// 模板组件
Vue.component('plate001', function (resolve) {
  require(['../components/templet/plate001.vue'], resolve)
});
Vue.component('plate002', function (resolve) {
  require(['../components/templet/plate002.vue'], resolve)
});
Vue.component('plate003', function (resolve) {
  require(['../components/templet/plate003.vue'], resolve)
});
Vue.component('plate004', function (resolve) {
  require(['../components/templet/plate004.vue'], resolve)
});
Vue.component('plate005', function (resolve) {
  require(['../components/templet/plate005.vue'], resolve)
});
Vue.component('plate006', function (resolve) {
  require(['../components/templet/plate006.vue'], resolve)
});
Vue.component('plate011', function (resolve) {
  require(['../components/templet/plate011.vue'], resolve)
});
Vue.component('plate012', function (resolve) {
  require(['../components/templet/plate012.vue'], resolve)
});
Vue.component('plate013', function (resolve) {
  require(['../components/templet/plate013.vue'], resolve)
});
Vue.component('plate014', function (resolve) {
  require(['../components/templet/plate014.vue'], resolve)
});
Vue.component('plate015', function (resolve) {
  require(['../components/templet/plate015.vue'], resolve)
});
Vue.component('plate016', function (resolve) {
  require(['../components/templet/plate016.vue'], resolve)
});
Vue.component('plate021', function (resolve) {
  require(['../components/templet/plate021.vue'], resolve)
});
Vue.component('plate022', function (resolve) {
  require(['../components/templet/plate022.vue'], resolve)
});
Vue.component('plate023', function (resolve) {
  require(['../components/templet/plate023.vue'], resolve)
});
Vue.component('plate024', function (resolve) {
  require(['../components/templet/plate024.vue'], resolve)
});
Vue.component('plate025', function (resolve) {
  require(['../components/templet/plate025.vue'], resolve)
});
Vue.component('plate026', function (resolve) {
  require(['../components/templet/plate026.vue'], resolve)
});
Vue.component('plate031', function (resolve) {
  require(['../components/templet/plate031.vue'], resolve)
});
Vue.component('plate032', function (resolve) {
  require(['../components/templet/plate032.vue'], resolve)
});
Vue.component('plate033', function (resolve) {
  require(['../components/templet/plate033.vue'], resolve)
});
Vue.component('plate034', function (resolve) {
  require(['../components/templet/plate034.vue'], resolve)
});
Vue.component('plate035', function (resolve) {
  require(['../components/templet/plate035.vue'], resolve)
});
Vue.component('plate036', function (resolve) {
  require(['../components/templet/plate036.vue'], resolve)
});
Vue.component('plate041', function (resolve) {
  require(['../components/templet/plate041.vue'], resolve)
});
Vue.component('plate042', function (resolve) {
  require(['../components/templet/plate042.vue'], resolve)
});
Vue.component('plate043', function (resolve) {
  require(['../components/templet/plate043.vue'], resolve)
});
Vue.component('plate044', function (resolve) {
  require(['../components/templet/plate044.vue'], resolve)
});
Vue.component('plate045', function (resolve) {
  require(['../components/templet/plate045.vue'], resolve)
});
Vue.component('plate046', function (resolve) {
  require(['../components/templet/plate046.vue'], resolve)
});
Vue.component('plate051', function (resolve) {
  require(['../components/templet/plate051.vue'], resolve)
});
Vue.component('plate052', function (resolve) {
  require(['../components/templet/plate052.vue'], resolve)
});
Vue.component('plate053', function (resolve) {
  require(['../components/templet/plate053.vue'], resolve)
});
Vue.component('plate054', function (resolve) {
  require(['../components/templet/plate054.vue'], resolve)
});
Vue.component('plate055', function (resolve) {
  require(['../components/templet/plate055.vue'], resolve)
});
Vue.component('plate056', function (resolve) {
  require(['../components/templet/plate056.vue'], resolve)
});
Vue.component('plate061', function (resolve) {
  require(['../components/templet/plate061.vue'], resolve)
});
Vue.component('plate062', function (resolve) {
  require(['../components/templet/plate062.vue'], resolve)
});
Vue.component('plate063', function (resolve) {
  require(['../components/templet/plate063.vue'], resolve)
});
Vue.component('plate064', function (resolve) {
  require(['../components/templet/plate064.vue'], resolve)
});
Vue.component('plate065', function (resolve) {
  require(['../components/templet/plate065.vue'], resolve)
});
Vue.component('plate066', function (resolve) {
  require(['../components/templet/plate066.vue'], resolve)
});
// // 前端登录COOKIE验证
// let sUserId = getCookie(cookieUserId);
// if (sUserId) {
//   store.commit('setToken', {
//     token: sUserId
//   });
// }
