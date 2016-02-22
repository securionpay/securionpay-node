describe('Charges api', function() {
    var call, api;

    beforeEach(function() {
        call = jasmine.createSpy().and.returnValue('call response');
        api = require('../../../lib/resources/charges')(call);
    });

    it('should call create method properly', function() {
        expect(api.create({
            key1: 'val1'
        }, function() {})).toBe('call response');

        expect(call.calls.argsFor(0)[0]).toEqual({
            path: '/charges',
            method: 'POST',
            params: {
                key1: 'val1'
            }
        });
        expect(typeof call.calls.argsFor(0)[1]).toBe('function');
    });

    it('should call get method properly', function() {
        expect(api.get('chargeId', function() {})).toBe('call response');

        expect(call.calls.argsFor(0)[0]).toEqual({
            path: '/charges/chargeId',
            method: 'GET'
        });
        expect(typeof call.calls.argsFor(0)[1]).toBe('function');
    });

    it('should call update method properly', function() {
        expect(api.update('chargeId', {
            key1: 'val1'
        }, function() {})).toBe('call response');

        expect(call.calls.argsFor(0)[0]).toEqual({
            path: '/charges/chargeId',
            method: 'POST',
            params: {
                key1: 'val1'
            }
        });
        expect(typeof call.calls.argsFor(0)[1]).toBe('function');
    });

    it('should call capture method properly', function() {
        expect(api.capture('chargeId', function() {})).toBe('call response');

        expect(call.calls.argsFor(0)[0]).toEqual({
            path: '/charges/chargeId/capture',
            method: 'POST'
        });
        expect(typeof call.calls.argsFor(0)[1]).toBe('function');
    });

    it('should call refund method without params properly', function() {
        expect(api.refund('chargeId', function() {})).toBe('call response');

        expect(call.calls.argsFor(0)[0]).toEqual({
            path: '/charges/chargeId/refund',
            method: 'POST',
            params: {}
        });
        expect(typeof call.calls.argsFor(0)[1]).toBe('function');
    });

    it('should call refund method with params properly', function() {
        expect(api.refund('chargeId', {
            key1: 'val1'
        }, function() {})).toBe('call response');

        expect(call.calls.argsFor(0)[0]).toEqual({
            path: '/charges/chargeId/refund',
            method: 'POST',
            params: {
                key1: 'val1'
            }
        });
        expect(typeof call.calls.argsFor(0)[1]).toBe('function');
    });

    it('should call list method without params properly', function() {
        expect(api.list(function() {})).toBe('call response');

        expect(call.calls.argsFor(0)[0]).toEqual({
            path: '/charges',
            method: 'GET',
            params: {}
        });
        expect(typeof call.calls.argsFor(0)[1]).toBe('function');
    });

    it('should call list method with params properly', function() {
        expect(api.list({
            key1: 'val1'
        }, function() {})).toBe('call response');

        expect(call.calls.argsFor(0)[0]).toEqual({
            path: '/charges',
            method: 'GET',
            params: {
                key1: 'val1'
            }
        });
        expect(typeof call.calls.argsFor(0)[1]).toBe('function');
    });
});
