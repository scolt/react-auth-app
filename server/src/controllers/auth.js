const router = require('express').Router();
const request = require('request-promise');
const url = require('url');
const db = require('../utility/database');
const social = require('../utility/url');
const util = require('../utility/util');
const config = require('../config');

/**
 * @api {get} /vk/appAlias Init VK authorization
 * @apiName Redirect to VK
 * @apiGroup Auth
 *
 * @apiParam {String} appAlias for app url (e.g. local).
 *
 * @apiSuccess {String} will redirect user to VK auth page
 */

router.get('/vk/:appAlias', (req, res) => {
    res.redirect(social.vk.init(req.params.appAlias));
});

/**
 * @api {get} /vk/callback/:redirectUrl?code Init VK session
 * @apiName AuthByVK
 * @apiGroup Auth
 *
 * @apiParam {String} redirectUrl for app url (e.g. local).
 * @apiParam {String} code for code app from oAuth provider (e.g. local).
 *
 * @apiSuccess {String} code user will successful redirected to home page of app.
 */

router.get('/vk/callback/:redirectUrl', (req, res) => {
    const User = db.models.user;
    let token = null;
    let params = url.parse(req.url, true).query;

    /** 1. Try to get token by code provided from VK redirect */
    request.get(social.vk.auth(params.code, req.params.redirectUrl)).then(data => {
        return JSON.parse(data);
    }).then(userAuthData => {
        /** 2. Check that response and valid and try to get user details for filling user data */
        if (userAuthData.error) throw new Error(userAuthData.error);
        return request.get(social.vk.api('users.get', userAuthData.access_token, { user_ids: userAuthData.user_id }))
    }).then(data => {
        return JSON.parse(data).response[0];
    }).then(userDetailsData => {
        /** 3. Process user details, generate token and save it to DB */
        if (!userDetailsData.id) throw new Error('no such user');
        token = util.generateUniqueValue([userDetailsData.id, userDetailsData.first_name]);
        return User.upsert({
            firstName: userDetailsData.last_name,
            lastName: userDetailsData.first_name,
            vkId: userDetailsData.id,
            token: token
        });
    }).then(saveToDbResult => {
        /** 4. Redirect to starting domain with the token in the url */
        const domain = config.url_aliases[req.params.redirectUrl];
        console.log('DB value', saveToDbResult === 1 ? 'saved' : 'updated');
        res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        res.redirect(`${domain}`);
    }).catch(error => {
        console.error(error);
        res.end('Unexpected Error');
    });
});

module.exports = router;