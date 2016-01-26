Node.js library for SecurionPay API
===================================
For detailed description of parameters for available methods
please visit https://securionpay.com/docs/api

Installation
------------
TODO: library still needs to be published into NPM

```
npm install securionpay
```

Quick start
-----------

```
var api = require('securionpay')('pk_test_myapikey')

api.customers.create({
    email: 'user@example.com',
    description: 'User description'
}).then(function(customer) {
    return api.cards.create(customer.id, {
        number: '4242424242424242',
        expMonth: '12',
        expYear: '2020',
        cvc: '123',
        cardholderName: 'John Smith'
    });
}).then(function(card) {
    console.log('ID of created card object: ', card.id);
}).catch(function(e) {
    // handle errors here
})
```
Bluebird is used as Promise library ( http://bluebirdjs.com/ ).

Preferring callbacks? All methods accept callback as their last argument. Promise is not returned when passing callback.

```
api.customers.create({
    email: 'user@example.com',
    description: 'User description'
}, function(err, customer) {
    if(err) {
        // handle error
    } else {
        // handle response
    }
});
```

API reference
-------------

When ``params`` is one of method arguments please refer to detailed API docs (linked) for all available fields

- customers
    - [create(params)](https://securionpay.com/docs/api#customer-create)
- cards
    - [create(customerId, params)](https://securionpay.com/docs/api#card-create)
    - [get(customerId, cardId)](https://securionpay.com/docs/api#card-retrieve)
    - [update(customerId, cardId, params)](https://securionpay.com/docs/api#card-update)
    - [delete(customerId, cardId)](https://securionpay.com/docs/api#card-delete)
    - [list(customerId, [params])](https://securionpay.com/docs/api#card-list)

Developing
----------

To connect to different backend:
```
var api = require('securionpay')('pk_test_myapikey', {
    url: 'http://mysecurionenv.com' // without trailing slash
});
```

To run unit tests and check test coverage:
```
npm test
npm run check-coverage
```

To run integration tests:
```
API_KEY=pk_test_myapikey npm run integration-test
```

To run integration tests against environment other than default:
```
API_KEY=pk_test_myapikey URL=http://mysecurionenv.com npm run integration-test
```
