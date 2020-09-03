import styles from '@/components/BillCenter/RejectModal/index.less'
import React from 'react'

export const VERSION_LIST = [ {
  id: 'basis',
  value: '基础版',
  label: '基础版',
  key: '基础版',
}, {
  id: 'senior',
  value: '高级版',
  label: '高级版',
  key: '高级版',
} ]
export const APPLY_TYPES = [ {
  id: 'instance',
  value: '按实例申请',
  label: '按实例申请',
  key: '按实例申请',
}, {
  id: 'project',
  value: '按项目申请',
  label: '按项目申请',
  key: '按项目申请',
}, {
  id: 'department',
  value: '按部门申请',
  label: '按部门申请',
  key: '按部门申请',
} ]
export const INSTANCE_LIST = [ {
  key: 'ECS',
  value: 'ECS',
  name: 'ECS',
  label: 'ECS',
  id: 1,
}, {
  key: 'RDS',
  value: 'RDS',
  name: 'RDS',
  label: 'RDS',
  id: 2,
}, {
  key: 'SLB',
  value: 'SLB',
  name: 'SLB',
  label: 'SLB',
  id: 3,
}, {
  key: 'OSS',
  value: 'OSS',
  name: 'OSS',
  label: 'OSS',
  id: 4,
}, {
  key: 'Redis',
  value: 'Redis',
  name: 'Redis',
  label: 'Redis',
  id: 5,
}, {
  key: 'EIP',
  value: 'EIP',
  name: 'EIP',
  label: 'EIP',
  id: 6,
}, {
  key: 'NAT',
  value: 'NAT网关',
  name: 'NAT网关',
  label: 'NAT',
  id: 7,
} ]
const instanceItemId = {
  key: 'instanceItemId',
  label: '实例ID',
  type: 'input',
  value: '',
}
const instanceItemName = {
  key: 'instanceItemName',
  label: '实例名称（非必填）',
  noRequired: true,
  type: 'input',
  value: '',
}
const ipAddress = {
  key: 'ipAddress',
  label: 'IP地址',
  type: 'input',
  value: '',
  pattern: /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/,
}
const bucketName = {
  key: 'instanceItemName',
  label: 'BUCKET名称',
  type: 'input',
  value: '',
}
export const NAME_MAP = {
  NAT网关: 'NAT',
  Redis: 'Redis',
  ECS: 'ECS',
  RDS: 'RDS',
  EIP: 'EIP',
  SLB: 'SLB',
  OSS: 'OSS',
}
export const SKYNET_INSTANCE = {
  NAT: [ {
    key: 'productName', label: '实例名称', type: 'text', inputHideType: 'hidden', value: 'NAT网关',
  }, instanceItemId, ipAddress ],
  EIP: [ {
    key: 'productName', label: '实例名称', type: 'text', inputHideType: 'hidden', value: 'EIP',
  }, instanceItemId, ipAddress ],
  ECS: [ {
    key: 'productName', label: '实例名称', type: 'text', inputHideType: 'hidden', value: 'ECS',
  }, instanceItemId, instanceItemName, ipAddress ],
  RDS: [ {
    key: 'productName', label: '实例名称', type: 'text', inputHideType: 'hidden', value: 'RDS',
  }, instanceItemId, instanceItemName, ipAddress ],
  SLB: [ {
    key: 'productName', label: '实例名称', type: 'text', inputHideType: 'hidden', value: 'SLB',
  }, instanceItemId, instanceItemName, ipAddress ],
  OSS: [ {
    key: 'productName', label: '实例名称', type: 'text', inputHideType: 'hidden', value: 'OSS',
  }, bucketName ],
  Redis: [ {
    key: 'productName', label: '实例名称', type: 'text', inputHideType: 'hidden', value: 'Redis',
  }, instanceItemId, instanceItemName, ipAddress ],
}
export const DATA = [
  {
    title: '多区域统一管理',
    key: 1,
    profession: 'icondui',
    standard: 'icondui',
    proColor: 'green',
    standColor: 'green',
    contents: [ '您可以在运维管家中快速管理您在一朵云所有区域的资源，无需频繁切换' ],
  }, {
    title: '基础云产品监控',
    key: 2,
    betterText: '1年',
    baseText: '6个月',
    contents: [ '查看ECS、RDS、SLB、OSS、EIP、NATIP、Redis历史性能数据' ],
  }, {
    title: '基础云产品报警',
    key: 3,
    profession: 'icondui',
    standard: 'icondui',
    proColor: 'green',
    standColor: 'green',
    contents: [ 'ECS、RDS、SLB、OSS、EIP、NATIP、Redis报警服务' ],
  }, {
    title: '大数据产品监控',
    key: 4,
    profession: 'icondui',
    standard: 'iconcuo',
    proColor: 'green',
    standColor: 'red',
    contents: [ '查看MaxCompute、ADS、DataHub、Blink等大数据产品历史性能数据' ],
  }, {
    title: '大数据产品报警',
    key: 5,
    profession: 'icondui',
    standard: 'iconcuo',
    proColor: 'green',
    standColor: 'red',
    contents: [ 'MaxCompute、ADS、DataHub、Blink等大数据产品异常报警服务' ],
  }, {
    title: '中间件产品监控',
    key: 6,
    profession: 'icondui',
    standard: 'iconcuo',
    proColor: 'green',
    standColor: 'red',
    contents: [ '1. 查看EDAS、MQ、CSB、DRDS等中间件产品历史性能数据；', '2. 监控EDAS、MQ、CSB、DRDS等中间件产品历史性能数据；' ],
  }, {
    title: '站点监控',
    key: 7,
    profession: 'icondui',
    standard: 'icondui',
    proColor: 'green',
    standColor: 'green',
    contents: [ '定时探测您的TCP、Http(s)站点，统计站点健康状况、响应时间，支持自定义阈值报警' ],
  }, {
    title: '业务系统盯屏',
    key: 8,
    profession: 'icondui',
    standard: 'iconcuo',
    proColor: 'green',
    standColor: 'red',
    contents: [ '通过大屏快速展示您的业务系统资源使用率及业务健康状态' ],
  } ]
export const COLUMNS = [
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
    title: '基础版',
    dataIndex: 'standard',
    key: 'standard',
    width: 60,
    render: (icon, record) => (
      <div>
        {record.baseText
          ? <span>{record.baseText}</span>
          : <i className={`icon iconfont ${icon} ${styles[record.standColor]}`} /> }
      </div>
    ),
  },
  {
    title: '高级版',
    dataIndex: 'profession',
    key: 'profession',
    align: 'center',
    width: 60,
    render: (icon, record) => (
      <div>
        {record.betterText
          ? <span>{record.betterText}</span>
          : <i className={`icon iconfont ${icon} ${styles[record.proColor]}`} /> }
      </div>
    ),
  },
]
export const TABLE_DATA = [
  {
    name: '',
    key: 'productName',
  },
  {
    name: '实例ID：',
    key: 'instanceItemId',
  },
  {
    name: '实例名称：',
    key: 'instanceItemName',
    label (item) {
      return item.productName === 'OSS' ? 'BUCKET名称：' : '实例名称：'
    },
  },
  {
    name: '实例IP：',
    key: 'ipAddress',
  },
]
