import React from 'react';
import { router } from 'umi';
import { Tabs } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Statistics from './Statistics';
import { getTitle } from '../constant';
import styles from '../index.less';

const { TabPane } = Tabs;
class ListIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectKey: 'statistics',
    };
  }


  render() {
    const { selectKey } = this.state;
    const { match } = this.props;
    const { billNo } = match.params;
    return (
      <PageHeaderWrapper title={getTitle(billNo)} goBack={() => router.push('/manage/bill-center/statistics')}>
        <div className={styles.tabPage}>
          <Tabs defaultActiveKey={selectKey} onChange={this.onChange}>
            <TabPane tab="账单详情" key="statistics">
              <Statistics />
            </TabPane>
          </Tabs>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default ListIndex;