/*
* rule
*  可自定义属性
*/
// ipv4
export const checkIp4 = (rule, value, callback) => {
  if (value) {
    let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if (!reg.test(value)) {
      return callback(new Error('请输入有效的IP地址'));
    }
  }
  callback();
};
// ipv4
export const checkGps = (rule, value, callback) => {
  if (value) {
    let aGps = value.split(',');
    let longitude = aGps[0], latitude = aGps[1];
    let lon = /^-?((0|[1-9]\d?|1[1-7]\d)(\.\d{1,7})?|180(\.0{1,7})?)?$/;
    let lat = /^-?((0|[1-8]\d|)(\.\d{1,7})?|90(\.0{1,7})?)?$/;
    let lonRe = new RegExp(lon), latRe = new RegExp(lat);
    // alert(lonRe.test(longitude)); // 返回true OR  false
    if (!lonRe.test(longitude)) {
      return callback(new Error('经度不符合规范：经度整数部分为0-180,小数部分为0-6位！'));
    }
    if (!latRe.test(latitude)) {
      return callback(new Error('纬度不符合规范：纬度整数部分为0-90,小数部分为0-6位！'));
    }
  }
  callback();
};
// 验证手机号
export const valiPhone = (rule, value, callback) => {
  if (value) {
    let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!reg.test(value)) {
      return callback(new Error('请输入正确的手机号码'));
    }
  }
  callback();
};
// 验证经纬度
export const valicoordinate = (rule, value, callback) => {
  if (value.split(',')[0] > 180) {
    callback(new Error('经度必须少于180'));
  } else {
    if (value.split(',')[1] > 90) {
      callback(new Error('纬度必须少于90'));
    }
  }
  if (!Number.isInteger(value.split(',')[0])) {
    callback(new Error('经度必须为数字'));
  } else if (!Number.isInteger(value.split(',')[1])) {
    callback(new Error('纬度必须为数字'));
  }
  callback();
};
