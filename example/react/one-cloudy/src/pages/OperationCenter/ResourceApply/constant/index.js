import { PRODUCT_FIELDS, PRODUCT_FIELDS_NAME, FIELD_MAP } from './productFields';
import { PRODUCT_TYPE } from './productType';
import { IDENTIFIED_KEY } from './specKey';
import { SUBMIT_FIELD } from './submitField';
import {
  submitDataTransform,
  singleApplySubmitDataTransform,
} from './submitDataTransform';
import {
  getUserList,
  getDataDiskList,
  specTransform,
  sysDiskTransform,
  dataDiskTransform,
  getACSDataDiskList,
  getRdsSpecTypeGroupId,
  filterNull,
} from './utils';

export {
  // 提交字段显示的文案
  FIELD_MAP,
  // 产品通用字段
  PRODUCT_FIELDS_NAME,
  // 提交字段及需要显示的字段
  PRODUCT_FIELDS,
  // 产品type
  PRODUCT_TYPE,
  // 后端返回规格列表中的字段，用于获取返回的数据对象
  IDENTIFIED_KEY,
  // 提交时，specList中的字段
  SUBMIT_FIELD,
  // 资源使用人处理
  getUserList,
  // 数据盘中的空值处理
  getDataDiskList,
  // 提交时，规格数据转换
  specTransform,
  // 提交时，系统盘数据转换
  sysDiskTransform,
  // 提交时，系统盘数据转换
  dataDiskTransform,
  // ACS产品提交时， 系统盘和系统盘的提交处理
  getACSDataDiskList,
  // RDS产品变更提交时， cpu和内存SpecTypeGroupId的处理
  getRdsSpecTypeGroupId,
  filterNull,
  submitDataTransform,
  singleApplySubmitDataTransform,
};
