/**
 * NAS-产品组件
 */
import React from 'react'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import { Region, BaseInfo, NASConfig } from '@/components/OperationCenter/Product/base'
import { IDENTIFIED_KEY, getData, FORM_ICON } from '../base/_constant'
import FormComment from './base/FormComment'

function NASForm ({ formProps, batch, resourceData }) {
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
        <NASConfig
          {...formProps}
          capacityList={getData(resourceData, IDENTIFIED_KEY.STORAGE_TYPE)}
          packageList={getData(resourceData, IDENTIFIED_KEY.PACKAGE)}
          protocolList={getData(resourceData, IDENTIFIED_KEY.PROTOCOL_TYPE)}
        />
      </LeftTitle>
      <FormComment {...formProps} />
    </>
  )
}

export default NASForm
