const SecurionPayError = require('./securionpayError')
const version = require('./version')
const fetch = require('node-fetch')

function removeTrailingSlash (url) {
  if (url.charAt(url.length - 1) === '/') {
    return url.substring(0, url.length - 1)
  } else {
    return url
  }
}

module.exports = class Communicator {
  constructor ({ secretKey, url }) {
    this.secretKey = secretKey
    this.url = removeTrailingSlash(url)
  }

  async post (path, body) {
    return this.call('POST', path, JSON.stringify(body), { 'Content-Type': 'application/json' })
  }

  async postMultipart (path, body) {
    return this.call('POST', path, body)
  }

  async get (path, params) {
    return this.call('GET', `${path}?${new URLSearchParams(params)}`)
  }

  async delete (path) {
    return this.call('DELETE', `${path}`)
  }

  async call (method, path, body = undefined, headers = {}) {
    // noinspection JSDeprecatedSymbols
    const response = await fetch(`${this.url}${path}`, {
      method,
      body,
      headers: {
        'User-Agent': `SecurionPay-Node/${version} (Ruby/${process.version})`,
        Authorization: `Basic ${Buffer.from(this.secretKey + ':').toString('base64')}`,
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
