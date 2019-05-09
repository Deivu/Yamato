const { Command } = require('discord-akairo');

class NowPlaying extends Command {
    constructor() {
        super('nowplaying', {
            aliases: ['nowplaying', 'np'],
            channel: 'guild',
            description: 'Shows what song is currently playing, as well the requester of the song.'
        })
    }

    async exec(msg) {
        if (!msg.guild.queue)
            return await msg.channel.send('Admiral, please queue some songs first via `play` command.');
        if (!msg.guild.queue.songs.length)
            return await msg.channel.send('Admiral, There is no more songs to check.');
        await msg.guild.queue.sendPlaying();
    }
}

module.exports = NowPlaying;