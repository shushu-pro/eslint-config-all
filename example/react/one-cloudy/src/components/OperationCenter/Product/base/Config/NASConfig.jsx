/**
 * NAS配置组件
 */
import React from 'react'
import { Form } from 'antd'
import { SelectItem } from '../../components'
import { InstanceName, StorageCapacity } from '../index'
import { PRODUCT_FIELDS } from '../_constant'
import styles from '../../style.less'

class NASConfig extends React.PureComponent {
  render () {
    const {
      form,
      formItemLayout,
      capacityList,
      // packageList,
      productType,
      protocolList,
    } = this.props
    return (
      <>
        <InstanceName form={form} formItemLayout={formItemLayout} productType={productType} />
        {/* <Form.Item required label="基础包" {...formItemLayout}>
          <SelectItem
            id={[PRODUCT_FIELDS.BASE_PACKAGE_ID, PRODUCT_FIELDS.BASE_PACKAGE]}
            placeholder="基础包大小"
            form={form}
            optionData={packageList}
          />
        </Form.Item> */}
        <StorageCapacity
          required
          form={form}
          id={PRODUCT_FIELDS.CAPACITY}
          label="存储容量"
          formItemLayout={formItemLayout}
        />
        <Form.Item required label="存储类型" {...formItemLayout}>
          <SelectItem
            id={[ PRODUCT_FIELDS.STORAGE_TYPE_ID, PRODUCT_FIELDS.STORAGE_TYPE ]}
            placeholder="存储类型"
            form={form}
            optionData={capacityList}
          />
          <p className={styles.warntip}>一旦创建成功，存储类型不能修改</p>
        </Form.Item>
        <Form.Item required label="协议类型" {...formItemLayout}>
          <SelectItem
            id={[ PRODUCT_FIELDS.PROTOCOL_TYPE_ID, PRODUCT_FIELDS.PROTOCOL_TYPE ]}
            placeholder="协议类型"
            form={form}
            optionData={protocolList}
          />
          <p className={styles.warntip}>一旦创建成功，存储类型不能修改</p>
        </Form.Item>
      </>
    )
  }
}

export default NASConfig
