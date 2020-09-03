import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Spin, Table, Tabs } from 'antd';
import { Link } from 'umi';
import { DEPT_STATUS_MAP, DEPT_STATUS_TEXT_MAP, getTitle } from '../constant';
import { getFloatStr } from '@/utils/utils';
import styles from '../index.less';

const { TabPane } = Tabs;

class List extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { queryFirstDeptMonthBillList } = this.props;
    queryFirstDeptMonthBillList();
  }

  onChange;

  render() {
    const { loading, firstDeptMonthBill = {}, queryFirstDeptMonthBillList } = this.props;
    const { pageSize, totalCount, currPage, list } = firstDeptMonthBill;
    const columns = [
      {
        title: '账单名称',
        dataIndex: 'billName',
        width: 150,
        render: (_, record) => {
          const { billNo, seqno, departmentId } = record;
          return (
            <Link to={`/manage/bill-center/myBill/details/${billNo}/${seqno}/${departmentId}`}>
              {getTitle(billNo)}
            </Link>
          );
        },
      },
      {
        title: '项目数',
        dataIndex: 'deptProjCnt',
      },
      {
        title: '资源种类',
        dataIndex: 'deptProdtypeCnts',
      },
      {
        title: '资源数量',
        dataIndex: 'deptProdCnts',
      },
      {
        title: '费用(元)',
        dataIndex: 'deptProdFee',
        width: 150,
        render: _ => getFloatStr(_),
      },
      {
        title: '账单确认',
        dataIndex: 'billStatus',
        render: _ => <span className={styles[DEPT_STATUS_MAP[_]]}>{DEPT_STATUS_TEXT_MAP[_]}</span>,
      },
      {
        title: '确认人',
        dataIndex: 'deptBillConfirmerName',
        render: _ => _ || '-',
      },
      {
        title: '确认时间',
        dataIndex: 'deptBillConfirmTime',
        render: _ => _ || '-',
      },
    ];
    return (
      <PageHeaderWrapper title="账单列表">
        <div className={styles.tabPage}>
          <Tabs defaultActiveKey="billList">
            <TabPane tab="月度" key="billList">
              <Spin spinning={loading}>
                <Table
                  style={{ marginTop: '24px' }}
                  rowKey={record => record.seqno}
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
                            queryFirstDeptMonthBillList({
                              page: pageIndex.toString(),
                              limit: size.toString(),
                            });
                          },
                          onShowSizeChange: (pageIndex, size) => {
                            queryFirstDeptMonthBillList({
                              page: pageIndex.toString(),
                              limit: size.toString(),
                            });
                          },
                        }
                  }
                />
              </Spin>
            </TabPane>
          </Tabs>
        </div>
      </PageHeaderWrapper>
    );
  }
}

List.propTypes = {};

function mapStateToProps({ billCenter, loading }) {
  return {
    firstDeptMonthBill: billCenter.firstDeptMonthBill,
    loading: loading.effects['billCenter/queryFirstDeptMonthBillList'],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    queryFirstDeptMonthBillList(payload) {
      return dispatch({
        type: 'billCenter/queryFirstDeptMonthBillList',
        payload,
      });
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
