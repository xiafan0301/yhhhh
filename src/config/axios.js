/*
 * axios定义
 * */
import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';
// import store from '@/store/store.js';
import { ajaxCtx, ajaxCtx2, ajaxCtx4 } from '@/config/config.js';
// axios支持跨域cookie
axios.defaults.withCredentials = true;
// axios添加一个请求拦截器u
// /suersevice/...  A2/suersevice/...
axios.interceptors.request.use((config) => {
  if (config.url.indexOf('http') !== 0) {
    if (config.url.indexOf('A2') === 0) {
      config.url = ajaxCtx2 + config.url.substring(2);
    } else if (config.url.indexOf('A3') === 0) {
      console.log(config.url)
      config.url = ajaxCtx4 + config.url.substring(2);
    } else {
      config.url = ajaxCtx + config.url;
    }
  }
  let r = '_r=' + new Date().getTime();
  if (config.url.indexOf('?') > 0) {
    r = '&' + r;
  } else {
    r = '?' + r;
  }
  config.url = config.url + r;
  return config;
}, (error) => {
  console.log('地址：' + error.config.url + '请求失败！');
  return Promise.reject(error);
});
// axios添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log('response', response)
  if (response && response.data) {
    let _data = response.data;
    let msg = '';
    if (_data.code === '00000000') {
      return _data;
    } else if (_data.code === '10060002') {
      // 未登录
      msg = '登录已过期，请重新登录！';
      console.log(response.config.url)
      if (response.config.url.indexOf('emi') !== -1 || response.config.url.indexOf('auth') !== -1) {
        window.location.href = './ecc.html#/login';
      } else {
        window.location.href = './index.html#/login';
      }
      // window.location.reload();
    } else {
      msg = '访问出错';
      if (_data.viewMsg) {
        msg = _data.viewMsg;
      }
    }
    if (msg && msg.length > 0) {
      ElementUI.Message({ message: msg, type: 'error' });
    }
  } else {
    return null;
  }
}, function (error) {
  let errorMsg = '<span style="font-weight: bold; font-size: 13px; display: inline-block; padding-bottom: 5px;">操作失败</span><br/>' +
    '<span>请刷新页面重新操作，如果问题依旧存在，请联系管理员</span>';
  // 提示
  ElementUI.Message({
    message: errorMsg,
    dangerouslyUseHTMLString: true,
    type: 'error'
  });
  return Promise.reject(error);
});
Vue.prototype.axios = axios;
