import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import BillComfireBtn from '@/components/BillCenter/BillComfireBtn';
import { Tabs } from 'antd';
import { getTitle, FINANCE_FILED_MAP_TEXT } from '../constant';
import { DEPT_DETAIL_LIST } from '../breadcrumbConstant';
import Detail from './Detail';
import Resource from './Resource';
import styles from '../index.less';

const { TabPane } = Tabs;

@connect(({ billCenter, user }) => ({
  deptBillDetail: billCenter.deptBillDetail,
  ocFinanceDepartmentId: billCenter.ocFinanceDepartmentId,
  userInfo: user.userInfo,
  roleList: user.roleList,
}))
class DetailsIndex extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectKey: 'project',
    };
  }

  submitBureauFeedback = params => {
    const { dispatch, deptBillDetail, match } = this.props;
    const { billNo, departmentId } = match.params;
    return dispatch({
      type: 'billCenter/submitDeptFeedback',
      payload: {
        billNo,
        departmentId,
        seqno: deptBillDetail.seqno,
        ...params,
      },
    });
  };

  onChange = key => {
    this.setState({
      selectKey: key,
    });
  };

  render() {
    const { match, roleList, userInfo, deptBillDetail, ocFinanceDepartmentId } = this.props;
    const { department, billNo } = match.params;
    const { selectKey } = this.state;
    const title = getTitle(billNo);
    // 从各部门账单进入的页面需要判断选择查看的部门是否和登录的用户部门一致，一致的话就可以进行账单操作
    const isData = department ? department === userInfo.deptName : true;
    return (
      <PageHeaderWrapper
        title={
          department ? `${department}(${FINANCE_FILED_MAP_TEXT[ocFinanceDepartmentId]})` : title
        }
        breadcrumbList={DEPT_DETAIL_LIST(match.params)}
      >
        <div className={styles.tabPage}>
          <Tabs defaultActiveKey={selectKey} onChange={this.onChange}>
            <TabPane tab="账单详情" key="project">
              <Detail match={match} />
            </TabPane>
            <TabPane tab="项目账单" key="resource">
              <Resource match={match} />
            </TabPane>
          </Tabs>
        </div>
        {roleList.indexOf('deptFeedback') > -1 &&
          isData &&
          deptBillDetail &&
          deptBillDetail.billStatus === '1' && (
            <BillComfireBtn
              billStatus={deptBillDetail && deptBillDetail.billStatus}
              submitFeedback={this.submitBureauFeedback}
              disabled
              isDept
            />
          )}
      </PageHeaderWrapper>
    );
  }
}

export default DetailsIndex;
