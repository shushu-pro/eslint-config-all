import { get, post } from '@/utils/request';
import {
  post as deletePost,
} from '@/utils/billrequest';
// 添加oc侧用户
export const addUser = async params => post('/oc/uum/user/addUser', params);

// 修改用户信息
export const updateUserInfo = async params => post('/oc/uum/user/updateUserInfo', params);


// 上传用户头像
export const uploadUserImage = async params => post('/oc/uum/user/uploadUserImage', params);

// 激活or禁用用户
export const updateUserStatus = async params => post('/oc/uum/user/updateUserStatus', params);

// 获取用户列表
export const getUserList = async params => post('/oc/uum/user/getUserList', params);


// 删除用户
export const deleteUser = async params => deletePost('/oc/uum/user/deleteUser', params);

// 查询用户对应oc部门下dt部门（按云区分组）
export const getDtRegion = async params => post('/oc/uum/user/getDtRegion', params);

// 建立oc用户与dt用户匹配关系（用户关系存在时解除，不存在时创建）
export const createSysMapping = async params => post('/oc/uum/user/createSysMapping', params);

// 在该部门下新建账号并匹配（用oc用户信息在dt创建账号并建立匹配）
export const createDtUserByOcInfo = async params => post('/oc/uum/user/createDtUserByOcInfo', params);
// 查询dt部门下用户列表
export const getDtUserList = async params => post('/oc/uum/user/getDtUserList', params);


// 用户项目——获取用户参与项目
export const getProjectByUserId = async params => post('/oc/uum/user/getProjectByUserId', params);

// 用户项目——查询项目列表
export const getProjectList = async params => get('/oc/uum/user/getProjectList', params);

// 建立oc用户与dt用户匹配关系（用户关系存在时解除，不存在时创建）
// export const createSysMapping = async params =>
// post('/oc/uum/user/createSysMapping', params);

// 用户项目——添加、解除项目用户关系
export const addUserProject = async params => post('/oc/uum/user/addUserProject', params);

// 根据用户id获取用户信息
export const getUserById = async params => get('/oc/uum/user/getUserById', params);

// 用户项目——退出项目
export const removeUserProject = async params => post('/oc/uum/user/removeUserProject', params);
