const basic = require('./rules/basic')
const standard = require('./rules/standard')
const react = require('./rules/react')

module.exports = {
  extends: [ 'airbnb', 'standard', 'plugin:react/recommended' ],
  rules: {
    ...basic,
    ...standard,
    ...react,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
}
