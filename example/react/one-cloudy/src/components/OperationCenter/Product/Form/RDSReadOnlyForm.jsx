/**
 * 云数据库RDS只读实例-产品组件
 */
import React from 'react'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import { Region, BaseInfo, RDSReadOnlyConfig, Number } from '@/components/OperationCenter/Product/base'
import { IDENTIFIED_KEY, getData, FORM_ICON } from '../base/_constant'
import FormComment from './base/FormComment'

function RDSReadOnlyForm ({ formProps, batch, resourceData }) {
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
        <RDSReadOnlyConfig {...formProps} optionList={getData(resourceData, IDENTIFIED_KEY.DB_TYPE)} />
      </LeftTitle>
      <LeftTitle title="数量" icon={FORM_ICON.QUANTITY}>
        <Number
          {...formProps}
          tip="最多可批量创建5个RDS只读实例"
          max={5}
          label="申请台数"
        />
      </LeftTitle>
      <FormComment {...formProps} />
    </>
  )
}

export default RDSReadOnlyForm
