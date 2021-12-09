module.exports = class Blacklist {
  /**
     * @param {Communicator} communicator
     */
  constructor (communicator) {
    this.communicator = communicator
  }

  create (params) {
    return this.communicator.post('/blacklist', params)
  }

  get (blacklistRuleId) {
    return this.communicator.get(`/blacklist/${blacklistRuleId}`)
  }

  delete (blacklistRuleId) {
    return this.communicator.delete(`/blacklist/${blacklistRuleId}`)
  }

  list (params) {
    return this.communicator.get('/blacklist', params)
  }
}
