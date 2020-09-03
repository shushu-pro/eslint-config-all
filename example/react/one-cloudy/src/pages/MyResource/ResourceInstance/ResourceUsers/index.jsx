/**
 * 资源使用人
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Form, Popover, Icon, Dropdown, Menu, message } from 'antd'
import { PRODUCT_FIELDS } from '@/components/OperationCenter/Product/base/_constant'
import AddUser from './AddUser'
import AddUserList from './AddUserList'

let id = 0
class ResourceUsers extends React.Component {
  constructor (props) {
    super(props)
    // 获取已有的id
    const idList = props.initialValue.map((item, index) => index)
    this.state = {
      dataSource: props.initialValue || [],
      idList,
      defautState: false,
    }
    id = idList.length ? Math.max.apply(null, idList) + 1 : 0
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.initialValue !== prevState.dataSource) {
      const idList = nextProps.initialValue.map((item, index) => index)
      id = idList.length ? Math.max.apply(null, idList) + 1 : 0
      // console.log('dataSource', nextProps.initialValue);
      return {
        idList,
        dataSource: nextProps.initialValue || [],
        // defautState: false,
      }
    }
    return null
  }

  remove = () => {
    this.setState({
      defautState: false,
    })
  };

  handleMenuClick = (e) => {
    const { form } = this.props
    const { idList } = this.state
    let [ keys, nextKeys ] = [ null, null ]
    switch (e.key) {
      case 'defaut':
        this.setState({
          defautState: true,
        })
        break
      case 'defined':
        keys = form.getFieldValue(PRODUCT_FIELDS.RESOURCE_KEYS) || idList
        nextKeys = keys.concat(id++)
        form.setFieldsValue({
          [PRODUCT_FIELDS.RESOURCE_KEYS]: nextKeys,
        })
        break
      default:
    }
  };

  // 帮助提示
  renderHelp = () => (
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
  );

  render () {
    const { form, formItemLayout, label, userList, required } = this.props
    const { dataSource, idList, defautState, definedState } = this.state
    const resourceUserIds = form.getFieldValue(PRODUCT_FIELDS.RESOURCE_USER_IDS) || []
    const keyDom = form.getFieldDecorator(PRODUCT_FIELDS.RESOURCE_KEYS, {
      initialValue: idList,
      rules: [
        (rule, value, callback) => {
          if ((value && value.length > 0) || resourceUserIds.length > 0) {
            return callback()
          }
          return callback(new Error('请添加资源使用人'))
        },
      ],
    })(<input type="hidden" />)
    const keys = form.getFieldValue(PRODUCT_FIELDS.RESOURCE_KEYS) || idList
    return (
      <Form.Item
        key="formItem-resourceUserList"
        {...formItemLayout}
        label={label && (
          <span>
            {this.renderHelp()}
            资源使用人
          </span>
        )}
        required={required}
        style={{ marginBottom: 0 }}
      >
        <Dropdown
          overlay={(
            <Menu onClick={this.handleMenuClick} style={{ textAlign: 'center', marginTop: 10 }}>
              <Menu.Item key="defaut" disabled={defautState}>
                用户表选取
              </Menu.Item>
              <Menu.Item key="defined">自定义输入</Menu.Item>
            </Menu>
          )}
        >
          <a>
            <Icon type="plus-circle" style={{ color: '#1890ff' }} />
            <span style={{ color: '#1890ff', marginLeft: 5 }}>添加</span>
          </a>
        </Dropdown>
        {defautState && (
          <AddUserList
            formItemLayout={formItemLayout}
            form={form}
            remove={this.remove}
            optionData={userList}
            initialValue={[]}
          />
        )}
        {keys.map((k) => <AddUser key={k} form={form} keysList={keys} id={k} initValue={dataSource[k]} />)}
        <Form.Item>{keyDom}</Form.Item>
      </Form.Item>
    )
  }
}

export default ResourceUsers
ResourceUsers.defaultProps = {
  required: true,
  optionData: [],
  label: true,
}
ResourceUsers.propTypes = {
  form: PropTypes.object.isRequired,
  formItemLayout: PropTypes.object.isRequired,
  required: PropTypes.bool,
  optionData: PropTypes.array,
  label: PropTypes.bool,
}
