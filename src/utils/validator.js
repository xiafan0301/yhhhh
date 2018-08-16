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
  callback();
};
