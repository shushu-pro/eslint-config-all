/**
 * 通用的配置组件（数据库审计，堡垒机）
 */
import React from 'react'
import { Number } from '../index'
import { PRODUCT_FIELDS } from '../_constant'

class DbauditEipConfig extends React.PureComponent {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    const {
      form, formItemLayout, eipWidthList,
    } = this.props
    let eipBandwidth = ''
    if (eipWidthList.length && eipWidthList.length < 2) {
      eipWidthList.map((item) => {
        eipBandwidth = item.label
      })
    }
    return (
      <Number
        id={PRODUCT_FIELDS.EIPBAND_WIDTH}
        required
        label="EIP带宽"
        form={form}
        formItemLayout={formItemLayout}
        unit="Mbps"
        value={eipBandwidth}
        initialValue={eipBandwidth}
        disabled
      />
    )
  }
}

export default DbauditEipConfig
