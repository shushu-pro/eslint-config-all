import { get } from '../utils/request';
// 查询列表
export const pagedQueryFactory = queryUrl => async params => get(queryUrl, params);
