/**
 * 其他产品配置组件
 */
import React from 'react'
import { Comment } from './index'
import { PRODUCT_FIELDS, FIELD_MAP } from './_constant'

function WhiteListConfig ({ form, formItemLayout, productType }) {
  return (
    <>
      <Comment
        label={
          FIELD_MAP[productType + PRODUCT_FIELDS.LOAD_BALANCE_DESC] || FIELD_MAP[PRODUCT_FIELDS.LOAD_BALANCE_DESC]
        }
        placeholder={
          FIELD_MAP[productType + PRODUCT_FIELDS.LOAD_BALANCE_DESC] || FIELD_MAP[PRODUCT_FIELDS.LOAD_BALANCE_DESC]
        }
        form={form}
        required={!!FIELD_MAP[productType + PRODUCT_FIELDS.LOAD_BALANCE_DESC]}
        formItemLayout={formItemLayout}
        id={PRODUCT_FIELDS.LOAD_BALANCE_DESC}
        tip={
          !FIELD_MAP[productType + PRODUCT_FIELDS.LOAD_BALANCE_DESC] &&
          '负载均衡白名单设置后无法修改或增减，请仔细核对'
        }
      />
      <Comment
        label={
          FIELD_MAP[productType + PRODUCT_FIELDS.DBDESC] || FIELD_MAP[PRODUCT_FIELDS.DBDESC]
        }
        placeholder={
          FIELD_MAP[productType + PRODUCT_FIELDS.DBDESC] || FIELD_MAP[PRODUCT_FIELDS.DBDESC]
        }
        form={form}
        required={!!FIELD_MAP[productType + PRODUCT_FIELDS.DBDESC]}
        formItemLayout={formItemLayout}
        id={PRODUCT_FIELDS.DBDESC}
        tip={
          !FIELD_MAP[productType + PRODUCT_FIELDS.DBDESC] &&
          '数据库白名单设置后无法修改或增减，请仔细核对'
        }
      />
    </>
  )
}

export default WhiteListConfig
