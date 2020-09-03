// 账单中心-账单核对主页面

import React from 'react';
import { TabsIndex } from '@/components/Common';
import OperationsStaffList from './OperationsStaffList';

class List extends React.Component {

  render() {
    return (
      <TabsIndex
        title="账单核对"
        tabList={[
          {
            name: "月度账单",
            key: "bill",
            children: <OperationsStaffList />,
          }
        ]}
      />
    );
  }
}

export default List;
