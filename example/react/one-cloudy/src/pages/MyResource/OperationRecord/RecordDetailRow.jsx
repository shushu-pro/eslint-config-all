import React from 'react'
import { Row, Col } from 'antd'
import { PRODUCT_FIELDS as PF, PRODUCT_TYPE } from '@/components/OperationCenter/ResourceInfo/constant'
import SingleDataDefault from './DataInfo/SingleData'
import MultipleDataDefault from './DataInfo/MultipleData'
import MultipleDataXDefault from './DataInfo/MultipleDataX'
import styles from './index.less'

class RecordDetailRow extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount () {

  }

  render () {
    const { beforeData, afterData, productType } = this.props
    const { dataDiskList = [] } = beforeData

    // diskType为sys的是系统盘
    beforeData.dataDiskList = dataDiskList.filter((item) => item.diskType !== 'sys')
    class SingleData extends SingleDataDefault { }
    SingleData.defaultProps.data = beforeData
    SingleData.defaultProps.afterData = afterData
    class MultipleData extends MultipleDataDefault { }
    MultipleData.defaultProps.data = beforeData
    MultipleData.defaultProps.afterData = afterData
    return (
      <div>
        <Row className={styles.resCard}>
          {/* 产品规格 */}
          <Col span={10}>
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
            <SingleData id={PF.DATA_BASE_TYPE} prefix={productType} />
            <SingleData id={PF.DATA_BASE_VERSION} prefix={productType} />

            {/* OSS配置 */}
            <SingleData id={PF.CAPACITY} unit={beforeData[PF.CAPACITY_UNIT] || 'GB'} />
            {/* <SingleData id={PF.DOWN_PACKAGE} /> */}
            {/* ADS配置 */}
            <SingleData id={PF.ECU_TYPE} />
            <SingleData id={PF.ECU_COUNT} />
            <SingleData id={PF.BAND_WIDTH} prefix={productType} unit="Mbps" />
            <SingleData id={PF.ECS_NAME} />
            {/* redis和rds共用engineVersion字段，所以需要做区分 */}
            {/* POSTGRESQL和rds共用engine字段，所以需要做区分 */}

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

            {/* VPC */}
            <SingleData id={PF.IS_SHARED} isBoolean />

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
            {/* DataSmart */}
            {/* <SingleData id={PF.VERSION} /> */}
            <SingleData id={PF.APPLY_QUANTITY} />
            {/* ECS ip */}
            <SingleData id={PF.PRIVATE_IP} prefix={productType} />
            <SingleData id={PF.NAT_IP} prefix={productType} />
            {/* rds ip */}
            <SingleData id={PF.IP_ADDR} prefix={productType} />
            {/* SLB IP */}
            <SingleData id={PF.IP_ADDRESS} prefix={productType} />
          </Col>
          <Col span={14}>
            {/* Redis规格 */}
            <SingleData id={PF.ARCHITECTURE_TYPE} />
            <SingleData id={PF.NODE_TYPE} />
            <SingleData id={PF.PACKAGE_TYPE} />
            <SingleData id={PF.REDIS_INSTANCE_SPEC} />
            {/* ecs配置、产品规格 */}
            <SingleData id={PF.NETWORK_NUMBER} />
            <SingleData id={PF.CPU_MEMORY} />
            {
              productType === 'OSS' ? null
                : <SingleData id={PF.STORAGE} unit="GB" />
            }
            <SingleData id={PF.HEALTH_CHECK} />
            <SingleData id={PF.PACKAGE_SPEC} />
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
              data={beforeData}
              after={afterData}
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
          </Col>

        </Row>
      </div>
    )
  }
}

export default RecordDetailRow
