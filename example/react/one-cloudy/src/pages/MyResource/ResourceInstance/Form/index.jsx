import { PRODUCT_TYPE } from '@/pages/OperationCenter/ResourceApply/constant'
import ECSForm from './ECSForm'
// import SLBForm from './SLBForm';
import OSSForm from './OSSForm'
import RDSForm from './RDSForm'

export {
  ECSForm,
  // SLBForm,
  OSSForm,
  RDSForm,
}
export default {
  [PRODUCT_TYPE.ECS]: ECSForm,
  [PRODUCT_TYPE.RDS]: RDSForm,
  [PRODUCT_TYPE.OSS]: OSSForm,
  // [PRODUCT_TYPE.SLB]: SLBForm,
}
