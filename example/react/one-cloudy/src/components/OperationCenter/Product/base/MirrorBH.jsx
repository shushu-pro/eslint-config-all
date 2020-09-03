/**
 * `堡垒机,数据库审计产品`的镜像组件
 */
import React from 'react'
import { Form } from 'antd'
import { SelectItem, RadioButtonItem, cascade } from '../components'
import { PRODUCT_FIELDS, PRODUCT_TYPE } from './_constant'

const needInitList = [ PRODUCT_FIELDS.MIRROR_TYPE_ID, PRODUCT_FIELDS.MIRROR_NAME_ID ]
@cascade(
  [ PRODUCT_FIELDS.MIRROR_TYPE_ID, PRODUCT_FIELDS.MIRROR_NAME_ID ],
  needInitList,
)
class Mirror extends React.PureComponent {
  render () {
    const { form, formItemLayout, cascadeList, selectedValueList, type, imageVersionList } = this.props
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
            disabled
            placeholder="名称"
            form={form}
            optionData={cascadeList[1]}
          />
          {type === PRODUCT_TYPE.FORTRESSAIRCRAFT && (
            <SelectItem
              id={[ PRODUCT_FIELDS.MIRROR_VERSION_ID, PRODUCT_FIELDS.MIRROR_VERSION ]}
              disabled
              placeholder="版本"
              form={form}
              optionData={imageVersionList}
            />
          )}
        </Form.Item>
      </>
    )
  }
}

export default Mirror
