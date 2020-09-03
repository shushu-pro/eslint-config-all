/**
 * DATAHUB-产品组件
 */
import React from 'react'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import {
  Region,
  BaseInfo,
  DATAHUBConfig,
} from '@/components/OperationCenter/Product/base'
import { FORM_ICON } from '../base/_constant'
import FormComment from './base/FormComment'

function DATAHUBForm ({ formProps, batch }) {
  return (
    <>
      <LeftTitle title="区域" icon={FORM_ICON.REGION}>
        <Region {...formProps} />
      </LeftTitle>
      {!batch && (
        <LeftTitle title="基础信息" icon={FORM_ICON.BASE_INFO}>
          <BaseInfo {...formProps} />
        </LeftTitle>
      )}

      <LeftTitle title="配置" icon={FORM_ICON.CONFIG}>
        <DATAHUBConfig
          {...formProps}
        />
      </LeftTitle>
      <FormComment {...formProps} />
    </>
  )
}

export default DATAHUBForm
