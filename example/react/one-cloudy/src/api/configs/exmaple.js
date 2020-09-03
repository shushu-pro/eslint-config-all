export default {
  exampleGetData: {
    url: '/oc/resmng/stateflow/getUncommitMessage/:type',
    method: 'post',
    reqa: {
      page: true,
      pageSize: 'limit',
      type: true,
    },
    resa: {
      $strict: false,
      list: {
        age: age => `年龄：${age}`,
      },
    },
    mockData: `
        ///@code 1008
        @code 200
        @runtime{
            @data $data
            @header $header
        }
        @data{
            @name #name
        }
        @list(10)[
            @name #name
            @age #integer(10, 99)
        ]
    `,
    mock2 (params, header) {
      // params 请求的参数
      // header 请求头
      return {
        data: {
          // 响应的数据
        },
        header: {
          // 响应头
        },
      }
    },
  },
}
