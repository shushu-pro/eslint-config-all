/**
 * RDS-产品组件
 */
import React from 'react'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import {
  Region,
  Net,
  BaseInfo,
  Number,
  RDSConfig,
} from '@/components/OperationCenter/Product/base'
import { IDENTIFIED_KEY, getData, FORM_ICON } from '../base/_constant'
import FormComment from './base/FormComment'

function RDSForm ({ formProps, batch, resourceData }) {
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
        <RDSConfig {...formProps} optionList={getData(resourceData, IDENTIFIED_KEY.DB_TYPE)} />
      </LeftTitle>
      <LeftTitle title="数量" icon={FORM_ICON.QUANTITY}>
        <Number {...formProps} tip="最多可批量创建20台RDS" max={20} label="申请台数" />
      </LeftTitle>
      <FormComment {...formProps} />
    </>
  )
}

export default RDSForm
