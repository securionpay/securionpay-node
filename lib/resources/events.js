module.exports = class Events {
  /**
     * @param {Communicator} communicator
     */
  constructor (communicator) {
    this.communicator = communicator
  }

  get (eventId) {
    return this.communicator.get(`/events/${eventId}`)
  }

  list (params) {
    return this.communicator.get('/events', params)
  }
}
