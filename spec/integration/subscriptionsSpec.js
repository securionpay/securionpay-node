const { SecurionPayGateway } = require('../../')
const cards = require('../data/cards')
const plans = require('../data/plans')
const customers = require('../data/customers')

describe('Subscriptions', function () {
  const api = new SecurionPayGateway()

  it('should create and get subscription', async () => {
    // given
    const plan = await api.plans.create(plans.plan())
    const customer = await api.customers.create(customers.customer({ card: cards.card() }))
    const subscriptionReq = { planId: plan.id, customerId: customer.id }
    // when
    const created = await api.subscriptions.create(subscriptionReq)
    const got = await api.subscriptions.get(created.id)
    // then
    expect(got.id).toBeDefined()
    expect(got.planId).toEqual(plan.id)
    expect(got.customerId).toEqual(customer.id)
  })

  it('should update subscription', async () => {
    // given
    const plan = await api.plans.create(plans.plan())
    const customer = await api.customers.create(customers.customer({ card: cards.card() }))
    const created = await api.subscriptions.create({ planId: plan.id, customerId: customer.id })
    // when
    // given
    // when
    const updated = await api.subscriptions.update(created.id, {
      shipping: {
        name: 'Updated shipping',
        address: {
          line1: 'Updated line1',
          line2: 'Updated line2',
          zip: 'Updated zip',
          city: 'Updated city',
          state: 'Updated state',
          country: 'CH'
        }
      }
    })
    // then
    expect(created.shipping).toBeUndefined()
    expect(updated.id).toEqual(created.id)
    expect(updated.planId).toEqual(plan.id)

    const shipping = updated.shipping
    expect(shipping.name).toEqual('Updated shipping')
    expect(shipping.address.line1).toEqual('Updated line1')
    expect(shipping.address.line2).toEqual('Updated line2')
    expect(shipping.address.zip).toEqual('Updated zip')
    expect(shipping.address.city).toEqual('Updated city')
    expect(shipping.address.state).toEqual('Updated state')
    expect(shipping.address.country).toEqual('CH')
  })

  it('should cancel subscription', async () => {
    // given
    const plan = await api.plans.create(plans.plan())
    const customer = await api.customers.create(customers.customer({ card: cards.card() }))
    const created = await api.subscriptions.create({ planId: plan.id, customerId: customer.id })
    // when
    await api.subscriptions.cancel(created.id)
    const got = await api.subscriptions.get(created.id)
    // then
    expect(created.canceledAt).toBeFalsy()
    expect(got.status).toEqual('canceled')
    expect(got.canceledAt).toBeDefined()
  })

  it('should list subscriptions', async () => {
    // given
    const plan = await api.plans.create(plans.plan())
    const customer = await api.customers.create(customers.customer({ card: cards.card() }))
    const subscription1 = await api.subscriptions.create({ planId: plan.id, customerId: customer.id })
    const subscription2 = await api.subscriptions.create({ planId: plan.id, customerId: customer.id })
    const deletedSubscription = await api.subscriptions.create({ planId: plan.id, customerId: customer.id })
    await api.subscriptions.cancel(deletedSubscription.id)
    // when
    const all = (await api.subscriptions.list({ customerId: customer.id }))
      .list.map(it => it.id)
    const deleted = (await api.subscriptions.list({ customerId: customer.id, deleted: true }))
      .list.map(it => it.id)
    // then
    expect(all).toEqual([subscription2.id, subscription1.id])
    expect(deleted).toEqual([deletedSubscription.id])
  })
})
