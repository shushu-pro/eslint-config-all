module.exports = {
  indent: [ 'error', 2, { // 建议2个空格
    SwitchCase: 1,
    VariableDeclarator: 1,
    outerIIFEBody: 1,
    MemberExpression: 1,
    FunctionDeclaration: { parameters: 1, body: 1 },
    FunctionExpression: { parameters: 1, body: 1 },
    CallExpression: { arguments: 1 },
    ArrayExpression: 1,
    ObjectExpression: 1,
    ImportDeclaration: 1,
    flatTernaryExpressions: false,
    ignoreComments: false,
  } ],
  semi: [ 'error', 'never' ], // 未必须的分号建议省略，代码看上去更干净
  quotes: [ 1, 'single' ], // 引号类型 `` '' ''
  'no-console': [ 'error', { allow: [ 'warn', 'error' ] } ],
  'no-unused-vars': 'warn', // 未被使用的变量，在开发过程中，某些未开发到的逻辑，事先定义了变量
  'semi-style': [ 'error', 'first' ], // 因为使用省略分号的策略，所以吧必要的分号写在行首
  'comma-dangle': [ 'warn', 'always-multiline' ], // 对象或数组内部添加尾逗号，这样在添加新字段或数组项会比较方便
  'array-bracket-spacing': [ 'error', 'always' ], // 因为强制使用尾逗号，所以在数组前后留白
  'no-unreachable': 'warn', // 有时候临时不执行后续的代码，使用return终止
  'guard-for-in': 'off', // for in 内部必须使用hasOwnProperty进行过滤，感觉不是太必要
  'no-new': 'off', // 某些第三方组件，确实存在不需要返回对象的情况，比如swiper
  'return await': 'off', // 某些情况下，确实存在返回一个异步执行函数的执行结果的情况
  // 'line-comment-position': ['error', { 'position': 'beside' }], // 当行注释要跟在代码后面
  // 'linebreak-style': ['error', 'unix'], // 必须使用\n作为换行符，不解释
  'no-multiple-empty-lines': [ 'error', { max: 2, maxEOF: 0 } ], // 最多2个空白行
  'prefer-template': 'error', // 使用模板字符串来创建字符串
  'key-spacing': [ 'error', { beforeColon: false, afterColon: true } ], // 控制键的冒号后面留存空格
  'object-curly-spacing': [ 'error', 'always' ], // 控制对象花括号前后留白
  'arrow-spacing': [ 'error', { before: true, after: true } ], // 箭头函数
  'no-prototype-builtins': 'off',
  'no-return-assign': 'off', // 允许return中使用赋值操作
  'no-sequences': 'off', // Array.reduce中使用逗号运算符
  'linebreak-style': 'off', // 换行风格
  'max-len': [ 'error', { code: 120 } ], // 一行最大字符数
  'consistent-return': 'off',
  'no-mixed-operators': 'off',
  'no-plusplus': 'off',
  'default-case': 'off',
  'max-classes-per-file': 'off',
  'class-methods-use-this': 'off',
}
