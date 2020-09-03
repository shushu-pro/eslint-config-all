/**
 * 展示已经添加的资源使用人
 */
import React, { PureComponent } from 'react'
import cx from 'classnames'
import StackPanel from '@/components/Common/StackPanel'
import { PRODUCT_FIELDS } from '@/pages/OperationCenter/ResourceApply/constant'
import styles from './index.less'

class ResUserInfo extends PureComponent {
  state = {};

  render () {
    const { userList } = this.props
    if (!userList || !Array.isArray(userList)) {
      return null
    }
    return (
      <div className={styles.user}>
        {userList.map((item) => (
          <StackPanel
            key={`${item[PRODUCT_FIELDS.USER_NAME]}-${item[PRODUCT_FIELDS.MOBILE]}`}
            className={styles.user}
          >
            <div className={styles.username}>
              <i className={cx('icon', 'iconfont', styles.mobileIcon)}>&#xe660;</i>
              {item[PRODUCT_FIELDS.USER_NAME]}
            </div>
            <div className={styles.mobile}>
              <i className={cx('icon', 'iconfont', styles.mobileIcon)}>&#xe64b;</i>
              {item[PRODUCT_FIELDS.MOBILE]}
            </div>
            <div className={styles.email}>
              <i className={cx('icon', 'iconfont', styles.mobileIcon)}>&#xe65f;</i>
              {item[PRODUCT_FIELDS.EMAIL]}
            </div>
          </StackPanel>
        ))}
      </div>
    )
  }
}

export default ResUserInfo
