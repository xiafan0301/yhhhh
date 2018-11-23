
export default {
  // CTX
  setCtx (state, options) {
    state.ctx = options.ctx;
  },
  // 登录用户
  setLoginUser (state, options) {
    state.loginUser = options.loginUser;
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
  // 版块配置信息
  setConfigInfo (state, options) {
    state.plateConfigInfo = options.plateConfigInfo;
  },
  // 版块信息
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
  setMapPageId (state, options) {
    state.mapPageId = options.mapPageId;
  },
  setEditPlateInfo (state, options) {
    state.editPlateInfo = options.editPlateInfo;
  },
  // 设置基础路径
  setBaseUrl (state, options) {
    state.ajaxCtx = options.ajaxCtx;
    state.imgBaseUrl = options.imgBaseUrl;
    state.fileBaseUrl = options.fileBaseUrl;
    state.fileUploadUrl = options.fileUploadUrl;
    state.fileDownloadUrl = options.fileDownloadUrl;
  },
  // 保存新建演练第一步的数据
  saveSimEventData (state, options) {
    state.currentPage = options.currentPage;
    state.simEventDataInfo = options.simEventDataInfo;
    state.taskList = options.taskList;
    state.replanList = options.replanList;
  }
}
