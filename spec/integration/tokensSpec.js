const SecurionPayGateway = require('../../')
const cards = require('../data/cards')

describe('Tokens', function () {
  const api = new SecurionPayGateway()

  it('should create and get token', async () => {
    // given
    const tokenReq = cards.card()
    // when
    const created = await api.tokens.create(tokenReq)
    const got = await api.tokens.get(created.id)
    // then
    expect(got.last4).toEqual('4242')
    expect(got.first6).toEqual('424242')
    expect(got.expMonth).toEqual(tokenReq.expMonth)
    expect(got.expYear).toEqual(tokenReq.expYear)
    expect(got.cardholderName).toEqual(tokenReq.cardholderName)
    expect(got.customerId).toEqual(tokenReq.customerId)
    expect(got.used).toBeFalsy()
  })

  it('should create charge by token', async () => {
    // given
    const token = await api.tokens.create(cards.card())
    // when
    const charge = await api.charges.create({
      amount: 2000,
      currency: 'PLN',
      card: token.id
    })
    // then
    expect(charge.amount).toEqual(2000)
    expect(charge.currency).toEqual('PLN')
    expect(charge.card.last4).toEqual('4242')
    expect(charge.card.first6).toEqual('424242')
  })
})
