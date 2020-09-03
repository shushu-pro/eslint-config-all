/**
 * ADS配置组件
 */
import React from 'react'
import { Form } from 'antd'
import { SelectItem, CheckboxItem } from '../../components'
import { PRODUCT_FIELDS } from '../_constant'
import { InstanceName } from '../index'

class ACSConfig extends React.PureComponent {
  UNSAFE_componentWillReceiveProps (nextProps) {
    const { form } = nextProps
    if (!form.getFieldValue(PRODUCT_FIELDS.CHECK_SNAT)) {
      form.setFieldsValue({
        [PRODUCT_FIELDS.CHECK_SNAT]: '1',
        [PRODUCT_FIELDS.CHECK_SLB]: '1',
        [PRODUCT_FIELDS.CHECK_SSH]: '1',
      })
    }
  }

  render () {
    const { form, formItemLayout, productType, kubermeteList, nodeChargeList, isACS } = this.props
    return (
      <>
        <InstanceName
          form={form}
          formItemLayout={formItemLayout}
          productType={productType}
          instanceType="ACS"
        />
        <Form.Item required label="节点计费类型" {...formItemLayout}>
          <SelectItem
            id={[ PRODUCT_FIELDS.NODE_CHARGE_TYPE_ID, PRODUCT_FIELDS.NODE_CHARGE_TYPE ]}
            placeholder="类型"
            form={form}
            optionData={nodeChargeList}
          />
        </Form.Item>
        <Form.Item required label="Kubemetes版本" {...formItemLayout}>
          <SelectItem
            id={[ PRODUCT_FIELDS.KUBERMETES_VERSION_ID, PRODUCT_FIELDS.KUBERMETES_VERSION ]}
            placeholder="版本"
            form={form}
            optionData={kubermeteList}
          />
        </Form.Item>
        <Form.Item required label="Docker版本" {...formItemLayout}>
          <SelectItem
            id={[ PRODUCT_FIELDS.DOCKER_VERSION_ID, PRODUCT_FIELDS.DOCKER_VERSION ]}
            placeholder="版本"
            form={form}
            optionData={[
              {
                key: '18.09.2',
                value: '18.09.2',
              },
            ]}
          />
        </Form.Item>
        {!isACS
          ? (
            <>
              <Form.Item required label="配置SNAT" {...formItemLayout}>
                <CheckboxItem
                  id={PRODUCT_FIELDS.CHECK_SNAT}
                  form={form}
                  value="为专有网络配置SNAT"
                  disabled
                />
              </Form.Item>
              <Form.Item required label="公网SLB" {...formItemLayout}>
                <CheckboxItem
                  id={PRODUCT_FIELDS.CHECK_SLB}
                  form={form}
                  value="用公网SLB暴露API SERVER"
                  disabled
                />
              </Form.Item>
              <Form.Item required label="SSH登录" {...formItemLayout}>
                <CheckboxItem
                  id={PRODUCT_FIELDS.CHECK_SSH}
                  form={form}
                  value="开放公网SSH登录"
                  disabled
                />
              </Form.Item>
            </>
          )
          : null }
      </>
    )
  }
}

export default ACSConfig
