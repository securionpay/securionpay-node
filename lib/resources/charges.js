module.exports = function(call) {
    return {
        create: function(params, callback) {
            return call({
                path: '/charges',
                method: 'POST',
                params: params
            }, callback);
        },
        get: function(chargeId, callback) {
            return call({
                path: '/charges/' + chargeId,
                method: 'GET'
            }, callback);
        },
        update: function(chargeId, params, callback) {
            return call({
                path: '/charges/' + chargeId,
                method: 'POST',
                params: params
            }, callback);
        },
        capture: function(chargeId, callback) {
            return call({
                path: '/charges/' + chargeId + '/capture',
                method: 'POST'
            }, callback);
        },
        refund: function(chargeId, params, callback) {
            if(typeof params === 'function') {
                callback = params;
                params = {};
            }
            return call({
                path: '/charges/' + chargeId + '/refund',
                method: 'POST',
                params: params
            }, callback);
        },
        list: function(params, callback) {
            if(typeof params === 'function') {
                callback = params;
                params = {};
            }
            return call({
                path: '/charges',
                method: 'GET',
                params: params
            }, callback);
        }
    };
};

