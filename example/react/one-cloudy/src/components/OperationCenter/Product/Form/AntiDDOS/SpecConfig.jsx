/**
 * 通用的配置组件（ECS，堡垒机）
 */
import React from 'react'
import {
  Form,
} from 'antd'
import {
  RadioButtonItem,
  SelectItem,
} from '@/components/OperationCenter/Product/components'
import {
  PRODUCT_FIELDS, IDENTIFIED_KEY,
} from '@/pages/OperationCenter/ResourceApply/constant'
import { subscribeFormChange, unSubscribeFormChange } from '@/components/OperationCenter/Product'
import { getProcesData, getData } from '../../base/_constant'
import DynamicList from './DynamicList'
//


const INPUT_FILED = {
  placeholder: '防护IP地址',
  pattern: /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)(\/\d{1,})?$/,
  keyName: PRODUCT_FIELDS.ANTIDDOS_DEFEND_URL,
}
class SpecConfig extends React.PureComponent {
  componentWillMount () {
    subscribeFormChange(this.onFormChange)
  }

  componentDidMount () {
    const { initData } = this.props
    if (!initData || !initData[PRODUCT_FIELDS.ANTIDDOS_DEFEND_URLSTR]) {
      this.dynamicListChild && this.dynamicListChild.add()
    }
  }

  componentWillUnmount () {
    unSubscribeFormChange(this.onFormChange)
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { form, optionList = [] } = nextProps
    if (optionList[0] && !form.getFieldValue(PRODUCT_FIELDS.ANTIDDOS_PKG_SPEC)) {
      form.setFieldsValue({ [PRODUCT_FIELDS.ANTIDDOS_PKG_SPEC]: optionList[0].id })
    }
  }

  // 当申请信息发生改变的时候
  onFormChange = (changedValues, changeField, has) => {
    const value = changedValues[changeField]
    if (has(PRODUCT_FIELDS.ANTIDDOS_PKG_SPEC_NAME) && value) {
      // 规格改变时设置初始值
      this.setOtherInitFiles(value)
    }
  };

  setOtherInitFiles (name) {
    const { form, resourceData } = this.props
    const specList = getProcesData(resourceData[IDENTIFIED_KEY.PRODUCT_SPECS])
    const optionData = specList.find((item) => item.name === name)
    const specTypeGroup = optionData && optionData.specTypeGroup
    const DEFEND = getData(specTypeGroup, IDENTIFIED_KEY.ANTIDDOS_DEFEND)
    // console.log('ANTIDDOS_DEFEND', DEFEND);

    form.setFieldsValue({
      [PRODUCT_FIELDS.ANTIDDOS_DEFEND]: DEFEND[0] && DEFEND[0].label,
      [PRODUCT_FIELDS.ANTIDDOS_DEFEND_ID]: DEFEND[0] && DEFEND[0].key,
    })
  }

  render () {
    const {
      form, formItemLayout, resourceData, optionList, initData,
    } = this.props
    return (
      <>
        <Form.Item required label="套餐规格" {...formItemLayout}>
          <RadioButtonItem
            form={form}
            id={[ PRODUCT_FIELDS.ANTIDDOS_PKG_SPEC, PRODUCT_FIELDS.ANTIDDOS_PKG_SPEC_NAME ]}
            optionData={optionList}
          />
        </Form.Item>
        <Form.Item label="防护能力" required {...formItemLayout}>
          <SelectItem
            id={[ PRODUCT_FIELDS.ANTIDDOS_DEFEND_ID, PRODUCT_FIELDS.ANTIDDOS_DEFEND ]}
            label=""
            disabled
            optionData={getData(resourceData, IDENTIFIED_KEY.ANTIDDOS_DEFEND)}
            form={form}
            formItemLayout={formItemLayout}
            resourceData={resourceData}
          />
        </Form.Item>
        <DynamicList

          ref={(grid) => { this.dynamicListChild = grid }}
          keyNameStr={PRODUCT_FIELDS.ANTIDDOS_DEFEND_URLSTR}
          form={form}
          formItemLayout={formItemLayout}
          inputFileds={INPUT_FILED}
          initListString={initData && initData[PRODUCT_FIELDS.ANTIDDOS_DEFEND_URLSTR]}
        />
      </>
    )
  }
}
export default SpecConfig
