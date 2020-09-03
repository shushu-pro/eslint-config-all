import { post, get } from '@/utils/request';

// 全部规格
export const queryProductSpec = async ({
  productType,
  cloudRegionId,
}) => get(`/oc/cloud/product/queryProductSpec/${productType}/${cloudRegionId}`);

// 获取原来的全部规格
export const queryResouce = async params => get('/oc/sys/sysdict/querySpecisByProduct', params);

// 资源区域查询
export const queryRegion = async params => get('/oc/cloud/area/areaInfo', params);
// export const queryRegion = async params => get('/oc/sys/sysdict/region', params);

// 配额管理云区查询
export const quotaRegion = async params => get('/oc/cloud/area/info', params);

// 查询本部门配额、配额分配tab云区接口
export const subDeptCloudInfo = async params => get('/oc/cloud/area/subDeptCloudInfo', params);

// 下级配额查看tab查云区接口
export const allCloudInfo = async params => get('/oc/cloud/area/AllCloudInfo', params);

// 项目列表  - 不分页
export const queryAllProjectList = async () => get('/oc/resmng/ocprojectinfo/allprojectlist');

// 短信验证权限
export const smsAuth = async params => get('/oc/sms/needVerificationCode', params);

// 资源申请单提交短信验证请求验证码
export const smsAuthSend = async params => post('/oc/sms/sendVerificationCode', params);

// 短信验证码校验验证
export const smsAuthValidate = async params => post('/oc/sms/validateCode', params);

// 责任说明
export const getDescription = async params => get('/oc/sysConfig/qryConfig', params);

// 创建申请
export const submitApply = async params => post('/oc/resmng/apply', params);

// 获取产品分类列表
export const productCategory = async () => get('/oc/cloud/productGroup/queryProductGroups');

// 获取vpc
export const getVpc = async params => get('/oc/resmng/vpcinstance/list', params);

// 获取虚拟机
export const getVm = async params => get('/oc/resmng/vpcswitch/list', params);

// 获取安全组
export const getSecurityGroup = async params => get('/oc/resmng/securitygroup/list', params);

// 其它产品下拉接口
export const getOtherProductlist = async () => get('/oc/resmng/productcategory/otherproductlist');

// 其它产品下拉接口
export const getClusterList = async params => get('/oc/resmng/clusterinstance/list', params);

// 根据GroupsSpecTypeId查询规格联动信息
export const getGroupsSpecType = async params => get(`/oc/cloud/groupsSpecType/getGroupsSpecType/${params.dependGroupsSpecTypeId}`);

// 获取skynet的实例数量
export const getSkyNetNum = async params => get('/oc/cloud/resmng/getInstanceCount', params);

// RDS只读实例获取RDS列表
export const getRDSInstanceList = async params => get('/oc/resmng/rds/getRdsInstanceList', params);

// 获取dt部门接口
export const queryDtDeptList = async params => get('/oc/resmng/ocdeptmapping/queryDtDeptList', params);

// 资源申请部门接口（可选子部门）
export const queryOcDeptList = async params => get('/oc/uum/deptManage/queryOcDeptList', params);
