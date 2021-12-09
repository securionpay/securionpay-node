module.exports = class Charges {
  /**
     * @param {Communicator} communicator
     */
  constructor (communicator) {
    this.communicator = communicator
  }

  create (params) {
    return this.communicator.post('/charges', params)
  }

  get (chargeId) {
    return this.communicator.get(`/charges/${chargeId}`)
  }

  update (chargeId, params) {
    return this.communicator.post(`/charges/${chargeId}`, params)
  }

  capture (chargeId, params) {
    return this.communicator.post(`/charges/${chargeId}/capture`, params)
  }

  refund (chargeId, params) {
    return this.communicator.post(`/charges/${chargeId}/refund`, params)
  }

  list (params) {
    return this.communicator.get('/charges', params)
  }
}
