var crypto = require('crypto');

module.exports = function(call, privateKey) {
    return {
        sign: function(checkoutRequest) {
            var json;
            var hmac = crypto.createHmac('sha256', privateKey);

            if(typeof checkoutRequest === 'object') {
                json = JSON.stringify(checkoutRequest);
            } else {
                json = checkoutRequest;
            }

            hmac = hmac.update(json).digest('hex');

            return (new Buffer(hmac + '|' + json)).toString('base64');
        }
    };
};