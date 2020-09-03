import React from 'react'
import moment from 'moment'
import {
  Form, DatePicker,
} from 'antd'
import styles from './formInfo.less'

class BottomInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {
      form, formItemLayout, isEdit, recordDetail,
    } = this.props
    const { getFieldDecorator } = form
    const formItemLayoutWithOutLabel = {
      labelAlign: 'right',
      wrapperCol: {
        offset: 6,
        span: 18,
      },
    }
    return (
      <div className={styles.bottomInfo}>
        <Form.Item key="cloudOpenTime" {...formItemLayout} label="开通时间">
          {getFieldDecorator('cloudOpenTime', {
            initialValue: isEdit ? moment(recordDetail.cloudOpenTime) : undefined,
            rules: [
              { required: true, message: '开通时间!' },
            ],
          })(
            <DatePicker className={styles['my-datePicker']} />,
          )}
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel} className={styles.description}>
          <p>调整开通日期，会对将来月份的账单数据产生影响，会按照该款产品的计费算法进行计费。但不会对已经生成的月账单进行修改。</p>
          <p>举例：某产品A的计费逻辑为：超过当月15日开通的，则当月免费。</p>
          <p>若设定开通时间为6月16日，则6月账单内，该产品实例费用为0；</p>
          <p>若设定开通时间为6月14日，则6月账单内，该产品实例正常收费。</p>
          <p>若系统已经生成6月账单（次月1日生成），设定开通时间为6月14日，不会对已生成的6月账单产生影响。</p>
        </Form.Item>
        {/* <Form.Item key="cost" {...formItemLayout} label="费用">
          {getFieldDecorator('cost', {
            rules: [
              { required: true, message: '费用!' },
            ],
          })(
            <InputNumber />
          )}
        </Form.Item> */}
      </div>
    )
  }
}

export default Form.create()(BottomInfo)
