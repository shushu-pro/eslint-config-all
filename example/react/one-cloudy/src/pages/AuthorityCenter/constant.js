export const DEFAULT_COLOR = '#1890ff';

// 将不同接口的不同参数名转换成组件表格中需要的字段名
export const matchParams = (str) => {
  switch (str) {
    case 'cloudUserName':
      return 'username';// 账号
    case 'cloudFullName':
      return 'fullname';// 显示名
    case 'cloudUserId':
      return 'userId';// 用户ID
    default:
      return str;
  }
};

// 将不同接口的不同参数名转换成组件表格中需要的字段名
export const swicthData = (list) => {
  const newList = [];
  list && list.forEach((obj) => {
    const newObj = {};
    const keyList = Object.keys(obj);
    keyList.forEach((i) => {
      newObj[matchParams(i)] = obj[i];
    });
    newList.push(newObj);
  });

  return newList;
};
