/**
 * 资源使用人 - 添加一行新使用人信息
 */
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Icon, Row, Col } from 'antd'
import { PRODUCT_FIELDS } from '@/components/OperationCenter/Product/base/_constant'
import InputItem from './InputItem'

class AddUser extends React.PureComponent {
  state = {
    spanState: false,
  };

  remove = (k) => {
    const { form } = this.props
    const keys = form.getFieldValue(PRODUCT_FIELDS.RESOURCE_KEYS)
    const resources = form.getFieldValue(PRODUCT_FIELDS.RESOURCE_USER)
    form.setFieldsValue({
      [PRODUCT_FIELDS.RESOURCE_KEYS]: keys.filter((key) => key !== k),
    })
    delete resources[k]
  };

  commonRule = (rule, value, callback) => {
    const moblie = /^1(3|4|5|6|7|8|9)\d{9}$/
    const tel = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,8}$/
    this.onChange(rule, value)
    if (value && !moblie.test(value) && !tel.test(value)) {
      return callback(new Error('请输入正确的格式'))
    }
    return callback()
  };

  // 校验手动输入的资源使用人信息是否与之前录入的信息有重复
  onChange = (rule, val) => {
    const { form } = this.props
    const data = form.getFieldValue(PRODUCT_FIELDS.RESOURCE_USER)
    const comparsionData = Object.values(data)
    const key = rule.field.split('.')[2]
    data[key] = val
    const arrayData = comparsionData[comparsionData.length - 1]
    const surplusData = comparsionData.filter((item, index) => index !== comparsionData.length - 1)
    surplusData.some((item) => {
      if (_.isEqual(arrayData, item)) {
        this.setState({
          spanState: true,
        })
        return true
      }
      this.setState({
        spanState: false,
      })
    })
  };

  render () {
    const {
      form, initValue, keysList, id,
    } = this.props
    const { spanState } = this.state
    const billDetailLayout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    }
    const restProps = {
      form,
      formItemLayout: billDetailLayout,
    }
    return (
      <div>
        <Row style={{ marginTop: 20 }}>
          <Col span={5}>
            <InputItem
              id={`${PRODUCT_FIELDS.RESOURCE_USER}.${id}.${PRODUCT_FIELDS.USER_NAME}`}
              label="姓名"
              initialValue={initValue[PRODUCT_FIELDS.USER_NAME]}
              style={{ width: '100%' }}
              validator={(rule, value, callback) => {
                this.onChange(rule, value)
                return callback()
              }}
              {...restProps}
            />
          </Col>
          <Col span={8} style={{ marginLeft: 16 }}>
            <InputItem
              style={{ width: '100%' }}
              id={`${PRODUCT_FIELDS.RESOURCE_USER}.${id}.${PRODUCT_FIELDS.MOBILE}`}
              label="联系方式"
              initialValue={initValue[PRODUCT_FIELDS.MOBILE]}
              validator={this.commonRule}
              {...restProps}
            />
          </Col>
          <Col span={8} style={{ marginLeft: 16 }}>
            <InputItem
              style={{ width: '100%' }}
              id={`${PRODUCT_FIELDS.RESOURCE_USER}.${id}.${PRODUCT_FIELDS.EMAIL}`}
              label="邮箱"
              initialValue={initValue[PRODUCT_FIELDS.EMAIL]}
              validator={(rule, value, callback) => {
                const pattern = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
                this.onChange(rule, value)
                if (value && !pattern.test(value)) {
                  return callback(new Error('格式不正确'))
                }
                return callback()
              }}
              {...restProps}
              formItemLayout={{
                labelCol: {
                  span: 5,
                },
                wrapperCol: {
                  span: 19,
                },
              }}
            />
          </Col>
          <Col span={1} style={{ marginLeft: 16 }}>
            {keysList.length >= 1 ? (
              <Icon
                type="close-circle"
                theme="filled"
                style={{ color: '#1890ff' }}
                onClick={() => this.remove(id)}
              />
            ) : null}
          </Col>
        </Row>
        {spanState && <span style={{ color: '#f90829', marginLeft: 20 }}>资源使用人信息重复</span>}
      </div>
    )
  }
}

export default AddUser
AddUser.defaultProps = {
  initValue: {},
}
AddUser.propTypes = {
  initValue: PropTypes.object,
}
