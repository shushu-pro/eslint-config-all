import { PRODUCT_TYPE } from '@/pages/OperationCenter/ResourceApply/constant';
import ECSForm from './ECSForm';
import DRDSForm from './DRDSForm';
import SLBForm from './SLBForm';
import OSSForm from './OSSForm';
import RDSForm from './RDSForm';
import MongodbForm from './MongodbForm';
import NASForm from './NASForm';
import EIPForm from './EIPForm';
import NATForm from './NATForm';
import ADSForm from './ADSForm';
import EDASForm from './EDASForm';
import OtherForm from './OtherForm';
import BastionHostForm from './BastionHostForm';
import DbauditForm from './DbauditForm';
import WAFForm from './WAFForm';
import DisasterRecoveryForm from './DisasterRecoveryForm';
import BackUpForm from './BackUpForm';
import BlinkForm from './BlinkForm';
import RedisForm from './RedisForm';
import MQForm from './MQForm';
import VPCForm from './VPCForm';
import SLSForm from './SLSForm';
import ACSForm from './ACSForm';
import OTSForm from './OTSForm';
import HybridDBForMySQLForm from './HybridDBForMySQLForm';
import HybridDBForPostgreSQLForm from './HybridDBForPostgreSQLForm';
import DATAHUBForm from './DATAHUBForm';
import ODPSForm from './ODPSForm';
import ESSForm from './ESSForm';
import ENCRForm from './ENCRForm';
import SkyEyeForm from './SkyEyeForm';
import RDSReadOnlyForm from './RDSReadOnlyForm';
import SkyNetForm from './SkyNet';
import AntiBotForm from './AntiBot';
import AntiDDOSForm from './AntiDDOS';
import DdosIPForm from './DdosIP';
import AHASForm from './AHASForm';
import GreenNetworkForm from './WebsiteDetectionBad';

import DataSmartForm from './DataSmartForm';
import AliCloudForm from './AliCloudForm';
import DataQFrom from './DataQForm';
import ContentSecurityFrom from './ContentSecurityFrom';
import DNSFrom from './DNSFrom';

export {
  ECSForm,
  DRDSForm,
  SLBForm,
  OSSForm,
  RDSForm,
  MongodbForm,
  NASForm,
  EIPForm,
  NATForm,
  ADSForm,
  EDASForm,
  OtherForm,
  BastionHostForm,
  DbauditForm,
  WAFForm,
  DisasterRecoveryForm,
  BackUpForm,
  BlinkForm,
  RedisForm,
  MQForm,
  VPCForm,
  SLSForm,
  ACSForm,
  OTSForm,
  HybridDBForMySQLForm,
  HybridDBForPostgreSQLForm,
  DATAHUBForm,
  ODPSForm,
  ENCRForm,
  RDSReadOnlyForm,
  SkyNetForm,
  SkyEyeForm,
  AntiBotForm,
  DdosIPForm,
  AntiDDOSForm,
  ESSForm,
  DataSmartForm,
  AHASForm,
  GreenNetworkForm,
  AliCloudForm,
  DataQFrom,
  ContentSecurityFrom,
  DNSFrom,
};

// type-产品关系对应表
// 全局应用监控(ARMS)、DTS、QUICKBI、图计算服务(BigGragh)、关系网络分析（I +）、机器学习（PAI）这些产品使用的其他产品表单。
export default {
  [PRODUCT_TYPE.ECS]: ECSForm,
  [PRODUCT_TYPE.RDS]: RDSForm,
  [PRODUCT_TYPE.OSS]: OSSForm,
  [PRODUCT_TYPE.SLB]: SLBForm,
  [PRODUCT_TYPE.NAT]: NATForm,
  [PRODUCT_TYPE.NAS]: NASForm,
  [PRODUCT_TYPE.EIP]: EIPForm,
  [PRODUCT_TYPE.MONGODB]: MongodbForm,
  [PRODUCT_TYPE.DRDS]: DRDSForm,
  [PRODUCT_TYPE.ADS]: ADSForm,
  [PRODUCT_TYPE.EDAS]: EDASForm,
  [PRODUCT_TYPE.OTHER]: OtherForm,
  [PRODUCT_TYPE.FORTRESSAIRCRAFT]: BastionHostForm, // 堡垒机
  [PRODUCT_TYPE.DBAUDIT]: DbauditForm, // 数据库审计
  [PRODUCT_TYPE.BLINK]: BlinkForm, // 流计算blink
  [PRODUCT_TYPE.ACS]: ACSForm,
  [PRODUCT_TYPE.DATAWORKS]: OtherForm,
  [PRODUCT_TYPE.DDOSIP]: DdosIPForm,
  [PRODUCT_TYPE.DTS]: OtherForm, // 已开发完
  [PRODUCT_TYPE.ECSDISK]: OtherForm,
  [PRODUCT_TYPE.EMR]: OtherForm,
  [PRODUCT_TYPE.GPU]: OtherForm,
  [PRODUCT_TYPE.ODPS]: ODPSForm,
  [PRODUCT_TYPE.OTS]: OTSForm,
  [PRODUCT_TYPE.REDIS]: RedisForm,
  [PRODUCT_TYPE.STREAMCOMPUTE]: OtherForm,
  [PRODUCT_TYPE.VPC]: VPCForm,
  [PRODUCT_TYPE.WAF]: WAFForm,
  [PRODUCT_TYPE.HOSTSECURE]: OtherForm,
  [PRODUCT_TYPE.NSSA]: OtherForm,
  [PRODUCT_TYPE.DATAV]: OtherForm,
  [PRODUCT_TYPE.MQ]: MQForm,
  [PRODUCT_TYPE.PAI]: OtherForm, // 已开发完
  [PRODUCT_TYPE.IPLUS]: OtherForm, // 已开发完
  [PRODUCT_TYPE.ELASTICSEARCH]: OtherForm,
  [PRODUCT_TYPE.ARMS]: OtherForm, // 已开发完
  [PRODUCT_TYPE.CSB]: OtherForm,
  [PRODUCT_TYPE.GTS]: OtherForm,
  [PRODUCT_TYPE.DMS]: OtherForm,
  [PRODUCT_TYPE.DBS]: OtherForm,
  [PRODUCT_TYPE.CLOUDFIREWALL]: OtherForm,
  [PRODUCT_TYPE.GREENNETWORK]: GreenNetworkForm,
  [PRODUCT_TYPE.CONTENTSECURITYSERVICES]: OtherForm,
  [PRODUCT_TYPE.PENETRATIONTESTSERVICE]: OtherForm,
  [PRODUCT_TYPE.SECURITYASSESSMENTSERVICE]: OtherForm,
  [PRODUCT_TYPE.EMERGENCYRESPONSESERVICE]: OtherForm,
  [PRODUCT_TYPE.SECURITYESCORTSERVICE]: OtherForm,
  [PRODUCT_TYPE.SECURITYCONSULTING]: OtherForm,
  [PRODUCT_TYPE.DTBOOST]: OtherForm,
  [PRODUCT_TYPE.DATAENCRYPTIONSERVICE]: OtherForm,
  [PRODUCT_TYPE.BIGGRAGH]: OtherForm, // 已开发完
  [PRODUCT_TYPE.WEBSITETHREATSCANNING]: OtherForm,
  [PRODUCT_TYPE.MYSQL]: HybridDBForMySQLForm,
  [PRODUCT_TYPE.POSTGRESQL]: HybridDBForPostgreSQLForm,
  [PRODUCT_TYPE.ANTIDDOS]: AntiDDOSForm,
  [PRODUCT_TYPE.LOGSERVICE]: SLSForm,
  [PRODUCT_TYPE.QUICKBI]: OtherForm, // 已开发完
  [PRODUCT_TYPE.ANTIBOT]: AntiBotForm,
  [PRODUCT_TYPE.EXPRESSCONNECT]: OtherForm, // 高速通道
  // 容灾备份产品
  [PRODUCT_TYPE.BACKUP]: BackUpForm,
  [PRODUCT_TYPE.DISASTERRECOVERY]: DisasterRecoveryForm,
  [PRODUCT_TYPE.DATAHUB]: DATAHUBForm,
  [PRODUCT_TYPE.RDSREADONLY]: RDSReadOnlyForm, // 云数据库RDS只读实例
  [PRODUCT_TYPE.SKENET]: SkyNetForm, // SkyNetForm
  [PRODUCT_TYPE.ENCR]: ENCRForm, // 加密机
  [PRODUCT_TYPE.SkyEye]: SkyEyeForm, // 天眼SkyEye
  [PRODUCT_TYPE.ESS]: ESSForm, // 弹性伸缩组ESS
  [PRODUCT_TYPE.DATASMART]: DataSmartForm, // DatasmartForm

  [PRODUCT_TYPE.AHAS]: AHASForm, // DatasmartForm
  //  阿里公有云产品
  [PRODUCT_TYPE.PCCDN]: AliCloudForm, // 内容分发网络CDN
  [PRODUCT_TYPE.PCVIDEOONDEMAND]: AliCloudForm, // 视频点播
  [PRODUCT_TYPE.PCLIVEVIDEO]: AliCloudForm, // 视频直播
  [PRODUCT_TYPE.PCVIDEOSURVEILLANCE]: AliCloudForm, // 视频监控
  [PRODUCT_TYPE.PCMTS]: AliCloudForm, // 媒体处理（MTS）
  [PRODUCT_TYPE.PCINTELLIGENTMEDIAMANAGEMENT]: AliCloudForm, // 智能媒体管理
  [PRODUCT_TYPE.PCCLOUDVIDEOCONFERENCE]: AliCloudForm, // 云视频会议
  [PRODUCT_TYPE.PCOSS]: AliCloudForm, // 阿里公有云对象存储OSS
  [PRODUCT_TYPE.PCNBGPIP]: AliCloudForm, // 新BGP高防IP服务
  [PRODUCT_TYPE.PCANTIBOT]: AliCloudForm, // 爬虫风险管理（Anti-Bot）
  [PRODUCT_TYPE.PCGREENNETWORK]: AliCloudForm, // 网站涉黄恐暴政内容检测服务

  [PRODUCT_TYPE.DATAQ]: DataQFrom, // DataQ
  [PRODUCT_TYPE.CONTENTSECURITY]: ContentSecurityFrom, // 内容安全服务（互联网安全服务）
  [PRODUCT_TYPE.DNS]: DNSFrom, // DNS
};
