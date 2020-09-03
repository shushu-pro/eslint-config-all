// 项目具体信息页面
import React from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Tabs } from 'antd';
import { PROJECT_PATH } from '../breadcrumbConstant';
import BasicInfo from './BasicInfo';
import InstanceList from './InstanceList';
import Apply from './Apply';
import styles from './index.less';

const { TabPane } = Tabs;

class ProjectManageDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    const { location } = this.props;
    const { id, name } = location.query;
    this.id = id;
    this.name = name;
  }

  componentDidMount() {

  }

  onChange = () => {

  }

  render() {


    return (
      <PageHeaderWrapper title={this.name} breadcrumbList={[PROJECT_PATH]}>
        <div className={styles.pageIndex}>
          <Tabs defaultActiveKey="1" onChange={this.onChange}>
            <TabPane tab="基础信息" key="1">
              <BasicInfo deptId={this.id} />
            </TabPane>
            <TabPane tab="资源实例" key="2" disabled>
              <InstanceList deptId={this.id} />
            </TabPane>
            <TabPane tab="申请单" key="3">
              <Apply deptId={this.id} />
            </TabPane>
          </Tabs>
        </div>
      </PageHeaderWrapper>
    );
  }
}
export default ProjectManageDetails;