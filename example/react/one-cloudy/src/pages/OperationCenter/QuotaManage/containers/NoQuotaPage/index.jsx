import React from 'react'
import { Icon } from 'antd'
import './style.less'

/**
 *
 * @param size  可选取值为default（'')或者small('small')
 */
export default function NoQuotaPage ({ text, size = '' }) {
  return (
    <div className={`no-quota-page ${size}`}>
      <Icon type="info-circle" />
      {text}
    </div>
  )
}
