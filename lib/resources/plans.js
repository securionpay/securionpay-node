module.exports = function(call) {
    return {
        create: function(params, callback) {
            return call({
                path: '/plans',
                method: 'POST',
                params: params
            }, callback);
        },
        get: function(planId, callback) {
            return call({
                path: '/plans/' + planId,
                method: 'GET'
            }, callback);
        },
        update: function(planId, params, callback) {
            return call({
                path: '/plans/' + planId,
                method: 'POST',
                params: params
            }, callback);
        },
        delete: function(planId, callback) {
            return call({
                path: '/plans/' + planId,
                method: 'DELETE'
            }, callback);
        },
        list: function(params, callback) {
            if(typeof params === 'function') {
                callback = params;
                params = {};
            }
            return call({
                path: '/plans',
                method: 'GET',
                params: params
            }, callback);
        }
    };
};
