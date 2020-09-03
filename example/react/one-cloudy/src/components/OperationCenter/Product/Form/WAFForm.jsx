/**
 * WAF-产品组件
 */
import React from 'react'
import { Alert } from 'antd'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import { Region, BaseInfo, WAFConfig } from '@/components/OperationCenter/Product/base'
import { FORM_ICON } from '../base/_constant'
import FormComment from './base/FormComment'
import styles from '../style.less'

function WAFForm ({ formProps, batch, initData }) {
  const message = (
    <div style={{ paddingLeft: 8 }}>
      <span>
        1.“页面申请”最多支持批量开通10个WAF资源，如需一次性开通更多WAF资源，请选择“附件申请”。
      </span>
      <br />
      <span>2.产品配置须使用部门安全管理员账号权限登录云盾控制台操作。</span>
      <br />
      <span>
        {' '}
        {/* 3.如需技术支持，请邮件单发security@01bees.com，并写明授权一朵云运维人员协助开通。 */}
      </span>
    </div>
  )
  const isWAF = true
  return (
    <>
      <LeftTitle title="区域" icon={FORM_ICON.REGION}>
        <Region {...formProps} />
      </LeftTitle>
      {!batch && (
        <LeftTitle title="基础信息" icon={FORM_ICON.BASE_INFO}>
          <BaseInfo {...formProps} isWAF={isWAF} />
        </LeftTitle>
      )}
      <Alert
        className={styles.wafIcon}
        style={{ marginBottom: 20 }}
        message={message}
        type="info"
        showIcon
      />
      <div className={styles.wafForm}>
        <LeftTitle title="">
          <WAFConfig {...formProps} initData={initData} />
        </LeftTitle>
      </div>

      <FormComment {...formProps} />
    </>
  )
}

export default WAFForm
