/**
 * Other-产品组件
 */
import React from 'react'
import { Alert } from 'antd'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import { Region, BaseInfo, OtherConfig } from '@/components/OperationCenter/Product/base'
import { FORM_ICON } from '../base/_constant'
import FormComment from './base/FormComment'

function OtherForm ({ formProps, batch }) {
  return (
    <>
      <Alert
        style={{ marginBottom: 20 }}
        message="该产品的自动开通正在开发中，请将资源配置信息以文字形式录入，运维人员会根据信息进行人工开通。"
        type="info"
        showIcon
      />
      <LeftTitle title="区域" icon={FORM_ICON.REGION}>
        <Region {...formProps} />
      </LeftTitle>
      {!batch && (
        <LeftTitle title="基础信息" icon={FORM_ICON.BASE_INFO}>
          <BaseInfo {...formProps} />
        </LeftTitle>
      )}
      <LeftTitle title="配置" icon={FORM_ICON.CONFIG}>
        <OtherConfig {...formProps} />
      </LeftTitle>
      <FormComment {...formProps} />
    </>
  )
}

export default OtherForm
