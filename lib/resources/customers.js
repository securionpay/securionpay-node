module.exports = function(call) {
    return {
        create: function(params, callback) {
            return call({
                path: '/customers',
                method: 'POST',
                params: params
            }, callback);
        },
        get: function(customerId, callback) {
            return call({
                path: '/customers/' + customerId,
                method: 'GET'
            }, callback);
        },
        update: function(customerId, params, callback) {
            return call({
                path: '/customers/' + customerId,
                method: 'POST',
                params: params
            }, callback);
        },
        delete: function(customerId, callback) {
            return call({
                path: '/customers/' + customerId,
                method: 'DELETE'
            }, callback);
        },
        list: function(params, callback) {
            if(typeof params === 'function') {
                callback = params;
                params = {};
            }
            return call({
                path: '/customers',
                method: 'GET',
                params: params
            }, callback);
        }
    };
};
