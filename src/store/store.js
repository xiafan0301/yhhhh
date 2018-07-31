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
  loginUser: {},
  // 面包屑
  breadcrumb: [],
  progressIndex: 1, // 添加板块的进度条索引
  plateConfigInfo: [], // 根据configId获取的板块配置信息
  plateInfo: {}, // 板块信息
  typeArr: [], // 类型不为1的对象
  oneType: [],
  styleType: 1, // 左右两侧、地图区域
  mapPageDataList: [], // 页面中已有的数据
  mapMageId: '', // 页面id
  editPlateInfo: {}, // 板块已有的数据
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
