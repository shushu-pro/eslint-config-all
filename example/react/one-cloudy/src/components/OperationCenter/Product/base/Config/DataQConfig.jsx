/**
 * Datasmart配置组件
 */
import React from 'react'
import { Form } from 'antd'
import { cascade, DataSmartRadioButton } from '../../components'
import { PRODUCT_FIELDS, FIELD_MAP } from '../_constant'
import styles from './index.less'

@cascade(
  [ PRODUCT_FIELDS.VERSION_ID ],
  [ PRODUCT_FIELDS.VERSION_ID ],
)
class DataQConfig extends React.PureComponent {
  render () {
    const {
      form, formItemLayout, optionList,
    } = this.props
    const selectedValue = form.getFieldValue(PRODUCT_FIELDS.VERSION_ID)
    const isStandard = selectedValue === 2010
    const isShowTips = optionList && optionList.length > 0
    return (
      <>
        <Form.Item required label={FIELD_MAP[PRODUCT_FIELDS.VERSION]} {...formItemLayout}>
          <DataSmartRadioButton
            form={form}
            optionData={optionList}
            id={[ PRODUCT_FIELDS.VERSION_ID, PRODUCT_FIELDS.VERSION ]}
            isShowTips={false}
          />
          {isShowTips
            ? (
              <p className={styles.dataqTip}>
                {isStandard
                  ? <span>标准版默认含3个工作组，含500任务节点数，100张上云表数</span>
                  : <span>专业版默认含10个工作组，含1000任务节点数，200张上云表数</span>}
              </p>
            ) : null}
        </Form.Item>
      </>
    )
  }
}

export default DataQConfig
