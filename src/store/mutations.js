
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
  // 设置基础路径
  setBaseUrl (state, options) {
    state.ajaxCtx = options.ajaxCtx;
    state.imgBaseUrl = options.imgBaseUrl;
    state.fileBaseUrl = options.fileBaseUrl;
    state.fileUploadUrl = options.fileUploadUrl;
    state.fileDownloadUrl = options.fileDownloadUrl;
  }
}
