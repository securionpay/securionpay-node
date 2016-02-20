describe('Checkout request api', function() {
    var api;

    beforeEach(function() {
        api = require('../../../lib/resources/checkoutRequest')(null, 'pr_test_bu0GRzw3MzhT10fpxa1j9OHJ');
    });

    it('should sign request provided as object', function() {
        expect(api.sign({
            charge: {
                amount: 499,
                currency: 'EUR'
            }
        })).toBe('NTk1MjY3MmZjMjdjMjdkZjEyNDlhYjA3YTQ4NDE2NDdhYzcwOGM1MzdjYWQ3MDhjNDRlZWVkMDIzOWI0OTc0Ynx7ImNoYXJnZSI6eyJhbW91bnQiOjQ5OSwiY3VycmVuY3kiOiJFVVIifX0=');
    });

    it('should sign request provided as JSON', function() {
        expect(api.sign('{"charge":{"amount":499,"currency":"EUR"}}'))
            .toBe('NTk1MjY3MmZjMjdjMjdkZjEyNDlhYjA3YTQ4NDE2NDdhYzcwOGM1MzdjYWQ3MDhjNDRlZWVkMDIzOWI0OTc0Ynx7ImNoYXJnZSI6eyJhbW91bnQiOjQ5OSwiY3VycmVuY3kiOiJFVVIifX0=');
    });
});