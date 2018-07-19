
export default {
  // CTX
  setCtx (state, options) {
    state.ctx = options.ctx;
  },
  // 登录状态token
  setToken (state, options) {
    state.token = options.token;
  },
  // 面包屑
  setBreadcrumb (state, options) {
    state.breadcrumb = options.breadcrumb;
  },
  // 进度条
  setProgressIndex (state, options) {
    state.progressIndex = options.progressIndex;
  },
  // 板块配置信息
  setConfigInfo (state, options) {
    state.plateConfigInfo = options.plateConfigInfo;
  },
  // 板块信息
  setPlateInfo (state, options) {
    state.plateInfo = options.plateInfo;
  },
  // 所有页面
  getAllPageList (state, options) {
    state.allPageList = options.allPageList;
  }
}
