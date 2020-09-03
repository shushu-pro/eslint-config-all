/**
 * ECS|堡垒机-产品组件
 */
import React from 'react'
import { Alert } from 'antd'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import {
  Region,
  Net,
  Mirror,
  Number,
  ECSConfig,
  BaseInfo,
  Storage,
  EIPRelationConfig,
} from '@/components/OperationCenter/Product/base'
import { IDENTIFIED_KEY, getData, FORM_ICON, PRODUCT_TYPE } from '../base/_constant'
import FormComment from './base/FormComment'

function ECSForm ({ formProps, batch, resourceData }) {
  return (
    <>
      <Alert
        style={{ marginBottom: 20 }}
        message="ECS开通的同时，默认同时开通“态势感知”和“安骑士”。"
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
      <LeftTitle title="网络" icon={FORM_ICON.NET}>
        <Net {...formProps} securityGroup batch={batch} isPrivateOnly />
      </LeftTitle>
      <LeftTitle title="配置" icon={FORM_ICON.CONFIG}>
        <ECSConfig
          {...formProps}
          optionList={getData(resourceData, IDENTIFIED_KEY.INSTANCE_TYPE)}
        />
      </LeftTitle>
      <LeftTitle title="镜像" icon={FORM_ICON.MIRROR}>
        <Mirror {...formProps} optionList={getData(resourceData, IDENTIFIED_KEY.IMAGE_TYPE)} />
      </LeftTitle>
      <LeftTitle title="存储" icon={FORM_ICON.STORAGE}>
        <Storage {...formProps} optionList={resourceData} type={PRODUCT_TYPE.ECS} />
      </LeftTitle>
      <LeftTitle title="EIP" icon={FORM_ICON.EIP}>
        <EIPRelationConfig
          {...formProps}
        />
      </LeftTitle>
      <LeftTitle title="数量" icon={FORM_ICON.QUANTITY}>
        <Number
          {...formProps}
          tip="最多可批量创建50台ECS"
          max={50}
          label="申请台数"
        />
      </LeftTitle>
      <FormComment {...formProps} />
    </>
  )
}

export default ECSForm
