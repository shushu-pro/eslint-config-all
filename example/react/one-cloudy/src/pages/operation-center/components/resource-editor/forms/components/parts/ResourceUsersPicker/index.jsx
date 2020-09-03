// 资源使用人选择器，支持选择多个使用人，支持传入id来决定数据存放在哪里
import React from 'react'
import {
  Form, Popover, Icon, Dropdown, Menu,
} from 'antd'
import PresetPicker from './PresetPicker'
import CustomPicker from './CustomPicker'

let UUID = 0
class ResourceUsersPicker extends React.Component {
  constructor (props) {
    super(props)
    const { dataKey, initialValue = [] } = props
    this.presetIdsKey = `${dataKey}.presetIds` // 预设资源使用人ids表单标识符
    this.customValuesKey = `${dataKey}.customValues` // 自己输入的资源使用人表单标识符
    this.validateFieldKey = `${dataKey}.allIds` // 用于提交校验是否已经选择了资源使用人

    this.state = {
      presetPickerVisible: false,
      customValues: initialValue.map((item) => ({
        ...item,
        id: UUID++,
      })),
    }
  }

  onDropMenuClick = ({ key }) => {
    if (key === 'preset') {
      this.setState({
        presetPickerVisible: true,
      })
    } else if (key === 'custom') {
      this.setState((state) => ({
        ...state,
        customValues: state.customValues.concat({ id: UUID++ }),
      }))
    }
  }

  // 更新自定义输入对应项的数据
  updateCustomPickerItem = ({ id, name, value }) => {
    this.setState((state) => ({
      ...state,
      customValues: state.customValues.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            [name]: value,
          }
        }
        return item
      }),
    }))
  }

  // 移除预设的下拉选择框
  removePresetPicker = () => {
    this.setState({
      presetPickerVisible: false,
    })
  }

  // 移除自定义输入对应的表单项
  removeCustomPickerItem = (id) => {
    const { form, dataKey } = this.props
    const nowFieldsValues = form.getFieldsValue()
    const index = this.state.customValues.findIndex((item) => item.id === id)
    nowFieldsValues[dataKey].customValues.splice(index, 1)
    this.setState((state) => ({
      ...state,
      customValues: state.customValues.filter((item) => item.id !== id),
    }), () => {
      form.setFieldsValue(nowFieldsValues)
    })
  }

  renderDropButton () {
    const { presetPickerVisible } = this.state
    return (
      <Dropdown
        overlay={(
          <Menu onClick={this.onDropMenuClick} style={{ textAlign: 'center', marginTop: 10 }}>
            <Menu.Item key="preset" disabled={presetPickerVisible}>用户表选取</Menu.Item>
            <Menu.Item key="custom">自定义输入</Menu.Item>
          </Menu>
        )}
      >
        <a style={{ marginLeft: 20 }}>
          <Icon type="plus-circle" style={{ color: '#1890ff' }} />
          <span style={{ color: '#1890ff', marginLeft: 5 }}>添加</span>
        </a>
      </Dropdown>
    )
  }

  renderValidateField () {
    const { form, required } = this.props
    return form.getFieldDecorator(this.validateFieldKey, {
      initialValue: '',
      rules: [
        (rule, value, callback) => {
          if (required === false) {
            return callback()
          }
          const { customValues } = this.state
          const presetIds = form.getFieldValue(this.presetIdsKey) || []
          // 校验规则：预设的资源使用人或者自定义的资源使用人存在，则校验通过
          if (presetIds.length > 0 || customValues.length > 0) {
            return callback()
          }
          return callback(new Error('请添加资源使用人'))
        },
      ],
    })(<input type="hidden" />)
  }

  renderCustomPicker () {
    const { form, formItemLayout } = this.props
    const { customValues } = this.state
    return (
      <CustomPicker
        form={form}
        formItemLayout={formItemLayout}
        initialValue={customValues}
        dataKey={this.customValuesKey}
        remove={this.removeCustomPickerItem}
        update={this.updateCustomPickerItem}
      />
    )
  }

  renderPresetPicker () {
    if (!this.state.presetPickerVisible) {
      return null
    }

    const { form, formItemLayout } = this.props
    return (
      <PresetPicker
        form={form}
        formItemLayout={formItemLayout}
        dataKey={this.presetIdsKey}
        initailValue={[]}
        remove={this.removePresetPicker}
      />
    )
  }

  render () {
    const { required, formItemLayout } = this.props
    return (
      <Form.Item
        key="formItem-resourceUserList"
        {...formItemLayout}
        label={(
          <span>
            {helpIcon()}
            资源使用人
          </span>
        )}
        required={required}
        style={{ marginBottom: 0 }}
      >
        {this.renderDropButton()}
        {this.renderPresetPicker()}
        {this.renderCustomPicker()}
        {this.renderValidateField()}
      </Form.Item>
    )
  }
}

export default ResourceUsersPicker
function helpIcon () {
  return (
    <Popover
      content={(
        <span>
          <Icon type="exclamation-circle" style={{ marginRight: 8, color: '#faad14' }} />
          对所属部门的资源，负有安全保障责任，保障资源运行期间的资源及资源内租户应用的安全责任。
        </span>
      )}
    >
      <Icon
        type="question-circle"
        theme="filled"
        style={{ marginRight: '8px', color: '#1890ff' }}
      />
    </Popover>
  )
}
