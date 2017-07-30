const request = require('request');
const Auth = require('./auth-base');

module.exports = class AuthGithub extends Auth {
    compileUserData(userData) {
        const names = userData.name.split(' ');
        return {
            firstName: names[0],
            lastName:  names[1],
            githubId: userData.id,
            email: userData.email
        };
    }
}