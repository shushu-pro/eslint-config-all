/**
 * 项目详情 - 项目联系人/项目负责人
 */
import React from 'react'
import FormItem from '@/components/Common/FormItem'
import StackPanel from '@/components/Common/StackPanel'
import { PROJECT_USER_DATA, defaultFormItemLayout } from './contant'
import styles from './index.less'

class User extends React.PureComponent {
  render () {
    const { data, formItemLayout, ...restProps } = this.props
    if (!data) {
      return null
    }

    return PROJECT_USER_DATA.map((items) => {
      let valueList = '暂无'
      if (data[items.value] && Array.isArray(data[items.value]) && data[items.value].length > 0) {
        valueList = data[items.value].map((item) => (
          <StackPanel key={item.userId || item.userName}>
            <div style={{ width: 200 }}>
              {item.deptName && `${item.deptName}-`}
              {item.fullName}
            </div>
            {item.mobile && (
              <div>
                <i className="icon iconfont">&#xe64b;</i>
                {item.mobile}
              </div>
            )}
            {item.email && (
              <div>
                <i className="icon iconfont">&#xe65f;</i>
                {item.email}
              </div>
            )}
          </StackPanel>
        ))
      }

      return (
        <FormItem
          formItemLayout={formItemLayout || defaultFormItemLayout}
          label={items.label}
          key={items.value}
          className={styles.detail}
          value={valueList}
          {...restProps}
        />
      )
    })
  }
}

export default User
