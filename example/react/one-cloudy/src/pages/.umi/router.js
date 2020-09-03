import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import RendererWrapper0 from 'C:/sschen86/work-git/onecloud-feat3/src/pages/.umi/LocaleWrapper.jsx';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
          LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/BasicLayout').default,
    Routes: [require('../Authorized').default],
    routes: [
      {
        path: '/',
        redirect: '/manage/home',
        exact: true,
      },
      {
        path: '/manage/',
        redirect: '/manage/home',
        exact: true,
      },
      {
        path: '/manage/home',
        name: 'home',
        hideInMenu: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Welcome" */ '../Welcome'),
              LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                .default,
            })
          : require('../Welcome').default,
        exact: true,
      },
      {
        path: '/manage/myresource',
        name: 'myresource',
        icon: 'icondalei-quanbuchanpin',
        routes: [
          {
            path: '/manage/myresource/resourceinstance',
            name: 'resourceinstance',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/manage/myresource/resourceinstance',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../MyResource/ResourceInstance'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../MyResource/ResourceInstance').default,
                exact: true,
              },
              {
                path: '/manage/myresource/resourceinstance/changeSet',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../MyResource/ResourceInstance/changeSet'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../MyResource/ResourceInstance/changeSet').default,
                exact: true,
              },
              {
                path: '/manage/myresource/resourceinstance/changeOwner',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../MyResource/ResourceInstance/changeOwner'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../MyResource/ResourceInstance/changeOwner')
                      .default,
                exact: true,
              },
              {
                path: '/manage/myresource/resourceinstance/recovery',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../MyResource/ResourceInstance/recovery'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../MyResource/ResourceInstance/recovery').default,
                exact: true,
              },
              {
                path: '/manage/myresource/resourceinstance/success',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../MyResource/ResourceInstance/success'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../MyResource/ResourceInstance/success').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('C:/sschen86/work-git/onecloud-feat3/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/manage/myresource/operationrecord',
            name: 'operationrecord',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/manage/myresource/operationrecord',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../MyResource/OperationRecord'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../MyResource/OperationRecord').default,
                exact: true,
              },
              {
                path: '/manage/myresource/operationrecord/recorddetail',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../MyResource/OperationRecord/DetailTabs'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../MyResource/OperationRecord/DetailTabs').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('C:/sschen86/work-git/onecloud-feat3/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/manage/myresource/resourceinstancemanage',
            name: 'resourceinstancemanage',
            authority: ['safeOperationsStaff'],
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/manage/myresource/resourceinstancemanage',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../MyResource/OperationRecordManage'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../MyResource/OperationRecordManage').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('C:/sschen86/work-git/onecloud-feat3/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            component: () =>
              React.createElement(
                require('C:/sschen86/work-git/onecloud-feat3/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/manage/operation-center',
        icon: 'iconyijicaidan-yunweizhongxin',
        name: 'operation-center',
        authority: [
          'resourceApply',
          'resourceReview',
          'resourceApprove',
          'resourceFeedback',
          'readOnlyRole',
          'TLReview',
          'zwManager',
          'zfManager',
          'gaManager',
          'deptManager',
        ],
        routes: [
          {
            path: '/manage/operation-center/feekback',
            name: 'feekback',
            hideInMenu: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__OperationCenter__Feekback" */ '../OperationCenter/Feekback'),
                  LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                    .default,
                })
              : require('../OperationCenter/Feekback').default,
            exact: true,
          },
          {
            path: '/manage/operation-center/operation-order',
            name: 'operation-order',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/manage/operation-center/operation-order',
                redirect: '/manage/operation-center/operation-order/list',
                exact: true,
              },
              {
                path: '/manage/operation-center/operation-order/list',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../OperationCenter/OperationOrder/List'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../OperationCenter/OperationOrder/List').default,
                exact: true,
              },
              {
                path:
                  '/manage/operation-center/operation-order/details/:orderId/:selectPanel?',
                name: 'detail',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../OperationCenter/OperationOrder/DetailIndex'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../OperationCenter/OperationOrder/DetailIndex')
                      .default,
                routes: [
                  {
                    path:
                      '/manage/operation-center/operation-order/details/:orderId/:selectPanel?',
                    redirect:
                      '/manage/operation-center/operation-order/details/:orderId/detail',
                    exact: true,
                  },
                  {
                    path:
                      '/manage/operation-center/operation-order/details/:orderId/detail',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../OperationCenter/OperationOrder/Detail'),
                          LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../OperationCenter/OperationOrder/Detail')
                          .default,
                    exact: true,
                  },
                  {
                    path:
                      '/manage/operation-center/operation-order/details/:orderId/process',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../OperationCenter/OperationOrder/Process'),
                          LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../OperationCenter/OperationOrder/Process')
                          .default,
                    exact: true,
                  },
                  {
                    path:
                      '/manage/operation-center/operation-order/details/:orderId/project',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../OperationCenter/OperationOrder/ProjectDetail'),
                          LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../OperationCenter/OperationOrder/ProjectDetail')
                          .default,
                    exact: true,
                  },
                  {
                    path:
                      '/manage/operation-center/operation-order/details/:orderId/feekback',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../OperationCenter/OperationOrder/Feekback'),
                          LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../OperationCenter/OperationOrder/Feekback')
                          .default,
                    exact: true,
                  },
                  {
                    component: () =>
                      React.createElement(
                        require('C:/sschen86/work-git/onecloud-feat3/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                          .default,
                        { pagesPath: 'src/pages', hasRoutesInConfig: true },
                      ),
                  },
                ],
              },
              {
                path:
                  '/manage/operation-center/operation-order/update/:orderId',
                name: 'update',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../OperationCenter/OperationOrder/Update'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../OperationCenter/OperationOrder/Update').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('C:/sschen86/work-git/onecloud-feat3/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/manage/operation-center/resource-apply',
            name: 'resource-apply',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__OperationCenter__ResourceApply__index" */ '../OperationCenter/ResourceApply/index'),
                  LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                    .default,
                })
              : require('../OperationCenter/ResourceApply/index').default,
            authority: ['resourceApply'],
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/manage/operation-center/resource-apply',
                redirect: '/manage/operation-center/resource-apply/selectWay',
                exact: true,
              },
              {
                path: '/manage/operation-center/resource-apply/selectWay',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__OperationCenter__ResourceApply__index" */ '../OperationCenter/ResourceApply/SelectWay'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../OperationCenter/ResourceApply/SelectWay')
                      .default,
                exact: true,
              },
              {
                path: '/manage/operation-center/resource-apply/single',
                name: 'single',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__OperationCenter__ResourceApply__index" */ '../OperationCenter/ResourceApply/Single/Apply'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../OperationCenter/ResourceApply/Single/Apply')
                      .default,
                exact: true,
              },
              {
                path:
                  '/manage/operation-center/resource-apply/product/:type/:productName',
                name: 'single',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__OperationCenter__ResourceApply__index" */ '../OperationCenter/ResourceApply/Single/Product'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../OperationCenter/ResourceApply/Single/Product')
                      .default,
                exact: true,
              },
              {
                path: '/manage/operation-center/resource-apply/success',
                name: 'single',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__OperationCenter__ResourceApply__index" */ '../OperationCenter/ResourceApply/Single/Success'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../OperationCenter/ResourceApply/Single/Success')
                      .default,
                exact: true,
              },
              {
                path: '/manage/operation-center/resource-apply/batch',
                name: 'batch',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__OperationCenter__ResourceApply__index" */ '../OperationCenter/ResourceApply/Batch'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../OperationCenter/ResourceApply/Batch').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('C:/sschen86/work-git/onecloud-feat3/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/manage/operation-center/projectmanage',
            name: 'projectmanage',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/manage/operation-center/projectmanage',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../AuthorityCenter/ProjectManage'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../AuthorityCenter/ProjectManage').default,
                exact: true,
              },
              {
                path: '/manage/operation-center/projectmanage/details',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../AuthorityCenter/ProjectManage/Details'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../AuthorityCenter/ProjectManage/Details').default,
                exact: true,
              },
              {
                path: '/manage/operation-center/projectmanage/createproject',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../AuthorityCenter/ProjectManage/CreateProject'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../AuthorityCenter/ProjectManage/CreateProject')
                      .default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('C:/sschen86/work-git/onecloud-feat3/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/manage/operation-center/quotaManage',
            name: 'quota-manage',
            authority: ['zwManager', 'zfManager', 'gaManager', 'deptManager'],
            routes: [
              {
                path: '/manage/operation-center/quotaManage',
                redirect: '/manage/operation-center/quotaManage/check',
                exact: true,
              },
              {
                path: '/manage/operation-center/quotaManage/apply',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../OperationCenter/QuotaManage/Apply'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../OperationCenter/QuotaManage/Apply').default,
                exact: true,
              },
              {
                path:
                  '/manage/operation-center/quotaManage/applyDetail/:applyId',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../OperationCenter/QuotaManage/ApplyDetail'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../OperationCenter/QuotaManage/ApplyDetail')
                      .default,
                exact: true,
              },
              {
                path: '/manage/operation-center/quotaManage/:type',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../OperationCenter/QuotaManage'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../OperationCenter/QuotaManage').default,
                routes: [
                  {
                    path: '/manage/operation-center/quotaManage/check',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../OperationCenter/QuotaManage/Check'),
                          LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../OperationCenter/QuotaManage/Check').default,
                    exact: true,
                  },
                  {
                    path: '/manage/operation-center/quotaManage/applyList',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../OperationCenter/QuotaManage/ApplyList'),
                          LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../OperationCenter/QuotaManage/ApplyList')
                          .default,
                    exact: true,
                  },
                  {
                    path: '/manage/operation-center/quotaManage/distribute',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../OperationCenter/QuotaManage/Distribute'),
                          LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../OperationCenter/QuotaManage/Distribute')
                          .default,
                    exact: true,
                  },
                  {
                    path:
                      '/manage/operation-center/quotaManage/subordinateDeptCheck',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../OperationCenter/QuotaManage/SubordinateDeptCheck'),
                          LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../OperationCenter/QuotaManage/SubordinateDeptCheck')
                          .default,
                    exact: true,
                  },
                  {
                    component: () =>
                      React.createElement(
                        require('C:/sschen86/work-git/onecloud-feat3/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                          .default,
                        { pagesPath: 'src/pages', hasRoutesInConfig: true },
                      ),
                  },
                ],
              },
              {
                component: () =>
                  React.createElement(
                    require('C:/sschen86/work-git/onecloud-feat3/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            component: () =>
              React.createElement(
                require('C:/sschen86/work-git/onecloud-feat3/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/manage/bill-center',
        icon: 'iconyijicaidan-zhangdanzhongxin',
        name: 'bill-center',
        authority: [
          'operationsAndMaintenanceStaff',
          'zwManager',
          'zwManager',
          'deptCW',
          'gaManager',
          'operationsStaff',
        ],
        routes: [
          {
            path: '/manage/bill-center/cloud-resource',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__BillCenter__cloud-resource" */ '../BillCenter/cloud-resource'),
                  LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                    .default,
                })
              : require('../BillCenter/cloud-resource').default,
            name: 'cloud-resource',
            hideChildrenInMenu: true,
            authority: [
              'deptCW',
              'operationsAndMaintenanceStaff',
              'operationsStaff',
            ],
            exact: true,
          },
          {
            path: '/manage/bill-center/newDepartBill',
            name: 'newDepartBill',
            hideChildrenInMenu: true,
            authority: [
              'operationsAndMaintenanceStaff',
              'zwManager',
              'zwManager',
              'deptCW',
              'gaManager',
              'operationsStaff',
            ],
            routes: [
              {
                path: '/manage/bill-center/newDepartBill',
                name: 'list',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../BillCenter/NewDepartBill/List'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../BillCenter/NewDepartBill/List').default,
                exact: true,
              },
              {
                path: '/manage/bill-center/newDepartBill/details/:type',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../BillCenter/NewDepartBill/DetailsIndex'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../BillCenter/NewDepartBill/DetailsIndex').default,
                routes: [
                  {
                    path: '/manage/bill-center/newDepartBill/details/overview',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../BillCenter/NewDepartBill/Overview'),
                          LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../BillCenter/NewDepartBill/Overview').default,
                    exact: true,
                  },
                  {
                    path: '/manage/bill-center/newDepartBill/details/project',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../BillCenter/NewDepartBill/Project'),
                          LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../BillCenter/NewDepartBill/Project').default,
                    exact: true,
                  },
                  {
                    path: '/manage/bill-center/newDepartBill/details/instance',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../BillCenter/NewDepartBill/Instance'),
                          LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../BillCenter/NewDepartBill/Instance').default,
                    exact: true,
                  },
                  {
                    component: () =>
                      React.createElement(
                        require('C:/sschen86/work-git/onecloud-feat3/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                          .default,
                        { pagesPath: 'src/pages', hasRoutesInConfig: true },
                      ),
                  },
                ],
              },
              {
                path: '/manage/bill-center/newDepartBill/billdetails/:billNo',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../BillCenter/NewDepartBill/ProjectIndex'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../BillCenter/NewDepartBill/ProjectIndex').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('C:/sschen86/work-git/onecloud-feat3/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/manage/bill-center/statistics',
            name: 'statistics',
            hideChildrenInMenu: true,
            authority: ['operationsAndMaintenanceStaff', 'operationsStaff'],
            routes: [
              {
                path: '/manage/bill-center/statistics',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../BillCenter/Statistics/List'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../BillCenter/Statistics/List').default,
                exact: true,
              },
              {
                path: '/manage/bill-center/statistics/:billNo',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../BillCenter/Statistics/Detail'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../BillCenter/Statistics/Detail').default,
                exact: true,
              },
              {
                path:
                  '/manage/bill-center/statistics/:billNo/resList/:departmentId/:department',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../BillCenter/Statistics/ResList'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../BillCenter/Statistics/ResList').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('C:/sschen86/work-git/onecloud-feat3/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/manage/bill-center/billcheck',
            name: 'billcheck',
            hideChildrenInMenu: true,
            authority: ['operationsAndMaintenanceStaff', 'operationsStaff'],
            routes: [
              {
                path: '/manage/bill-center/billcheck',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../BillCenter/BillCheck/List'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../BillCenter/BillCheck/List').default,
                exact: true,
              },
              {
                path: '/manage/bill-center/billCheck/detail/:type',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../BillCenter/BillCheck/DetailsIndex'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../BillCenter/BillCheck/DetailsIndex').default,
                routes: [
                  {
                    path: '/manage/bill-center/billCheck/detail/overview',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../BillCenter/BillCheck/Overview'),
                          LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../BillCenter/BillCheck/Overview').default,
                    exact: true,
                  },
                  {
                    path: '/manage/bill-center/billCheck/detail/area',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../BillCenter/BillCheck/Detail'),
                          LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../BillCenter/BillCheck/Detail').default,
                    exact: true,
                  },
                  {
                    path: '/manage/bill-center/billCheck/detail/product',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../BillCenter/BillCheck/Detail'),
                          LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../BillCenter/BillCheck/Detail').default,
                    exact: true,
                  },
                  {
                    component: () =>
                      React.createElement(
                        require('C:/sschen86/work-git/onecloud-feat3/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                          .default,
                        { pagesPath: 'src/pages', hasRoutesInConfig: true },
                      ),
                  },
                ],
              },
              {
                path:
                  '/manage/bill-center/billCheck/billdetails/:type/:billNo/:id',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../BillCenter/BillCheck/BillDetail'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../BillCenter/BillCheck/BillDetail').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('C:/sschen86/work-git/onecloud-feat3/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            component: () =>
              React.createElement(
                require('C:/sschen86/work-git/onecloud-feat3/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/manage/authority-center',
        icon: 'iconyijicaidan-yunweizhongxin',
        name: 'authority-center',
        authority: [
          'operationsStaff',
          'operationsAndMaintenanceStaff',
          'deptManager',
        ],
        routes: [
          {
            path: '/manage/authority-center/departmentmanage',
            name: 'departmentmanage',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/manage/authority-center/departmentmanage',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../AuthorityCenter/DepartmentManage'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../AuthorityCenter/DepartmentManage').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('C:/sschen86/work-git/onecloud-feat3/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/manage/authority-center/projectmanage',
            name: 'projectmanage',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/manage/authority-center/projectmanage',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../AuthorityCenter/ProjectManage'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../AuthorityCenter/ProjectManage').default,
                exact: true,
              },
              {
                path: '/manage/authority-center/projectmanage/details',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../AuthorityCenter/ProjectManage/Details'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../AuthorityCenter/ProjectManage/Details').default,
                exact: true,
              },
              {
                path: '/manage/authority-center/projectmanage/createproject',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../AuthorityCenter/ProjectManage/CreateProject'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../AuthorityCenter/ProjectManage/CreateProject')
                      .default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('C:/sschen86/work-git/onecloud-feat3/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/manage/authority-center/usermanage',
            name: 'usermanage',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/manage/authority-center/usermanage',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../AuthorityCenter/UserManage'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../AuthorityCenter/UserManage').default,
                exact: true,
              },
              {
                path: '/manage/authority-center/usermanage/userdetail',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../AuthorityCenter/UserManage/UserDetail'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../AuthorityCenter/UserManage/UserDetail').default,
                exact: true,
              },
              {
                path: '/manage/authority-center/usermanage/createuser',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../AuthorityCenter/UserManage/CreateUser'),
                      LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../AuthorityCenter/UserManage/CreateUser').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('C:/sschen86/work-git/onecloud-feat3/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            component: () =>
              React.createElement(
                require('C:/sschen86/work-git/onecloud-feat3/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/manage/message-center',
        name: 'message-center',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__MessageCenter__List" */ '../MessageCenter/List'),
              LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                .default,
            })
          : require('../MessageCenter/List').default,
        hideInMenu: true,
        exact: true,
      },
      {
        path: '/manage/userinfo',
        name: 'userinfo',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Userinfo" */ '../Userinfo'),
              LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                .default,
            })
          : require('../Userinfo').default,
        hideInMenu: true,
        exact: true,
      },
      {
        path: '/manage/download',
        name: 'download',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__DownloadCenter" */ '../DownloadCenter'),
              LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                .default,
            })
          : require('../DownloadCenter').default,
        hideInMenu: true,
        exact: true,
      },
      {
        path: '/manage/password',
        name: 'password',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Password" */ '../Password'),
              LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                .default,
            })
          : require('../Password').default,
        hideInMenu: true,
        exact: true,
      },
      {
        path: '/manage/totp',
        name: 'totp',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Totp" */ '../Totp'),
              LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                .default,
            })
          : require('../Totp').default,
        hideInMenu: true,
        exact: true,
      },
      {
        path: '/manage/exception/500',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__Exception__models__error.js' */ 'C:/sschen86/work-git/onecloud-feat3/src/pages/Exception/models/error.js').then(
                  m => {
                    return { namespace: 'error', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__Exception__500" */ '../Exception/500'),
              LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                .default,
            })
          : require('../Exception/500').default,
        exact: true,
      },
      {
        path: '/manage/exception/404',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__Exception__models__error.js' */ 'C:/sschen86/work-git/onecloud-feat3/src/pages/Exception/models/error.js').then(
                  m => {
                    return { namespace: 'error', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__Exception__404" */ '../Exception/404'),
              LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                .default,
            })
          : require('../Exception/404').default,
        exact: true,
      },
      {
        path: '/manage/exception/403',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__Exception__models__error.js' */ 'C:/sschen86/work-git/onecloud-feat3/src/pages/Exception/models/error.js').then(
                  m => {
                    return { namespace: 'error', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__Exception__403" */ '../Exception/403'),
              LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                .default,
            })
          : require('../Exception/403').default,
        exact: true,
      },
      {
        path: '/manage/polContract',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__PolContract" */ '../PolContract'),
              LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                .default,
            })
          : require('../PolContract').default,
        hideInMenu: true,
        exact: true,
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__Exception__models__error.js' */ 'C:/sschen86/work-git/onecloud-feat3/src/pages/Exception/models/error.js').then(
                  m => {
                    return { namespace: 'error', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__Exception__404" */ '../Exception/404'),
              LoadingComponent: require('C:/sschen86/work-git/onecloud-feat3/src/components/PageLoading/index')
                .default,
            })
          : require('../Exception/404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('C:/sschen86/work-git/onecloud-feat3/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('C:/sschen86/work-git/onecloud-feat3/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
