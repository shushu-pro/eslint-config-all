/**
 * 同城容灾产品配置组件
 */
import React from 'react'
import DisasterRecoveryList from '@/components/OperationCenter/DisasterRecovery'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import styles from '../../style.less'
import { FORM_ICON } from '../_constant'

function DisasterRecoveryConfig ({ form, formItemLayout, initData }) {
  const formProps = {
    form,
    formItemLayout,
  }
  return (
    <div className={styles['left-content']} style={{ minHeight: 350 }}>
      <LeftTitle title="请选择需要创建同城容灾的资源实例" icon={FORM_ICON.CONFIG} noDivider>
        <DisasterRecoveryList {...formProps} initData={initData} />
      </LeftTitle>
    </div>
  )
}

export default DisasterRecoveryConfig
