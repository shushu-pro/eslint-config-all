/**
 * OSS配置组件   CAPACITY_UNIT: 'capacityUnit', // 容量
 */
import React from 'react'
import { Form } from 'antd'
import { RadioButtonItem } from '../../components'
import { InstanceName, StorageCapacity } from '../index'
import { PRODUCT_FIELDS } from '../_constant'

// const permissionList = [
//   {
//     key: 'pri',
//     value: '私有',
//   },
//   {
//     key: 'pub-r',
//     value: '公有-读',
//   },
//   {
//     key: 'pub-rw',
//     value: '公有-读写',
//   },
// ];

class OSSConfig extends React.PureComponent {
  render () {
    const { form, formItemLayout, productType, permissionList } = this.props
    const extra = (
      <>
        <div>私有：对object的所有访问操作需要进行身份验证。</div>
        <div>公有-读：对object写操作需要进行身份验证；可以对object进行匿名读。</div>
        <div>公有-读写：所有人都可以对object进行读写操作。</div>
      </>
    )
    return (
      <>
        <InstanceName
          instanceType="OSS"
          productType={productType}
          form={form}
          formItemLayout={formItemLayout}
        />
        <Form.Item
          required
          label="权限"
          {...formItemLayout}
          extra={permissionList.length > 0 ? extra : null}
        >
          <RadioButtonItem
            form={form}
            optionData={permissionList}
            id={[ PRODUCT_FIELDS.PERMISSION_TYPE_NAME, PRODUCT_FIELDS.PERMISSION_TYPE ]}
          />
        </Form.Item>
        {/* <Comment
          form={form}
          formItemLayout={formItemLayout}
          label="实例描述"
          tip="256字符以内"
          maxLength={256}
          id={PRODUCT_FIELDS.INSTANCE_DESC}
        /> */}
        <StorageCapacity
          required
          form={form}
          id={PRODUCT_FIELDS.CAPACITY}
          label="存储容量"
          formItemLayout={formItemLayout}
        />
        {/* <Form.Item required label="基础包" {...formItemLayout}>
          <SelectItem
            id={[PRODUCT_FIELDS.BASE_PACKAGE_ID, PRODUCT_FIELDS.BASE_PACKAGE]}
            placeholder="基础包"
            form={form}
            optionData={basePackageList}
          />
        </Form.Item> */}
        {/* <Number
          required={false}
          label="指定容量"
          form={form}
          formItemLayout={formItemLayout}
          id={PRODUCT_FIELDS.CAPACITY}
          unit="GB"
          min={minCapacity}
          tip="指定容量需要大于基础包规格"
        />
        {/* 互联网区独有的配置 */}
        {/* {downPackageList && (
          <Form.Item required label="下行容量包" {...formItemLayout}>
            <SelectItem
              id={[PRODUCT_FIELDS.DOWN_PACKAGE_ID,PRODUCT_FIELDS.DOWN_PACKAGE]}
              placeholder="下行容量包"
              form={form}
              optionData={downPackageList}
            />
          </Form.Item>
        )} */}
        {/* 用于资源修改，一开始表单不存在下行容量包（下行容量包是按照区域来显隐的），
        所以表单设置初始值会导致下行容量包设置失败，
        需要设置一个影藏的input来预接收数据 */}
      </>
    )
  }
}

export default OSSConfig
