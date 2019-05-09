const { Listener } = require('discord-akairo');

class commandCancelled extends Listener {
    constructor() {
        super('commandCancelled', {
            emitter: 'commands',
            event: 'commandCancelled'
        });
    }

    async exec(msg, command) {
        await msg.channel.send(`Admiral, you provided an invalid argument for the command **${command}**.`);
    }
}

module.exports = commandCancelled;