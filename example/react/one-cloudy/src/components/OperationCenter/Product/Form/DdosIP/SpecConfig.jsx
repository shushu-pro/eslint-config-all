/**
 * 通用的配置组件（ECS，堡垒机）
 */
import React from 'react'
import {
  Form, Switch,
} from 'antd'
import {
  RadioButtonItem,

} from '@/components/OperationCenter/Product/components'
import {
  PRODUCT_FIELDS, IDENTIFIED_KEY,
} from '@/pages/OperationCenter/ResourceApply/constant'
import { Number } from '@/components/OperationCenter/Product/base'
import { subscribeFormChange, unSubscribeFormChange } from '@/components/OperationCenter/Product'
import { getProcesData, getData } from '../../base/_constant'
import { NUMBER_ITEMS } from './constant'


// @cascade(
//   [PRODUCT_FIELDS.DDOSIP_PKG_SPEC],
//   [PRODUCT_FIELDS.DDOSIP_PKG_SPEC]
// )
class SpecConfig extends React.PureComponent {
  componentWillMount () {
    subscribeFormChange(this.onFormChange)
  }

  componentWillUnmount () {
    unSubscribeFormChange(this.onFormChange)
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { form, optionList = [] } = nextProps
    if (optionList[0] && !form.getFieldValue(PRODUCT_FIELDS.DDOSIP_PKG_SPEC)) {
      form.setFieldsValue({ [PRODUCT_FIELDS.DDOSIP_PKG_SPEC]: optionList[0].id })
    }
  }

  // 当申请信息发生改变的时候
  onFormChange = (changedValues, changeField, has) => {
    // console.log(changedValues, changeField, has);
    const value = changedValues[changeField]
    if (has(PRODUCT_FIELDS.DDOSIP_PKG_SPEC_NAME) && value) {
      // 规格改变时设置初始值

      this.setOtherInitFiles(value)
    }
  };

  setOtherInitFiles (name) {
    const { form, resourceData } = this.props
    const specList = getProcesData(resourceData[IDENTIFIED_KEY.PRODUCT_SPECS])
    const optionData = specList.find((item) => item.name === name)
    const specTypeGroup = optionData && optionData.specTypeGroup
    const DDOSIP_ABLE = getData(specTypeGroup, IDENTIFIED_KEY.DDOSIP_ABLE)
    const SERV_BAND = getData(specTypeGroup, IDENTIFIED_KEY.DDOSIP_SERV_BAND)
    const PROT_SCHEME = getData(specTypeGroup, IDENTIFIED_KEY.DDOSIP_PROT_DOMAIN)
    form.setFieldsValue({
      [PRODUCT_FIELDS.DDOSIP_ABLE]: DDOSIP_ABLE[0] && DDOSIP_ABLE[0].label,
      [PRODUCT_FIELDS.DDOSIP_SERV_BAND]: SERV_BAND[0] && SERV_BAND[0].label,
      [PRODUCT_FIELDS.DDOSIP_PROT_DOMAIN]: PROT_SCHEME[0] && PROT_SCHEME[0].label,
    })
  }


  render () {
    const {
      form, formItemLayout, resourceData, optionList,
    } = this.props
    return (
      <>
        <Form.Item required label="套餐规格" {...formItemLayout}>
          <RadioButtonItem
            form={form}
            id={[ PRODUCT_FIELDS.DDOSIP_PKG_SPEC, PRODUCT_FIELDS.DDOSIP_PKG_SPEC_NAME ]}
            optionData={optionList}
          />
        </Form.Item>
        {NUMBER_ITEMS.map((item) => (
          <Form.Item
            className="heigh40"
            key={item.key}
            style={{ marginBottom: 0 }}
            required={item.isReq}
            label={item.label}
            {...formItemLayout}
          >
            <Number
              formItemLayout={formItemLayout}
              form={form}
              rules={item.rules}
              required={item.isReq}
              disabled={item.disabled}
              resourceData={resourceData}
              id={item.key}
              min={item.min}
              step={item.step}
              unit={item.unit}
              label=""
              tip={item.tips}
            />
          </Form.Item>
        ))}
        <Form.Item label="是否开启增强功能" {...formItemLayout}>
          {form.getFieldDecorator(PRODUCT_FIELDS.DDOSIP_IS_ENHANCE, { valuePropName: 'checked' })(<Switch />)}

        </Form.Item>
      </>
    )
  }
}
export default SpecConfig
