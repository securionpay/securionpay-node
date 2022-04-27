const { SecurionPayGateway } = require('../../')
const crossSaleOffers = require('../data/crossSaleOffers')

describe('CrossSaleOffers', function () {
  const api = new SecurionPayGateway()

  it('should create and get cross sale offer', async () => {
    // given
    const offerReq = crossSaleOffers.crossSaleOfferWithCharge()
    // when
    const created = await api.crossSaleOffers.create(offerReq)
    const got = await api.crossSaleOffers.get(created.id)
    // then
    expect(got.id).toBeDefined()
    expect(got.description).toEqual(offerReq.description)
    expect(got.title).toEqual(offerReq.title)
    expect(got.termsAndConditionsUrl).toEqual(offerReq.termsAndConditionsUrl)
    expect(got.template).toEqual(offerReq.template)
    expect(got.companyName).toEqual(offerReq.companyName)
    expect(got.companyLocation).toEqual(offerReq.companyLocation)
    expect(got.charge.amount).toEqual(offerReq.charge.amount)
    expect(got.charge.currency).toEqual(offerReq.charge.currency)
  })

  it('should update crossSaleOffer', async () => {
    // given
    const offerReq = crossSaleOffers.crossSaleOfferWithCharge()
    const created = await api.crossSaleOffers.create(offerReq)
    // when
    const updated = await api.crossSaleOffers.update(created.id, {
      description: 'updated description'
    })
    // then
    expect(created.description).toEqual(offerReq.description)

    expect(updated.description).toEqual('updated description')
    expect(updated.charge.amount).toEqual(offerReq.charge.amount)
  })

  it('should delete crossSaleOffer', async () => {
    // given
    const offerReq = crossSaleOffers.crossSaleOfferWithCharge()
    const offer1 = await api.crossSaleOffers.create(offerReq)
    const offer2 = await api.crossSaleOffers.create(offerReq)
    const deletedOffer = await api.crossSaleOffers.create(offerReq)
    await api.crossSaleOffers.delete(deletedOffer.id)
    // when
    const all = (await api.crossSaleOffers.list({ limit: 100 }))
      .list.map(it => it.id)
    const deleted = (await api.crossSaleOffers.list({ limit: 100, deleted: true }))
      .list.map(it => it.id)
    // then
    expect(all).toContain(offer1.id)
    expect(all).toContain(offer2.id)
    expect(all).not.toContain(deletedOffer.id)
    expect(deleted).toContain(deletedOffer.id)
    expect(deleted).not.toContain(offer1.id)
    expect(deleted).not.toContain(offer2.id)
  })
})
