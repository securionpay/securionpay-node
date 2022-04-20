module.exports = {
  crossSaleOfferWithCharge: (opts) => ({
    charge: {
      amount: 1000,
      currency: 'EUR'
    },
    title: 'Test Title',
    description: 'Test Description',
    termsAndConditionsUrl: 'https://github.com/securionpay',
    template: 'text_only',
    companyName: 'SecurionPay Tests',
    companyLocation: 'CH',
    ...opts
  })
}
