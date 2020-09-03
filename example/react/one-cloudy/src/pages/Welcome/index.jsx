import React from 'react'
import { Modal, Button } from 'antd'
import homePng from '@/assets/home.png'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import { connect } from 'dva'
import styles from './index.less'

// console.info({ version: 'v1', message: 'hell' });
@connect(({ user }) => ({
  userInfo: user.userInfo,
}))
class Welcome extends React.Component {
  state = {
    visible: false,
    waiting: 10,
  };

  componentDidMount () {
    const { dispatch, userInfo } = this.props
    const isRead = !userInfo.isReadProtocol
    if (isRead) {
      this.setTimer()
      dispatch({
        type: 'user/queryProtocol',
      }).then((res) => {
        this.setState({
          visible: true,
          protpcolData: res.resData.protocolContent,
        })
      })
    }
  }

  onShow = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'user/submitProtocol',
    }).then(() => {
      this.onHide()
    })
  };

  onHide = () => {
    this.setState({
      visible: false,
    })
  };

  setTimer = () => {
    this.timer = setInterval(() => {
      const { waiting } = this.state
      if (waiting === 0) {
        return this.clearTimer()
      }

      this.setState({
        waiting: waiting - 1,
      })
    }, 1000)
  };

  clearTimer = () => {
    this.timer && clearInterval(this.timer)
  };

  render () {
    const { visible, protpcolData, waiting } = this.state
    return (
      <PageHeaderWrapper>
        <div style={{ margin: '0 auto', paddingTop: 50, textAlign: 'center' }}>
          <img src={homePng} alt="" width="65%" />
          <h1 style={{ fontSize: '28px', paddingTop: 100, paddingLeft: 20 }}>
            欢迎登陆一朵云管理平台
          </h1>
        </div>
        <Modal
          width={800}
          title="用户协议须知"
          closable={false}
          visible={visible}
          onCancel={this.onHide}
          maskClosable={false}
          className={styles.modal}
          footer={(
            <Button type="primary" disabled={waiting !== 0} onClick={this.onShow}>
              {waiting !== 0 && `${waiting}s`}
              {' '}
              我已知晓，并遵守
            </Button>
          )}
        >
          <div dangerouslySetInnerHTML={{ __html: protpcolData }} />
        </Modal>
      </PageHeaderWrapper>
    )
  }
}

export default Welcome
