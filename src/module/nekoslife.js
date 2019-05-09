const fetch = require('node-fetch');
const endpoints = require('../neko_endpoints.json');
const baseurl = 'https://nekos.life/api/v2';

class NekosLife {
    async get(query, nsfw = false, parameters) {
        const endpoint = nsfw ? endpoints.nsfw[query] : endpoints.sfw[query];
        if (!endpoint)
            throw new Error('The query you specified is not a valid endpoint');
        const url = parameters ? this._transformURL(baseurl + endpoint, parameters) : baseurl + endpoint;
        const req = await fetch(url);
        if (!req.ok)
            throw new Error('Response received is not ok, seems like the API is down');
        return await req.json();
    }

    getEndpoints(nsfw = false) {
        if (!nsfw)
            return Object.keys(endpoints.sfw);
        return Object.keys(endpoints.nsfw);
    }

    _transformURL(endpoint, parameters) {
        const url = new URL(endpoint);
        url.search = new URLSearchParams(parameters);
        return url.toString();
    }
}

module.exports = NekosLife;