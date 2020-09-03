const { extends: vueExtends, rules: vueRules } = require('./vue')
const { extends: reactExtends, rules: reactRules } = require('./react')

const configs = {
  vue: {
    extends: vueExtends,
    rules: vueRules,
  },
  react: {
    extends: reactExtends,
    rules: reactRules,
  },
}
const current = configs.react

module.exports = {
  env: {
    commonjs: true,
    es6: true,
  },
  extends: [
    ...current.extends,
  ],
  globals: {

  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    ...current.rules,
  },
}
