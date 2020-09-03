/**
 * RadioButton组件
 * 带注释、支持key-value同时获取
 * @param {string|array[string]} id id可以传单个，或两个，两个用于表单既存key又存value的情况（数据回显，或者后端需要两个参数
 * 只有id传多个的时候才会订阅onFormChange事件，启动多个的处理逻辑
 * @param optionData select的选择列表，当id为多个的时候必须拥有key，value属性
 */
import React from 'react'
import { RadioItem } from '../../FormItem'
import connectName from './connectName'
import styles from '../style.less'

@connectName
class RadioButton extends React.Component {
  render () {
    const { form, formItemLayout, label, tip, placeholder, optionData, ...arg } = this.props
    return (
      <>
        <RadioItem
          label={label}
          className="product-item"
          placeholder={placeholder || label}
          form={form}
          formItemLayout={formItemLayout}
          optionData={optionData}
          {...arg}
        />
        {tip && <p className={styles.tip}>{tip}</p>}
      </>
    )
  }
}

export default RadioButton
