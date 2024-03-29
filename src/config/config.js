// 是否使用本地API接口
export const localAPI = false;
// 是否使用线上API接口
export const publicAPI = false;
// ctx
export const ctx = 'vis';

/*
 * 域名地址
 * dev 开发环境
 * test 测试环境
 * prod 生产环境
 * */
const oDomains = {
  // ajax开发地址
  domain: {
    // 本地配置 localhost:8801
    // http://10.116.64.145:8082 赵志远
    // test http://10.16.4.41:8082  dev http://10.16.4.41:8081
    dev: 'http://10.16.4.41:8081',
    test: 'http://10.16.4.41:8082',
    prod: 'http://10.16.4.41:8082'
  },
  // 文件/图片/CDN地址
  fileDomain: {
    dev: 'http://swift.aorise.org:8090/v1/AUTH_a415edee1cbd404795977372009b51dd/travel-pub',
    test: 'http://swift.aorise.org:8090/v1/AUTH_a415edee1cbd404795977372009b51dd/travel-pub',
    prod: 'http://swift.aorise.org:8090/v1/AUTH_a415edee1cbd404795977372009b51dd/travel-pub'
  },
  // 上传地址
  uploadDomain: {
    dev: 'http://10.16.4.50:8084',
    test: 'http://10.16.4.50:8084',
    prod: 'http://10.16.4.50:8084'
  }
};
let sENV = 'dev';
if (process.env.NODE_ENV === 'production') {
  let buildEnv = process.env.BUILD_ENV;
  if (buildEnv && buildEnv.toLowerCase() === 'test') {
    // npm run build -- test
    sENV = 'test';
  } else {
    // npm run build / npm run build -- prod
    sENV = 'prod';
  }
} else if (process.env.NODE_ENV === 'development') {
  sENV = 'dev';
}
console.log('environment', sENV)
// ajax default
export const ajaxCtx = oDomains.domain[sENV] + '/api/ly';
// 文件上传地址
export const fileUploadUrl = oDomains.uploadDomain[sENV];
// 图片所在域名地址
export const imgBaseUrl = oDomains.fileDomain[sENV] + '/';
// 文件所在域名地址
export const fileBaseUrl = oDomains.fileDomain[sENV] + '/';

// cookie名
export const cookieUserId = 'sc.vis_id';
export const cookieUserName = 'sc.vis_name';
// cookie默认有效时间（小时）
export const cookieTime = 24;
