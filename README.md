Node.js library for SecurionPay API
===================================

[![Build](https://github.com/securionpay/securionpay-node/actions/workflows/build.yml/badge.svg)](https://github.com/securionpay/securionpay-node/actions/workflows/build.yml)

Installation
------------

```sh
npm install securionpay
```

Quick start
-----------

```js
const api = require('securionpay')({ secretKey: 'sk_test_mysecretkey' })
try {
  const customer = await api.customers.create({
    email: 'user@example.com',
    description: 'User description'
  })
  const card = await api.cards.create(customer.id, {
    number: '4242424242424242',
    expMonth: '12',
    expYear: '2020',
    cvc: '123',
    cardholderName: 'John Smith'
  })
  console.log('ID of created card object: ', card.id);
} catch (e) {
  // handle errors
}

```

API reference
-------------

Please refer to detailed API docs (linked) for all available fields

- charges
  - [create(params)](https://securionpay.com/docs/api#charge-create)
  - [get(chargeId)](https://securionpay.com/docs/api#charge-retrieve)
  - [update(chargeId, params)](https://securionpay.com/docs/api#charge-update)
  - [capture(chargeId)](https://securionpay.com/docs/api#charge-capture)
  - [refund(chargeId, [params])](https://securionpay.com/docs/api#charge-capture)
  - [list([params])](https://securionpay.com/docs/api#charge-list)
- customers
  - [create(params)](https://securionpay.com/docs/api#customer-create)
  - [get(customerId)](https://securionpay.com/docs/api#customer-retrieve)
  - [update(customerId, params)](https://securionpay.com/docs/api#customer-update)
  - [delete(customerId)](https://securionpay.com/docs/api#customer-delete)
  - [list([params])](https://securionpay.com/docs/api#customer-list)
- cards
  - [create(customerId, params)](https://securionpay.com/docs/api#card-create)
  - [get(customerId, cardId)](https://securionpay.com/docs/api#card-retrieve)
  - [update(customerId, cardId, params)](https://securionpay.com/docs/api#card-update)
  - [delete(customerId, cardId)](https://securionpay.com/docs/api#card-delete)
  - [list(customerId, [params])](https://securionpay.com/docs/api#card-list)
- subscriptions
  - [create(params)](https://securionpay.com/docs/api#subscription-create)
  - [get(subscriptionId)](https://securionpay.com/docs/api#subscription-retrieve)
  - [update(subscriptionId, params)](https://securionpay.com/docs/api#subscription-update)
  - [cancel(subscriptionId, [params])](https://securionpay.com/docs/api#subscription-cancel)
  - [list([params])](https://securionpay.com/docs/api#subscription-list)
- plans
  - [create(params)](https://securionpay.com/docs/api#plan-create)
  - [get(planId)](https://securionpay.com/docs/api#plan-retrieve)
  - [update(planId, params)](https://securionpay.com/docs/api#plan-update)
  - [delete(planId)](https://securionpay.com/docs/api#plan-delete)
  - [list([params])](https://securionpay.com/docs/api#plan-list)
- events
  - [get(eventId)](https://securionpay.com/docs/api#event-retrieve)
  - [list([params])](https://securionpay.com/docs/api#event-list)
- tokens
  - [create(params)](https://securionpay.com/docs/api#token-create)
  - [get(tokenId)](https://securionpay.com/docs/api#token-retrieve)
- blacklist
  - [create(params)](https://securionpay.com/docs/api#blacklist-rule-create)
  - [get(blacklistRuleId)](https://securionpay.com/docs/api#blacklist-rule-retrieve)
  - [delete(blacklistRuleId)](https://securionpay.com/docs/api#blacklist-rule-delete)
  - [list([params])](https://securionpay.com/docs/api#blacklist-rule-list)
- checkoutRequest
  - [sign(checkoutRequestObjectOrJson)](https://securionpay.com/docs/api#checkout-request-sign)
- crossSaleOffers
  - [create(params)](https://securionpay.com/docs/api#cross-sale-offer-create)
  - [get(crossSaleOfferId)](https://securionpay.com/docs/api#cross-sale-offer-retrieve)
  - [update(crossSaleOfferId, params)](https://securionpay.com/docs/api#cross-sale-offer-update)
  - [delete(crossSaleOfferId)](https://securionpay.com/docs/api#cross-sale-offer-delete)
  - [list([params])](https://securionpay.com/docs/api#cross-sale-offer-list)
- credits
  - [create(params)](https://securionpay.com/docs/api#credit-create)
  - [get(creditId)](https://securionpay.com/docs/api#credit-retrieve)
  - [update(creditId, params)](https://securionpay.com/docs/api#credit-update)
  - [list([params])](https://securionpay.com/docs/api#credit-list)
- disputes
  - [get(disputeId)](https://securionpay.com/docs/api#dispute-retrieve)
  - [update(disputeId, params)](https://securionpay.com/docs/api#dispute-update)
  - [close(disputeId)](https://securionpay.com/docs/api#dispute-close)
  - [list([params])](https://securionpay.com/docs/api#dispute-list)
- fileUploads
  - [upload(content, params)](https://securionpay.com/docs/api#file-upload-create)
  - [get(fileUploadId)](https://securionpay.com/docs/api#file-upload-retrieve)
  - [list([params])](https://securionpay.com/docs/api#file-upload-list)
- fraudWarnings
  - [get(fraudWarningId)](https://securionpay.com/docs/api#fraud-warning-retrieve)
  - [list([params])](https://securionpay.com/docs/api#fraud-warning-list)

For further information, please refer to our official documentation at https://securionpay.com/docs.

Developing
----------

To connect to different backend:

```js
var api = require('securionpay')({
  secretKey: 'sk_test_mysecretkey',
  apiUrl: 'https://api.mysecurionenv.com',
  uploadsUrl: 'https://uploads.mysecurionenv.com'
});
```

To run tests:

```sh
SECRET_KEY=sk_test_mysecretkey npm run test
```

To run style check:

```sh
npm run stylecheck
```