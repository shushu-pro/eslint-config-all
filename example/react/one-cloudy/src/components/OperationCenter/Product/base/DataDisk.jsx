/**
 * ECS - 数据盘表单组件
 */
import React from 'react'
import { Form, Input, Icon, Button } from 'antd'
import DiskSelectItem from './DiskSelectItem'
import { PRODUCT_FIELDS } from './_constant'

class DataDisk extends React.PureComponent {
  id = 0;

  state = {
    dataDiskNum: 16,
    toltal: 0,
  };

  UNSAFE_componentWillReceiveProps () {
    this.setToltal()
  }

  setToltal = () => {
    const { form } = this.props
    const keys = this.getDataDiskKeys()
    const dataDiskList = form.getFieldValue(PRODUCT_FIELDS.DATA_DISK_LIST)
    // let toltal = 0;
    if (dataDiskList) {
      // 根据keys来获取当前的数据
      // keys.forEach(item => {
      //   dataDiskList[item]
      //     ? (toltal += dataDiskList[item][PRODUCT_FIELDS.DISK_NUM])
      //     : toltal;
      // });
    }
    this.setState({
      toltal: keys.length,
    })
  };

  getDataDiskKeys = () => {
    const { form } = this.props
    return form.getFieldValue('dataDiskKeys') || []
  };

  // 删除一项
  onRemove = (k) => {
    const { form } = this.props
    const keys = this.getDataDiskKeys()
    if (keys.length === 0) {
      return
    }
    const nextKeys = keys.filter((key) => key !== k)
    const dataDiskList = form.getFieldValue(PRODUCT_FIELDS.DATA_DISK_LIST)
    delete dataDiskList[k - 1]
    form.setFieldsValue({
      dataDiskKeys: nextKeys,
      [PRODUCT_FIELDS.DATA_DISK_LIST]: dataDiskList,
    })
    this.setToltal()
  };

  // 新增一项
  onAdd = async () => {
    const { toltal } = this.state
    if (toltal >= 16) {
      return false
    }
    const { form } = this.props
    const keys = this.getDataDiskKeys()
    if (this.id === 0 && keys.length > 0) {
      this.id = keys[keys.length - 1]
    }
    this.id += 1
    const nextKeys = keys.concat(this.id)
    await form.setFieldsValue({
      dataDiskKeys: nextKeys,
    })
    this.setState({
      toltal: toltal + 1,
    })
  };

  // 渲染一项
  renderItem = () => {
    const { toltal } = this.state
    const { form, diskTypeList, required, disabled } = this.props
    const keys = this.getDataDiskKeys()
    return keys.map((k) => (
      <DiskSelectItem
        required={required}
        disabled={disabled}
        key={k}
        form={form}
        toltal={toltal}
        id={`${PRODUCT_FIELDS.DATA_DISK_LIST}[${k}]`}
        diskTypeList={diskTypeList}
        otherChild={!disabled && (
          <span>
            <Icon
              className="dynamic-delete-button"
              style={{ marginLeft: 16 }}
              type="minus-circle-o"
              onClick={() => this.onRemove(k)}
            />
          </span>
        )}
      />
    ))
  };

  render () {
    const { dataDiskNum, toltal } = this.state
    const { form, required, disabled } = this.props
    const { getFieldDecorator } = form
    return (
      <div>
        <Form.Item>
          <div>
            {!disabled && (
              <div>
                你已选择
                <span style={{ color: 'red' }}>
                  {' '}
                  {toltal}
                  {' '}
                </span>
                块盘，还可以选择
                {' '}
                <span style={{ color: 'red' }}>{dataDiskNum - toltal}</span>
                {' '}
                块盘；
              </div>
            )}
            {this.renderItem()}
            {getFieldDecorator('dataDiskKeys', {
              initialValue: [],
              rules: [
                {
                  type: 'array',
                  required,
                  whitespace: true,
                  message: '最少需要添加一块',
                },
              ],
            })(<Input type="hidden" />)}
            {!disabled && (
              <Button
                type="dashed"
                disabled={toltal >= 16 || disabled}
                onClick={this.onAdd}
                style={{ width: '200px' }}
              >
                <Icon type="plus" />
                {' '}
                添加一块磁盘
              </Button>
            )}
          </div>
        </Form.Item>
      </div>
    )
  }
}

export default DataDisk
