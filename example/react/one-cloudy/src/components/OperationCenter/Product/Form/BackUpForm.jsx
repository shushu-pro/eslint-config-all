/**
 * 异地被备灾-产品组件
 */
import React from 'react'
import { Alert } from 'antd'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import {
  Region, RecoveryBaseInfo, BaseInfo, BackUpConfig,
} from '@/components/OperationCenter/Product/base'
import { FORM_ICON } from '../base/_constant'
import FormComment from './base/FormComment'

class BackUpForm extends React.PureComponent {
  render () {
    const { formProps, batch, initData } = this.props
    return (
      <div>
        <Alert
          style={{ marginBottom: 20 }}
          message='"异地备份"服务目前只支持"主中心-专有云"中RDS-mysql，OSS产品，其他区域与产品正在上线中'
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
        <BackUpConfig {...formProps} initData={initData} />
        <FormComment {...formProps} />
      </div>
    )
  }
}

export default BackUpForm
