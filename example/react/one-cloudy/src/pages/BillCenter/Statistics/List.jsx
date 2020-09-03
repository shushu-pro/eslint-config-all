import React from 'react';
import { TabsIndex } from '@/components/Common';
import OperationsList from '@/components/BillCenter/BillSend/OperationsList';

class List extends React.Component {
  render() {
    return (
      <TabsIndex
        title="账单统计"
        tabList={[
          {
            name: '月度账单',
            key: '222',
            children: <OperationsList />,
          },
        ]}
      />
    );
  }
}

export default List;
