/**
 * ESS配置组件
 */
import React from 'react'
import { connect } from 'dva'
import { Form } from 'antd'
import { SelectItem, cascade } from '../../components'
import { Number, InstanceName } from '../index'
import { PRODUCT_FIELDS } from '../_constant'

@connect()
@cascade([ PRODUCT_FIELDS.REMOVAL_STRATEGY_ID, PRODUCT_FIELDS.REMOVAL_STRATEGY_STEPSECOND_ID ])
class ESSConfig extends React.PureComponent {
  render () {
    const { form, formItemLayout, cascadeList } = this.props
    const { getFieldValue } = form
    return (
      <>
        <InstanceName instanceType="ESS" form={form} formItemLayout={formItemLayout} />
        <Number
          id={PRODUCT_FIELDS.MIN_INSTANCE_NUM}
          label="最小实例台数"
          form={form}
          min={0}
          max={100}
          formItemLayout={formItemLayout}
          tip="配置范围: 0-100"
        />
        <Number
          id={PRODUCT_FIELDS.MAX_INSTANCE_NUM}
          label="最大实例台数"
          form={form}
          min={getFieldValue(PRODUCT_FIELDS.MIN_INSTANCE_NUM)}
          max={100}
          formItemLayout={formItemLayout}
          tip="配置范围: 0-100，且不小于最小实例台数"
        />
        <Number
          id={PRODUCT_FIELDS.DEFAULT_COLD_DOWN_TIME}
          label="默认冷却时间"
          form={form}
          formItemLayout={formItemLayout}
          unit="秒"
          tip="配置范围：0-86400"
          min={1}
          max={86400}
        />
        <Form.Item required label="移出策略" {...formItemLayout}>
          <SelectItem
            id={PRODUCT_FIELDS.REMOVAL_STRATEGY_ID}
            placeholder="首先移出"
            form={form}
            optionData={cascadeList[0]}
            text="首先移出"
            selectName="product-select-item-ess"
          />
          <SelectItem
            id={PRODUCT_FIELDS.REMOVAL_STRATEGY_STEPSECOND_ID}
            placeholder="在结果中再移出"
            form={form}
            optionData={cascadeList[1]}
            text="在结果中再移出"
            selectName="product-select-item-ess"
          />
        </Form.Item>
      </>
    )
  }
}

export default ESSConfig
