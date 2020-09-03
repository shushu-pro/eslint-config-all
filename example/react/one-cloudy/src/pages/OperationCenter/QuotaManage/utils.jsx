import { API_PARAMS } from './constant'

export const percent = (a: number, b: number) => a / b * 100
export const usedPercent = (item) => percent(item[API_PARAMS.QUOTA_USED], item[API_PARAMS.QUOTA_TOTAL])
export const assignedPercent = (item) => percent(item[API_PARAMS.QUOTA_USED] +
  item[API_PARAMS.QUOTA_ASSIGN], item[API_PARAMS.QUOTA_TOTAL])
