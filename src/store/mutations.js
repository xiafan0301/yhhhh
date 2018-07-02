
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
  }
}
