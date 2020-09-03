import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { router } from 'umi'
import { Spin, Menu, Icon } from 'antd'
import url from '@/assets/一朵云运营平台用户指南20200318.pdf'
import HeaderDropdown from '../HeaderDropdown'
import MessageDropDown from '../MessageCenter/MessageDropDown'
import styles from './index.less'

class HeaderRight extends PureComponent {
  onMenuClick = ({ key }) => {
    const { dispatch } = this.props
    if (key === 'userinfo') {
      router.push('/manage/userinfo')
    }
    if (key === 'logout') {
      dispatch({
        type: 'login/logout',
      })
    }
    if (key === 'password') {
      router.push('/manage/password')
    }
    if (key === 'totp') {
      router.push('/manage/totp')
    }
    if (key === 'download') {
      router.push('/manage/download')
    }
  };

  render () {
    const { userInfo } = this.props
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="userinfo">
          <Icon type="user" style={{ marginRight: 8, fontSize: 14, color: 'rgba(0,0,0,0.65)' }} />
          我的信息
        </Menu.Item>
        <Menu.Item key="manual">
          <a download="一朵云运营平台-用户使用手册" href={url}>
            <i className="iconfont" style={{ marginRight: 8, fontSize: 14 }}>&#xe670;</i>
            用户手册
          </a>
        </Menu.Item>
        <Menu.Item key="download">
          <Icon type="download" style={{ marginRight: 8, fontSize: 14 }} />
          下载中心
        </Menu.Item>
        <Menu.Item key="password">
          <i className="iconfont" style={{ marginRight: 8, fontSize: 14 }}>&#xe66d;</i>
          修改密码
        </Menu.Item>
        <Menu.Item key="totp">
          <i className="iconfont" style={{ marginRight: 8, fontSize: 14 }}>&#xe66e;</i>
          认证方
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="logout" />
          退出
        </Menu.Item>
      </Menu>
    )
    return (
      <div className={styles.right}>
        <a style={{ marginRight: 8 }} href="https://manage.cloud.zj.gov.cn">
          政务专有云区
        </a>
        <a style={{ marginRight: 8 }} href="https://manage.internet.cloud.zj.gov.cn">
          政务公有云区
        </a>
        <MessageDropDown />
        {userInfo.username ? (
          <HeaderDropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <span className={styles.name}>
                你好，
                {' '}
                {userInfo.username}
              </span>
            </span>
          </HeaderDropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
      </div>
    )
  }
}

export default connect(({ user, global }) => ({
  userInfo: user.userInfo,
  collapsed: global.collapsed,
  notices: global.notices,
}))(HeaderRight)
