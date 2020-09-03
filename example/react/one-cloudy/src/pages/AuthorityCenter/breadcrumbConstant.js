/**
 * 面包屑配置
 * 每个页面最后的一个面包屑为上一个页面
 */
// import { getTitle, FINANCE_FILED_MAP_TEXT } from './constant';

// 部门组织管理
export const DEPARTMENT_PATH = {
  title: '部门组织管理',
  href: '/manage/authority-center/departmentmanage',
};

// 项目管理
export const PROJECT_PATH = {
  title: '项目管理',
  href: '/manage/operation-center/projectmanage',
};

// 项目管理-详情页面
export const PROJECT_PATH_DETAIL = params => {
  const { id, name } = params;
  return [
    PROJECT_PATH,
    {
      title: name,
      href: `/manage/operation-center/projectmanage/details?id=${id}&name=${name}`,
    },
  ];
};


// 用户管理
export const USER_PATH = {
  title: '用户管理',
  href: '/manage/authority-center/usermanage',
};
