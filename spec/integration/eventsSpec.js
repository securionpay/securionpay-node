const { SecurionPayGateway } = require('../../')
const cards = require('../data/cards')
const charges = require('../data/charges')

describe('Events', function () {
  const api = new SecurionPayGateway()

  it('should get event', async () => {
    // given
    const [event, charge] = await createEvent()
    // when
    const got = await api.events.get(event.id)
    // then
    expect(got.data.id).toEqual(charge.id)
  })

  it('should list event', async () => {
    // given
    const [event] = await createEvent()
    // when
    const ids = (await api.events.list({ limit: 100 }))
      .list.map(it => it.id)
    // then
    expect(ids).toContain(event.id)
  })

  const createEvent = async () => {
    const charge = await api.charges.create(charges.charge({ card: cards.card() }))
    const events = await api.events.list({ limit: 100 })
    const event = events.list.find(it => it.data.id === charge.id)
    return [event, charge]
  }
})
