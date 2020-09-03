import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AddTooltip from '@/components/Common/AddTooltip';
import { Spin, Table, Tabs, Icon } from 'antd';
import { STATUS_MAP, STATUS_TEXT_MAP, getTitle } from '../constant';
import { getFloatStr } from '@/utils/utils';
import styles from '../index.less';

const { TabPane } = Tabs;

class List extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { queryMonthBillList } = this.props;
    queryMonthBillList({
      limit: 10,
      page: 1,
    });
  }

  onGoUrl = (billNo, seqno, ocFinanceDepartmentId) => {
    const { history, setter } = this.props;
    setter({
      ocFinanceDepartmentId,
    });
    history.push(`/manage/bill-center/list/details/${billNo}/${seqno}/${ocFinanceDepartmentId}`);
  };

  render() {
    const { loading, billList } = this.props;
    const { pageSize, totalCount, currPage, list } = billList;
    const columns = [
      {
        title: '账单名称',
        dataIndex: 'billName',
        width: 230,
        render: (_, record) => {
          const { billNo, seqno, ocFinanceDepartmentId, financeDepartmentName } = record;
          return (
            <a onClick={() => this.onGoUrl(billNo, seqno, ocFinanceDepartmentId)}>
              {getTitle(billNo)}({financeDepartmentName})
            </a>
          );
        },
      },
      {
        title: '部门数',
        dataIndex: 'departmentCnts',
      },
      {
        title: '项目数',
        dataIndex: 'projectCnts',
      },
      {
        title: '费用(元)',
        dataIndex: 'billAmt',
        width: 150,
        render: _ => getFloatStr(_),
      },
      {
        title: (
          <div>
            部门确认
            <AddTooltip text="当前账单内的所有部门全部确认账单后，才可以对当期汇总账单进行确认。">
              <Icon type="question-circle" style={{ color: '#1890FF', marginLeft: 8 }} />
            </AddTooltip>
          </div>
        ),
        dataIndex: 'billDeptConfimCnts',

        render: (_, record) => {
          const confirmNum = _ !== record.departmentCnts ? styles.confirmed : '';
          return (
            <span>
              <span className={confirmNum}>{_ || 0}</span>/{record.departmentCnts}
            </span>
          );
        },
      },
      {
        title: '账单确认',
        dataIndex: 'billStatus',
        render: _ => <span className={styles[STATUS_MAP[_]]}>{STATUS_TEXT_MAP[_]}</span>,
      },
      {
        title: '确认人',
        dataIndex: 'billConfirmerName',
        render: _ => _ || '-',
      },
      {
        title: '确认时间',
        dataIndex: 'billConfirmTime',
        render: _ => (_ ? _.split(' ')[0] : '-'),
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
                            const { queryMonthBillList } = this.props;
                            queryMonthBillList({
                              page: pageIndex.toString(),
                              limit: size.toString(),
                            });
                          },
                          onShowSizeChange: (pageIndex, size) => {
                            const { queryMonthBillList } = this.props;
                            queryMonthBillList({
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
    billList: billCenter.billList,
    isDigData: billCenter.isDigData,
    loading: loading.effects['billCenter/queryMonthBillList'],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    queryMonthBillList(payload) {
      return dispatch({
        type: 'billCenter/queryMonthBillList',
        payload,
      });
    },
    setter(payload) {
      return dispatch({
        type: 'billCenter/setter',
        payload,
      });
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
