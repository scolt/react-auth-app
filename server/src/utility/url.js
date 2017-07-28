const config = require('../config');

const oauthConfig = config.oauth;

/**
 * Generate VK auth url for getting URL.
 * @function generateVkInitUrl
 * @param {string} appAlias - app name in the hashmap alias->url (e.g. "local").
 *
 * @returns {string} Generated url for authorization for getting code
 */
function generateVkInitUrl(appAlias) {
    return `https://oauth.vk.com/authorize?client_id=${oauthConfig.vk.clientId}` +
        `&display=page` +
        `&redirect_uri=${config.serverDomain}/auth/vk/callback/${appAlias}` +
        `&response_type=code` +
        `&v=5.64`;
}

/**
 * Generate VK auth url for getting URL.
 * @function generateVkAuthUrl
 * @param {string} code - code provided by vk service.
 * @param {string} appAlias - app name in the hashmap alias->url (e.g. "local").
 *
 * @returns {string} Generated auth url for authorization
 * @inner
 */
function generateVkAuthUrl(code, appAlias) {
    return `https://oauth.vk.com/access_token?client_id=${oauthConfig.vk.clientId}` +
        `&client_secret=${oauthConfig.vk.secret}` +
        `&redirect_uri=${config.serverDomain}/auth/vk/callback/${appAlias}` +
        `&code=${code}` +
        `&v=5.64`;
}

/**
 * Generate VK api url for any call to it.
 * @function generateVkApiUrl
 * @param {string} method - name of VK api method
 * @param {string} token - token for current user session
 * @param {object} params - list for extra prams for custom api calls
 *
 * @returns {string} Generated api url
 */
function generateVkApiUrl(method, token, params) {
    const reqParams = Object.keys(params).map((item) => item + '=' + params[item]).join('&');
    return `https://api.vk.com/method/${method}?${reqParams}` +
        `&access_token=${token}` +
        `&v=5.64`;
}

module.exports = {
    vk: {
        init: generateVkInitUrl,
        auth: generateVkAuthUrl,
        api: generateVkApiUrl
    }
};