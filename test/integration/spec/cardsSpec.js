describe('Cards api', function() {
    var api, random;

    beforeEach(function() {
        var options = {};
        if(process.env.URL) {
            options.url = process.env.URL;
        }
        api = require('../../../index')(process.env.API_KEY, options);
        random = Math.round(Math.random() * 1000000);
    });

    it('should create customer and card and then retrieve card', function(done) {
        var createdCustomer, createdCard;

        api.customers.create({
            email: 'testuser+' + random + '@example.com',
            description: 'Test user'
        }).then(function(customer) {
            createdCustomer = customer;

            return api.cards.create(customer.id, {
                number: '4242424242424242',
                expMonth: '12',
                expYear: '2020',
                cvc: '123',
                cardholderName: 'Test ' + random
            });
        }).then(function(card) {
            createdCard = card;

            return api.cards.get(createdCustomer.id, card.id);
        }).then(function(card) {
            expect(card.last4).toBe('4242');
            expect(card.expMonth).toBe('12');
            expect(card.expYear).toBe('2020');
            expect(card.cardholderName).toBe('Test ' + random);

            done();
        }).done();
    });
});
