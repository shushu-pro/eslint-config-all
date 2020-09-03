// 账号详情页面-基础信息
// noEdit 表示只展示信息，无法编辑内容
import React from 'react'
import { Input, Icon, Form } from 'antd'
import AddTooltip from '@/components/Common/AddTooltip'
import styles from './index.less'

class UserInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount () {
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log(nextProps);
  //   console.log(prevState);
  // }

  render () {
    const {
      form, userInfoKey, onSumbit, value, onChangeStatus, status, noEdit,
    } = this.props
    const { getFieldDecorator } = form
    return (
      <span key={userInfoKey} className={styles.userInfo}>
        {
          !status
            ? (
              <div className={styles.userInfoDetail}>
                <span className={styles.userInfoDetailSpan}>
                  <span className={styles.userInfoDetailValue}>
                    <AddTooltip text={value}>
                      {value}
                    </AddTooltip>
                  </span>
                </span>
                <Icon
                  type="form"
                  onClick={onChangeStatus}
                  style={{
                    display: noEdit ? 'none' : 'inline-block',
                    lineHeight: '44px',
                    verticalAlign: 'text-bottom',
                  }}
                />
              </div>
            )
            : (
              <Form.Item key={`${userInfoKey}`}>
                {
                  getFieldDecorator(`${userInfoKey}`, {
                    initialValue: value,
                  })(
                    <Input />,
                  )
                }
                <AddTooltip text="保存" placement="top">
                  <Icon
                    type="check"
                    onClick={() => (onSumbit(userInfoKey))}
                    style={{ color: 'green', marginRight: '10px' }}
                  />
                </AddTooltip>
                <AddTooltip text="取消" placement="top">
                  <Icon type="close" onClick={onChangeStatus} style={{ color: 'red', marginRight: '10px' }} />
                </AddTooltip>
              </Form.Item>
            )
        }
      </span>
    )
  }
}
export default UserInfo
