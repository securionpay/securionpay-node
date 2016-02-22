module.exports = function(call) {
    return {
        buy: function(params, callback) {
            return call({
                path: '/customer-records',
                method: 'POST',
                params: params
            }, callback);
        },
        refresh: function(customerRecordId, params, callback) {
            if(typeof params === 'function') {
                callback = params;
                params = {};
            }
            return call({
                path: '/customer-records/' + customerRecordId,
                method: 'POST',
                params: params
            }, callback);
        },
        get: function(customerRecordId, callback) {
            return call({
                path: '/customer-records/' + customerRecordId,
                method: 'GET'
            }, callback);
        },
        list: function(params, callback) {
            if(typeof params === 'function') {
                callback = params;
                params = {};
            }
            return call({
                path: '/customer-records',
                method: 'GET',
                params: params
            }, callback);
        },
        getFee: function(customerRecordId, customerRecordFeeId, callback) {
            return call({
                path: '/customer-records/' + customerRecordId + '/fees/' + customerRecordFeeId,
                method: 'GET'
            }, callback);
        },
        listFees: function(customerRecordId, params, callback) {
            if(typeof params === 'function') {
                callback = params;
                params = {};
            }
            return call({
                path: '/customer-records/' + customerRecordId + '/fees',
                method: 'GET',
                params: params
            }, callback);
        },
        getProfit: function(customerRecordId, customerRecordProfitId, callback) {
            return call({
                path: '/customer-records/' + customerRecordId + '/profits/' + customerRecordProfitId,
                method: 'GET'
            }, callback);
        },
        listProfits: function(customerRecordId, params, callback) {
            if(typeof params === 'function') {
                callback = params;
                params = {};
            }
            return call({
                path: '/customer-records/' + customerRecordId + '/profits',
                method: 'GET',
                params: params
            }, callback);
        }
    };
};
