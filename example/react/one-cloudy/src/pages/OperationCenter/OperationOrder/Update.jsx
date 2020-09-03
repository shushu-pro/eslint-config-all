/**
 * 资源变更
 */
import React, { PureComponent } from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import { router } from 'umi'
import {
  Spin, Form, Card, Button, message, Alert,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import StackPanel from '@/components/Common/StackPanel'
import FooterComfire from '@/components/Common/FooterComfire'
import { BaseInfo } from '@/components/OperationCenter/Product/base'
import ResourceUsers from '@/components/OperationCenter/ApplyFrom/ResourceUsers'
import ResourceInfo from '@/components/OperationCenter/ResourceInfo'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import Modals from '@/components/Common/Modals'
import Product from '@/components/OperationCenter/Product'
import { Upload } from '@/components/OperationCenter/Product/components'
import { validateAndScroll } from '@/utils/formx'
import PageLoading from '@/components/PageLoading'
import ProductList from '../ResourceApply/ProductList'
import {
  FIELD_MAP,
  PRODUCT_FIELDS,
  SUBMIT_FIELD,
  specTransform,
  getUserList,
  submitDataTransform,
} from '../ResourceApply/constant'
import EditProductModal from './EditProductModal'
import styles from './DetailIndex.less'
import { RES_LIST_MAP } from '../breadcrumbConstant'

const mapStateToProps = ({
  user, resourceApply, operationOrder, loading, pageData,
}) => ({
  resourceUserList: user.userList,
  sfTime: resourceApply.sfTime,
  userInfo: user.userInfo,
  detailInfo: operationOrder.detailInfo,
  orgType: user.unitId,
  productForm: resourceApply.form,
  selectedProjectInfo: resourceApply.selectedProjectInfo,
  resourceData: resourceApply.resourceData,
  loading: !!loading.effects['operationOrder/queryOrderDetail'],
  productLoading: !!loading.effects['resourceApply/queryProductCategory'],
  submitLoading: !!loading.effects['operationOrder/submitApply'],
  recoveryList: resourceApply.recoveryList,
  isStandard: pageData.isStandard,
  updataOSSRecovData: pageData.updataOSSRecovData,
})
const mapDispatchToProps = (dispatch) => ({
  queryOrderDetail (payload) {
    return dispatch({
      type: 'operationOrder/queryOrderDetail',
      payload,
    })
  },
  submitApply (payload) {
    return dispatch({
      type: 'operationOrder/submitApply',
      payload,
    })
  },
  setter (payload) {
    return dispatch({
      type: 'operationOrder/setter',
      payload,
    })
  },
  resourceSetter (payload) {
    return dispatch({
      type: 'resourceApply/setter',
      payload,
    })
  },
  /**
   * 没有项目信息的产品会没有执行queryUserList接口请求，后续的部分Card显示依赖于queryUserList数据做判断条件，
   * 因此这里在父组件请求一次，以防止没有BaseInfo的产品影像其他Card的渲染
   */
  queryUserList (payload) {
    return dispatch({
      type: 'user/queryUserList',
      payload,
    })
  },
  updateProductEditDetail (payload) {
    dispatch({
      type: 'operationOrder/updateProductEditDetail',
      payload,
    })
  },
})
@connect(mapStateToProps, mapDispatchToProps)
@Form.create()
class UpdateDetail extends PureComponent {
  constructor (props) {
    super(props)
    this.initState = {
      addProductModalVisible: false,
      editProductModalVisible: false,
      showProduct: false,
      editProductData: {},
    }
    this.state = {
      hasProject: false,
      ...this.initState,
      nextDisabled: false,
    }
    this.id = 0
  }

  componentDidMount () {
    const {
      setter, queryOrderDetail, match, queryUserList,
    } = this.props
    setter({
      detailInfo: {},
    })
    queryOrderDetail({
      applyId: match.params.orderId,
    }).then((res) => {
      let allIdList = []
      // 记录全部的资源id，用于区分哪些资源是新增，哪些是原有的

      // workDatas允许添加按钮
      const hasWorkDatas = false
      if (res) {
        allIdList = res.resourceItems.map((item) => item.resourceInfo[PRODUCT_FIELDS.UNIT_ID])
        // 关闭dataworks批量申请
        // hasWorkDatas = res.resourceItems.some(item => item.resourceType === 'DataWorks');
      }
      this.setState({
        allIdList,
        isPro: (res && !!res.projectDetail) || hasWorkDatas,
      })
    })
    queryUserList()
  }

  getDiffData = (previewData) => {
    const { orgType } = this.props
    if (orgType === 2) {
      const hasPub = previewData.some((item) => item.resourceInfo.regionId === 1)
      const hasPei = previewData.some((item) => item.resourceInfo.regionId === 2)
      const hasInd = previewData.some((item) => item.resourceInfo.regionId === 3)
      if ((hasPub || hasPei) && hasInd) {
        this.setState({ nextDisabled: true })
      } else {
        this.setState({ nextDisabled: false })
      }
    }
  };

  // 返回上一步
  onBack = () => {
    const { history } = this.props
    history.goBack()
  };

  // 提交变更
  onSubmit = async () => {
    const {
      userInfo, detailInfo, form, match, submitApply, recoveryList, sfTime,
    } = this.props
    const { allIdList } = this.state
    const { orderId } = match.params
    const [ err, values ] = await validateAndScroll(form)
    if (err) return false
    const { projectDetail } = detailInfo
    const resourceItems = _.cloneDeep(detailInfo.resourceItems)
    // console.log('resourceItems', resourceItems);
    if (_.isEmpty(resourceItems)) {
      return message.error('请添加资源')
    }
    const infoData = {}
    let resSfTime
    resourceItems.forEach((item) => {
      const { resourceInfo, resourceType } = item
      if (resourceInfo.ifTempRes && resourceInfo.releaseDate) {
        resSfTime = resourceInfo.releaseDate
      }
      const hasId = allIdList.indexOf(item.resourceInfo[PRODUCT_FIELDS.UNIT_ID]) > -1
      if (!hasId) {
        item.resourceInfo[PRODUCT_FIELDS.UNIT_ID] = ''
      }
      if (resourceType === 'WAF') {
        if (resourceInfo[PRODUCT_FIELDS.APPLY_TYPE] === 'form') {
          if (!resourceInfo[PRODUCT_FIELDS.WAF_DETAIL_LIST]) {
            const wafinfo = Object.values(resourceInfo[PRODUCT_FIELDS.WAF_FORM_FILE])[0]
            resourceInfo[PRODUCT_FIELDS.WAF_FILE_NAME] = wafinfo.fileName
            resourceInfo[PRODUCT_FIELDS.WAF_OSSURL] = wafinfo.ossUrl
            delete resourceInfo[PRODUCT_FIELDS.WAF_FORM_FILE]
          }
        } else {
          const detailList = resourceInfo[PRODUCT_FIELDS.WAF_DETAIL_LIST]
          detailList.map((k) => {
            if (typeof k[PRODUCT_FIELDS.EXTERNAL_AGREEMENTS] === 'string') {
              return k
            }
            k[PRODUCT_FIELDS.EXTERNAL_AGREEMENTS] = k[PRODUCT_FIELDS.EXTERNAL_AGREEMENTS].join(
              ',',
            )
            return k
          })
        }
        delete resourceInfo.specList
      }
      if (resourceType === 'DisasterRecovery') {
        if (resourceInfo.resourceDetailList.length === 0) {
          return false
        }
        resourceInfo.resourceDetailList = resourceInfo.resourceDetailList.length > 0 &&
          resourceInfo.resourceDetailList.map((items) => ({
            targetInstanceId: items.targetInstanceId,
            targetProductCode: items.productCode,
          }))
      }
      if (resourceType === 'BackUp') {
        resourceInfo.resourceDetailList = Object.values(recoveryList).map((resourceItem) => {
          resourceItem.preferredBackupPeriod = Array.isArray(resourceItem.preferredBackupPeriod)
            ? resourceItem.preferredBackupPeriod.join()
            : resourceItem.preferredBackupPeriod
          return resourceItem
        })
      }
      if (resourceType === 'ACS') {
        //  resourceInfo[PRODUCT_FIELDS.MAINFRAMENUM] = hostNum;
      }
      if (resourceType === 'SkyNet') {
        resourceInfo[PRODUCT_FIELDS.SKYNET_PROJECT_NAME] = resourceInfo.name || ''
        resourceInfo[PRODUCT_FIELDS.SKYNET_PROJECT_ID] = resourceInfo.projectId || ''
        delete resourceInfo[PRODUCT_FIELDS.PROJECT_ID]
      }


      const isResourceType = resourceType === 'HSM' ? 'HsmList' : `${resourceType}List`
      const type = SUBMIT_FIELD[resourceType] ? isResourceType : 'otherList'
      infoData[type] = infoData[type] ? infoData[type].concat(resourceInfo) : [ resourceInfo ]
    })
    // console.log('infoData', infoData);
    const params = {
      resourceUsers: getUserList(values),
      // values.resourceUsers && values.resourceUsers.filter(item => item.userName),
      commonInfo: {
        deptId: projectDetail ? projectDetail.deptId : userInfo.deptId,
        [PRODUCT_FIELDS.PROJECT_ID]: values[PRODUCT_FIELDS.PROJECT_ID],
        deptName: userInfo.deptName,
        applyId: orderId,
      },
      [PRODUCT_FIELDS.ATTACHMENT]: values[PRODUCT_FIELDS.ATTACHMENT], // 附件
      ...infoData,
      delResources: detailInfo.delResources || [],
    }

    // 对内嵌的MaxComputeList进行过滤
    if (params.MaxComputeList) {
      // const { DataWorksList, MaxComputeList } = params;
      // const innerMaxComputeIds = [];
      // DataWorksList.forEach(item1 => {
      //   item1.maxComputeList.forEach(item2 => {
      //     if (item2.id) {
      //       innerMaxComputeIds.push(item2.id);
      //     }
      //   });
      // });

      // const newMaxComputeList = MaxComputeList.filter(item => !item.ocDataworksInstanceId);
      params.MaxComputeList = params.MaxComputeList.filter((item) => !item.ocDataworksInstanceId)
    }
    resSfTime ? params.releaseDate = resSfTime : null
    submitApply(params).then(() => {
      message.success('修改成功')
      router.push('/manage/operation-center/operation-order/list')
    })
  };

  // 删除资源
  onDelete = (dataItem) => {
    const { setter, detailInfo } = this.props
    const { resourceInfo: { id } } = dataItem
    const removeItems = []
    const unitKey = dataItem.resourceInfo[PRODUCT_FIELDS.UNIT_ID]
    // 获取当前数据，去除了已经删除的数据
    const filterList = detailInfo.resourceItems.filter((item) => {
      // 挂在于DataWorks
      if (item.resourceType === 'MaxCompute' && item.resourceInfo.ocDataworksInstanceId === String(id)) {
        removeItems.push(item)
        return false
      }
      if (item.resourceInfo[PRODUCT_FIELDS.UNIT_ID] === unitKey) {
        removeItems.push(item)
        return false
      }
      return true
    })

    // 删除的资源数据
    const idData = removeItems.map((item) => ({
      generalIds: item.resourceInfo.generalId,
      resourceType: item.resourceType,
    }))
    detailInfo.delResources = detailInfo.delResources
      ? detailInfo.delResources.concat(idData)
      : idData
    setter({
      detailInfo: {
        ...detailInfo,
        resourceItems: filterList,
      },
    })
    this.getDiffData(filterList)
  };

  onEdit = (dataItem) => {
    this.setState({
      editProductModalVisible: true,
      editProductData: dataItem,
    }, () => {
      this.props.updateProductEditDetail(dataItem)
    })
  };

  editSubmit = (editId) => {
    this.onModalOk(editId)
  };

  // 新增资源
  onAddRes = () => {
    const { productLoading, detailInfo } = this.props
    let hasProject
    if (!_.isEmpty(detailInfo.projectDetail)) {
      hasProject = true
    } else {
      hasProject = false
      // if (detailInfo.resourceItems.length >= 1) {
      //   message.warn('未关联项目的产品最多只能添加1项');
      //   return;
      // }
    }

    if (!productLoading) {
      this.setState({
        addProductModalVisible: true,
        hasProject,
      })
    }
  };

  // 选择产品
  onChange = (item) => {
    this.setState({
      showProduct: true,
      productMsg: item,
    })
  };

  // 浮层中的取消
  onMoalCancel = () => {
    this.setState({
      ...this.initState,
    })
  };

  // 浮层中的确定
  // 如果是修改，则editId为对应的id值，新增则不存在
  onModalOk = async (editId) => {
    const {
      productForm, setter, detailInfo, resourceData, recoveryList, isStandard, updataOSSRecovData, form, sfTime, resourceSetter,
    } = this.props
    const { productMsg, editProductData } = this.state
    const [ err, formValues ] = await validateAndScroll(productForm)
    if (err) return false
    const type = !editId ? productMsg.productTypeEnum : editProductData.resourceType
    let values = _.cloneDeep(formValues)
    values = submitDataTransform(values, type, resourceData)
    // console.log('values', values);
    if (Array.isArray(SUBMIT_FIELD[type])) {
      //  values.specList = specTransform(SUBMIT_FIELD[type], resourceData, values);
      if (type === 'SLB' && values[PRODUCT_FIELDS.NETWORK_TYPE_NAME] === '专有网络') {
        delete values.specList
      }
      if (type === 'DisasterRecovery') {
        const { resourceDetailList } = values
        values.resourceDetailList = resourceDetailList && resourceDetailList.length > 0
          ? resourceDetailList.map((item) => item.allData)
          : []
      }
      if (type === 'BackUp') {
        // resourceDetailList.submit= resourceDetailList;
        const { resourceDetailList, backupOpenList } = values
        if (backupOpenList) {
          delete values.backupOpenList
        }
        Object.values(recoveryList).map((item) => {
          item.preferredBackupPeriod = Array.isArray(item.preferredBackupPeriod)
            ? item.preferredBackupPeriod.join(',')
            : item.preferredBackupPeriod
          const { otherData } = item
          item.areaName = otherData.areaName
          item.cloudInstanceId = otherData.cloudInstanceId
          item.cloudInstanceName = otherData.cloudInstanceName
          item.createdDate = otherData.createdDate
          item.cpuMemory = otherData.cpuMemory
          item.storage = otherData.storage
          item.projectName = otherData.projectName
          item.regionName = otherData.regionName
          item.productCode = otherData.productCode
          delete item.otherData
        })
        values.resourceDetailList = resourceDetailList ? Object.values(recoveryList) : []
        delete values.specList
      }
      if (type === 'DataSmart' && isStandard) {
        values.quantity = Number(1)
      }
      if (type === 'SkyNet') {
        values[PRODUCT_FIELDS.SKYNET_PROJECT_NAME] = values.name || ''
        values[PRODUCT_FIELDS.SKYNET_PROJECT_ID] = values.projectId || ''
      }

      if (type === 'AntiDDoS') {
        const list = values[PRODUCT_FIELDS.ANTIDDOS_DEFEND_URL]
        values[PRODUCT_FIELDS.ANTIDDOS_DEFEND_URLSTR] = list.filter((k) => k && k.length).join(';')
      }
      if (type === 'OSS' || type === 'BackUp') {
        updataOSSRecovData && updataOSSRecovData()
      }
      if (type === 'DNS') {
        const lanDomainName = values[PRODUCT_FIELDS.LAN_DOMAIN_NAME]
        values[PRODUCT_FIELDS.LAN_DOMAIN_NAME] = lanDomainName.filter((s) => s && s.trim())
      }
      values.specList = specTransform(SUBMIT_FIELD[type], resourceData, values, type)
    }
    // 变更实例的时候，只需要保留原有数据中的id
    let filterList
    if (!editId) {
      values[PRODUCT_FIELDS.UNIT_ID] = ++this.id
      filterList = detailInfo.resourceItems.concat({
        resourceInfo: {
          ...values,
          productGroupId: productMsg.productGroupId,
          resourceName: productMsg.name,
          resourceType: productMsg.productTypeEnum,
          resourceUsers: getUserList(values),
        },
        resourceName: productMsg.name,
        resourceType: productMsg.productTypeEnum,
      })
    } else {
      const index = detailInfo.resourceItems.findIndex((o) => o.resourceInfo.id === editId)
      const data = detailInfo.resourceItems[index]
      const { resourceInfo, resourceName, resourceType } = data
      data.resourceInfo = {
        ...values,
        id: editId,
        productGroupId: resourceInfo.productGroupId,
        resourceName,
        resourceType,
        resourceUsers: getUserList(values),
      }
      filterList = detailInfo.resourceItems
    }

    // const { resourceType } = editProductData;

    // DataWorks 进行数据转化
    // if (resourceType === 'DataWorks') {
    filterList.forEach((item) => {
      const {
        pattern, standardForDev, standardForProd, simpleForNormal,
      } = item.resourceInfo
      if (pattern === '标准模式' && standardForDev) {
        const [ devName, devId ] = standardForDev.name.split('#*#')
        item.resourceInfo.devName = devName
        item.resourceInfo.devId = devId
        item.resourceInfo.devIdentity = standardForDev.identity
        const [ prodName, prodId ] = standardForProd.name.split('#*#')
        item.resourceInfo.prdName = prodName
        item.resourceInfo.prdId = prodId
        item.resourceInfo.prdIdentity = standardForProd.identity
        item.resourceInfo.maxComputeList = []

        // 是新建的ODPS项目
        if ('capacity' in standardForDev) {
          item.resourceInfo.maxComputeList.push({
            id: standardForDev.id,
            capacity: standardForDev.capacity,
            cuCount: standardForDev.cuCount,
            instanceName: standardForDev.instanceName,
            projectId: standardForDev.projectId,
            mcFlag: 'dev',
            resourceUsers: (standardForDev.presetIdsDetail || []).concat(standardForDev.customValues || []).filter((val) => val != null),
          })
        }
        if ('capacity' in standardForProd) {
          item.resourceInfo.maxComputeList.push({
            id: standardForProd.id,
            capacity: standardForProd.capacity,
            cuCount: standardForProd.cuCount,
            instanceName: standardForProd.instanceName,
            projectId: standardForProd.projectId,
            mcFlag: 'prd',
            resourceUsers: (standardForProd.presetIdsDetail || []).concat(standardForProd.customValues || []).filter((val) => val != null),
          })
        }

        delete item.resourceInfo.standardForDev
        delete item.resourceInfo.standardForProd
      }

      if (pattern === '简单模式' && simpleForNormal) {
        const [ devName, devId ] = simpleForNormal.name.split('#*#')
        item.resourceInfo.simpleMcName = devName
        item.resourceInfo.simpleMcId = devId
        item.resourceInfo.simpleMcIdentity = simpleForNormal.identity
        item.resourceInfo.maxComputeList = []

        // 是新建的ODPS项目
        if ('capacity' in simpleForNormal) {
          item.resourceInfo.maxComputeList.push({
            id: simpleForNormal.id,
            capacity: simpleForNormal.capacity,
            cuCount: simpleForNormal.cuCount,
            instanceName: simpleForNormal.instanceName,
            projectId: simpleForNormal.projectId,
            mcFlag: 'simple',
            resourceUsers: (simpleForNormal.presetIdsDetail || []).concat(simpleForNormal.customValues || []).filter((val) => val != null),
          })
        }

        delete item.resourceInfo.simpleForNormal
      }
    })
    // }
    const t = values.ifTempRes && (values.releaseDate !== sfTime) ? values.releaseDate : sfTime
    resourceSetter({ sfTime: t })
    filterList.forEach((item) => {
      if (item.resourceInfo.ifTempRes) {
        item.resourceInfo.releaseDate = t
      }
    })

    // 清除资源使用人表单值
    productForm.setFieldsValue({
      resourceUserIds: undefined,
      resourceKeys: undefined,
    })
    setter({
      detailInfo: {
        ...detailInfo,
        resourceItems: filterList.slice(),
      },
    })
    this.getDiffData(filterList)
    this.onMoalCancel()
  };

  // 渲染浮层中的内容
  addProductModal = () => {
    const {
      addProductModalVisible,
      showProduct,
      productMsg,
      productLoading,
      hasProject,
    } = this.state
    if (!addProductModalVisible || productLoading) {
      return null
    }
    return Modals({
      key: 'product',
      width: productMsg && productMsg.productTypeEnum === 'DataWorks' ? 1200 : 1050,
      style: { overflow: 'hidden', overflowX: 'auto' },
      title: showProduct ? productMsg.name : '选择产品',
      content: (
        <div style={{ overflow: 'auto', height: '700px' }}>
          {showProduct ? (
            <Product productType={productMsg.productTypeEnum} batch hasProject={hasProject} useFor="batch-create" />
          ) : (
            <ProductList onChangeProduct={this.onChange} hasProject={hasProject} batch />
          )}
        </div>
      ),
      visible: addProductModalVisible,
      footer: showProduct && [
        <Button onClick={this.onMoalCancel}>取消</Button>,
        <Button type="primary" onClick={() => this.onModalOk()}>
          确定
        </Button>,
      ],
      onCancel: this.onMoalCancel,
    })
  };

  render () {
    const {
      detailInfo, loading, form, match, resourceUserList, submitLoading,
    } = this.props
    const {
      isPro, editProductData, editProductModalVisible, nextDisabled,
    } = this.state
    const { projectDetail, resourceUsers = {}, resourceItems = [] } = detailInfo
    const formPropsBase = {
      form,
      formItemLayout: {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 20,
        },
      },
      resourceUsers,
    }
    // console.log('detailInfo', detailInfo);
    const projectId = detailInfo.projectDetail && detailInfo.projectDetail.projectId
    const hasSkyNetType = resourceItems.find((item) => item.resourceType === 'SkyNet')
    const { orderId } = match.params
    return (
      <PageHeaderWrapper title={`单号：${orderId}`} breadcrumbList={[ RES_LIST_MAP ]}>
        {JSON.stringify(detailInfo) === '{}' ? (
          <PageLoading />
        ) : (
          <>
            <Spin spinning={loading}>
              <Card>
                {isPro && projectId && !hasSkyNetType && (<LeftTitle title="项目信息" noDivider />)}
                <div className={`${styles.resWarp} product-form`}>
                  <BaseInfo {...formPropsBase} useFor="batch-project-info-update" noProject={!isPro} />
                </div>
              </Card>
              {/* {
                resourceUsers && resourceUsers.length > 0
                && resourceUserList
                && resourceUserList.length > 0 && (
                  <Card style={{ marginTop: 30 }}>
                    <LeftTitle title="资源使用人" noDivider />
                    <div className={styles.resWarp}>
                      <ResourceUsers
                        {...formPropsBase}
                        initialValue={detailInfo.resourceUsers || []}
                        userList={resourceUserList}
                      />
                    </div>
                  </Card>
                )} */}
              {(
                <Card style={{ marginTop: 30 }}>
                  <LeftTitle title={FIELD_MAP[PRODUCT_FIELDS.ATTACHMENT]} noDivider />
                  <div className={styles.resWarp}>
                    <Upload
                      initialValue={detailInfo[PRODUCT_FIELDS.ATTACHMENT]}
                      formProps={formPropsBase}
                    />
                  </div>
                </Card>
              )}
              <Card style={{ marginTop: 30 }}>
                <LeftTitle title="资源清单" noDivider>
                  <StackPanel.RightAlice>
                    {isPro && (<Button type="primary" onClick={this.onAddRes}>新增</Button>)}
                  </StackPanel.RightAlice>
                </LeftTitle>
                <ResourceInfo
                  data={detailInfo.resourceItems}
                  projectDetailName={projectDetail && projectDetail.name}
                  onDelete={this.onDelete}
                  onEdit={this.onEdit}
                  isPro={isPro}
                />
              </Card>
            </Spin>
            <FooterComfire>
              <StackPanel>
                {nextDisabled && (
                  <div className={styles.alert}>
                    <div className={styles.allow}>
                      <span />
                    </div>
                    <Alert
                      message="由于审批人不同，“行业云区”资源无法与其他区域资源同时申请，请分开申请。"
                      type="error"
                      showIcon
                    />
                  </div>
                )}
                <StackPanel.RightAlice>
                  <Button onClick={this.onBack}>取消</Button>
                  <Button
                    loading={submitLoading}
                    disabled={nextDisabled}
                    onClick={this.onSubmit}
                    type="primary"
                  >
                    提交变更
                  </Button>
                </StackPanel.RightAlice>
              </StackPanel>
            </FooterComfire>
          </>
        )}

        {this.addProductModal()}
        <EditProductModal
          visible={editProductModalVisible}
          initData={editProductData}
          onCancel={this.onMoalCancel}
          onOk={this.editSubmit}
          batch
          dataWorksIsSingle={!projectId}
        />
      </PageHeaderWrapper>
    )
  }
}

export default UpdateDetail
