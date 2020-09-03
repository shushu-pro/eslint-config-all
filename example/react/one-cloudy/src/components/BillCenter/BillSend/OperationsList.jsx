import React from 'react'
import { connect } from 'dva'
import moment from 'moment'
import { DatePicker, Icon, Dropdown, Menu, Modal, message } from 'antd'
import StackPanel from '@/components/Common/StackPanel'
import SelectSearch from '@/components/SelectSearch'
import { TYPE_ENUM, TYPE_ENUM_TEXT } from '@/pages/BillCenter/Statistics/contant'
import InstanceTable from './InstanceTable'

const { MonthPicker } = DatePicker
@connect(({ billStatistics, loading }) => ({
  statisticsData: billStatistics.statisticsData,
  isSend: billStatistics.isSend,
  loading: !!loading.effects['billStatistics/queryMonthProjectBillList'],
}))
class OperationsStaffList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // billNo: undefined,
    }
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch({
      type: 'billStatistics/queryAllProductName',
      payload: {},
    })
  }

  queryMonthProjectBillList = (params) => {
    const { billNo, selectKey, value, ...rest } = this.state
    const { dispatch } = this.props
    this.setState({
      params: {
        billNo,
        ...rest.params,
        ...params,
      },
    })
    dispatch({
      type: 'billStatistics/queryMonthProjectBillList',
      payload: {
        billNo,
        page: 1,
        limit: 10,
        [selectKey]: value,
        ...rest.params,
        ...params,
      },
    })
  };

  onTimeChange = (date, dateString) => {
    const billNo = dateString.replace('-', '')
    this.queryMonthProjectBillList({
      page: 1,
      limit: 10,
      billNo,
    })
    this.setState({
      billNo,
    })
  };

  onAllInstance = (key) => {
    const { dispatch, confirmLoading } = this.props
    const { params, billNo } = this.state
    if (!billNo) {
      return message.error('请先选择月份')
    }
    Modal.confirm({
      title: '下载注意事项',
      icon: <Icon type="info-circle" theme="filled" style={{ color: '#1890ff' }} />,
      width: 620,
      confirmLoading,
      content: (
        <div>
          <div>{TYPE_ENUM_TEXT[key]}</div>
          <div>2.对表单进行筛选和排序，会同时影响到下载的文档内容。</div>
          <div> 3.由于数据量巨大，系统会在下载中心生成下载链接。请前往下载中心中点击下载。</div>
        </div>
      ),
      okText: '下载',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'billStatistics/queryOperatorMonthProjectBillExport',
          payload: {
            businessTypeEnum: key,
            ...params,
          },
        })
      },
    })
  };

  disabledDate = (current) => current && current > moment().endOf('month').subtract(1, 'months');

  queryData = ({ selectKey, value }) => {
    this.setState(
      {
        selectKey,
        value,
      },
      () => {
        this.queryMonthProjectBillList({
          [selectKey]: value,
          page: 1,
          limit: 10,
        })
      },
    )
  };

  render () {
    const { statisticsData = {} } = this.props
    const { billNo } = this.state
    const { list } = statisticsData
    return (
      <div style={{ marginTop: 20 }}>
        <StackPanel style={{ marginLeft: 20 }}>
          <span>按时间选择: </span>
          <MonthPicker
            // value={moment(billNo, 'YYYY-MM')}
            // value={}
            disabledDate={this.disabledDate}
            onChange={this.onTimeChange}
          />
          <SelectSearch
            optionList={[
              {
                key: 'department',
                value: '部门',
              },
              {
                key: 'projectName',
                value: '项目',
              },
            ]}
            queryData={this.queryData}
          />
          <StackPanel.RightAlice>
            <Dropdown
              overlay={(
                <Menu>
                  <Menu.Item>
                    <a onClick={() => this.onAllInstance(TYPE_ENUM.PROJECT_BILL_PRODUCT_EXPORT)}>
                      按产品导出所有实例信息
                    </a>
                  </Menu.Item>
                  <Menu.Item>
                    <a onClick={() => this.onAllInstance(TYPE_ENUM.PROJECT_BILL_DEPARTMENT_EXPORT)}>
                      按部门导出所有实例信息
                    </a>
                  </Menu.Item>
                </Menu>
              )}
            >
              <a href="#" id="download">
                <Icon type="download" style={{ marginRight: 8 }} />
                导出表格
              </a>
            </Dropdown>
          </StackPanel.RightAlice>
        </StackPanel>
        {list && billNo ? (
          <InstanceTable queryList={this.queryMonthProjectBillList} />
        ) : (
          <div style={{ padding: '240px 0', textAlign: 'center' }}>
            <Icon type="exclamation-circle" style={{ color: '#1890ff', marginRight: 8 }} />
            请选择时间进行查询
          </div>
        )}
      </div>
    )
  }
}

export default OperationsStaffList
