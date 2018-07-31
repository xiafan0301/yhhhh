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
import { cookieUserId, cookieUserName } from '@/config/config.js';
import { setCookie, getCookie } from '@/utils/util.js';
// 通用store
import store from '@/store/store.js';
// use element-ui 2.0
Vue.use(ElementUI);

let sUserId = getCookie(cookieUserId);
let sUserName = getCookie(cookieUserName);
console.log(sUserId + '=' + sUserId)
if (sUserId && sUserName) {
  store.commit('setLoginUser', {
    loginUser: {
      userId: sUserId,
      userName: sUserName
    }
  });
}
