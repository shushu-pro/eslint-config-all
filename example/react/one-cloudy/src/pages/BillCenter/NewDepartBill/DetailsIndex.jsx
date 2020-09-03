import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Tabs , Icon } from 'antd';
import {  router } from 'umi';
import { getTitle, FINANCE_FILED_MAP_TEXT } from '../constant';
import { DEPT_DETAIL_LIST_NEWDEPARTBILL } from '../breadcrumbConstant';
// import Detail from './Detail';
// import Resource from './Resource';
// import ProjectResource from './ProjectResource';

import styles from '../index.less';
import style from './index.less';

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
      selectKey: 'overview',
    };
    
  }

  componentDidMount(){
    const { match } =this.props;
    const { type } = match.params;
    this.setState({
      selectKey:type
    })
  }

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
    const { match,   ocFinanceDepartmentId ,children,location} = this.props;
    const { billNo } = location.query;
    const { department, } = match.params;
    const { selectKey } = this.state;
    const title = getTitle(billNo);
    // 从各部门账单进入的页面需要判断选择查看的部门是否和登录的用户部门一致，一致的话就可以进行账单操作

    return (
      <PageHeaderWrapper
        title={
          department ? `${department}(${FINANCE_FILED_MAP_TEXT[ocFinanceDepartmentId]})` : title
        }
        breadcrumbList={[DEPT_DETAIL_LIST_NEWDEPARTBILL]}
      >
        <div className={`${styles.tabPage} ${style.tabStyle}`}>
          <Tabs defaultActiveKey={selectKey} onChange={this.onChange} activeKey={selectKey}>
            <TabPane  
              tab={
                <span>
                  <Icon type="container" />
                  账单概览
                </span>
              } 
              key="overview" 
            />
            <TabPane 
              tab={
                <span>
                  <Icon type="calendar" />
                  项目账单
                </span>
              } 
              key="project" 
            />
            <TabPane 
              tab={
                <span>
                  <Icon type="schedule" />
                  实例明细
                </span>
              }
              key="instance" 
            />
          </Tabs>

          {children}

        </div>
      </PageHeaderWrapper>
    );
  }
}

export default DetailsIndex;
