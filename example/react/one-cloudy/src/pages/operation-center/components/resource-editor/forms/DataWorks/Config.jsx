
import React from 'react'
// import { Comment } from '@/components/OperationCenter/Product/base/index';
// import { PRODUCT_FIELDS, FIELD_MAP } from '@/components/OperationCenter/Product/base/_constant';
// import { Number, InstanceName } from '@/components/OperationCenter/Product/base/';
import Fieldset from '../components/parts/Fieldset'
import ICONS from '../components/blocks/constants/icons'
import FormInput from '../components/parts/FormInput'

function Config ({ form, formItemLayout }) {
  return (
    <Fieldset title="配置" icon={ICONS.CONFIG}>
      <FormInput
        label="工作空间名称"
        form={form}
        formItemLayout={formItemLayout}
        tips="字母、数字、下划线，只能以字母开头"
        pattern={/^[a-zA-Z][a-zA-Z0-9_]{0,26}$/}
        id="instanceName"
        inputProps={
          {
            maxlength: 27,
          }
        }
      />
      <FormInput
        label="显示名"
        form={form}
        required={false}
        formItemLayout={formItemLayout}
        tips="如果不填，默认为项目名称；命名规范同上"
        id="dataworksName"
        pattern={/^([a-zA-Z][a-zA-Z0-9_]{0,31})?$/}
        inputProps={
          {
            maxlength: 32,
          }
        }
      />
    </Fieldset>
  )
}

export default Config
