/**
 * 异地备份产品配置组件
 */
import React from 'react'
import RecoveryList from '@/components/OperationCenter/RecoveryList'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import styles from '../../style.less'
import { FORM_ICON } from '../_constant'

function BackUpConfig ({ form, formItemLayout, initData }) {
  const formProps = {
    form,
    formItemLayout,
  }
  return (
    <div className={styles['left-content']} style={{ minHeight: 350 }}>
      <LeftTitle title="请选择需要创建异地备份的资源实例" icon={FORM_ICON.CONFIG} noDivider>
        <RecoveryList {...formProps} initData={initData} />
      </LeftTitle>
    </div>
  )
}

export default BackUpConfig
