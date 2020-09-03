/**
 * 通用的配置组件（堡垒机,数据库审计）
 */
import React from 'react'
import { Form, Table } from 'antd'
import { RadioButtonItem, SelectItem, cascade } from '../../components'
import {
  PRODUCT_FIELDS, getName, tableData, tableColumns,
} from '../_constant'
import { InstanceName } from '../index'
import { subscribeFormChange, unSubscribeFormChange } from '../../index'

const needInitList = [ PRODUCT_FIELDS.INSTANCE_TYPE_ID, PRODUCT_FIELDS.INSTANCE_SPEC_ID ]
@cascade(
  [ PRODUCT_FIELDS.INSTANCE_TYPE_ID, PRODUCT_FIELDS.INSTANCE_SPEC_ID ],
  needInitList,
)
class BastionHostConfig extends React.PureComponent {
  componentDidMount () {
    subscribeFormChange(this.onFormChange)
  }

  componentWillUnmount () {
    unSubscribeFormChange(this.onFormChange)
  }

  onFormChange = (changedValues, changeField, has) => {
    const value = changedValues[changeField]
    if (has(PRODUCT_FIELDS.PACKAGE_SPEC) && value) {
      this.setInitValue()
    }
  };

  // 根据规格设置其他选项的默认值
  setInitValue = () => {
    const { form, cascadeList } = this.props
    needInitList.forEach((item, index) => {
      const value = cascadeList[index] && cascadeList[index][0] ? cascadeList[index][0].key : undefined
      form.setFieldsValue({
        [item]: value,
      })
    })
  }


  onChange = (key) => {
    const { form } = this.props
    form.setFieldsValue({ [PRODUCT_FIELDS.MIRROR_VERSION]: key })
  }

  render () {
    const {
      form, formItemLayout, cascadeList, comSpecisList, type,
    } = this.props
    const name = getName(type)
    return (
      <>
        <p
          style={{
            color: '#999',
            marginBottom: 12,
            lineHeight: '40px',
          }}
        >
          {name}
          推荐的ECS规格（资产数即ECS上限数量、并发ECS数量）
        </p>
        <Table
          dataSource={tableData[type]}
          columns={tableColumns[type]}
          pagination={false}
          bordered
          style={{ width: '800px', marginBottom: '12px' }}
        />
        <Form.Item required label={`${name}规格`} {...formItemLayout}>
          <SelectItem
            id={[ PRODUCT_FIELDS.PACKAGE_SPEC_ID, PRODUCT_FIELDS.PACKAGE_SPEC ]}
            placeholder={`${name}规格`}
            form={form}
            optionData={comSpecisList}
            onChange={this.onChange}
          />
        </Form.Item>
        <InstanceName form={form} instanceType="ECS" formItemLayout={formItemLayout} />
        <Form.Item required label="实例类型" {...formItemLayout}>
          <RadioButtonItem
            form={form}
            optionData={cascadeList[0]}
            id={[ PRODUCT_FIELDS.INSTANCE_TYPE_ID, PRODUCT_FIELDS.INSTANCE_TYPE ]}
            disabled
          />
        </Form.Item>
        <Form.Item required label="实例规格" {...formItemLayout}>
          <SelectItem
            id={[ PRODUCT_FIELDS.INSTANCE_SPEC_ID, PRODUCT_FIELDS.INSTANCE_SPEC ]}
            placeholder="实例规格"
            form={form}
            optionData={cascadeList[1]}
            disabled
          />
        </Form.Item>
      </>
    )
  }
}

export default BastionHostConfig
