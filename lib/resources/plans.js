module.exports = class Plans {
  /**
     * @param {Communicator} communicator
     */
  constructor (communicator) {
    this.communicator = communicator
  }

  create (params) {
    return this.communicator.post('/plans', params)
  }

  get (planId) {
    return this.communicator.get(`/plans/${planId}`)
  }

  update (planId, params) {
    return this.communicator.post(`/plans/${planId}`, params)
  }

  delete (planId) {
    return this.communicator.delete(`/plans/${planId}`)
  }

  list (params) {
    return this.communicator.get('/plans', params)
  }
}
