

import { PRODUCT_FIELDS, FIELD_MAP, IDENTIFIED_KEY } from '@/pages/OperationCenter/ResourceApply/constant'

export const NUMBER_ITEMS = [ {
  key: PRODUCT_FIELDS.DDOSIP_ABLE,
  disabled: true,
  unit: 'GB',
  isReq: true,
  tips: '',
  label: FIELD_MAP[PRODUCT_FIELDS.DDOSIP_ABLE],
}, {
  key: PRODUCT_FIELDS.DDOSIP_SERV_BAND,
  isReq: true,
  disabled: true,
  unit: 'Mbps',
  tips: '',
  label: FIELD_MAP[PRODUCT_FIELDS.DDOSIP_SERV_BAND],
}, {
  key: PRODUCT_FIELDS.DDOSIP_EXTEND_BAND,
  disabled: false,
  isReq: false,
  unit: 'Mbps',
  min: 100,
  step: 100,
  tips: '数值应为100的整数倍',
  rules: [
    (rule, value, callback) => {
      if (value && value % 100 !== 0) {
        return callback(new Error('数值应为100的整数倍'))
      }
      return callback()
    },
  ],
  label: FIELD_MAP[PRODUCT_FIELDS.DDOSIP_EXTEND_BAND],
}, {
  key: PRODUCT_FIELDS.DDOSIP_PROT_DOMAIN,
  disabled: true,
  isReq: true,
  unit: '个',
  tips: '每10个域名配置限制支持1个一级域名',
  label: FIELD_MAP[PRODUCT_FIELDS.DDOSIP_PROT_DOMAIN],
}, {
  key: PRODUCT_FIELDS.DDOSIP_EXTEND_DOMAIN,
  isReq: false,
  disabled: false,
  unit: '个',
  tips: '每个扩展包内含10个域名，每10个域名配置限制支持1个一级域名',
  label: FIELD_MAP[PRODUCT_FIELDS.DDOSIP_EXTEND_DOMAIN],
}, {
  key: PRODUCT_FIELDS.DDOSIP_LOG_PKG,
  disabled: false,
  isReq: false,
  unit: 'T',
  min: 3,
  step: 3,
  tips: '数值应为3的整数倍',
  rules: [
    (rule, value, callback) => {
      if (value && value % 3 !== 0) {
        return callback(new Error('数值应为3的整数倍'))
      }
      return callback()
    },
  ],
  label: FIELD_MAP[PRODUCT_FIELDS.DDOSIP_LOG_PKG],
} ]
export const DISABLED_KEYS = {
  [IDENTIFIED_KEY.ANTIBOT_LOG_STOR]: {},
  [IDENTIFIED_KEY.ANTIBOT_PROT_DOMAIN]: {},
  [IDENTIFIED_KEY.ANTIBOT_SERV_BAND]: {},
  [IDENTIFIED_KEY.ANTIBOT_BUS_QPS]: {},
  [IDENTIFIED_KEY.ANTIBOT_PROT_SCHEME]: {},
}
