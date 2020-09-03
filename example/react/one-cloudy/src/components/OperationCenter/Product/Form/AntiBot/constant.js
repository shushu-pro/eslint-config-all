

import { PRODUCT_FIELDS, FIELD_MAP, IDENTIFIED_KEY } from '@/pages/OperationCenter/ResourceApply/constant'

export const NUMBER_ITEMS = [ {
  key: PRODUCT_FIELDS.ANTIBOT_PROT_DOMAIN,
  disabled: true,
  unit: '个',
  isReq: true,
  tips: '每10个域名配置限制支持1个一级域名',
  label: FIELD_MAP[PRODUCT_FIELDS.ANTIBOT_PROT_DOMAIN],
}, {
  key: PRODUCT_FIELDS.ANTIBOT_EXTEND_DOMAIN,
  isReq: false,
  disabled: false,
  unit: '个',
  tips: '每个扩展包内含10个域名，每10个域名配置限制支持1个一级域名',
  label: FIELD_MAP[PRODUCT_FIELDS.ANTIBOT_EXTEND_DOMAIN],
}, {
  key: PRODUCT_FIELDS.ANTIBOT_BUS_QPS,
  disabled: true,
  isReq: true,
  unit: '',
  tips: '',
  label: FIELD_MAP[PRODUCT_FIELDS.ANTIBOT_BUS_QPS],
}, {
  key: PRODUCT_FIELDS.ANTIBOT_EXTEND_QPS,
  disabled: false,
  isReq: false,
  unit: '',
  min: 4000,
  step: 4000,
  tips: '数值应为4000的整数倍',
  rules: [
    (rule, value, callback) => {
      if (value && value % 4000 !== 0) {
        return callback(new Error('数值应为4000的整数倍'))
      }
      return callback()
    },
  ],
  label: FIELD_MAP[PRODUCT_FIELDS.ANTIBOT_EXTEND_QPS],
}, {
  key: PRODUCT_FIELDS.ANTIBOT_SERV_BAND,
  disabled: true,
  isReq: true,
  unit: 'Mbps',
  tips: '',
  label: FIELD_MAP[PRODUCT_FIELDS.ANTIBOT_SERV_BAND],
}, {
  key: PRODUCT_FIELDS.ANTIBOT_EXTEND_BAND,
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
  label: FIELD_MAP[PRODUCT_FIELDS.ANTIBOT_EXTEND_BAND],
}, {
  key: PRODUCT_FIELDS.ANTIBOT_LOG_STOR,
  disabled: true,
  isReq: true,
  unit: 'T',
  tips: '',
  label: FIELD_MAP[PRODUCT_FIELDS.ANTIBOT_LOG_STOR],
}, {
  key: PRODUCT_FIELDS.ANTIBOT_PROT_SCHEME,
  disabled: true,
  isReq: true,
  unit: '',
  tips: '',
  label: FIELD_MAP[PRODUCT_FIELDS.ANTIBOT_PROT_SCHEME],
} ]
export const DISABLED_KEYS = {
  [IDENTIFIED_KEY.ANTIBOT_LOG_STOR]: {},
  [IDENTIFIED_KEY.ANTIBOT_PROT_DOMAIN]: {},
  [IDENTIFIED_KEY.ANTIBOT_SERV_BAND]: {},
  [IDENTIFIED_KEY.ANTIBOT_BUS_QPS]: {},
  [IDENTIFIED_KEY.ANTIBOT_PROT_SCHEME]: {},
}
