const { Command } = require('discord-akairo');

class Skip extends Command {
    constructor() {
        super('skip', {
            aliases: ['skip', 'next'],
            channel: 'guild',
            description: 'Skips the currently playing song. Only the users who added the song can skip it, or users that has "MANAGE_MESSAGES" perms.'
        })
    }

    async exec(msg) {
        if (!msg.guild.queue)
            return await msg.channel.send('Admiral, please queue some songs first via `play` command.');
        if (!msg.guild.queue.connection.dispatcher)
            return await msg.channel.send('Admiral, there is nothing playing on this guild.');
        if (msg.member.voice.channelID !== msg.guild.queue.connection.channel.id)
            return await msg.channel.send('Admiral, please join the same voice channel where I am playing right now.');
        if (!msg.member.permissions.has('MANAGE_MESSAGES') && msg.author.id !== msg.guild.queue.songs[0].authorID)
            return await msg.channel.send('Admiral, you didn\'t queue this song. Please the user or an admin to skip it.');
        await msg.channel.send('Skipping the currently playing song in track...');
        msg.guild.queue.connection.dispatcher.end();
    }
}

module.exports = Skip;