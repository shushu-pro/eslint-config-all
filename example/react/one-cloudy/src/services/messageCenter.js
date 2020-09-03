import { get } from '@/utils/request';

export const getMessageList = async params =>
  get('/oc/resmng/stateflow/getUncommitMessage', params);
export const getMessageDetail = async params =>
  get('/oc/resmng/stateflow/getMessageDetail', params);
