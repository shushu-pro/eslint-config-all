/**
 * HybridDBForPostgreSQL-产品组件
 */
import React from 'react'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import { Region, HybridDBForPostgreSQLConfig, BaseInfo, Net } from '@/components/OperationCenter/Product/base'
import { IDENTIFIED_KEY, getData, FORM_ICON } from '../base/_constant'
import FormComment from './base/FormComment'

function HybridDBForPostgreSQLForm ({ formProps, batch, resourceData }) {
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
        <HybridDBForPostgreSQLConfig
          {...formProps}
          storageTypeList={getData(resourceData, IDENTIFIED_KEY.STORAGE_TYPE)}
          engineSpecList={getData(resourceData, IDENTIFIED_KEY.ENGINE)}
          optionList={getData(resourceData, IDENTIFIED_KEY.NODE_SPEC)}
        />
      </LeftTitle>
      <FormComment {...formProps} />
    </>
  )
}

export default HybridDBForPostgreSQLForm
