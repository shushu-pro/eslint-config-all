import React from 'react'
import { Select } from 'antd'
import LabelItem from '../LabelItem'

class LabelSelect extends LabelItem {
  renderItem ({ decorator, placeholder, restProps }) {
    const { Option } = Select
    const { options } = restProps
    const children = options.map(({ value, text }) => <Option key={value}>{text}</Option>)
    return (
      <span>
        {decorator(
          <Select placeholder={placeholder} {...restProps}>
            {children}
          </Select>,
        )}
      </span>
    )
  }
}

export default LabelSelect
