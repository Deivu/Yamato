const { Command } = require('discord-akairo');

class Ping extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            channel: 'guild',
            description: 'Sends the current latency of the bot from Discord Gateway'
        })
    }

    async exec(msg) {
        await msg.channel.send(`Gateway Latency: **${msg.guild.shard.ping.toFixed(2)}ms**`);
    }
}

module.exports = Ping;
