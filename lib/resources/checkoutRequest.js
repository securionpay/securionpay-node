const crypto = require('crypto')

module.exports = class CheckoutRequest {
  /**
   * @param {string} secretKey
   */
  constructor (secretKey) {
    this.secretKey = secretKey
  }

  sign (checkoutRequest) {
    const json = typeof checkoutRequest === 'object'
      ? JSON.stringify(checkoutRequest)
      : checkoutRequest

    const hmac = crypto
      .createHmac('sha256', this.secretKey)
      .update(json)
      .digest('hex')

    return (Buffer.from(hmac + '|' + json)).toString('base64')
  }
}
