/**
 * 项目信息展示
 * 用于申请单详情、批量申请信息确认、资源修改
 */
import React from 'react'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
// import {
//   Name, User, Other, File
// } from '@/components/OperationCenter/ProjectInfo';
import BasicInfo from '@/pages/AuthorityCenter/ProjectManage/BasicInfo'

function ResProjectInfo ({
  baseInfo, formItemLayout, unitId, style,
}) {
  const propsData = {
    data: baseInfo,
    formItemLayout,
    unitId,
  }
  console.log('propsData', propsData)
  return (
    <>
      <LeftTitle title="项目信息" noDivider icon="icontab-zhangdanxiangqing" />
      <BasicInfo {...propsData} />
      {/* <div style={style}>
        <Name {...propsData} />
        <User {...propsData} />
        <Other {...propsData} />
        <File {...propsData} id="attachFileLinks" label="项目附件" />
      </div> */}
    </>
  )
}

export default ResProjectInfo
