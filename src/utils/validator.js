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
