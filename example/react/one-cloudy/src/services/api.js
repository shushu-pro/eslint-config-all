import { stringify } from 'qs';
import { get, post } from '@/utils/request';

export const fakeAccountLogin = async params => post('/oc/sys/login', params);

export const fakeAccountLogout = async params => get('/oc/sys/logout', params);

export const queryNotices = async params => get(`/api/notices?${stringify(params)}`);
export const queryProjectNotice = async params => get('/api/project/notice', params);
export const getFakeCaptcha = async ({ mobile }) => get(`/api/captcha?mobile=${mobile}`);
