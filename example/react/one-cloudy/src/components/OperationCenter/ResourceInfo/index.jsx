/**
 * 资源列表详情 - 12款产品 + 其他
 * 用的组件：批量申请（购物车）、批量申请的确认页中资源清单、申请单详情的资源清单、 修改申请单页中的资源清单
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col, Tooltip } from 'antd'
import { TABLE_DATA } from '@/components/OperationCenter/Product/Form/SkyNet/SkyNetConstant'
import SingleDataDefault from './SingleData'
import SingleDataForBackUp from './SingleDataForBackUp'
import SingleShowNextLine from './SingleShowNextLine'
import MultipleDataDefault from './MultipleData'
import MultipleDataXDefault from './MultipleDataX'
import WAFDetailData from './WAFDetailData'
import BackUpDetailData from './BackUpDetailData'
import OSSDetailData from './OSSDetailData'
import ShowDetailNextLine from './ShowDetailNextLine'
import { PRODUCT_FIELDS as PF, PRODUCT_TYPE } from './constant'
import styles from './index.less'

const SPEC_LIST = [ PRODUCT_TYPE.ANTIBOT, PRODUCT_TYPE.DDOSIP, PRODUCT_TYPE.ANTIDDOS ]
const WAF_TABLE = {
  SkyNet: { spanCol: 6, resList: TABLE_DATA },
}
const mapStateToProps = ({ user }) => ({
  roleList: user.roleList,
})
const mapDispatchToProps = (dispatch) => ({
  updataOSSRecovData (payload) {
    return dispatch({
      type: 'pageData/updataOSSRecovData',
      payload: {
        updataOSSRecovData: payload,
      },
    })
  },
})
@connect(mapStateToProps, mapDispatchToProps)
class ResourceInfo extends Component {
  state = {
    isWAF: false,
    isDisasterRecovery: false,
    isBackUp: false,
    currentProductType: '',
    isShowNextLine: false,
    isOSS: false, // 是否展开备份设置
  };

  componentDidMount () {
    const { updataOSSRecovData } = this.props
    updataOSSRecovData(this.toggleState)
  }

  lookDetail = (type) => {
    this.setState({
      isWAF: true,
      currentProductType: type,
    })
  };

  hideDetail = () => {
    this.setState({
      isWAF: false,
    })
  };

  toggleState = () => {
    const { isBackUp, isDisasterRecovery, isOSS } = this.state
    this.setState({
      isBackUp: !isBackUp,
      isDisasterRecovery: !isDisasterRecovery,
      isOSS: !isOSS,
    })
  };

  toggleShow = () => {
    const { isShowNextLine } = this.state
    this.setState({
      isShowNextLine: !isShowNextLine,
    })
  };

  render () {
    const {
      data, onDelete, onEdit, className, isPro, roleList,
    } = this.props
    // console.log('data', data);
    const {
      isWAF,
      currentProductType,
      isBackUp,
      isDisasterRecovery,
      isShowNextLine,
      isOSS,
    } = this.state
    const hasRolePre = roleList.some((key) => key === 'assignor')
    let WafData = []
    let BackUpData = []
    let DisasterRecoveryData = []
    const layout = [ 3, 4, 3, 8, 2, 3, 2 ]
    if (!data || !Array.isArray(data)) {
      return null
    }
    const PRODUCT_LIST = {
      WAF: 'wafDetailList',
      SkyNet: 'itemList',
    }
    if (isWAF) {
      const dealData = data.filter((item) => item.resourceType === currentProductType)
      dealData && dealData.length > 0 && (WafData = dealData[0].resourceInfo[PRODUCT_LIST[currentProductType]])
    }
    if (isBackUp) {
      const dealData = data.filter((item) => item.resourceType === 'BackUp')
      dealData && dealData.length > 0 && (BackUpData = dealData[0].resourceInfo.resourceDetailList)
    }
    if (isDisasterRecovery) {
      const dealData = data.filter((item) => item.resourceType === 'DisasterRecovery')
      dealData &&
        dealData.length > 0 &&
        (DisasterRecoveryData = dealData[0].resourceInfo.resourceDetailList)
    }
    const dataSource = data.map((dataItem, indexs) => {
      const items = dataItem.resourceInfo
      if (items.resourceType === 'SkyNet') {
        items[PF.SKYNET_PROJECT_NAME] = items[PF.SKYNET_PROJECT_NAME] || items.name
      }
      const productType = dataItem.resourceType
      class SingleData extends SingleDataDefault { }
      SingleData.defaultProps.data = items
      class MultipleData extends MultipleDataDefault { }
      MultipleData.defaultProps.data = items
      class SingleForBackUp extends SingleDataForBackUp { }
      SingleForBackUp.defaultProps.data = items
      SingleForBackUp.defaultProps.toggleState = this.toggleState

      // DataWorks 下的ODPS不允许直接编辑
      const disabledEdit = productType === 'MaxCompute' && items.ocDataworksInstanceId
      return (
        // eslint-disable-next-line react/no-array-index-key
        <>
          <div key={indexs.toString()}>
            <Row className={styles.resCard} key={items[PF.UNIT_ID]}>
              {/* 名称、型号 */}
              <Col span={layout[0]}>
                <div className={styles.type}>{dataItem.resourceName}</div>
                {/* <div>{items[PF.INSTANCE_TYPE]}</div> */}
              </Col>

              {/* 实例名称 */}
              <Col span={onDelete ? layout[1] - 1 : layout[1]}>
                {productType === 'BackUp' || productType === 'DisasterRecovery' ? (
                  <SingleForBackUp id={PF.INSTANCE_NAME} prefix={productType} />
                ) : (
                  <SingleData id={PF.INSTANCE_NAME} prefix={productType} noLabel nothing="-" />
                )}
              </Col>

              {/* 区域 */}
              <Col span={layout[2]}>
                <MultipleData id={[ PF.AREA_NAME, PF.REGION_NAME ]} />
              </Col>

              {/* 产品规格 */}
              <Col span={layout[3]}>
                <Col span={12}>
                  {/* VPC */}
                  <SingleData id={PF.NETWORK_TYPE_NAME} />
                  <SingleData id={PF.VPC_NAME} />
                  <SingleData id={PF.VIRTUAL_SWITCH_NAME} />
                  <SingleData id={PF.PERMISSION_TYPE} />
                  {/* 规格配置 */}
                  <SingleData id={PF.INSTANCE_TYPE} />
                  <SingleData id={PF.INSTANCE_SERIES} />
                  <SingleData id={PF.INSTANCE_SPEC} />
                  <SingleData id={PF.CLUSTER_NAME} />
                  <SingleData id={PF.CONTAINER_VERSION} />
                  <SingleData id={PF.BASE_PACKAGE} />
                  <SingleData id={PF.STORAGE_TYPE} prefix={productType} />
                  <SingleData id={PF.ECS_INSTANCE} />

                  {/* OSS配置 */}
                  <SingleData id={PF.CAPACITY} unit={items[PF.CAPACITY_UNIT]} />
                  <SingleForBackUp
                    id={PF.BACKUP_FLAG}
                    isOSS={productType === 'OSS'}
                  />
                  {/* <SingleData id={PF.DOWN_PACKAGE} /> */}
                  {/* ADS配置 */}
                  <SingleData id={PF.ECU_TYPE} />
                  {/* <SingleData id={PF.ECU_COUNT} /> */}
                  {!SPEC_LIST.includes(productType) && (<SingleData id={PF.BAND_WIDTH} unit="Mbps" />)}

                  <SingleData id={PF.ECS_NAME} />
                  {/* redis和rds共用engineVersion字段，所以需要做区分 */}
                  {/* POSTGRESQL和rds共用engine字段，所以需要做区分 */}
                  {productType === PRODUCT_TYPE.POSTGRESQL || productType === PRODUCT_TYPE.REDIS ? (
                    <>
                      <SingleData id={PF.ENGINE_VERSION} prefix={productType} />
                      <SingleData id={PF.ENGINE} prefix={productType} />
                    </>
                  ) : (
                    <MultipleData label="数据库类型" id={[ PF.DATA_BASE_TYPE, PF.DATA_BASE_VERSION ]} />
                  )}

                  {/* mongodb配置 */}
                  <SingleData id={PF.NODE_SPECIS} />
                  {/* <SingleData id={PF.RESOURCE_NAME} /> */}
                  <SingleData id={PF.SPEC_REMARK} prefix={productType} />
                  <SingleData id={PF.PROTOCOL_TYPE} />
                  {/* blink配置 */}
                  <SingleData id={PF.SLOTS_NUM} />
                  {/* WAF配置 */}
                  <SingleData id={PF.APPLY_TYPE} />
                  <SingleData id={PF.WAF_FILE_NAME} />
                  <SingleData
                    id={PF.WAF_CONFIG}
                    lookDetail={this.lookDetail}
                    hideDetail={this.hideDetail}
                    isShow={isWAF}
                  />
                  <SingleForBackUp id={PF.RESOURCE_DETAIL_LIST} isShow={isBackUp} />
                  {/* 消息队列MQ */}
                  {/* <MultipleData id={[PF.TOPIC, PF.MESSAGE_TYPE, PF.TOPIC_NUM]} /> */}
                  <SingleData id={PF.V_INSTANCE_NAME} />
                  <SingleData id={PF.SEND_TPS} />
                  <SingleData id={PF.RECEIVE_TPS} />
                  <SingleData id={PF.TOPIC_CAPACITY_NUM} />
                  <SingleData id={PF.MQ_DESC} />
                  {/* RDS只读实例 */}
                  <SingleData id={PF.RDS_INSTANCE} />
                  {/* SkyEye */}
                  <SingleData id={PF.MONITOR_SPEC} />
                  <SingleData id={PF.MONITOR_ASSET_PACK} />
                  <MultipleDataXDefault
                    data={items}
                    id="topicList"
                    render={(values) => (
                      <div>
                        <span style={{ color: '#999', wordBreak: 'keep-all' }}>Topic：</span>
                        <span
                          className="text-overflow"
                          title={`${values[PF.TOPIC]},${values[PF.MESSAGE_TYPE]},${
                            values[PF.TOPIC_NUM]
                          }`}
                        >
                          {`${values[PF.TOPIC]},${values[PF.MESSAGE_TYPE]},${values[PF.TOPIC_NUM]}`}
                        </span>
                        <div style={{ marginTop: '8px', display: 'flex' }}>
                          <span style={{ color: '#999', wordBreak: 'keep-all' }}>授权账户：</span>
                          <span className={styles.ellspan}>{values[PF.AUTHORIZR_ACCOUNT]}</span>
                        </div>
                      </div>
                    )}
                  />
                  {/* VPC */}
                  <SingleData id={PF.IS_SHARED} isBoolean />
                  <SingleShowNextLine
                    toggleShow={this.toggleShow}
                    data={items}
                    id={PF.SWITCH_DETAIL_LIST}
                    isShow={isShowNextLine}
                  />
                  {/* <SingleData
                    id={PF.WAF_CONFIG}
                    type="VPC"
                    isShowNextLine
                  /> */}
                  {/* 日志服务SLS */}
                  <SingleData id={PF.PROJECT_REMARK} />
                  <SingleData id={PF.AUTHORIZR_ACCOUNT} />
                  {/* ACS */}
                  <SingleData id={PF.NODE_CHARGE_TYPE} />
                  <SingleData id={PF.KUBERMETES_VERSION} />
                  <SingleData id={PF.DOCKER_VERSION} />
                  <SingleData id={PF.CHECK_SNAT_VALUE} />
                  <SingleData id={PF.CHECK_SLB_VALUE} />
                  <SingleData id={PF.CHECK_SSH_VALUE} />
                  <SingleData id={PF.NODE_POD_NUM} />
                  <SingleData id={PF.PODNETCIDR} />
                  {/* DataHub */}
                  <SingleData id={PF.NAME_DESC} />
                  <SingleData id={PF.TOPIC_NUM} />
                  <SingleData id={PF.SHARD_NUM} />

                  {/* HybridDBForMySQL */}
                  <SingleData id={PF.DB_NAME} />
                  <SingleData id={PF.DB_COUNT_NAME} />
                  {/* ODPS */}
                  <SingleData id={PF.CU_COUNT} />
                  <SingleData id={PF.ODPS_CAPACITY} />

                  {/* ES */}
                  <SingleData id={PF.ES_VERSION} />
                  <SingleData id={PF.ES_SPEC_CLUSTER} />
                  {/* <SingleData id={PF.ES_INSTANCE_SPEC} /> */}
                  <SingleData id={PF.ES_NODE_NUM} />
                  <SingleData id={PF.SINGLE_NODE_STORE_CAPACITY} unit="GiB" />
                  {/* dataworks */}
                  <SingleData id={PF.DATAWORKS_NAME} />
                  <SingleData id={PF.PATTERN} />
                  <SingleData id={PF.PROJECT_DESC} />
                  <SingleData id={PF.IS_DOWNLOAD} isBoolean />
                  <SingleData id={PF.IS_SCHEDULE_PERIOD} isBoolean />
                  <SingleData id={PF.LOAD_BALANCE_DESC} />
                  <SingleData id={PF.DBDESC} />
                  <SingleData id={PF.MIN_INSTANCE_NUM} />
                  <SingleData id={PF.MAX_INSTANCE_NUM} />
                  <SingleData id={PF.DEFAULT_COLD_DOWN_TIME} />
                  <SingleData id={PF.REMOVAL_STRATEGY} />
                  <SingleData id={PF.REMOVAL_STRATEGY_STEPSECOND} />
                  {/* ContentSecurity 内容安全服务（互联网安全服务） */}
                  <SingleData id={PF.CHECK_CONTENT_QUANTITY} />
                  <SingleData id={PF.CHECK_EXTEND_PACK_ONE} />
                  <SingleData id={PF.CHECK_EXTEND_PACK_TWO} />
                  {/* DNS */}
                  <SingleData id={PF.LAN_DOMAIN_NAME} />
                  {productType === 'MaxCompute' && (
                    <>
                      <SingleData id="projName" />
                    </>
                  )}

                  {/* SkyNet的规格信息 */}
                  {productType === PRODUCT_TYPE.SKENET && (
                    <>
                      <SingleData id={PF.SKYNET_APPLY_METHOD} />
                      {items[PF.SKYNET_APPLY_METHOD] && items[PF.SKYNET_APPLY_METHOD].includes('项目') &&
                        (<SingleData id={PF.SKYNET_PROJECT_NAME} />)}
                      {items[PF.SKYNET_APPLY_METHOD] && items[PF.SKYNET_APPLY_METHOD].includes('实例') && (
                        <SingleData
                          id={PF.SKYNET_ITEM_LIST}
                          lookDetail={this.lookDetail}
                          hideDetail={this.hideDetail}
                          isShow={isWAF}
                        />
                      )}
                    </>
                  )}
                  {/* ANTIBOT规格信息 */}
                  {productType === PRODUCT_TYPE.ANTIBOT && (
                    <>
                      {/* 防护域名数 */}
                      <SingleData id={PF.ANTIBOT_PROT_DOMAIN} unit="个" />
                      {/* // 日志服务存储 */}
                      <SingleData id={PF.ANTIBOT_LOG_STOR} unit="T" />
                      {/* 业务QPS */}
                      <SingleData id={PF.ANTIBOT_BUS_QPS} />
                      {/* 业务宽带 */}
                      <SingleData id={PF.ANTIBOT_SERV_BAND} unit="M" />
                    </>
                  )}

                  {/* DDOSIP */}
                  {productType === PRODUCT_TYPE.DDOSIP && (
                    <>
                      <SingleData id={PF.DDOSIP_PKG_SPEC_NAME} />
                      <SingleData id={PF.DDOSIP_ABLE} unit="G" />
                      <SingleData id={PF.BAND_WIDTH} unit="M" />
                      <SingleData id={PF.DDOSIP_EXTEND_BAND} unit="M" />
                    </>
                  )}
                  {/* DDOS防护 */}
                  {productType === PRODUCT_TYPE.ANTIDDOS && (
                    <>
                      <SingleData id={PF.ANTIDDOS_PKG_SPEC_NAME} />
                      <SingleData id={PF.ANTIDDOS_DEFEND} />
                      <SingleData id={PF.ANTIDDOS_DEFEND_URLSTR} />
                    </>
                  )}

                  {/* 网站涉黄恐暴政内容检测服务 */}
                  {productType === PRODUCT_TYPE.GREENNETWORK && (<SingleData id={PF.GREEN_CHECK_NUMBER} unit="万张（条）" />)}

                  {/* 开通说明 */}
                  {productType === PRODUCT_TYPE.AHAS && (<SingleData id={PF.AHAS_OPEN_INST} />)}

                  {/* DataSmart */}
                  {/* <SingleData id={PF.VERSION} /> */}
                  <SingleData id={PF.APPLY_QUANTITY} />
                </Col>
                <Col span={12}>
                  {/* Redis规格 */}
                  <SingleData id={PF.ARCHITECTURE_TYPE} />
                  <SingleData id={PF.NODE_TYPE} />
                  <SingleData id={PF.PACKAGE_TYPE} />
                  {!SPEC_LIST.includes(productType) && (<SingleData id={PF.REDIS_INSTANCE_SPEC} />)}
                  {/* ecs配置、产品规格 */}
                  <SingleData id={PF.NETWORK_NUMBER} />
                  <SingleData id={PF.CPU_MEMORY} />
                  <SingleData id={PF.STORAGE} unit="GB" />
                  <SingleData id={PF.HEALTH_CHECK} />

                  {!SPEC_LIST.includes(productType) && (<SingleData id={PF.PACKAGE_SPEC} />)}
                  {/* ANTIBOT规格信息 */}
                  {productType === PRODUCT_TYPE.ANTIBOT && (
                    <>
                      {/* 域名扩展包 */}
                      <SingleData id={PF.ANTIBOT_EXTEND_DOMAIN} unit="个" />
                      {/* 扩展QPS */}
                      <SingleData id={PF.ANTIBOT_EXTEND_QPS} />
                      {/* 扩展业务宽带 */}
                      <SingleData id={PF.ANTIBOT_EXTEND_BAND} unit="M" />
                      {/* 防护方案 */}
                      <SingleData id={PF.ANTIBOT_PROT_SCHEME} isUseOwnerText={items[PF.ANTIBOT_CHECK_BOT] ? '提供SDK原生APP的Bot流量防护方案' : ''} />
                    </>
                  )}
                  {/* DDOSIP规格信息 */}
                  {productType === PRODUCT_TYPE.DDOSIP && (
                    <>
                      {/* 业务宽带 */}
                      <SingleData id={PF.DDOSIP_PROT_DOMAIN} unit="个" />
                      {/* 扩展业务宽带 */}
                      <SingleData id={PF.DDOSIP_EXTEND_DOMAIN} unit="个" />
                      {/* // 日志服务存储 */}
                      <SingleData id={PF.DDOSIP_LOG_PKG} unit="T" />
                      {/* 防护方案 */}
                      <SingleData id={PF.DDOSIP_IS_ENHANCE} isBoolean />
                    </>
                  )}
                  <MultipleData label="镜像" id={[ PF.MIRROR_NAME, PF.MIRROR_VERSION ]} />
                  <MultipleData
                    label="系统盘"
                    id={[ PF.SYSTEM_DISK_TYPE, PF.SYSTEM_DISK_SIZE ]}
                    unit="GB"
                  />
                  <SingleData id={PF.MASTER_INSTANCE_TYPE} />
                  <SingleData id={PF.MASTER_INSTANCE_NUM} />
                  <MultipleData
                    label="Master系统盘"
                    id={[ PF.SYS_MASTER_TYPE, PF.SYS_MASTER_STORAGE ]}
                    unit="GB"
                  />
                  <SingleData id={PF.WORKER_INSTANCE_TYPE} />
                  <SingleData id={PF.WORKER_INSTANCE_NUM} />

                  <MultipleData
                    label="Worker系统盘"
                    id={[ PF.SYS_WORKER_TYPE, PF.SYS_WORKER_STORAGE ]}
                    unit="GB"
                  />
                  <MultipleData
                    label="Worker数据盘"
                    id={[ PF.DATA_WORKER_TYPE, PF.DATA_WORKER_STORAGE ]}
                    unit="GB"
                  />
                  <MultipleDataXDefault
                    label="数据盘"
                    data={items}
                    id={PF.DATA_DISK_LIST}
                    render={(values) => (
                      <div>
                        {values[PF.DISK_TYPE]}
                        ,
                        {' '}
                        {values[PF.DISK_STORAGE_MAX]}
                        GB
                      </div>
                    )}
                  />
                  {/* {items[PF.DATA_DISK_LIST] && ( */}

                  <SingleData id={PF.EIP_FLAG} />
                  <SingleData id={PF.EIP_BAND_WIDTH} unit="Mbps" />
                  {/* HybridDBForMySQL */}
                  <SingleData id={PF.NODE_SPEC} prefix={productType} />
                  <SingleData id={PF.NODE_QUANTITY} prefix={productType} />
                  {/* ES */}
                  <SingleData id={PF.MAIN_NODE_NUM} />
                  <SingleData id={PF.MAIN_NODE_SPEC} />
                  <MultipleData id={[ PF.MAIN_NODE_STORAGE_TYPE, PF.MAIN_NODE_STORAGE ]} />
                  <SingleData id={PF.COORD_NODE_NUM} />
                  <SingleData id={PF.COORD_NODE_SPEC} />
                  <MultipleData id={[ PF.COORD_NODE_STORAGE_TYPE, PF.COORD_NODE_STORAGE ]} />
                  <SingleData id={PF.COLD_NODE_NUM} />
                  <SingleData id={PF.COLD_NODE_SPEC} />
                  <MultipleData id={[ PF.COLD_NODE_STORAGE_TYPE, PF.COLD_NODE_STORAGE ]} />
                  {/* dataworks */}
                  <SingleData id={PF.PRD_NAME} />
                  <SingleData id={PF.PRD_IDENTITY} />
                  <SingleData id={PF.DEV_NAME} />
                  <SingleData id={PF.DEV_IDENTITY} />
                  {
                    productType === 'DataWorks' && (
                      <>
                        <SingleData id="simpleMcName" />
                        <SingleData id="simpleMcIdentity" />
                      </>
                    )
                  }
                </Col>
              </Col>

              {/* 数量 */}
              <Col span={layout[4]} style={{ textAlign: 'center' }}>
                <div className={styles.config}>
                  <div className={styles.configvalue} style={{ display: 'inline' }}>
                    {/* ADS产品运维人员数量显示带有描述 */}
                    {productType === 'ADS' && hasRolePre ? (`ECU: ${items[PF.QUANTITY]}`) : (items[PF.SKYNET_INSTANCE] || items[PF.QUANTITY] || '-')}
                  </div>
                </div>
              </Col>

              {/* 备注 */}
              <Col span={layout[5]}>
                <div className={styles.remark}>
                  {items.ifTempRes ? <div>临时资源</div> : null }
                  {items.releaseDate && typeof items.releaseDate === 'string' ? (
                    <div style={{ paddingBottom: 10 }}>
                      释放时间:
                      {' '}
                      {items.releaseDate.slice(0, 11)}
                    </div>
                  ) : null}
                  <Tooltip title={items[PF.REMARK]} placement="top">
                    <span>{items[PF.REMARK] || '-'}</span>
                  </Tooltip>
                </div>
              </Col>

              {/* 操作 */}
              {!disabledEdit && (onDelete || onEdit) && (
                <Col span={layout[6]}>
                  {onDelete && isPro && (
                    <a
                      style={{ display: 'block' }}
                      onClick={() => {
                        onDelete(dataItem)
                      }}
                    >
                      删除
                    </a>
                  )}
                  {onEdit &&
                    (productType !== PRODUCT_TYPE.ELASTICSEARCH ||
                      productType !== PRODUCT_TYPE.DATAWORKS) && (
                      <a
                      style={{ display: 'block' }}
                      onClick={() => {
                        onEdit(dataItem)
                      }}
                    >
                      调整规格
                    </a>
                  )}
                </Col>
              )}
            </Row>
            {isShowNextLine && <ShowDetailNextLine data={items} id={PF.SWITCH_DETAIL_LIST} />}
          </div>
          {isOSS && productType === 'OSS' ? <OSSDetailData data={dataItem} className={className} isSetUp /> : null}
        </>
      )
    })
    return (
      <div className={className}>
        <Row className={`${styles.resCard} ${styles.title}`} style={{ paddingBottom: 0 }}>
          <Col span={layout[0]}>
            <div className={styles.config}>资源</div>
          </Col>
          <Col span={onDelete ? layout[1] - 1 : layout[1]}>
            <div className={styles.config}>实例名称</div>
          </Col>
          <Col span={layout[2]}>
            <div className={styles.config}>区域</div>
          </Col>
          <Col span={layout[3]}>
            <div className={styles.config}>规格</div>
          </Col>
          <Col span={layout[4]}>
            <div className={styles.config} style={{ textAlign: 'center' }}>
              实例数量
            </div>
          </Col>
          <Col span={layout[5]}>
            <div className={styles.config}>备注</div>
          </Col>
          {(onDelete || onEdit) && <Col span={layout[6]} />}
        </Row>
        {dataSource}
        {isWAF && <WAFDetailData data={WafData} {...WAF_TABLE[this.state.currentProductType]} />}
        {isBackUp && BackUpData.length > 0 && (
          <BackUpDetailData data={BackUpData} className={className} isSetUp />
        )}
        {isDisasterRecovery && DisasterRecoveryData.length > 0 && (
          <BackUpDetailData data={DisasterRecoveryData} className={className} isSetUp={false} />
        )}
      </div>
    )
  }
}

export default ResourceInfo
