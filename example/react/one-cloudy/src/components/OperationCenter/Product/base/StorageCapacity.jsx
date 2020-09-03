import React, { Component } from 'react'
import { Input, Form, Select } from 'antd'
import { subscribeFormChange, unSubscribeFormChange } from '../index'
import { PRODUCT_FIELDS } from './_constant'

const { Option } = Select
export default class StorageCapacity extends Component {
  static defaultProps = {
    unitId: PRODUCT_FIELDS.CAPACITY_UNIT,
  };

  state = {
    capacityUnit: 'GB',
  };

  componentDidMount () {
    subscribeFormChange(this.onFormChange)
  }

  componentWillUnmount () {
    unSubscribeFormChange(this.onFormChange)
  }

  onFormChange = (changedValues, changeField, has) => {
    const { form } = this.props
    const value = changedValues[PRODUCT_FIELDS.CAPACITY_UNIT]
    if (has(PRODUCT_FIELDS.CAPACITY_UNIT) && !value) {
      form.setFieldsValue({
        [PRODUCT_FIELDS.CAPACITY_UNIT]: 'GB',
      })
    }
    if (value) {
      this.setState({
        capacityUnit: value,
      })
    }
  };

  onChange = (e) => {
    const { form, unitId, id } = this.props
    this.setState({
      capacityUnit: e,
    })
    const minCapacity = e === 'GB' ? '40' : '1'
    const value = form.getFieldValue(id)
    const setNum = Number(value) > Number(minCapacity) ? value : minCapacity
    form.setFieldsValue({
      [unitId]: e,
      [id]: setNum,
    })
  };

  render () {
    const { capacityUnit } = this.state
    const { required, label, id, form, formItemLayout, unitId } = this.props
    form.getFieldDecorator(unitId, {
      initialValue: capacityUnit,
    })
    return (
      <Form.Item required={required} label={label} {...formItemLayout}>
        {form.getFieldDecorator(id, {
          rules: [
            {
              whitespace: true,
              required,
              message: `请填写${label}`,
            },
            {
              validator: (rule, value, callback) => {
                const unit = form.getFieldValue(unitId)
                const minValue = unit === 'GB' ? '40' : '1'
                const pattern = /^[0-9]+$/
                // if (!value) {
                //   return callback(new Error(`请填写${label}`));
                // }
                if (value && !pattern.test(value)) {
                  return callback(new Error('只能输入正整数'))
                }
                if (value && Number(value) < Number(minValue)) {
                  return callback(new Error(`${label}最小为${minValue}${unit}`))
                }
                return callback()
              },
            },
          ],
        })(
          <Input
            style={{ width: 200 }}
            maxLength={25}
            addonAfter={(
              <Select onChange={this.onChange} value={capacityUnit} style={{ width: 70 }}>
                <Option value="GB">GB</Option>
                <Option value="TB">TB</Option>
              </Select>
            )}
          />,
        )}
        <div
          style={{
            marginLeft: 8,
            lineHeight: '32px',
            display: 'inline-block',
            verticalAlign: 'top',
          }}
        >
          至少40GB
        </div>
      </Form.Item>
    )
  }
}
