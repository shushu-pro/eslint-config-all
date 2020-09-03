const basic = require('./rules/basic')
const standard = require('./rules/standard')
const vue = require('./rules/vue')

module.exports = {
  extends: [ 'standard', 'plugin:vue/recommended' ],
  rules: {
    ...basic,
    ...standard,
    ...vue,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
}
