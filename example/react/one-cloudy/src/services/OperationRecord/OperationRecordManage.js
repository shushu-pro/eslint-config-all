// 我的资源-非DT
import { post, get, deleteRes } from '@/utils/request';

// 非DT资源实例列表
export const instanceListCommon = async params => post('/oc/cloud/resmng/instanceListCommon', params);

// 保存云资源实例信息-waf
export const instanceSave = async params => post('/oc/cloud/resmng/instanceSave', params);

// 删除非DT资源列表
export const instanceDelete = async ({ productInstanceId }) => deleteRes(`/oc/cloud/resmng/deleteInstance/${productInstanceId}`);

// 查询非DT资源的详情
export const nDtInstanceDetail = async ({ productInstanceId }) => get(`/oc/cloud/resmng/nDtInstanceDetail/${productInstanceId}`);