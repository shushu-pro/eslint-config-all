/**
 * ACS-产品组件
 */
import React from 'react'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import {
  Region,
  BaseInfo,
  ACSConfig,
  ACSMasterConfig,
  ACSWorkerConfig,
  // ACSNodeConfig,
  Net,
} from '@/components/OperationCenter/Product/base'
import { IDENTIFIED_KEY, getData, FORM_ICON } from '../base/_constant'
import FormComment from './base/FormComment'

function ADSForm ({
  formProps, batch, resourceData, initData,
}) {
  const isACS = true
  return (
    <>
      <LeftTitle title="区域" icon={FORM_ICON.REGION}>
        <Region {...formProps} />
      </LeftTitle>
      <LeftTitle title="基础信息" icon={FORM_ICON.BASE_INFO}>
        <BaseInfo {...formProps} />
      </LeftTitle>
      <LeftTitle title="网络" icon={FORM_ICON.NET}>
        <Net
          {...formProps}
          securityGroup
          batch={batch}
          isPrivateOnly
          isACS={isACS}

          optionList={[
            {
              key: '自动创建',
              value: '自动创建',
            },
          ]}
        />
      </LeftTitle>
      <LeftTitle title="配置" icon={FORM_ICON.CONFIG}>
        <ACSConfig
          {...formProps}
          kubermeteList={getData(resourceData, IDENTIFIED_KEY.KUBERMETES_VERSION)}
          nodeChargeList={getData(resourceData, IDENTIFIED_KEY.NODE_CHARGE_TYPE)}
          isACS={isACS}
        />
      </LeftTitle>
      <LeftTitle title="Master配置" icon={FORM_ICON.CONFIG}>
        <ACSMasterConfig
          {...formProps}
          optionList={getData(resourceData, IDENTIFIED_KEY.MASTER_INSTANCE_TYPE)}
          diskTypeList={getData(resourceData, IDENTIFIED_KEY.SYS_DISK_TYPE)}
        />
      </LeftTitle>
      <LeftTitle title="Worker配置" icon={FORM_ICON.CONFIG}>
        <ACSWorkerConfig
          {...formProps}
          optionList={getData(resourceData, IDENTIFIED_KEY.WORKER_INSTANCE_TYPE)}
          resourceData={resourceData}
          initData={initData}
        />
      </LeftTitle>
      {/* <LeftTitle title="节点配置" icon={FORM_ICON.CONFIG}>
        <ACSNodeConfig
          {...formProps}
          optionList={getData(resourceData, IDENTIFIED_KEY.NODE_POD_NUM)}
        />
      </LeftTitle> */}
      <FormComment {...formProps} />
    </>
  )
}

export default ADSForm
