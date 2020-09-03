/**
 * Redis-产品组件
 */
import React from 'react'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import { Region, Net, BaseInfo, RedisConfig } from '@/components/OperationCenter/Product/base'
import { IDENTIFIED_KEY, getData, FORM_ICON } from '../base/_constant'
import FormComment from './base/FormComment'

function RedisForm ({ formProps, batch, resourceData, initData }) {
  return (
    <>
      <LeftTitle title="区域" icon={FORM_ICON.REGION}>
        <Region {...formProps} isRedis />
      </LeftTitle>
      {!batch && (
        <LeftTitle title="基础信息" icon={FORM_ICON.BASE_INFO}>
          <BaseInfo {...formProps} isShowUpload />
        </LeftTitle>
      )}
      <LeftTitle title="网络" icon={FORM_ICON.NET}>
        <Net {...formProps} batch={batch} />
      </LeftTitle>
      <LeftTitle title="配置" icon={FORM_ICON.CONFIG}>
        <RedisConfig
          {...formProps}
          optionList={getData(resourceData, IDENTIFIED_KEY.ARCHITECTURE_TYPE)}
          nodeTypeList={getData(resourceData, IDENTIFIED_KEY.NODE_TYPE)}
          versionList={getData(resourceData, IDENTIFIED_KEY.ENGINE_VERSION)}
          initData={initData}
        />
      </LeftTitle>
      <FormComment {...formProps} />
    </>
  )
}

export default RedisForm
