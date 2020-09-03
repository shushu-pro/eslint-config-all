import React from 'react';
import { TabsIndex } from '@/components/Common';
import OperationsStaffList from '@/components/BillCenter/BillSend/OperationsStaffList';

class List extends React.Component {

  render() {
    return (
      <TabsIndex
        title="账单发送/编辑"
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