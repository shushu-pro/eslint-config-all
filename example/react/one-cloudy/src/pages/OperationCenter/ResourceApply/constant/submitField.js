// 表单提交字段转化
// 如果不是级联操作的话，specTypeGroupId需要获取接口返回数据中的id， 否则为级联操作的父级
// groupsSpecTypeId和value提交的时候只能有是有值的

import { PRODUCT_TYPE } from './productType'
import { IDENTIFIED_KEY } from './specKey'
import { PRODUCT_FIELDS } from './productFields'

export const SUBMIT_FIELD = {
  [PRODUCT_TYPE.ECS]: [
    {
      key: IDENTIFIED_KEY.INSTANCE_TYPE,
      specTypeGroupId: PRODUCT_FIELDS.INSTANCE_TYPE_ID,
      groupsSpecTypeId: PRODUCT_FIELDS.INSTANCE_SPEC_ID,
    },
    {
      key: IDENTIFIED_KEY.IMAGE_TYPE,
      specTypeGroupId: PRODUCT_FIELDS.MIRROR_TYPE_ID,
      groupsSpecTypeId: PRODUCT_FIELDS.MIRROR_NAME_ID,
    },
    {
      key: IDENTIFIED_KEY.IMAGE_VERSION,
      specTypeGroupId: 'mirrorVersionSpeId',
      groupsSpecTypeId: PRODUCT_FIELDS.MIRROR_VERSION_ID,
    },
  ],
  /** 爬虫 */
  [PRODUCT_TYPE.ANTIBOT]: [
    {
      key: IDENTIFIED_KEY.ANTIBOT_PKG_SPEC,
      specTypeGroupId: IDENTIFIED_KEY.ANTIBOT_PKG_SPEC,
      groupsSpecTypeId: PRODUCT_FIELDS.ANTIBOT_PKG_SPEC,
    },
    {
      key: IDENTIFIED_KEY.ANTIBOT_PROT_DOMAIN,
      specTypeGroupId: IDENTIFIED_KEY.ANTIBOT_PROT_DOMAIN,
      value: PRODUCT_FIELDS.ANTIBOT_PROT_DOMAIN,
    },
    {
      key: IDENTIFIED_KEY.ANTIBOT_BUS_QPS,
      specTypeGroupId: IDENTIFIED_KEY.ANTIBOT_BUS_QPS,
      value: PRODUCT_FIELDS.ANTIBOT_BUS_QPS,
    },
    {
      key: IDENTIFIED_KEY.ANTIBOT_SERV_BAND,
      specTypeGroupId: IDENTIFIED_KEY.ANTIBOT_SERV_BAND,
      value: PRODUCT_FIELDS.ANTIBOT_SERV_BAND,
    },
    {
      key: IDENTIFIED_KEY.ANTIBOT_LOG_STOR,
      specTypeGroupId: IDENTIFIED_KEY.ANTIBOT_LOG_STOR,
      value: PRODUCT_FIELDS.ANTIBOT_LOG_STOR,
    },
    {
      key: IDENTIFIED_KEY.ANTIBOT_PROT_SCHEME,
      specTypeGroupId: IDENTIFIED_KEY.ANTIBOT_PROT_SCHEME,
      value: PRODUCT_FIELDS.ANTIBOT_PROT_SCHEME,
    },
  ],
  /**  DDOSIP */
  [PRODUCT_TYPE.DDOSIP]: [
    {
      key: IDENTIFIED_KEY.DDOSIP_PKG_SPEC,
      specTypeGroupId: IDENTIFIED_KEY.DDOSIP_PKG_SPEC,
      groupsSpecTypeId: PRODUCT_FIELDS.DDOSIP_PKG_SPEC,
    },
    {
      key: IDENTIFIED_KEY.DDOSIP_ABLE,
      specTypeGroupId: IDENTIFIED_KEY.DDOSIP_ABLE,
      value: PRODUCT_FIELDS.DDOSIP_ABLE,
    },
    {
      key: IDENTIFIED_KEY.DDOSIP_SERV_BAND,
      specTypeGroupId: IDENTIFIED_KEY.DDOSIP_SERV_BAND,
      value: PRODUCT_FIELDS.DDOSIP_SERV_BAND,
    },
    {
      key: IDENTIFIED_KEY.DDOSIP_PROT_DOMAIN,
      specTypeGroupId: IDENTIFIED_KEY.DDOSIP_PROT_DOMAIN,
      value: PRODUCT_FIELDS.DDOSIP_PROT_DOMAIN,
    },
  ],
  [PRODUCT_TYPE.ANTIDDOS]: [
    {
      key: IDENTIFIED_KEY.ANTIDDOS_PKG_SPEC,
      specTypeGroupId: IDENTIFIED_KEY.ANTIDDOS_PKG_SPEC,
      groupsSpecTypeId: PRODUCT_FIELDS.ANTIDDOS_PKG_SPEC,
    },
    {
      key: IDENTIFIED_KEY.ANTIDDOS_DEFEND,
      specTypeGroupId: IDENTIFIED_KEY.ANTIDDOS_DEFEND,
      groupsSpecTypeId: PRODUCT_FIELDS.ANTIDDOS_DEFEND_ID,
    },
  ],
  [PRODUCT_TYPE.SLB]: [
    {
      key: IDENTIFIED_KEY.BANDWIDTH,
      specTypeGroupId: IDENTIFIED_KEY.BANDWIDTH,
      value: PRODUCT_FIELDS.BAND_WIDTH,
    },
  ],
  [PRODUCT_TYPE.ENCR]: [],
  [PRODUCT_TYPE.SKENET]: [],
  [PRODUCT_TYPE.GREENNETWORK]: [],
  [PRODUCT_TYPE.AHAS]: [],
  [PRODUCT_TYPE.SkyEye]: [
    {
      key: IDENTIFIED_KEY.MONITOR_SPEC,
      specTypeGroupId: IDENTIFIED_KEY.MONITOR_SPEC,
      groupsSpecTypeId: PRODUCT_FIELDS.MONITOR_SPEC_ID,
    },
    {
      key: IDENTIFIED_KEY.MONITOR_ASSET_PACK,
      specTypeGroupId: IDENTIFIED_KEY.MONITOR_ASSET_PACK,
      value: PRODUCT_FIELDS.MONITOR_ASSET_PACK,
    },
  ],
  [PRODUCT_TYPE.RDS]: [
    {
      key: IDENTIFIED_KEY.DB_TYPE,
      specTypeGroupId: PRODUCT_FIELDS.DATA_BASE_TYPE_ID,
      groupsSpecTypeId: PRODUCT_FIELDS.DATA_BASE_VERSION_ID,
    },
    {
      key: IDENTIFIED_KEY.CPU_MEM,
      specTypeGroupId: 'cpuMemoryParentId',
      groupsSpecTypeId: PRODUCT_FIELDS.CPU_MEMORY_ID,
    },
    {
      key: IDENTIFIED_KEY.STORAGE,
      specTypeGroupId: IDENTIFIED_KEY.STORAGE,
      value: PRODUCT_FIELDS.STORAGE,
    },
  ],
  [PRODUCT_TYPE.OSS]: [
    {
      key: IDENTIFIED_KEY.ASSIGNED_CAPACITY,
      specTypeGroupId: IDENTIFIED_KEY.ASSIGNED_CAPACITY,
      value: PRODUCT_FIELDS.CAPACITY,
    },
    {
      key: IDENTIFIED_KEY.PRIORITY,
      specTypeGroupId: IDENTIFIED_KEY.PRIORITY,
      groupsSpecTypeId: PRODUCT_FIELDS.PERMISSION_TYPE_NAME,
    },
  ],
  // EIP
  [PRODUCT_TYPE.EIP]: [
    {
      key: IDENTIFIED_KEY.BADWIDTH_PEAK_VALUE,
      specTypeGroupId: IDENTIFIED_KEY.BADWIDTH_PEAK_VALUE,
      value: PRODUCT_FIELDS.BAND_WIDTH,
    },
  ],
  // ADS
  [PRODUCT_TYPE.ADS]: [
    {
      key: IDENTIFIED_KEY.ECU_SEPC,
      specTypeGroupId: IDENTIFIED_KEY.ECU_SEPC,
      groupsSpecTypeId: PRODUCT_FIELDS.ECU_TYPE_ID,
    },
    {
      key: IDENTIFIED_KEY.ECU_INIT_VALUE,
      specTypeGroupId: IDENTIFIED_KEY.ECU_INIT_VALUE,
      value: PRODUCT_FIELDS.ECU_COUNT,
    },
  ],
  // DRDS
  [PRODUCT_TYPE.DRDS]: [
    {
      key: IDENTIFIED_KEY.INSTANCE_CLASS,
      specTypeGroupId: PRODUCT_FIELDS.INSTANCE_SERIES_ID,
      groupsSpecTypeId: PRODUCT_FIELDS.INSTANCE_SPEC_ID,
    },
  ],
  // EDAS
  [PRODUCT_TYPE.EDAS]: [
    // {
    //   key: IDENTIFIED_KEY.CONTAINER_VERSION,
    //   specTypeGroupId: IDENTIFIED_KEY.CONTAINER_VERSION,
    //   groupsSpecTypeId: PRODUCT_FIELDS.CONTAINER_VERSION_ID,
    // },
    // {
    //   key: IDENTIFIED_KEY.HEALTH_CHECK,
    //   specTypeGroupId: IDENTIFIED_KEY.HEALTH_CHECK,
    //   value: PRODUCT_FIELDS.HEALTH_CHECK,
    // },
  ],
  // MONGODB
  [PRODUCT_TYPE.MONGODB]: [
    {
      key: IDENTIFIED_KEY.NODE_SEPC,
      specTypeGroupId: IDENTIFIED_KEY.NODE_SEPC,
      groupsSpecTypeId: PRODUCT_FIELDS.NODE_SPECIS_ID,
    },
    {
      key: IDENTIFIED_KEY.STORAGE,
      specTypeGroupId: IDENTIFIED_KEY.STORAGE,
      value: PRODUCT_FIELDS.STORAGE,
    },
  ],
  // NAS
  [PRODUCT_TYPE.NAS]: [
    {
      key: IDENTIFIED_KEY.ASSIGNED_CAPACITY,
      specTypeGroupId: IDENTIFIED_KEY.ASSIGNED_CAPACITY,
      value: PRODUCT_FIELDS.CAPACITY,
    },
    {
      key: IDENTIFIED_KEY.STORAGE_TYPE,
      specTypeGroupId: IDENTIFIED_KEY.STORAGE_TYPE,
      groupsSpecTypeId: PRODUCT_FIELDS.STORAGE_TYPE_ID,
    },
    {
      key: IDENTIFIED_KEY.PROTOCOL_TYPE,
      specTypeGroupId: IDENTIFIED_KEY.PROTOCOL_TYPE,
      groupsSpecTypeId: PRODUCT_FIELDS.PROTOCOL_TYPE_ID,
    },
  ],
  // NAT
  [PRODUCT_TYPE.NAT]: [
    {
      key: IDENTIFIED_KEY.INSTANCE_SPEC,
      specTypeGroupId: IDENTIFIED_KEY.INSTANCE_SPEC,
      groupsSpecTypeId: PRODUCT_FIELDS.INSTANCE_SPEC_ID,
    },
    {
      key: IDENTIFIED_KEY.PUBLIC_NET_NUM,
      specTypeGroupId: IDENTIFIED_KEY.PUBLIC_NET_NUM,
      value: PRODUCT_FIELDS.NETWORK_NUMBER,
    },
    {
      key: IDENTIFIED_KEY.BANDWIDTH,
      specTypeGroupId: IDENTIFIED_KEY.BANDWIDTH,
      value: PRODUCT_FIELDS.BAND_WIDTH,
    },
  ],
  // 堡垒机、数据库审计
  [PRODUCT_TYPE.DBAUDIT]: [
    {
      key: IDENTIFIED_KEY.INSTANCE_TYPE,
      specTypeGroupId: PRODUCT_FIELDS.INSTANCE_TYPE_ID,
      groupsSpecTypeId: PRODUCT_FIELDS.INSTANCE_SPEC_ID,
    },
    {
      key: IDENTIFIED_KEY.IMAGE_TYPE,
      specTypeGroupId: PRODUCT_FIELDS.MIRROR_TYPE_ID,
      groupsSpecTypeId: PRODUCT_FIELDS.MIRROR_NAME_ID,
    },
    {
      key: IDENTIFIED_KEY.EIP_BANDWIDTH,
      specTypeGroupId: IDENTIFIED_KEY.EIP_BANDWIDTH,
      value: PRODUCT_FIELDS.EIP_BAND_WIDTH,
    },
  ],
  [PRODUCT_TYPE.FORTRESSAIRCRAFT]: [
    {
      key: IDENTIFIED_KEY.INSTANCE_TYPE,
      specTypeGroupId: PRODUCT_FIELDS.INSTANCE_TYPE_ID,
      groupsSpecTypeId: PRODUCT_FIELDS.INSTANCE_SPEC_ID,
    },
    {
      key: IDENTIFIED_KEY.IMAGE_TYPE,
      specTypeGroupId: PRODUCT_FIELDS.MIRROR_TYPE_ID,
      groupsSpecTypeId: PRODUCT_FIELDS.MIRROR_NAME_ID,
    },
    {
      key: IDENTIFIED_KEY.IMAGE_VERSION,
      groupsSpecTypeId: PRODUCT_FIELDS.MIRROR_VERSION_ID,
    },
    {
      key: IDENTIFIED_KEY.EIP_BANDWIDTH,
      specTypeGroupId: IDENTIFIED_KEY.EIP_BANDWIDTH,
      value: PRODUCT_FIELDS.EIP_BAND_WIDTH,
    },
  ],
  // WAF
  [PRODUCT_TYPE.WAF]: [
    {
      key: PRODUCT_FIELDS.PRODUCT_GROUP_ID,
      specTypeGroupId: PRODUCT_FIELDS.PRODUCT_GROUP_ID,
      groupsSpecTypeId: PRODUCT_FIELDS.PRODUCT_GROUP_ID,
    },
  ],
  [PRODUCT_TYPE.BLINK]: [
    {
      key: IDENTIFIED_KEY.SLOTS_NUM,
      specTypeGroupId: IDENTIFIED_KEY.SLOTS_NUM,
      value: PRODUCT_FIELDS.SLOTS_NUM,
    },
  ],
  [PRODUCT_TYPE.REDIS]: [
    // 引擎版本
    {
      key: IDENTIFIED_KEY.ENGINE_VERSION,
      specTypeGroupId: IDENTIFIED_KEY.ENGINE_VERSION,
      groupsSpecTypeId: PRODUCT_FIELDS.ENGINE_VERSION_ID,
    },
    // 架构类型
    {
      key: IDENTIFIED_KEY.ARCHITECTURE_TYPE,
      specTypeGroupId: PRODUCT_FIELDS.ARCHITECTURE_TYPE_ID,
      groupsSpecTypeId: PRODUCT_FIELDS.PACKAGE_TYPE_ID,
    },
    // 节点类型
    {
      key: IDENTIFIED_KEY.NODE_TYPE,
      specTypeGroupId: IDENTIFIED_KEY.NODE_TYPE,
      groupsSpecTypeId: PRODUCT_FIELDS.NODE_TYPE_ID,
    },
    // 实例规格
    {
      key: IDENTIFIED_KEY.INSTANCE_TYPE,
      specTypeGroupId: 'instanceSpecParentId',
      groupsSpecTypeId: PRODUCT_FIELDS.REDIS_INSTANCE_SPEC_ID,
    },
  ],
  // MQ
  [PRODUCT_TYPE.MQ]: [],
  // VPC
  [PRODUCT_TYPE.VPC]: [],
  [PRODUCT_TYPE.LOGSERVICE]: [],
  // ACS
  [PRODUCT_TYPE.ACS]: [
    {
      key: IDENTIFIED_KEY.NODE_CHARGE_TYPE,
      specTypeGroupId: IDENTIFIED_KEY.NODE_CHARGE_TYPE,
      groupsSpecTypeId: PRODUCT_FIELDS.NODE_CHARGE_TYPE_ID,
    },
    {
      key: IDENTIFIED_KEY.KUBERMETES_VERSION,
      specTypeGroupId: IDENTIFIED_KEY.KUBERMETES_VERSION,
      groupsSpecTypeId: PRODUCT_FIELDS.KUBERMETES_VERSION_ID,
    },
    {
      key: IDENTIFIED_KEY.MASTER_INSTANCE_TYPE,
      specTypeGroupId: IDENTIFIED_KEY.MASTER_INSTANCE_TYPE,
      groupsSpecTypeId: PRODUCT_FIELDS.MASTER_INSTANCE_TYPE_ID,
    },
    {
      key: IDENTIFIED_KEY.WORKER_INSTANCE_TYPE,
      specTypeGroupId: IDENTIFIED_KEY.WORKER_INSTANCE_TYPE,
      groupsSpecTypeId: PRODUCT_FIELDS.WORKER_INSTANCE_TYPE_ID,
    },
  ],
  [PRODUCT_TYPE.OTS]: [
    {
      key: IDENTIFIED_KEY.INSTANCE_TYPE,
      specTypeGroupId: IDENTIFIED_KEY.INSTANCE_TYPE,
      groupsSpecTypeId: PRODUCT_FIELDS.INSTANCE_TYPE_ID,
    },
  ],
  [PRODUCT_TYPE.MYSQL]: [
    {
      key: IDENTIFIED_KEY.NODE_SPEC,
      specTypeGroupId: IDENTIFIED_KEY.NODE_SPEC,
      groupsSpecTypeId: PRODUCT_FIELDS.NODE_SPEC_ID,
    },
    {
      key: IDENTIFIED_KEY.NODE_QUANTITY,
      specTypeGroupId: IDENTIFIED_KEY.NODE_QUANTITY,
      value: PRODUCT_FIELDS.NODE_QUANTITY,
    },
  ],
  [PRODUCT_TYPE.ODPS]: [
    {
      key: IDENTIFIED_KEY.CU,
      specTypeGroupId: IDENTIFIED_KEY.CU,
      value: PRODUCT_FIELDS.CU_COUNT,
    },
    {
      key: IDENTIFIED_KEY.CAPACITY,
      specTypeGroupId: IDENTIFIED_KEY.CAPACITY,
      value: PRODUCT_FIELDS.ODPS_CAPACITY,
    },
  ],
  [PRODUCT_TYPE.DATAHUB]: [
    {
      key: IDENTIFIED_KEY.TOPIC_NUM,
      specTypeGroupId: IDENTIFIED_KEY.TOPIC_NUM,
      value: PRODUCT_FIELDS.TOPIC_NUM,
    },
    {
      key: IDENTIFIED_KEY.SHARD_NUM,
      specTypeGroupId: IDENTIFIED_KEY.SHARD_NUM,
      value: PRODUCT_FIELDS.SHARD_NUM,
    },
  ],
  [PRODUCT_TYPE.POSTGRESQL]: [
    {
      key: IDENTIFIED_KEY.ENGINE,
      specTypeGroupId: IDENTIFIED_KEY.ENGINE,
      groupsSpecTypeId: PRODUCT_FIELDS.ENGINE_ID,
    },
    {
      key: IDENTIFIED_KEY.STORAGE_TYPE,
      specTypeGroupId: IDENTIFIED_KEY.STORAGE_TYPE,
      groupsSpecTypeId: PRODUCT_FIELDS.STORAGE_TYPE_ID,
    },
    {
      key: IDENTIFIED_KEY.NODE_SPEC,
      specTypeGroupId: IDENTIFIED_KEY.NODE_SPEC,
      groupsSpecTypeId: PRODUCT_FIELDS.NODE_SPEC_ID,
    },
    {
      key: IDENTIFIED_KEY.NODE_QUANTITY,
      specTypeGroupId: IDENTIFIED_KEY.NODE_QUANTITY,
      groupsSpecTypeId: PRODUCT_FIELDS.NODE_QUANTITY_ID,
    },
  ],
  // 弹性伸缩组ESS
  [PRODUCT_TYPE.ESS]: [
    {
      key: IDENTIFIED_KEY.REMOVAL_STRATEGY,
      specTypeGroupId: PRODUCT_FIELDS.REMOVAL_STRATEGY_ID,
      groupsSpecTypeId: PRODUCT_FIELDS.REMOVAL_STRATEGY_STEPSECOND_ID,
    },
    {
      key: IDENTIFIED_KEY.MIN_INSTANCE_NUM,
      specTypeGroupId: IDENTIFIED_KEY.MIN_INSTANCE_NUM,
      value: PRODUCT_FIELDS.MIN_INSTANCE_NUM,
    },
    {
      key: IDENTIFIED_KEY.MAX_INSTANCE_NUM,
      specTypeGroupId: IDENTIFIED_KEY.MAX_INSTANCE_NUM,
      value: PRODUCT_FIELDS.MAX_INSTANCE_NUM,
    },
    {
      key: IDENTIFIED_KEY.DEFAULT_COLD_DOWN_TIME,
      specTypeGroupId: IDENTIFIED_KEY.DEFAULT_COLD_DOWN_TIME,
      value: PRODUCT_FIELDS.DEFAULT_COLD_DOWN_TIME,
    },
  ],
  // DataSmart
  [PRODUCT_TYPE.DATASMART]: [
    {
      key: IDENTIFIED_KEY.VERSION,
      specTypeGroupId: IDENTIFIED_KEY.VERSION,
      groupsSpecTypeId: PRODUCT_FIELDS.VERSION_ID,
    },
  ],
  // DataQ
  [PRODUCT_TYPE.DATAQ]: [
    {
      key: IDENTIFIED_KEY.VERSION,
      specTypeGroupId: IDENTIFIED_KEY.VERSION,
      groupsSpecTypeId: PRODUCT_FIELDS.VERSION_ID,
    },
  ],
  // ContentSecurity 内容安全服务（互联网安全服务）
  [PRODUCT_TYPE.CONTENTSECURITY]: [
    {
      key: IDENTIFIED_KEY.CHECK_CONTENT_QUANTITY,
      specTypeGroupId: IDENTIFIED_KEY.CHECK_CONTENT_QUANTITY,
      groupsSpecTypeId: PRODUCT_FIELDS.CHECK_CONTENT_QUANTITY_ID,
    },
  ],
  [PRODUCT_TYPE.DTS]: [],
  [PRODUCT_TYPE.PAI]: [],
  [PRODUCT_TYPE.IPLUS]: [],
  [PRODUCT_TYPE.ARMS]: [],
  [PRODUCT_TYPE.BIGGRAGH]: [],
  [PRODUCT_TYPE.QUICKBI]: [],
  // 异地备份
  [PRODUCT_TYPE.BACKUP]: [],
  // 同城容灾
  [PRODUCT_TYPE.DISASTERRECOVERY]: [],
  [PRODUCT_TYPE.RDSREADONLY]: [], // RDS只读实例

  [PRODUCT_TYPE.DATAWORKS]: [],
  [PRODUCT_TYPE.DNS]: [], // DNS
}
