
import React, { Component } from 'react'
import _ from 'lodash'
import { Progress, InputNumber, Form } from 'antd'
import { API_PARAMS } from '../../constant'
import NoQuotaPage from '../NoQuotaPage'
import { assignedPercent, usedPercent } from '../../utils.jsx'
import './style.less'

const { Item } = Form
const {
  QUOTA_LIST, QUOTA_TOTAL, QUOTA_REMAIN, QUOTA_USED, QUOTA_ASSIGN,
} = API_PARAMS
class DistributeContent extends Component {
  changeData = (val, item, index) => {
    if (!(val >= 0)) return // val可能会是-字符串，当val>=0时才会进入到后面的程序
    // val可能会是空字符串，需要重置为0
    const value = val ? parseInt(val, 10) : 0
    const { onChange, parentData, data } = this.props
    const newData = _.cloneDeep(data)
    const newParentData = _.cloneDeep(parentData)

    // 获取差值
    const diff = value - data[QUOTA_LIST][index][QUOTA_TOTAL]
    // parentData根据差值进行变动
    newParentData[QUOTA_LIST][index][QUOTA_REMAIN] -= diff
    newParentData[QUOTA_LIST][index][QUOTA_ASSIGN] += diff
    newData[QUOTA_LIST][index] = {
      ...item,
      [QUOTA_TOTAL]: value, // 修改的配额总量
      [QUOTA_REMAIN]: value - item[QUOTA_USED] - item[QUOTA_ASSIGN], // 总量修改后，剩余的也变了
    }

    // 校验
    const validateStatus = []
    const max = item[QUOTA_TOTAL] + parentData[QUOTA_LIST][index][QUOTA_REMAIN]
    const min = item[QUOTA_ASSIGN] + item[QUOTA_USED]
    validateStatus[index] = (value < min || value > max) ? 'error' : ''
    onChange && onChange(newData, newParentData, validateStatus)
  }

  render () {
    const { data, parentData } = this.props
    return (
      <div className="distribute-content">
        {_.isEmpty(data)
          ? (
            <NoQuotaPage text="请选择部门进行配额分配" />
          )
          : (
            <>
              <h2>该部门配额与使用情况：</h2>
              <ul className="distribute-content-detail">
                {data[QUOTA_LIST].map((item, index) => {
                  const label = `${item[API_PARAMS.QUOTA_NAME]} (${item[API_PARAMS.QUOTA_UNIT]})`
                  const max = item[QUOTA_TOTAL] + parentData[QUOTA_LIST][index][QUOTA_REMAIN]
                  const min = item[QUOTA_ASSIGN] + item[QUOTA_USED]
                  const value = item[QUOTA_TOTAL] < min ? min : item[QUOTA_TOTAL]
                  item[QUOTA_TOTAL] = value
                  const validateStatus = (value < min || value > max) ? 'error' : ''
                  return (
                    <li key={index}>
                      <h4>
                        {label}
                        ：
                      </h4>
                      <div className="detail-content clearfix">
                        <Item
                          className="item"
                          validateStatus={validateStatus}
                          help={`取值在${min}-${max}之间`}
                        >
                          <InputNumber
                            placeholder={label}
                            value={value}
                            onChange={(val) => this.changeData(val, item, index)}
                            max={max}
                            min={min}
                            precision={0}
                            style={{ width: '120px' }}
                          />
                        </Item>
                        <div className="item">
                          <p className="progress-msg">
                            使用情况：
                            {`${item[QUOTA_USED]}/${item[QUOTA_ASSIGN]}/${item[QUOTA_REMAIN]}`}
                          </p>
                          <Progress
                            className="progress"
                            percent={assignedPercent(item)}
                            successPercent={usedPercent(item)}
                            showInfo={false}
                          />
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </>
          )}
      </div>
    )
  }
}

export default DistributeContent
