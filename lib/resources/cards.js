module.exports = function(call) {
    return {
        create: function(customerId, params, callback) {
            return call({
                path: '/customers/' + customerId + '/cards',
                method: 'POST',
                params: params
            }, callback);
        },
        get: function(customerId, cardId, callback) {
            return call({
                path: '/customers/' + customerId + '/cards/' + cardId,
                method: 'GET'
            }, callback);
        },
        update: function(customerId, cardId, params, callback) {
            return call({
                path: '/customers/' + customerId + '/cards/' + cardId,
                method: 'POST',
                params: params
            }, callback);
        },
        delete: function(customerId, cardId, callback) {
            return call({
                path: '/customers/' + customerId + '/cards/' + cardId,
                method: 'DELETE'
            }, callback);
        },
        list: function(customerId, params, callback) {
            if(typeof params === 'function') {
                callback = params;
                params = {};
            }
            return call({
                path: '/customers/' + customerId + '/cards',
                method: 'GET',
                params: params
            }, callback);
        }
    };
};
