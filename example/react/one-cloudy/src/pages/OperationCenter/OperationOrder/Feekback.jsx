import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import PagedTable, { withDva } from '@/components/Common/PagedTable';
// import styles from './DetailIndex.less';

@connect(({ operationOrder, feedback }) => ({
  feedbackList: operationOrder.feedbackList,
  operationOrder,
  feedback,
}))
class DetailsIndex extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const Table = withDva('operationOrder', 'queryAllDetail', false)(PagedTable);
    // const { Column } = Table;
    return (
      <div>
        {/* <Table rowKey={record => record.projectId}>
          <Column
            title="实例名称1"
            dataIndex="resourceName"
            width="20%"
            className={styles.resultColumns}
          />
          <Column title="资源" dataIndex="resourceType" width={150} />
          <Column title="配置" dataIndex="resourceInfo" width="20%">
            {resourceInfo => {
              console.log(resourceInfo);
              return <div>111</div>;
            }}
          </Column>
          <Column title="开通时间" dataIndex="openTime" width={150} />
          <Column title="实例数量" dataIndex="quantity" width={150} />
          <Column title="操作" width={120}>
            {record => (
              <Fragment>
                <a onClick={() => onShow(record)}>查看</a>
              </Fragment>
            )}
          </Column>
        </Table> */}
      </div>
    );
  }
}

export default DetailsIndex;
