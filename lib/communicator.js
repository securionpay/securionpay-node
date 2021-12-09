const SecurionPayError = require('./securionpayError')
const version = require('./version')
const fetch = require('node-fetch')

module.exports = class Communicator {
  constructor (options) {
    if (!options.secretKey) throw new Error('secretKey is required')
    if (!options.url) throw new Error('url is required')

    this.options = options
  }

  async post (path, body) {
    return this.call('POST', path, JSON.stringify(body), { 'Content-Type': 'application/json' })
  }

  async get (path, params) {
    return this.call('GET', `${path}?${new URLSearchParams(params)}`)
  }

  async delete (path) {
    return this.call('DELETE', `${path}`)
  }

  async call (method, path, body = undefined, headers = {}) {
    // noinspection JSDeprecatedSymbols
    const response = await fetch(`${this.options.url}${path}`, {
      method,
      body,
      headers: {
        'User-Agent': `SecurionPay-Node/${version} (Ruby/${process.version})`,
        Authorization: `Basic ${Buffer.from(this.options.secretKey + ':').toString('base64')}`,
        ...headers
      }
    })
    const json = await response.json()

    if (response.ok) {
      return json
    } else {
      throw new SecurionPayError(json)
    }
  }
}
