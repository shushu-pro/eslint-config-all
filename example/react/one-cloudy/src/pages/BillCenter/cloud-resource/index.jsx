import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {
  Spin, Table, Tabs, Popconfirm, Upload, Icon, message, Tooltip
} from 'antd';
import styles from '../index.less';
import DeleteIcon from './img/DeleteIcon';

const { TabPane } = Tabs;

let downloadFilesPageSize = 20; // 下载分页
let uploadFilesPageSize = 20; // 上传分页

class List extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 'fileDownload'
    };
  }

  componentDidMount() {
    const { queryDownloadFiles } = this.props;
    queryDownloadFiles({
      limit: downloadFilesPageSize,
      order: '',
      page: 1,
      sidx: '',
      fileType: 0
    });
    this.reloadFileUploadList();
  }

  render() {
    return (
      <PageHeaderWrapper title="云资源材料">
        <div className={styles.tabPage}>
          <Tabs defaultActiveKey={this.state.activeKey} onChange={activeKey => this.setState({ activeKey })} tabBarExtraContent={null}>
            {this.renderTabPanel(this.getFileDownloadOption())}
            {this.renderTabPanel(this.getFileUploadOption())}
          </Tabs>
        </div>
      </PageHeaderWrapper>
    );
  }

  renderTabPanel(option) {
    const tabIcon = option.key === 'fileDownload' ? <Icon type="cloud-download" /> : <Icon type="cloud-upload" />;
    return (
      <TabPane tab={<>{tabIcon} {option.title}</>} key={option.key}>
        <Spin spinning={option.loading}>
          {this.renderUploadButton()}
          <Table
            style={{ marginTop: '24px' }}
            rowKey={record => record.id}
            columns={option.columns}
            dataSource={option.dataSource}
            loading={option.loading}
            onChange={option.onChange}
            pagination={option.pagination}
          />
        </Spin>
      </TabPane>
    );
  }

  renderUploadButton() {
    if (this.state.activeKey === 'fileDownload') {
      return null;
    }
    return (
      <div style={{ textAlign: 'right', margin: '10px 0 -10px 0' }}>

        <Upload
          action="/oc/deptBillFile/uploadDeptBillFile"
          showUploadList={false}
          onChange={info => this.fileUploadChange(info)}
          beforeUpload={file => this.fileUploadBeforeChange(file)}
          accept=".jpg,.jpeg,.png,.pdf"
        >
          <Tooltip title="上传格式为jpg、png、jpeg、pdf，单个文件大小不超过20M" placement="topLeft" style={{ minWidth: '100px' }}>
            <a href="#">
              <Icon type="upload" /> 上传文件
            </a>
          </Tooltip>
        </Upload>

      </div>
    );
  }

  fileUploadChange({ file }) {
    const { response } = file;

    if (!response) {
      return;
    }
    if (response.msg === 'success') {
      message.success(response.resData);
      this.reloadFileUploadList();
    } else {
      message.error('上传格式为jpg、png、jpeg、pdf，单个文件大小不超过20M');
    }
  }

  fileUploadBeforeChange(file) {
    const isLt20M = file.size / 1024 / 1024 < 20;
    if (!isLt20M) {
      message.error('单个文件不能超过20M');
      return false;
    }
    return true;
  }

  getFileDownloadOption() {
    const { downloadFiles, loadingForDownloadFiles } = this.props;
    const { pagination = {} } = downloadFiles;
    return {
      title: '材料下载',
      key: 'fileDownload',
      loading: loadingForDownloadFiles,
      pageSize: downloadFilesPageSize,
      pagination: {
        pageSize: pagination.pageSize || downloadFilesPageSize,
        total: pagination.totalCount,
        current: pagination.currPage || 1,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
      },
      columns: [
        {
          title: '文件名',
          dataIndex: 'fileName',
          render: (fileName, record) => (
            <div>
              {fileName}
              { record.fileType === 2
              && (
                <span style={{
                  marginLeft: '6px', background: '#0059FF', padding: '1px 8px', borderRadius: '11px', color: '#eee'
                }}
                >公共
                </span>
              )}
            </div>
          )
        },
        {
          title: '发布时间',
          dataIndex: 'createTime',
          width: 240,
          sorter: true,
        },
        {
          title: ' ',
          dataIndex: 'ossUrl',
          width: 100,
          render: ossUrl => (<a target="_blank" href={ossUrl} download><Icon type="download" /> 下载</a>)
        },
      ],
      dataSource: downloadFiles.dataSource,
      onChange: (pagination, filters, sorter) => {
        downloadFilesPageSize = pagination.pageSize;
        this.props.queryDownloadFiles({
          limit: pagination.pageSize,
          page: pagination.current,
          order: ({ descend: 'desc', ascend: 'asc' })[sorter.order] || '',
          sidx: sorter.order ? sorter.field : '',
          fileType: 0
        });
      }
    };
  }

  getFileUploadOption() {
    const { uploadFiles, loadingForUploadFiles } = this.props;
    const { pagination = {} } = uploadFiles;
    return {
      title: '材料上传',
      key: 'fileUpload',
      loading: loadingForUploadFiles,
      pageSize: uploadFilesPageSize,
      pagination: {
        pageSize: pagination.pageSize || uploadFilesPageSize,
        total: pagination.totalCount,
        current: pagination.currPage || 1,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
      },
      columns: [
        {
          title: '已上传的文件',
          dataIndex: 'fileName',
          render: (fileName, { ossUrl }) => (<a href={ossUrl} target="_blank">{fileName}</a>)
        },
        {
          title: '上传时间',
          dataIndex: 'createTime',
          width: 240,
          sorter: true,
        },
        {
          title: ' ',
          dataIndex: 'id',
          width: 100,
          render: id => (
            <Popconfirm title="确定删除文件?" onConfirm={() => this.deleteFile(id)} okText="确定" cancelText="取消">
              <a href="#"><DeleteIcon /> 删除</a>
            </Popconfirm>
          )
        },
      ],
      dataSource: uploadFiles.dataSource,
      onChange: (pagination, filters, sorter) => {
        uploadFilesPageSize = pagination.pageSize;
        this.props.queryUploadFiles({
          limit: pagination.pageSize,
          page: pagination.current,
          order: ({ descend: 'desc', ascend: 'asc' })[sorter.order] || '',
          sidx: sorter.order ? sorter.field : '',
          fileType: 1
        });
      }
    };
  }

  reloadFileUploadList() {
    this.props.queryUploadFiles({
      limit: uploadFilesPageSize,
      order: '',
      page: 1,
      sidx: '',
      fileType: 1
    });
  }

  // FIXME: pdf目前暂时没办法下载
  downloadFile() {

  }

  deleteFile(id) {
    this.props.deleteUploadFiles(id, () => {
      this.reloadFileUploadList();
    });
  }
}


function mapStateToProps({ cloudResource, loading }) {
  return {
    downloadFiles: cloudResource.downloadFiles,
    uploadFiles: cloudResource.uploadFiles,
    loadingForDownloadFiles: loading.effects['cloudResource/queryDownloadFiles'],
    loadingForUploadFiles: loading.effects['cloudResource/queryUploadFiles'],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    queryDownloadFiles(payload) {
      return dispatch({
        type: 'cloudResource/queryDownloadFiles',
        payload,
      });
    },
    queryUploadFiles(payload) {
      return dispatch({
        type: 'cloudResource/queryUploadFiles',
        payload,
      });
    },
    deleteUploadFiles(payload, callback) {
      return dispatch({
        type: 'cloudResource/deleteUploadFiles',
        payload,
        callback
      });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
