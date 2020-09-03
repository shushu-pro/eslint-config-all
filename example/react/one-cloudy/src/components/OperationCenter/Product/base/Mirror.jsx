/**
 * 镜像组件
 */
import React from 'react'
import { connect } from 'dva'
import { Form } from 'antd'
import { SelectItem, RadioButtonItem, cascade } from '../components'
import { PRODUCT_FIELDS } from './_constant'
import { subscribeFormChange, unSubscribeFormChange } from '../index'

@connect()
@cascade(
  [ PRODUCT_FIELDS.MIRROR_TYPE_ID, PRODUCT_FIELDS.MIRROR_NAME_ID, PRODUCT_FIELDS.MIRROR_VERSION_ID ],
  [ PRODUCT_FIELDS.MIRROR_TYPE_ID ],
)
class Mirror extends React.PureComponent {
  componentDidMount () {
    subscribeFormChange(this.onFormChange)
  }

  componentWillUnmount () {
    unSubscribeFormChange(this.onFormChange)
  }

  onFormChange = (changedValues, changeField, has) => {
    const { cascadeList, form } = this.props
    const value = changedValues[changeField]
    // 根据cpu/内存选择框来处理容量输入框的状态以及值
    if (
      has(PRODUCT_FIELDS.MIRROR_VERSION_ID) &&
      changeField === PRODUCT_FIELDS.MIRROR_VERSION_ID &&
      value
    ) {
      const data = cascadeList[2].find((item) => item.key === value)
      form.setFieldsValue({
        mirrorVersionSpeId: data.specTypeGroupId,
      })
      // SUBMIT_FIELD[PRODUCT_TYPE.ECS].forEach((item) => {
      //   if (!item.specTypeGroupId) {
      //     item.specTypeGroupId = data.specTypeGroupId;
      //   }
      // })
    }
  };

  render () {
    const { form, formItemLayout, cascadeList, selectedValueList } = this.props
    const selectedMirrorType = selectedValueList[0]
    const data = cascadeList[0] && cascadeList[0].find((item) => item.key === selectedMirrorType)
    return (
      <>
        <Form.Item required label="镜像类型" {...formItemLayout}>
          <RadioButtonItem
            form={form}
            placeholder="镜像类型"
            optionData={cascadeList[0]}
            id={[ PRODUCT_FIELDS.MIRROR_TYPE_ID, PRODUCT_FIELDS.MIRROR_TYPE ]}
          />
        </Form.Item>
        <Form.Item
          required
          label={selectedMirrorType && data && data.value}
          {...formItemLayout}
          style={{ display: selectedMirrorType ? 'block' : 'none' }}
        >
          <SelectItem
            id={[ PRODUCT_FIELDS.MIRROR_NAME_ID, PRODUCT_FIELDS.MIRROR_NAME ]}
            placeholder="名称"
            form={form}
            optionData={cascadeList[1]}
          />
          <SelectItem
            id={[ PRODUCT_FIELDS.MIRROR_VERSION_ID, PRODUCT_FIELDS.MIRROR_VERSION ]}
            placeholder="版本"
            form={form}
            optionData={cascadeList[2]}
          />
        </Form.Item>
        {form.getFieldDecorator('mirrorVersionSpeId')}
      </>
    )
  }
}

export default Mirror
