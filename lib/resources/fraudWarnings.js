module.exports = class FraudWarnings {
  /**
     * @param {Communicator} communicator
     */
  constructor (communicator) {
    this.communicator = communicator
  }

  get (fraudWarningId) {
    return this.communicator.get(`/fraud-warnings/${fraudWarningId}`)
  }

  list (params) {
    return this.communicator.get('/fraud-warnings', params)
  }
}
