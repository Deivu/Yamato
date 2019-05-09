const { Listener } = require('discord-akairo');

class GuildDelete extends Listener {
    constructor() {
        super('guildDelete', {
            emitter: 'client',
            event: 'guildDelete'
        });
    }

    exec(guild) {
        if (guild.queue) {
            guild.queue.songs.length = 0;
            if (guild.queue.connection.dispatcher) guild.queue.connection.dispatcher.end();
        }
        console.log(`Removed Guild: ${guild.name}`);
    }
}

module.exports = GuildDelete;