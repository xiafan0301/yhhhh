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
    // 本地配置 localhost:8902
    // test http://10.16.3.40:8080  dev http://10.16.3.40:8080
    dev: 'http://10.16.3.40:8080',
    // dev: 'http://10.16.4.18:8080',
    test: 'http://10.16.4.18:8080',
    prod: 'http://10.16.4.18:8080'
  },
  // ajax开发地址
  domain2: {
    // 本地配置 localhost:8902
    // test http://10.16.3.40:8080  dev http://10.16.3.40:8080
    // dev: 'http://10.16.3.40:8080',
    dev: 'http://10.16.3.43:8080',
    test: 'http://10.16.4.18:8080',
    prod: 'http://10.16.4.18:8080'
  },
  // 查看事件分布地址
  domain3: {
    dev: 'http://10.16.4.37:8071'
  },
  // 文件/图片/CDN地址
  fileDomain: {
    dev: 'http://10.16.3.40:8080',
    test: 'http://10.16.4.18:8080',
    prod: 'http://10.16.4.18:8080'
  },
  // 上传地址
  uploadDomain: {
    dev: 'http://10.16.3.40:8080',
    test: 'http://10.16.4.18:8080',
    prod: 'http://10.16.4.18:8080'
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
console.log('environment', sENV);
// ajax default
export const ajaxCtx = oDomains.domain[sENV] + '/api/vis';
export const ajaxCtx2 = oDomains.domain2[sENV] + '/api/emi';
export const ajaxCtx3 = oDomains.domain3[sENV] + '/views/ecc.html#';
// 文件上传地址
export const fileUploadUrl = oDomains.uploadDomain[sENV] + '/api/vis';
// 图片所在域名地址
export const imgBaseUrl = oDomains.fileDomain[sENV] + '/';
// 文件所在域名地址
export const fileBaseUrl = oDomains.fileDomain[sENV] + '/';

// cookie名
export const cookieUserId = 'sc.vis_id';
export const cookieUserName = 'sc.vis_name';
// cookie默认有效时间（小时）
export const cookieTime = 24;

/*
* dataType: 1基础数据
*
* */
export const plateConfigData = {
  plate001: {
    dataType: 1,
    limit: [5] // 0不限制  >0限制
  }
};
