
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
  setType (state, options) {
    state.typeArr = options.typeArr;
  },
  setOneType (state, options) {
    state.oneType = options.oneType;
  },
  setStyleType (state, options) {
    state.styleType = options.styleType;
  },
  setMapDataList (state, options) {
    state.mapPageDataList = options.mapPageDataList;
  },
  setPageId (state, options) {
    state.pageId = options.pageId;
  },
  // 设置基础路径
  setBaseUrl (state, options) {
    state.ajaxCtx = options.ajaxCtx;
    state.imgBaseUrl = options.imgBaseUrl;
    state.fileBaseUrl = options.fileBaseUrl;
    state.fileUploadUrl = options.fileUploadUrl;
    state.fileDownloadUrl = options.fileDownloadUrl;
  }
}
