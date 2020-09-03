import { post, get } from '@/utils/request';

export const queryUsers = async params => post('/oc/sys/login', params);
// export const queryUsers = async params => post('/saas_resource/sys/login', params);

// 人员列表
export const queryUserList = async params => get('/oc/sys/user/alluserlist', params);

// 获取运维人员列表（如果当前用户在运维人员列表则返回全部，否则返回为空）
export const querySysUsers = async params => get('/oc/sys/user/queryReviewSysUsers', params);

// 协议查询
export const queryProtocol = async params => get('/oc/sysprotocol/info', params);

// 协议查询
export const submitProtocol = async params => post('/oc/sys/confirmpro', params);

// 当前登录用户下载任务列表查询
export const queryDownList = async params => post('/oc/task/list', params);

// 删除某条数据
export const delDownList = async params => post('/oc/task/delete', params);
