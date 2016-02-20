describe('Subscribing with token', function() {
    var api, random;

    beforeEach(function() {
        var options = {};
        if(process.env.URL) {
            options.url = process.env.URL;
        }
        api = require('../../../')(process.env.PRIVATE_KEY, options);
        random = Math.round(Math.random() * 1000000);
    });

    it('should create plan, customer, token and subscribe to plan with token', function(done) {
        var planId, customerId;

        api.plans.create({
            amount: 1000,
            currency: 'EUR',
            interval: 'month',
            name: 'Test plan ' + random
        }).then(function(plan) {
            planId = plan.id;

            return api.customers.create({
                email: 'testuser+' + random + '@example.com',
                description: 'Test user'
            });
        }).then(function(customer) {
            customerId = customer.id;

            return api.tokens.create({
                number: '4242424242424242',
                expMonth: '12',
                expYear: '2055',
                cvc: '123'
            });
        }).then(function(token) {
            return api.subscriptions.create(customerId, {
                planId: planId,
                card: token.id
            });
        }).then(function(subscription) {
            expect(subscription.planId).toBe(planId);
            expect(subscription.customerId).toBe(customerId);

            done();
        }).done();
    });
});
