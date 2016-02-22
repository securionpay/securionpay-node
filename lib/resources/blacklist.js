module.exports = function(call) {
    return {
        create: function(params, callback) {
            return call({
                path: '/blacklist',
                method: 'POST',
                params: params
            }, callback);
        },
        get: function(blacklistRuleId, callback) {
            return call({
                path: '/blacklist/' + blacklistRuleId,
                method: 'GET'
            }, callback);
        },
        delete: function(blacklistRuleId, callback) {
            return call({
                path: '/blacklist/' + blacklistRuleId,
                method: 'DELETE'
            }, callback);
        },
        list: function(params, callback) {
            if(typeof params === 'function') {
                callback = params;
                params = {};
            }
            return call({
                path: '/blacklist',
                method: 'GET',
                params: params
            }, callback);
        }
    };
};
