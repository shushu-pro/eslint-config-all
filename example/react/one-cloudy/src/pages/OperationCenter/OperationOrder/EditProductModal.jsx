
import React, { PureComponent } from 'react'
import { Button } from 'antd'
import Modals from '@/components/Common/Modals'
import Product from '@/components/OperationCenter/Product'

export default class EditProductModal extends PureComponent {
  onOk = () => {
    const { initData, onOk } = this.props
    onOk && onOk(initData.resourceInfo.id)
  }

  render () {
    const {
      initData, visible, onCancel, batch, dataWorksIsSingle,
    } = this.props
    if (!visible) return null
    return Modals({
      width: initData.resourceType === 'DataWorks' ? 1200 : 1050,
      title: initData.resourceName,
      bodyStyle: { overflow: 'hidden', overflowX: 'auto' },
      content: (<Product
        batch={batch}
        productType={initData.resourceType}
        initData={initData.resourceInfo}
        dataWorksIsSingle={dataWorksIsSingle}
        useFor="batch-modify"
      />),
      visible,
      footer: [
        <Button onClick={onCancel}>取消</Button>,
        <Button type="primary" onClick={this.onOk}>
          确定
        </Button>,
      ],
      onCancel,
    })
  }
}
