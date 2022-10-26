module.exports = {
  paymentMethod: (opts) => ({
    type: 'alipay',
    billing: {
      name: 'Nikola Tesla',
    },
    ...opts
  })
}
