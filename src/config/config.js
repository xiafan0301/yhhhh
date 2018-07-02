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

// 后台板块ID（key） 与 前端模板（value） 对应关系
export const plateRelations = {
  /* 首页 */
  'vis-plate-001': 'plate001', // 脱贫攻坚
  'vis-plate-002': 'plate002', // 公共资源
  'vis-plate-003': 'plate003', // 政务信息
  'vis-plate-004': 'plate004', // 社会民生
  'vis-plate-005': 'plate005', // 经济发展
  'vis-plate-006': 'plate006', // 生态环境
  /* 脱贫攻坚 */
  'vis-plate-011': 'plate011', // 贫困人口概述
  'vis-plate-012': 'plate012', // 贫困类型
  'vis-plate-013': 'plate013', // 民政补助
  'vis-plate-014': 'plate014', // 致贫原因
  'vis-plate-015': 'plate015', // 主要帮贫措施
  'vis-plate-016': 'plate016', // 脱贫进度
  /* 公共资源 */
  'vis-plate-021': 'plate021', //
  'vis-plate-022': 'plate022', //
  'vis-plate-023': 'plate023', //
  'vis-plate-024': 'plate024', //
  'vis-plate-025': 'plate025', //
  'vis-plate-026': 'plate026', //
  /* 政务信息 */
  'vis-plate-031': 'plate031', //
  'vis-plate-032': 'plate032', //
  'vis-plate-033': 'plate033', //
  'vis-plate-034': 'plate034', //
  'vis-plate-035': 'plate035', //
  'vis-plate-036': 'plate036', //
  /* 社会民生 */
  'vis-plate-041': 'plate041', // 文化教育
  'vis-plate-042': 'plate042', // 助学补贴
  'vis-plate-043': 'plate043', // 医疗卫生
  'vis-plate-044': 'plate044', // 居民收入
  'vis-plate-045': 'plate045', // 社会保障
  'vis-plate-046': 'plate046', // 人们生活
  /* 经济发展 */
  'vis-plate-051': 'plate051', //
  'vis-plate-052': 'plate052', //
  'vis-plate-053': 'plate053', //
  'vis-plate-054': 'plate054', //
  'vis-plate-055': 'plate055', //
  'vis-plate-056': 'plate056', //
  /* 生态环境 */
  'vis-plate-061': 'plate061', //
  'vis-plate-062': 'plate062', //
  'vis-plate-063': 'plate063', //
  'vis-plate-064': 'plate064', //
  'vis-plate-065': 'plate065', //
  'vis-plate-066': 'plate066', //
  /* test */
  'test': 'test'
};
