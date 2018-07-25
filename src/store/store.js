import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
// import { ctx } from '@/config/config.js';
Vue.use(Vuex);
const state = {
  // ctx: process.env.NODE_ENV === 'production' ? ('/' + ctx) : '',
  ctx: '',
  // 登录token
  token: null,
  // 面包屑
  breadcrumb: [],
  // 图片基础路径
  imgBaseUrl: '',
  // 文件基础路径
  fileBaseUrl: '',
  // 上传文件路径
  fileUploadUrl: '',
  // 下载文件路径
  fileDownloadUrl: ''
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
