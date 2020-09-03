
/**
 * OSS-升降配表单
 */
import React, { Fragment } from 'react'
import { connect } from 'dva'
import {
  Form, Divider, InputNumber,
} from 'antd'
import { FORM_ICON } from '@/components/OperationCenter/Product/base/_constant'
import styles from '../changeSet.less'

@connect()
class OSSForm extends React.PureComponent {
  constructor (props) {
    super(props)
    // console.log('props', props);
    this.state = {
      initData: props.initData,
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.initData !== prevState.initData) {
      return {
        initData: nextProps.initData,
      }
    }
    return null
  }

  renderTitleDetail = () => {
    const { initData } = this.state
    const { formItemLayout } = this.props
    return (
      <div className={styles.item_container}>
        <div className={styles.item_title}>
          <i className={`icon iconfont ${FORM_ICON.BASE_INFO}`} />
          实例信息
        </div>
        <div className={styles.item_title_content}>
          <Form.Item {...formItemLayout} label={<span className={styles.text_left}>实例名称</span>}>
            {initData.cloudInstanceName}
          </Form.Item>
          <Form.Item {...formItemLayout} label={<span className={styles.text_left}>区域</span>}>
            {initData.regionName}
          </Form.Item>
          <Form.Item {...formItemLayout} label={<span className={styles.text_left}>部门</span>}>
            {initData.deptName}
          </Form.Item>
          <Form.Item {...formItemLayout} label={<span className={styles.text_left}>项目</span>}>
            {initData.projectName}
          </Form.Item>
        </div>
      </div>
    )
  }

  renderForm = () => {
    const { initData } = this.state
    const { formItemLayout, form } = this.props
    const { getFieldDecorator } = form
    return (
      <div className={styles.item_container}>
        <div className={styles.item_title}>
          <i className={`icon iconfont ${FORM_ICON.CONFIG}`} />
          配置
        </div>
        <div className={styles.item_content}>
          <Form.Item {...formItemLayout} label="存储容量">
            {getFieldDecorator('specifiedCapacity', {
              initialValue: initData.specifiedCapacity,
              rules: [
                { required: true, message: '请填写存储容量!' },
                {
                  validator: (rule, value, callback) => {
                    const pattern = /^[0-9]+$/
                    if (value && !pattern.test(value)) {
                      return callback(new Error('只能输入正整数'))
                    }
                    return callback()
                  },
                },
              ],
            })(
              <InputNumber
                style={{ width: '200px', marginRight: 5 }}
                min={1}
                max={1000000}
                placeholder="请填写存储容量"
              />,
            )}
            <span>GB</span>
          </Form.Item>
        </div>
      </div>
    )
  }

  render () {
    return (
      <>
        {this.renderTitleDetail()}
        <Divider />
        {this.renderForm()}
      </>
    )
  }
}

export default OSSForm
