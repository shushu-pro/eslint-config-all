import React from 'react'
import { Form, Button } from 'antd'
import Modals from '@/components/Common/Modals'
import FormItem from '@/components/Common/FormItem'
import {
  RES_INFO_LIST,
  RES_INFO, RES_INFO_TEXT,
  REGION_ID_TEXT_MAP,
  getDate,
} from '@/pages/BillCenter/constant'

@Form.create()

class InfoModal extends React.Component {
  render () {
    const { visible, data, onCancel, noFee } = this.props
    if (!visible) {
      return null
    }
    return Modals({
      bodyStyle: {
        padding: 0,
      },
      width: 700,
      title: '资源详情',
      key: 'infoModal',
      content: (
        <div style={{ padding: 24 }}>
          {RES_INFO_LIST.map((key) => {
            let value = data[key]
            if (key === RES_INFO.OC_REGION) {
              value = REGION_ID_TEXT_MAP[value]
            }
            if (key === RES_INFO.OPEN_TIME) {
              value = getDate(value)
            }
            // 在新版账单统计中，不用显示费用一栏
            if (noFee && key === 'monthfee') {
              return ''
            }
            return (
              <FormItem
                key={key}
                label={RES_INFO_TEXT[key]}
                value={value}
              />
            )
          })}
        </div>
      ),
      visible,
      onCancel,
      footer: [
        <Button key="cancel" onClick={onCancel}>关闭</Button>,
      ],
    })
  }
}

export default InfoModal
