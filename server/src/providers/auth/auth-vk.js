const request = require('request-promise');
const Auth = require('./auth-base');

module.exports = class AuthVK extends Auth {
    processAuthData(userAuthData) {
        this.email = userAuthData.email;
        return request.get(this.getApiReq(userAuthData.access_token, {}))
    }

    processUserData(userData) {
        return JSON.parse(userData).response[0];
    }

    compileUserData(userData) {
        return {
            firstName: userData.first_name,
            lastName:  userData.last_name,
            vkId: userData.id,
            email: this.email
        };
    }
};