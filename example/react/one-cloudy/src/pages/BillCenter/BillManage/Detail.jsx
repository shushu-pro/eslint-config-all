/**
 * 大数据局 - 某月账单详情通用组件，适用于大数据局某月账单详情及大数据局进入政法汇总账单详情
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Spin, Tabs, Radio } from 'antd';
import BillDetail from './BillDetail';
import SearchPanel from './SearchPanel';
import DeptInfoList from './DeptInfoList';
import { REGION_LIST } from '../constant';
import styles from '../index.less';

const { TabPane } = Tabs;

class Detail extends PureComponent {
  state = {
    ocRegion: 'all',
  };

  async componentDidMount() {
    this.queryAllData();
  }

  queryAllData = async params => {
    await Promise.all([
      this.queryMonthDeptBillList(params),
      this.queryBillDetail(params),
      this.queryMonthDeptBillListExport(params),
    ]);
  };

  // 详情
  queryBillDetail = () => {
    const { queryBillDetail, match } = this.props;
    const { billNo, seqno, unitId } = match.params;
    const { ocRegion } = this.state;
    queryBillDetail({
      billNo,
      seqno,
      unitId,
      ocRegion,
    });
  };

  // 列表
  queryMonthDeptBillList = params => {
    const { queryMonthDeptBillList, match } = this.props;
    const { billNo, unitId } = match.params;
    const { ocRegion } = this.state;
    queryMonthDeptBillList({
      billNo,
      unitId,
      ocRegion,
      ...params,
    });
  };

  // 列表导出
  queryMonthDeptBillListExport = params => {
    const { queryMonthDeptBillListExport, match } = this.props;
    const { billNo, unitId } = match.params;
    const { ocRegion } = this.state;
    queryMonthDeptBillListExport({
      billNo,
      unitId,
      ocRegion,
      ...params,
    });
  };

  // 部门搜索
  onSearch = async value => {
    await Promise.all([
      this.queryMonthDeptBillList({
        department: value,
      }),
      this.queryMonthDeptBillListExport({
        department: value,
      }),
    ]);
  };

  // 切换区域
  onRegionChange = e => {
    this.setState({ ocRegion: e.target.value }, () => {
      this.queryAllData();
    });
  };

  render() {
    const { ocRegion } = this.state;
    const { loading, monthDeptBillList, detailData, monthDeptBillUrl, match } = this.props;
    const { billNo, unitId } = match.params;
    return (
      <div className={styles.tabPage}>
        <Tabs defaultActiveKey="detail">
          <TabPane tab="账单详情" key="detail">
            <Spin spinning={loading}>
              <Radio.Group
                value={ocRegion}
                onChange={this.onRegionChange}
                style={{ margin: '20px 20px 0' }}
              >
                <Radio.Button value="all">全部</Radio.Button>
                {REGION_LIST.map(item => (
                  <Radio.Button value={item.key}>{item.value}</Radio.Button>
                ))}
              </Radio.Group>
              <BillDetail
                detailData={detailData}
                billNo={billNo}
                unitId={unitId}
                monthDeptBillList={monthDeptBillList}
              />
              <SearchPanel monthDeptBillUrl={monthDeptBillUrl} onSearch={this.onSearch} />
              <DeptInfoList
                match={match}
                pageData={monthDeptBillList}
                queryList={this.queryMonthDeptBillList}
              />
            </Spin>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

Detail.propTypes = {};

function mapStateToProps({ loading, billCenter, user }) {
  return {
    ...billCenter,
    userInfo: user.userInfo,
    roleList: user.roleList,
    loading: loading.effects['billCenter/queryMonthDeptBillList'],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    queryMonthDeptBillList(payload) {
      return dispatch({
        type: 'billCenter/queryMonthDeptBillList',
        payload,
      });
    },
    queryBillDetail(payload) {
      return dispatch({
        type: 'billCenter/queryBigDataMonthBillDetail',
        payload,
      });
    },
    queryMonthDeptBillListExport(payload) {
      return dispatch({
        type: 'billCenter/queryMonthDeptBillListExport',
        payload,
      });
    },
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Detail)
);
