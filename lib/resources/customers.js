module.exports = class Customers {
  /**
     * @param {Communicator} communicator
     */
  constructor (communicator) {
    this.communicator = communicator
  }

  create (params) {
    return this.communicator.post('/customers', params)
  }

  get (customerId) {
    return this.communicator.get(`/customers/${customerId}`)
  }

  update (customerId, params) {
    return this.communicator.post(`/customers/${customerId}`, params)
  }

  delete (customerId) {
    return this.communicator.delete(`/customers/${customerId}`)
  }

  list (params) {
    return this.communicator.get('/customers', params)
  }
}
