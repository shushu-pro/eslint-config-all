/**
 * DatasmartForm-产品组件
 */
import React from 'react'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import {
  Region, BaseInfo, DataSmartConfig, DataSmartNumber,
} from '@/components/OperationCenter/Product/base'
import { IDENTIFIED_KEY, getData, FORM_ICON } from '../base/_constant'
import FormComment from './base/FormComment'

function DataSmartForm ({ formProps, batch, resourceData }) {
  return (
    <>
      <LeftTitle title="区域" icon={FORM_ICON.REGION}>
        <Region {...formProps} />
      </LeftTitle>
      {!batch && (
        <LeftTitle title="基础信息" icon={FORM_ICON.BASE_INFO}>
          <BaseInfo {...formProps} isWAF="true" />
        </LeftTitle>
      )}
      <LeftTitle title="申请信息" icon={FORM_ICON.CONFIG}>
        <DataSmartConfig
          {...formProps}
          optionList={getData(resourceData, IDENTIFIED_KEY.VERSION)}
        />
      </LeftTitle>
      <LeftTitle title="数量" icon={FORM_ICON.QUANTITY}>
        <DataSmartNumber
          {...formProps}
          max={999}
          label="申请数量"
        />
      </LeftTitle>
      <FormComment {...formProps} />
    </>
  )
}

export default DataSmartForm
