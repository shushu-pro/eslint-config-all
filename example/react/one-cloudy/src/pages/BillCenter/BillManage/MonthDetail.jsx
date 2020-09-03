/**
 * 大数据局/省政法委 - 账单详情
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import BillComfireBtn from '@/components/BillCenter/BillComfireBtn';
import { getTitle, FINANCE_FILED_MAP_TEXT } from '../constant';
import Detail from './Detail';
import { ALL_DEPT_LIST_MAP } from '../breadcrumbConstant';
import styles from '../index.less';

class MonthDetail extends PureComponent {
  submitBureauFeedback = params => {
    const { submitBureauFeedback, match } = this.props;
    const { billNo, seqno } = match.params;
    return submitBureauFeedback({
      billNo,
      seqno,
      ...params,
    });
  };

  render() {
    const { match, roleList, detailData } = this.props;
    const { billNo, ocFinId } = match.params;
    return (
      <div className={styles.detail}>
        <PageHeaderWrapper
          title={`${getTitle(billNo)}(${FINANCE_FILED_MAP_TEXT[ocFinId]})`}
          breadcrumbList={[ALL_DEPT_LIST_MAP]}
        >
          <Detail />
        </PageHeaderWrapper>
        {roleList.indexOf('bigDataBureauFeedback') > -1 &&
          detailData &&
          detailData.billStatus === '0' && (
            <BillComfireBtn
              rejectDisabled
              submitFeedback={this.submitBureauFeedback}
              // disabled={detailData.billDeptConfimCnts !== detailData.departmentCnts}
              disabled
            />
          )}
      </div>
    );
  }
}

MonthDetail.propTypes = {};

function mapStateToProps({ billCenter, user }) {
  return {
    ...billCenter,
    userInfo: user.userInfo,
    roleList: user.roleList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitBureauFeedback(payload) {
      return dispatch({
        type: 'billCenter/submitBureauFeedback',
        payload,
      });
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonthDetail);
