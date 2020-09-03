/**
 * 短信验证弹框
 *
 * action: 点击确定验证成功后要执行的func
 * smsContent:  发送的短信内容
 * title: 短信弹框标题
 * countdown: 请求验证码倒计时
 */

import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import Modals from '@/components/Common/Modals'
import { Button, Row, Col, Statistic, Input, message } from 'antd'
import styles from './index.less'

const { Countdown } = Statistic
// const deadline = Date.now() + (1000 * 60);

const mapDispatchToProps = (dispatch) => ({
  // 请求验证码
  smsAuthSend: (payload) => dispatch({
    type: 'operationOrder/smsAuthSend',
    payload: {
      content: payload,
    },
  }),

  // 验证码验证
  smsAuthValidate: (payload) => dispatch({
    type: 'operationOrder/smsAuthValidate',
    payload: {
      code: payload,
    },
  }),

  // 短信验证权限
  smsAuth: () => dispatch({
    type: 'operationOrder/smsAuth',
  }),
})
@connect(({ user, loading }) => ({
  userInfo: user.userInfo,
  loading: !!loading.effects['billSend/submitAdd'],
}), mapDispatchToProps)

class SmsAuthenModal extends React.PureComponent {
  constructor (props) {
    super(props)
    this.props.onRef(this)
    this.state = {
      visible: false, // 窗口
      isSmsSending: false, // 短信发送状态
      errorTips: '', // 验证码输入框下方错误提示
      confirmLoading: false,
      deadline: 0, // 时间
    }
  }


  // 短信验证弹框
  modalContent = () => {
    const { isSmsSending, errorTips, deadline } = this.state
    const { userInfo } = this.props
    return (
      <div>
        <Row>
          <Col span={5}>
            <div className={styles.leftTtitle}>
              <span>手机号码</span>
            </div>
          </Col>
          <Col span={17}>
            <div className={styles.content}>{userInfo.mobile}</div>
          </Col>
        </Row>
        <Row>
          <Col span={5}>
            <div className={styles.leftTtitle}>
              <span>验证码</span>
            </div>
          </Col>
          <Col span={11}>
            <Input placeholder="请输入验证码" maxLength={12} onChange={this.handelChange.bind(this)} value={this.state.inpValue} />
            { errorTips ? <div className={styles.remindText}>{errorTips}</div> : null }
          </Col>
          <Col span={6}>
            <Button type="primary" onClick={this.getSmsCode} disabled={isSmsSending} className={styles.smsBtn}>
              { isSmsSending ? '再次发送' : '发送验证码' }
              { isSmsSending ? <Countdown value={deadline} onFinish={this.countdownEnd} format="s" /> : null }
            </Button>
          </Col>
        </Row>
      </div>
    )
  }


  // 短信发送状态
  countdownEnd = () => {
    this.setState({
      isSmsSending: false,
    })
  }

  // 展示审核/审批/撤销 浮层
  onHide = () => {
    this.setState({
      inpValue: '',
      errorTips: '',
      visible: false,
      confirmLoading: false,
      // isSmsSending: false, // 关闭窗口不重新开始计时，防止无限请求短信
      // deadline: 0,
    })
  };

  // 展示审核/审批/撤销 浮层
  onShow = () => {
    const { smsAuth, action } = this.props
    // 增加短信验证的权限判断，没有权限不使用短信验证
    smsAuth().then((res) => {
      if (res) {
        this.setState({
          visible: true,
        })
      } else {
        action && action()
      }
    })
  };

  // 获取短信验证码
  getSmsCode = () => {
    const { smsAuthSend, smsContent, countdown } = this.props
    this.setState({
      errorTips: '',
    })
    const time = Date.now() + (1000 * countdown)
    smsAuthSend(smsContent).then(() => {
      message.success('验证码发送成功')
      this.setState({
        isSmsSending: true,
        deadline: time,
      })
    })
  }

  // 短信验证
  onSubmitResult = () => {
    const { smsAuthValidate, action } = this.props
    const { inpValue, isSmsSending } = this.state
    const ruleType = /^\d{6}$/ // 是否为6位数字
    if (!inpValue && !isSmsSending) {
      this.setState({
        errorTips: '请先获取验证码',
      })
      return
    }
    if (inpValue && !ruleType.test(inpValue)) {
      this.setState({
        errorTips: '请输入6位数字验证码',
      })
    } else {
      this.setState({
        confirmLoading: true,
      })
      smsAuthValidate(inpValue)
        .then((res) => {
          this.setState({
            confirmLoading: false,
          })
          if (res) {
            if (action) {
              action()
            }
            // message.success('提交成功');
            this.onHide()
          }
        })
        .catch((err) => {
          this.setState({
            confirmLoading: false,
          })
        })
    }
  };

  // 获取输入框内容
  handelChange (e) {
    this.setState({
      inpValue: e.target.value,
      errorTips: '',
    })
  }

  render () {
    const { visible, confirmLoading } = this.state
    const { title } = this.props
    if (!visible) {
      return null
    }
    return Modals({
      refs: 'Modal',
      width: 600,
      title,
      content: this.modalContent(),
      visible,
      confirmLoading,
      onCancel: this.onHide,
      onOk: this.onSubmitResult,
    })
  }
}

SmsAuthenModal.propTypes = {
  title: PropTypes.string, // 短信弹框标题
  smsContent: PropTypes.string, // 短信内容，内容可以自己定制，默认模板为申请资源提交时使用
  action: PropTypes.func, // 点击确定后真正执行的方法，不传点击确定只会关闭短信验证窗口
  countdown: PropTypes.number, // 申请短信倒计时，默认60秒
}
SmsAuthenModal.defaultProps = {
  countdown: 60,
  title: '手机验证码验证',
  smsContent: '【浙江省政务一朵云】您的验证码：$code$，有效时间为15分钟。千万不要把验证码告诉别人哦。',
  action: null,
}
export default SmsAuthenModal
