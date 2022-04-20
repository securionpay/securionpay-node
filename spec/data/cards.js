const random = require('./random')
const cards = {
  card: (params) => ({
    number: '4242424242424242',
    expMonth: '12',
    expYear: '2055',
    cvc: '123',
    cardholderName: random.randomString(),
    ...params
  }),
  disputedCard: (params) => cards.card({ number: '4242000000000018', ...params }),
  fraudWarningCard: (params) => cards.card({ number: '4242000000000208', ...params })
}
module.exports = cards
