import React from 'react'
import { Input } from 'antd'
import LabelItem from '../LabelItem'

class LabelInput extends LabelItem {
  renderItem ({ decorator, placeholder, restProps }) {
    return (
      <span>
        {decorator(<Input placeholder={placeholder} {...restProps} />)}
      </span>
    )
  }
}

export default LabelInput
