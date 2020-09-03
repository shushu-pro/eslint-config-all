/**
 * SLB配置组件
 */
import React from 'react'
import { Number, InstanceName } from '../index'
import { PRODUCT_FIELDS } from '../_constant'
import { subscribeFormChange, unSubscribeFormChange } from '../../index'
import Net from '../Net'

class SLBConfig extends React.PureComponent {
  state = {
    bandWidthDisable: false,
  }

  componentDidMount () {
    subscribeFormChange(this.onFormChange)
  }

  componentWillUnmount () {
    unSubscribeFormChange(this.onFormChange)
  }

  onFormChange = (changedValues, changeField, has) => {
    const value = changedValues[changeField]
    if (has(PRODUCT_FIELDS.NETWORK_TYPE_NAME) && changeField === PRODUCT_FIELDS.NETWORK_TYPE_NAME) {
      if (value === '专有网络') {
        this.setState({ bandWidthDisable: false })
      } else {
        this.setState({ bandWidthDisable: true })
      }
    }
  };

  render () {
    const { form, formItemLayout, productType, batch } = this.props
    const { bandWidthDisable } = this.state
    return (
      <>
        <InstanceName
          instanceType="SLB"
          productType={productType}
          form={form}
          formItemLayout={formItemLayout}
        />
        <Net
          form={form}
          formItemLayout={formItemLayout}
          batch={batch}
          tip="提供对外服务请选择经典网络"
          initNet="经典网络"
        />
        {bandWidthDisable && (
          <Number
            id={PRODUCT_FIELDS.BAND_WIDTH}
            label="带宽峰值"
            form={form}
            formItemLayout={formItemLayout}
            unit="Mbps"
            tip="支持 1~100 Mbps"
            min={1}
            max={100}
          />
        )}
        {/* 用于资源修改，一开始表单不存在带宽峰值，
        所以表单设置初始值会导致带宽峰值设置失败，
        需要设置一个影藏的input来预接收数据 */}
        {form.getFieldDecorator(PRODUCT_FIELDS.BAND_WIDTH)}
      </>
    )
  }
}

export default SLBConfig
