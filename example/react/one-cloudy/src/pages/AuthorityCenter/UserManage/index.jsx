import React from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Tabs } from 'antd';
import SystemUser from './SystemUser';
import styles from './index.less';

const { TabPane } = Tabs;
class UserManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '1'
    };
  }

  componentDidMount() {
  }

    callback =(value) => {
      this.setState({
        activeKey: value
      });
    }

    render() {
      const { activeKey } = this.state;
      return (
        <PageHeaderWrapper title="用户管理">
          <div className={styles.pageIndex}>
            <Tabs defaultActiveKey="1" value={activeKey} onChange={this.callback}>
              <TabPane tab="系统用户" key="1">
                <SystemUser />
              </TabPane>
              <TabPane tab="用户申请" key="2" disabled>
                暂未开放
              </TabPane>
            </Tabs>
          </div>
        </PageHeaderWrapper>
      );
    }
}
export default UserManage;