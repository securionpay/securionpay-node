module.exports = function(call) {
    return {
        get: function(eventId, callback) {
            return call({
                path: '/events/' + eventId,
                method: 'GET'
            }, callback);
        },
        list: function(params, callback) {
            if(typeof params === 'function') {
                callback = params;
                params = {};
            }
            return call({
                path: '/events',
                method: 'GET',
                params: params
            }, callback);
        }
    };
};
