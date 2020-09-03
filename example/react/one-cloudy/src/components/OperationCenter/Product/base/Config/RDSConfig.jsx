/**
 * RDS配置组件
 */
import React from 'react'
import { connect } from 'dva'
import { Form } from 'antd'
import { SelectItem, cascade } from '../../components'
import { Number, InstanceName } from '../index'
import { PRODUCT_FIELDS } from '../_constant'
import styles from '../../style.less'

@connect()
@cascade([
  PRODUCT_FIELDS.DATA_BASE_TYPE_ID,
  PRODUCT_FIELDS.DATA_BASE_VERSION_ID,
  PRODUCT_FIELDS.CPU_MEMORY_ID,
  'maxConnectNumber', // 只是为了获取最大连接数，参数本身可以为任意值
])
class RDSConfig extends React.PureComponent {
  state = {
    disabled: false,
  };

  UNSAFE_componentWillReceiveProps ({ form }) {
    const data = form.getFieldValue(PRODUCT_FIELDS.CPU_MEMORY)
    const storage = data && data.match(/\d+(?=GB)/g)
    let disabled = false
    if (Array.isArray(storage)) {
      disabled = true
    }
    this.setState({
      disabled,
    })
  }

  onChange = (value) => {
    const { form, cascadeList } = this.props
    if (value) {
      const data = cascadeList[2].find((item) => item.key === value)
      const storage = data && data.name.match(/\d+(?=GB)/g)
      let realStorage
      if (Array.isArray(storage)) {
        [ realStorage ] = storage
      }
      form.setFieldsValue({
        cpuMemoryParentId: data.specTypeGroupId,
        [PRODUCT_FIELDS.STORAGE]: realStorage,
      })
    }
  };

  render () {
    const { disabled } = this.state
    const { form, formItemLayout, cascadeList } = this.props
    return (
      <>
        <InstanceName instanceType="RDS" form={form} formItemLayout={formItemLayout} />
        <Form.Item required label="数据库类型" {...formItemLayout}>
          <SelectItem
            id={[ PRODUCT_FIELDS.DATA_BASE_TYPE_ID, PRODUCT_FIELDS.DATA_BASE_TYPE ]}
            placeholder="数据库类型"
            form={form}
            optionData={cascadeList[0]}
          />
          <SelectItem
            id={[ PRODUCT_FIELDS.DATA_BASE_VERSION_ID, PRODUCT_FIELDS.DATA_BASE_VERSION ]}
            placeholder="版本"
            form={form}
            optionData={cascadeList[1]}
          />
        </Form.Item>
        <Form.Item required label="CPU/内存" {...formItemLayout}>
          <SelectItem
            id={[ PRODUCT_FIELDS.CPU_MEMORY_ID, PRODUCT_FIELDS.CPU_MEMORY ]}
            form={form}
            optionData={cascadeList[2]}
            onChange={this.onChange}
          />
          {cascadeList[3] && cascadeList[3].length > 0 &&
          <p className={styles.tip}>{cascadeList[3][0].value}</p>}
        </Form.Item>
        <Number
          disabled={disabled}
          id={PRODUCT_FIELDS.STORAGE}
          label="存储空间"
          form={form}
          formItemLayout={formItemLayout}
          unit="GB"
          tip="范围：5-2000，且为5的倍数"
          rules={[
            (rule, value, callback) => {
              if (!value || disabled) return callback()
              if (value < 5 || value > 2000 || value % 5 !== 0) {
                return callback(new Error('格式不正确'))
              }
              return callback()
            },
          ]}
        />
        {form.getFieldDecorator('cpuMemoryParentId')}
      </>
    )
  }
}

export default RDSConfig
