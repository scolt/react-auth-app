const crypto = require('crypto');

function generateUniqueValue(keys) {
    const current_date = (new Date()).valueOf().toString();
    const random = Math.random().toString();
    return crypto.createHash('sha1').update(current_date + random).digest('hex') +
           crypto.createHash('sha1').update(keys.join('-')).digest('hex');
}

module.exports = {
    generateUniqueValue
};