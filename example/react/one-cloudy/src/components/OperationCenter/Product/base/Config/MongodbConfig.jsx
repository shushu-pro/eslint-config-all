/**
 * Mongodb配置组件
 */
import React from 'react'
import { Form } from 'antd'
import { SelectItem } from '../../components'
import { Number, InstanceName } from '../index'
import { PRODUCT_FIELDS, IDENTIFIED_KEY } from '../_constant'
import styles from '../../style.less'

class MongodbConfig extends React.Component {
  state = {
    maxConnection: undefined,
  };

  UNSAFE_componentWillReceiveProps (nextProps) {
    this.getCapacity(nextProps)
  }

  // 根据基础包的值控制指定容量的最大值
  getCapacity = (props) => {
    const { form, optionList } = props
    const selectNodeSpecis = form.getFieldValue(PRODUCT_FIELDS.NODE_SPECIS_ID)
    const selectData = optionList.find((o) => o.value === selectNodeSpecis)
    let maxConnection
    if (selectData && selectData[IDENTIFIED_KEY.CHILDREN][0]) {
      maxConnection = selectData[IDENTIFIED_KEY.CHILDREN][0].value
    }
    this.setState({
      maxConnection,
    })
  };

  render () {
    const { maxConnection } = this.state
    const { form, formItemLayout, optionList } = this.props
    return (
      <>
        <InstanceName instanceType="Mongodb" form={form} formItemLayout={formItemLayout} />
        <Form.Item required label="节点规格" {...formItemLayout}>
          <SelectItem
            id={[ PRODUCT_FIELDS.NODE_SPECIS_ID, PRODUCT_FIELDS.NODE_SPECIS ]}
            placeholder=" "
            form={form}
            optionData={optionList}
          />
          <p className={styles.tip}>{maxConnection}</p>
        </Form.Item>
        <Number
          id={PRODUCT_FIELDS.STORAGE}
          label="存储空间"
          form={form}
          formItemLayout={formItemLayout}
          unit="GB"
          tip="配置范围10-2000GB，需为10的倍数"
          rules={[
            (rule, value, callback) => {
              if (value && (value < 10 || value > 2000 || value % 10 !== 0)) {
                return callback(new Error('格式不正确'))
              }
              return callback()
            },
          ]}
        />
      </>
    )
  }
}

export default MongodbConfig
