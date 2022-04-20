module.exports = {
  charge: (opts) => ({
    amount: 1000,
    currency: 'EUR',
    description: 'description',
    metadata: { key: 'value' },
    ...opts
  })
}
