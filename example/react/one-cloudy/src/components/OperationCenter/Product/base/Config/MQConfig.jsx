/**
 * MQ配置组件
 */
import React from 'react'
import { Form, Switch } from 'antd'
import { getData, IDENTIFIED_KEY, PRODUCT_FIELDS } from '../_constant'
import { InstanceName, Number, Comment } from '../index'
import TopicConfig from './TopicConfig'

class MQConfig extends React.PureComponent {
  state = {
    newInstance: false,
    edit: false,
  }

  UNSAFE_componentWillReceiveProps ({ initData }) {
    const sendTps = initData && initData[PRODUCT_FIELDS.SEND_TPS]
    const { edit } = this.state
    if (sendTps && !edit) {
      this.setState({
        edit: true,
      })
      this.onAddIns()
    }
  }

  onAddIns = () => {
    const { form } = this.props
    this.setState({
      newInstance: true,
    }, () => {
      form.setFieldsValue({ [PRODUCT_FIELDS.MQ_NAME]: '新建的虚拟实例' })
    })
  }

  onChange = () => {
    const { form } = this.props
    this.setState({
      newInstance: false,
    }, () => {
      form.setFieldsValue({
        [PRODUCT_FIELDS.MQ_NAME]: undefined,
        [PRODUCT_FIELDS.V_INSTANCE_NAME]: undefined,
      })
    })
  }

  render () {
    const { form, formItemLayout, productType, resourceData } = this.props
    const { newInstance } = this.state
    const data = resourceData[IDENTIFIED_KEY.MESSAGE_TYPE]
    return (
      <>
        <InstanceName
          form={form}
          formItemLayout={formItemLayout}
          productType={productType}
          disabled={newInstance}
          label="虚拟实例"
          id={!newInstance ? PRODUCT_FIELDS.V_INSTANCE_NAME : PRODUCT_FIELDS.MQ_NAME}
          text={(
            <span>
              如有需要，可以
              <a onClick={this.onAddIns}>新建虚拟实例</a>
            </span>
          )}
        />
        {newInstance && (
          <>
            <Form.Item required label="新建虚拟实例" {...formItemLayout}>
              <Switch onChange={this.onChange} checked={newInstance} />
            </Form.Item>
            <InstanceName
              form={form}
              id={PRODUCT_FIELDS.V_INSTANCE_NAME}
              formItemLayout={formItemLayout}
              label="实例名称"
            />
            <Number
              id={PRODUCT_FIELDS.SEND_TPS}
              label="最大发送TPS"
              form={form}
              formItemLayout={formItemLayout}
              tip="配置范围≥1000"
              min={1000}
            />
            <Number
              id={PRODUCT_FIELDS.RECEIVE_TPS}
              label="最大订阅TPS"
              form={form}
              formItemLayout={formItemLayout}
              tip="配置范围≥1000"
              min={1000}
            />
            <Number
              id={PRODUCT_FIELDS.TOPIC_CAPACITY_NUM}
              label="Topic容量个数"
              form={form}
              formItemLayout={formItemLayout}
              tip="配置范围≥50"
              min={50}
            />
            <Comment
              id={PRODUCT_FIELDS.MQ_DESC}
              form={form}
              formItemLayout={formItemLayout}
            />
          </>
        )}
        <TopicConfig
          form={form}
          formItemLayout={formItemLayout}
          productType={productType}
          optionList={getData(resourceData, IDENTIFIED_KEY.MESSAGE_TYPE)}
          specTypeGroupId={data && data.id}
        />
      </>
    )
  }
}

export default MQConfig
