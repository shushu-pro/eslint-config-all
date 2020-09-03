import React from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import {
  withRouter,
} from 'dva/router';
import { Table, Form, Row, Col, Spin, Icon, Input, Select, Dropdown, Menu, Modal } from 'antd';
import StackPanel from '@/components/Common/StackPanel';
import FormItem from '@/components/Common/FormItem';
import Title from '@/components/Common/Title';
import AddTooltip from '@/components/Common/AddTooltip';
import {
  OPERATIONS_STAFF_DEPT_DETAIL_FIELD_MAP,
  OPERATIONS_STAFF_DEPT_DETAIL_FIELD_TEXT_MAP,
  getTime,
  REGION_LIST,
  UNIT_LIST,
} from '../constant';
import { billDetailLayout } from '../../../contants';
import { TYPE_ENUM, TYPE_ENUM_TEXT, } from './contant';
import { getFloatStr } from '@/utils/utils';
import styles from '../index.less';

const { Search } = Input;
const { Option } = Select;

@Form.create()
@connect(({ billSend, loading }) => ({
  ...billSend,
  loading: !!loading.effects['billSend/queryOperationsStaffMonthBillDetail']
    || !!loading.effects['billSend/queryMonthRegionDeptBillList']
    || !!loading.effects['billSend/queryMonthRegionDeptBillExport'],
  confirmLoading: !!loading.effects['billSend/queryOperatorMonthProjectBillExport'],
}))
class Statistics extends React.Component {
  state = {
    ocRegion: 'all',
  }

  componentDidMount() {
    this.queryAll();
  }

  queryAll = async (params) => {
    await Promise.all([
      this.queryOperationsStaffMonthBillDetail(params),
      this.queryMonthRegionDeptBill(params),
    ]);
  }

  queryOperationsStaffMonthBillDetail = (params) => {
    const { dispatch, match } = this.props;
    const { billNo } = match.params;
    const { ocRegion } = this.state;
    dispatch({
      type: 'billSend/queryOperationsStaffMonthBillDetail',
      payload: {
        ocRegion: ocRegion === 'all' ? '' : ocRegion,
        billNo,
        ...params,
      }
    });
  }

  // 获取参数
  getParams = (params) => {
    const { match } = this.props;
    const { billNo } = match.params;
    const { ocRegion, order, sidx, unitId } = this.state;
    params = {
      billNo,
      ocRegion: ocRegion === 'all' ? '' : ocRegion,
      order,
      sidx,
      unitId,
      ...params,
    }
    return params;
  }

  // 导出
  queryMonthRegionDeptBillExport = (params) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'billSend/queryMonthRegionDeptBillExport',
      payload: {
        ...this.getParams(params),
      }
    });
  }

  // 列表 
  queryMonthRegionDeptBill = (params) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'billSend/queryMonthRegionDeptBillList',
      payload: {
        ...this.getParams(params),
      }
    });
  }

  // 筛选、排序、翻页
  onChange = (pagination, filters, sorter) => {
    // billNo （必填）
    // ocRegion(非必填, 可选值: cloud - industry - pub、cloud - private、cloud - public）
    // department 部门名称，模糊查询，非必填
    // sidx  排序字段, 可选值: (departmen(部门) 、dept_proj_cnt(项目数) 、dept_prod_cnts(资源数) 、dept_prod_fee(金额) 非必填
    // order 排序方式, 可选值: asc(升序) 、desc(降序)
    let params = {};
    if (filters && JSON.stringify(filters) !== '{}') {
      params = {
        unitId: filters.unitId.join(','),
      }
      this.setState({
        ...params,
      });

    }
    if (sorter && JSON.stringify(sorter) !== '{}') {
      params = {
        order: sorter.order === 'ascend' ? 'asc' : 'desc',
        sidx: sorter.columnKey,
      };
      this.setState({
        order: sorter.order === 'ascend' ? 'asc' : 'desc',
        sidx: sorter.columnKey,
      });
    }
    
    this.queryMonthRegionDeptBill({
      page: pagination.current,
      limit: pagination.pageSize,
      order: '',
      sidx: '',
      ...params,
    });
  }
  
  // 选择区域
  onSelectRegion = (value) => {
    this.queryAll({
      ocRegion: value === 'all' ? '' : value,
    });
    this.setState({
      ocRegion: value,
    });
  }

  // 搜索部门
  onSearch = (value) => {
    this.queryMonthRegionDeptBill({
      department: value,
    });
  }

  // 导出
  onExport = () => {
    this.queryMonthRegionDeptBillExport();
  }

  onAllInstance = (key) => {
    const { dispatch, match, confirmLoading } = this.props;
    const { ocRegion } = this.state; 
    const { billNo } = match.params;
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
          type: 'billSend/queryOperatorMonthProjectBillExport',
          payload: {
            businessTypeEnum: key,
            billNo,
            ocRegions: ocRegion,
          }
        })
      },
    });
  }

  render() {
    const {
      monthBillDeatil = {},
      regionDeptBillList = {},
      match,
      loading,
    } = this.props;
    const {
      totalCount,
      list,
      pageSize,
      currPage,
    } = regionDeptBillList;
    const { billNo } = match.params;
    const { ocRegion } = this.state;
    const columns = [
      {
        title: '部门',
        dataIndex: 'department',
        render: (_, record) => (
          <AddTooltip text={_}>
            <Link to={`/manage/bill-center/statistics/${billNo}/resList/${record.departmentId}/${_}`}>
              {_}
            </Link>
          </AddTooltip>
        ),
      },
      {
        title: '部门类型',
        dataIndex: 'unitName',
        key: 'unitId',
        filters: UNIT_LIST,
        render: _ => _ || '-',
      },
      {
        title: '项目数',
        dataIndex: 'deptProjCnt',
        key: 'dept_proj_cnt',
        sorter: true,
      },
      {
        title: '资源数',
        dataIndex: 'deptProdCnts',
        key: 'dept_prod_cnts',
        sorter: true,
      },
      {
        title: '金额',
        dataIndex: 'deptProdFee',
        key: 'dept_prod_fee',
        sorter: true,
        render: _ => getFloatStr(_),
      },
    ];
    return (
      <Spin spinning={loading}>
        <div className={styles.statistics}>
          <StackPanel key="regionSelect">
            <div style={{ marginRight: 8, color: '#999999' }}>选择区域：</div>
            <Select
              showSearch
              onChange={this.onSelectRegion}
              defaultValue={ocRegion}
            >
              <Option key="all">全部</Option>
              {
                REGION_LIST.map(item => <Option key={item.key} value={item.key}>{item.value}</Option>)
              }
            </Select>
          </StackPanel>
          <Title level="h3">统计信息</Title>
          <Row>
            {
              Object.values(OPERATIONS_STAFF_DEPT_DETAIL_FIELD_MAP).map(key => {
                let value = monthBillDeatil[key];
                if (key === OPERATIONS_STAFF_DEPT_DETAIL_FIELD_MAP.BILL_AMT){
                  value = getFloatStr(value);
                }
                if (key === OPERATIONS_STAFF_DEPT_DETAIL_FIELD_MAP.TIME){
                  value = getTime(billNo);
                }
                return (
                  <Col key={key} span={6}>
                    <FormItem
                      {...billDetailLayout}
                      style={{ marginBottom: 0 }}
                      label={OPERATIONS_STAFF_DEPT_DETAIL_FIELD_TEXT_MAP[key]}
                      value={value}
                    />
                  </Col>
              )})
            }
            
          </Row>
        </div>
        <div style={{ padding: '0 20px' }}>
          <Title level="h3">部门账单信息</Title>
          <StackPanel key="deptSearch">
            <Search
              placeholder="请输入部门名称"
              style={{ width: 200 }}
              onSearch={this.onSearch}
              allowClear
            />
            <StackPanel.RightAlice>
              <Dropdown overlay={
                <Menu>
                  <Menu.Item>
                    <a onClick={this.onExport}>
                      导出当前表格 
                    </a>
                  </Menu.Item>
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
              }
              >
                <a
                  
                  // href={regionDeptBillUrl.url}
                  // download={regionDeptBillUrl.fileName}
                  // onClick={this.onExport}
                  href="#"
                  id="download"
                >
                  <Icon type="download" style={{ marginRight: 8 }} />
                  导出表格
                </a>
              </Dropdown>
              
            </StackPanel.RightAlice>
          </StackPanel>
        </div>
        <Table
          style={{ marginTop: '24px' }}
          rowKey={record => record.departmentId}
          dataSource={list}
          columns={columns}
          onChange={this.onChange}
          pagination={{
              pageSize: pageSize || 10,
              total: totalCount,
              current: currPage || 1,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50'],
              onShowSizeChange: (pageIndex, size) => {
                this.onChange({
                  current: pageIndex,
                  pageSize: size,
                })
              }
          }}
        />
      </Spin>
    );
  }
}

export default withRouter(Statistics);