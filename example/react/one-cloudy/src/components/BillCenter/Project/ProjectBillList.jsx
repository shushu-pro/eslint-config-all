import React, { PureComponent } from 'react'
import { Link } from 'umi'
import { Table } from 'antd'
import AddTooltip from '@/components/Common/AddTooltip'
import { getFloatStr } from '@/utils/utils'

class ProjectBillList extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { match, pageData, queryList } = this.props
    const { billNo, departmentId, department, seqno, unitId, ocFinId } = match.params
    const { pageSize, totalCount, currPage, list } = pageData
    const columns = [
      {
        title: '项目名称',
        dataIndex: 'projectName',
        render: (projectName, record) => {
          const { projectInfoId, productRegionId } = record
          let url = `/manage/bill-center/myBill/project/${billNo}/
          ${seqno}/${departmentId}/${projectInfoId}/${projectName}/projectResource/${productRegionId}`
          if (department) {
            url = `/manage/bill-center/list/project/${billNo}/${seqno}/${ocFinId}/${departmentId}/${department}/${projectInfoId}/${projectName}/projectResource/${productRegionId}`
          }
          if (unitId) {
            url = `/manage/bill-center/list/project/${billNo}/${seqno}/${ocFinId}/${departmentId}/${department}/${projectInfoId}/${projectName}/projectResource/${productRegionId}/${unitId}`
          }
          return (
            <AddTooltip text={projectName}>
              {projectInfoId ? <Link to={url}>{projectName || '-'}</Link> : projectName}
            </AddTooltip>
          )
        },
      },
      {
        title: '资源种类',
        dataIndex: 'projProdtypeCnts',
      },
      {
        title: '资源数量',
        dataIndex: 'projProdCnts',
      },
      {
        title: '本月费用(元)',
        dataIndex: 'projProdFee',
        render: (_) => getFloatStr(_),
      },
    ]
    return (
      <Table
        rowKey={(record) => record.projectInfoId}
        dataSource={list}
        columns={columns}
        pagination={
          totalCount <= pageSize
            ? false
            : {
              pageSize: pageSize || 10,
              total: totalCount,
              current: currPage || 1,
              showSizeChanger: true,
              pageSizeOptions: [ '10', '20', '50' ],
              onChange: (pageIndex) => {
                queryList({ page: pageIndex.toString(), limit: '10' })
              },
              onShowSizeChange: (pageIndex, size) => {
                queryList({
                  page: pageIndex.toString(),
                  limit: size.toString(),
                })
              },
            }
        }
      />
    )
  }
}

export default ProjectBillList
