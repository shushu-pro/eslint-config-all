// 从数据库中的预设用户选择

import React, { PureComponent } from 'react'
import {
  Form, Select, Icon, Row, Col, Input,
} from 'antd'
import { connect } from 'dva'
import FormInput from '../../FormInput'


@connect(null)
class CustomPicker extends PureComponent {
  remove (i) {
    this.props.remove(i)
  }

  changeValue (value, id, name) {
    this.props.update({ id, value, name })
  }

  render () {
    const { form, dataKey, initialValue } = this.props
    return initialValue.map(({
      id, userName, mobile, email,
    }, i) => (
      <Row key={id}>
        <Col span={6}>
          <FormInput
            onChange={(e) => this.changeValue(e.target.value, id, 'userName')}
            form={form}
            id={`${dataKey}[${i}].userName`}
            required
            initialValue={userName}
            label="姓名"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            inputWidth="100%"
          />
        </Col>
        <Col span={7}>
          <FormInput
            onChange={(e) => this.changeValue(e.target.value, id, 'mobile')}
            form={form}
            id={`${dataKey}[${i}].mobile`}
            required
            pattern={/^(1(3|4|5|6|7|8|9)\d{9}|(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,8})$/}
            initialValue={mobile}
            label="联系方式"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            inputWidth="100%"
          />
        </Col>
        <Col span={8}>
          <FormInput
            onChange={(e) => this.changeValue(e.target.value, id, 'email')}
            form={form}
            id={`${dataKey}[${i}].email`}
            required
            pattern={/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/}
            initialValue={email}
            label="邮件"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            inputWidth="100%"
          />
        </Col>
        <Col span={1}>
          <Icon
            type="close-circle"
            theme="filled"
            style={{ marginLeft: '12px', color: '#1890ff' }}
            onClick={() => this.remove(id)}
          />
        </Col>
      </Row>
    ))
  }
}

export default CustomPicker
