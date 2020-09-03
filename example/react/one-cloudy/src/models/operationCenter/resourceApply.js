// import { routerRedux } from 'dva/router';
import {
  submitApply,
  // queryResouce,
  queryAllProjectList,
  queryRegion,
  queryProductSpec,
  productCategory,
  getVpc,
  getVm,
  getSecurityGroup,
  getOtherProductlist,
  getClusterList,
  getGroupsSpecType,
  getDescription,
  getRDSInstanceList,
  getSkyNetNum,
  queryDtDeptList,
  queryOcDeptList,
} from '@/services/OperationCenter/resourceApply'
import {
  getCloudProdInstList,
} from '@/services/operation-center/resource-info/index'

// function getStr(item) {
//   return item.substring(0, 1).toUpperCase() + item.substring(1);
// }

// export function normal(selectedProjectInfo, productList) {
//   return null;
// }

import { transform, transformSelectedProductList } from '@/components/OperationCenter/Product/base/_constant'
import api from '@/api'
function getPrams (payload, regionData) {
  const { areaId, regionId } = payload
  const areaData = regionData.find(item => item.id === areaId)
  const regionsData = areaData && areaData.regions.find(item => item.id === regionId)
  const param = {
    ...payload,
    areaId: areaData && areaData.dictId,
    regionId: regionsData && regionsData.dictId,
  }
  return param
}

function getRDSPrams (payload, regionData) {
  const { areaId, regionId } = payload
  const areaData = regionData.find(item => item.id === areaId)
  const regionsData = areaData && areaData.regions.find(item => item.id === regionId)
  const param = {
    regionId: regionsData && regionsData.dictId,
  }
  return param
}

export default {
  namespace: 'resourceApply',

  state: {
    // form.create()生成的对象,用于在表单外部处理表单
    form: {},
    // 批量申请中填写的项目信息
    selectedProjectInfo: {
      commonInfo: {},
    },
    // 批量申请中已选择的产品数据
    selectedProductList: {},
    // 批量申请信息确认的数据
    previewData: [],
    // 已经添加的所有资源数据
    resourceList: {},
    // 选择项目名称的数据
    projectList: [],
    // vmList
    vmList: [],
    // 安全组
    securityGroupList: [],
    // 其他产品资源列表
    otherProductList: [],
    // 选择区域的数据
    regionData: [],
    productList: [],
    // 规格字段
    resourceData: [],
    // 异地备份提交的数据
    recoveryList: {},
    rdsReadOnlyList: [],
    instanceQuantity: 0, // skynet实例个数
    isRead: true, // 资源提交责任阅读状态
    hostNum: 32, // ACS主机数量

    // 部门改造
    ocDeptList: [], // OC部门列表
    dtDeptList: [], // DT部门列表
    ocProjectList: [], // 对应OC部门下的项目列表

    // DataWorks
    maxcomputeProjectList: [], // 项目列表
    sfTime: undefined, // 临时释放资源的统一时间
  },

  effects: {
    // 查询项目列表deptName
    * queryAllProjectList ({ payload }, { call, put }) {
      const { resData } = yield call(queryAllProjectList, { ...payload })
      yield put({
        type: 'setter',
        payload: {
          projectList: resData,
        },
      })
    },
    // 获取区域
    * queryRegion ({ payload = {} }, { call, put }) {
      const { resData } = yield call(queryRegion, { ...payload })
      yield put({
        type: 'setter',
        payload: {
          regionData: resData,
        },
      })
    },
    // 获取dt部门接口
    * queryDtDeptList ({ payload = {} }, { call, put }) {
      const { resData } = yield call(queryDtDeptList, { ...payload })
      yield put({
        type: 'setter',
        payload: {
          dtDeptList: resData,
        },
      })
      return resData
    },
    * queryOcDeptList ({ payload = {} }, { call, put }) {
      const ocDeptList = yield call(api.queryOcDeptList, { ...payload })
      yield put({
        type: 'setter',
        payload: {
          ocDeptList,
        },
      })
    },
    * getOcProjectList ({ payload = {} }, { call, put }) {
      const ocProjectList = yield call(api.getOcProjectList, { ...payload })
      yield put({
        type: 'setter',
        payload: {
          ocProjectList,
        },
      })
    },


    // 获取产品列表
    * queryProductCategory ({ payload, callback }, { call, put }) {
      const { resData } = yield call(productCategory)
      callback && callback(resData)
      resData
        ? resData[0].children.map(item => {
          const index = resData.findIndex(items => item.productGroupId === items.id)
          resData[index].children = (resData[index].children || []).concat(item)
        })
        : []
      const productList = resData
      yield put({
        type: 'setter',
        payload: {
          productList,
        },
      })
      return resData
    },
    /* eslint-enable */
    // 获取对应区域对应产品的规格
    * queryResouce ({ payload = {} }, { call, put }) {
      const { resData } = yield call(queryProductSpec, {
        ...payload,
      })
      // const { productType } = payload;

      // const newData = {};
      // data.resData.map((item) => {
      //   newData[item.identifiedKey] = item
      // });
      yield put({
        type: 'setter',
        payload: {
          resourceData: resData,
        },
      })
      return {
        resData,
      }
    },

    // 提交申请(单个和批量同一个函数)
    * submitApply ({ payload = {} }, { call, select }) {
      // 需要修改的逻辑
      const { applyType } = payload
      let { sendData = {} } = payload
      // 单个申请参数直接通过payload取

      // 批量的参数直接从redux里取
      if (applyType === 'batch') {
        const selectedProjectInfo = yield select(
          ({ resourceApply }) => resourceApply.selectedProjectInfo,
        )
        const selectedProductList = yield select(
          ({ resourceApply }) => resourceApply.selectedProductList,
        )
        const sfTime = yield select(
          ({ resourceApply }) => resourceApply.sfTime,
        )
        const res = transformSelectedProductList(selectedProductList, sfTime)
        sendData = {
          ...selectedProjectInfo,
          ...res,
          releaseDate: sfTime,
        }
      }

      const data = yield call(api.submitApply, sendData)
      return data
    },
    * getVpc ({ payload = {} }, { put, call, select }) {
      // 浏览器清除缓存信息会导致state中的regionData为空，导致getPrams处理后的数据出现undefined，所以这里在取之前先强制请求一次以保证regionData一定不为空
      // const { resData } = yield call(queryRegion, { ...payload });
      // yield put({
      //   type: 'setter',
      //   payload: {
      //     regionData: resData,
      //   },
      // });
      // const regionData = yield select(({ resourceApply }) => resourceApply.regionData);


      const data = yield call(getVpc, payload)
      return data
    },
    * getVm ({ payload = {} }, { put, call, select }) {
      // const { resData } = yield call(queryRegion, { ...payload });
      // yield put({
      //   type: 'setter',
      //   payload: {
      //     regionData: resData,
      //   },
      // });
      // const regionData = yield select(({ resourceApply }) => resourceApply.regionData);
      const data = yield call(api.getVmByVSwitch, payload)
      return data
    },
    * getSecurityGroup ({ payload = {} }, { call, put }) {
      const { resData = [] } = yield call(getSecurityGroup, payload)
      yield put({
        type: 'setter',
        payload: {
          securityGroupList: transform(resData),
        },
      })
    },
    * getOtherProductlist (action, { call, put }) {
      const { resData = [] } = yield call(getOtherProductlist)
      const dataList = resData.map(o => ({
        key: o.categoryId,
        value: o.productName,
      }))
      yield put({
        type: 'setter',
        payload: {
          otherProductList: dataList,
        },
      })
    },
    * getClusterList ({ payload = {} }, { call }) {
      const data = yield call(getClusterList, payload)
      return data
    },
    * getGroupsSpecType ({ payload = {} }, { call }) {
      const data = yield call(getGroupsSpecType, payload)
      return data
    },

    // RDS只读实例获取RDS列表
    * getRDSInstanceList ({ payload = {} }, { call, put, select }) {
      const regionData = yield select(({ resourceApply }) => resourceApply.regionData)
      const { resData } = yield call(getRDSInstanceList, getRDSPrams(payload, regionData))
      yield put({
        type: 'setter',
        payload: {
          rdsReadOnlyList: resData,
        },
      })
      return resData
    },

    // 获取资源申请时的用户责任说明
    * getDescription ({ payload }, { call }) {
      const { paramValue } = yield call(getDescription, payload)
      return paramValue
    },

    // 资源提交责任阅读状态
    * readDocState ({ payload }, { put }) {
      yield put({
        type: 'setter',
        payload: {
          isRead: payload.isRead,
        },
      })
    },

    // ACS主机数量
    * getACSHostNum ({ payload }, { put }) {
      yield put({
        type: 'setter',
        payload: {
          hostNum: payload.hostNum,
        },
      })
    },
    // 设置skynet实例的数量
    * setSkyNetNum ({ payload }, { put }) {
      yield put({
        type: 'setter',
        payload: {
          instanceQuantity: payload.instanceQuantity,
        },
      })
    },
    // 查询skynet实例的数量
    * getSkyNetNum ({ payload }, { call, put }) {
      const { resData } = yield call(getSkyNetNum, { ...payload })
      yield put({
        type: 'setSkyNetNum',
        payload: { ...payload, instanceQuantity: resData },
      })
      return resData
    },

    // DataWork获取Maxcompute项目列表 getCloudProdInstList

    * getMaxcomputeProjectList ({ payload }, { put, call }) {
      const { resData } = yield call(getCloudProdInstList, payload)
      yield put({
        type: 'setter',
        payload: {
          maxcomputeProjectList: resData,
        },
      })
      return resData
    },
  },

  reducers: {
    setter (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    // 保存已选择的产品数据（批量）
    pushSelectedProductList (state, { payload = {} }) {
      const { selectedProductList, previewData, sfTime } = payload
      return {
        ...state,
        selectedProductList,
        previewData,
        sfTime,
      }
    },
    // 重置已选择的产品数据
    resetProduct (state) {
      return {
        ...state,
        selectedProjectInfo: {
          commonInfo: {},
        },
        selectedProductList: {},
        previewData: [],
        projectInfo: {},
        sfTime: undefined,
      }
    },
  },
}
