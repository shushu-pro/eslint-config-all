# @shushu.pro/eslint-config-all

ESLint Config for Javascrip, React and Vue

### 开始使用

#### 安装
`yarn add @shushu.pro/eslint-config-all`

#### 创建配置文件
```js
module.exports = {
  root: true,
  extends: [
    '@shushu.pro/eslint-config-all',
  ],
  parser: 'eslint-babel',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    // 你的环境变量（包含多个预定义的全局变量）
    // browser: true,
    // node: true,
  },
  globals: {
    // 全局变量校验设置
    // jQuery: true,
    // myGlobal: false // 设置为false表示该值不能被重写
  },
  rules: {
    // 自定义规则
  },
}
```

[ESLint 官方配置文档](https://cn.eslint.org/docs/user-guide/configuring)

