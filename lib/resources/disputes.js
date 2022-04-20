module.exports = class Disputes {
  /**
     * @param {Communicator} communicator
     */
  constructor (communicator) {
    this.communicator = communicator
  }

  get (disputeId) {
    return this.communicator.get(`/disputes/${disputeId}`)
  }

  update (disputeId, params) {
    return this.communicator.post(`/disputes/${disputeId}`, params)
  }

  close (disputeId) {
    return this.communicator.post(`/disputes/${disputeId}/close`)
  }

  list (params) {
    return this.communicator.get('/disputes', params)
  }
}
