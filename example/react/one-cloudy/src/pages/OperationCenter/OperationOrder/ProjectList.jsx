import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Link from 'umi/link';
import moment from 'moment';
import router from 'umi/router';
import { Card, Input, Badge, Menu, Dropdown, message, Modal, Form, Tooltip, Select } from 'antd';
import { Help } from '@/components/Common';
import PagedTable, { withDva } from '@/components/Common/PagedTable';
import ProcessAction from '@/components/OperationCenter/ProcessAtion';
import ResourceRevokeModal from '../../../components/OperationCenter/ResourceRevokeModal';
import {
  STATUS_MAP,
  STATUS_MAP_TEXT,
  STATUS_MAP_COLOR,
  ACTION_STATUS,
  ACTION_STATUS_TEXT,
  ACTION_STATUS_PERMISSIONS,
  ACTION_STATUS_TYPE,
  FLOW_STATUS_MAP_TEXT,
  ACTION_MAP_ACTION,
  ACTION_STATUS_ROLE,
  STATUS_MAP_QUERY,
  STATUS_MAP_QUERY_ALIAS,
} from './contant';
import styles from './List.less';

const { Search } = Input;
const { Option } = Select;

@Form.create()
class OrderList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      clickStatus: '',
      selectedVal: STATUS_MAP_QUERY_ALIAS.APLYY_ID,
    };
    const { queryOrderList, setter, projectId } = props;
    setter({
      pageNo: 1,
      pageSize: 10,
    });
    queryOrderList({
      projectId,
    });
  }

  queryOrderList = params => {
    const { keyWord, queryType } = this.state;
    const { queryOrderList, projectId } = this.props;
    queryOrderList({
      keyWord,
      projectId,
      queryType,
      ...params,
    });
  };

  // 修改状态查询
  onChange = (pagination, filters) => {
    const { keyWord, queryType } = this.state;
    const { projectId } = this.props;
    let params = {
      keyWord,
      queryType,
      projectId,
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    };
    if (filters.state) {
      params = {
        ...params,
        state: filters.state.join(','),
      };
    }

    this.queryOrderList(params);
    this.setState({
      status: filters.state,
    });
  };

  // 搜索关键字
  onSearch = val => {
    const { status, selectedVal } = this.state;
    const { projectId } = this.props
    this.queryOrderList({
      state: status ? status.join(',') : '',
      keyWord: val,
      pageNo: 1,
      pageSize: 10,
      queryType: selectedVal,
      projectId
    });
    this.setState({
      keyWord: val,
      queryType: selectedVal
    });
  };

  // 创建表单
  onCreate = () => {
    const { match, location } = this.props;
    const url = location.pathname.replace(
      `${match.path}`,
      '/manage/operation-center/resource-apply'
    );
    router.push(url);
  };

  // 提交操作
  onSubmit = (params, key) => {
    const { action } = this.props;
    const { applyId, status, clickStatus } = this.state;
    action(ACTION_STATUS_TYPE[key || clickStatus], {
      applyId,
      ...params,
    }).then(() => {
      message.success('操作成功');
      this.onHide();
      this.queryOrderList({
        state: status ? status.join(',') : '',
        pageNo: 1,
      });
    });
  }

  // 更多操作按钮
  onMenuClick = (key, record) => {
    switch (key) {
      case ACTION_STATUS.REVIEW_PASS:
      case ACTION_STATUS.REVIEW_REJECT:
      case ACTION_STATUS.APPROVAL_PASS:
      case ACTION_STATUS.APPROVAL_REJECT:
      case ACTION_STATUS.ZF_APPROVE_PASS:
      case ACTION_STATUS.ZF_APPROVE_REJECT:
      case ACTION_STATUS.SAFETY_APPROVAL_PASS:
      case ACTION_STATUS.SAFETY_APPROVAL_REJECT:
        this.modal.onShow();
        break;
      case ACTION_STATUS.CANCEL_REVOKE:
        this.onCancelRevoke();
        break;
      case ACTION_STATUS.FINISH:
        this.onSubmit({
          applyId: record.applyId,
        }, key);
        break;
      case ACTION_STATUS.REVOKE:
        this.onRevokeShow();
        break;
      case ACTION_STATUS.MODIFY:
        router.push(`/manage/operation-center/operation-order/update/${record.applyId}`);
        break;
      default:
    }
    this.setState({
      applyId: record.applyId,
      clickStatus: key,
      actionModalTitle: ACTION_STATUS_TEXT[key],
    });
  };

  // 撤销浮层
  onRevokeShow = () => {
    const { queryRevokeOptions } = this.props;
    queryRevokeOptions().then(resData => {
      this.setState({
        isRevokeShow: true,
        optionList: resData.optionsList,
      });
    });
  };

  // 关闭浮层
  onHide = () => {
    this.setState({
      isRevokeShow: false,
    });
  };

  // 切换查询条件
  onSelect = (value) => {
    this.setState({
      selectedVal: value,
    })
  }

  // 取消撤销
  onCancelRevoke = () => {
    Modal.confirm({
      title: '取消撤销',
      content: '确定要取消资源撤销？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        this.onSubmit();
      },
    });
  };

  render() {
    const Table = withDva('operationOrder', 'queryOrderList', false)(PagedTable);
    const { permsList, roleList, loading, userInfo, action, form } = this.props;
    const { isRevokeShow, status, optionList, applyId, clickStatus, actionModalTitle } = this.state;
    const statusList = Object.values(STATUS_MAP).map(key => ({
      text: STATUS_MAP_TEXT[key],
      value: key,
    }));
    const quryList = Object.values(STATUS_MAP_QUERY_ALIAS).filter(key => key.toString() !== STATUS_MAP_QUERY_ALIAS.PROJECT_NAME).map(key => ({
      text: STATUS_MAP_QUERY[key],
      value: key,
    }));
    const columns = [
      {
        width: 250,
        title: '申请单号',
        dataIndex: 'applyId',

        render: (text, record) => {
          const info = permsList.indexOf('resourcemanage:resourceapply:info') > -1;
          return info ? (
            <Link to={`/manage/operation-center/operation-order/details/${record.applyId}/detail`}>
              {text}
            </Link>
          ) : (
              text
            );
        },
      },
      {
        title: '部门',
        dataIndex: 'deptName',
      },
      {
        title: '项目',
        dataIndex: 'projectName',
        render: _ => _ || '-',
      },
      {
        title: '修改时间',
        dataIndex: 'updatedDate',
        render: _ => <span>{_ ? moment(_).format('YYYY-MM-DD HH:mm:ss') : '-'}</span>,
      },
      {
        title: '申请人',
        dataIndex: 'applyUserFullName',
      },
      {
        title: '状态',
        dataIndex: 'state',
        filters: statusList,
        filteredValue: status,
        filtered: true,
        // noTips: true,
        render: (_) => {
          const text = FLOW_STATUS_MAP_TEXT[_];
          const sta = <Badge color={STATUS_MAP_COLOR[_]} text={STATUS_MAP_TEXT[_]} />;
          if (text) {
            return (
              <Tooltip title={text}>
                {sta}
              </Tooltip>
            );
          }
          return sta;
        },
      },
      {
        title: (
          <span>
            <span style={{ marginRight: 5 }}>操作</span>
            <Help title="已初审完成及之后状态的申请单不支持修改 " />
          </span>
        ),
        className: 'action',
        render: (_, record) => {
          const { nextOperator, applyUserFullName } = record;
          if (!nextOperator) {
            return null;
          }
          const actionList = nextOperator.split(',');
          // 该条申请单可做的操作
          return actionList.map((item) => {
            // 查询是否含有对应操作的角色
            const hasRolePre = roleList.some(key => ACTION_STATUS_ROLE[item] === key);
            // 查询是否含有对应操作的权限
            const pre = permsList.some(key => ACTION_STATUS_PERMISSIONS[item] === key);
            // 没有角色或者权限
            if (!pre && !hasRolePre) {
              return null;
            }
            if (item === ACTION_STATUS.MODIFY && userInfo.fullname !== applyUserFullName) {
              return null;
            }
            const nextOpeList = ACTION_MAP_ACTION[item];
            const text = ACTION_STATUS_TEXT[item];
            // 如果 操作是个有数据的数据，则表示是个组合型操作按钮
            if (nextOpeList.length > 0) {
              return (
                <Dropdown
                  key={item}
                  overlay={
                    <Menu key={item}>
                      {nextOpeList.map(key => {
                        return (
                          <Menu.Item key={key}>
                            <a key={key} onClick={() => this.onMenuClick(key, record)}>
                              {ACTION_STATUS_TEXT[key]}
                            </a>
                          </Menu.Item>
                        )
                      })}
                    </Menu>
                  }
                  trigger={['click']}
                >
                  <a key={item} href="#">{text}</a>
                </Dropdown>
              );
            } else {
              return (
                <a key={item} onClick={() => this.onMenuClick(item, record)}>
                  {text}
                </a>
              );
            }
          });
        },
      },
    ];

    return (
      <div>
        <Card bordered={false}>
          <Select
            style={{ width: 150 }}
            defaultValue="申请单号" // 默认选择的值
            optionFilterProp="children"
            onSelect={this.onSelect}
          >
            {
              quryList.map(item => (<Option value={item.value}>{item.text}</Option>))
            }
          </Select>
          <Search
            placeholder="请输入查询内容"
            onSearch={this.onSearch}
            style={{ width: 200, margin: '0 16px 24px' }}
            allowClear
          />

          <Table
            className={styles.table}
            rowKey={record => record.applyId}
            columns={columns}
            onChange={this.onChange}
            loading={loading}
          />
        </Card>
        <ProcessAction
          ref={(ref) => { this.modal = ref; }}
          action={action}
          queryList={this.queryOrderList}
          applyId={applyId}
          clickStatus={clickStatus}
          actionModalTitle={actionModalTitle}
          form={form}
          status={status}
        />
        {/* {this.renderModal()} */}
        {isRevokeShow && (
          <ResourceRevokeModal
            isShow={isRevokeShow}
            onSubmit={this.onSubmit}
            onRest={this.onHide}
            optionList={optionList}
          />
        )}
      </div>
    );
  }
}

OrderList.propTypes = {
  queryOrderList: PropTypes.func.isRequired,
  permsList: PropTypes.array.isRequired,
};

function mapStateToProps({ operationOrder, user }) {
  return {
    orderList: operationOrder.orderList,
    permsList: user.permsList,
    roleList: user.roleList,
    userInfo: user.userInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    queryOrderList(payload) {
      return dispatch({
        type: 'operationOrder/queryOrderList',
        payload,
      });
    },
    queryRevokeOptions(payload) {
      return dispatch({
        type: 'operationOrder/queryRevokeOptions',
        payload,
      });
    },
    action(action, payload) {
      return dispatch({
        type: `operationOrder/${action}`,
        payload,
      });
    },
    setter(payload) {
      return dispatch({
        type: 'operationOrder/setter',
        payload,
      });
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderList);
