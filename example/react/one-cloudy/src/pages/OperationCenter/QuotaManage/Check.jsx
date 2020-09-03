import React, { Component } from 'react'
import { connect } from 'dva'
import {
  Alert, Input, Spin, Switch,
} from 'antd'
import StackPanel from '@/components/Common/StackPanel'
import {
  queryDeptQuotaList,
  querySubDeptQuotaList,
  getDepartmentSetting,
  modifyDepartmentSetting,
} from '@/services/OperationCenter/quotaManage'
import { REGION_ID_NUM_TEXT_MAP } from '@/pages/BillCenter/constant'
import { ProductList, RegionSelect, SubordinateDeptTree } from './containers'
import { QUOTA_TYPE } from './constant'

const mapDispatchToProps = (dispatch) => ({
  setRefreshQuotaList: (fun) => dispatch({
    type: 'quotaManage/setter',
    payload: {
      refreshQuotaList: fun,
    },
  }),
})
@connect(null, mapDispatchToProps)
class Check extends Component {
  static defaultProps = {
    distribute: false, // 是否是配额分配
  };

  constructor (props) {
    super(props)
    this.state = {
      searchKey: '',
      regionId: undefined,
      regionName: undefined,
      deptId: undefined,
      quotaData: [],
      loading: false,
      showAutoApprove: false, // 是否展示自动审批的控件
      autoApprove: false, // 是否自动审批
      autoApproveLoading: false, // 自动审批的按钮loading状态
    }
  }

  componentDidMount () {
    const { setRefreshQuotaList } = this.props
    setRefreshQuotaList(this.getQuotaData)
  }

  getQuotaData = () => {
    const { regionId, deptId } = this.state
    const { type } = this.props
    const sendData = {
      regionId,
      deptId,
    }
    this.setState({ loading: true })
    // 查看本部门和子部门的额配额列表的接口不是同一个，所以按照页面的type属性进行区分
    const api = type === QUOTA_TYPE.SUBORDINATE_DEPT ? querySubDeptQuotaList : queryDeptQuotaList
    api(sendData)
      .then(({ resData }) => {
        const quotaData = resData.list
        this.setState({
          quotaData,
        })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  };

  selectRegion = (regionId, regionName) => {
    this.setState(
      {
        regionId,
        regionName,
      },
      () => {
        const { deptId } = this.state
        const { type } = this.props
        // 查看下级部门的时候初始展示空页面，需要用户手动选择部门后再查看
        if (type === QUOTA_TYPE.SUBORDINATE_DEPT && !deptId) return
        this.getQuotaData()
        if (type === 'subordinateDept') {
          this.getAutoApproveData()
        }
      },
    )
  };

  selectDepartment = (deptId) => {
    this.setState(
      {
        deptId,
      },
      () => {
        this.getQuotaData()
        this.getAutoApproveData()
      },
    )
  };

  onSearch = (searchKey) => {
    this.setState({ searchKey })
  };

  getAutoApproveData = () => {
    const { deptId, regionId } = this.state
    const sendDate = {
      deptId,
      regionId: REGION_ID_NUM_TEXT_MAP[regionId],
    }
    regionId && getDepartmentSetting(sendDate).then(({ resData }) => {
      const { applyWithoutConfirm, isShowApproveFlag } = resData
      this.setState({
        autoApprove: !!applyWithoutConfirm,
        showAutoApprove: isShowApproveFlag,
      })
    })
  };

  changeAutoApprove = (checked) => {
    this.setState({
      autoApproveLoading: true,
    })
    const { deptId, autoApprove } = this.state
    const sendData = {
      deptId,
      applyWithoutConfirm: checked ? 1 : 0,
    }
    modifyDepartmentSetting(sendData)
      .then(() => {
        this.setState({
          autoApprove: !autoApprove,
        })
      })
      .finally(() => {
        this.setState({
          autoApproveLoading: false,
        })
      })
  };

  render () {
    const {
      searchKey,
      quotaData,
      loading,
      regionId,
      regionName,
      autoApprove,
      autoApproveLoading,
      showAutoApprove,
      deptId,
    } = this.state
    const { type } = this.props
    const distribute = type === QUOTA_TYPE.DISTRIBUTE
    const content = (
      <>
        {showAutoApprove && (
          <div className="auto-approve">
            <span>该部门在配额范围内申请资源时，自动完成审批</span>
            <Switch
              size="small"
              checked={autoApprove}
              onChange={this.changeAutoApprove}
              loading={autoApproveLoading}
            />
          </div>
        )}
        <div className="top-line clearfix">
          <RegionSelect onChange={this.selectRegion} style={{ marginBottom: 16 }} type={type || 'quotaCheck'} />
          <StackPanel style={{ marginBottom: 8 }}>
            <Input.Search placeholder="请输入资源名称查询" onSearch={this.onSearch} allowClear />
            <StackPanel.RightAlice>
              <ul className="color-tip clearfix">
                <li>
                  <i className="success" />
                  本部门已使用资源
                </li>
                <li>
                  <i className="active" />
                  分配出去的资源
                </li>
                <li>
                  <i className="disabled" />
                  剩余配额
                </li>
              </ul>
            </StackPanel.RightAlice>
          </StackPanel>
        </div>
        <ProductList
          searchKey={searchKey}
          data={quotaData}
          type={type}
          distribute={distribute}
          regionId={regionId}
          regionName={regionName}
          deptId={deptId}
        />
      </>
    )
    return (
      <Spin spinning={loading} size="large">
        {distribute && (
          <Alert
            style={{ marginBottom: 14 }}
            message="“配额分配”指的是将本部门配额分配给下一级单位；分配给各下一级部门的配额总和 + 本部门资源使用量≤配额总量。"
            type="info"
            showIcon
          />
        )}
        {type === QUOTA_TYPE.SUBORDINATE_DEPT ? (
          <SubordinateDeptTree onChange={this.selectDepartment} type={type}>
            {content}
          </SubordinateDeptTree>
        ) : (
          content
        )}
      </Spin>
    )
  }
}

export default Check
