/**
 * DataSmartRadioButton组件
 * 带注释、支持key-value同时获取
 * @param {string|array[string]} id id可以传单个，或两个，两个用于表单既存key又存value的情况（数据回显，或者后端需要两个参数
 * 只有id传多个的时候才会订阅onFormChange事件，启动多个的处理逻辑
 * @param optionData select的选择列表，当id为多个的时候必须拥有key，value属性
 */
import React from 'react'
import { ModelCard } from '@/components/OperationCenter/Product/base'
import { RadioButtonItem } from '../../../FormItem'
import connectName from '../connectName'
import styles from '../../style.less'

const DATA = [
  {
    title: '标准版',
    key: 1,
    contents: [
      '每套标准版DataSmart包括租户资源大屏、租户安全大屏及租户拓扑大屏',
      '1. 租户资源大屏：展示ECS、SLB、RDS、OSS的资源使用和分布情况；',
      '2. 租户安全大屏：展示网络攻击情况、受攻击趋势、风险威胁等安全数据；',
      '3. 租户拓扑大屏：展示多种网络情况下的资源拓扑关系；',
    ],
  },
  {
    title: '定制版',
    key: 2,
    contents: [ '根据您的需要定制专属大屏' ],
  },
]
const columns = [
  {
    title: '',
    dataIndex: 'title',
    key: 'title',
    render: (text, record) => (
      <div>
        <h4>{text}</h4>
        {record.contents.map((content) => (
          <p className={styles.extar} key={content}>
            {content}
          </p>
        ))}
      </div>
    ),
  },
]
@connectName
class DataSmartRadioButton extends React.Component {
  state = {
    stateVisible: false,
  };

  updateChildState () {
    this.setState({ stateVisible: true })
  }

  handleClose () {
    this.setState({ stateVisible: false })
  }

  render () {
    const { stateVisible } = this.state
    const {
      form,
      formItemLayout,
      label,
      tip,
      placeholder,
      optionData,
      isShowTips,
      ...arg
    } = this.props
    return (
      <>
        <RadioButtonItem
          label={label}
          className="product-item"
          placeholder={placeholder || label}
          form={form}
          formItemLayout={formItemLayout}
          optionData={optionData}
          {...arg}
        />
        <ModelCard
          data={DATA}
          columns={columns}
          modalTitle="版本与功能介绍"
          stateVisible={stateVisible}
          showHeader={false}
          onHandleCancel={() => this.handleClose()}
        />
        {tip && (
          <p className={styles.tip}>
            <a onClick={(e) => this.updateChildState('abc', e)}>{isShowTips ? tip : null}</a>
          </p>
        )}
      </>
    )
  }
}

export default DataSmartRadioButton
