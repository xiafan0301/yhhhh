// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from '@/components/App.vue';
// axios
import '@/config/axios.js';
// include
import '@/config/include.js';

// 通用store
import store from '@/store/store.js';

// router
import router from './router/index.js';

// 关闭生产模式下给出的提示
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
