export const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
}
export const baseFormItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
}
export const billDetailLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}


// 预发登陆地址
const envss = {
  site: 'http://59.202.54.125:18000',
  dev: 'http://59.202.54.125:18000',
  pro: 'https://login.cloud.zj.gov.cn',
}

// 开发登陆地址
const envssDev = {
  site: 'http://59.202.49.160:18000',
  dev: 'http://59.202.49.160:18000',
  pro: 'https://login.cloud.zj.gov.cn',
}

// 测试登陆地址
const envssTest = {
  site: 'http://59.202.54.236:18000',
  dev: 'http://59.202.54.236:18000',
  pro: 'https://login.cloud.zj.gov.cn',
}

// 新测试登陆地址
const envssTestNew = {
  site: 'http://59.202.49.160:10000',
  dev: 'http://59.202.49.160:10000',
  pro: 'https://login.cloud.zj.gov.cn',
}


// 测试与预发环境登录请使用envss，开发环境登录使用envssDev，方便本地代码可以不用切换分支进行多环境测试
export const loginOrgin = envssTestNew[ENV] || 'https://login.cloud.zj.gov.cn'
const { origin } = window.location
const url = `${origin}/manage`
export const LOGOUT_URL = `${loginOrgin}/auth/realms/master/protocol/openid-connect/auth?client_id=onecloud&response_type=code&scope=super&&redirect_uri=${url}`
