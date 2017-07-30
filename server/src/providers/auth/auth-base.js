const globalConfig = require('../../config');
const request = require('request-promise');
const oauthConfig = globalConfig.oauth;
const db = require('../../utility/database');
const jwt = require('jsonwebtoken');

module.exports = class Auth {
    constructor(config) {
        this.socialName = config.socialName;
        this.baseOauthUrl = config.baseOauthUrl;
        this.baseTokenUrl = config.baseTokenUrl;
        this.baseApiUrl = config.baseApiUrl;
        this.userApiMethod = config.userApiMethod;
        this.config = config.extra;
        this.requestOpts = {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
            }
        };
    }

    getInitUrl(appAlias) {
        return `${this.baseOauthUrl}?client_id=${oauthConfig[this.socialName].clientId}` +
            '&display=page' +
            '&response_type=code' +
            `&redirect_uri=${globalConfig.serverDomain}/auth/${this.socialName}/callback/${appAlias}` +
            `&scope=${this.config.scope}` +
            '&v=5.64';
    }

    getAuthReq(code, appAlias) {
        const url = `${this.baseTokenUrl}?client_id=${oauthConfig[this.socialName].clientId}` +
            `&client_secret=${oauthConfig[this.socialName].secret}` +
            `&redirect_uri=${globalConfig.serverDomain}/auth/${this.socialName}/callback/${appAlias}` +
            `&code=${code}` +
            '&grant_type=authorization_code' +
            '&v=5.64';

        return {
            url: url,
            headers: this.requestOpts.headers
        };
    }

    getApiReq(token, params) {
        const reqParams = Object.keys(params).map((item) => item + '=' + params[item]).join('&');
        const url = `${this.baseApiUrl}/${this.userApiMethod}?&access_token=${token}` +
            '&v=5.64' +
            `&${reqParams}`;
        return {
            url: url,
            headers: this.requestOpts.headers
        };
    }

    tryIdentifyUser(userData) {
        const User = db.models.user;
        const conditions = [];
        if (userData[this.config.keyId]) {
            const keyCondition = {};
            keyCondition[this.config.keyId] = userData[this.config.keyId];
            conditions.push(keyCondition);
        }

        if (userData.email) {
            conditions.push({email: userData.email});
        }

        return User.findOne({
            where: {
                $or: conditions
            }
        }).then(user => {
            let isNewUser = !user;
            let isAdditionalUser = false;
            if (user) {
                userData.id = user.id;
                isAdditionalUser = !user[this.config.keyId];
            }

            return {
                isAdditionalUser: isAdditionalUser,
                isNewUser: isNewUser,
                user: userData
            };
        });
    }

    processAuthData(userAuthData) {
        return request.get(this.getApiReq(userAuthData.access_token, {}));
    }

    compileUserData(userData) {
        return userData;
    }

    processUserData(userData) {
        return JSON.parse(userData);
    }

    authenticate(code, rurl) {
        const User = db.models.user;
        return request.get(this.getAuthReq(code, rurl)).then(data => {
            return JSON.parse(data);
        }).then(userAuthData => {
            if (userAuthData.error) throw new Error(userAuthData.error);
            return this.processAuthData(userAuthData);
        }).then(data => {
            return this.processUserData(data);
        }).then(userData => {
            return this.compileUserData(userData);
        }).then(compiledUserData => {
            return this.tryIdentifyUser(compiledUserData);
        }).then(identifiedData => {
            if (identifiedData.isNewUser) {
                return User.create(identifiedData.user);
            }

            if (identifiedData.isAdditionalUser) {
                return User.upsert(identifiedData.user).then(() => identifiedData.user);
            }

            return identifiedData.user;
        }).then(finalizedUserEntity => {
            return jwt.sign({ id: finalizedUserEntity.id }, globalConfig.jwt.secret);
        }).then(token => {
            const domain = globalConfig.url_aliases[rurl];
            return {
                domain: domain,
                token: token
            };
        });
    }
};