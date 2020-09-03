/**
 * 弹性伸缩组ESS-产品组件
 */
import React from 'react'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import { Region, BaseInfo, WhiteListConfig, ESSConfig, Number, Net, NATConfig } from '@/components/OperationCenter/Product/base'
import { IDENTIFIED_KEY, FORM_ICON, getData } from '../base/_constant'
import FormComment from './base/FormComment'

function ESSForm ({ formProps, batch, resourceData }) {
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
        <Net {...formProps} batch={batch} isPrivateOnly />
      </LeftTitle>
      <LeftTitle title="配置" icon={FORM_ICON.CONFIG}>
        <ESSConfig {...formProps} optionList={getData(resourceData, IDENTIFIED_KEY.REMOVAL_STRATEGY)} />
      </LeftTitle>
      <LeftTitle title="白名单配置" icon={FORM_ICON.CONFIG}>
        <WhiteListConfig {...formProps} />
      </LeftTitle>
      <FormComment {...formProps} />
    </>
  )
}

export default ESSForm
