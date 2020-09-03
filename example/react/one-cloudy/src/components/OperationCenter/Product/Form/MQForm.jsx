/**
 * MQ-产品组件
 */
import React from 'react'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import { Region, BaseInfo, MQConfig } from '@/components/OperationCenter/Product/base'
import { FORM_ICON } from '../base/_constant'
import FormComment from './base/FormComment'

function MQForm ({ formProps, batch, resourceData, initData }) {
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
        <MQConfig {...formProps} resourceData={resourceData} initData={initData} />
      </LeftTitle>
      <FormComment {...formProps} />
    </>
  )
}

export default MQForm
