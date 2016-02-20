module.exports = function(call) {
    return {
        create: function(params, callback) {
            return call({
                path: '/cross-sale-offers',
                method: 'POST',
                params: params
            }, callback);
        },
        get: function(crossSaleOfferId, callback) {
            return call({
                path: '/cross-sale-offers/' + crossSaleOfferId,
                method: 'GET'
            }, callback);
        },
        update: function(crossSaleOfferId, params, callback) {
            return call({
                path: '/cross-sale-offers/' + crossSaleOfferId,
                method: 'POST',
                params: params
            }, callback);
        },
        delete: function(crossSaleOfferId, callback) {
            return call({
                path: '/cross-sale-offers/' + crossSaleOfferId,
                method: 'DELETE'
            }, callback);
        },
        list: function(params, callback) {
            if(typeof params === 'function') {
                callback = params;
                params = {};
            }
            return call({
                path: '/cross-sale-offers',
                method: 'GET',
                params: params
            }, callback);
        }
    };
};
