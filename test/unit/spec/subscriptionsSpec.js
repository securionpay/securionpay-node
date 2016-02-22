describe('Subscriptions api', function() {
    var call, api;

    beforeEach(function() {
        call = jasmine.createSpy().and.returnValue('call response');
        api = require('../../../lib/resources/subscriptions')(call);
    });

    it('should call create method properly', function() {
        expect(api.create('cusId', {
            key1: 'val1'
        }, function() {})).toBe('call response');

        expect(call.calls.argsFor(0)[0]).toEqual({
            path: '/customers/cusId/subscriptions',
            method: 'POST',
            params: {
                key1: 'val1'
            }
        });
        expect(typeof call.calls.argsFor(0)[1]).toBe('function');
    });

    it('should call get method properly', function() {
        expect(api.get('cusId', 'subId', function() {})).toBe('call response');

        expect(call.calls.argsFor(0)[0]).toEqual({
            path: '/customers/cusId/subscriptions/subId',
            method: 'GET'
        });
        expect(typeof call.calls.argsFor(0)[1]).toBe('function');
    });

    it('should call update method properly', function() {
        expect(api.update('cusId', 'subId', {
            key1: 'val1'
        }, function() {})).toBe('call response');

        expect(call.calls.argsFor(0)[0]).toEqual({
            path: '/customers/cusId/subscriptions/subId',
            method: 'POST',
            params: {
                key1: 'val1'
            }
        });
        expect(typeof call.calls.argsFor(0)[1]).toBe('function');
    });

    it('should call cancel method without params properly', function() {
        expect(api.cancel('cusId', 'subId', function() {})).toBe('call response');

        expect(call.calls.argsFor(0)[0]).toEqual({
            path: '/customers/cusId/subscriptions/subId',
            method: 'DELETE',
            params: {}
        });
        expect(typeof call.calls.argsFor(0)[1]).toBe('function');
    });

    it('should call cancel method with params properly', function() {
        expect(api.cancel('cusId', 'subId', {
            key1: 'val1'
        }, function() {})).toBe('call response');

        expect(call.calls.argsFor(0)[0]).toEqual({
            path: '/customers/cusId/subscriptions/subId',
            method: 'DELETE',
            params: {
                key1: 'val1'
            }
        });
        expect(typeof call.calls.argsFor(0)[1]).toBe('function');
    });

    it('should call list method without params properly', function() {
        expect(api.list('cusId', function() {})).toBe('call response');

        expect(call.calls.argsFor(0)[0]).toEqual({
            path: '/customers/cusId/subscriptions',
            method: 'GET',
            params: {}
        });
        expect(typeof call.calls.argsFor(0)[1]).toBe('function');
    });

    it('should call list method with params properly', function() {
        expect(api.list('cusId', {
            key1: 'val1'
        }, function() {})).toBe('call response');

        expect(call.calls.argsFor(0)[0]).toEqual({
            path: '/customers/cusId/subscriptions',
            method: 'GET',
            params: {
                key1: 'val1'
            }
        });
        expect(typeof call.calls.argsFor(0)[1]).toBe('function');
    });
});
