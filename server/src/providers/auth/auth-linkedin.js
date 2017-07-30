const Auth = require('./auth-base');

module.exports = class AuthLinkedin extends Auth {
    getApiReq(token, params) {
        const reqParams = Object.keys(params).map((item) => item + '=' + params[item]).join('&');
        const url = `${this.baseApiUrl}/${this.userApiMethod}?&oauth2_access_token=${token}` +
            '&v=5.64' +
            '&format=json' +
            `&${reqParams}`;
        return {
            url: url,
            headers: this.requestOpts.headers
        };
    }


    compileUserData(userData) {
        return {
            firstName: userData.firstName,
            lastName:  userData.lastName,
            linkedinId: userData.id,
            email: userData.emailAddress
        };
    }
};
