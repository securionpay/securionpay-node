var util = require('util');

function SecurionPayError(error) {
    SecurionPayError.super_.call(this);

    this.message = error.message;
    this.type = error.type;
    this.code = error.code;
    this.chargeId = error.chargeId;
    this.blacklistRuleId = error.blacklistRuleId;
}

util.inherits(SecurionPayError, Error);

module.exports = SecurionPayError;
