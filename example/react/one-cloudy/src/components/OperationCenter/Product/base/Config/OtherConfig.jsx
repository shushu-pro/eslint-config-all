/**
 * 其他产品配置组件
 */
import React from 'react'
import { Comment } from '../index'
import { PRODUCT_FIELDS, FIELD_MAP } from '../_constant'

function OtherConfig ({ form, formItemLayout, productType }) {
  return (
    <Comment
      label={
        FIELD_MAP[productType + PRODUCT_FIELDS.SPEC_REMARK] || FIELD_MAP[PRODUCT_FIELDS.SPEC_REMARK]
      }
      placeholder={
        FIELD_MAP[productType + PRODUCT_FIELDS.SPEC_REMARK] || FIELD_MAP[PRODUCT_FIELDS.SPEC_REMARK]
      }
      form={form}
      required={!!FIELD_MAP[productType + PRODUCT_FIELDS.SPEC_REMARK]}
      formItemLayout={formItemLayout}
      id={PRODUCT_FIELDS.SPEC_REMARK}
      tip={
        !FIELD_MAP[productType + PRODUCT_FIELDS.SPEC_REMARK] &&
        '请文字描述需要申请的资源的具体配置。当无法确认该资源规格时，可联系运维人员进行咨询。'
      }
    />
  )
}

export default OtherConfig
