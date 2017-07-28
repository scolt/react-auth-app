import config from '../common/config/config';
const api = {};

api.request = (url, options) => {
    url = config.serverUrl + url;
    if (!options) options = {};
    options.credentials = 'include';
    return fetch(url, options);
};

export default api;