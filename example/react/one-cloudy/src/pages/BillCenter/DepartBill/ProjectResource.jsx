import React, { PureComponent } from 'react';
import {
  Table,
  Icon,
  Spin,
} from 'antd';
import { connect } from 'dva';
import StackPanel from '@/components/Common/StackPanel';
import AddTooltip from '@/components/Common/AddTooltip';
import { getFloatStr } from '@/utils/utils';
import styles from '../index.less';

@connect(({ billCenter, loading }) => ({
  ...billCenter,
  loading: !!loading.effects['billCenter/queryProjectList'],
}))
class Details extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expandedKey: [],
    };
  }

  componentDidMount() {
    this.queryList();
    this.queryProjectListExport();
  }

  queryList = params => {
    const { dispatch, match } = this.props;
    const {
      departmentId,
      projectId,
      billNo
    } = match.params;
    dispatch({
      type: 'billCenter/queryProjectList',
      payload: {
        departmentId,
        projectId,
        billNo,
        ...params,
      },
    });
  };

  queryProjectListExport = () => {
    const { dispatch, match } = this.props;
    const {
      departmentId,
      projectId,
      billNo
    } = match.params;
    dispatch({
      type: 'billCenter/queryProjectListExport',
      payload: {
        departmentId,
        projectId,
        billNo,
      },
    });
  };

  isExpanded = (e, row) => {
    const { dispatch } = this.props;
    const { expandedKey } = this.state;
    dispatch({
      type: 'billCenter/queryProjectResourceChange',
      payload: {
        instanceId: row.row,
      },
    }).then(() => {
      const aDom = document.getElementById(row.seqno);
      if (expandedKey.indexOf(row.seqno) === -1) {
        aDom.innerHTML = '收起';
        expandedKey.push(row.seqno);
      } else {
        const i = expandedKey.findIndex(item => item === row.seqno);
        aDom.innerHTML = '查看';
        if (i > -1) {
          expandedKey.splice(i, 1);
        }
      }
      this.setState({
        expandedKey, // 设置展开行的key值
      });
    });
  };

  expandedRowRender = record => {
    const { projectChangeInfoList } = this.props;
    return (
      <div className={styles.changeInfo}>
        {projectChangeInfoList.map(item => {
          return (
            <StackPanel>
              <div style={{ marginRight: '40px' }}>
                <span style={{ color: '#999' }}>变更时间：</span>
                {item.closeTime}
              </div>
              <div>
                <span style={{ color: '#999' }}>变更内容：</span>
                {item.productSepcs && (
                  <span>
                    <span style={{ color: '#999' }}>CPU核数/内存 </span>
                    {item.productSepcs} <span style={{ color: '#999' }}>变更为 </span>
                    {record.productSepcs}
                  </span>
                )}
                <div style={{ marginLeft: '70px' }}>
                  {item.diskSize && (
                    <div>
                      <span style={{ color: '#999' }}>磁盘 </span>
                      {item.diskSize} <span style={{ color: '#999' }}>变更为 </span>
                      {record.productSepcs}
                    </div>
                  )}
                </div>
              </div>
            </StackPanel>
          );
        })}
      </div>
    );
  };

  render() {
    const {
      projectResource = {},
      projectResourceUrl={},
      loading,
    } = this.props;
    // const { expandedKey } = this.state;
    const { pageSize, totalCount, currPage, list } = projectResource;

    const columns = [
      {
        title: '实例名称',
        dataIndex: 'instanceName',
        render: _ => (
          <AddTooltip text={_}>{_ || '-'}</AddTooltip>
        )
      },
      {
        title: '资源类型',
        dataIndex: 'productName',
      },
      {
        title: '配置',
        dataIndex: 'productSepcs',
        render: _ => (
          <AddTooltip text={_}>{_}</AddTooltip>
        )
      },
      {
        title: '网络要求',
        dataIndex: 'network',
        render: _ => _ || '-',
      },
      {
        title: '开通时间',
        dataIndex: 'openTime',
        render: time => time ? time.split(' ')[0] : '-',
      },
      // {
      //   title: '变更',
      //   dataIndex: 'isChange',
      //   render: (isChange, record) =>
      //     isChange === 'Y' ? (
      //       <a id={record.seqno} onClick={() => this.isExpanded(this, record)}>
      //         查看
      //       </a>
      //     ) : (
      //       '-'
      //     ),
      // },
      {
        title: '费用',
        dataIndex: 'monthfee',
        render: _ => getFloatStr(_)
      },
    ];
    return (
      <Spin spinning={loading}>
        <StackPanel>
          <StackPanel.RightAlice>
            <a
              href={projectResourceUrl.url}
              download={projectResourceUrl.fileName}
              style={{ marginTop: '20px' }}
            >
              <Icon type="download" style={{ marginRight: 8 }} />
              导出表格
            </a>
          </StackPanel.RightAlice>
        </StackPanel>
        <Table
          className={styles.detail}
          style={{ marginTop: '20px' }}
          rowKey={record => record.seqno}
          dataSource={list}
          columns={columns}
          // expandedRowKeys={expandedKey}
          // expandedRowRender={this.expandedRowRender}
          // expandRowByClick
          // expandIconAsCell={false}
          pagination={
            totalCount <= pageSize
              ? false
              : {
                  pageSize: pageSize || 10,
                  total: totalCount,
                  current: currPage || 1,
                  pageSizeOptions: ['10', '20', '50'],
                  onChange: pageIndex => {
                    this.queryList({ page: pageIndex.toString(), limit: '10' });
                  },
                  onShowSizeChange: (pageIndex, size) => {
                    this.queryList({
                      page: pageIndex.toString(),
                      limit: size.toString(),
                    });
                  },
                }
          }
        />
      </Spin>
    );
  }
}

export default Details;
