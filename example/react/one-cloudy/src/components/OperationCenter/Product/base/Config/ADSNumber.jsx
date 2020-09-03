/**
 * ADS配置组件
 */
import React from 'react'
import { Number } from '../index'
import styles from './index.less'

class ADSNumber extends React.PureComponent {
  render () {
    const {
      form, formItemLayout,
    } = this.props
    return (
      <>
        <Number
          label="数量"
          form={form}
          formItemLayout={formItemLayout}
          rules={[
            (rule, value, callback) => {
              if (value % 2 !== 0) {
                return callback(new Error('数量必须为偶数'))
              }
              return callback()
            },
          ]}
        />
        <div className={styles.ADSTips}>
          <span>这里的数量指的是ECU数量，只能为偶数个。</span>
          <span>为了方便审计与计费，ECU数量在申请单详情中会显示为实例数量。并不影响ADS的实际开通和使用，敬请理解。</span>
        </div>
      </>
    )
  }
}

export default ADSNumber
