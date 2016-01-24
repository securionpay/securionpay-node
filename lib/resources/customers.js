module.exports = function(call) {
    return {
        create: function(params, callback) {
            return call({
                path: '/customers',
                method: 'POST',
                params: params
            }, callback);
        }
    };
};
