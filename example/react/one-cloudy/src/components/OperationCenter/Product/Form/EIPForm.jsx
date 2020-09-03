/**
 * EIP-产品组件
 */
import React from 'react'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import { Region, BaseInfo, EIPConfig, Number } from '@/components/OperationCenter/Product/base'
import { IDENTIFIED_KEY, FORM_ICON, getData } from '../base/_constant'
import FormComment from './base/FormComment'

function EIPForm ({ formProps, batch, resourceData }) {
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
        <EIPConfig {...formProps} optionList={getData(resourceData, IDENTIFIED_KEY.BADWIDTH_PEAK_VALUE)} />
      </LeftTitle>
      <LeftTitle title="数量" icon={FORM_ICON.QUANTITY}>
        <Number {...formProps} tip="单次最多可开通20个弹性外网IP" max={20} label="申请个数" />
      </LeftTitle>
      <FormComment {...formProps} />
    </>
  )
}

export default EIPForm
