import React from 'react'
import { Form } from 'antd'

function FormConnect (formCreateParams) {
  return function a (Component) {
    class FormConnectComponent extends React.PureComponent {
      // form出发onChange事件时调用的订阅函数队列
      formChangeFnList = [];

      subscribeFormChange = (fn) => {
        if (typeof fn === 'function') {
          this.formChangeFnList.push(fn)
        }
      };

      unSubscribeFormChange = (fn) => {
        if (typeof fn === 'function') {
          this.formChangeFnList = this.formChangeFnList.filter((o) => o === fn)
        }
      };

      render () {
        const { form } = this.props
        form.subscribeFormChange = this.subscribeFormChange
        form.formChangeFnList = this.formChangeFnList
        form.unSubscribeFormChange = this.unSubscribeFormChange
        return <Component {...this.props} />
      }
    }
    return Form.create({
      ...formCreateParams,
      onValuesChange (props, changedValues) {
        formCreateParams.onValuesChange && formCreateParams.onValuesChange(props, changedValues)
        const { form } = props
        const changeFields = Object.keys(changedValues)
        const changeField = changeFields.length === 1 ? changeFields[0] : changeFields
        // 判断onchange是否含有fields
        const has = (fields) => changeFields.findIndex((o) => o === fields) > -1
        form.formChangeFnList.forEach((fn) => {
          fn(changedValues, changeField, has)
        })
      },
    })(FormConnectComponent)
  }
}
export default FormConnect
