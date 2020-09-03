import React from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import moment from 'moment';
import { Table, DatePicker } from 'antd';
import StackPanel from '@/components/Common/StackPanel';
import { getTitle } from '@/pages/BillCenter/constant';
import { getFloatStr } from '@/utils/utils';
import { transformData } from '../constant';
import styles from './index.less';

const { MonthPicker } = DatePicker;

@connect(({ billSend, loading }) => ({
  billList: billSend.billList,
  isSend: billSend.isSend,
  loading: !!loading.effects['billSend/queryOperationsStaffMonthBillList'],
}))

class OperationsStaffList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billNo: ''
    };
  }

  async componentDidMount() {
    await this.queryOperationsStaffMonthBillList();
  }

  queryOperationsStaffMonthBillList = params => {
    const { dispatch } = this.props;
    const { billNo, order, sidx } = this.state;
    dispatch({
      type: 'billSend/queryOperationsStaffMonthBillList',
      payload: {
        order,
        sidx,
        billNo,
        ...params,
      },
    });
  }

  onChange = (pagination, filters, sorter) => {
    // billNo 例如: 201905 非必填
    // startTime 开始时间，格式: yyyymm, 例如: 201905 非必填
    // endTime 结束时间，格式: yyyymm, 例如: 201909   非必填
    // sidx  排序字段, 可选值: (bill_no(账单号) 、department_cnts(部门数) 、product_cnts(资源数) 、bill_amt(金额) 非必填
    // order 排序方式, 可选值: asc(升序) 、desc(降序)
    let params = {};
    if (sorter && JSON.stringify(sorter) !== '{}') {
      params = {
        order: sorter.order === 'ascend' ? 'asc' : 'desc',
        sidx: sorter.columnKey,
      };
      this.setState({
        ...params,
      });
    }
    this.queryOperationsStaffMonthBillList({
      page: pagination.current,
      limit: pagination.pageSize,
      ...params,
    });
  }

  onTimeChange = (date, dateString) => {
    const billNo = dateString.replace('-', '');
    this.setState({
      billNo
    }, () => {
      this.queryOperationsStaffMonthBillList({
        page: 1,
        limit: 10,
      });
    });
  }

  disabledDate = current => current && current > moment().endOf('month').subtract(1, 'months');

  render() {
    const { billList = {}, loading } = this.props;
    const {
      totalCount,
      list,
      pageSize,
      currPage,
    } = billList;
    const columns = [
      {
        title: '账单名称',
        dataIndex: 'billNo',
        render: (_, record) => {
          const { billNo } = record;
          return (
            <Link to={`/manage/bill-center/billcheck/detail/overview?billNo=${billNo}`}>
              {getTitle(_)}
            </Link>
          );
        },
      },
      {
        title: '项目数',
        dataIndex: 'projectCnts',
        key: 'project_cnts',
        sorter: true,
        render: _ => transformData(_),
      },
      // {
      //   title: '资源种类',
      //   dataIndex: 'productTypeCnts',
      //   key: 'product_type_cnts',
      //   sorter: true,
      //   render: _ => _ || '-',
      // },
      {
        title: '资源数量',
        dataIndex: 'productCnts',
        key: 'product_cnts',
        sorter: true,
        render: _ => transformData(_),
      },
      {
        title: '费用',
        dataIndex: 'billAmt',
        key: 'bill_amt',
        sorter: true,
        render: _ => getFloatStr(_),
      },
    ];
    return (
      <div style={{ marginTop: 20 }} className={styles.billCheck}>
        <StackPanel style={{ marginLeft: 20 }}>
          <span>月份选择: </span>
          <MonthPicker
            separator="至"
            disabledDate={this.disabledDate}
            onChange={this.onTimeChange}
            placeholder="请选择"
          />
        </StackPanel>
        <Table
          style={{ marginTop: '24px', background: '#fff' }}
          rowKey={record => record.billNo}
          dataSource={list}
          columns={columns}
          loading={loading}
          onChange={this.onChange}
          pagination={{
            pageSize: pageSize || 10,
            total: totalCount,
            current: currPage || 1,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
          }}
        />
      </div>
    );
  }
}

export default OperationsStaffList;
