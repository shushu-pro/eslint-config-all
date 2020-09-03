import React from 'react'
import { connect } from 'dva'
import { router } from 'umi'
import _ from 'lodash'
import { Card, Button } from 'antd'
// import { submitApply } from '@/services/OperationCenter/resourceApply';
import StackPanel from '@/components/Common/StackPanel'
import FooterComfire from '@/components/Common/FooterComfire'
import ProductInfo from '@/components/OperationCenter/Product'
import SmsAuthenModal from '@/components/SmsAuthen'
import DescriptionModal from '@/components/descriptionModal'
import {
  PRODUCT_FIELDS,
  getUserList,
  SUBMIT_FIELD,
  specTransform,
  PRODUCT_TYPE,
  submitDataTransform,
  singleApplySubmitDataTransform,
} from '../constant'
import styles from './index.less'

const mapDispatchToProps = (dispatch) => ({
  resetProduct: () => dispatch({
    type: 'resourceApply/resetProduct',
  }),
  queryProductSpec: (params) => dispatch({
    type: 'resourceApply/queryProductSpec',
    payload: {
      ...params,
    },
  }),
  queryProductCategory: () => dispatch({
    type: 'resourceApply/queryProductCategory',
  }),
  submitApply: (params) => dispatch({
    type: 'resourceApply/submitApply',
    payload: {
      ...params,
    },
  }),
})
@connect(
  ({ resourceApply, pageData }) => ({
    form: resourceApply.form,
    productList: resourceApply.productList,
    resourceData: resourceApply.resourceData,
    recoveryList: resourceApply.recoveryList,
    isRead: resourceApply.isRead,
    hostNum: resourceApply.hostNum,
    isStandard: pageData.isStandard,
  }),
  mapDispatchToProps,
)
class Product extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      sending: false,
    }
  }

  componentDidMount () {
    const { productList, queryProductCategory } = this.props
    if (productList && productList.length) {
      return
    }
    queryProductCategory()
  }

  // 上一步
  onPrev = () => {
    router.push('/manage/operation-center/resource-apply/single')
  };

  // 提交
  onNext = () => {
    const {
      match,
      form,
      resetProduct,
      productList,
      history,
      submitApply,
      resourceData,
      recoveryList,
      isStandard,
      // hostNum,
    } = this.props
    const { type, productName } = match.params
    // form通过Product创建，并通过redux传到当前组件，以用于提交验证
    form.validateFieldsAndScroll((errors, formValues) => {
      if (!errors) {
        this.setState({
          sending: true,
        })
        let values = _.cloneDeep(formValues)
        values = submitDataTransform(values, type, resourceData)
        // 对资源使用人和数据盘进行筛选，剔除undefinedWWWW
        const userList = getUserList(values)
        const eipFlag = values[PRODUCT_FIELDS.EIP_FLAG]
        values[PRODUCT_FIELDS.EIP_FLAG] = eipFlag ? 1 : 0
        const backupFlag = values[PRODUCT_FIELDS.BACKUP_FLAG]
        values[PRODUCT_FIELDS.BACKUP_FLAG] = backupFlag ? 1 : 0
        const specRemark = values[PRODUCT_FIELDS.SPEC_REMARK]
        values[PRODUCT_FIELDS.SPEC_REMARK] = specRemark || '' // 配置规格

        // 从产品列表中获取出提交产品的id
        values = singleApplySubmitDataTransform(values, type, productList, productName)
        const sendData = {
          [PRODUCT_FIELDS.RESOURCE_USER]: userList, // 资源使用人
          [PRODUCT_FIELDS.COMMON_INFO]: {
            [PRODUCT_FIELDS.DEPARTMENT_ID]: values[PRODUCT_FIELDS.DEPARTMENT_ID], // 部门
            [PRODUCT_FIELDS.PROJECT_ID]: values[PRODUCT_FIELDS.PROJECT_ID], // 项目id
          },
          [PRODUCT_FIELDS.ATTACHMENT]: values[PRODUCT_FIELDS.ATTACHMENT], // 附件
        }
        if (Array.isArray(SUBMIT_FIELD[type])) {
          values.specList = specTransform(SUBMIT_FIELD[type], resourceData, values, type)
          console.log('values.', values)
          if (type === PRODUCT_TYPE.WAF) {
            if (values[PRODUCT_FIELDS.APPLY_TYPE] === 'form') {
              const wafinfo = values[PRODUCT_FIELDS.WAF_FORM_FILE][0]
              values[PRODUCT_FIELDS.WAF_FILE_NAME] = wafinfo.fileName
              values[PRODUCT_FIELDS.WAF_OSSURL] = wafinfo.ossUrl
              delete values[PRODUCT_FIELDS.WAF_FORM_FILE]
            } else {
              const detailList = values[PRODUCT_FIELDS.WAF_DETAIL_LIST]
              detailList.map((item) => {
                item[PRODUCT_FIELDS.EXTERNAL_AGREEMENTS] = item[
                  PRODUCT_FIELDS.EXTERNAL_AGREEMENTS
                ].join(',')
                return item
              })
            }
            delete values.specList
          }
          if (type === 'DisasterRecovery') {
            const { resourceDetailList } = values
            values.resourceDetailList = resourceDetailList.length > 0 &&
              resourceDetailList.map((item) => ({
                targetInstanceId: item.allData.targetInstanceId,
                targetProductCode: item.allData.productCode,
              }))
          }
          if (type === 'BackUp') {
            const { backupOpenList } = values
            if (backupOpenList) {
              delete values.backupOpenList
            }
            Object.values(recoveryList).map((item) => {
              item.preferredBackupPeriod = Array.isArray(item.preferredBackupPeriod)
                ? item.preferredBackupPeriod.join()
                : item.preferredBackupPeriod
              delete item.otherData
            })
            values.resourceDetailList = Object.values(recoveryList)
            delete values.specList
          }
          if (type === 'ACS') {
            // values[PRODUCT_FIELDS.MAINFRAMENUM] = hostNum;
          }
          if (type === 'SkyNet') {
            values[PRODUCT_FIELDS.SKYNET_PROJECT_NAME] = values.name || ''
            values[PRODUCT_FIELDS.SKYNET_PROJECT_ID] = values.projectId || ''
            delete values[PRODUCT_FIELDS.PROJECT_ID]
          }
          sendData[`${type}List`] = [ values ] // 可以申请的产品
          if (type === 'DataSmart' && isStandard) {
            values[PRODUCT_FIELDS.DS_QUANTITY] = Number(1)
          }
          if (type === 'DNS') {
            const lanDomainName = values[PRODUCT_FIELDS.LAN_DOMAIN_NAME]
            values[PRODUCT_FIELDS.LAN_DOMAIN_NAME] = lanDomainName.filter((s) => s && s.trim())
          }
        } else {
          sendData.otherList = [ values ] // 其他产品规
        }

        // DataWorks提交数据处理
        if (type === 'DataWorks') {
          const {
            pattern, standardForDev, standardForProd, simpleForNormal,
          } = formValues
          const dataWorksList = sendData.DataWorksList
          if (pattern === '标准模式') {
            dataWorksList.forEach((item) => {
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
                    .concat(standardForDev.customValues || []).filter((val) => val != null),
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
                    .concat(standardForProd.customValues || []).filter((val) => val != null),
                })
              }

              delete item.standardForDev
              delete item.standardForProd
            })
          }

          if (pattern === '简单模式') {
            dataWorksList.forEach((item) => {
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
                  resourceUsers: (simpleForNormal.presetIdsDetail || [])
                    .concat(simpleForNormal.customValues || []).filter((val) => val != null),
                })
              }

              delete item.simpleForNormal
            })
          }
        }
        values.ifTempRes ? sendData.releaseDate = values.releaseDate : null
        submitApply({ sendData })
          .then((res) => {
            resetProduct()
            history.push({
              pathname: '/manage/operation-center/resource-apply/success',
              state: { applyId: res.applyId },
            })
          })
          .catch(() => { })
          .finally(() => {
            this.setState({
              sending: false,
            })
          })
      }
    })
  };

  onRef = (ref) => {
    this.child = ref
  };

  // 验证短信内容，提交表单
  onSubmit = () => {
    const { form } = this.props
    form.validateFieldsAndScroll((errors) => {
      if (!errors) {
        this.child.onShow()
      }
    })
  };

  render () {
    const { sending } = this.state
    const { match, isRead } = this.props
    const { productName, type } = match.params
    const smsContent = `【浙江省政务一朵云】您的验证码：$code$，有效时间为15分钟。此次申请的实例明细：${productName}1个。千万不要把验证码告诉别人哦。`
    return (
      <Card bordered={false} style={{ maxWidth: '1599px', overflowX: 'auto' }}>
        <h1 className={styles.title}>
          创建
          {' '}
          {productName}
        </h1>
        <ProductInfo productType={type} useFor="single-create" />
        <FooterComfire>
          <StackPanel>
            <StackPanel.RightAlice>
              <div className={styles.footerToolbar}>
                <DescriptionModal />
                <Button key="cancel" onClick={this.onPrev}>
                  上一步
                </Button>
                <Button type="primary" loading={sending} disabled={!isRead} onClick={this.onSubmit}>
                  提交
                </Button>
              </div>
            </StackPanel.RightAlice>
          </StackPanel>
        </FooterComfire>
        <SmsAuthenModal onRef={this.onRef} smsContent={smsContent} action={this.onNext} />
      </Card>
    )
  }
}

export default Product
