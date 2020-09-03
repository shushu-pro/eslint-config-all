// 后端返回的规格字段列表
export const IDENTIFIED_KEY = {
  DICT_ID: 'dictId',
  CHILDREN: 'sysDictList', // 后端按返回的childrenList字段
  CHILDRENS: 'children', // 后端按返回的childrenList字段
  // ECS、堡垒机、数据库审计 使用的字段相同
  INSTANCE_TYPE: 'instance_type', // 实例类型
  IMAGE_TYPE: 'image_type', // 镜像类型
  IMAGE_VERSION: 'image_version', // 镜像类型
  SYS_DISK_TYPE: 'sys_disk_type', // 系统盘
  DATA_DISK_TYPE: 'data_disk_type', // 数据盘
  EIP_BANDWIDTH: 'eip_bandwidth', // EIP带宽
  // SLB + 网络带宽
  // OSS
  BASE_PACKAGE: 'base_package', // 基础包
  DOWN_PACKAGE: 'downlink capacity', // 下行容量包
  PRIORITY: 'priority', // 权限
  ASSIGNED_CAPACITY: 'assigned_capacity', // 指定容量
  POLICY_TYE: 'policyType', // 备份策略
  // RDS + 存储空间
  DB_TYPE: 'db_type', // 数据库类型
  CPU_MEM: 'cpu_mem', // 数据库类型

  // ADS
  ECU_SEPC: 'ecu_sepc', // ECU型号
  ECU_INIT_VALUE: 'ecu_init_value', // ECU初始数量
  // EIP
  BADWIDTH_PEAK_VALUE: 'badwidth_peak_value', // 带宽峰值
  // DRDS
  INSTANCE_CLASS: 'instance_class', // 实例系列
  // EDAS
  CONTAINER_VERSION: 'container_version', // 容器版本号
  HEALTH_CHECK: 'health_check', // 健康检查
  // MongoDB + 存储空间
  NODE_SEPC: 'node_sepc', // 节点规格
  // NAS
  // PACKAGE: 'package', // 基础包
  STORAGE_TYPE: 'storage_type', // 存储类型
  PROTOCOL_TYPE: 'protocol_type', // 协议类型
  // NAT
  INSTANCE_SPEC: 'instance_spec', // 规格
  PUBLIC_NET_NUM: 'public_net_num', // 公网IP数
  // 堡垒机、数据库审计
  SPEC: 'spec', // 规格
  // MQ
  MESSAGE_TYPE: 'message_type', // 消息类型
  // 通用字段
  BANDWIDTH: 'bandwidth', // 网络带宽
  STORAGE: 'storage', // 存储空间
  PRODUCT_SPECS: 'productSpecs', // 关联关系
  // Redis
  NODE_TYPE: 'node_type', // 节点类型
  ARCHITECTURE_TYPE: 'architecture_type', // 架构类型
  ENGINE_VERSION: 'engine_version', // 引擎版本

  // ACS
  NODE_CHARGE_TYPE: 'node_charge_type', // 节点计费类型
  MASTER_INSTANCE_TYPE: 'master_instance_type', // MASTER实例规格
  WORKER_INSTANCE_TYPE: 'worker_instance_type', // WORKER实例规格
  KUBERMETES_VERSION: 'kubermetes_version', // Kubemetes版本
  NODE_POD_NUM: 'node_pod_num', // 节点Pod数量

  // hybirdDB for Mysql
  NODE_QUANTITY: 'node_quantity',
  NODE_SPEC: 'node_spec', // 节点规格
  // blink
  SLOTS_NUM: 'slots_num',
  // ODPS(MaxCompute)
  CU: 'cu',
  CAPACITY: 'capacity',
  // DATAHUB
  TOPIC_NUM: 'topic_num',
  SHARD_NUM: 'shard_num',
  // HybridDBForPostgreSQL
  ENGINE: 'engine',
  // SKYEYE新增字段
  MONITOR_SPEC: 'cloud_sec_monitor_spec', // 云安全监控规格
  MONITOR_ASSET_PACK: 'cloud_sec_monitor_asset_pack', // 云安全监控资产包
  // ESS
  REMOVAL_STRATEGY_VALUE: 'removal_strategy_value', // 移出策略
  REMOVAL_STRATEGY: 'removal_strategy', // 移出策略
  MAX_INSTANCE_NUM: 'max_instance_num', // 最大实例台数
  MIN_INSTANCE_NUM: 'min_instance_num', // 最小实例台数
  DEFAULT_COLD_DOWN_TIME: 'default_cold_down_time', // 默认冷却时间
  // SmartData
  VERSION: 'version', // 版本
  APPLY_QUANTITY: 'apply_quantity', // 申请数量

  /* 爬虫风险管理(互联网安全服务） */
  ANTIBOT_PKG_SPEC: 'package_specification',
  ANTIBOT_PROT_DOMAIN: 'protect_domain_name_number', // 防护域名数
  ANTIBOT_BUS_QPS: 'business_qps', // 业务QPS
  ANTIBOT_SERV_BAND: 'service_bandwidth', // 业务宽带
  ANTIBOT_LOG_STOR: 'log_service_storage', // 日志服务存储
  ANTIBOT_PROT_SCHEME: 'protection_scheme', // 防护方案
  /* ddosIp */
  DDOSIP_PKG_SPEC: 'package_specification',
  DDOSIP_ABLE: 'defend_ability', // 防护域名数
  DDOSIP_SERV_BAND: 'bandwidth', // 业务宽带
  DDOSIP_PROT_DOMAIN: 'protect_domain_name_number', // 防护域名数
  ANTIDDOS_DEFEND: 'defend_capability', // 防护能力
  ANTIDDOS_PKG_SPEC: 'instance_spec',
  // ContentSecurity 内容安全服务（互联网安全服务）
  CHECK_CONTENT_QUANTITY: 'check_content_quantity', // 检测内容数
  CHECK_EXTEND_PACK1: 'check_extend_pack1', // 检测扩展包1
  CHECK_EXTEND_PACK2: 'check_extend_pack2', // 检测扩展包2
}
