// 平台对接模块
import React from 'react';
import { connect } from 'dva';
import {
  Icon, Button, Table, Spin
} from 'antd';
import AddTooltip from '@/components/Common/AddTooltip';
import Pagation from '@/components/Pagation';
import { DEFAULT_COLOR } from '../constant';
import CheckAccessKey from './CheckAccessKey';
import MatchDepartment from './MatchDepartment';
import styles from './index.less';

@connect(({ ACdepartment, loading }) => ({
  ...ACdepartment,
  loading: !!loading.effects['ACdepartment/getPlatformIntegrationList'],
}))


class PlatformDocking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkAccessKeyVisible: false,
      matchDepartmentVisible: false,
      resData: {},
      OCdepartmentId: props.OCdepartmentId,
    };
  }

  componentDidMount() {
    const { OCdepartmentId } = this.props;
    OCdepartmentId && this.getPlatformIntegrationList();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.OCdepartmentId !== this.props.OCdepartmentId) {
      this.setState({
        OCdepartmentId: nextProps.OCdepartmentId
      }, () => {
        this.getPlatformIntegrationList();
      });
    }
  }

  // 获取平台对接列表
  getPlatformIntegrationList = (params = {}) => {
    const { OCdepartmentId } = this.state;
    const { dispatch } = this.props;
    const { page, limit } = params;
    dispatch({
      type: 'ACdepartment/getPlatformIntegrationList',
      payload: {
        ocDeptId: OCdepartmentId,
        current: page || this.pagationRef.state.current || undefined,
        size: limit || this.pagationRef.state.pageSize || undefined,
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

  changeCheckAccessKeyVisible = () => {
    const { checkAccessKeyVisible } = this.state;
    this.setState({
      checkAccessKeyVisible: !checkAccessKeyVisible
    });
  }

  changeMatchDepartmentVisible = () => {
    const { matchDepartmentVisible } = this.state;
    this.setState({
      matchDepartmentVisible: !matchDepartmentVisible
    });
  }

  render() {
    const { checkAccessKeyVisible, matchDepartmentVisible, resData } = this.state;
    const {
      OCdepartmentId, OCdeptName, parentDeptId, loading
    } = this.props;

    const {
      list = [], totalCount, pageSize, currPage
    } = resData;

    const columns = [
      {
        title: 'DT',
        dataIndex: 'cloudName',
        key: 'cloudName',
        render: _ => <AddTooltip text={_}>{_ || '-'}</AddTooltip>
      },
      {
        title: '对应部门',
        dataIndex: 'cloudDeptName',
        key: 'cloudDeptName',
        render: _ => <AddTooltip text={_}>{_ || '-'}</AddTooltip>
      },
      {
        title: '对应区域',
        dataIndex: 'cloudRegionName',
        key: 'cloudRegionName',
        render: _ => <AddTooltip text={_}>{_ || '-'}</AddTooltip>
      },
    ];


    return (
      <div className={styles.selectTabs}>
        <div className={styles.tabTitle}>
          <Icon type="bars" style={{ color: DEFAULT_COLOR, marginRight: '6px' }} />
          <span>与DT的对应关系</span>
        </div>
        <Spin spinning={loading}>
          <div className={styles.tabBtn}>
            <div>
              {/* <Input /> DT ASCM下拉框 */}
            </div>
            <div>
              <Button style={{ marginLeft: '10px', borderColor: DEFAULT_COLOR }} onClick={this.changeMatchDepartmentVisible}>
                <Icon type="edit" style={{ color: DEFAULT_COLOR }} />
                编辑
              </Button>
              <Button
                style={{ marginLeft: '10px', }}
                onClick={this.changeCheckAccessKeyVisible}
                disabled
              >
                查看部门Accesskey
              </Button>
            </div>
          </div>

          <Table
            style={{ marginTop: '24px' }}
            rowKey={record => `${record.cloudDeptId}.${record.cloudRegion}`}
            dataSource={list}
            columns={columns}
            className={styles.detailTable}
            getPopupContainer={() => document.getElementById('root')}
            pagination={false}
            scroll={{ y: 470 }}
          />

          <Pagation
            onRef={(ref) => { this.pagationRef = ref; }}
            queryList={this.getPlatformIntegrationList}
            total={totalCount}
            pageSize={pageSize}
            current={currPage}
          />
        </Spin>

        {
          checkAccessKeyVisible
            ? <CheckAccessKey
              visible={checkAccessKeyVisible}
              changeCheckAccessKeyVisible={this.changeCheckAccessKeyVisible}
            /> : null
        }

        {
          matchDepartmentVisible
            ? <MatchDepartment
              visible={matchDepartmentVisible}
              changeMatchDepartmentVisible={this.changeMatchDepartmentVisible}
              queryList={this.getPlatformIntegrationList}
              OCdepartmentId={OCdepartmentId}
              OCdeptName={OCdeptName}
              parentDeptId={parentDeptId}
            /> : null
        }
      </div>
    );
  }
}
export default PlatformDocking;