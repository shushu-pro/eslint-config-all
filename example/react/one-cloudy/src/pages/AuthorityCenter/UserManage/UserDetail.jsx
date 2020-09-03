import React from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import { Tabs } from 'antd';
import { USER_PATH } from '../breadcrumbConstant';
import BasicInfo from './BasicInfo';
import AuthorizationInfo from './AuthorizationInfo';
import styles from './index.less';

const { TabPane } = Tabs;


@connect(({ user, loading }) => ({
  userInfo: user.userInfo,
  loading: !!loading.effects['ACuser/getProjectByUserId'],
}))
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    const { location } = this.props;
    this.id = null;
    // this.flag true表示从权限中心-用户管理进入；false表示从右上角我的信息进入
    if (location && location.query) {
      this.flag = true;
      const { id, ocDeptId } = location && location.query;
      this.id = id;
      this.ocDeptId = ocDeptId;
    } else {
      this.id = props.userInfo.userId;
      this.ocDeptId = props.userInfo.deptId;

      this.flag = false;
    }
  }

  componentDidMount() {

  }

  callback = () => {

  }

  render() {
    return (
      <PageHeaderWrapper title={this.flag ? '账号详情' : '我的信息'} breadcrumbList={this.flag ? [USER_PATH] : []}>
        <div className={styles.pageIndex}>
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="基本信息" key="1">
              <BasicInfo userId={this.id} />
            </TabPane>
            <TabPane tab="角色授权" key="2">
              <AuthorizationInfo
                userId={this.id}
                ocDeptId={this.ocDeptId}
              />
            </TabPane>
          </Tabs>
        </div>
      </PageHeaderWrapper>
    );
  }
}
export default UserDetail;