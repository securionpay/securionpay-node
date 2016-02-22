module.exports = function(call) {
    return {
        create: function(customerId, params, callback) {
            return call({
                path: '/customers/' + customerId + '/subscriptions',
                method: 'POST',
                params: params
            }, callback);
        },
        get: function(customerId, subscriptionId, callback) {
            return call({
                path: '/customers/' + customerId + '/subscriptions/' + subscriptionId,
                method: 'GET'
            }, callback);
        },
        update: function(customerId, subscriptionId, params, callback) {
            return call({
                path: '/customers/' + customerId + '/subscriptions/' + subscriptionId,
                method: 'POST',
                params: params
            }, callback);
        },
        cancel: function(customerId, subscriptionId, params, callback) {
            if(typeof params === 'function') {
                callback = params;
                params = {};
            }

            return call({
                path: '/customers/' + customerId + '/subscriptions/' + subscriptionId,
                method: 'DELETE',
                params: params
            }, callback);
        },
        list: function(customerId, params, callback) {
            if(typeof params === 'function') {
                callback = params;
                params = {};
            }
            return call({
                path: '/customers/' + customerId + '/subscriptions',
                method: 'GET',
                params: params
            }, callback);
        }
    };
};
