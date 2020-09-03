import { get } from '@/utils/request';

export const getCloudProdInstList = async params => get('/oc/cloud/resmng/getCloudProdInstList', params);

// /saas_onecloud/cloud/resmng/getCloudProdInstList?ocRegionId=3&ocProjectId=pro-7664346740652245554&ocDeptId=43&productCode=MaxCompute