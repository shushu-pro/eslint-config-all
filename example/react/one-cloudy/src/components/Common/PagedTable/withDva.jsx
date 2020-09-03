import { connect } from 'dva'
export default function withDva (namespace, effect = 'pagedQuery', loadingAction) {
  function mapStateToProps (state) {
    const { loading } = state
    const model = state[namespace]
    const { totalCount, pageNo, pageSize, tableList, selectedRowKeys } = model
    return {
      tableList,
      loading: loadingAction ? loadingAction(loading) : loading.models[namespace] || false,
      totalCount,
      pageNo,
      pageSize,
      selectedRowKeys,
    }
  }

  function mapDispatchToProps (dispatch) {
    return {
      pagedQuery (payload) {
        return dispatch({
          type: `${namespace}/${effect}`,
          payload,
        })
      },

      changeSelectedRowKeys (selectedRowKeys) {
        return dispatch({
          type: `${namespace}/changeSelectedRowKeys`,
          payload: {
            selectedRowKeys,
          },
        })
      },
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )
}
