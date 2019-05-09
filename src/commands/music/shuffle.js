const { Command } = require('discord-akairo');

class Shuffle extends Command {
    constructor() {
        super('shuffle', {
            aliases: ['shuffle'],
            channel: 'guild',
            description: 'Shuffles your current track.'
        })
    }

    async exec(msg) {
        if (!msg.guild.queue)
            return await msg.channel.send('Admiral, please queue some songs first via `play` command.');
        if (msg.guild.queue.songs.length < 5)
            return await msg.channel.send('Admiral, You only have 5 songs on your queue, please add more.');
        if (msg.member.voice.channelID !== msg.guild.queue.connection.channel.id)
            return await msg.channel.send('Admiral, please join the same voice channel where I am playing right now.');
        const sliced = msg.guild.queue.songs.splice(2, msg.guild.queue.songs.length)
        const generated = [];
        while (sliced.length) {
            generated.push(sliced.splice(Math.floor(Math.random() * sliced.length), 1)[0]);
        };
        for (const track of generated) msg.guild.queue.songs.push(track);
        generated.length = 0;
        await msg.channel.send('Succesfully shuffled your queue.');
    }
}

module.exports = Shuffle;