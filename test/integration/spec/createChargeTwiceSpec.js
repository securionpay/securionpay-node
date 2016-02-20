describe('Creating charge twice for same customer', function() {
    var api, random;

    beforeEach(function() {
        var options = {};
        if(process.env.URL) {
            options.url = process.env.URL;
        }
        api = require('../../../')(process.env.PRIVATE_KEY, options);
        random = Math.round(Math.random() * 1000000);
    });

    it('should create customer and charge him twice', function(done) {
        api.customers.create({
            email: 'testuser+' + random + '@example.com',
            description: 'Test user'
        }).then(function(customer) {
            return api.charges.create({
                amount: 2000,
                currency: 'EUR',
                customerId: customer.id,
                card: {
                    number: '4242424242424242',
                    expMonth: '12',
                    expYear: '2055',
                    cvc: '123'
                }
            });
        }).then(function(charge) {
            return api.charges.create({
                amount: 1000,
                currency: 'EUR',
                customerId: charge.customerId
            });
        }).then(function(charge) {
            expect(charge.amount).toBe(1000);
            expect(charge.customerId).toBeDefined();

            done();
        }).done();
    });
});
