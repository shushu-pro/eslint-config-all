
import React from 'react'
import { Form, Input } from 'antd'
import styles from './LabelItem.less'

export default class LabelItem extends React.PureComponent {
  renderItem () {
    throw Error('请重写此方法')
  }

  render () {
    const {
      label,
      labelSpan = 4,
      tips,
      id,
      placeholder = `请输入${label}`,
      form,
      initialValue,
      required,
      type,
      pattern,
      message = `请输入${label}`,
      rules: rulesOrigin,
      width,
      ...restProps
    } = this.props
    const labelCol = { span: labelSpan }
    const wrapperCol = { span: 24 - labelSpan }
    let tipsContent = null
    if (tips) {
      if (typeof tips === 'string') {
        tipsContent = <span className={styles.tips}>tips</span>
      } else {
        tipsContent = tips
      }
    }

    const rules = []
    if (!rulesOrigin) {
      rules.push({
        type,
        pattern,
        required,
        message,
      })
    } else {
      rules.push(...rulesOrigin)
    }
    if (width) {
      restProps.style = {
        ...restProps.style,
        // 数字或者数字字符串，都加上单位px
        width: (typeof width === 'number' || (typeof width === 'string' && /^\d+$/.test(width))) ? `${width}px` : width,
      }
    }

    const decorator = form.getFieldDecorator(id, {
      initialValue,
      rules,
    })
    return (
      <Form.Item label={label} labelCol={labelCol} wrapperCol={wrapperCol} className={styles.LabelItem}>
        {this.renderItem({ placeholder, decorator, restProps })}
        {tipsContent && tipsContent}
      </Form.Item>
    )
  }
}
