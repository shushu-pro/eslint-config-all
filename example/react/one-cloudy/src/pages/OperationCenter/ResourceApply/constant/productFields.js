import { PRODUCT_TYPE } from './productType'

// WAF申请方式
export const PRODUCT_FIELDS_WAF = {
  APPLY_TYPE: 'applyType',
  WAF_FORM_FILE: 'WAFFormFile', // WAF 表单附件
  WAF_FILE_NAME: 'fileName', // 附件名称
  WAF_OSSURL: 'ossUrl', // 附件地址
  WAF_DETAIL_LIST: 'wafDetailList', // WAF资源页面申请列表
  APPLICATION_DOMAIN: 'applicationDomain', // 应用域名
  APPLICATION_PROJECT_NAME: 'applicationProjectName', // 应用项目名称
  RETURN_SOURCE_IP: 'returnSourceIp', // 回源IP地址(SLB地址)
  RETURN_SOURCE_HOST: 'returnSourceHost', // 回源端口(80/443/...)
  EXTERNAL_AGREEMENTS: 'protocol', // 对外协议
}
// ECS
export const PRODUCT_FIELDS_ECS = {
  // ECS配置
  MIRROR_TYPE: 'imageType', // 镜像类型
  MIRROR_TYPE_ID: 'imageTypeId', // 镜像类型id
  MIRROR_NAME: 'imageName', // 镜像名称
  MIRROR_NAME_ID: 'imageNameId', // 镜像名称id
  MIRROR_VERSION: 'imageVersion', // 镜像版本
  MIRROR_VERSION_ID: 'imageVersionId', // 镜像版本id
  SYSTEM_DISK_TYPE: 'systemDiskType', // 系统盘类型
  SYSTEM_DISK_TYPE_ID: 'systemDiskTypeId', // 系统盘类型
  SYSTEM_DISK_SIZE: 'systemDiskSize', // 系统盘容量
  SYSTEM_DISK_KEY: 'sys', // 系统盘容量
  DATA_DISK_LIST: 'dataDiskList', // 数据盘列表
  DISK_TYPE: 'typeName', // 数据盘类型
  DISK_TYPE_ID: 'typeNameId', // 数据盘类型id
  DISK_STORAGE_MAX: 'storageMax', // 数据盘容量
  DISK_NUM: 'quantity', // 数据盘数量
  PRIVATE_IP: 'privateIp', // 私有ip
  NAT_IP: 'natIp', // 弹性IP
  // INSTANCE_DESC: 'instanceDesc', // 实例描述
}

// Redis
export const PRODUCT_FIELDS_REDIS = {
  IP_ADDR: 'ipAddr', // ip
  NODE_TYPE: 'nodeType', // 节点类型
  NODE_TYPE_ID: 'nodeTypeId', // 节点类型ID
  ARCHITECTURE_TYPE: 'architectureType', // 架构类型
  ARCHITECTURE_TYPE_ID: 'architectureTypeId', // 架构类型ID
  ENGINE_VERSION: 'engineVersion', // 引擎版本
  ENGINE_VERSION_ID: 'engineVersionId', // 引擎版本ID
  REDIS_INSTANCE_SPEC: 'instanceSpec', // 实例规格
  REDIS_INSTANCE_SPEC_ID: 'instanceSpecId', // 实例规格ID
  PACKAGE_TYPE: 'packageType', // 套餐类型
  PACKAGE_TYPE_ID: 'packageTypeId', // 套餐类型ID
}
// ACS
export const PRODUCT_FIELDS_ACS = {
  CHECK_SNAT: 'checkSnat',
  CHECK_SLB: 'checkSlb',
  CHECK_SSH: 'checkSsh',
  CHECK_SNAT_VALUE: 'checkSnatValue',
  CHECK_SLB_VALUE: 'checkSlbValue',
  CHECK_SSH_VALUE: 'checkSshValue',
  NODE_CHARGE_TYPE: 'nodeChargeType',
  NODE_CHARGE_TYPE_ID: 'nodeChargeTypeId',
  KUBERMETES_VERSION: 'kubermetesVersion',
  KUBERMETES_VERSION_ID: 'kubermetesVersionId',
  DOCKER_VERSION: 'dockerVersion',
  DOCKER_VERSION_ID: 'dockerVersionId',

  MASTER_INSTANCE_TYPE: 'masterSpecification',
  MASTER_INSTANCE_TYPE_ID: 'masterSpecificationId',
  MASTER_INSTANCE_NUM: 'masterInstanceNum',
  SYS_MASTER_TYPE_ID: 'sysMasterTypeId',
  SYS_MASTER_TYPE: 'sysMasterType',
  SYS_MASTER_STORAGE: 'sysMasterStorage',

  WORKER_INSTANCE_TYPE: 'workerSpecification',
  WORKER_INSTANCE_TYPE_ID: 'workerSpecificationId',
  SYS_WORKER_TYPE_ID: 'sysWorkerTypeId',
  SYS_WORKER_TYPE: 'sysWorkerType',
  SYS_WORKER_STORAGE: 'sysWorkerStorage',
  CHECK_DATA_DISK: 'checkDataDisk',
  DATA_WORKER_TYPE_ID: 'dataWorkerTypeId',
  DATA_WORKER_TYPE: 'dataWorkerType',
  DATA_WORKER_STORAGE: 'dataWorkerStorage',

  WORKER_INSTANCE_NUM: 'workerInstanceNum',

  NODE_POD_NUM_ID: 'nodePodNumId',
  NODE_POD_NUM: 'nodePodNum',
}

// datahub
export const PRODUCT_FIELDS_DATAHUB = {
  // 名称描述
  NAME_DESC: 'nameDesc',
  SHARD_NUM: 'shardNum',
  TOPIC_NUM: 'topicNum',
}

// SKYNET字段描述
export const PRODUCT_FIELDS_SKYNEY = {
  SKYNET_VERSION: 'version', // 版本
  SKYNET_VERSION_ID: 'versionID',
  SKYNET_APPLY_METHOD: 'applyMethod', // 申请方式
  SKYNET_APPLY_METHOD_ID: 'applyMethodID',
  SKYNET_PROJECT_NAME: 'snProjectName', // 项目
  SKYNET_PROJECT_ID: 'snProjectId',
  SKYNET_DEPART: 'department', // 部门
  SKYNET_INSTANCE: 'instanceQuantity', // 实例数量
  SKYNET_ITEM_LIST: 'itemList', // 申请方式为实例时，实例list
}
// ES
export const PRODUCT_FIELDS_ES = {
  ES_VERSION: 'version', // 版本
  // ES_INSTANCE_SPEC: 'instanceSpec', // 实例规格
  ES_SPEC_CLUSTER: 'specCluster', // 规格族
  ES_NODE_NUM: 'nodeNum', // 节点数量

  SINGLE_NODE_STORE_CAPACITY: 'singleNodeStoreCapacity', // 单节点存储空间
  STORAGE_TYPE: 'storageType', // 存储类型
  // 冷数据节点
  IS_COLD_NODE: 'isColdNode', // 是否开启冷数据节点
  COLD_NODE_SPEC: 'coldNodeSpec', // 冷数据节点规格
  COLD_NODE_NUM: 'coldNodeNum', // 冷数据节点数
  COLD_NODE_STORAGE: 'coldNodeStorage', // 冷数据节点存储
  COLD_NODE_STORAGE_TYPE: 'coldNodeStorageType', // 冷数据节点存储类型
  // 协调节点
  IS_COORD_NODE: 'isCoordNode', // 是否开启协调节点
  COORD_NODE_NUM: 'coordNodeNum', // 协调节点数
  COORD_NODE_SPEC: 'coordNodeSpec', // 协调节点规格
  COORD_NODE_STORAGE: 'coordNodeStorage', // 协调节点存储
  COORD_NODE_STORAGE_TYPE: 'coordNodeStorageType', // 协调节点存储类型
  // 主节点
  IS_MAIN_NODE: 'isMainNode', // 是否开启主节点
  MAIN_NODE_NUM: 'mainNodeNum', // 主节点数
  MAIN_NODE_SPEC: 'mainNodeSpec', // 主节点规格
  MAIN_NODE_STORAGE: 'mainNodeStorage', // 主节点存储类型
  MAIN_NODE_STORAGE_TYPE: 'mainNodeStorageType', // 主节点存储类型
}

// dataWorks
export const PRODUCT_FIELDS_DATAWORKS = {
  DATAWORKS_NAME: 'dataworksName', // 名称
  PATTERN: 'pattern', // 项目模式
  PROJECT_DESC: 'projectDesc', // 项目描述
  IS_DOWNLOAD: 'isDownload', // 启用周期调度
  IS_SCHEDULE_PERIOD: 'isSchedulePeriod', // 本项目中能下载select结果
  PRD_NAME: 'prdName', // 生产环境项目名称
  PRD_IDENTITY: 'prdIdentity', // 生产环境的访问身份
  DEV_NAME: 'devName', // 开发环境项目名称
  DEV_IDENTITY: 'devIdentity', // 开发环境访问身份
}

// 容灾产品
export const PRODUCT_FIELDS_BACKUP = {
  TARGET_INSTANCE_ID: 'targetInstanceId',
  POLICY_TYE: 'policyType',
  PREFERRED_CYCLE_TYPE: 'preferredCycleType',
  PREFERRED_BACK_UP_PERIOD: 'preferredBackupPeriod',
  PREFERRED_BACK_UP_TIME: 'preferredBackupTime',
  PREFERRED_BACK_UP_TYPE: 'preferredBackupType',
  BACK_UP_RETENTION_PERIOD: 'backupRetentionPeriod',
  TARGET_PRODUCT_CODE: 'targetProductCode',
  BACK_UP_DETAIL_LIST: 'backUpDetailList', // 申请异地备份配置信息列表
  RESOURCE_DETAIL_LIST: 'resourceDetailList',
}

// 爬虫风险管理（Anti-Bot）
export const PRODUCT_FIELDS_ANTIBOT = {
  ANTIBOT_PKG_SPEC_NAME: 'packageSpecification',
  ANTIBOT_PKG_SPEC: 'packageSpecificationId', // 规格
  ANTIBOT_PROT_DOMAIN: 'protectDomainNameNumber', // 防护域名数
  ANTIBOT_EXTEND_DOMAIN: 'extendDomain', // 域名扩展包
  ANTIBOT_BUS_QPS: 'businessQps', // 业务QPS
  ANTIBOT_EXTEND_QPS: 'extendQps', // 扩展QPS
  ANTIBOT_SERV_BAND: 'serviceBandwidth', // 业务宽带
  ANTIBOT_EXTEND_BAND: 'extendBandwidth', // 扩展业务宽带
  ANTIBOT_LOG_STOR: 'logServiceStorage', // 日志服务存储
  ANTIBOT_PROT_SCHEME: 'protectionScheme', // 防护方案
  ANTIBOT_CHECK_BOT: 'originProtectionScheme', // 是否提供Bot流量
}

// DDoS防护（Anti-DDoS）
export const PRODUCT_FIELDS_ANTIDDOS = {
  ANTIDDOS_PKG_SPEC_NAME: 'instanceSpec', // 规格
  ANTIDDOS_PKG_SPEC: 'instanceSpecId', // 规格
  ANTIDDOS_DEFEND: 'defendCapability', // 防护能力
  ANTIDDOS_DEFEND_ID: 'defendCapabilityID',
  ANTIDDOS_DEFEND_URLSTR: 'defendUrl',
  ANTIDDOS_DEFEND_URL: 'defendUrlArr', // 防护地址
}


// DDoS高防IP服务
export const PRODUCT_FIELDS_DDOSIP = {
  DDOSIP_PKG_SPEC_NAME: 'packageSpecification',
  DDOSIP_PKG_SPEC: 'packageSpecificationId', // 规格
  DDOSIP_ABLE: 'defendAbility', // 防护能力
  DDOSIP_SERV_BAND: 'bandwidth', // 业务宽带
  DDOSIP_EXTEND_BAND: 'extendBandwidth', // 扩展业务宽带
  DDOSIP_PROT_DOMAIN: 'protectDomainNameNumber', // 防护域名数
  DDOSIP_EXTEND_DOMAIN: 'extendDomain', // 域名扩展包
  DDOSIP_LOG_PKG: 'logStorage', // 全量日志分析存储包
  DDOSIP_IS_ENHANCE: 'isEnhance', // 是否开启增加功能
}

/**
 * 从字段表李抽离出来的
 * 用来处理`防止选择区域时被清空`的问题
 * 也就是说`该表里面的字段选择区域时不会被清空`
 */
export const PRODUCT_FIELDS_NAME = {
  AREA_ID: 'areaId', // 主中心
  AREA_NAME: 'areaName', // 主中心名称
  REGION_ID: 'regionId', // 副中心
  REGION_NAME: 'regionName', // 副中心名称
  DEPARTMENT_ID: 'deptId', // 部门id
  DEPARTMENT_NAME: 'deptName', // 部门名称
  PROJECT_ID: 'projectId', // 项目id
  PROJECT_NAME: 'name', // 项目名称
  RESOURCE_USER: 'resourceUsers', // 资源使用人
  ATTACHMENT: 'attachFileLinks', // 附件
  RESOURCE_KEYS: 'resourceKeys', // 资源使用人id列表
  INSTANCE_NAME: 'instanceName', // 实例名称
  REMARK: 'remark', // 备注
  RESOURCE_USER_INFOS: 'resourceUserInfos', // 资源使用人列表
  RESOURCE_USER_IDS: 'resourceUserIds', // 资源使用人id
  EIP_FLAG: 'eipFlag', // 是否开通eip
  EIP_BAND_WIDTH: 'eipBandwidth', // 开通的eip宽带大小
  ...PRODUCT_FIELDS_WAF,
  CAPACITY: 'specifiedCapacity', // oss容量
  SLOTS_NUM: 'slotsNum', // blink的slots数量
  MQ_NAME: 'mqName',
  PODNETCIDR: 'podNetCidr', // POD网络CIDR
  MAINFRAMENUM: 'mainFrameNum', // ACS主机台数
  LAN_DOMAIN_NAME: 'lanDomainName', // 内网域名
}

// 字段表
export const PRODUCT_FIELDS = {
  ...PRODUCT_FIELDS_NAME,
  ...PRODUCT_FIELDS_ECS,
  ...PRODUCT_FIELDS_WAF,
  ...PRODUCT_FIELDS_REDIS,
  ...PRODUCT_FIELDS_ACS,
  ...PRODUCT_FIELDS_DATAHUB,
  ...PRODUCT_FIELDS_ES,
  ...PRODUCT_FIELDS_DATAWORKS,
  ...PRODUCT_FIELDS_BACKUP,
  ...PRODUCT_FIELDS_SKYNEY,
  ...PRODUCT_FIELDS_DDOSIP,
  ...PRODUCT_FIELDS_ANTIDDOS,
  ...PRODUCT_FIELDS_ANTIBOT,
  IP_ADDRESS: 'ipAddress', // SLB IP地址
  UNIT_ID: 'id', // 产品id，唯一标志
  COMMON_INFO: 'commonInfo',
  USER_NAME: 'userName', // 使用人名称
  MOBILE: 'mobile', // 使用人手机
  EMAIL: 'email', // 使用人邮箱

  INSTANCE_TYPE: 'instanceType', // 实例类型
  INSTANCE_TYPE_ID: 'instanceTypeId', // 实例类型id
  INSTANCE_SPEC: 'specification', // 实例规格
  INSTANCE_SPEC_ID: 'specificationId', // 实例规格id
  SPEC_TYPE_GROUP_ID: 'specTypeGroupId',
  GROUPS_SPEC_TYPE_ID: 'groupsSpecTypeId',
  NETWORK_TYPE: 'networkType', // 网络类型
  NETWORK_TYPE_NAME: 'networkTypeName', // 网络类型名称
  VPC_ID: 'vpcId', // 虚拟网络id
  VPC_NAME: 'vpcName', // 虚拟网络Name
  VIRTUAL_SWITCH_ID: 'vSwitchId', // 虚拟交换机id
  VIRTUAL_SWITCH_NAME: 'vSwitchName', // 虚拟交换机name
  SECURITY_GROUP_ID: 'securityGroupId', // 安全组
  SECURITY_GROUP_NAME: 'securityGroupName', // 安全组名称

  // OSS配置
  PERMISSION_TYPE: 'permissionType', // 权限类型
  PERMISSION_TYPE_NAME: 'permissionName', // 权限名称
  BASE_PACKAGE: 'basePackage', // 基础包
  BASE_PACKAGE_ID: 'basePackageId', // 基础包id
  CAPACITY: 'specifiedCapacity', // 容量
  CAPACITY_UNIT: 'measurement', // 容量单位
  DOWN_PACKAGE: 'downCapacity', // 下行容量
  DOWN_PACKAGE_ID: 'downCapacityId', // 下行容量id
  POLICY_TYE: 'policyType', // 备份策略:全量+增量
  BACKUP_FLAG: 'backupFlag', // 是否开启异地备份(0:否, 1:是)
  BACKUP_TIME_INTERVAL: 'backupTimeInterval', // 时间间隔
  PERFERRED_BACKUP_TIME: 'preferredBackupTime', // 备份时间
  PERFERRED_BACKUP_TYPE: 'preferredBackupType', // 保存类型:按最长天数
  BACKUP_RETENTION_PERIOD: 'backupRetentionPeriod', // 最长天数

  // NAS配置
  STORAGE_TYPE: 'storageType', // 存储类型
  STORAGE_TYPE_ID: 'storageTypeId', // 存储类型id
  PROTOCOL_TYPE: 'protocolType', // 协议类型
  PROTOCOL_TYPE_ID: 'protocolTypeId', // 协议类型id
  // NAT配置
  NETWORK_NUMBER: 'networkNumber', // 公网ip个数
  BAND_WIDTH: 'bandwidth', // 带宽
  ECS_INSTANCE: 'ecsInstance', // EIP关联ECP实例名或ID
  // RDS配置
  DATA_BASE_TYPE: 'engine', // 数据库类型
  DATA_BASE_VERSION: 'engineVersion', // 数据库版本
  CPU_MEMORY: 'cpuMemory', // cpu/内存
  DATA_BASE_TYPE_ID: 'engineId', // 数据库类型id
  DATA_BASE_VERSION_ID: 'engineVersionId', // 数据库版本id
  CPU_MEMORY_ID: 'cpuMemoryId', // cpu/内存id
  // mongodb配置
  NODE_SPECIS: 'nodeSpecis', // 节点规格
  NODE_SPECIS_ID: 'nodeSpecisId', // 节点规格id
  STORAGE: 'storage', // 存储空间
  // ADS配置
  ECU_TYPE: 'ecuType', // ECU型号
  ECU_TYPE_ID: 'ecuTypeId', // ECU型号
  ECU_COUNT: 'ecuCount', // ECU初始数量
  // DRDS配置
  INSTANCE_SERIES: 'instanceSeries', // 实例系列
  INSTANCE_SERIES_ID: 'instanceSeriesId', // 实例系列id
  // EDAS配置 原来的value就是叫buildPackId
  CONTAINER_VERSION: 'buildPackId', // 容器版本号
  CONTAINER_VERSION_ID: 'buildPack', // 容器版本号ID
  CLUSTER_ID: 'clusterId', // 集群
  CLUSTER_NAME: 'clusterName', // 集群
  HEALTH_CHECK: 'healthCheckUrl', // 健康检查
  // 其他产品配置
  RESOURCE_ID: 'resourceId', // 资源id（其他产品）
  RESOURCE_NAME: 'resourceName', // 资源name（其他产品）
  SPEC_REMARK: 'specRemark', // 配置规格
  // 堡垒机
  PACKAGE_SPEC: 'packageSpecification', // 套餐规格
  PACKAGE_SPEC_ID: 'packageSpecificationId', // 套餐规格
  EIPBAND_WIDTH: 'eipBandwidth', // EIP带宽
  EIPBAND_WIDTH_ID: 'eipBandwidthId', //  EIP带宽Id

  // common
  QUANTITY: 'quantity', // 产品数量
  // WAF
  PRODUCT_GROUP_ID: 'productGroupId',
  APPLY_TYPE_NAME: 'applyTypeName',
  WAF_CONFIG: 'wafConfig',
  // MQ
  MESSAGE_TYPE: 'messageType',
  MESSAGE_TYPE_ID: 'messageTypeId',
  AUTHORIZR_ACCOUNT: 'authorizeAccount',
  TOPIC: 'topic',
  TOPIC_NUM: 'topicNum',
  SEND_TPS: 'sendTps',
  RECEIVE_TPS: 'receiveTps',
  MQ_DESC: 'mqDesc',
  TOPIC_CAPACITY_NUM: 'topicCapacityNum',
  V_INSTANCE_NAME: 'vInstanceName',
  // VPC - 交换机
  SWITCH_NAME: 'switchName',
  SWITCH_DESC: 'switchDesc',
  IS_SHARED: 'isShared',
  SWITCH_DETAIL_LIST: 'switchDetailList',
  // SLS
  PROJECT_REMARK: 'projectRemark', // project注释
  // hybirdDB for Mysql
  DB_NAME: 'dbName',
  DB_COUNT_NAME: 'dbCountName',
  NODE_QUANTITY: 'nodeQuantity',
  NODE_QUANTITY_ID: 'nodeQuantityId',
  NODE_SPEC_ID: 'nodeSpecId', // 节点规格
  NODE_SPEC: 'nodeSpec', // 节点规格
  // HybridDB For PostgreSQL
  ENGINE: 'engine',
  ENGINE_ID: 'engineId',

  // ODPS
  CU_COUNT: 'cuCount', // CU个数
  ODPS_CAPACITY: 'capacity', // 存储空间

  // RDS只读实例
  RDS_INSTANCE: 'rdsInstance', // RDS只读列表

  // SKYEYE新增字段
  MONITOR_SPEC: 'monitorSpec', // 云安全监控规格
  MONITOR_SPEC_ID: 'monitorSpecId', // 云安全监控规格id
  MONITOR_ASSET_PACK: 'monitorAssetPack', // 云安全监控资产包

  // 弹性伸缩组ESS
  LOAD_BALANCE_DESC: 'loadBalanceDesc', // 负载均衡
  DBDESC: 'dbDesc', // 数据库
  MIN_INSTANCE_NUM: 'minInstanceNum', // 最小实例台数
  MAX_INSTANCE_NUM: 'maxInstanceNum', // 最大实例台数
  DEFAULT_COLD_DOWN_TIME: 'defaultColdDownTime', // 默认冷却时间
  REMOVAL_STRATEGY_STEPSECOND: 'removalStrategyStepSecond', // 首先移出
  REMOVAL_STRATEGY_STEPSECOND_ID: 'removalStrategyStepSecondId', // 首先移出id
  REMOVAL_STRATEGY: 'removalStrategy', // 在结果中再移出
  REMOVAL_STRATEGY_ID: 'removalStrategyId', // 在结果中再移出id
  // AHAS
  AHAS_OPEN_INST: 'openInstruction', // 开通说明
  // GreenNetwork
  GREEN_CHECK_NUMBER: 'checkNumber', // 检测内容数
  // Datasmart
  VERSION: 'version', // 版本
  VERSION_ID: 'versionId', // 版本
  DS_QUANTITY: 'quantity', // 申请数量
  DS_QUANTITY_ID: 'quantityId', // 申请数量
  // ContentSecurity 内容安全服务（互联网安全服务）
  CHECK_EXTEND_PACK_ONE: 'checkExtendPackOne', // 检测扩展包1
  CHECK_EXTEND_PACK_ONE_ID: 'checkExtendPackOneId', // 检测扩展包1id
  CHECK_EXTEND_PACK_TWO: 'checkExtendPackTwo', // 检测扩展包2
  CHECK_EXTEND_PACK_TWO_ID: 'checkExtendPackTwoId', // 检测扩展包2id
  CHECK_CONTENT_QUANTITY: 'checkContentQuantity', // 检测内容数
  CHECK_CONTENT_QUANTITY_ID: 'checkContentQuantityId', // 检测内容数id

  // DNS
  LAN_DOMAIN_NAME: 'lanDomainName', // 内网域名
}

// datahub
export const FIELD_MAP_DATAHUB = {
  // 名称描述
  [PRODUCT_FIELDS.NAME_DESC]: '项目描述',
  [PRODUCT_FIELDS.SHARD_NUM]: 'Shard数量',
  [PRODUCT_FIELDS.TOPIC_NUM]: 'Topic数量',
}

// 产品字段表文案
export const FIELD_MAP = {
  [PRODUCT_FIELDS.PRIVATE_IP]: '私有IP',
  [PRODUCT_FIELDS.NAT_IP]: '弹性IP',
  [PRODUCT_FIELDS.IP_ADDR]: 'IP',
  [PRODUCT_FIELDS.IP_ADDRESS]: 'IP',
  [PRODUCT_FIELDS.INSTANCE_NAME]: '实例名称',
  [PRODUCT_TYPE.OSS + PRODUCT_FIELDS.INSTANCE_NAME]: 'BUCKET名称',
  [PRODUCT_TYPE.SLB + PRODUCT_FIELDS.INSTANCE_NAME]: '负载均衡名称',
  [PRODUCT_TYPE.ADS + PRODUCT_FIELDS.INSTANCE_NAME]: '数据库名称',
  [PRODUCT_TYPE.EDAS + PRODUCT_FIELDS.INSTANCE_NAME]: '应用名称',
  [PRODUCT_TYPE.NAS + PRODUCT_FIELDS.INSTANCE_NAME]: '文件存储名称',
  [PRODUCT_TYPE.MQ + PRODUCT_FIELDS.INSTANCE_NAME]: '虚拟实例',
  [PRODUCT_TYPE.VPC + PRODUCT_FIELDS.INSTANCE_NAME]: '名称',
  [PRODUCT_TYPE.SWITCH + PRODUCT_FIELDS.INSTANCE_NAME]: '名称',
  [PRODUCT_TYPE.LOGSERVICE + PRODUCT_FIELDS.INSTANCE_NAME]: 'project名称',
  [PRODUCT_TYPE.ACS + PRODUCT_FIELDS.INSTANCE_NAME]: '集群名称',
  [PRODUCT_TYPE.DATAHUB + PRODUCT_FIELDS.INSTANCE_NAME]: '项目名称',
  [PRODUCT_TYPE.DATAWORKS + PRODUCT_FIELDS.INSTANCE_NAME]: '项目名称',
  [PRODUCT_TYPE.ESS + PRODUCT_FIELDS.INSTANCE_NAME]: '伸缩组名称',

  [PRODUCT_FIELDS.INSTANCE_TYPE]: '实例类型',

  [PRODUCT_FIELDS.ATTACHMENT]: '申请单附件',

  [PRODUCT_FIELDS.QUANTITY]: '实例数量',

  [PRODUCT_FIELDS.NETWORK_TYPE_NAME]: '网络类型', // 网络类型名称
  [PRODUCT_FIELDS.VPC_NAME]: 'VPC', // VPC
  [PRODUCT_FIELDS.VIRTUAL_SWITCH_NAME]: '交换机', // 虚拟交换机name

  [PRODUCT_FIELDS.SECURITY_GROUP_ID]: '安全组', // 安全组id
  [PRODUCT_FIELDS.SECURITY_GROUP_NAME]: '安全组', // 安全组名称
  // description: '描述',
  [PRODUCT_FIELDS.INSTANCE_SPEC]: '实例规格',
  // DRDS
  [PRODUCT_FIELDS.INSTANCE_SERIES]: '实例系列',
  // EDAS
  [PRODUCT_FIELDS.HEALTH_CHECK]: '健康检查',
  [PRODUCT_FIELDS.CONTAINER_VERSION]: '容器版本号',
  [PRODUCT_FIELDS.CLUSTER_NAME]: '集群',
  // NAS
  [PRODUCT_FIELDS.BASE_PACKAGE]: '基础包',
  [PRODUCT_TYPE.NAS + PRODUCT_FIELDS.STORAGE_TYPE]: '存储类型',
  [PRODUCT_FIELDS.PROTOCOL_TYPE]: '协议类型',
  // OSS
  [PRODUCT_FIELDS.PERMISSION_TYPE_NAME]: '权限',
  [PRODUCT_FIELDS.PERMISSION_TYPE]: '权限',
  // [PRODUCT_FIELDS.BASE_PACKAGE]: '基础包',
  [PRODUCT_FIELDS.CAPACITY]: '存储容量',
  [PRODUCT_FIELDS.DOWN_PACKAGE]: '下行容量包',
  [PRODUCT_FIELDS.POLICY_TYE]: '备份策略',
  [PRODUCT_FIELDS.BACKUP_FLAG]: '是否开启异地备份',
  [PRODUCT_FIELDS.BACKUP_TIME_INTERVAL]: '时间间隔',
  [PRODUCT_FIELDS.PERFERRED_BACKUP_TIME]: '备份时间',
  [PRODUCT_FIELDS.PERFERRED_BACKUP_TYPE]: '保存类型',
  [PRODUCT_FIELDS.BACKUP_RETENTION_PERIOD]: '最长天数',
  // ADS
  [PRODUCT_FIELDS.ECU_TYPE]: 'ECU型号',
  [PRODUCT_FIELDS.ECU_COUNT]: 'ECU初始数量',
  // EIP
  [PRODUCT_FIELDS.BAND_WIDTH]: '带宽峰值',
  [PRODUCT_FIELDS.ECS_INSTANCE]: '关联ECS',
  // NAT
  [PRODUCT_FIELDS.NETWORK_NUMBER]: '公网IP个数',
  // RDS
  [PRODUCT_TYPE.RDS + PRODUCT_FIELDS.DATA_BASE_TYPE]: '数据库类型',
  [PRODUCT_TYPE.RDS + PRODUCT_FIELDS.DATA_BASE_VERSION]: '数据库版本',
  [PRODUCT_FIELDS.CPU_MEMORY]: 'CPU/内存',
  [PRODUCT_FIELDS.STORAGE]: '储存空间',
  // MongoDB
  [PRODUCT_FIELDS.NODE_SPECIS]: '节点规格',
  [PRODUCT_FIELDS.PACKAGE_SPEC]: '套餐规格',
  // 其他
  // [PRODUCT_FIELDS.RESOURCE_NAME]: '资源',
  [PRODUCT_FIELDS.SPEC_REMARK]: '配置规格',
  [PRODUCT_TYPE.ARMS + PRODUCT_FIELDS.SPEC_REMARK]: '开通说明',
  [PRODUCT_TYPE.PAI + PRODUCT_FIELDS.SPEC_REMARK]: '开通说明',
  [PRODUCT_TYPE.IPLUS + PRODUCT_FIELDS.SPEC_REMARK]: '开通说明',
  [PRODUCT_TYPE.DTS + PRODUCT_FIELDS.SPEC_REMARK]: '开通说明',
  [PRODUCT_TYPE.BIGGRAGH + PRODUCT_FIELDS.SPEC_REMARK]: '开通说明',
  [PRODUCT_TYPE.QUICKBI + PRODUCT_FIELDS.SPEC_REMARK]: '开通说明',
  [PRODUCT_FIELDS.REMARK]: '备注',
  // ECS关联EIP
  [PRODUCT_FIELDS.EIP_FLAG]: 'EIP',
  [PRODUCT_FIELDS.EIP_BAND_WIDTH]: '带宽峰值',
  // WAF配置
  [PRODUCT_FIELDS.APPLY_TYPE]: '申请方式', // 申请方式：表单申请   页面申请
  [PRODUCT_FIELDS.WAF_FILE_NAME]: '附件表格', // 附件表格
  [PRODUCT_FIELDS.WAF_CONFIG]: '实例配置',
  // blink
  [PRODUCT_FIELDS.SLOTS_NUM]: 'slots数量',
  // redis
  [PRODUCT_TYPE.REDIS + PRODUCT_FIELDS.ENGINE_VERSION]: '引擎版本',
  [PRODUCT_FIELDS.NODE_TYPE]: '节点类型',
  [PRODUCT_FIELDS.ARCHITECTURE_TYPE]: '架构类型',
  [PRODUCT_FIELDS.PACKAGE_TYPE]: '套餐类型',
  [PRODUCT_FIELDS.REDIS_INSTANCE_SPEC]: '实例规格',
  // MQ
  [PRODUCT_FIELDS.TOPIC]: 'Topic',
  // [PRODUCT_FIELDS.TOPIC_NUM]: 'topicNum',
  [PRODUCT_FIELDS.SEND_TPS]: '最大发送TPS',
  [PRODUCT_FIELDS.RECEIVE_TPS]: '最大订阅TPS',
  [PRODUCT_FIELDS.MQ_DESC]: '备注',
  [PRODUCT_FIELDS.TOPIC_CAPACITY_NUM]: 'Topic容量个数',
  [PRODUCT_FIELDS.V_INSTANCE_NAME]: '实例名称',
  // VPC
  [PRODUCT_FIELDS.IS_SHARED]: '下级部门共享',
  [PRODUCT_FIELDS.SWITCH_DETAIL_LIST]: '交换机',
  // SLS
  [PRODUCT_FIELDS.PROJECT_REMARK]: 'project注释',
  [PRODUCT_FIELDS.AUTHORIZR_ACCOUNT]: '授权账户',
  // ACS
  [PRODUCT_FIELDS.NODE_CHARGE_TYPE]: '节点计费类型',
  [PRODUCT_FIELDS.KUBERMETES_VERSION]: 'Kubemetes版本',
  [PRODUCT_FIELDS.DOCKER_VERSION]: 'Docker版本',
  [PRODUCT_FIELDS.CHECK_SNAT_VALUE]: '配置SNAT',
  [PRODUCT_FIELDS.CHECK_SLB_VALUE]: '公网SLB',
  [PRODUCT_FIELDS.CHECK_SSH_VALUE]: 'SSH登录',
  [PRODUCT_FIELDS.MASTER_INSTANCE_TYPE]: 'Master实例规格',
  [PRODUCT_FIELDS.MASTER_INSTANCE_NUM]: 'Master实例个数',
  [PRODUCT_FIELDS.WORKER_INSTANCE_TYPE]: 'Worker实例规格',
  [PRODUCT_FIELDS.WORKER_INSTANCE_NUM]: 'Worker实例个数',
  [PRODUCT_FIELDS.NODE_POD_NUM]: '节点Pod数量',
  [PRODUCT_FIELDS.PODNETCIDR]: 'POD网络CIDR',

  // HybridDBForMySQL
  [PRODUCT_FIELDS.DB_NAME]: '数据库名称',
  [PRODUCT_FIELDS.DB_COUNT_NAME]: '数据库账户名',
  [PRODUCT_TYPE.MYSQL + PRODUCT_FIELDS.NODE_SPEC]: '节点规格',
  [PRODUCT_TYPE.MYSQL + PRODUCT_FIELDS.NODE_QUANTITY]: '节点个数',
  // HybridDBForPostgreSQL
  [PRODUCT_TYPE.POSTGRESQL + PRODUCT_FIELDS.ENGINE]: '引擎',
  [PRODUCT_TYPE.POSTGRESQL + PRODUCT_FIELDS.STORAGE_TYPE]: '存储类型',
  [PRODUCT_TYPE.POSTGRESQL + PRODUCT_FIELDS.NODE_SPEC]: '计算组规格',
  [PRODUCT_TYPE.POSTGRESQL + PRODUCT_FIELDS.NODE_QUANTITY]: '计算组节点',

  ...FIELD_MAP_DATAHUB,

  // ODPS
  [PRODUCT_FIELDS.CU_COUNT]: 'CU个数',
  [PRODUCT_FIELDS.ODPS_CAPACITY]: '存储空间',
  // ES
  [PRODUCT_FIELDS.ES_VERSION]: '版本',
  [PRODUCT_FIELDS.ES_SPEC_CLUSTER]: '规格族',
  [PRODUCT_TYPE.ELASTICSEARCH + PRODUCT_FIELDS.REDIS_INSTANCE_SPEC]: '实例规格',
  [PRODUCT_FIELDS.ES_NODE_NUM]: '数量',
  [PRODUCT_FIELDS.SINGLE_NODE_STORE_CAPACITY]: '单节点存储空间',
  [PRODUCT_TYPE.ELASTICSEARCH + PRODUCT_FIELDS.STORAGE_TYPE]: '存储类型',
  [PRODUCT_FIELDS.IS_COLD_NODE]: '冷数据节点',
  [PRODUCT_FIELDS.COLD_NODE_SPEC]: '冷数据节点规格',
  [PRODUCT_FIELDS.COLD_NODE_NUM]: '冷数据节点数',
  [PRODUCT_FIELDS.COLD_NODE_STORAGE_TYPE]: '冷数据节点存储',
  [PRODUCT_FIELDS.IS_COORD_NODE]: '协调节点',
  [PRODUCT_FIELDS.COORD_NODE_NUM]: '协调节点数',
  [PRODUCT_FIELDS.COORD_NODE_SPEC]: '协调节点规格',
  [PRODUCT_FIELDS.COORD_NODE_STORAGE_TYPE]: '协调节点存储',
  [PRODUCT_FIELDS.IS_MAIN_NODE]: '专有主节点',
  [PRODUCT_FIELDS.MAIN_NODE_NUM]: '专有主节点数',
  [PRODUCT_FIELDS.MAIN_NODE_SPEC]: '专有主节点规格',
  [PRODUCT_FIELDS.MAIN_NODE_STORAGE_TYPE]: '专有主节点存储',

  // dataWorks

  [PRODUCT_FIELDS.DATAWORKS_NAME]: '显示名',
  [PRODUCT_FIELDS.PATTERN]: '项目模式',
  [PRODUCT_FIELDS.PROJECT_DESC]: '项目描述',
  [PRODUCT_FIELDS.IS_DOWNLOAD]: '启用周期调度',
  [PRODUCT_FIELDS.IS_SCHEDULE_PERIOD]: '本项目中能下载select结果',
  [PRODUCT_FIELDS.PRD_NAME]: '生产环境项目名称',
  [PRODUCT_FIELDS.PRD_IDENTITY]: '生产环境的访问身份',
  [PRODUCT_FIELDS.DEV_NAME]: '开发环境项目名称',
  [PRODUCT_FIELDS.DEV_IDENTITY]: '开发环境访问身份',
  projName: '项目名称',
  simpleMcIdentity: '简单模式访问身份',
  simpleMcName: '简单模式项目名称',

  // BackUp
  [PRODUCT_FIELDS.POLICY_TYE]: '备份策略',
  [PRODUCT_FIELDS.PREFERRED_CYCLE_TYPE]: '保存类型',
  [PRODUCT_FIELDS.PREFERRED_BACK_UP_PERIOD]: '备份日期',
  [PRODUCT_FIELDS.PREFERRED_BACK_UP_TIME]: '备份时间',
  [PRODUCT_FIELDS.PREFERRED_BACK_UP_TYPE]: '保存方式',
  [PRODUCT_FIELDS.BACK_UP_RETENTION_PERIOD]: '最长天数',
  [PRODUCT_FIELDS.RESOURCE_DETAIL_LIST]: '资源实例',

  // RDS只读实例
  [PRODUCT_FIELDS.RDS_INSTANCE]: '请选择RDS',

  // SKYEYE新增字段
  [PRODUCT_FIELDS.MONITOR_SPEC]: '云安全监控规格', // 云安全监控规格
  [PRODUCT_FIELDS.MONITOR_ASSET_PACK]: '云安全监控资产包', // 云安全监控资产包

  // ESS
  [PRODUCT_FIELDS.DBDESC]: '数据库',
  [PRODUCT_FIELDS.LOAD_BALANCE_DESC]: '负载均衡',
  [PRODUCT_FIELDS.DEFAULT_COLD_DOWN_TIME]: '默认冷却时间',
  [PRODUCT_FIELDS.MIN_INSTANCE_NUM]: '最小实例台数',
  [PRODUCT_FIELDS.MAX_INSTANCE_NUM]: '最大实例台数',
  [PRODUCT_FIELDS.REMOVAL_STRATEGY]: '首先移出',
  [PRODUCT_FIELDS.REMOVAL_STRATEGY_STEPSECOND]: '在结果中再移出',

  // SkyNet
  [PRODUCT_FIELDS.SKYNET_APPLY_METHOD]: '申请方式',
  [PRODUCT_FIELDS.SKYNET_ITEM_LIST]: '实例信息',
  [PRODUCT_FIELDS.SKYNET_PROJECT_NAME]: '项目',
  // AHAS
  [PRODUCT_FIELDS.AHAS_OPEN_INST]: '开通说明', // 开通说明
  // GreenNetwork
  [PRODUCT_FIELDS.GREEN_CHECK_NUMBER]: '检测内容数', // 检测内容数
  // Datasmart
  [PRODUCT_FIELDS.VERSION]: '版本',
  [PRODUCT_FIELDS.DS_QUANTITY]: '申请数量',

  [PRODUCT_FIELDS.ANTIBOT_PKG_SPEC]: '套餐规格', // 规格
  [PRODUCT_FIELDS.ANTIBOT_PROT_DOMAIN]: '防护域名数', // 防护域名数
  [PRODUCT_FIELDS.ANTIBOT_EXTEND_DOMAIN]: '域名扩展包', // 域名扩展包
  [PRODUCT_FIELDS.ANTIBOT_BUS_QPS]: '业务QPS', // 业务QPS
  [PRODUCT_FIELDS.ANTIBOT_EXTEND_QPS]: '扩展业务QPS', // 扩展QPS
  [PRODUCT_FIELDS.ANTIBOT_SERV_BAND]: '业务带宽', // 业务宽带
  [PRODUCT_FIELDS.ANTIBOT_EXTEND_BAND]: '扩展业务带宽', // 扩展业务宽带
  [PRODUCT_FIELDS.ANTIBOT_LOG_STOR]: '日志服务存储', // 日志服务存储
  [PRODUCT_FIELDS.ANTIBOT_PROT_SCHEME]: '防护方案', // 防护方案
  [PRODUCT_FIELDS.ANTIBOT_CHECK_BOT]: '', // 是否提供Bot流量


  [PRODUCT_FIELDS.DDOSIP_PKG_SPEC]: '套餐规格', // 规格
  [PRODUCT_FIELDS.DDOSIP_ABLE]: '防护能力', // 防护能力
  [PRODUCT_FIELDS.DDOSIP_SERV_BAND]: '业务带宽', // 业务宽带
  [PRODUCT_FIELDS.DDOSIP_EXTEND_BAND]: '扩展业务带宽', // 扩展业务宽带
  [PRODUCT_FIELDS.DDOSIP_PROT_DOMAIN]: '防护域名数', // 防护域名数
  [PRODUCT_FIELDS.DDOSIP_EXTEND_DOMAIN]: '域名扩展包', // 域名扩展包
  [PRODUCT_FIELDS.DDOSIP_LOG_PKG]: '全量日志分析存储包', // 全量日志分析存储包
  [PRODUCT_FIELDS.DDOSIP_IS_ENHANCE]: '是否开启增加功能', // 是否开启增加功能
  [PRODUCT_FIELDS.DDOSIP_PKG_SPEC_NAME]: '套餐规格', // 用于singleDATA

  [PRODUCT_FIELDS.ANTIDDOS_PKG_SPEC_NAME]: '套餐规格', // 规格
  [PRODUCT_FIELDS.ANTIDDOS_DEFEND]: '防护能力',
  [PRODUCT_FIELDS.ANTIDDOS_DEFEND_URLSTR]: '防护地址',

  // ContentSecurity 内容安全服务（互联网安全服务）
  [PRODUCT_FIELDS.CHECK_EXTEND_PACK_ONE]: '检测扩展包1',
  [PRODUCT_FIELDS.CHECK_EXTEND_PACK_TWO]: '检测扩展包2',
  [PRODUCT_FIELDS.CHECK_CONTENT_QUANTITY]: '检测内容数',

  [PRODUCT_FIELDS.EIPBAND_WIDTH]: 'EIP带宽',
  // DNS
  [PRODUCT_FIELDS.LAN_DOMAIN_NAME]: '内网域名',
}
