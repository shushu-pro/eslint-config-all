/**
 *
政务：（审核、审批、安全审批）
a(申请) -> b（初审）-> c(审批)
a(申请) -> b（初审）-> c+(安全审批)
a(申请) -> b（初审）-> c(审批) -> c+(安全审批)
政法： （审核、审批、安全审批）
a(申请) -> c(审批)
数浙： 部门 + 角色（权限）
a(申请) -> d（部门预审）-> b（初审）-> c(审批)
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Link from 'umi/link';
import moment from 'moment';
import router from 'umi/router';
import _ from 'lodash';
import flowChartImg from '@/assets/flowChart.svg';
import TableItem from '@/components/Common/TableHeader/TableIndex';
import {
  Card, Badge, Menu, Dropdown, message, Modal, Form, Alert, Tooltip, Tabs, Spin,
  Icon,
} from 'antd';

import { Help } from '@/components/Common';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import ProcessAction from '@/components/OperationCenter/ProcessAtion';
import api from '@/api';
import MeauFilter from './MeauFilter';
import ResourceRevokeModal from '../../../components/OperationCenter/ResourceRevokeModal';
import ResourceFlowchart from '../../../components/OperationCenter/ResourceFlowchart';
import ListEditComponent from './ListEditComponent';
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
  bubbleSort
} from './contant';
import styles from './List.less';

const { TabPane } = Tabs;

const TAB_LIST = [
  {
    title: '全部申请单',
    type: '0',
  },
  {
    title: '我的待办',
    type: '1',
  },
  {
    title: '临时资源申请单',
    type: '2',
  },
];

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

@Form.create()
class OrderList extends PureComponent {
  constructor(props) {
    super(props);

    let paginations = {
      // 用于指派重新请求接口
      currentPages: { page: 1, limit: 10, total: 0 },
      0: { current: 1, pageSize: 10, total: 0 },
      1: { current: 1, pageSize: 10, total: 0 },
      2: { current: 1, pageSize: 10, total: 0 },
    };
    let filterInfoKeys = { 0: {}, 1: {}, 2: {}, };
    let defaultActiveKey = '0';
    if (props.location.query.APPLY_FORM_LIST_STATE) {
      try {
        ({ defaultActiveKey, paginations, filterInfoKeys } = JSON.parse(props.location.query.APPLY_FORM_LIST_STATE));
      } catch (err) {

      }
    }
    this.state = {
      status: null,
      clickStatus: '',
      paginations,
      defaultActiveKey,
      filterInfoKeys,
      assignList: [],
      applyList: [],
      releaseCount: 0,
      remarkEditing: false
    };
    this.getAssignList();
  }

  // 切换备注编辑
  toggleRemarkEdit = () => {
    const remarkEditing = !this.state.remarkEditing;
    this.setState({ remarkEditing }, () => {
      if (remarkEditing) {
        this.input.focus();
      }
    });
  }

  // 保存备注
  saveRemark = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleRemarkEdit();
      handleSave({ ...record, ...values });
    });
  }

  queryOrderList = params => {
    const { queryApplyOrderList, queryReleaseTempCount } = this.props;
    const { paginations, defaultActiveKey } = this.state;
    const curr_pagination = { limit: params.limit || 10, page: params.page || 1 };
    this.setAssignState('paginations', paginations, 'currentPages', curr_pagination);
    queryApplyOrderList({
      ...params,
    }).then(res => {
      this.setState({
        applyList: (res.list || [])
      });
      if (res && res.pagination) {
        this.setAssignState('paginations', paginations, defaultActiveKey, { ...res.pagination });
      }
    });
    queryReleaseTempCount({}).then(res => {
      // console.log('res', res);
      this.setState({
        releaseCount: res.resData,
      });
    });
  };

  getAssignList = _ => {
    const { querySysUsers } = this.props;
    querySysUsers().then(res => {
      this.setState({
        assignList: res,
      });
    });
  };

  // 和表格相关的处理自带分页
  onChange = query => {
    const { defaultActiveKey, filterInfoKeys } = this.state;
    this.queryOrderList({
      ...query,
      resListFlag: defaultActiveKey,
      state: query.state ? query.state.join(',') : '',
    });
    this.setAssignState('filterInfoKeys', filterInfoKeys, defaultActiveKey, { ...query });
  };

  // 当前页面的处理
  onSearch = (params, flag) => {
    const { paginations, filterInfoKeys, defaultActiveKey } = this.state;
    const query = flag ? params : { ...filterInfoKeys[defaultActiveKey], ...params };
    this.queryOrderList({
      ...paginations.currentPages,
      ...query,
      resListFlag: defaultActiveKey,
      state: query.state ? query.state.join(',') : '',
    });
  };

  // 切换TAB时执行操作
  changeTab = val => {
    const { filterInfoKeys } = this.state;
    const data = this.setAssignState('filterInfoKeys', filterInfoKeys, val, {
      ...filterInfoKeys[val],
      resListFlag: val,
    });
    this.setState({ defaultActiveKey: val }, () => {
      this.onSearch(data[val], true);
    });
  };

  setAssignState(key, obj, idx, value) {
    const data = Object.assign({}, obj, { [idx]: value });
    this.setState({ [key]: data });
    return data;
  }

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
    const { applyId, filterInfoKeys, defaultActiveKey } = this.state;
    action(ACTION_STATUS_TYPE[key || clickStatus], {
      applyId,
      ...params,
    }).then(() => {
      // console.log('onSubmit', 122223344);
      message.success('操作成功');
      this.onHide();
      // 操作一栏会更新到第一页，且状态会发生改变
      this.onSearch({});
    });
  };

  // 资源详情列表操作按钮
  onMenuClick = (key, record) => {
    switch (key) {
      case ACTION_STATUS.REVIEW_PASS:
      case ACTION_STATUS.REVIEW_REJECT:
      case ACTION_STATUS.TL_REVIEW_PASS:
      case ACTION_STATUS.TL_REVIEW_REJECT:
      case ACTION_STATUS.APPROVAL_PASS:
      case ACTION_STATUS.APPROVAL_REJECT:
      case ACTION_STATUS.ZF_APPROVE_PASS:
      case ACTION_STATUS.ZF_APPROVE_REJECT:
      case ACTION_STATUS.SAFETY_APPROVAL_PASS:
      case ACTION_STATUS.SAFETY_APPROVAL_REJECT:
      case ACTION_STATUS.BIGDATA1_APPROVAL_PASS:
      case ACTION_STATUS.BIGDATA1_APPROVAL_REJECT:
      case ACTION_STATUS.BIGDATA_APPROVAL_PASS:
      case ACTION_STATUS.BIGDATA_APPROVAL_REJECT:
      case ACTION_STATUS.LEAD1_APPROVAL_PASS:
      case ACTION_STATUS.LEAD1_APPROVAL_REJECT:
      case ACTION_STATUS.LEAD2_APPROVAL_PASS:
      case ACTION_STATUS.LEAD2_APPROVAL_REJECT:
      case ACTION_STATUS.LEAD3_APPROVAL_PASS:
      case ACTION_STATUS.LEAD3_APPROVAL_REJECT:
      case ACTION_STATUS.FINISH:
        this.modal.onShow();
        break;
      case ACTION_STATUS.CANCEL_REVOKE:
        this.onCancelRevoke();
        break;
      case ACTION_STATUS.REVOKE:
        this.onRevokeShow();
        break;
      case ACTION_STATUS.MODIFY:
        const { filterInfoKeys, paginations, defaultActiveKey } = this.state;
        const APPLY_FORM_LIST_STATE = {
          paginations, filterInfoKeys, defaultActiveKey
        };
        router.push(`/manage/operation-center/operation-order/update/${record.applyId}` + '?APPLY_FORM_LIST_STATE=' + JSON.stringify(APPLY_FORM_LIST_STATE));
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

  // 开启资源流程图浮层
  onOpenResourceFlowchart = () => {
    this.setState({
      isFlowchartShow: true,
    });
  };

  // 关闭资源流程图浮层
  onCloseResourceFlowchart = () => {
    this.setState({
      isFlowchartShow: false,
    });
  };

  // 关闭浮层
  onHide = () => {
    this.setState({
      isRevokeShow: false,
    });
  };

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

  onChangeAssign = (item, record) => {
    const { applyAssignor } = this.props;
    const { paginations } = this.state;
    const assignor = `${item.fullname},${item.username}`;
    applyAssignor({ commonInfo: { assignor, applyId: record.applyId } }).then(res => {
      if (res.code === 200) {
        this.onSearch({});
        message.success(`申请单号${record.applyId}指派成功`);
      } else {
        message.error(res && res.message ? res.message : res);
      }
    });
  };

  // 释放临时资源
  handleReleaseSource = record => {
    const { updateReleaseRes } = this.props;
    Modal.confirm({
      icon: <Icon style={{ color: '#1890FF' }} type="info-circle" />,
      title: '已释放',
      content: (
        <div className={styles.subTitle}>标记为“已释放”的资源，系统将不再标红，并取消钉钉和短信提醒?</div>
      ),
      okText: '确认',
      cancelText: '再想想',
      onOk: () => {
        updateReleaseRes({
          applyId: record.applyId,
          ifReleaseRes: 1,
        }).then(res => {
          if (res.code === 200) {
            this.onSearch({});
            message.success('操作成功');
          } else {
            message.error(res && res.message ? res.message : res);
          }
        });
      },
    });
  }

  getClolum() {
    const {
      permsList, roleList, loading, userInfo, action, form
    } = this.props;
    const {
      isRevokeShow,
      status,
      optionList,
      applyId,
      clickStatus,
      actionModalTitle,
      isFlowchartShow,
      defaultActiveKey,
      assignList,
      applyList,
      paginations,
      filterInfoKeys,
    } = this.state;
    const statusList = Object.values(STATUS_MAP).map(key => ({
      text: STATUS_MAP_TEXT[key],
      value: key,
    }));
    const quryList = Object.values(STATUS_MAP_QUERY_ALIAS).map(key => ({
      text: STATUS_MAP_QUERY[key],
      value: key,
    }));
    const HighPro = text => <Tooltip title={text || '-'}><span>{text || '-'}</span></Tooltip>;
    let columns = [];
    if (defaultActiveKey === '2') {
      columns = [
        {
          width: 230,
          title: '申请单号',
          dataIndex: 'applyId',
          isSearch: true,
          key: 'applyId',
          fixed: 'left',
          render: (text, record) => {
            const { filterInfoKeys, paginations } = this.state;
            const APPLY_FORM_LIST_STATE = {
              paginations, filterInfoKeys, defaultActiveKey
            };
            const info = permsList.indexOf('resourcemanage:resourceapply:info') > -1;
            return info ? (
              <Link to={`/manage/operation-center/operation-order/details/${record.applyId}/detail?APPLY_FORM_LIST_STATE=${JSON.stringify(APPLY_FORM_LIST_STATE)}`}>
                <span style={{ color: record.isRed ? 'red' : '#1890ff' }}>{text}</span>
              </Link>
            ) : (
              <div style={{ color: record.isRed ? 'red' : '#333' }}>{text}</div>
            );
          },
        },
        {
          title: '项目',
          dataIndex: 'projectName',
          isSearch: true,
          render: HighPro,
        },
        {
          dataIndex: 'deptName',
          isSearch: true,
          title: '部门',
        },
        {
          title: '申请人',
          isSearch: true,
          dataIndex: 'applyUserFullName',
        },
        {
          title: '最后操作时间',
          dataIndex: 'updatedDate',
          sorter: true,
          // sortOrder: filterInfo.order,
          render: _ => <Tooltip title={_ ? moment(_).format('YYYY-MM-DD HH:mm:ss') : '-'}><span>{_ ? moment(_).format('YYYY-MM-DD HH:mm:ss') : '-'}</span></Tooltip>
        },
        {
          title: '释放时间',
          dataIndex: 'releaseDate',
          sorter: true,
          // sortOrder: filterInfo.order,
          render: (_, record) => <span style={{ color: record.isRed ? 'red' : '#333' }}>{_ ? moment(_).format('YYYY-MM-DD') : '-'}</span>,
        },
        {
          title: '状态',
          dataIndex: 'state',
          // filters: statusList,
          // filteredValue: filterInfoKeys[defaultActiveKey].status,
          // filtered: true,
          noTips: true,
          render: _ => {
            const text = FLOW_STATUS_MAP_TEXT[_];
            const sta = <Badge color={STATUS_MAP_COLOR[_]} text={STATUS_MAP_TEXT[_]} />;
            if (text) {
              return <Tooltip title={text}>{sta}</Tooltip>;
            }
            return sta;
          },
        },
        {
          title: '运维备注',
          dataIndex: 'maintainPersonNote',
          editable: true,
          width: 200,
        },
      ];
      if (roleList.includes('assignor')) {
        columns.push({
          title: '操作',
          fixed: 'right',
          width: '100px',
          className: 'action',
          render: (_, record) => {
            const node = record.ifReleaseRes ? <span><Icon theme="filled" style={{ fontSize: '16px', color: '#52c41a' }} type="check-circle" /></span> :
            <span
              style={{color: '#1890ff', cursor: 'pointer' }}
              onClick={() => this.handleReleaseSource(record)}
            >已释放</span>;
            return node;
          }
        },)
      }
    } else {
      columns = [
        {
          width: 250,
          title: '申请单号',
          dataIndex: 'applyId',
          isSearch: true,
          key: 'applyId',
          fixed: 'left',
          render: (text, record) => {
            const { filterInfoKeys, paginations } = this.state;
            const APPLY_FORM_LIST_STATE = {
              paginations, filterInfoKeys, defaultActiveKey
            };
            const info = permsList.indexOf('resourcemanage:resourceapply:info') > -1;
            return info ? (
              <Link to={`/manage/operation-center/operation-order/details/${record.applyId}/detail?APPLY_FORM_LIST_STATE=${JSON.stringify(APPLY_FORM_LIST_STATE)}`}>
                {text}
              </Link>
            ) : (
              <div>{text}</div>
            );
          },
        },
        {
          dataIndex: 'deptName',
          isSearch: true,
          title: '部门',
        },
        {
          title: '项目',
          dataIndex: 'projectName',
          isSearch: true,
          render: HighPro,
        },
        {
          title: '修改时间',
          dataIndex: 'updatedDate',
          sorter: true,
          // sortOrder: filterInfo.order,
          render: _ => <span>{_ ? moment(_).format('YYYY-MM-DD HH:mm:ss') : '-'}</span>,
        },
        {
          title: '申请人',
          isSearch: true,
          dataIndex: 'applyUserFullName',
        },
        {
          title: '状态',
          dataIndex: 'state',
          filters: statusList,
          filteredValue: filterInfoKeys[defaultActiveKey].status,
          // filtered: true,
          noTips: true,
          render: _ => {
            const text = FLOW_STATUS_MAP_TEXT[_];
            const sta = <Badge color={STATUS_MAP_COLOR[_]} text={STATUS_MAP_TEXT[_]} />;
            if (text) {
              return <Tooltip title={text}>{sta}</Tooltip>;
            }
            return sta;
          },
        },
        {
          title: '运维备注',
          dataIndex: 'maintainPersonNote',
          editable: true,
          width: 200,
        },
        {
          title: (
            <span>
              <span style={{ marginRight: 5 }}>操作</span>
              <Help title="已初审完成及之后状态的申请单不支持修改 " />
            </span>
          ),
          fixed: 'right',
          className: 'action',
          render: (_, record) => {
            const { nextOperator, applyUserFullName } = record;
            if (!nextOperator) {
              return null;
            }
            const actionList = nextOperator.split(',');
            // 该条申请单可做的操作
            return actionList.map(item => {
              // 查询是否含有对应操作的角色
              const hasRolePre = roleList.some(key => ACTION_STATUS_ROLE[item] === key);
              // console.log(roleList, hasRolePre);
              // 查询是否含有对应操作的权限
              const pre = permsList.some(key => ACTION_STATUS_PERMISSIONS[item] === key);
              // console.log(permsList, pre);
              // 没有角色或者权限
              if (!pre || !hasRolePre) {
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
                        {nextOpeList.map(key => (
                          <Menu.Item key={key}>
                            <a key={key} onClick={() => this.onMenuClick(key, record)}>
                              {ACTION_STATUS_TEXT[key]}
                            </a>
                          </Menu.Item>
                        ))}
                      </Menu>
                    }
                    trigger={['click']}
                  >
                    <a key={item} href="#">
                      {text}
                    </a>
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
    }
    const assignItem = {
      dataIndex: 'assignor',
      isSearch: true,
      title: '指派',
      render: (text, record) => (
        <MeauFilter
          record={record}
          ACTION_STATUS={STATUS_MAP}
          text={text}
          key={record.applyId}
          assignList={assignList}
          onChangeAssign={col => {
            this.onChangeAssign(col, record);
          }}
        />
      ),
    };
    if (assignList && assignList.length) {
      columns.splice(-1, 0, assignItem);
    }
    columns.forEach(col => {
      if (!col.editable) {
        return col;
      }

      Object.assign(col, {
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: row => {
            api.setApplyFormRemark({
              maintainPersonNote: row.maintainPersonNote,
              applyId: row.applyId
            }).then(() => {
              const newData = [...this.state.applyList];
              const index = newData.findIndex(item => row.applyId === item.applyId);
              const item = newData[index];
              newData.splice(index, 1, {
                ...item,
                ...row,
              });
              this.setState({ applyList: newData });
            }).catch(err => {
              message.error(err.message || '操作失败，请重试', 0.6);
            });
          },
        })
      });
    });

    return columns.filter(item => {
      // 非备注或者备注并且有权限
      if (item.dataIndex !== 'maintainPersonNote' || roleList.includes('assignor')) {
        return true;
      }
    });
  }

  render() {
    const {
      permsList, roleList, loading, userInfo, action, form
    } = this.props;
    const {
      isRevokeShow,
      status,
      optionList,
      applyId,
      clickStatus,
      actionModalTitle,
      isFlowchartShow,
      defaultActiveKey,
      assignList,
      applyList,
      paginations,
      filterInfoKeys,
      releaseCount,
    } = this.state;
    const statusList = Object.values(STATUS_MAP).map(key => ({
      text: STATUS_MAP_TEXT[key],
      value: key,
    }));
    const quryList = Object.values(STATUS_MAP_QUERY_ALIAS).map(key => ({
      text: STATUS_MAP_QUERY[key],
      value: key,
    }));
    const HighPro = text => <span>{text || '-'}</span>;
    let messageDOM = (
      <div>
        资源审批到管理员后，正常会在2个工作日内交付资源（如涉及资源较多的情况下，资源交付团队会及时联系申请方协商
        <span
          onClick={() => this.onOpenResourceFlowchart()}
          style={{ marginTop: '-8px', float: 'right' }}
          className="ant-alert"
        >
          <img src={flowChartImg} alt="流程图" width="16px" />
          <span className="ant-alert-message" style={{ color: '#1890FF', fontSize: 12 }}>
            <a href="#" className="ant-dropdown-trigger">
              查看申请流程图
            </a>
          </span>
        </span>
      </div>
    );
    if (defaultActiveKey === '2') {
      if (roleList.includes('assignor')) {
        messageDOM = <div>临时资源申请单会在临近释放日期7日内，通过短信和钉钉提醒申请人和指派人, 点击'已释放'后会不再提醒</div>;
      } else {
        messageDOM = <div>临时资源申请单会在临近释放日期7日内，通过短信和钉钉提醒申请人, 释放后会取消提醒</div>;
      }
    }

    return (
      <PageHeaderWrapper title="申请单列表">
        <Card bordered={false} className={styles.listCard}>
          <Spin spinning={loading}>
            <Tabs
              className={styles.tabs}
              defaultActiveKey={defaultActiveKey}
              onChange={this.changeTab}
            >
              {TAB_LIST.map(item => (
                <TabPane key={item.type} tab={item.type === '2' ? <Badge showZero size="small" offset={[15, -5]} count={releaseCount}>{item.title}</Badge> : item.title}>
                  <Alert showIcon message={messageDOM} type="info" style={{ margin: '0 0 24px' }} />
                  <TableItem
                    className={styles.table}
                    scroolX={1600}
                    components={ListEditComponent}
                    pagination={paginations[item.type]}
                    filterInfos={filterInfoKeys[item.type]}
                    tableTagType={item.type}
                    rowKey={record => record.applyId}
                    columns={this.getClolum()}
                    data={applyList}
                    onChange={this.onChange}
                    // loading={loading}
                  />
                </TabPane>
              ))}
            </Tabs>
          </Spin>
        </Card>
        <ProcessAction
          ref={ref => {
            this.modal = ref;
          }}
          action={action}
          queryList={val => this.onSearch({})}
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
        <ResourceFlowchart isShow={isFlowchartShow} onRest={this.onCloseResourceFlowchart} />
      </PageHeaderWrapper>
    );
  }
}

OrderList.propTypes = {
  permsList: PropTypes.array.isRequired,
};

function mapStateToProps({ loading, operationOrder, user }) {
  return {
    orderList: operationOrder.orderList,
    permsList: user.permsList,
    roleList: user.roleList,
    userInfo: user.userInfo,
    loading: loading.effects['operationOrder/queryApplyOrderList'],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    queryApplyOrderList(payload) {
      return dispatch({
        type: 'operationOrder/queryApplyOrderList',
        payload,
      });
    },
    queryReleaseTempCount(payload) {
      return dispatch({
        type: 'operationOrder/queryReleaseTempCount',
        payload,
      });
    },
    querySysUsers(payload) {
      return dispatch({
        type: 'user/querySysUsers',
        payload,
      });
    },
    applyAssignor(payload) {
      return dispatch({
        type: 'projectManage/submitApplyAssignor',
        payload,
      });
    },
    queryRevokeOptions(payload) {
      return dispatch({
        type: 'operationOrder/queryRevokeOptions',
        payload,
      });
    },
    updateReleaseRes(payload) {
      return dispatch({
        type: 'operationOrder/updateReleaseRes',
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
