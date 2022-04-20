module.exports = class Subscriptions {
  /**
     * @param {Communicator} communicator
     */
  constructor (communicator) {
    this.communicator = communicator
  }

  create (params) {
    return this.communicator.post('/subscriptions', params)
  }

  get (subscriptionId) {
    return this.communicator.get(`/subscriptions/${subscriptionId}`)
  }

  update (subscriptionId, params) {
    return this.communicator.post(`/subscriptions/${subscriptionId}`, params)
  }

  cancel (subscriptionId) {
    return this.communicator.delete(`/subscriptions/${subscriptionId}`)
  }

  list (params) {
    return this.communicator.get('/subscriptions', params)
  }
}
