/**
 * 分页Table的model实现
 * 并且统一分页方案，后端有不同分页参数。之所以在这里做而不是services，
 * 是为了保持services更加简单，让model来控制数据参数，做统一处理。
 * 此外，只有Table/List有分页，都可以使用这个model来处理
 */

/**
 *
 * @param {Object} owner 拥有pagedTable的model
 * @param {String} queryUrl 请求的Url
 * @param {String} dataField 请求返回后，数据字段，默认是pagedData
 */
export default function mergePagedTable (queryUrl, dataField = 'list') {
  if (!queryUrl) return {}
  return (owner) => {
    if (!owner) return {}
    const pagedTable = {
      state: {
        pageNo: 1, // 默认第一页
        pageSize: 10, // 默认大小为10
        totalCount: 0, // 总数为0
        tableList: [], // 开通小程序模版列表
        selectedRowKeys: [], // 选中的数据
      },
      effects: {
        * pagedQuery ({ payload }, { call, put, select }) {
          const pagedState = yield select((state) => state[owner.namespace])
          const { pageSize = pagedState.pageSize, pageNo = pagedState.pageNo, ...others } =
            payload || {}
          const { resData } = yield call(queryUrl, {
            ...others,
            page: pageNo,
            limit: pageSize,
          })
          const dataObj = resData || {}
          const { totalCount } = dataObj
          const data = dataObj[dataField]
          yield put({
            type: 'pagedQuerySuccess',
            payload: {
              pageNo,
              pageSize,
              totalCount,
              tableList: data,
            },
          })
        },
      },
      reducers: {
        pagedQuerySuccess (state, { payload }) {
          return { ...state, ...payload }
        },
        changeSelectedRowKeys (state, { payload }) {
          return { ...state, ...payload }
        },
        clearSelectedRowKeys (state) {
          return { ...state, selectedRowKeys: [] }
        },
      },
    }
    const { state, effects, reducers } = owner
    owner.state = {
      ...pagedTable.state,
      ...state,
    }
    owner.effects = {
      ...pagedTable.effects,
      ...effects,
    }
    owner.reducers = {
      ...pagedTable.reducers,
      ...reducers,
    }
    return owner
  }
}
