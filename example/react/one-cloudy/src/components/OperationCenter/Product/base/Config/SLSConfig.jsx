/**
 * SLS配置组件
 */
import React from 'react'
import { InstanceName, Comment } from '../index'
import { PRODUCT_FIELDS } from '../_constant'

class SLSConfig extends React.PureComponent {
  render () {
    const { form, formItemLayout, productType } = this.props
    return (
      <>
        <InstanceName
          productType={productType}
          instanceType="SLS"
          form={form}
          formItemLayout={formItemLayout}
        />
        <InstanceName
          productType={productType}
          // instanceType="SLS"
          form={form}
          formItemLayout={formItemLayout}
          label="授权账号"
          id="authorizeAccount"
          text="请输入授权账号，当多个时请用逗号隔开"
        />
        <Comment
          form={form}
          formItemLayout={formItemLayout}
          label="project注释"
          id={PRODUCT_FIELDS.PROJECT_REMARK}
        />
      </>
    )
  }
}

export default SLSConfig
