/**
 * 同城容灾-产品组件
 */
import React from 'react'
import { Alert } from 'antd'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import {
  Region,
  RecoveryBaseInfo,
  BaseInfo,
  DisasterRecoveryConfig,
} from '@/components/OperationCenter/Product/base'
import { FORM_ICON } from '../base/_constant'
import FormComment from './base/FormComment'

function DisasterRecoveryForm ({ formProps, batch, initData }) {
  return (
    <div>
      <Alert
        style={{ marginBottom: 20 }}
        message='"同城容灾"服务目前只支持"主中心-专有云区"中RDS-PgSQL、RDS-PPAS、Redis、OSS、ECS、SLB产品，其他区域与产品正在上线中'
        type="info"
        showIcon
      />
      <LeftTitle title="区域" icon={FORM_ICON.REGION}>
        <Region {...formProps} />
      </LeftTitle>
      {!batch && (
        <LeftTitle title="基础信息" icon={FORM_ICON.BASE_INFO}>
          {/* <RecoveryBaseInfo {...formProps} /> */}
          <BaseInfo {...formProps} />
        </LeftTitle>
      )}
      <DisasterRecoveryConfig {...formProps} initData={initData} />
      <FormComment {...formProps} />
    </div>
  )
}

export default DisasterRecoveryForm
