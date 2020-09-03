export const OPER_AUTH = ['operationsAndMaintenanceStaff', 'operationsStaff', 'deptManager'];
export function hasAuth(list, authList = OPER_AUTH, bool) {
  const result = authList.filter(item => list.includes(item));
  return bool ? result : !!(result && result.length);
}