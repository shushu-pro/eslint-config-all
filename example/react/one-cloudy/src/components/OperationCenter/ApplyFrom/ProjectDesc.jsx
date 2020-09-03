/**
 * 项目描述
 */
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Form, Input } from 'antd'

const { TextArea } = Input
const FormItem = Form.Item
class ProjectDesc extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { form, formItemLayout, required, initialValue, validator, ...restPrrops } = this.props
    const decorator = form.getFieldDecorator('description', {
      initialValue,
      rules: [
        {
          required,
          whitespace: true,
          message: '请填写项目描述',
        },
        {
          validator,
        },
      ],
    })
    return (
      <FormItem key="formItem-description" {...formItemLayout} label="项目描述">
        {decorator(<TextArea placeholder="请填写项目描述" rows={4} {...restPrrops} />)}
      </FormItem>
    )
  }
}

export default ProjectDesc
ProjectDesc.defaultProps = {
  required: true,
  validator: null,
}
ProjectDesc.propTypes = {
  form: PropTypes.object.isRequired,
  formItemLayout: PropTypes.object.isRequired,
  required: PropTypes.bool,
  validator: PropTypes.func,
}
