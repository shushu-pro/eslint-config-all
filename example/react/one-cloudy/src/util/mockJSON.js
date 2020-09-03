// mock数据生成器
import jsonsql from '@smartx/jsonsql';

export default function mockJSON(source, params) {
  return jsonsql.compile(source).execute({
    $data: params.data,
    $header: params.header,
  });
}

// https://github.com/smartx-work/jsonsql
// 示例：通过jsonsql语法实现快速mock，内置环境变量$data(请求的数据)，$header(请求头)
// mockJSON(`
//   @code 200
//   @data{
//     @page $data.page
//     @pageSize $data.pageSize
//     @token $header.token
//     @list(10)[
//       @name #name
//     ]
//   }
// `, {
//   data: {
//     page: 1,
//     pageSize: 10
//   },
//   header: {
//     token: '#abc'
//   }
// })

// 输出：
// {
//   code: 200,
//   data: {
//     page: 1,
//     pageSize: 10,
//     token: '#abc',
//     list: [
//       {name:'随机姓名'},
//       ...
//     ]
//   }
// }