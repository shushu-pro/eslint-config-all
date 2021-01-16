# @shushu.pro/eslint-config-all

## @shushu.pro/eslint-config-base

## @shushu.pro/eslint-config-react

## 功能支持

- ✔ eslint
- ✔ prettier
- ✔ typescript
- ✔ react

## 开始使用

### lib eslint 配置项

在开发 基础 js 使用

#### 安装

```bash
yarn add @shushu.pro/eslint-config-base -D
```

### react eslint 配置项

在开发 react 应用使用

#### 安装

```bash
yarn add @shushu.pro/eslint-config-react -D
```

## ESlint 配置文件

```js
// .eslintrc.js
module.exports = {
  root: true,
  extends: ["@shushu.pro/base"],
  // extends: ["@shushu.pro/react"],
  plugins: [],
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  rules: {
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
  },
  overrides: [],
  settings: {
    "import/resolver": {
      // alias: {
      //   map: [['@', './src']],
      //   extensions: ['.js', '.jsx', '.json '],
      // },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
    react: {
      version: "detect",
    },

    // 忽略导入类型错误提示
    "import/ignore": [/\.(scss|less|css)$/],
  },
};
```

## prettier 配置文件

```js
// .prettierrc.js
module.exports = {
  trailingComma: "es6",
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  endOfLine: "auto",
};
```

## 附录

- [ESLint 官方配置文档](https://cn.eslint.org/docs/user-guide/configuring)
