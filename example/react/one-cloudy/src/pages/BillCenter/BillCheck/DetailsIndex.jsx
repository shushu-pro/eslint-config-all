import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {  router } from 'umi';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Tabs } from 'antd';
import { getTitle, FINANCE_FILED_MAP_TEXT } from '../constant';
import { DEPT_DETAIL_LIST_CHECK } from '../breadcrumbConstant';
import styles from './index.less';

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
    const { match } = this.props;
    const { type } = match.params;
    this.state = {
      selectKey: type|| 'project',
    };
  }

  componentDidMount(){
    const { match } = this.props;
    const { type } = match.params;

    this.setState({
      selectKey:type
    })
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
    const {selectKey} =  this.state;
    const {  location } = this.props;
    const { billNo} = location.query;

    if(selectKey!==key){
      router.push(`./${key}?billNo=${billNo}`);
      this.setState({
        selectKey: key,
      });
    }
  };

  render() {
    const { match, ocFinanceDepartmentId,children ,location} = this.props;
    const { billNo} = location.query;
    const { department } = match.params;
    const { selectKey } = this.state;
    const title = billNo && getTitle(billNo);
    // 从各部门账单进入的页面需要判断选择查看的部门是否和登录的用户部门一致，一致的话就可以进行账单操作
    // const isData = department ? department === userInfo.deptName : true;
    return (
      <PageHeaderWrapper
        title={
          department ? `${department}(${FINANCE_FILED_MAP_TEXT[ocFinanceDepartmentId]})` : title
        }
        breadcrumbList={[DEPT_DETAIL_LIST_CHECK]}
      >
        <div className={styles.tabPage1}>
          <Tabs defaultActiveKey={selectKey} onChange={this.onChange}>
            <TabPane tab="账单总览" key="overview" />
            <TabPane tab="按区域查看" key="area" />
            <TabPane tab="按产品查看" key="product" />
          </Tabs>
          {children}
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default DetailsIndex;
