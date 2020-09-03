/**
 * MaxCompute(ODPS)配置组件
 */
import React from 'react';
import { Number, InstanceName } from '@/components/OperationCenter/Product/base/';
import Fieldset from '../components/parts/Fieldset';
import ICONS from '../components/blocks/constants/icons';
import FIELDS from '../components/blocks/constants/fields';

class Config extends React.PureComponent {
  render() {
    const { form, formItemLayout, productType } = this.props;
    return (
      <Fieldset title="配置" icon={ICONS.CONFIG}>
        <InstanceName
          label="ODPS名称"
          form={form}
          formItemLayout={formItemLayout}
          productType={productType}
          instanceType="ODPS"
        />
        <Number
          label="CU个数"
          form={form}
          formItemLayout={formItemLayout}
          id={FIELDS.CU_COUNT}
          min={20}
          unit="CU"
          tip="CU个数至少为20"
        />
        <Number
          label="存储空间"
          form={form}
          formItemLayout={formItemLayout}
          id={FIELDS.ODPS_CAPACITY}
          min={1024}
          unit="GB"
          tip="存储空间至少为1024GB"
        />
      </Fieldset>
    );
  }
}

export default Config;
