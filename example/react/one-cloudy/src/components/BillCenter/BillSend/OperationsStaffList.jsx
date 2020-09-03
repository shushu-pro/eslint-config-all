import React from 'react'
import { connect } from 'dva'
import { Link } from 'umi'
import moment from 'moment'
import { Table, DatePicker } from 'antd'
import StackPanel from '@/components/Common/StackPanel'
import { getTitle } from '@/pages/BillCenter/constant'
import { getFloatStr } from '@/utils/utils'

const { MonthPicker } = DatePicker
@connect(({ billSend, loading }) => ({
  billList: billSend.billList,
  isSend: billSend.isSend,
  loading: !!loading.effects['billSend/queryOperationsStaffMonthBillList'],
}))

class OperationsStaffList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  async componentDidMount () {
    await this.queryOperationsStaffMonthBillList()
  }

  queryOperationsStaffMonthBillList = (params) => {
    const { dispatch } = this.props
    const { order, sidx } = this.props
    dispatch({
      type: 'billSend/queryOperationsStaffMonthBillList',
      payload: {
        order,
        sidx,
        ...params,
      },
    })
  }

  onChange = (pagination, filters, sorter) => {
    // billNo 例如: 201905 非必填
    // startTime 开始时间，格式: yyyymm, 例如: 201905 非必填
    // endTime 结束时间，格式: yyyymm, 例如: 201909   非必填
    // sidx  排序字段, 可选值: (bill_no(账单号) 、department_cnts(部门数) 、product_cnts(资源数) 、bill_amt(金额) 非必填
    // order 排序方式, 可选值: asc(升序) 、desc(降序)
    let params = {}
    if (sorter && JSON.stringify(sorter) !== '{}') {
      params = {
        order: sorter.order === 'ascend' ? 'asc' : 'desc',
        sidx: sorter.columnKey,
      }
      this.setState({
        ...params,
      })
    }
    this.queryOperationsStaffMonthBillList({
      page: pagination.current,
      limit: pagination.pageSize,
      order: '',
      sidx: '',
      ...params,
    })
  }

  onTimeChange = (date, dateString) => {
    const billNo = dateString.replace('-', '')
    this.queryOperationsStaffMonthBillList({
      page: 1,
      limit: 10,
      billNo,
    })
  }

  disabledDate = (current) => current && current > moment().endOf('month').subtract(1, 'months');

  render () {
    const { billList = {}, loading, isSend } = this.props
    const {
      totalCount,
      list,
      pageSize,
      currPage,
    } = billList
    const columns = [
      {
        title: '账单名称',
        dataIndex: 'billNo',
        render: (_) => {
          const isSendUrl = isSend ? 'send' : 'statistics'
          return (
            <Link to={`/manage/bill-center/${isSendUrl}/${_}`}>
              {getTitle(_)}
            </Link>
          )
        },
      },
      {
        title: '部门数',
        dataIndex: 'departmentCnts',
        key: 'department_cnts',
        sorter: true,
        render: (_) => _ || '-',
      },
      {
        title: '项目数',
        dataIndex: 'projectCnts',
        key: 'project_cnts',
        sorter: true,
        render: (_) => _ || '-',
      },
      {
        title: '资源数',
        dataIndex: 'productCnts',
        key: 'product_cnts',
        sorter: true,
        render: (_) => _ || '-',
      },
      {
        title: '费用',
        dataIndex: 'billAmt',
        key: 'bill_amt',
        sorter: true,
        render: (_) => getFloatStr(_),
      },
    ]
    if (isSend) {
      columns.push({
        title: '已发送部门',
        dataIndex: 'billDeptSendCnts',
        render: (_, record) => `${_ || 0}/${record.departmentCnts}`,
      })
    }
    return (
      <div style={{ marginTop: 20 }}>
        <StackPanel style={{ marginLeft: 20 }}>
          <span>按时间选择: </span>
          <MonthPicker
            separator="至"
            disabledDate={this.disabledDate}
            onChange={this.onTimeChange}
          />
          {/* <StackPanel.RightAlice>
            <a
              href={monthDeptBillUrl && monthDeptBillUrl.url}
              download={monthDeptBillUrl && monthDeptBillUrl.fileName}
            >
              <Icon type="download" style={{ marginRight: 8 }} />
              导出表格
            </a>
          </StackPanel.RightAlice> */}
        </StackPanel>
        <Table
          style={{ marginTop: '24px', background: '#fff' }}
          rowKey={(record) => record.billNo}
          dataSource={list}
          columns={columns}
          loading={loading}
          onChange={this.onChange}
          pagination={{
            pageSize: pageSize || 10,
            total: totalCount,
            current: currPage || 1,
            showSizeChanger: true,
            pageSizeOptions: [ '10', '20', '50' ],
          }}
        />
      </div>
    )
  }
}

export default OperationsStaffList
