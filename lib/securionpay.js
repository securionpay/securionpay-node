const Communicator = require('./communicator')

const Blacklist = require('./resources/blacklist')
const Cards = require('./resources/cards')
const Charges = require('./resources/charges')
const CheckoutRequest = require('./resources/checkoutRequest')
const Credits = require('./resources/credits')
const CrossSaleOffers = require('./resources/crossSaleOffers')
const Customers = require('./resources/customers')
const Events = require('./resources/events')
const FraudWarnings = require('./resources/fraudWarnings')
const Plans = require('./resources/plans')
const Subscriptions = require('./resources/subscriptions')
const Tokens = require('./resources/tokens')
const Disputes = require('./resources/disputes')

class SecurionPayGateway {
  constructor (options) {

    const finalOptions = { ...SecurionPayGateway.defaultOptions, ...options }
    // remove trailing slash from root url
    if (finalOptions.url.charAt(finalOptions.url.length - 1) === '/') {
      finalOptions.url = finalOptions.url.substring(0, finalOptions.url.length - 1)
    }

    const communicator = new Communicator(finalOptions)

    this.blacklist = new Blacklist(communicator)
    this.cards = new Cards(communicator)
    this.charges = new Charges(communicator)
    this.checkoutRequest = new CheckoutRequest(finalOptions.secretKey)
    this.credits = new Credits(communicator)
    this.disputes = new Disputes(communicator)
    this.crossSaleOffers = new CrossSaleOffers(communicator)
    this.customers = new Customers(communicator)
    this.events = new Events(communicator)
    this.fraudWarnings = new FraudWarnings(communicator)
    this.plans = new Plans(communicator)
    this.subscriptions = new Subscriptions(communicator)
    this.tokens = new Tokens(communicator)
  }
}

SecurionPayGateway.defaultOptions = {
  url: 'https://api.securionpay.com'
}

module.exports = SecurionPayGateway
