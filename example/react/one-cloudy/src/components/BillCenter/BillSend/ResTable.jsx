import React from 'react'
import { connect } from 'dva'
import { withRouter } from 'dva/router'
import {
  Table, Input, Select, Icon, Modal,
} from 'antd'
import StackPanel from '@/components/Common/StackPanel'
import AddTooltip from '@/components/Common/AddTooltip'
import {
  getDate,
  FILTER_REGION_LIST,
  REGION_ID_TEXT_MAP,
} from '@/pages/BillCenter/constant'
import { getFloatStr } from '@/utils/utils'
import AddFormModal from './AddFormModal'
import MoveProjectModal from './MoveProjectModal'
import EditFormModal from './EditFormModal'
import InfoModal from './InfoModal'
import './index.less'

const { Search } = Input
const { Option } = Select
const { confirm } = Modal
@connect(({ billSend, loading }) => ({
  projProdList: billSend.projProdList,
  projProdUrl: billSend.projProdUrl,
  loading: !!loading.effects['billSend/queryDeptMonthProjProdList'] ||
    !!loading.effects['billSend/submitDelete'],
}))

class ResTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectKey: 'instanceId',
      ocRegions: '',
    }
  }

  async componentDidMount () {
    await this.queryDeptMonthProjProdList()
    await this.queryAllDept()
  }

  queryMonthProjectBillExport = async (params) => {
    const { dispatch } = this.props
    return dispatch({
      type: 'billSend/queryMonthProjectBillExport',
      payload: {
        ...this.getParams(params),
      },
    })
  }

  // 获取所有的部门
  queryAllDept = async () => {
    const { dispatch } = this.props
    return dispatch({
      type: 'billSend/queryAllDept',
    })
  }

  // 当前部门下 - 某区域 所有的项目
  queryDeptAllProject = (params) => {
    const { dispatch } = this.props
    return dispatch({
      type: 'billSend/queryDeptAllProject',
      payload: {
        ...params,
      },
    })
  }

  // 获取全部资源类型
  queryAllProductName = () => {
    const { dispatch } = this.props
    return dispatch({
      type: 'billSend/queryAllProductName',
    })
  }

  // 当前月度部门部门下 - 所有的项目
  queryDeptBillProject = () => {
    const { dispatch, match } = this.props
    const { billNo, departmentId } = match.params
    return dispatch({
      type: 'billSend/queryDeptBillProject',
      payload: {
        departmentId,
        billNo,
      },
    })
  }

  getParams = (params) => {
    const { match } = this.props
    const { billNo, departmentId } = match.params
    const {
      selectKey, value, ocRegions, order, sidx,
    } = this.state
    return {
      billNo,
      departmentId,
      [selectKey]: value,
      ocRegions,
      order,
      sidx,
      ...params,
    }
  }

  queryDeptMonthProjProdList = (params) => {
    const { dispatch } = this.props
    dispatch({
      type: 'billSend/queryDeptMonthProjProdList',
      payload: {
        ...this.getParams(params),
      },
    })
  }

  // table的操作
  onChange = (pagination, filters, sorter) => {
    // billNo （必填）
    // departmentId(必填)
    // ocRegions(非必填, 多个以逗号隔开，可选值: cloud - industry - pub、cloud - private、cloud - public）
    //   sidx  排序字段, 可选值: open_time(开通时间) 、monthfee(费用) 非必填
    //   order 排序方式, 可选值: asc(升序) 、desc(降序)
    let params = {
      page: pagination.current,
      limit: pagination.pageSize,
      order: '',
      sidx: '',
    }
    if (filters && JSON.stringify(filters) !== '{}') {
      params = {
        ...params,
        ocRegions: filters.ocRegion.join(','),
      }
      this.setState({
        ...params,
      })
    }
    if (sorter && JSON.stringify(sorter) !== '{}') {
      params = {
        ...params,
        order: sorter.order === 'ascend' ? 'asc' : 'desc',
        sidx: sorter.columnKey,
      }
      this.setState({
        ...params,
      })
    }
    this.queryDeptMonthProjProdList({
      ...params,
    })
  }

  // 选择需要搜索的列席
  onSelectChange = (value) => {
    this.setState({
      selectKey: value,
    })
  }

  // 搜索
  onSearch = (value) => {
    const { selectKey } = this.state
    this.setState({
      value,
    })
    this.queryDeptMonthProjProdList({
      [selectKey]: value,
    })
  }

  // 设置编辑和查看信息的数据
  onSetData = (record) => {
    this.setState({
      recordData: record,
    })
  }

  // 查看某条资源
  onShow = (e, record) => {
    this.onSetData(record)
    this.setState({
      visible: true,
    })
  }

  onHide = () => {
    this.setState({
      visible: false,
    })
  }

  // 编辑某条资源
  onEditShow = (e, record) => {
    this.onSetData(record)
    this.queryDeptAllProject({
      departmentId: record.departmentId,
      ocRegion: record.ocRegion,
    }).then(() => {
      this.setState({
        editVisible: true,
      })
    })
  }

  onEditHide = () => {
    this.setState({
      editVisible: false,
    })
  }

  // 删除某条资源
  onDel = (e, seqno) => {
    const { dispatch, match } = this.props
    const { departmentId, billNo } = match.params
    confirm({
      title: '确定删除这条资源？',
      okText: '确定',
      cancelText: '取消',
      onOk () {
        dispatch({
          type: 'billSend/submitDelete',
          payload: {
            seqno,
            billNo,
            departmentId,
          },
        })
      },
    })
  }

  // 新增计费资源
  onAdd = () => {
    this.queryAllProductName().then(() => {
      this.setState({
        addVisible: true,
      })
    })
  }

  // 移动项目
  onMove = () => {
    this.queryDeptBillProject().then(() => {
      this.setState({
        moveVisible: true,
      })
    })
  }

  onExport = () => {
    this.queryMonthProjectBillExport()
  }

  render () {
    const {
      projProdList = {}, edit = false, loading, match,
    } = this.props
    const {
      department, departmentId, billNo, billStatus,
    } = match.params
    const {
      selectKey, recordData, editVisible, visible, addVisible, moveVisible,
    } = this.state
    const canAction = billStatus === '0' || billStatus === '3'
    const {
      totalCount,
      list,
      pageSize,
      currPage,
    } = projProdList
    const columns = [
      {
        title: '实例ID/名称',
        dataIndex: 'instanceName',
        render: (_, record) => (
          <div>
            <AddTooltip text={_}>
              <a style={{ display: 'block' }} onClick={(e) => this.onShow(e, record)}>
                {_ || '-'}
              </a>
            </AddTooltip>
            <AddTooltip text={record.instanceId}>
              {_ ? record.instanceId : (
                <a style={{ display: 'block' }} onClick={(e) => this.onShow(e, record)}>
                  {record.instanceId}
                </a>
              )}
            </AddTooltip>
          </div>
        ),
      },
      {
        title: '资源',
        dataIndex: 'productName',
      },
      {
        title: '项目',
        dataIndex: 'projectName',
        render: (_) => (
          <AddTooltip text={_}>
            {_}
          </AddTooltip>
        ),
      },
      {
        title: '区域',
        dataIndex: 'ocRegion',
        filters: FILTER_REGION_LIST,
        render: (_) => (<AddTooltip text={REGION_ID_TEXT_MAP[_]}>{REGION_ID_TEXT_MAP[_]}</AddTooltip>),
      },
      {
        title: '规格',
        dataIndex: 'productSepcs',
        render: (_) => (
          <AddTooltip text={_}>
            {_}
          </AddTooltip>
        ),
      },
      {
        title: '开通时间',
        dataIndex: 'openTime',
        key: 'open_time',
        sorter: true,
        render: (_) => getDate(_),
      },
      {
        title: '金额',
        dataIndex: 'monthfee',
        key: 'monthfee',
        sorter: true,
        render: (_) => getFloatStr(_),
      },
    ]
    if (edit) {
      columns.push({
        title: '操作',
        render: (record) => canAction && (
          <div>
            <a onClick={(e) => this.onEditShow(e, record)}>
              <Icon type="form" style={{ marginRight: 8 }} />
              编辑
            </a>
            <a style={{ marginLeft: 20 }} onClick={(e) => this.onDel(e, record.seqno)}>
              <Icon type="delete" style={{ marginRight: 8 }} />
              删除
            </a>
          </div>
        ),
      })
    }
    return (
      <div className="resTable" style={{ padding: 24, background: '#fff' }}>
        <StackPanel>
          <Select
            onChange={this.onSelectChange}
            style={{ width: 100, marginRight: 10, marginLeft: 20 }}
            placeholder="请选择"
            defaultValue={selectKey}
          >
            <Option key="instanceId">实例ID</Option>
            <Option key="instanceName">实例名称</Option>
            <Option key="projectName">项目</Option>
            <Option key="productName">资源</Option>
          </Select>
          <Search
            allowClear
            placeholder="请输入查询"
            onSearch={this.onSearch}
            style={{ width: 200 }}
          />
          <StackPanel.RightAlice>
            {edit && canAction && (
              <a onClick={this.onAdd}>
                <Icon style={{ marginRight: 8 }} type="plus-square" />
                新增计费资源
              </a>
            )}
            {edit && canAction && (
              <a style={{ margin: '0 20px' }} onClick={this.onMove}>
                <Icon style={{ marginRight: 8 }} type="login" />
                移动项目
              </a>
            )}
            <a
              key="export"
              onClick={this.onExport}
            >
              <Icon type="download" style={{ marginRight: 8 }} />
              导出表格
            </a>
          </StackPanel.RightAlice>
        </StackPanel>
        <Table
          style={{ marginTop: '24px', background: '#fff', overflow: 'auto' }}
          rowKey={(record) => record.seqno}
          dataSource={list}
          columns={columns}
          onChange={this.onChange}
          loading={loading}
          pagination={
            totalCount <= pageSize
              ? false
              : {
                pageSize: pageSize || 10,
                total: totalCount,
                current: currPage || 1,
                showSizeChanger: true,
                pageSizeOptions: [ '10', '20', '50' ],
                onShowSizeChange: (pageIndex, size) => {
                  this.onChange({
                    current: pageIndex,
                    pageSize: size,
                  })
                },
              }
          }
        />
        <InfoModal
          data={recordData}
          visible={visible}
          onCancel={this.onHide}
        />
        <EditFormModal
          data={recordData}
          visible={editVisible}
          onCancel={this.onEditHide}
          billNo={billNo}
        />
        <AddFormModal
          data={recordData}
          visible={addVisible}
          department={department}
          departmentId={departmentId}
          billNo={billNo}
          onCancel={() => {
            this.setState({
              addVisible: false,
            })
          }}
        />
        <MoveProjectModal
          billNo={billNo}
          visible={moveVisible}
          departmentId={departmentId}
          onCancel={() => {
            this.setState({
              moveVisible: false,
            })
          }}
        />
      </div>
    )
  }
}

export default withRouter(ResTable)
