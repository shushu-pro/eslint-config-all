import exportAPI from './_sys_/index'
import example from './configs/exmaple'
import resourceManagement from './configs/resource-management'
import myResource from './configs/my-resource'

export default exportAPI({
  ...example,
  ...resourceManagement,
  ...myResource,
})
