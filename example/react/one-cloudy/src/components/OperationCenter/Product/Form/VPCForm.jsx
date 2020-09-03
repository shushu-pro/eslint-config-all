/**
 * VPC-产品组件
 */
import React from 'react'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import {
  Region,
  BaseInfo,
  VPCConfig,
  SwitchConfig,
} from '@/components/OperationCenter/Product/base'
import { FORM_ICON } from '../base/_constant'
import FormComment from './base/FormComment'

function VPCForm ({ formProps, batch }) {
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
      <LeftTitle title="专有网络配置" icon={FORM_ICON.CONFIG}>
        <VPCConfig {...formProps} />
      </LeftTitle>
      <LeftTitle title="交换机配置" icon={FORM_ICON.CONFIG}>
        <SwitchConfig {...formProps} />
      </LeftTitle>
      <FormComment {...formProps} />
    </>
  )
}

export default VPCForm
