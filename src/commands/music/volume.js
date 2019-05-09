const { Command, Flag } = require('discord-akairo');

class Volume extends Command {
    constructor() {
        super('volume', {
            aliases: ['volume', 'vol'],
            channel: 'guild',
            description: 'Changes the volume of the playback. Only the users who added the song can change it, or users that has "MANAGE_MESSAGES" perms.'
        })
    }

    *args(msg) {
        const argument = msg.content.split(' ')[1];
        if (!argument) return Flag.cancel();
        if (isNaN(argument)) return Flag.cancel();
        return yield { type: 'number' };
    }

    async exec(msg, args) {
        if (!msg.guild.queue)
            return await msg.channel.send('Admiral, please queue some songs first via `play` command.');
        if (!msg.guild.queue.connection.dispatcher)
            return await msg.channel.send('Admiral, there is nothing playing on this guild.');
        if (msg.member.voice.channelID !== msg.guild.queue.connection.channel.id)
            return await msg.channel.send('Admiral, please join the same voice channel where I am playing right now.');
        if (!msg.member.permissions.has('MANAGE_MESSAGES') && msg.author.id !== msg.guild.queue.songs[0].authorID)
            return await msg.channel.send('Admiral, you didn\'t queue this song. Please the user or an admin to change it.');
        if (args < 1 || args > 200)
            return await msg.channel.send('Admiral, please choose a number from 1 - 200 only.');
        msg.guild.queue.connection.dispatcher.setVolumeLogarithmic(args / 100);
        await msg.channel.send(`Succesfully set the volume of your playback to ${args}%`);
    }
}

module.exports = Volume;