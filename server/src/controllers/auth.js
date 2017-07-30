const router = require('express').Router();
const url = require('url');
const auth = require('../providers/auth/index');

const auths = [
    {
        provider: auth.AuthVK,
        config: {
            socialName: 'vk',
            baseOauthUrl: 'https://oauth.vk.com/authorize',
            baseTokenUrl: 'https://oauth.vk.com/access_token',
            baseApiUrl: 'https://api.vk.com/method',
            userApiMethod: 'users.get',
            extra: {
                scope: 'email',
                keyId: 'vkId'
            }
        }
    },
    {
        provider: auth.AuthGithub,
        config: {
            socialName: 'github',
            baseOauthUrl: 'https://github.com/login/oauth/authorize',
            baseTokenUrl: 'https://github.com/login/oauth/access_token',
            baseApiUrl: 'https://api.github.com',
            userApiMethod: 'user',
            extra: {
                scope: 'user:email,user',
                keyId: 'githubId'
            }
        }
    },
    {
        provider: auth.AuthLinkedin,
        config: {
            socialName: 'linkedin',
            baseOauthUrl: 'https://www.linkedin.com/oauth/v2/authorization',
            baseTokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
            baseApiUrl: 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address)',
            userApiMethod: '',
            extra: {
                scope: 'r_basicprofile%20r_emailaddress%20',
                keyId: 'linkedinId'
            }
        }
    }
];

auths.forEach((config) => {
    const provider = new config.provider(config.config);
    router.get(`/${config.config.socialName}/:appAlias`, (req, res) => {
        res.redirect(provider.getInitUrl(req.params.appAlias));
    });

    router.get(`/${config.config.socialName}/callback/:redirectUrl`, (req, res) => {
        let params = url.parse(req.url, true).query;
        provider.authenticate(params.code, req.params.redirectUrl).then(authResult => {
            res.cookie('token', authResult.token, { maxAge: 900000, httpOnly: true });
            res.redirect(`${authResult.domain}`);
        }).catch(error => {
            console.error(error);
            res.end('Unexpected Error');
        });
    });
});

module.exports = router;
