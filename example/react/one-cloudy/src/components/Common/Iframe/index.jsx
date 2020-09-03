
/**
 * iFrame组件，用于嵌入外部网页
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  message,
} from 'antd'
import {
  withRouter,
} from 'dva/router'
import { loginOrgin } from '@/contants'

class Iframe extends Component {
  componentDidMount () {
    const { messageEnabled } = this.props
    // @see https://github.com/davidjbradshaw/iframe-resizer
    if (window.iFrameResize) {
      this.resizer = window.iFrameResize({
        checkOrigin: false,
        // inPageLinks: true,
        /**
         * 嵌入的页面没有包含html标签，所以只能通过计算body或者documentElement的高度
         * heightCalculationMethod可以使用的值：'bodyScroll'/'documentElementScroll'
         */
        heightCalculationMethod: 'bodyScroll',
        // log: true,
      }, this.dom)
    }
    // 如果不需要监听postMessage
    if (messageEnabled) {
      // 使用postMessage来监听框架内嵌入页的message
      if (window.addEventListener) {
        window.addEventListener('message', this.handleMessage, false)
      } else if (window.attachEvent) {
        window.attachEvent('message', this.handleMessage)
      }
    }
  }


  componentWillUnmount () {
    const { messageEnabled } = this.props
    this.resizer = null
    if (messageEnabled) {
      // 移除监听
      if (window.removeEventListener) {
        window.removeEventListener('message', this.handleMessage)
      } else if (window.detachEvent) {
        window.detachEvent('message', this.handleMessage)
      }
    }
  }

  handleMessage = (e) => {
    const { messageOrigin, history, backUrl } = this.props
    if (e.origin.indexOf(loginOrgin) < 0 || e.origin !== messageOrigin || !e.data) {
      return
    }
    switch (e.data.type) {
      // case 'scrollTop':
      //   // 滚动条返回顶部
      //   setTimeout(() => {
      //     window.scrollTo(0, 0);
      //   }, 13);
      //   break;
      case 'scrollCenter':
        // 滚动条滚动居中
        setTimeout(() => {
          window.scrollTo(0, Math.ceil(document.body.scrollHeight / 3))
          // console.log('scrollCenter=', Math.ceil(document.body.scrollHeight / 3));
        }, 46)
        break
      case 'back':
        history.push(backUrl)
        break
      case 'error':
        if (e.data.message) {
          // 弹出提示
          message.error(e.data.message)
        }
        break
      default:
    }
  }

  render () {
    const {
      title,
      src,
      style,
    } = this.props
    return (
      <iframe
        title={title}
        ref={(obj) => { this.dom = obj }}
        src={src}
        frameBorder="0"
        id="appStoreIframe"
        style={{ minHeight: (window.innerHeight - 200), width: '100%', ...style }}
      />
    )
  }
}

Iframe.propTypes = {
  // iframe的src地址
  src: PropTypes.string.isRequired,
  // iframe的title标题
  title: PropTypes.string,
  // 是否启用postmessage
  messageEnabled: PropTypes.bool,
  // posemessage消息来源（填写域名）
  messageOrigin: PropTypes.string,
  // 返回上页面
  backUrl: PropTypes.string,
  history: PropTypes.object.isRequired,
}
Iframe.defaultProps = {
  title: '',
  messageEnabled: false,
  messageOrigin: '',
  backUrl: '',
}
export default withRouter(Iframe)
