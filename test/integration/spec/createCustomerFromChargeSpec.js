describe('Creating customer from charge', function() {
    var api, random;

    beforeEach(function() {
        var options = {};
        if(process.env.URL) {
            options.url = process.env.URL;
        }
        api = require('../../../')(process.env.PRIVATE_KEY, options);
        random = Math.round(Math.random() * 1000000);
    });

    it('should create token, charge, customer from charge and charge customer again', function(done) {
        api.tokens.create({
            number: '4242424242424242',
            expMonth: '12',
            expYear: '2055',
            cvc: '123'
        }).then(function(token) {
            return api.charges.create({
                amount: 2000,
                currency: 'EUR',
                card: token.id
            });
        }).then(function(charge) {
            return api.customers.create({
                email: 'testuser+' + random + '@example.com',
                description: 'Test user',
                card: charge.id
            });
        }).then(function(customer) {
            return api.charges.create({
                amount: 1000,
                currency: 'USD',
                customerId: customer.id
            });
        }).then(function(charge) {
            expect(charge.amount).toBe(1000);
            expect(charge.customerId).toBeDefined();

            done();
        }).done();
    });
});
