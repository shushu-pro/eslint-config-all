module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
  },
  extends: [
    "eslint:recommended",
    "airbnb-base",
    "plugin:promise/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: ["promise", "prettier"],
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  rules: {
    "no-console": [2, { allow: ["warn", "error"] }],

    // 允许累计运算符，++，--
    "no-plusplus": 0,

    // 允许无限循环条件
    "no-constant-condition": ["error", { checkLoops: false }],

    // 允许函数定义在后面
    "no-use-before-define": 0,

    // 允许函数返回不一致的值
    "consistent-return": 0,

    // 允许表达式判断条件
    "no-cond-assign": [2, "except-parens"],

    // 重名变量使用警告
    "no-shadow": 1,

    // 允许赋值返回值，在惰性加载重写函数的情况下特别有用
    "no-return-assign": [2, "except-parens"],

    // 允许for in操作
    "guard-for-in": 0,

    "no-restricted-syntax": [2, "WithStatement"],

    // 允许文件中有多个类声明
    "max-classes-per-file": 0,

    // 允许多重赋值
    "no-multi-assign": 0,

    // 允许下划线
    "no-underscore-dangle": 0,

    // 允许修改对象型参数的属性
    "no-param-reassign": [1, { props: false }],

    // 修改循环中的异步调用为警告
    "no-await-in-loop": 1,

    // 修改未使用变量为警告
    "no-unused-vars": [1, { args: "none" }],

    // 允许没有default
    "default-case": 0,

    // 允许方法中不使用this
    "class-methods-use-this": 0,

    // 允许表达式调用
    "no-unused-expressions": [
      2,
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],

    // 允许直接使用new
    "no-new": 0,

    "no-continue": 0,

    "no-sequences": 1,

    // 忽略导入扩展名
    "import/extensions": [
      "error",
      "never",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
        css: "ignorePackages",
      },
    ],

    // 'import/default': 2,
    "import/prefer-default-export": 0,

    "@typescript-eslint/explicit-module-boundary-types": 0,

    "promise/always-return": 0,
    // 'promise/no-return-wrap': 'error',
    // 'promise/param-names': 'error',
    "promise/catch-or-return": 0,
    // 'promise/no-native': 'off',
    "promise/no-nesting": "off",
    // 'promise/no-promise-in-callback': 'warn',
    // 'promise/no-callback-in-promise': 'warn',
    "promise/avoid-new": 0,
    // 'promise/no-new-statics': 'error',
    // 'promise/no-return-in-finally': 'warn',
    // 'promise/valid-params': 'warn',

    "prettier/prettier": "error",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": 0,
      },
    },
  ],
  settings: {
    // 'import/extensions': ['.js', '.jsx'],
    "import/resolver": {
      // alias: {
      //   map: [['@', './src']],
      //   extensions: ['.js', '.jsx', '.json '],
      // },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },

    // 忽略导入类型错误提示
    "import/ignore": [/\.(scss|less|css)$/],
  },
};
