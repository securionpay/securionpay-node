describe('Events api', function() {
    var call, api;

    beforeEach(function() {
        call = jasmine.createSpy().and.returnValue('call response');
        api = require('../../../lib/resources/events')(call);
    });

    it('should call get method properly', function() {
        expect(api.get('eventId', function() {})).toBe('call response');

        expect(call.calls.argsFor(0)[0]).toEqual({
            path: '/events/eventId',
            method: 'GET'
        });
        expect(typeof call.calls.argsFor(0)[1]).toBe('function');
    });

    it('should call list method without params properly', function() {
        expect(api.list(function() {})).toBe('call response');

        expect(call.calls.argsFor(0)[0]).toEqual({
            path: '/events',
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
            path: '/events',
            method: 'GET',
            params: {
                key1: 'val1'
            }
        });
        expect(typeof call.calls.argsFor(0)[1]).toBe('function');
    });
});
