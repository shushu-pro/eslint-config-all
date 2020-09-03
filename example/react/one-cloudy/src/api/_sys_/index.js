// https://github.com/sschen86/easy-mockapi

import ema from 'easy-mockapi2'
import { object } from 'fly-utils'
import { message, Modal } from 'antd'
import adapter from '@smartx/adapter'
import { mockJSON } from '@/util'

const env = process.env.NODE_ENV
export default function (configs) {
  return ema({
    env,
    baseURL: '/', // 基础路径
    timeout: 30000, // 接口超时时间，也可以单独在config中配置某个接口的超时时间
    configs, // 接口配置项
    logger: false,
    props: {
      reqa (value, valueType) { // 请求参数适配器
        if (valueType === 'function') {
          return data => value(data, adapter)
        }
        if (valueType === 'object') {
          return adapter(value).input
        }
      },
      resa (value, valueType) { // 响应数据适配器
        if (valueType === 'function') {
          return data => value(data, adapter)
        }
        if (valueType === 'object') {
          return adapter(value).input
        }
      },
      preventDefaultError: true,
      //  disabledCatch: true,
    },
    request (data, config) {
      if (env === 'production') {
        // 关闭生产环境中的mock
        if (/^\/?mockapi\//.test(config.url)) {
          config.url = config.url.replace('mockapi/', '')
        }
      }
      if (config.reqa) {
        object.emptyAssign(data, config.reqa(data))
      }
      const { mockData } = config
      if (mockData && typeof mockData === 'string') {
        config.mockData = params => mockJSON(mockData, params)
      }
    },
    response (resp, { responseType }) {
      // 二进制数据，直接返回
      if (responseType === 'arraybuffer') {
        return resp
      }

      const { data } = resp
      const { code } = data
      if (code === 1008) {
        throw Error('NO-LOGIN')
      }

      if (code !== 200) {
        throw Error(data.message || data.msg)
      }
      // 业务数据是放在响应数据的data字段下的，这样处理让success直接使用业务数据
      if (data.resData) {
        resp.data = data.resData
      }
    },
    success (data, config) { // 正确响应处理器
      if (config.responseType === 'arraybuffer') {
        return data
      }

      // 对分页数据进行适配转化
      if (data && typeof data === 'object' && data.currPage > 0) {
        data.page = data.currPage
        data.total = data.totalCount
      }

      if (config.resa) {
        return config.resa(data)
      }
    },
    failure (error, config) { // 错误响应处理器
      // if (config.preventDefaultError) {
      //   return;
      // }
      if (error.message === 'NO-LOGIN') {
        return Modal.confirm({
          title: '确定重新登录',
          content: '登录信息已失效，点击取消继续留在该页面，或者重新登录',
          okText: '重新登录',
          width: 500,
          centered: true,
          onOk () {
            window.location.href = '/login'
          },
          onCancel () {},
        })
      }
      message.error(error.message || error.msg || '未知错误', 3)
      if (error.stack && env !== 'production') {
        console.error(error.stack)
      }
      throw error
    },
  })
}
