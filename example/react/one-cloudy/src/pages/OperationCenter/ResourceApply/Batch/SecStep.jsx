/**
 * 批量申请 - 第二步 - 选择资源规格
 */
import React from 'react'
import { connect } from 'dva'
import { router } from 'umi'
import _ from 'lodash'
import moment from 'moment'
import { Button, message, Alert } from 'antd'
import cx from 'classnames'
import StackPanel from '@/components/Common/StackPanel'
import FooterComfire from '@/components/Common/FooterComfire'
import Modals from '@/components/Common/Modals'
import Product from '@/components/OperationCenter/Product'
import ResourceInfo from '@/components/OperationCenter/ResourceInfo'
import ProductList from '../ProductList'
import {
  PRODUCT_FIELDS,
  specTransform,
  SUBMIT_FIELD,
  submitDataTransform,
} from '../constant'
import styles from './index.less'

const mapDispatchToProps = (dispatch) => ({
  pushSelectedProductList: (payload) => dispatch({
    type: 'resourceApply/setter',
    payload,
  }),
})
@connect(
  ({ global, resourceApply, user }) => ({
    collapsed: global.collapsed,
    form: resourceApply.form,
    selectedProjectInfo: resourceApply.selectedProjectInfo,
    selectedProductList: resourceApply.selectedProductList,
    previewData: resourceApply.previewData,
    sfTime: resourceApply.sfTime,
    resourceData: resourceApply.resourceData,
    orgType: user.userInfo.orgType,
  }),
  mapDispatchToProps,
)
class SecStep extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      visibleModal: false,
      productMsg: undefined,
      nextDisabled: false,
    }
    this.id = 0 // 用于生成已选产品的唯一标志
  }

  componentDidMount () {
    const { previewData } = this.props
    this.getDiffData(previewData)
  }

  getDiffData = (previewData) => {
    const { orgType } = this.props
    if (orgType === 2) {
      const hasPub = previewData.some((item) => item.regionId === 1)
      const hasPei = previewData.some((item) => item.regionId === 2)
      const hasInd = previewData.some((item) => item.regionId === 3)
      if ((hasPub || hasPei) && hasInd) {
        this.setState({ nextDisabled: true })
      } else {
        this.setState({ nextDisabled: false })
      }
    }
  };

  // 显示已经添加的资源
  onShowDrawer = () => {
    this.setState({
      visible: true,
    })
  };

  // 关闭已经添加的资源
  onCloseDrawer = () => {
    this.setState({
      visible: false,
    })
  };

  // 上一步
  onPrev = () => {
    router.push('/manage/operation-center/resource-apply/batch/fristStep')
  };

  // 下一步
  onNext = () => {
    const { onNextStep, selectedProductList } = this.props
    const valueList = Object.values(selectedProductList)
    if (valueList.length === 0 || valueList.filter((o) => JSON.stringify(o) !== '[]').length === 0) {
      return message.error('请添加产品')
    }
    onNextStep()
  };

  // 选择产品
  onChangeProduct = (item) => {
    this.setState({
      visibleModal: true,
      productMsg: item,
    })
  };

  renderModal = () => {
    const { visibleModal, productMsg } = this.state
    if (!visibleModal) {
      return null
    }
    return Modals({
      width: productMsg.productTypeEnum === 'DataWorks' ? 1200 : 1000,
      title: productMsg.name,
      maskClosable: false,
      bodyStyle: { overflow: 'hidden', overflowX: 'auto' },
      content: <Product productType={productMsg.productTypeEnum} batch useFor="batch-create" />,
      visible: visibleModal,
      onCancel: () => {
        this.setState({
          visibleModal: false,
        })
      },
      onOk: () => {
        this.onSubmit(() => {
          this.setState(
            {
              visibleModal: false,
            },
            this.productAnimate,
          )
        })
      },
    })
  };

  // 添加产品后的动画
  productAnimate = () => {
    const time = 0.5 // 动画时间
    const startDom = document.getElementById('animateStart')
    startDom.style.display = 'block'
    const endDom = document.getElementById('animateEnd')
    const startTop = startDom.getBoundingClientRect().top
    const startLeft = startDom.getBoundingClientRect().left
    const startWidth = startDom.clientWidth
    const startHeight = startDom.clientHeight
    const endWidth = endDom.clientWidth
    const endHeight = endDom.clientHeight
    const endTop = endDom.getBoundingClientRect().top
    const endLeft = endDom.getBoundingClientRect().left
    startDom.style.transition = `
      transform ${time}s cubic-bezier(0.66, -0.29, 1, 1),
      left ${time}s linear,
      top ${time}s cubic-bezier(0.44, -0.53, 1, 1)
    `
    startDom.style.left = `${endLeft - startLeft - startWidth / 2 + endWidth / 2}px`
    startDom.style.top = `${endTop - startTop - startHeight / 2 + endHeight / 2}px`
    startDom.style.transform = 'scale(0,0)'
    setTimeout(() => {
      startDom.style.display = 'none'
      startDom.style.left = ''
      startDom.style.top = ''
      startDom.style.transform = ''
    }, time * 1000)
  };

  onSubmit = (callBack) => {
    const { productMsg } = this.state
    const {
      form, pushSelectedProductList, selectedProductList, resourceData,
      sfTime,
    } = this.props
    const { productTypeEnum: type } = productMsg
    // form通过Product创建，并通过redux传到当前组件，以用于提交验证
    form.validateFieldsAndScroll((errors, formValues) => {
      if (!errors) {
        let values = _.cloneDeep(formValues)
        values = submitDataTransform(values, type, resourceData)
        // const specRemark = values[PRODUCT_FIELDS.SPEC_REMARK];
        // values[PRODUCT_FIELDS.SPEC_REMARK] = specRemark || ''; // 配置规格
        values = {
          ...values,
          productGroupId: productMsg.productGroupId,
          resourceName: productMsg.name,
          resourceType: productMsg.productTypeEnum,
          // specRemark: specRemark || '',
        }
        values[PRODUCT_FIELDS.UNIT_ID] = ++this.id
        if (Array.isArray(SUBMIT_FIELD[type])) {
          values.specList = specTransform(SUBMIT_FIELD[type], resourceData, values, type)
          selectedProductList[`${type}List`] = selectedProductList[`${type}List`]
            ? selectedProductList[`${type}List`].concat(values)
            : [ values ]
        } else {
          selectedProductList.otherList = selectedProductList.otherList
            ? selectedProductList.otherList.concat(values)
            : [ values ]
        }

        // 转化DataWorks
        if (selectedProductList.DataWorksList) {
          const { DataWorksList } = selectedProductList
          DataWorksList.forEach((item) => {
            const {
              pattern, standardForDev, standardForProd, simpleForNormal,
            } = item
            if (pattern === '标准模式' && standardForDev) {
              const [ devName, devId ] = standardForDev.name.split('#*#')
              item.devName = devName
              item.devId = devId
              item.devIdentity = standardForDev.identity
              const [ prodName, prodId ] = standardForProd.name.split('#*#')
              item.prdName = prodName
              item.prdId = prodId
              item.prdIdentity = standardForProd.identity
              item.maxComputeList = []

              // 是新建的ODPS项目
              if ('capacity' in standardForDev) {
                item.maxComputeList.push({
                  id: standardForDev.id,
                  capacity: standardForDev.capacity,
                  cuCount: standardForDev.cuCount,
                  instanceName: standardForDev.instanceName,
                  projectId: standardForDev.projectId,
                  mcFlag: 'dev',
                  resourceUsers: (standardForDev.presetIdsDetail || [])
                    .concat(standardForDev.customValues || [])
                    .filter((val) => val != null),
                })
              }
              if ('capacity' in standardForProd) {
                item.maxComputeList.push({
                  id: standardForProd.id,
                  capacity: standardForProd.capacity,
                  cuCount: standardForProd.cuCount,
                  instanceName: standardForProd.instanceName,
                  projectId: standardForProd.projectId,
                  mcFlag: 'prd',
                  resourceUsers: (standardForProd.presetIdsDetail || [])
                    .concat(standardForProd.customValues || [])
                    .filter((val) => val != null),
                })
              }

              delete item.standardForDev
              delete item.standardForProd
            }

            if (pattern === '简单模式' && simpleForNormal) {
              const [ devName, devId ] = simpleForNormal.name.split('#*#')
              item.simpleMcName = devName
              item.simpleMcId = devId
              item.simpleMcIdentity = simpleForNormal.identity
              item.maxComputeList = []

              // 是新建的ODPS项目
              if ('capacity' in simpleForNormal) {
                item.maxComputeList.push({
                  id: simpleForNormal.id,
                  capacity: simpleForNormal.capacity,
                  cuCount: simpleForNormal.cuCount,
                  instanceName: simpleForNormal.instanceName,
                  projectId: simpleForNormal.projectId,
                  mcFlag: 'simple',
                  resourceUsers: (simpleForNormal.presetIdsDetail || []).concat(simpleForNormal.customValues || []).filter((val) => val != null),
                })
              }

              delete item.simpleForNormal
            }
          })
        }
        if (selectedProductList.DNSList && values[PRODUCT_FIELDS.LAN_DOMAIN_NAME] && values[PRODUCT_FIELDS.LAN_DOMAIN_NAME].length > 0) {
          const lanDomainName = values[PRODUCT_FIELDS.LAN_DOMAIN_NAME]
          values[PRODUCT_FIELDS.LAN_DOMAIN_NAME] = lanDomainName.filter((s) => s && s.trim())
        }
        // selectedProductList[type + 'List'].push(values);
        const t = values.ifTempRes && (values.releaseDate !== sfTime) ? values.releaseDate : sfTime
        const previewData = this.transformProduct(values)
        pushSelectedProductList({ selectedProductList, previewData, sfTime: t })
        this.getDiffData(previewData)
        callBack()
      }
    })
  };

  // 将申请的数据进行转换用于信息确认
  transformProduct = (product) => {
    const { previewData = [] } = this.props
    const { productMsg } = this.state
    previewData.forEach((item) => {
      if (item.resourceInfo && item.resourceInfo.ifTempRes) {
        item.resourceInfo.releaseDate = product.releaseDate
      }
    })
    previewData.push({
      resourceType: productMsg.productTypeEnum,
      resourceName: productMsg.name,
      resourceInfo: product,
    })
    return previewData
  };

  // 删除一项已选的产品
  onDelete = (dataItem) => {
    const unitKey = dataItem.resourceInfo[PRODUCT_FIELDS.UNIT_ID]
    const { previewData, pushSelectedProductList, selectedProductList } = this.props
    const previewDataIndex = previewData.findIndex(
      (item) => item.resourceInfo[PRODUCT_FIELDS.UNIT_ID] === unitKey,
    )
    previewData.splice(previewDataIndex, 1)
    const matchProduct = selectedProductList[
      SUBMIT_FIELD[dataItem.resourceType] ? `${dataItem.resourceType}List` : 'otherList'
    ]
    const matchProductIndex = matchProduct.findIndex(
      (item) => item[PRODUCT_FIELDS.UNIT_ID] === unitKey,
    )
    matchProduct.splice(matchProductIndex, 1)
    pushSelectedProductList({ selectedProductList, previewData })
    this.getDiffData(previewData)
    this.setState({
      visibleModal: false,
    })
  };

  render () {
    const { visible, nextDisabled } = this.state
    const { onPrevStep, previewData } = this.props
    const len = previewData.length
    return (
      <div className={styles.secStep}>
        <ProductList onChangeProduct={this.onChangeProduct} batch />
        <FooterComfire>
          <StackPanel>
            <Button
              id="animateEnd"
              className={!len ? styles.noNum : styles.hasNum}
              disabled={!len}
              onClick={this.onShowDrawer}
            >
              已选择
              <span className={styles.selectNum}>{len}</span>
            </Button>
            {visible && <Button onClick={this.onCloseDrawer}>收起</Button>}
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
              <Button onClick={onPrevStep}>上一步</Button>
              <Button disabled={nextDisabled} onClick={this.onNext} type="primary">
                下一步
              </Button>
            </StackPanel.RightAlice>
          </StackPanel>
        </FooterComfire>
        <div className={cx(!visible ? styles.hide : styles.open, styles.drawer)}>
          <div className={cx(styles.drawerContainer)}>
            <div className={styles.mask} />
            <div className={styles.wrapper}>
              <div className={styles.content}>
                <ResourceInfo
                  data={JSON.parse(JSON.stringify(previewData))}
                  onDelete={this.onDelete}
                  isPro
                />
              </div>
            </div>
          </div>
        </div>
        {this.renderModal()}
      </div>
    )
  }
}

export default SecStep
