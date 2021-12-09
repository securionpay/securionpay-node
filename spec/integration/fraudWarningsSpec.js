const SecurionPayGateway = require('../../')
const cards = require('../data/cards')
const charges = require('../data/charges')

describe('FraudWarnings', function () {
  const api = new SecurionPayGateway()

  it('should get fraud warning', async () => {
    // given
    const [fraudWarning, charge] = await createFraudWarning()
    // when
    const got = await api.fraudWarnings.get(fraudWarning.id)
    // then
    expect(got.charge).toEqual(charge.id)
  })

  it('should list fraud warnings', async () => {
    // given
    const [fraudWarning] = await createFraudWarning()
    // when
    const ids = (await api.fraudWarnings.list({ limit: 100 }))
      .list.map(it => it.id)
    // then
    expect(ids).toContain(fraudWarning.id)
  })

  const createFraudWarning = async () => {
    let charge = await api.charges.create(charges.charge({ card: cards.fraudWarningCard() }))
    for (let i = 0; i < 30; i++) {
      charge = await api.charges.get(charge.id)
      if (charge.fraudDetails && charge.fraudDetails.status !== 'in_progress') {
        const warnings = await api.fraudWarnings.list({ limit: 100 })
        const fraudWarning = warnings.list.find(it => it.charge === charge.id)
        return [fraudWarning, charge]
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    throw new Error('timeout')
  }
})
