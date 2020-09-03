/**
 * ADS-产品组件
 */
import React from 'react'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import {
  Region, BaseInfo, ADSConfig, Net, Number, ADSNumber,
} from '@/components/OperationCenter/Product/base'
import { IDENTIFIED_KEY, getData, FORM_ICON } from '../base/_constant'
import FormComment from './base/FormComment'

function ADSForm ({ formProps, batch, resourceData }) {
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
      <LeftTitle title="网络" icon={FORM_ICON.NET}>
        <Net {...formProps} securityGroup batch={batch} />
      </LeftTitle>
      <LeftTitle title="配置" icon={FORM_ICON.CONFIG}>
        <ADSConfig {...formProps} optionList={getData(resourceData, IDENTIFIED_KEY.ECU_SEPC)} />
      </LeftTitle>
      <LeftTitle title="数量" icon={FORM_ICON.QUANTITY}>
        <ADSNumber
          label="数量"
          {...formProps}
        />
      </LeftTitle>
      <FormComment {...formProps} />
    </>
  )
}

export default ADSForm
