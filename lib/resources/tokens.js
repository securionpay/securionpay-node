module.exports = class Events {
  /**
     * @param {Communicator} communicator
     */
  constructor (communicator) {
    this.communicator = communicator
  }

  create (params) {
    return this.communicator.post('/tokens', params)
  }

  get (tokenId) {
    return this.communicator.get(`/tokens/${tokenId}`)
  }
}
