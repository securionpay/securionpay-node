describe('Customers api', function() {
    var call, api;

    beforeEach(function() {
        call = jasmine.createSpy().and.returnValue('call response');
        api = require('../../../lib/resources/customers')(call);
    });

    it('should call create method properly', function() {
        expect(api.create({
            key1: 'val1',
            key2: 'val2'
        }, function() {})).toBe('call response');

        expect(call.calls.argsFor(0)[0]).toEqual({
            path: '/customers',
            method: 'POST',
            params: {
                key1: 'val1',
                key2: 'val2'
            }
        });
        expect(typeof call.calls.argsFor(0)[1]).toBe('function');
    });

    it('should call get method properly', function() {
        expect(api.get('cusId', function() {})).toBe('call response');

        expect(call.calls.argsFor(0)[0]).toEqual({
            path: '/customers/cusId',
            method: 'GET'
        });
        expect(typeof call.calls.argsFor(0)[1]).toBe('function');
    });

    it('should call update method properly', function() {
        expect(api.update('cusId', {
            key1: 'val1'
        }, function() {})).toBe('call response');

        expect(call.calls.argsFor(0)[0]).toEqual({
            path: '/customers/cusId',
            method: 'POST',
            params: {
                key1: 'val1'
            }
        });
        expect(typeof call.calls.argsFor(0)[1]).toBe('function');
    });

    it('should call delete method properly', function() {
        expect(api.delete('cusId', function() {})).toBe('call response');

        expect(call.calls.argsFor(0)[0]).toEqual({
            path: '/customers/cusId',
            method: 'DELETE'
        });
        expect(typeof call.calls.argsFor(0)[1]).toBe('function');
    });

    it('should call list method without params properly', function() {
        expect(api.list(function() {})).toBe('call response');

        expect(call.calls.argsFor(0)[0]).toEqual({
            path: '/customers',
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
            path: '/customers',
            method: 'GET',
            params: {
                key1: 'val1'
            }
        });
        expect(typeof call.calls.argsFor(0)[1]).toBe('function');
    });
});
