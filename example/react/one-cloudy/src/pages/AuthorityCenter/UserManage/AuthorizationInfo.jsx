import React from 'react';
import { connect } from 'dva';
import {
  Radio, Button, Icon, Table, Spin, Modal, message
} from 'antd';
import Pagation from '@/components/Pagation';
import AddTooltip from '@/components/Common/AddTooltip';
import AddModal from './AddModal';
// import styles from './index.less';

const { confirm } = Modal;

@connect(({ ACuser, loading }) => ({
  ...ACuser,
  loading: !!loading.effects['ACuser/getProjectByUserId'],
}))

class SystemUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '项目',
      typeList: [
        {
          value: '项目'
        }
      ],
      addModalVisible: false,
      resData: [],
    };
  }

  componentDidMount() {
    this.queryList();
  }

  queryList = (params = {}) => {
    const { dispatch, userId } = this.props;
    const { page, limit } = params;
    dispatch({
      type: 'ACuser/getProjectByUserId',
      payload: {
        userId,
        page: page || this.pagationRef.state.current,
        limit: limit || this.pagationRef.state.pageSize,
      },
      callback: (e) => {
        if (e.successful) {
          this.setState({
            resData: e.resData
          });
        }
      }
    });
  }

  renderMemberList = (list) => {
    if (list.length) {
      const menberList = [];
      list.forEach((item) => {
        menberList.push(item.userName);
      });
      return menberList.join(',');
    }
    return '';
  }

  onTypeChange = (value) => {
    this.setState({
      type: value
    });
  }

  onClickAdd = () => {
    const { addModalVisible } = this.state;
    this.setState({
      addModalVisible: !addModalVisible,
    });
  }

  onClickExit = (id) => {
    const { resData } = this.state;
    const { dispatch, userId } = this.props;
    const {
      totalCount, pageSize, currPage,
    } = resData;
    let page = currPage;

    if (totalCount % pageSize === 1) {
      page = currPage - 1;
      if (page === 0) {
        page = 1;
      }
    }
    dispatch({
      type: 'ACuser/removeUserProject',
      payload: {
        userId,
        projectId: id,
      },
      callback: (e) => {
        if (e.code === 200) {
          message.success('退出项目成功！');
          this.queryList({ page, limit: pageSize });
        }
      }
    });
  }

  showConfirm = (id) => {
    const that = this;
    confirm({
      title: '是否确认退出该项目？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        that.onClickExit(id);
      },
      onCancel() {
      },
    });
  }

  render() {
    const {
      typeList, type, addModalVisible, resData
    } = this.state;
    const { userId, loading, ocDeptId } = this.props;

    const {
      totalCount, pageSize, currPage, list
    } = resData;
    const columns = [
      {
        title: '项目',
        key: 'projectName',
        dataIndex: 'projectName',
        render: _ => (
          <AddTooltip text={_}>
            {_ || '-'}
          </AddTooltip>)
      },
      {
        title: '所属部门',
        key: 'ocDeptName',
        dataIndex: 'ocDeptName',
        render: _ => (
          <AddTooltip text={_}>
            {_ || '-'}
          </AddTooltip>)
      },
      {
        title: '项目负责人',
        key: 'projectLeaderName',
        dataIndex: 'projectLeaderName',
        render: _ => (
          <AddTooltip text={_}>
            {_ || '-'}
          </AddTooltip>)
      },
      {
        title: '项目成员',
        key: 'projectMemberList',
        dataIndex: 'projectMemberList',
        render: _ => (
          this.renderMemberList(_) ? (
            <AddTooltip text={this.renderMemberList(_)}>
              {this.renderMemberList(_)}
            </AddTooltip>)
            : '-'
        ),
      },
      {
        title: '操作',
        key: 'projectId',
        dataIndex: 'projectId',
        render: _ => <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.showConfirm(_); }}>退出项目</span>
      },
    ];

    return (
      <div style={{ padding: '0 20px' }}>
        <Spin spinning={loading}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <span>
                已授权/加入：
              </span>
              <Radio.Group
                value={type}
                onChange={this.onTypeChange}
                style={{ margin: '20px 0 0' }}
              >
                {typeList && typeList.length > 0 && typeList.map(item => (
                  <Radio.Button value={item.value} key={item.value}>{item.value}</Radio.Button>
                ))}
              </Radio.Group>
            </div>
            <div>
              <Button
                style={{ color: '#1890ff', borderColor: '#1890ff', marginTop: '20px' }}
                onClick={this.onClickAdd}
              >
                <Icon type="plus" style={{ color: '#1890ff' }} />添加
              </Button>
            </div>
          </div>
          <Table
            rowKey={(record, index) => `${record.projectId}.${index}`}
            columns={columns}
            dataSource={list}
            pagination={false}
          />
          <Pagation
            onRef={(ref) => { this.pagationRef = ref; }}
            queryList={this.queryList}
            total={totalCount}
            pageSize={pageSize}
            current={currPage}
          />
          {
            addModalVisible
              ? <AddModal
                visible={addModalVisible}
                onClickAdd={this.onClickAdd}
                id={userId}
                ocDeptId={ocDeptId}
                queryList={this.queryList}
              /> : null
          }
        </Spin>
      </div>
    );
  }
}
export default SystemUser;