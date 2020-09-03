/**
 * 通用的配置组件（Redis）
 */
import React from 'react'
import { connect } from 'dva'
import { Form } from 'antd'
import { RadioButtonItem, SelectItem, cascade } from '../../components'
import { InstanceName } from '../index'
import { subscribeFormChange, unSubscribeFormChange } from '../../index'
import { PRODUCT_FIELDS } from '../_constant'

@connect()
@cascade(
  [
    PRODUCT_FIELDS.ARCHITECTURE_TYPE_ID,
    PRODUCT_FIELDS.PACKAGE_TYPE_ID,
    PRODUCT_FIELDS.REDIS_INSTANCE_SPEC_ID,
  ],
  [ PRODUCT_FIELDS.ARCHITECTURE_TYPE_ID, PRODUCT_FIELDS.PACKAGE_TYPE_ID ],
)
class RedisConfig extends React.PureComponent {
  componentDidMount () {
    subscribeFormChange(this.onFormChange)
  }

  componentWillUnmount () {
    unSubscribeFormChange(this.onFormChange)
  }

  onFormChange = (changedValues, changeField, has) => {
    const { form, cascadeList } = this.props
    const value = changedValues[changeField]
    // 根据实例规格选择框来获取它ParentId
    if (has(PRODUCT_FIELDS.REDIS_INSTANCE_SPEC_ID) && changeField === PRODUCT_FIELDS.REDIS_INSTANCE_SPEC_ID && value) {
      const data = cascadeList[2].find((item) => item.key === value)
      form.setFieldsValue({ instanceSpecParentId: data.specTypeGroupId })
    }
  };

  render () {
    const { form, formItemLayout, cascadeList, nodeTypeList, versionList } = this.props
    return (
      <>
        <InstanceName form={form} instanceType="RDS" formItemLayout={formItemLayout} />
        <Form.Item required label="引擎版本" {...formItemLayout}>
          <RadioButtonItem
            form={form}
            optionData={versionList}
            id={[ PRODUCT_FIELDS.ENGINE_VERSION_ID, PRODUCT_FIELDS.ENGINE_VERSION ]}
          />
        </Form.Item>
        <Form.Item required label="架构类型" {...formItemLayout}>
          <RadioButtonItem
            form={form}
            optionData={cascadeList[0]}
            id={[ PRODUCT_FIELDS.ARCHITECTURE_TYPE_ID, PRODUCT_FIELDS.ARCHITECTURE_TYPE ]}
          />
        </Form.Item>
        <Form.Item required label="节点类型" {...formItemLayout}>
          <RadioButtonItem
            form={form}
            optionData={nodeTypeList}
            id={[ PRODUCT_FIELDS.NODE_TYPE_ID, PRODUCT_FIELDS.NODE_TYPE ]}
          />
        </Form.Item>
        <Form.Item required label="套餐类型" {...formItemLayout}>
          <RadioButtonItem
            form={form}
            optionData={cascadeList[1]}
            id={[ PRODUCT_FIELDS.PACKAGE_TYPE_ID, PRODUCT_FIELDS.PACKAGE_TYPE ]}
          />
        </Form.Item>
        <Form.Item required label="实例规格" {...formItemLayout}>
          <SelectItem
            id={[ PRODUCT_FIELDS.REDIS_INSTANCE_SPEC_ID, PRODUCT_FIELDS.REDIS_INSTANCE_SPEC ]}
            placeholder="实例规格"
            form={form}
            optionData={cascadeList[2]}
          />
        </Form.Item>
        {form.getFieldDecorator('instanceSpecParentId')}
      </>
    )
  }
}

export default RedisConfig
