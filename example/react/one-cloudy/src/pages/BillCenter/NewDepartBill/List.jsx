import React, { PureComponent } from 'react'
import { connect } from 'dva'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import { Spin, Table, Tabs } from 'antd'
import { Link } from 'umi'
import { getFloatStr } from '@/utils/utils'
import { getTitle, transformData } from '../constant'
import styles from '../index.less'
const { TabPane } = Tabs
@connect(({ newDepartBill, loading }) => ({
  ...newDepartBill,
  loading: !!loading.effects['newDepartBill/listMonthBillSumInfo'],
}))

class List extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      resData: {},
    }
  }

  componentDidMount () {
    this.queryList()
  }

  queryList = (params = {}) => {
    const { dispatch } = this.props
    dispatch({
      type: 'newDepartBill/listMonthBillSumInfo',
      payload: {
        current: params.current || '1',
        pageSize: params.pageSize || '10',
        ...params,
      },
      callback: e => {
        if (e.code === 200) {
          this.setState({
            resData: e.resData,
          })
        }
      },
    })
  }

  onChange = (pagination, filters, sorter) => {
    let params = {}
    if (sorter && JSON.stringify(sorter) !== '{}') {
      params = {
        orderType: sorter.order ? (sorter.order === 'ascend' ? 0 : 1) : '',
        orderBy: sorter.columnKey && this.switchSortOrder(sorter.columnKey) || '',
      }
    }
    /* eslint-enable */
    params.current = pagination.current
    params.pageSize = pagination.pageSize
    this.queryList(params)
  }

  switchSortOrder = (columnKey) => {
    switch (columnKey) {
      case 'projectNum':
        return 1
      case 'productNum':
        return 2
      case 'fee':
        return 3
      default:
        return null
    }
  }

  render () {
    const { loading } = this.props
    const { resData } = this.state
    const { size, total, current, records } = resData
    const columns = [
      {
        title: '账单名称',
        dataIndex: 'billNo',
        key: 'billNo',
        render: (_, record) => {
          const { billNo } = record
          return (
            <Link to={`/manage/bill-center/newDepartBill/details/overview?billNo=${billNo}`}>
              {getTitle(billNo)}
            </Link>
          )
        },
      },
      {
        title: '项目数',
        dataIndex: 'projectNum',
        key: 'projectNum',
        sorter: true,
        render: _ => transformData(_),
      },
      {
        title: '资源数量',
        dataIndex: 'productNum',
        key: 'productNum',
        sorter: true,
        render: _ => transformData(_),
      },
      {
        title: '费用',
        dataIndex: 'fee',
        key: 'fee',
        sorter: true,
        render: _ => getFloatStr(_),
      },
    ]
    return (
      <PageHeaderWrapper title="部门账单">
        <div className={styles.tabPage}>
          <Tabs>
            <TabPane tab="月度账单" key="1" />
          </Tabs>
          <Spin spinning={loading}>
            <div>
              <Table
                style={{ marginTop: '-15px', padding: '0 30px 10px' }}
                rowKey={record => record.seqno}
                dataSource={records}
                columns={columns}
                onChange={this.onChange}
                pagination={
                  {
                    pageSize: size || 10,
                    total,
                    current: current || 1,
                    showSizeChanger: true,
                    pageSizeOptions: [ '10', '20', '50' ],
                  }
                }
              />
            </div>
          </Spin>
        </div>
      </PageHeaderWrapper>
    )
  }
}


export default List
