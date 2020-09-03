/**
 * Datasmart配置组件
 */
import React from 'react'
import { connect } from 'dva'
import { Form } from 'antd'
import { DataSmartRadioButton, cascade } from '../../components'
import { PRODUCT_FIELDS, FIELD_MAP } from '../_constant'

@cascade(
  [ PRODUCT_FIELDS.VERSION_ID ],
  [ PRODUCT_FIELDS.VERSION_ID ],
)
@connect(({ pageData }) => ({
  isStandard: pageData.isStandard,
}))
class DataSmartConfig extends React.PureComponent {
  render () {
    const {
      form, formItemLayout, optionList,
    } = this.props
    const isShowTips = optionList && optionList.length > 0
    return (
      <>
        <Form.Item required label={FIELD_MAP[PRODUCT_FIELDS.VERSION]} {...formItemLayout}>
          <DataSmartRadioButton
            form={form}
            optionData={optionList}
            id={[ PRODUCT_FIELDS.VERSION_ID, PRODUCT_FIELDS.VERSION ]}
            tip="版本与功能介绍"
            isShowTips={isShowTips}
          />
        </Form.Item>
      </>
    )
  }
}

export default DataSmartConfig
