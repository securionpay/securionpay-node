const { SecurionPayGateway } = require('../../')
const cards = require('../data/cards')
const customers = require('../data/customers')
const credits = require('../data/credits')

describe('Credits', function () {
  const api = new SecurionPayGateway()

  it('should create and get credit', async () => {
    // given
    const creditReq = credits.credit({ card: cards.card() })
    // when
    const created = await api.credits.create(creditReq)
    const got = await api.credits.get(created.id)
    // then
    expect(got.amount).toEqual(creditReq.amount)
    expect(got.currency).toEqual(creditReq.currency)
    expect(got.desciption).toEqual(creditReq.desciption)
    expect(got.metadata.key).toEqual(creditReq.metadata.key)
  })

  it('should update credit', async () => {
    // given
    const creditReq = credits.credit({ card: cards.card() })
    const created = await api.credits.create(creditReq)
    // when
    const updated = await api.credits.update(created.id, {
      description: 'Updated description',
      metadata: { key: 'Updated value' }
    })
    // then
    expect(created.description).toEqual(creditReq.description)
    expect(updated.description).toEqual('Updated description')

    expect(created.metadata.key).toEqual(creditReq.metadata.key)
    expect(updated.metadata.key).toEqual('Updated value')

    expect(updated.amount).toEqual(creditReq.amount)
    expect(updated.currency).toEqual(creditReq.currency)
    expect(updated.card.first4).toEqual(creditReq.card.first4)
  })

  it('should list credits', async () => {
    // given
    const customer = await api.customers.create(customers.customer())
    const credit1 = await api.credits.create(credits.credit({ customerId: customer.id, card: cards.card() }))
    const credit2 = await api.credits.create(credits.credit({ customerId: customer.id, card: cards.card() }))
    const credit3 = await api.credits.create(credits.credit({ customerId: customer.id, card: cards.card() }))
    // when
    const all = (await api.credits.list({ customerId: customer.id }))
      .list.map(it => it.id)
    const afterLastId = (await api.credits.list({ customerId: customer.id, startingAfterId: credit3.id }))
      .list.map(it => it.id)
    // then
    expect(all).toEqual([credit3.id, credit2.id, credit1.id])
    expect(afterLastId).toEqual([credit2.id, credit1.id])
  })
})
