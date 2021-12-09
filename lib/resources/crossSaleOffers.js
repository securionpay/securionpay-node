module.exports = class CrossSaleOffers {
  /**
     * @param {Communicator} communicator
     */
  constructor (communicator) {
    this.communicator = communicator
  }

  create (params) {
    return this.communicator.post('/cross-sale-offers', params)
  }

  get (crossSaleOfferId) {
    return this.communicator.get(`/cross-sale-offers/${crossSaleOfferId}`)
  }

  update (crossSaleOfferId, params) {
    return this.communicator.post(`/cross-sale-offers/${crossSaleOfferId}`, params)
  }

  delete (crossSaleOfferId) {
    return this.communicator.delete(`/cross-sale-offers/${crossSaleOfferId}`)
  }

  list (params) {
    return this.communicator.get('/cross-sale-offers', params)
  }
}
