const { Listener } = require('discord-akairo');

class GuildCreate extends Listener {
    constructor() {
        super('guildCreate', {
            emitter: 'client',
            event: 'guildCreate'
        });
    }

    exec(guild) {
        console.log(`New Guild: ${guild.name}`);
    }
}

module.exports = GuildCreate;