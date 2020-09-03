/**
 * VPC配置组件
 */
import React from 'react';
import { Form } from 'antd';
import { RadioItem } from '../../components';
import { PRODUCT_FIELDS } from '../_constant';
import { InstanceName } from '../index';

class VPCConfig extends React.PureComponent {
  render() {
    const { form, formItemLayout, productType } = this.props;
    return (
      <>
        <InstanceName
          form={form}
          formItemLayout={formItemLayout}
          productType={productType}
          instanceType={productType}
        />
        <Form.Item required label="下级部门共享" {...formItemLayout}>
          <RadioItem
            form={form}
            optionData={[
              {
                key: 1,
                value: '是',
              },
              {
                key: 0,
                value: '否',
              },
            ]}
            id={PRODUCT_FIELDS.IS_SHARED}
            tip="共享时，下级部门可以共用此VPC"
            placeholder="下级部门是否共享"
          />
        </Form.Item>
      </>
    );
  }
}

export default VPCConfig;
