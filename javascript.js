const basic = require('./rules/basic')
const standard = require('./rules/standard')

module.exports = {
  extends: [ 'standard' ],
  rules: {
    ...basic,
    ...standard,
  },
}
