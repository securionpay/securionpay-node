const { SecurionPayGateway } = require('../../')
const cards = require('../data/cards')
const customers = require('../data/customers')
const charges = require('../data/charges')

describe('Charges', function () {
  const api = new SecurionPayGateway()

  it('should create and get charge', async () => {
    // given
    const chargeReq = charges.charge({ card: cards.card() })
    // when
    const created = await api.charges.create(chargeReq)
    const got = await api.charges.get(created.id)
    // then
    expect(got.amount).toEqual(chargeReq.amount)
    expect(got.currency).toEqual(chargeReq.currency)
    expect(got.desciption).toEqual(chargeReq.desciption)
    expect(got.metadata.key).toEqual(chargeReq.metadata.key)
  })

  it('should update charge', async () => {
    // given
    const chargeReq = charges.charge({ card: cards.card() })
    const created = await api.charges.create(chargeReq)
    // when
    const updated = await api.charges.update(created.id, {
      description: 'Updated description',
      metadata: { key: 'Updated value' }
    })
    // then
    expect(created.description).toEqual(chargeReq.description)
    expect(updated.description).toEqual('Updated description')

    expect(created.metadata.key).toEqual(chargeReq.metadata.key)
    expect(updated.metadata.key).toEqual('Updated value')

    expect(updated.amount).toEqual(chargeReq.amount)
    expect(updated.currency).toEqual(chargeReq.currency)
    expect(updated.card.first4).toEqual(chargeReq.card.first4)
  })

  it('should capture charge', async () => {
    // given
    const created = await api.charges.create(charges.charge({
      card: cards.card(),
      captured: false
    }))
    // when
    const captured = await api.charges.capture(created.id)
    // then
    expect(created.captured).toBeFalsy()
    expect(captured.captured).toBeTrue()
  })

  it('should refund charge', async () => {
    // given
    const created = await api.charges.create(charges.charge({ card: cards.card() }))
    // when
    const refunded = await api.charges.refund(created.id)
    // then
    expect(created.refunded).toBeFalsy()
    expect(refunded.refunded).toBeTrue()
  })

  it('should list charges', async () => {
    // given
    const customer = await api.customers.create(customers.customer())
    const charge1 = await api.charges.create(charges.charge({ customerId: customer.id, card: cards.card() }))
    const charge2 = await api.charges.create(charges.charge({ customerId: customer.id, card: cards.card() }))
    const charge3 = await api.charges.create(charges.charge({ customerId: customer.id, card: cards.card() }))
    // when
    const all = (await api.charges.list({ customerId: customer.id }))
      .list.map(it => it.id)
    const afterLastId = (await api.charges.list({ customerId: customer.id, startingAfterId: charge3.id }))
      .list.map(it => it.id)
    // then
    expect(all).toEqual([charge3.id, charge2.id, charge1.id])
    expect(afterLastId).toEqual([charge2.id, charge1.id])
  })
})
