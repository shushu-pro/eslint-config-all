/**
 * 省大数据/省委政法委详情页 - 本月部门信息
 */
import React, { PureComponent } from 'react';
import { Link } from 'umi';
import { Table } from 'antd';
import { getFloatStr } from '@/utils/utils';
import {
  // STATUS_MAP,
  // STATUS_TEXT_MAP,
  DEPT_STATUS_MAP,
  DEPT_STATUS_TEXT_MAP,
} from '../constant';
import styles from '../index.less';

class DeptInfoList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { match, pageData, queryList } = this.props;
    const { billNo, seqno, unitId, ocFinId } = match.params;
    const { pageSize, totalCount, currPage, list } = pageData;
    const columns = [
      {
        title: '部门',
        dataIndex: 'department',
        render: (department, record) => {
          let url = '';
          // 如果departmentId的话，点击进入一级部门的账单详情
          if (record.departmentId) {
            url = `/manage/bill-center/list/department/${billNo}/${seqno}/${ocFinId}/${record.departmentId}/${department}/detail`;
          }
          // 如果params中有unitId的话，说明是该用户的部门是大数据，且点击了xxxx年x月账单(政法)，需要展示政法下的一级部门账单
          if (unitId && record.departmentId) {
            url = `/manage/bill-center/list/department/${billNo}/${seqno}/${ocFinId}/${record.departmentId}/${department}/detail/${unitId}`;
          }
          // 如果没有unitId 并且没有departmentId， 说明是xxxx年x月账单(政法)账单，需要进入xxxx年x月账单(政法)账单详情
          if (!unitId && !record.departmentId) {
            url = `/manage/bill-center/list/PACenterDetails/${billNo}/${seqno}/${ocFinId}/${department}/${record.unitId}`;
          }
          // 如果该账单状态为0（未发送， 不可查看详情）
          if (record.billStatus === '0' && record.departmentId) {
            return department;
          }
          return <Link to={url}>{department}</Link>;
        },
      },
      {
        title: '项目数',
        dataIndex: 'deptProjCnt',
        render: (_, record) => (record.billStatus === '0' ? '-' : _),
      },
      {
        title: '资源种类',
        dataIndex: 'deptProdtypeCnts',
        render: (_, record) => (record.billStatus === '0' ? '-' : _),
      },
      {
        title: '资源数量',
        dataIndex: 'deptProdCnts',
        render: (_, record) => (record.billStatus === '0' ? '-' : _),
      },
      {
        title: '金额(元)',
        dataIndex: 'deptProdFee',
        render: (_, record) => (record.billStatus === '0' ? '-' : getFloatStr(_)),
      },
      {
        title: '账单确认',
        dataIndex: 'billStatus',
        render: (_, record) => {
          if (!unitId && !record.departmentId) return '-';
          return <span className={styles[DEPT_STATUS_MAP[_]]}>{DEPT_STATUS_TEXT_MAP[_]}</span>;
        },
      },
      {
        title: '确认人',
        dataIndex: 'deptBillConfirmerName',
        render: name => name || '-',
      },
      {
        title: '确认时间',
        dataIndex: 'deptBillConfirmTime',
        render: time => (time ? time.split(' ')[0] : '-'),
      },
    ];
    return (
      <Table
        rowKey={record => record.seqno || record.departmentId || record.department}
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
                pageSizeOptions: ['10', '20', '50'],
                onChange: (pageIndex, size) => {
                  queryList({
                    page: pageIndex.toString(),
                    limit: size.toString(),
                  });
                },
                onShowSizeChange: (pageIndex, size) => {
                  queryList({
                    page: pageIndex.toString(),
                    limit: size.toString(),
                  });
                },
              }
        }
      />
    );
  }
}

export default DeptInfoList;
