/**
 * ODPS-产品组件
 */
import React from 'react'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import {
  Region,
  BaseInfo,
  ODPSConfig,
} from '@/components/OperationCenter/Product/base'
import { IDENTIFIED_KEY, getData, FORM_ICON } from '../base/_constant'
import FormComment from './base/FormComment'

function ODPSForm ({ formProps, batch, resourceData }) {
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
        <ODPSConfig
          {...formProps}
          kubermeteList={getData(resourceData, IDENTIFIED_KEY.KUBERMETES_VERSION)}
          nodeChargeList={getData(resourceData, IDENTIFIED_KEY.NODE_CHARGE_TYPE)}
        />
      </LeftTitle>
      <FormComment {...formProps} />
    </>
  )
}

export default ODPSForm
