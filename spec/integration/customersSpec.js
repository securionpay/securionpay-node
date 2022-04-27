const { SecurionPayGateway } = require('../../')
const cards = require('../data/cards')
const { randomEmail } = require('../data/random')
const customers = require('../data/customers')

describe('Customers', function () {
  const api = new SecurionPayGateway()

  it('should create and get customer', async () => {
    // given
    const email = randomEmail()
    const customerReq = customers.customer({ email })
    // when
    const created = await api.customers.create(customerReq)
    const got = await api.customers.get(created.id)
    // then
    expect(got.id).toBeDefined()
    expect(got.email).toEqual(email)
  })

  it('should update customer default card', async () => {
    // given
    const created = await api.customers.create(customers.customer({ card: cards.card() }))
    // when
    const newCard = await api.cards.create(created.id, cards.card())
    const updated = await api.customers.update(created.id, { defaultCardId: newCard.id })
    // then
    expect(created.defaultCardId).not.toEqual(newCard.id)
    expect(updated.defaultCardId).toEqual(newCard.id)
  })

  it('should delete customer', async () => {
    // given
    const created = await api.customers.create(customers.customer())
    // when
    await api.customers.delete(created.id)
    const got = await api.customers.get(created.id)
    // then
    expect(created.deleted).toBeFalsy()
    expect(got.deleted).toBeTrue()
  })

  it('should list customers', async () => {
    // given
    const email = randomEmail()
    const customer1 = await api.customers.create({ email })
    const customer2 = await api.customers.create({ email })
    const deletedCustomer = await api.customers.create({ email })
    await api.customers.delete(deletedCustomer.id)
    // when
    const all = (await api.customers.list({ email }))
      .list.map(it => it.id)
    const deleted = (await api.customers.list({ email, deleted: true }))
      .list.map(it => it.id)
    // then
    expect(all).toEqual([customer2.id, customer1.id])
    expect(deleted).toEqual([deletedCustomer.id])
  })
})
