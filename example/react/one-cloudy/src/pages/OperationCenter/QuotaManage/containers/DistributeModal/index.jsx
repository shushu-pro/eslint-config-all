
import React, { PureComponent } from 'react'
import { connect } from 'dva'
import {
  Alert, Modal, Spin, message,
} from 'antd'
import { querySubQuotaData, adjustSubDeptQuota } from '@/services/OperationCenter/quotaManage'
import { ProductDetailContent } from '../ProductDetail'
import SubordinateDeptTree from '../SubordinateDeptTree'
import DistributeContent from '../DistributeContent'
import { API_PARAMS } from '../../constant'
import './style.less'

@connect(({ quotaManage }) => ({
  refreshQuotaList: quotaManage.refreshQuotaList,
}))
class DistributeModal extends PureComponent {
  static defaultProps = {
    onCloseModal () { },
  }

  defaultState = {
    changed: false, // 通过判断是否修改来展示确定按钮是否可用
    parentData: {},
    loading: false, // 配额信息的加载状态
    okLoading: false, // 按钮的加载状态
    deptId: undefined,
    productId: undefined,
    subQuotaData: {},
    changeSubQuotaDataList: {}, // 已修改的配额列表（使用对象比较方便）
    validateStatus: [], // 配额分配的校验状态
  }

  state = this.defaultState;

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { visible } = this.props
    // 打开模态框的时候初始化
    if (!visible && nextProps.visible) {
      this.init(nextProps)
    }
  }

  init = (props = this.props) => {
    const { data } = props
    const productId = data[API_PARAMS.PRODUCTID]
    this.setState({
      productId,
      parentData: data,
    })
  }

  // 关闭模态框后需要重置state
  reset = () => {
    this.setState(this.defaultState)
  }

  onOk = () => {
    const ifOk = this.checkValidateStatus()
    if (!ifOk) return
    const { changeSubQuotaDataList, parentData } = this.state
    const {
      refreshQuotaList, regionId, regionName, onCloseModal,
    } = this.props
    // 根据用户的修改changeSubQuotaDataList数据转换成接口调用的数据结构sendData;
    const sendData = {
      [API_PARAMS.PRODUCTID]: parentData[API_PARAMS.PRODUCTID],
      [API_PARAMS.PRODUCTNAME]: parentData[API_PARAMS.PRODUCTNAME],
      regionId,
      regionName,
      deptQuotaList: {
      },
    }
    Object.keys(changeSubQuotaDataList).forEach((o) => {
      sendData.deptQuotaList[o] = changeSubQuotaDataList[o][API_PARAMS.QUOTA_LIST].map((p) => ({
        [API_PARAMS.QUOTA_NAME]: p[API_PARAMS.QUOTA_NAME],
        [API_PARAMS.SPEC_TYPE_ID]: p[API_PARAMS.SPEC_TYPE_ID],
        [API_PARAMS.PRODUCTID]: p[API_PARAMS.ACTUAL_PRODUCTID],
        ajustQuantity: p[API_PARAMS.QUOTA_TOTAL],
      }))
    })
    this.setState({
      okLoading: true,
    })
    adjustSubDeptQuota(sendData).then(() => {
      message.success('配额分配成功！')
      refreshQuotaList && refreshQuotaList()
      onCloseModal()
      this.reset()
    }).finally(() => {
      this.setState({
        okLoading: false,
      })
    })
  }

  onCancel = () => {
    const { onCloseModal } = this.props
    onCloseModal()
    this.reset()
  }

  checkValidateStatus = () => {
    const { validateStatus } = this.state
    if (validateStatus.every((o) => o !== 'error')) {
      return true
    }
  }

  selectDepartment = (deptId) => {
    this.setState({
      deptId,
    }, this.getSubQuotaData)
  }

  getSubQuotaData = () => {
    const { deptId, productId, changeSubQuotaDataList } = this.state
    const { regionId } = this.props
    if (!deptId) return
    // 如果该部门已经被修改过了，则将修改后的数据返回，不再从服务端获取
    if (changeSubQuotaDataList[deptId]) {
      this.setState({
        subQuotaData: changeSubQuotaDataList[deptId],
      })
      return
    }
    const sendData = {
      regionId,
      deptId,
      productId,
    }
    this.setState({ loading: true })
    querySubQuotaData(sendData).then(({ resData }) => {
      this.setState({
        subQuotaData: resData,
      })
    }).finally(() => {
      this.setState({ loading: false })
    })
  }

  changeSubQuotaData = (data, parentData, validateStatus) => {
    const { changeSubQuotaDataList, deptId } = this.state
    this.setState({
      changed: true,
      changeSubQuotaDataList: {
        ...changeSubQuotaDataList,
        [deptId]: data,
      },
      subQuotaData: data,
      parentData,
      validateStatus,
    })
  }

  render () {
    const {
      changed, parentData, subQuotaData, loading, okLoading,
    } = this.state
    const { visible, regionName, type } = this.props
    return (
      <Modal
        className="distribute-modal"
        keyboard={false}
        destroyOnClose
        width={1000}
        title={`${parentData[API_PARAMS.PRODUCTNAME]} 配额分配`}
        visible={visible}
        onOk={this.onOk}
        onCancel={this.onCancel}
        okButtonProps={{
          disabled: !changed,
          loading: okLoading,
        }}
      >
        <div>
          <Alert
            style={{ marginBottom: 14 }}
            message={(
              <span>
                1.分配给各下一级部门的配额总和 + 本部门资源使用量≤本部门配额总量。
                <br />
                2.下级部门的配额无法小于“该部门已使用的配额+该部门已分配的配额总和”
              </span>
            )}
            type="info"
            showIcon
          />
          <h3>
            当前区域：
            {regionName}
          </h3>
          <h4>本部门配额情况：</h4>
          <ProductDetailContent
            type="horizontal"
            data={parentData}
          />
          <SubordinateDeptTree
            size="small"
            beforeSelect={this.checkValidateStatus}
            onChange={this.selectDepartment}
            type={type}
          >
            <Spin spinning={loading} delay={500}>
              <DistributeContent
                data={subQuotaData}
                onChange={this.changeSubQuotaData}
                parentData={parentData}
              />
            </Spin>
          </SubordinateDeptTree>
        </div>
      </Modal>
    )
  }
}

export default DistributeModal
