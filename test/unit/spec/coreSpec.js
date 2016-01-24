var mockery = require('mockery');
var BPromise = require('bluebird');

describe('Library core', function() {
    var lib, resolve, reject, request;

    beforeEach(function() {
        request = jasmine.createSpy()
            .and.returnValue(new BPromise(function(res, rej) {
                resolve = res;
                reject = rej;
            }));

        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false
        });
        mockery.registerMock('request-promise', request);

        lib = require('../../../lib/core');
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should throw error if api key is not provided', function() {
        expect(function() {
            new lib();
        }).toThrow();
    });

    it('should initialize properly without url provided', function() {
        var api = new lib('api_key');

        expect(api.options).toEqual({
            apiKey: 'api_key',
            url: 'https://api.securionpay.com'
        });
    });

    it('should initialize properly with url provided', function() {
        var api = new lib('api_key', { url: 'custom_url' });

        expect(api.options).toEqual({
            apiKey: 'api_key',
            url: 'custom_url'
        });
    });

    it('should remove trailing slash from custom url', function() {
        var api = new lib('api_key', { url: 'custom_url/' });

        expect(api.options).toEqual({
            apiKey: 'api_key',
            url: 'custom_url'
        });
    });

    it('should call request with correct parameters', function() {
        var api = new lib('api_key', { url: 'custom_url' });

        api._call({
            path: '/path',
            method: 'POST',
            params: {
                key1: 'val1'
            }
        });

        expect(request.calls.argsFor(0)[0]).toEqual({
            uri: 'custom_url/path',
            method: 'POST',
            json: true,
            auth: {
                username: 'api_key',
                password: ''
            },
            body: {
                key1: 'val1'
            }
        });
    });

    it('should call GET request with correct parameters', function() {
        var api = new lib('api_key', { url: 'custom_url' });

        api._call({
            path: '/path',
            method: 'GET',
            params: {
                key1: 'val1'
            }
        });

        expect(request.calls.argsFor(0)[0]).toEqual({
            uri: 'custom_url/path',
            method: 'GET',
            json: true,
            auth: {
                username: 'api_key',
                password: ''
            },
            qs: {
                key1: 'val1'
            }
        });
    });

    it('should return promise which is resolved with request response', function(done) {
        var api = new lib('api_key');

        api._call({}).then(function(response) {
            expect(response).toBe('response');
            done();
        });

        resolve('response');
    });

    it('should fire provided callback with request response', function(done) {
        var api = new lib('api_key');

        api._call({}, function(error, response) {
            expect(error).not.toBeDefined();
            expect(response).toBe('response');
            done();
        });

        resolve('response');
    });

    it('should return promise which is rejected with library error', function(done) {
        var api = new lib('api_key');

        api._call({}).catch(function(error) {
            expect(error).toBe('error');
            done();
        });

        reject('error');
    });

    it('should fire provided callback with library error', function(done) {
        var api = new lib('api_key');

        api._call({}, function(error) {
            expect(error).toBe('error');
            done();
        });

        reject('error');
    });

    it('should return promise which is rejected with api error', function(done) {
        var api = new lib('api_key');

        api._call({}).catch(function(error) {
            expect(error.message).toBe('Response code: 400 (error_type): Error message');
            done();
        });

        reject({
            statusCode: 400,
            error: {
                error: {
                    type: 'error_type',
                    message: 'Error message'
                }
            }
        });
    });

    it('should fire provided callback with library error', function(done) {
        var api = new lib('api_key');

        api._call({}, function(error) {
            expect(error.message).toBe('Response code: 400 (error_type): Error message');
            done();
        });

        reject({
            statusCode: 400,
            error: {
                error: {
                    type: 'error_type',
                    message: 'Error message'
                }
            }
        });
    });
});
