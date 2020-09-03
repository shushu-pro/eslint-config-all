import styles from '@/components/BillCenter/RejectModal/index.less'
import React from 'react'

export const columns = [
  {
    title: '',
    dataIndex: 'title',
    key: 'title',
    render: (text, record) => (
      <div>
        <h4>{text}</h4>
        {record.contents.map((content) => (
          <p className={styles.extar} key={content}>
            {content}
          </p>
        ))}
      </div>
    ),
  },
  {
    title: '标准版',
    dataIndex: 'standard',
    key: 'standard',
    width: 60,
    render: (icon, record) => (
      <div>
        <i className={`icon iconfont ${icon} ${styles[record.standColor]}`} />
      </div>
    ),
  },
  {
    title: '专业版',
    dataIndex: 'profession',
    key: 'profession',
    align: 'center',
    width: 60,
    render: (icon, record) => (
      <div>
        <i className={`icon iconfont ${icon} ${styles[record.proColor]}`} />
      </div>
    ),
  },
]
export const DATA = [
  {
    title: '云资产自动化覆盖',
    key: 1,
    profession: 'icondui',
    standard: 'icondui',
    proColor: 'green',
    standColor: 'green',
    contents: [ '对云上资产进行自动化同步和安全监控措施覆盖，并对云资产变化进行实时监控' ],
  },
  {
    title: '攻击面管理',
    key: 2,
    profession: 'icondui',
    standard: 'icondui',
    proColor: 'green',
    standColor: 'green',
    contents: [
      '1.使用分布式扫描集群和精准服务识别技术对覆盖到的资产进行自动化的攻击面识别包括端口、',
      '服务类型、协议、版本、系统类型、组件类型等，并自动化进行弱服务标识；',
      '2.提供完整的攻击面管理流程，支持安全运营人员根据实际业务情况对攻击面进行流程管理；',
    ],
  },
  {
    title: '主机漏洞监控',
    key: 3,
    profession: 'icondui',
    standard: 'icondui',
    proColor: 'green',
    standColor: 'green',
    contents: [
      '对主机系统、数据库、弱口令/非授权访问、敏感文件泄露漏洞等风险进行全面扫描，',
      '支持windows/linux/常见数据库等 17w+cve风险,并对新产生的漏洞进行及时的更新和支持；',
    ],
  },
  {
    title: '组件及开源系统漏洞监控',
    key: 4,
    profession: 'icondui',
    standard: 'icondui',
    proColor: 'green',
    standColor: 'green',
    contents: [
      '对开源系统及通用组件(如：tomcat /jenkins/fastjson/struts等)进行漏洞检测，支持2000+',
      '  应用漏洞、1000+通用组件漏洞，并对新产生的漏洞进行及时的更新和支持；',
    ],
  },
  {
    title: 'web应用漏洞监控',
    key: 5,
    profession: 'icondui',
    standard: 'iconcuo',
    proColor: 'green',
    standColor: 'red',
    contents: [
      '支持Web动态风险识别，主要功能：',
      '1.高仿真实时渲染DOM遍历算法，全面支持复杂的前端场景；',
      '2.自动化盲打平台，支持”盲”类漏洞发现；',
      '3.自启发式漏洞检测算法；',
      '4.基于poc的验证式漏洞扫描；',
      '全面覆盖web类应用系统深度安全检测；',
    ],
  },
  {
    title: '云配置风险监控',
    key: 6,
    profession: 'icondui',
    standard: 'icondui',
    proColor: 'green',
    standColor: 'green',
    contents: [
      '结合一朵云最佳云配置安全实践对云上配置风险进行监控，包括RDS白名单、安全组风险、安骑士状态风险等',
    ],
  },
  {
    title: '自动化告警/报表',
    key: 7,
    profession: 'icondui',
    standard: 'icondui',
    proColor: 'green',
    standColor: 'green',
    contents: [ '钉钉告警(支持细化到项目)、邮件报表、报表内容管理' ],
  },
  {
    title: '安全运营中心',
    key: 8,
    profession: 'icondui',
    standard: 'icondui',
    proColor: 'green',
    standColor: 'green',
    contents: [ '安全运营中心支持对安全监控的风险进行各种维度的展示和管理' ],
  },
  {
    title: '安全漏洞修复，5*8远程技术支持',
    key: 9,
    profession: 'icondui',
    standard: 'icondui',
    proColor: 'green',
    standColor: 'green',
    contents: [ '安全监控风险的远程修复支持、修复建议、修复指导' ],
  },
  {
    title: '专家现场应急响应(1人/5天/年)',
    key: 10,
    profession: 'icondui',
    standard: 'iconcuo',
    proColor: 'green',
    standColor: 'red',
    contents: [ '重大安全事件的专家现场应急响应，如勒索/挖矿病毒、安全攻击事件等' ],
  },
]
