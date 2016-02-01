describe('Cards api', function() {
    var api, random;

    beforeEach(function() {
        var options = {};
        if(process.env.URL) {
            options.url = process.env.URL;
        }
        api = require('../../../')(process.env.PRIVATE_KEY, options);
        random = Math.round(Math.random() * 1000000);
    });

    it('should create customer and card and then retrieve card', function(done) {
        api.customers.create({
            email: 'testuser+' + random + '@example.com',
            description: 'Test user'
        }).then(function(customer) {
            return api.cards.create(customer.id, {
                number: '4242424242424242',
                expMonth: '12',
                expYear: '2055',
                cvc: '123',
                cardholderName: 'Test ' + random
            });
        }).then(function(card) {
            return api.cards.get(card.customerId, card.id);
        }).then(function(card) {
            expect(card.last4).toBe('4242');
            expect(card.expMonth).toBe('12');
            expect(card.expYear).toBe('2020');
            expect(card.cardholderName).toBe('Test ' + random);

            done();
        }).done();
    });
});
