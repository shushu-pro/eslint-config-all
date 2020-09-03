/**
 * ACS-产品组件
 */
import React from 'react'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import {
  Region,
  BaseInfo,
  Comment,
} from '@/components/OperationCenter/Product/base'
import { PRODUCT_FIELDS, FORM_ICON, FIELD_MAP } from '../base/_constant'
import FormComment from './base/FormComment'

function AHASForm ({ formProps, batch, resourceData }) {
  return (
    <>
      <LeftTitle title="区域" icon={FORM_ICON.REGION}>
        <Region {...formProps} />
      </LeftTitle>
      {!batch && (
        <LeftTitle title="基础信息" icon={FORM_ICON.BASE_INFO}>
          <BaseInfo {...formProps} resourceData={resourceData} />
        </LeftTitle>
      )}
      <LeftTitle title="配置" icon={FORM_ICON.CONFIG}>
        <Comment
          {...formProps}
          placeholder={FIELD_MAP[PRODUCT_FIELDS.AHAS_OPEN_INST]}
          label={FIELD_MAP[PRODUCT_FIELDS.AHAS_OPEN_INST]}
          id={PRODUCT_FIELDS.AHAS_OPEN_INST}
        />
      </LeftTitle>
      <FormComment {...formProps} />
    </>
  )
}

export default AHASForm
