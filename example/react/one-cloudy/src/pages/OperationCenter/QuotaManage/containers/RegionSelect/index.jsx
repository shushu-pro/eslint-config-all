import React, { useState, useEffect } from 'react'
import { connect } from 'dva'
import { Radio } from 'antd'
import { quotaRegion, subDeptCloudInfo } from '@/services/OperationCenter/resourceApply'

const generateList = (dataList) => ((dataList && dataList.length > 0) ? dataList.map((item) => {
  const { name, id, canApplyQuota } = item
  return {
    key: id,
    value: name,
    canApplyQuota,
  }
}) : [])
function RegionSelect ({ onChange: propsOnChange, type, ...arg }) {
  const [ value, setValue ] = useState()
  const [ regionList, setRegionList ] = useState([])
  const handleChange = (key) => {
    setValue(key)
    const obj = regionList.find((o) => o.key === key)
    const { value: val } = obj
    propsOnChange && propsOnChange(key, val)
  }
  const onChange = (e) => {
    const key = e.target.value
    handleChange(key)
  }
  useEffect(() => {
    if (type === 'subordinateDept') {
      quotaRegion({ deptId: 0 }).then(({ resData }) => {
        const unitList = generateList(resData.regions)
        if (unitList.length > 0) {
          setRegionList(unitList)
        }
      })
    } else {
      subDeptCloudInfo({ deptId: 0 }).then(({ resData }) => {
      // 目前默认获取主中心的副区域，后面再改
        const unitList = generateList(resData.regions)
        if (unitList.length > 0) {
          setRegionList(unitList)
        }
      })
    }
  }, [])
  useEffect(() => {
    if (regionList.length > 0) {
      const defaultKey = regionList[0].key
      handleChange(defaultKey)
    }
  }, [ regionList ])
  return (
    <Radio.Group
      onChange={onChange}
      value={value}
      {...arg}
    >
      {regionList.map((o) => (
        (type === 'quotaApply' && o.canApplyQuota === '0') ||
        type === 'quotaCheck' ||
        type === 'distribute' ||
        type === 'subordinateDept'
          ? <Radio.Button value={o.key} key={o.key}>{o.value}</Radio.Button> : null
      ))}
    </Radio.Group>
  )
}

export default connect(({ user }) => ({
  deptId: user.deptId,
}))(RegionSelect)
