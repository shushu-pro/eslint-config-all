import React, { Component } from 'react'
import { Radio } from 'antd'
import { REGION_ID_TEXT_MAP } from '@/pages/BillCenter/constant'

export default class ApplyDetailRegion extends Component {
  render () {
    const { region } = this.props
    return (
      <Radio.Group defaultValue={REGION_ID_TEXT_MAP[region]}>
        <Radio.Button value={REGION_ID_TEXT_MAP[region]}>{REGION_ID_TEXT_MAP[region]}</Radio.Button>
      </Radio.Group>
    )
  }
}
