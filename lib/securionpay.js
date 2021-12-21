const Communicator = require('./communicator')

const Blacklist = require('./resources/blacklist')
const Cards = require('./resources/cards')
const Charges = require('./resources/charges')
const CheckoutRequest = require('./resources/checkoutRequest')
const Credits = require('./resources/credits')
const CrossSaleOffers = require('./resources/crossSaleOffers')
const Customers = require('./resources/customers')
const Events = require('./resources/events')
const FileUploads = require('./resources/fileUploads')
const FraudWarnings = require('./resources/fraudWarnings')
const Plans = require('./resources/plans')
const Subscriptions = require('./resources/subscriptions')
const Tokens = require('./resources/tokens')
const Disputes = require('./resources/disputes')

class SecurionPayGateway {
  constructor (options) {

    const { url, uploadsUrl, secretKey } = { ...SecurionPayGateway.defaultOptions, ...options }
    if (!secretKey) throw new Error('secretKey is required')
    if (!url) throw new Error('url is required')
    if (!uploadsUrl) throw new Error('fileUploadsUrl is required')

    const gatewayCommunicator = new Communicator({ secretKey, url })
    const fileUploadsCommunicator = new Communicator({ secretKey, url: uploadsUrl })

    this.blacklist = new Blacklist(gatewayCommunicator)
    this.cards = new Cards(gatewayCommunicator)
    this.charges = new Charges(gatewayCommunicator)
    this.checkoutRequest = new CheckoutRequest(secretKey)
    this.credits = new Credits(gatewayCommunicator)
    this.disputes = new Disputes(gatewayCommunicator)
    this.crossSaleOffers = new CrossSaleOffers(gatewayCommunicator)
    this.customers = new Customers(gatewayCommunicator)
    this.events = new Events(gatewayCommunicator)
    this.fileUploads = new FileUploads(fileUploadsCommunicator)
    this.fraudWarnings = new FraudWarnings(gatewayCommunicator)
    this.plans = new Plans(gatewayCommunicator)
    this.subscriptions = new Subscriptions(gatewayCommunicator)
    this.tokens = new Tokens(gatewayCommunicator)
  }
}

SecurionPayGateway.defaultOptions = {
  url: 'https://api.securionpay.com',
  uploadsUrl: 'https://uploads.securionpay.com'
}

module.exports = SecurionPayGateway
