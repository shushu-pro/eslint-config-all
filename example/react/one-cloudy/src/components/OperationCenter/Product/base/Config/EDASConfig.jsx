/**
 * EDAS配置组件
 */
import React from 'react'
import { connect } from 'dva'
// import { Form } from 'antd';
// import { InputItem } from '../../../FormItem';
import { InstanceName } from '../index'
// import { PRODUCT_FIELDS } from '../_constant';
import {
// Cluster,
// SelectItem,
} from '../../components'

@connect(({ resourceApply }) => ({
  selectedProjectInfo: resourceApply.selectedProjectInfo,
}))
class EDASConfig extends React.PureComponent {
  render () {
    const {
      form,
      formItemLayout,
      // selectedProjectInfo, batch,
      // optionList,
      productType,
    } = this.props
    // 批量则从redux里面取出deptId，否则从表单取出
    // const selectedDepartment = batch
    //   ? selectedProjectInfo.commonInfo[PRODUCT_FIELDS.DEPARTMENT_ID]
    //   : form.getFieldValue(PRODUCT_FIELDS.DEPARTMENT_ID);
    return (
      <>
        <InstanceName
          instanceType="ECS"
          productType={productType}
          form={form}
          formItemLayout={formItemLayout}
          label="集群名称"
        />
        {/* <Form.Item required label="容器版本号" {...formItemLayout}>
          <SelectItem
            id={[PRODUCT_FIELDS.CONTAINER_VERSION_ID, PRODUCT_FIELDS.CONTAINER_VERSION]}
            placeholder=" "
            form={form}
            optionData={optionList}
          />
        </Form.Item> */}
        {/* <Cluster
          formItemLayout={formItemLayout}
          form={form}
          selectedRegion={form.getFieldValue(PRODUCT_FIELDS.REGION_ID)}
          selectedDepartment={selectedDepartment}
        /> */}
        {/* <Form.Item label="健康检查" {...formItemLayout}>
          <InputItem
            id={PRODUCT_FIELDS.HEALTH_CHECK}
            placeholder=" "
            form={form}
            required={false}
          />
        </Form.Item> */}
      </>
    )
  }
}

export default EDASConfig
