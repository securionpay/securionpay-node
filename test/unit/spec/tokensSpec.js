describe('Tokens api', function() {
    var call, api;

    beforeEach(function() {
        call = jasmine.createSpy().and.returnValue('call response');
        api = require('../../../lib/resources/tokens')(call);
    });

    it('should call create method properly', function() {
        expect(api.create({
            key1: 'val1',
            key2: 'val2'
        }, function() {})).toBe('call response');

        expect(call.calls.argsFor(0)[0]).toEqual({
            path: '/tokens',
            method: 'POST',
            params: {
                key1: 'val1',
                key2: 'val2'
            }
        });
        expect(typeof call.calls.argsFor(0)[1]).toBe('function');
    });

    it('should call get method properly', function() {
        expect(api.get('tokenId', function() {})).toBe('call response');

        expect(call.calls.argsFor(0)[0]).toEqual({
            path: '/tokens/tokenId',
            method: 'GET'
        });
        expect(typeof call.calls.argsFor(0)[1]).toBe('function');
    });
});
