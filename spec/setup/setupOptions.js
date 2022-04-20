const SecurionPayGateway = require('../../')
if (process.env.API_URL) {
  SecurionPayGateway.defaultOptions.apiUrl = process.env.API_URL
}
if (process.env.UPLOADS_URL) {
  SecurionPayGateway.defaultOptions.uploadsUrl = process.env.UPLOADS_URL
}
if (process.env.SECRET_KEY) {
  SecurionPayGateway.defaultOptions.secretKey = process.env.SECRET_KEY
}
