describe('Charging, capturing and refunding via token', function() {
    var api, random;

    beforeEach(function() {
        var options = {};
        if(process.env.URL) {
            options.url = process.env.URL;
        }
        api = require('../../../')(process.env.PRIVATE_KEY, options);
    });

    it('should create token, charge, capture and refund', function(done) {
        api.tokens.create({
            number: '4242424242424242',
            expMonth: '12',
            expYear: '2055',
            cvc: '123'
        }).then(function(token) {
            return api.charges.create({
                amount: 2000,
                currency: 'EUR',
                card: token.id,
                captured: false
            });
        }).then(function(charge) {
            return api.charges.capture(charge.id);
        }).then(function(charge) {
            return api.charges.refund(charge.id, {
                amount: 1000
            });
        }).then(function(charge) {
            expect(charge.amount).toBe(1000);
            expect(charge.captured).toBe(true);
            expect(charge.refunded).toBe(true);

            done();
        }).done();
    });
});
