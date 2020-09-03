// 账号详情页面-基础信息
import React from 'react'
import { connect } from 'dva'
import {
  Row, Col, Icon, Form, message, Spin,
} from 'antd'
import UserAvatar from '@/components/UserAvatar'
import { router } from 'umi'
import UserInfo from '@/components/UserInfo'
import styles from './index.less'
@connect(({ ACuser, loading }) => ({
  ...ACuser,
  loading: !!loading.effects['ACuser/getUserById'],
}))

class BasicInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userInfo: {},
      status: {
        fullname: false,
        mobile: false,
        email: false,
      },
      list: [
        {
          name: '显示名',
          type: 'fullname',
          icon: 'user',
        },
        {
          name: '联系方式',
          type: 'mobile',
          icon: 'phone',
        },
        {
          name: '邮箱',
          type: 'email',
          icon: 'mail',
        },
      ],
    }
  }

  componentDidMount () {
    this.getUserById()
  }

  getUserById = () => {
    const { dispatch, userId } = this.props
    dispatch({
      type: 'ACuser/getUserById',
      payload: {
        userId,
      },
      callback: (e) => {
        if (e.successful) {
          const { resData } = e
          const { list } = this.state
          list.forEach((item) => {
            item.value = resData[item.type]
          })
          this.setState({
            userInfo: resData,
            list,
          })
        }
      },
    })
  }

  uploadAvatar = (url) => {
    const { dispatch, userId } = this.props
    dispatch({
      type: 'ACuser/uploadUserImage',
      payload: {
        userImage: url,
        userId,
      },
      callback: (e) => {
        if (e.successful) {
          message.success('头像上传成功！')
          this.getUserById()
        }
      },
    })
  }

  renderList = () => {
    const { list, status } = this.state
    const { form } = this.props
    const iconStyle = {
      fontSize: '20px',
      color: '#fff',
      background: '#1890ff',
      padding: '10px',
    }
    return list.map(item => (
      <Col span={8} key={item.value}>
        <div className={styles.listname}>
          {item.name}：
        </div>
        <div style={{ display: 'flex' }}>
          <span>
            <Icon type={item.icon} style={iconStyle} />
          </span>
          <UserInfo
            form={form}
            userInfoKey={item.type}
            onSumbit={this.onSumbit}
            value={item.value}
            onChangeStatus={() => { this.onChange(item.value) }}
            status={status[item.value]}
          />
        </div>
      </Col>))
  }

  // 用于判断显示名/联系方式/邮箱互斥
  onChange = (str) => {
    const { status } = this.state
    if (str) {
      for (const i in status) {
        if (i != str && status[i]) {
          message.error('请先保存或取消之前的修改的内容')
          return
        }
      }
      status[str] = !status[str]
    } else {
      for (const i in status) {
        status[i] = false
      }
    }
    /* eslint-enable */
    this.setState({
      status,
    })
  }

  // 校验手机号码或者邮箱格式
  validator = (values, key) => {
    const value = values[key]
    const mobile = /^[1][3,4,5,7,8][0-9]{9}$/
    const email = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    if (key === 'mobile' && !mobile.test(value)) {
      message.error('手机号码格式错误')
      return false
    }
    if (key === 'email' && !email.test(value)) {
      message.error('邮箱格式错误')
      return false
    }
    return true
  }

  // 提交修改信息
  onSumbit = (key) => {
    const { list } = this.state
    const param = {}
    list.map((item) => {
      param[item.type] = item.value
    })
    const { form, dispatch, userId } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      if (!this.validator(values, key)) {
        return
      }

      dispatch({
        type: 'ACuser/updateUserInfo',
        payload: {
          userId,
          ...param, // 将未改动的数据返给后端
          ...values,
        },
        callback: (e) => {
          if (e.successful) {
            message.success(e.resData)
            this.getUserById()
          }
        },
      })
      this.onChange()
    })
  }

  render () {
    const { userId, loading } = this.props
    const { userInfo } = this.state
    return (
      <div className={styles.basicInfo}>
        <Spin spinning={loading}>
          <div className={styles.avter}>
            <UserAvatar
              uploadAvatar={this.uploadAvatar}
              imgUrl={userInfo && userInfo.userImage}
            />
            <div className={styles.currentacount}>
              <div className={styles.currentacountrow}>
                <div className={styles.currentacountttitle}>当前账号:</div>
                <div className={styles.currentacountrowcontent}>
                  {userInfo && userInfo.username}
                </div>
              </div>
              <div className={styles.currentacountrow}>
                <div className={styles.currentacountttitle}>部门组织:</div>
                <div className={styles.currentacountrowcontent}>
                  {userInfo && userInfo.ocDeptName}
                </div>
              </div>
              <div className={styles.currentacountrow}>
                <div className={styles.currentacountttitle}>上次登录:</div>
                <div className={styles.currentacountrowcontent}>
                  {userInfo && userInfo.lastLoginTime}
                </div>
              </div>
            </div>
          </div>
          <Form className={styles.form}>
            <Row>
              {this.renderList()}
            </Row>
          </Form>
          {
            userId ? null
              : (
                <div className={styles.resetPWD}>
                  <div>
                    <span className={styles.resetPWDname}>
                      <i className="iconfont" style={{ marginRight: 8, fontSize: 14 }}>&#xe66d;</i>
                      登陆密码
                    </span>
                    <span className={styles.resetPWDTips}>
                      登录密码应至少包含大写字母、小写字母和数字，且长度不小于8个字符
                    </span>
                  </div>
                  <div onClick={() => { router.push('/manage/password') }} className={styles.resetPWDreset}>
                    修改密码
                  </div>
                </div>)
          }
        </Spin>

      </div>
    )
  }
}
export default Form.create({})(BasicInfo)
