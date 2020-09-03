/**
 * ACS worker 配置组件
 */
import React from 'react'
import { Form, Col, Row } from 'antd'
import { SelectItem, CheckboxItem } from '../../components'
import { PRODUCT_FIELDS, IDENTIFIED_KEY, getData } from '../_constant'
import SystemDisk from '../SystemDisk'
import { Number } from '../index'

class ACSConfig extends React.PureComponent {
  UNSAFE_componentWillMount () {
    const { initData, form } = this.props
    console.log('componentWillMount', initData)
    if (initData && initData.applyId) {
      form.setFieldsValue({
        [PRODUCT_FIELDS.DATA_WORKER_TYPE_ID]: initData[PRODUCT_FIELDS.DATA_WORKER_TYPE_ID] || null,
        [PRODUCT_FIELDS.DATA_WORKER_TYPE]: initData[PRODUCT_FIELDS.DATA_WORKER_TYPE] || null,
        [PRODUCT_FIELDS.DATA_WORKER_STORAGE]: initData[PRODUCT_FIELDS.DATA_WORKER_STORAGE] || null,
      })
    }
  }

  render () {
    const { form, formItemLayout, optionList, resourceData, initData } = this.props
    return (
      <>
        <Form.Item required label="实例规格" {...formItemLayout}>
          <SelectItem
            id={[ PRODUCT_FIELDS.WORKER_INSTANCE_TYPE_ID, PRODUCT_FIELDS.WORKER_INSTANCE_TYPE ]}
            placeholder="规格"
            form={form}
            optionData={optionList}
          />
        </Form.Item>
        <Number
          label="实例个数"
          id={PRODUCT_FIELDS.WORKER_INSTANCE_NUM}
          form={form}
          formItemLayout={formItemLayout}
          max={100}
        />
        <Form.Item required label="系统盘" {...formItemLayout}>
          <SystemDisk
            form={form}
            formItemLayout={formItemLayout}
            diskTypeList={getData(resourceData, IDENTIFIED_KEY.SYS_DISK_TYPE)}
            disabled={false}
            idData={{
              diskTypeId: PRODUCT_FIELDS.SYS_WORKER_TYPE_ID,
              diskType: PRODUCT_FIELDS.SYS_WORKER_TYPE,
              diskStorage: PRODUCT_FIELDS.SYS_WORKER_STORAGE,
            }}
          />
        </Form.Item>
        <Form.Item label="数据盘" {...formItemLayout}>
          <Row>
            <Col span={2}>
              <CheckboxItem
                required={false}
                id={PRODUCT_FIELDS.CHECK_DATA_DISK}
                form={form}
                value=""
              />
            </Col>
            <Col span={22}>
              {form.getFieldValue(PRODUCT_FIELDS.CHECK_DATA_DISK) && (
                <SystemDisk
                  form={form}
                  formItemLayout={formItemLayout}
                  maxStorage={500}
                  diskTypeList={getData(resourceData, IDENTIFIED_KEY.DATA_DISK_TYPE)}
                  idData={{
                    diskTypeId: PRODUCT_FIELDS.DATA_WORKER_TYPE_ID,
                    diskType: PRODUCT_FIELDS.DATA_WORKER_TYPE,
                    diskStorage: PRODUCT_FIELDS.DATA_WORKER_STORAGE,
                  }}
                  disabled={false}
                />
              )}
            </Col>
          </Row>
        </Form.Item>
      </>
    )
  }
}

export default ACSConfig
