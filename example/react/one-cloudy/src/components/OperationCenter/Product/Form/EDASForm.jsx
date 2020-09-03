/**
 * EDAS-产品组件
 */
import React from 'react'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import { Region, Net, BaseInfo, EDASConfig } from '@/components/OperationCenter/Product/base'
import { IDENTIFIED_KEY, getData, FORM_ICON } from '../base/_constant'
import FormComment from './base/FormComment'

function EDASForm ({ formProps, batch, resourceData }) {
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
        <Net isNAT required {...formProps} label="专有网络" batch={batch} />
      </LeftTitle>
      <LeftTitle title="配置" icon={FORM_ICON.CONFIG}>
        <EDASConfig
          {...formProps}
          batch={batch}
          optionList={getData(resourceData, IDENTIFIED_KEY.CONTAINER_VERSION)}
        />
      </LeftTitle>
      <FormComment {...formProps} />
    </>
  )
}

export default EDASForm
