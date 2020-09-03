/**
 * ENCForm-加密机组件
 */
import React from 'react'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import { Region, BaseInfo, Number } from '@/components/OperationCenter/Product/base'
import { FORM_ICON } from '../base/_constant'
import FormComment from './base/FormComment'

function ENCRForm ({ formProps, batch, resourceData }) {
  const infos = { ...resourceData, ...formProps }
  return (
    <>
      <LeftTitle title="区域" icon={FORM_ICON.REGION}>
        <Region {...formProps} isNewLine tip="不同区域之间的产品内网不互通，选择后不支持更改区域" />
      </LeftTitle>
      {!batch && (
        <LeftTitle title="基础信息" icon={FORM_ICON.BASE_INFO}>
          <BaseInfo {...infos} isWAF="true" />
        </LeftTitle>
      )}
      <LeftTitle title="数量" icon={FORM_ICON.QUANTITY}>
        <Number {...formProps} min={1} max={9999} label="申请台数" />
      </LeftTitle>
      <FormComment {...formProps} />
    </>
  )
}

export default ENCRForm
