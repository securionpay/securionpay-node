var _ = require('lodash');
var request = require('request-promise');
var resources = ['cards', 'customers', 'charges', 'plans', 'subscriptions', 'events', 'tokens',
    'blacklist', 'crossSaleOffers', 'customerRecords', 'checkoutRequest'];
var SecurionPayError = require('./securionpayError');

function SecurionPayGateway(privateKey, options) {
    var defaults = {
        url: 'https://api.securionpay.com'
    };
    var self = this;

    if(!privateKey) {
        throw new Error('Private key is required');
    }

    options = options || {};
    this.options = _.assign({
        privateKey: privateKey
    }, defaults, options);

    //remove trailing slash from root url
    if(this.options.url.charAt(this.options.url.length - 1) === '/') {
        this.options.url = this.options.url.substring(0, this.options.url.length - 1);
    }

    resources.forEach(function(resource) {
        self[resource] = require('./resources/' + resource)(self._call.bind(self), self.options.privateKey);
    });
}

SecurionPayGateway.prototype._call = function(options, callback) {
    var requestOptions = {
        uri: this.options.url + options.path,
        method: options.method,
        json: true,
        auth: {
            username: this.options.privateKey,
            password: ''
        }
    };

    if(options.method === 'GET' || options.method === 'DELETE') {
        requestOptions.qs = options.params || {};
    } else {
        requestOptions.body = options.params || {};
    }

    return this._handleAsync(request(requestOptions), callback);
};

SecurionPayGateway.prototype._handleAsync = function(promise, callback) {
    var finalPromise = promise.catch(function(e) {
        if(e.error && e.error.error) {
            throw new SecurionPayError(e.error.error);
        } else {
            throw e;
        }
    });

    if(callback === undefined) {
        return finalPromise;
    } else {
        finalPromise.then(function(response) {
            callback(undefined, response);
        }).catch(callback);
    }
};

module.exports = function(privateKey, options) {
    return new SecurionPayGateway(privateKey, options);
};
