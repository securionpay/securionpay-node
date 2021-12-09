const SecurionPayGateway = require('../../')
if (process.env.URL) {
  SecurionPayGateway.defaultOptions.url = process.env.URL
}
if (process.env.SECRET_KEY) {
  SecurionPayGateway.defaultOptions.secretKey = process.env.SECRET_KEY
}
