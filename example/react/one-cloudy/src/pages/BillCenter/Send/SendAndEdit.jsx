import React from 'react';
import { connect } from 'dva';
import { Link, router } from 'umi';
import {
  withRouter,
} from 'dva/router';
import { Table, Form, Input, Icon } from 'antd';
import StackPanel from '@/components/Common/StackPanel';
import AddTooltip from '@/components/Common/AddTooltip';
import { DEPT_STATUS_TEXT_MAP, DEPT_STATUS_MAP } from '../constant';
import styles from '../index.less';

const { Search } = Input;
@Form.create()
@connect(({ billSend, loading }) => ({
  ...billSend,
  loading: !!loading.effects['billSend/queryMonthDeptRegionBillList'],
}))
class SendAndEdit extends React.Component {
  state = {
    department: ''
  }

  async componentDidMount() {
    await this.queryMonthDeptRegionBillList();
  }

  queryMonthDeptRegionBillList = (params) => {
    const { dispatch, match } = this.props;
    const { billNo } = match.params;
    const { department, status } = this.state;
    dispatch({
      type: 'billSend/queryMonthDeptRegionBillList',
      payload: {
        billNo,
        department,
        status,
        ...params,
      }
    });
  }

  onChange = (pagination, filters, sorter) => {
    // billNo （必填）
    // ocRegion(非必填, 可选值: cloud - industry - pub、cloud - private、cloud - public）
    //   department 部门名称，模糊查询，非必填
    //   sidx  排序字段, 可选值: (departmen(部门) 、dept_proj_cnt(项目数) 、dept_prod_cnts(资源数) 、dept_prod_fee(金额) 非必填
    //   order 排序方式, 可选值: asc(升序) 、desc(降序)
    let params = {};
    if (sorter && JSON.stringify(sorter) !== '{}') {
      const list = sorter.columnKey.split('.');
      params = {
        order: sorter.order === 'ascend' ? 'asc' : 'desc',
        sidx: list[1],
        ocRegion: list[0],
      }
    }
    if (filters && filters.billStatus) {
      const status = filters.billStatus.join(',');
      params = {
        status,
      }
      this.setState({
        status,
      });
    }
    this.queryMonthDeptRegionBillList({
      page: pagination.current,
      limit: pagination.pageSize,
      order: '',
      sidx: '',
      ocRegion: '',
      ...params,
    });
  }

  onSearch = (value) => {
    this.queryMonthDeptRegionBillList({
      department: value,
    });
    this.setState({
      department: value,
    })
  }

  onEdit = (e, record) => {
    const { match } = this.props;
    const { billNo } = match.params;
    const url = `/manage/bill-center/send/${billNo}/resList/${record.departmentId}/${record.department}/${record.billStatus}`
    router.push(url);
  }

  onSend = (e, departmentId) => {
    const { dispatch, match } = this.props;
    const { billNo } = match.params;
    dispatch({
      type: 'billSend/submitSend',
      payload: {
        departmentId,
        billNo,
      }
    });
  }

  getData = (record, key, showKey) => {
    const { regionBillInfos } = record;
    if (!Array.isArray(regionBillInfos)) {
      return '-';
    }
    const data = regionBillInfos.find(item => item.ocRegion === key);
    if (data) {
      return data[showKey];
    }
    return '-';
  }

  render() {
    const { monthDeptRegionBillList = {}, match, loading } = this.props;
    const { billNo } = match.params;
    const {
      totalCount,
      list,
      pageSize,
      currPage,
    } = monthDeptRegionBillList;
    const statusList = Object.keys(DEPT_STATUS_TEXT_MAP).map(key => ({
      text: DEPT_STATUS_TEXT_MAP[key],
      value: key,
    }));
    const columns = [
      {
        title: '部门',
        dataIndex: 'department',
        width: 150,
        className: styles.text,
        render: (_, record) => {
          return (
            <AddTooltip text={_}>
              {record.billStatus === '4' ? _ : (
                <Link to={`/manage/bill-center/send/${billNo}/resList/${record.departmentId}/${_}/${record.billStatus}`}>
                  {_}
                </Link>)
              }
            </AddTooltip>
          );
        },
      },
      {
        title: '公有云区',
        dataIndex: 'cloud-public',
        className: styles.borderRigh,
        children: [
          {
            title: '项目数',
            key: 'cloud-public.dept_proj_cnt',
            // sorter: true,
            render: (_, record) => this.getData(record, 'cloud-public', 'projectCount'),
          },
          {
            title: '资源数',
            key: 'cloud-public.dept_prod_cnts',
            // sorter: true,
            render: (_, record) => this.getData(record, 'cloud-public', 'productCount'),

          },
          {
            title: '金额',
            key: 'cloud-public.dept_prod_fee',
            className: styles.borderRigh,
            // sorter: true,
            render: (_, record) => this.getData(record, 'cloud-public', 'productFee'),

          },
        ]
      },
      {
        title: '专有云区',
        dataIndex: 'cloud-private',
        className: styles.borderRigh,
        children: [
          {
            title: '项目数',
            key: 'cloud-private.dept_proj_cnt',
            // sorter: true,
            render: (_, record) => this.getData(record, 'cloud-private', 'projectCount'),
          },
          {
            title: '资源数',
            key: 'cloud-private.dept_prod_cnts',
            // sorter: true,
            render: (_, record) => this.getData(record, 'cloud-private', 'productCount'),

          },
          {
            title: '金额',
            key: 'cloud-private.dept_prod_fee',
            className: styles.borderRigh,
            // sorter: true,
            render: (_, record) => this.getData(record, 'cloud-private', 'productFee'),

          },
        ]
      },
      {
        title: '行业云区',
        dataIndex: 'cloud-industry-pub',
        className: styles.borderRigh,
        children: [
          {
            title: '项目数',
            key: 'cloud-industry-pub.dept_proj_cnt',
            // sorter: true,
            render: (_, record) => this.getData(record, 'cloud-industry-pub', 'projectCount'),
          },
          {
            title: '资源数',
            key: 'cloud-industry-pub.dept_prod_cnts',
            // sorter: true,
            render: (_, record) => this.getData(record, 'cloud-industry-pub', 'productCount'),

          },
          {
            title: '金额',
            key: 'cloud-industry-pub.dept_prod_fee',
            className: styles.borderRigh,
            // sorter: true,
            render: (_, record) => this.getData(record, 'cloud-industry-pub', 'productFee'),

          },
        ]
      },
      {
        title: '行业云区-公安云区',
        dataIndex: 'cloud-industry-secu',
        className: styles.borderRigh,
        children: [
          {
            title: '项目数',
            key: 'cloud-industry-secu.dept_proj_cnt',
            // sorter: true,
            render: (_, record) => this.getData(record, 'cloud-industry-secu', 'projectCount'),
          },
          {
            title: '资源数',
            key: 'cloud-industry-secu.dept_prod_cnts',
            // sorter: true,
            render: (_, record) => this.getData(record, 'cloud-industry-secu', 'productCount'),

          },
          {
            title: '金额',
            key: 'cloud-industry-secu.dept_prod_fee',
            className: styles.borderRigh,
            // sorter: true,
            render: (_, record) => this.getData(record, 'cloud-industry-secu', 'productFee'),

          },
        ]
      },
      {
        title: '账单状态',
        dataIndex: 'billStatus',
        filters: statusList,
        filtered: true,
        render: _ => <span className={styles[DEPT_STATUS_MAP[_]]}>{DEPT_STATUS_TEXT_MAP[_]}</span>,
      },
      {
        title: '操作',
        render: (record) => {
          if (record.billStatus === '0' || record.billStatus === '3') {
            return (
              <div>
                <a onClick={(e) => this.onEdit(e, record)}>
                  <Icon type="form" style={{ marginRight: 8 }} />编辑
                </a>
                <a style={{ marginLeft: 16 }} onClick={(e) => this.onSend(e, record.departmentId)}>
                  <i className="icon iconfont" style={{ fontSize: 13 }}>&#xe66c;</i>发送
                </a>
              </div>
            );
          }
          
        }
      }
    ];
    return (
      <div className={styles.sendList}>
        <StackPanel>
          <div>部门查询：</div>
          <Search
            allowClear
            placeholder="请输入查询"
            onSearch={this.onSearch}
            style={{ width: 200 }}
          />
        </StackPanel>
        <Table
          className={styles.sendTable}
          rowKey={record => record.departmentId}
          dataSource={list}
          columns={columns}
          onChange={this.onChange}
          loading={loading}
          scroll={{ x: true }}
          pagination={
            totalCount <= pageSize
              ? false
              : {
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
              }
          }
        />
      </div>
    );
  }
}

export default withRouter(SendAndEdit);