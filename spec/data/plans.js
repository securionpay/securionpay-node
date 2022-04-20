const random = require('./random')
module.exports = {
  plan: (opts) => ({
    amount: 1000,
    currency: 'EUR',
    interval: 'month',
    name: `test plan ${random.randomString()}`,
    ...opts
  })
}
