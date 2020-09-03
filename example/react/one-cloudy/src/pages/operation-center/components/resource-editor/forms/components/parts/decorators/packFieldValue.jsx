
import React from 'react'
import { connect } from 'dva'
import { Input } from 'antd'

export default function (Component) {
  class ConnectName extends React.Component {
    constructor (props) {
      const { id: propsId } = props
      let key
      let value
      if (Array.isArray(propsId)) {
        [ key, value ] = propsId
      } else {
        key = propsId
      }
      super(props)
      this.state = {
        oldSelectedKey: undefined,
        key, // 表单字段id值（主要用于提交）
        value, // 表单字段name值（主要用于展示）
      }
    }

    /**
     * 为了数据回显，需要将id(key)和name(value)都存入表单，key用于后端，value用于前端回显
     * key为空的时候value也要清空保持数据同步
     * key和value时刻同步
     */
    UNSAFE_componentWillReceiveProps = (nextProps) => {
      const { key, value, oldSelectedKey } = this.state
      const { form } = nextProps
      if (!value) return
      const selectedKey = form.getFieldValue(key)
      if (selectedKey !== oldSelectedKey) {
        this.setValueField(nextProps)
      } else if (selectedKey && !form.getFieldValue(value)) {
        // selectedKey被清空但立马又被赋予初始值时（此时selectedKey===oldSelectedKey），
        // 如果valueField不存在，则也要做处理
        this.setValueField(nextProps)
      }
    };

    setValueField = (props) => {
      const { key, value } = this.state
      const { form, optionData = [] } = props
      const selectedKey = form.getFieldValue(key)
      const selectedData = optionData.find((o) => o.key === selectedKey)
      const selectedName = selectedData ? selectedData.value : undefined
      this.setState({
        oldSelectedKey: selectedKey,
      })
      if (selectedData) {
        form.setFieldsValue({ [value]: selectedName })
      }
    };

    render () {
      const { form, ...arg } = this.props
      const { key, value } = this.state
      return (
        <>
          <Component form={form} {...arg} id={key} />
          {value && form.getFieldDecorator(value, {})(<Input type="hidden" />)}
        </>
      )
    }
  }
  return ConnectName
}
