/**
 * 常量文件
 */

// 字段表
import {
  PRODUCT_FIELDS,
  PRODUCT_FIELDS_NAME,
  FIELD_MAP,
  IDENTIFIED_KEY,
  PRODUCT_TYPE,
  SUBMIT_FIELD,
} from '@/pages/OperationCenter/ResourceApply/constant';

export {
  PRODUCT_FIELDS,
  PRODUCT_FIELDS_NAME,
  FIELD_MAP,
  IDENTIFIED_KEY,
  PRODUCT_TYPE,
  SUBMIT_FIELD,
};

export const FORM_ITEM_BASE_LAYOUT = {
  style: {
    marginBottom: 24,
  },
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

export const INSTANCE_NAME_RULE = {
  ECS: {
    text: '2-114个字符，以大小写字母或中文开头，可包含字母、数字、下划线和横杠',
    rlue: /^[a-zA-Z\u4e00-\u9fa5][\u4e00-\u9fa5a-zA-Z0-9_-]{1,113}$/,
  },
  OSS: {
    text: '3-35个字符，只能小写字母、数字、短横线，不能以-开头或者结尾',
    rlue: /^(?!-)(?!.*?-$)[a-z0-9-]{3,35}$/,
  },
  RDS: {
    text: '2~128个字符，以大小写字母或中文开头，可包含字母、数字、下划线和横杠',
    rlue: /^[a-zA-Z\u4e00-\u9fa5][\u4e00-\u9fa5a-zA-Z0-9_-]{1,127}$/,
  },
  SLB: {
    text: '1-63个字符，请以大小写字母开头，可包含字母、数字、下划线和横杠',
    rlue: /^[a-zA-Z][a-zA-Z0-9_-]{0,62}$/,
  },
  Mongodb: {
    text: '2-256个字符，以中文或字母开头，可包含中文、字母、数字、下划线和横杠',
    rlue: /^[a-zA-Z\u4e00-\u9fa5][\u4e00-\u9fa5a-zA-Z0-9_-]{1,255}$/,
  },
  MQ: {
    text: '',
    rlue: /^(?!(GID|CID))[a-zA-Z0-9-_]{3,64}$/,
  },
  VPC: {
    text: '长度为2-128个字符，以大小写或中文开头， 可包含数字、下划线和横杠',
    rlue: /^[a-zA-Z\u4e00-\u9fa5][\u4e00-\u9fa5a-zA-Z0-9_-]{1,127}$/,
  },
  SLS: {
    text:
      '3-16个字符，以大小写字母开头，不能以任意大小写“all”和“ots”开头，只能包含字母、数字和短横线',
    rlue: /^(?!(((a|A)(l|L)(l|L))|((o|O)(t|T)(s|S))))[a-zA-Z][a-zA-Z0-9-]{2,15}$/,
  },
  ACS: {
    text: '2-64个字符，只能包含字母、汉字、数字和短横线',
    rlue: /^[\u4e00-\u9fa5a-zA-Z0-9-]{2,64}$/,
  },
  ACSPOD: {
    text: '2-64个字符，只能包含字母、汉字、数字和短横线',
    rlue: RegExp(
      [
        '^(',
        `10.0.0.0/7-21
      172.16.0.0/12-21
      172.17.0.0/16-21
      172.18.0.0/15-21
      172.19.0.0/16-21
      172.20.0.0/16-21
      172.21.0.0/16-21
      172.22.0.0/15-21
      172.23.0.0/16-21
      172.24.0.0/13-21
      172.25.0.0/16-21
      172.26.0.0/15-21
      172.27.0.0/16-21
      172.28.0.0/16-21
      172.29.0.0/16-21
      172.30.0.0/16-21
      172.31.0.0/16-21
      192.168.0.0/13-21
      `
          .trim()
          .split('\n')
          .map(line => {
            const [ip, codeRangeText] = line.trim().split('/');
            let [codeBegin, codeEnd] = codeRangeText.split('-');
            codeBegin = +codeBegin;
            codeEnd = +codeEnd;
            const codeRange = [];
            for (let i = codeBegin; i <= codeEnd; i++) {
              codeRange.push(i);
            }
            return `(${ip}/(${codeRange.join('|')}))`;
          })
          .join('|'),
        ')$',
      ]
        .join('')
        .replace(/([./])/g, '\\$1')
    ),
  },
  HybridDBForMySQLName: {
    text: '以字母开头，字母或数字结尾，由小写字母下划线中划线组成，长度2-64个字符',
    rlue: /^[a-z][a-z0-9_-]{0,62}[a-z0-9]{1}$/,
  },
  HybridDBForMySQLAccount: {
    text: '以字母开头，字母或数字结尾，由小写字母下划线组成，长度2-10个字符',
    rlue: /^[a-z][a-z0-9_]{0,8}[a-z0-9]{1}$/,
  },
  DATAHUB: {
    text: '以字母开头，由字母数字及下划线组成，长度3-32个字符',
    rlue: /^[a-zA-Z][a-zA-Z0-9_]{2,31}$/,
  },
  ESS: {
    text: '2-40个字符，以大小写字母或中文开头，可包含字母、数字、下划线和横杠',
    rlue: /^[a-zA-Z\u4e00-\u9fa5][\u4e00-\u9fa5a-zA-Z0-9_-]{1,39}$/,
  },
  ODPS: {
    text: '以字母开头，由字母数字及下划线组成，长度3-32个字符',
    rlue: /^[a-zA-Z][a-zA-Z0-9_]{2,31}$/,
  },
  CONTENTSECURITY: {
    text: '2-114个字符，以大小写字母或中文开头,可包含汉字、字母、数字、下划线和横杠',
    rlue: /^[a-zA-Z\u4e00-\u9fa5][\u4e00-\u9fa5a-zA-Z0-9_-]{1,114}$/,
  },
  DNS: {
    text: '域名校验（同时校验IPv4和域名）',
    // eslint-disable-next-line max-len
    rlue: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)+([\\.])$|^(([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])\.)+([a-z]|[a-z][a-z0-9\-]*[a-z0-9])+([\\.])$/,
  },
  // ODPS 实例名
  'standardForDev.instanceName': {
    rlue: /^[a-zA-Z][a-zA-Z0-9_]{2,31}$/,
  },
  'standardForProd.instanceName': {
    rlue: /^[a-zA-Z][a-zA-Z0-9_]{2,31}$/,
  },
  'simpleForNormal.instanceName': {
    rlue: /^[a-zA-Z][a-zA-Z0-9_]{2,31}$/,
  }
};

export const getName = type => {
  switch (type) {
    case PRODUCT_TYPE.DBAUDIT:
      return '数据库审计';
    case PRODUCT_TYPE.FORTRESSAIRCRAFT:
      return '堡垒机';
    default:
      return '堡垒机';
  }
};

// 将数据处理成统一结构
export const getProcesData = list => {
  if (!Array.isArray(list)) {
    return [];
  }
  return list.map(item => ({
    ...item,
    key: item.key || item.id || item.value,
    value: item.label || item.value || item.name,
    children: item[IDENTIFIED_KEY.CHILDREN] || item[IDENTIFIED_KEY.CHILDRENS] || [],
  }));
};

export const getData = (resourceData = {}, dataType) => {
  const typeData = resourceData[dataType] || {};
  return (
    getProcesData(typeData[IDENTIFIED_KEY.CHILDREN] || typeData[IDENTIFIED_KEY.CHILDRENS]) || []
  );
};

export const getChildList = (list, value) => {
  const item = list.find(o => o.key === value);
  let matchList = [];
  // 有些级联中数据会返回在dependSpecTypeGroups中，不会返回children，所以需要做区分
  // 目前默认dependSpecTypeGroups数据中最后一个数据，如有影响需要进行调整
  if (item && item.specTypeGroupId && item.dependSpecTypeGroups) {
    Object.keys(item.dependSpecTypeGroups).map(key => {
      matchList = item.dependSpecTypeGroups[key]
        ? item.dependSpecTypeGroups[key][IDENTIFIED_KEY.CHILDRENS]
        : [];
    });
  } else {
    matchList = item ? item[IDENTIFIED_KEY.CHILDREN] || item[IDENTIFIED_KEY.CHILDRENS] : [];
  }
  return getProcesData(matchList);
};

export const networkTypeList = [
  {
    key: 'VPC',
    value: '专有网络',
  },
  {
    key: '经典网络',
    value: '经典网络',
  },
];

export const transform = list => list.map(o => ({
  value: o.name,
  key: o.id,
}));


export const transformSelectedProductList = (obj, sfTime) => {
  const objKeys = Object.keys(obj);
  objKeys.forEach(key => {
    for (let index = 0; index < obj[`${key}`].length; index++) {
      const element = obj[`${key}`][index];
      if (element.ifTempRes) {
        element.releaseDate = sfTime;
      }
    }
  });
  return obj;
};

export const FORM_ICON = {
  REGION: 'iconshenqingbiaodan-dingwei',
  BASE_INFO: 'iconshenqingbiaodan-jibenxinxi',
  NET: 'iconshenqingbiaodan-wangluo',
  MIRROR: 'iconshenqingbiaodan-jingxiang',
  STORAGE: 'iconshenqingbiaodan-cunchu',
  CONFIG: 'iconshenqingbiaodan-peizhi',
  QUANTITY: 'iconshenqingbiaodan-shuliang',
  RESOURCE: 'icondalei-quanbuchanpin',
  REMARK: 'iconbiaodanshenqing-beizhu',
  EIP: 'iconEIP',
  VIEW_FORM: 'iconbiaodan',
  BACK_UP: 'iconyidibeifen',
};

export const tableColumns = {
  [PRODUCT_TYPE.FORTRESSAIRCRAFT]: [
    {
      title: '规格',
      dataIndex: 'spec',
      width: 200,
      align: 'center'
    },
    {
      title: 'CPU（核）',
      dataIndex: 'cpu',
      align: 'center'
    },
    {
      title: '内存（GB）',
      dataIndex: 'storage',
      align: 'center'
    },
    {
      title: 'EIP带宽（Mbps）',
      dataIndex: 'bindWidth',
      align: 'center'
    },
    {
      title: '系统盘（GB）',
      dataIndex: 'sysDisk',
      align: 'center'
    },
    {
      title: '数据盘（GB）',
      dataIndex: 'dataDisk',
      align: 'center'
    },
  ],
  [PRODUCT_TYPE.DBAUDIT]: [
    {
      title: 'DB实例数（个）',
      dataIndex: 'dbNumber',
      align: 'center'
    },
    {
      title: 'CPU（核）',
      dataIndex: 'cpu',
      align: 'center'
    },
    {
      title: '内存（GB）',
      dataIndex: 'storage',
      align: 'center'
    },
    {
      title: 'EIP带宽（M）',
      dataIndex: 'eipBW',
      align: 'center'
    },
    {
      title: '系统盘（GB）',
      dataIndex: 'sysDisk',
      align: 'center'
    },
    {
      title: '数据盘（GB）',
      dataIndex: 'dataDisk',
      align: 'center'
    },
  ],
};

export const tableData = {
  [PRODUCT_TYPE.FORTRESSAIRCRAFT]: [
    {
      spec: '云盾堡垒机-100规格',
      cpu: '4',
      storage: '8',
      bindWidth: '4',
      sysDisk: '40',
      dataDisk: '500',
    },
    {
      spec: '云盾堡垒机-200规格',
      cpu: '4',
      storage: '8',
      bindWidth: '6',
      sysDisk: '40',
      dataDisk: '800',
    },
    {
      spec: '云盾堡垒机-500规格',
      cpu: '4',
      storage: '16',
      bindWidth: '6',
      sysDisk: '40',
      dataDisk: '1024',
    },
    {
      spec: '云盾堡垒机-1000规格',
      cpu: '8',
      storage: '16',
      bindWidth: '6',
      sysDisk: '40',
      dataDisk: '2048',
    },
    {
      spec: '云盾堡垒机-2000规格',
      cpu: '8',
      storage: '16',
      bindWidth: '6',
      sysDisk: '40',
      dataDisk: '2048',
    },
  ],
  [PRODUCT_TYPE.DBAUDIT]: [
    {
      dbNumber: 3,
      cpu: '4',
      storage: '8',
      eipBW: '6',
      sysDisk: '40',
      dataDisk: '500',
    },
    {
      dbNumber: 5,
      cpu: '4',
      storage: '8',
      eipBW: '6',
      sysDisk: '40',
      dataDisk: '1024',
    },
    {
      dbNumber: 10,
      cpu: '8',
      storage: '16',
      eipBW: '6',
      sysDisk: '40',
      dataDisk: '1536',
    },
    {
      dbNumber: 20,
      cpu: '8',
      storage: '16',
      eipBW: '6',
      sysDisk: '40',
      dataDisk: '4096',
    },
  ],
};

export const optionData = {
  [PRODUCT_FIELDS.POLICY_TYE]: [{ key: 'INCREMENTAL', value: '全量+增量' }],
  [PRODUCT_FIELDS.PREFERRED_CYCLE_TYPE]: [{ key: 'BY_WEEK', value: '按周执行' }],
  [PRODUCT_FIELDS.PREFERRED_BACK_UP_PERIOD]: [
    { key: 'Monday', value: '星期一' },
    { key: 'Tuesday', value: '星期二' },
    { key: 'Wednesday', value: '星期三' },
    { key: 'Thursday', value: '星期四' },
    { key: 'Friday', value: '星期五' },
    { key: 'Saturday', value: '星期六' },
    { key: 'Sunday', value: '星期天' },
  ],
  [PRODUCT_FIELDS.PREFERRED_BACK_UP_TIME]: [
    { key: '00:00Z-01:00Z', value: '00:00-01:00' },
    { key: '01:00Z-02:00Z', value: '01:00-02:00' },
    { key: '02:00Z-03:00Z', value: '02:00-03:00' },
    { key: '03:00Z-04:00Z', value: '03:00-04:00' },
    { key: '04:00Z-05:00Z', value: '04:00-05:00' },
    { key: '05:00Z-06:00Z', value: '05:00-06:00' },
    { key: '06:00Z-07:00Z', value: '06:00-07:00' },
    { key: '07:00Z-08:00Z', value: '07:00-08:00' },
    { key: '08:00Z-09:00Z', value: '08:00-09:00' },
    { key: '09:00Z-10:00Z', value: '09:00-10:00' },
    { key: '10:00Z-11:00Z', value: '10:00-11:00' },
    { key: '12:00Z-13:00Z', value: '12:00-13:00' },
    { key: '13:00Z-14:00Z', value: '13:00-14:00' },
    { key: '14:00Z-15:00Z', value: '14:00-15:00' },
    { key: '15:00Z-16:00Z', value: '15:00-16:00' },
    { key: '16:00Z-17:00Z', value: '16:00-17:00' },
    { key: '17:00Z-18:00Z', value: '17:00-18:00' },
    { key: '18:00Z-19:00Z', value: '18:00-19:00' },
    { key: '19:00Z-20:00Z', value: '19:00-20:00' },
    { key: '20:00Z-21:00Z', value: '20:00-21:00' },
    { key: '21:00Z-22:00Z', value: '21:00-22:00' },
    { key: '22:00Z-23:00Z', value: '22:00-23:00' },
    { key: '23:00Z-24:00Z', value: '23:00-24:00' },
  ],
  [PRODUCT_FIELDS.PREFERRED_BACK_UP_TYPE]: [{ key: 'BY_TIME', value: '按最长天数' }],
};

export const throttle = (func, wait) => {
  let previous = 0;
  return () => {
    const now = Date.now();
    const context = this;
    const args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  };
};
