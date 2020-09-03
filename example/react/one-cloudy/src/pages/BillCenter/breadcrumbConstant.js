/**
 * 面包屑配置
 * 每个页面最后的一个面包屑为上一个页面
 */
import { getTitle, FINANCE_FILED_MAP_TEXT } from './constant';

// 各部门账单列表
export const ALL_DEPT_LIST_MAP = {
  title: '账单列表',
  href: '/manage/bill-center/list',
};

// 某月账单详情
export const ALL_DEPT_DETAIL_MAP = params => {
  const { billNo, seqno, ocFinId } = params;
  return [
    ALL_DEPT_LIST_MAP,
    {
      title: getTitle(billNo) + `(${FINANCE_FILED_MAP_TEXT[ocFinId]})`,
      href: `/manage/bill-center/list/details/${billNo}/${seqno}/${ocFinId}`,
    },
  ];
};

// 部门列表
export const DEPT_LIST_MAP = {
  title: '账单列表',
  href: '/manage/bill-center/myBill',
};

// 大数据局 - 某部门账单详情       页面地址： /manage/bill-center/list/department/201909/207/19c697a3-9988-43aa-967f-a5db846a22a5/省大数据局/detail
// 大数据局 - 政法下某部门账单详情  页面地址： /manage/bill-center/list/department/201909/207/94385e46-34f4-41a5-8a7c-ead8c591c542/省委政法委/detail/2
// 一级部门 - 某月度部门详情       页面地址： /manage/bill-center/myBill/details/201909/9096/19c697a3-9988-43aa-967f-a5db846a22a5
export const DEPT_DETAIL_LIST = params => {
  const { department, unitId, departmentId, billNo, seqno, ocFinId } = params;
  if (department && !unitId) {
    return ALL_DEPT_DETAIL_MAP(params);
  }
  if (department && unitId === '2') {
    const deptName = '(政法)';
    return ALL_DEPT_DETAIL_MAP(params).concat({
      title: department + deptName,
      href: `/manage/bill-center/list/PACenterDetails/${billNo}/${seqno}/${ocFinId}/${department +
        deptName}/${unitId}`,
    });
  }
  if (departmentId) {
    return [DEPT_LIST_MAP];
  }
  return [];
};

// 大数据局 - 某部门      某项目详情 页面地址：/manage/bill-center/list/project/201909/207/19c697a3-9988-43aa-967f-a5db846a22a5/省大数据局/15/最多跑一次/projectResource/cn-hangzhou-zjzwy01-d01
// 大数据局 - 政法下某部门 某项目详情 页面地址：/manage/bill-center/list/project/201909/207/94385e46-34f4-41a5-8a7c-ead8c591c542/省委政法委/5052/钱江潮/projectResource/cn-hangzhou-zwynet-d01/2
// 一级部门 - 政法下某部门 某项目详情 页面地址：/manage/bill-center/myBill/project/201909/9096/19c697a3-9988-43aa-967f-a5db846a22a5/76/浙江省公共数据共享交换平台/projectResource/cn-hangzhou-zjzwy01-d01
export const DEPT_PRO_MAP = params => {
  const list = DEPT_DETAIL_LIST(params);
  const { billNo, seqno, department, unitId, departmentId, ocFinId } = params;
  if (department && !unitId) {
    // 大数据局 下部门 某项目
    return list.concat({
      title: department,
      href: `/manage/bill-center/list/department/${billNo}/${seqno}/${ocFinId}/${departmentId}/${department}/detail`,
    });
  }
  if (department && unitId === '2') {
    // 大数据局 下政法 某部门 某项目
    return list.concat({
      title: department,
      href: `/manage/bill-center/list/department/${billNo}/${seqno}/${ocFinId}/${departmentId}/${department}/detail/${unitId}`,
    });
  }
  if (departmentId) {
    return list.concat({
      title: getTitle(billNo),
      href: `/manage/bill-center/myBill/details/${billNo}/${seqno}/${departmentId}`,
    });
  }
  return list;
};


// 账单核对
export const DEPT_DETAIL_LIST_CHECK = {
  title: '账单核对',
  href: '/manage/bill-center/billcheck',
};

export const ALL_DEPT_DETAIL_MAP_CHECK = params => {

  return [ DEPT_DETAIL_LIST_CHECK ,{ title:getTitle(params.billNo),href:`/manage/bill-center/billcheck/detail/${params.type}?billNo=${params.billNo}`}];
};


// 部门账单
export const DEPT_DETAIL_LIST_NEWDEPARTBILL = {
  title: '部门账单',
  href: '/manage/bill-center/newDepartBill',
};

export const ALL_DEPT_DETAIL_MAP_NEWDEPARTBILL = params => {
  return [ DEPT_DETAIL_LIST_NEWDEPARTBILL ,{ title:getTitle(params.billNo),href:`/manage/bill-center/newDepartBill/details/project?billNo=${params.billNo}`}];
};


// 新版账单统计
export const BILL_STATIC_DETAIL_INDEX = {
  title: '账单统计',
  href: '/manage/bill-center/newbillstatistics',
};

