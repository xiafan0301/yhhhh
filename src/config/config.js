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
  /*
   10.16.4.18:8080    http://emi.aorise.org
   10.16.4.24:8080    http://apiemi.aorise.org
   10.16.4.41:8083   http://newsemi.aorise.org
   10.16.4.41:8083   ws://newswsemi.aorise.org
   10.16.4.50:8001  http://uploademi.aorise.org
   10.16.2.88:8443   http://vedioemi.aorise.org
   10.16.2.88:8443   ws://wsemi.aorise.org
   222.244.147.121:3479 */
  // ajax开发地址
  domain: {
    // 本地配置 localhost:8902
    // test http://10.16.3.40:8080  dev http://10.16.3.40:8080
    dev: 'http://apidev.aorise.org/visual-vis',
    test: 'http://apirel.aorise.org/visual-vis',
    prod: 'http://apirel.aorise.org/visual-vis'
  },
  // ajax开发地址
  domain2: {
    // 本地配置 localhost:8902
    // dev: 'http://10.116.64.169:8084',
    dev: 'http://apidev.aorise.org/visual-emi',
    test: 'http://apirel.aorise.org/visual-emi',
    prod: 'http://apirel.aorise.org/visual-emi'
  },
  // 查看事件分布地址
  domain3: {
    dev: 'http://webdev.aorise.org/web-vis',
    test: 'http://webrel.aorise.org/web-vis',
    prod: 'http://webrel.aorise.org/web-vis'
  },
  // 智慧城市公共服务（用于APP版本管理服务、）
  commonDomain: {
    dev: 'http://apidev.aorise.org/smart-city-common',
    test: 'http://apidev.aorise.org/smart-city-common',
    prod: 'http://apidev.aorise.org/smart-city-common'
  },
  // 文件/图片/CDN地址
  fileDomain: {
    dev: 'http://10.16.3.40:8080',
    test: 'http://10.16.4.18:8080',
    prod: 'http://emi.aorise.org'
  },
  // 文件/图片/CDN地址
  fileDomain2: {
    dev: 'http://10.16.4.50:8084',
    test: 'http://10.16.4.50:8084',
    prod: 'http://uploademi.aorise.org'
  },
  // 上传地址
  uploadDomain: {
    dev: 'http://10.16.3.40:8080',
    test: 'http://10.16.4.18:8080',
    prod: 'http://emi.aorise.org'
  }
};
let sENV = 'dev';
if (process.env.NODE_ENV === 'production') {
  let buildEnv = process.env.BUILD_ENV;
  if (buildEnv && buildEnv.toLowerCase() === 'test') {
    // npm run build -- test
    sENV = 'test';
  } else if (buildEnv && buildEnv.toLowerCase() === 'dev') {
    // npm run build -- dev
    sENV = 'dev';
  } else {
    // npm run build / npm run build -- prod
    sENV = 'prod';
  }
}
console.log('environment', sENV);
// ajax default
export const ajaxCtx = oDomains.domain[sENV] + '/api/vis';
export const ajaxCtx2 = oDomains.domain2[sENV] + '/api/emi';
// 用户权限
export const ajaxCtx4 = oDomains.domain2[sENV] + '/api/auth';
export const ajaxCtx3 = oDomains.domain3[sENV] + '/views/ecc.html#';
// 智慧城市公共服务（用于APP版本管理服务、）
export const ajaxCtxCommon = oDomains.commonDomain[sENV];
// 文件上传地址
export const fileUploadUrl = oDomains.uploadDomain[sENV] + '/api/vis';
// 图片所在域名地址
export const imgBaseUrl = oDomains.fileDomain[sENV] + '/';
export const imgBaseUrl2 = oDomains.fileDomain2[sENV] + '/api/network';
// 文件所在域名地址
export const fileBaseUrl = oDomains.fileDomain[sENV] + '/';

// cookie名
export const cookieUserId = 'sc.vis_id';
export const cookieUserName = 'sc.vis_name';
export const cookieStatus = 'sc.vis_status';
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

// 高德地图 溆浦县 adcode
export const mapXupuxian = {
  adcode: '431224',
  name: '溆浦县',
  center: [110.596015, 27.907662]
};
