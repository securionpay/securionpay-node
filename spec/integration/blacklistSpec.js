const { SecurionPayGateway } = require('../../')
const { randomEmail } = require('../data/random')

describe('Blacklist', function () {
  const api = new SecurionPayGateway()

  it('should create and get blacklist rule', async () => {
    // given
    const email = randomEmail()
    // when
    const created = await api.blacklist.create({ ruleType: 'email', email })
    const got = await api.blacklist.get(created.id)
    // then
    expect(got.ruleType).toBe('email')
    expect(got.email).toBe(email)
  })

  it('should delete blacklist rule', async () => {
    // given
    const email = randomEmail()
    const created = await api.blacklist.create({ ruleType: 'email', email })
    // when
    await api.blacklist.delete(created.id)
    const got = await api.blacklist.get(created.id)
    // then
    expect(created.deleted).toBeFalsy()
    expect(got.deleted).toBeTrue()
  })

  it('should list cards', async () => {
    // given
    const rule1 = await api.blacklist.create({ ruleType: 'email', email: randomEmail() })
    const rule2 = await api.blacklist.create({ ruleType: 'email', email: randomEmail() })
    const deletedRule = await api.blacklist.create({ ruleType: 'email', email: randomEmail() })
    await api.blacklist.delete(deletedRule.id)
    // when
    const all = (await api.blacklist.list({ limit: 100 }))
      .list.map(it => it.id)
    const deleted = (await api.blacklist.list({ limit: 100, deleted: true }))
      .list.map(it => it.id)
    // then
    expect(all).toContain(rule1.id)
    expect(all).toContain(rule2.id)
    expect(all).not.toContain(deletedRule.id)
    expect(deleted).toContain(deletedRule.id)
    expect(deleted).not.toContain(rule1.id)
    expect(deleted).not.toContain(rule2.id)
  })
})
