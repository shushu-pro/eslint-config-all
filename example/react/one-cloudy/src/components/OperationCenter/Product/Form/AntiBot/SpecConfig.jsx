/**
 * 通用的配置组件（ECS，堡垒机）
 */
import React from 'react'
import {
  Form, Row, Col,
} from 'antd'
import {
  RadioButtonItem,
  CheckboxItem,
} from '@/components/OperationCenter/Product/components'
import {
  PRODUCT_FIELDS, IDENTIFIED_KEY,
} from '@/pages/OperationCenter/ResourceApply/constant'
import { Number } from '@/components/OperationCenter/Product/base'
import { subscribeFormChange, unSubscribeFormChange } from '@/components/OperationCenter/Product'
import { getProcesData, getData } from '../../base/_constant'
import { NUMBER_ITEMS } from './constant'

class SpecConfig extends React.PureComponent {
  componentWillUnmount () {
    unSubscribeFormChange(this.onFormChange)
  }

  // 当申请信息发生改变的时候
  onFormChange = (changedValues, changeField, has) => {
    // console.log(changedValues, changeField, has);
    const value = changedValues[changeField]
    if (has(PRODUCT_FIELDS.ANTIBOT_PKG_SPEC_NAME) && value) {
      // 规格改变时设置初始值
      this.setOtherInitFiles(value)
    }
  };

  setOtherInitFiles (name) {
    const { form, resourceData } = this.props
    // 目前只有一种规格，不存在lsit的选择
    const specList = getProcesData(resourceData[IDENTIFIED_KEY.PRODUCT_SPECS])
    const optionData = specList.find((item) => item.name === name)
    const specTypeGroup = optionData && optionData.specTypeGroup
    const PROT_DOMAIN = getData(specTypeGroup, IDENTIFIED_KEY.ANTIBOT_PROT_DOMAIN)
    const BUS_QPS = getData(specTypeGroup, IDENTIFIED_KEY.ANTIBOT_BUS_QPS)
    const SERV_BAND = getData(specTypeGroup, IDENTIFIED_KEY.ANTIBOT_SERV_BAND)
    const LOG_STOR = getData(specTypeGroup, IDENTIFIED_KEY.ANTIBOT_LOG_STOR)
    const PROT_SCHEME = getData(specTypeGroup, IDENTIFIED_KEY.ANTIBOT_PROT_SCHEME)
    form.setFieldsValue({
      [PRODUCT_FIELDS.ANTIBOT_PROT_DOMAIN]: PROT_DOMAIN[0] && PROT_DOMAIN[0].label,
      [PRODUCT_FIELDS.ANTIBOT_BUS_QPS]: BUS_QPS[0] && BUS_QPS[0].label,
      [PRODUCT_FIELDS.ANTIBOT_SERV_BAND]: SERV_BAND[0] && SERV_BAND[0].label,
      [PRODUCT_FIELDS.ANTIBOT_LOG_STOR]: LOG_STOR[0] && LOG_STOR[0].label,
      [PRODUCT_FIELDS.ANTIBOT_PROT_SCHEME]: PROT_SCHEME[0] && PROT_SCHEME[0].label,
    })
  }

  componentWillMount () {
    subscribeFormChange(this.onFormChange)
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { form, optionList = [] } = nextProps
    if (optionList[0] && !form.getFieldValue(PRODUCT_FIELDS.ANTIBOT_PKG_SPEC)) {
      form.setFieldsValue({ [PRODUCT_FIELDS.ANTIBOT_PKG_SPEC]: optionList[0].id })
    }
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
            id={[ PRODUCT_FIELDS.ANTIBOT_PKG_SPEC, PRODUCT_FIELDS.ANTIBOT_PKG_SPEC_NAME ]}
            optionData={optionList}
          />
        </Form.Item>
        {NUMBER_ITEMS.map((item) => (
          <Form.Item className="heigh40" key={item.key} required={item.isReq} label={item.label} {...formItemLayout}>
            <Number
              formItemLayout={formItemLayout}
              form={form}
              rules={item.rules}
              required={item.isReq}
              disabled={item.disabled}
              resourceData={resourceData}
              id={item.key}
              unit={item.unit}
              min={item.min}
              step={item.step}
              label=""
              tip={item.tips}
            />
          </Form.Item>
        ))}
        <Form.Item label="" {...formItemLayout}>
          <Row>
            <Col span={4} />
            <Col span={20}>
              <CheckboxItem
                className="pl20"
                required={false}
                id={PRODUCT_FIELDS.ANTIBOT_CHECK_BOT}
                form={form}
                value="提供SDK原生APP的Bot流量防护方案"
              />
            </Col>
          </Row>
        </Form.Item>
      </>
    )
  }
}
export default SpecConfig
