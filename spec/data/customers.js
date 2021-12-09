const random = require('./random')
module.exports = {
  customer: (opts) => ({
    email: `testEmail+${random.randomString()}@securionpay.com`,
    ...opts
  })
}
