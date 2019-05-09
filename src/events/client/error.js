const { Listener } = require('discord-akairo');

class Error extends Listener {
    constructor() {
        super('error', {
            emitter: 'client',
            event: 'error'
        });
    }

    exec(error) {
        console.error(error);
    }
}

module.exports = Error;