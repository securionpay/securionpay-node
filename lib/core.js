var _ = require('lodash');
var request = require('request-promise');
var resources = ['cards', 'customers'];

function Api(apiKey, options) {
    var defaults = {
        url: 'https://api.securionpay.com'
    };
    var self = this;

    if(!apiKey) {
        throw new Error('Api key is required');
    }

    options = options || {};
    this.options = _.assign({
        apiKey: apiKey
    }, defaults, options);

    //remove trailing slash from root url
    if(this.options.url.charAt(this.options.url.length - 1) === '/') {
        this.options.url = this.options.url.substring(0, this.options.url.length - 1);
    }

    resources.forEach(function(resource) {
        self[resource] = require('./resources/' + resource)(self._call.bind(self));
    });
}

Api.prototype._call = function(options, callback) {
    var requestOptions = {
        uri: this.options.url + options.path,
        method: options.method,
        json: true,
        auth: {
            username: this.options.apiKey,
            password: ''
        }
    };

    if(options.method === 'GET') {
        requestOptions.qs = options.params || {};
    } else {
        requestOptions.body = options.params || {};
    }

    return this._handleAsync(request(requestOptions), callback);
};

Api.prototype._handleAsync = function(promise, callback) {
    var finalPromise = promise.catch(function(e) {
        if(e.statusCode) {
            throw new Error('Response code: ' + e.statusCode +
                ' (' + e.error.error.type + '): ' + e.error.error.message);
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

module.exports = function(apiKey, options) {
    return new Api(apiKey, options);
};
