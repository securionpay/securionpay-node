const { SecurionPayGateway } = require('../../')
const paymentMethods = require('../data/paymentMethods')
const customers = require('../data/customers')

describe('PaymentMethods', function () {
  const api = new SecurionPayGateway()

  it('should create and get paymentMethod', async () => {
    // given
    const paymentMethodReq = paymentMethods.paymentMethod()
    // when
    const created = await api.paymentMethods.create(paymentMethodReq)
    const got = await api.paymentMethods.get(created.id)
    // then
    expect(got.id).toBeDefined()
    expect(got.type).toEqual(paymentMethodReq.type)
    expect(got.billing).toEqual(paymentMethodReq.billing)
    expect(got.status).toEqual('chargeable')
    expect(got.id).toMatch(/^pm_\w+$/)
    expect(got.clientObjectId).toMatch(/^client_pm_\w+$/)
  })

  it('should delete paymentMethod', async () => {
    // given
    const created = await api.paymentMethods.create(paymentMethods.paymentMethod())
    // when
    await api.paymentMethods.delete(created.id)
    const got = await api.paymentMethods.get(created.id)
    // then
    expect(created.deleted).toBeFalsy()
    expect(got.deleted).toBeTrue()
  })

  it('should list paymentMethods', async () => {
    // given
    const customer = await api.customers.create(customers.customer())
    const paymentMethod1 = await api.paymentMethods.create(paymentMethods.paymentMethod({ customerId: customer.id }))
    const paymentMethod2 = await api.paymentMethods.create(paymentMethods.paymentMethod({ customerId: customer.id }))
    const paymentMethod3 = await api.paymentMethods.create(paymentMethods.paymentMethod({ customerId: customer.id }))
    // when
    const all = (await api.paymentMethods.list({ customerId: customer.id }))
      .list.map(it => it.id)
    const afterLastId = (await api.paymentMethods.list({ customerId: customer.id, startingAfterId: paymentMethod3.id }))
      .list.map(it => it.id)
    // then
    expect(all).toEqual([paymentMethod3.id, paymentMethod2.id, paymentMethod1.id])
    expect(afterLastId).toEqual([paymentMethod2.id, paymentMethod1.id])
  })
})
