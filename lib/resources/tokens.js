module.exports = function(call) {
    return {
        create: function(params, callback) {
            return call({
                path: '/tokens',
                method: 'POST',
                params: params
            }, callback);
        },
        get: function(tokenId, callback) {
            return call({
                path: '/tokens/' + tokenId,
                method: 'GET'
            }, callback);
        }
    };
};
