/**
 * 注释-表单的组件
 */
import React from 'react'
import { connect } from 'dva'
import moment from 'moment'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import { Comment } from '@/components/OperationCenter/Product/base'
import {
  Form, Switch, DatePicker,
} from 'antd'
import { subscribeFormChange, unSubscribeFormChange } from '../../index'
import { FORM_ICON, PRODUCT_FIELDS } from '../../base/_constant'

function disabledDate (current) {
  return current && current < moment().startOf('day')
}

@connect(({ resourceApply }) => ({
  sfTime: resourceApply.sfTime,
}))

class FormComment extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isShow: this.props.initData ? this.props.initData.ifTempRes : false,
      alertText: '',
    }
  }

  componentDidMount () {
    this.props.form.setFieldsValue({ ifTempRes: this.state.isShow })
    subscribeFormChange(this.onFormChange)
  }

  componentWillUnmount () {
    unSubscribeFormChange(this.onFormChange)
  }

  onFormChange = (changedValues, changeField) => {
    // console.log('changedValues, changeField', changedValues, changeField);
    const { sfTime } = this.props
    if (changeField === PRODUCT_FIELDS.REGION_ID) {
      this.props.form.setFieldsValue({ ifTempRes: false })
    }
    if (changeField === 'ifTempRes') {
      const value = changedValues[changeField]
      this.setState({
        isShow: !!value,
      }, () => {
        if (value) {
          // console.log('set', sfTime);
          this.props.form.setFieldsValue({ releaseDate: sfTime ? moment(sfTime) : undefined })
        }
      })
    }
    if (changeField === 'releaseDate') {
      // 后设置的临时资源释放时间与此申请单中其他临时资源释放日期不同时，释放时间更改后显示提醒
      const date = changedValues[changeField] ? moment(changedValues[changeField]).format('YYYY-MM-DD') : undefined
      if (sfTime !== undefined && date && date !== sfTime) {
        this.setState({
          alertText: '此申请单中的所有临时资源释放时间将与已选时间保持一致',
        })
      } else {
        this.setState({
          alertText: '',
        })
      }
    }
  };

  render () {
    const { isShow, alertText } = this.state
    const { form, placeholder, formItemLayout } = this.props
    const showAble = form.getFieldValue('ifTempRes') || isShow
    return (
      <LeftTitle title="备注" noDivider icon={FORM_ICON.REMARK}>
        <Form.Item label="是否为临时资源" {...formItemLayout}>
          {form.getFieldDecorator('ifTempRes', {
            initialValue: false,
          })(<Switch checked={form.getFieldValue('ifTempRes')} />)}
        </Form.Item>
        {
          showAble
            ? (
              <Form.Item label="释放时间" {...formItemLayout}>
                {form.getFieldDecorator('releaseDate', {
                  rules: [ { required: true, message: '请填写释放时间' } ],
                })(
                  <DatePicker
                    format="YYYY-MM-DD"
                    disabledDate={disabledDate}
                  />,
                )}
                {
                  alertText ? (
                    <span
                      style={{
                        fontStyle: 'italic',
                        paddingLeft: 5,
                        color: 'red',
                      }}
                    >
                      {alertText}
                    </span>
                  ) : null
                }
              </Form.Item>
            )
            : null
        }
        <Comment form={form} placeholder={placeholder} formItemLayout={formItemLayout} />
      </LeftTitle>
    )
  }
}

export default FormComment
