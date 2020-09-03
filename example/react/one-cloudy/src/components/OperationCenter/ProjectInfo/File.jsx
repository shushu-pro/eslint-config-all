/**
 * 项目详情 - 解决方案
 */
import React from 'react'
import FormItem from '@/components/Common/FormItem'
import { FIELD_MAP } from '@/components/OperationCenter/Product/base/_constant'
import { defaultFormItemLayout } from './contant'
import styles from './index.less'

function Other (props) {
  const { data, id, formItemLayout, message, ...restProps } = props
  if (!data) {
    return null
  }

  let label
  if (Reflect.has(props, 'label')) {
    const { label: propsLabel } = props
    label = propsLabel
  } else {
    label = id && FIELD_MAP[id]
  }

  return (
    <FormItem
      formItemLayout={formItemLayout || defaultFormItemLayout}
      className={styles.detail}
      label={label}
      value={
        id && data[id] && data[id].length > 0
          ? data[id].map((item) => (
            <div key={item.fileId}>
              <a href={item.url} download={item.fileName}>
                <i className="icon iconfont">&#xe64c;</i>
                {item.fileName}
              </a>
              <div className="antd-pro-components-operation-center-upload-index-extra">
                {message}
              </div>
            </div>
          ))
          : '暂无'
      }
      {...restProps}
    />
  )
}

export default Other
