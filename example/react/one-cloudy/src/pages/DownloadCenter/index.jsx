import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Table, Card, Badge, Divider } from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import { goExport } from '@/utils/utils'

const STATUS = {
  ACTIVE: 'ACTIVE',
  FAILED: 'FAILED',
  COMPLETED: 'COMPLETED',
  EXPIRED: 'EXPIRED',
}
const STATUS_BADGE = {
  [STATUS.ACTIVE]: 'processing',
  [STATUS.FAILED]: 'error',
  [STATUS.COMPLETED]: 'success',
  [STATUS.EXPIRED]: 'default',
}
const STATUS_TEXT = {
  [STATUS.ACTIVE]: '进行中',
  [STATUS.FAILED]: '失败',
  [STATUS.COMPLETED]: '已完成',
  [STATUS.EXPIRED]: '过期',
}
const mapStateToProps = ({ user, loading }) => ({
  downData: user.downData,
  loading: !!loading.effects['user/queryDownList'],
})
const mapDispatchToProps = (dispatch) => ({
  queryDownList (payload) {
    return dispatch({
      type: 'user/queryDownList',
      payload,
    })
  },
  delDownList (payload) {
    return dispatch({
      type: 'user/delDownList',
      payload,
    })
  },
  setPage (payload) {
    return dispatch({
      type: 'user/setter',
      payload,
    })
  },
})
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class DownloadList extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isPolling: false,
    }
  }

  componentDidMount () {
    this.getData()
  }

  componentWillUpdate (nextProps, nextState) {
    const { isPolling } = nextState
    if (isPolling) {
      this.setData()
    }
  }

  setData = () => {
    this.setState(
      {
        isPolling: false,
      },
      () => {
        this.delay(5000).then(() => {
          this.getData()
        })
      },
    )
  };

  /**
   * 延迟
   * @param {number} time 延迟时间
   */
  delay = (time = 0) => new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  });

  getData = (limit = 10, page = 1, ...rest) => {
    const { queryDownList } = this.props
    queryDownList({
      limit,
      page,
      ...rest,
    }).then(() => {
      this.setState({
        isPolling: true,
      })
    })
  };

  onDown = (record) => {
    // resourceUrl
    goExport({
      filename: record.resourceName,
      url: record.resourceUrl,
    })
  };

  onDel = (record) => {
    const { delDownList } = this.props
    delDownList({ id: record.id })
  };

  render () {
    const { downData } = this.props
    const { list = [], totalCount, pageSize, currPage } = downData
    const columns = [
      {
        title: '文件名',
        dataIndex: 'name',
        key: 'name',
        width: 400,
      },
      {
        title: '创建时间',
        dataIndex: 'createdDate',
        key: 'createdDate',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (_) => <Badge status={STATUS_BADGE[_]} text={STATUS_TEXT[_]} />,
      },
      {
        title: '操作',
        render: (record) => {
          const { status } = record
          const canDown = status === STATUS.COMPLETED
          const canDel = status !== STATUS.ACTIVE
          return (
            <div>
              <a
                style={{ color: !canDown && '#d9d9d9' }}
                onClick={() => canDown && this.onDown(record)}
              >
                下载
              </a>
              <Divider type="vertical" />
              <a
                style={{ color: !canDel && '#d9d9d9' }}
                onClick={() => canDel && this.onDel(record)}
              >
                删除
              </a>
            </div>
          )
        },
      },
    ]
    return (
      <PageHeaderWrapper title="下载中心">
        <Card bordered={false}>
          <Table
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={list}
            pagination={
              totalCount <= pageSize
                ? false
                : {
                  pageSize: pageSize || 10,
                  total: totalCount,
                  current: currPage || 1,
                  onChange: (size, pageIndex) => {
                    this.getData(pageIndex, size)
                  },
                }
            }
          />
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default DownloadList
