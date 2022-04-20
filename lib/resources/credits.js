module.exports = class Credits {
  /**
     * @param {Communicator} communicator
     */
  constructor (communicator) {
    this.communicator = communicator
  }

  create (params) {
    return this.communicator.post('/credits', params)
  }

  get (chargeId) {
    return this.communicator.get(`/credits/${chargeId}`)
  }

  update (chargeId, params) {
    return this.communicator.post(`/credits/${chargeId}`, params)
  }

  list (params) {
    return this.communicator.get('/credits', params)
  }
}
