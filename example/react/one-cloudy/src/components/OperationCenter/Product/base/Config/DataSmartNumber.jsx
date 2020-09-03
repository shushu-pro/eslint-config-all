/**
 * Datasmart配置组件
 */
import React from 'react'
import { connect } from 'dva'
import { Number } from '@/components/OperationCenter/Product/base'
import { cascade } from '../../components'
import { PRODUCT_FIELDS } from '../_constant'

@cascade(
  [ PRODUCT_FIELDS.VERSION_ID ],
  [ PRODUCT_FIELDS.VERSION_ID ],
)
@connect(({ pageData }) => ({
  isStandard: pageData.isStandard,
}))
class DataSmartNumber extends React.PureComponent {
  UNSAFE_componentWillReceiveProps (nextProps) {
    const { dispatch } = this.props
    const { form } = nextProps
    const selectedValue = form.getFieldValue(PRODUCT_FIELDS.VERSION_ID)
    const isStandard = selectedValue === 2101
    if (form.getFieldValue(PRODUCT_FIELDS.DS_QUANTITY) === undefined) {
      form.setFieldsValue({
        [PRODUCT_FIELDS.DS_QUANTITY]: 1,
      })
    }
    dispatch({
      type: 'pageData/getDSStantard',
      payload: {
        isStandard,
      },
    })
  }

  render () {
    const {
      form, formItemLayout, isStandard, max, label,
    } = this.props
    return (
      <>
        {isStandard
          ? (
            <Number
              label={label}
              id={PRODUCT_FIELDS.DS_QUANTITY}
              form={form}
              max={max}
              formItemLayout={formItemLayout}
              disabled={isStandard}
              value={1}
            />
          )
          : (
            <Number
              label={label}
              id={PRODUCT_FIELDS.DS_QUANTITY}
              form={form}
              max={max}
              formItemLayout={formItemLayout}
            />
          )}
      </>
    )
  }
}

export default DataSmartNumber
