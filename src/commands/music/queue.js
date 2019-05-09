const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class Queue extends Command {
    constructor() {
        super('queue', {
            aliases: ['queue', 'tracks'],
            channel: 'guild',
            description: 'Shows the currently queued songs in your guild track.'
        })
    }

    async exec(msg) {
        if (!msg.guild.queue)
            return await msg.channel.send('Admiral, please queue some songs first via `play` command.');
        if (!msg.guild.queue.songs.length)
            return await msg.channel.send('Admiral, There is no more songs to check.');
        const queue = msg.guild.queue.songs.length <= 8 ? msg.guild.queue.songs.map(x => `- ${x.title}`).join('\n') : msg.guild.queue.songs.slice(0, 8).map(x => `- ${x.title}`).join('\n')
        const embed = new MessageEmbed()
            .setColor(0x964b00)
            .setThumbnail(this.client.user.displayAvatarURL())
            .addField('Queued Songs', `\`\`\`${queue}\`\`\``)
            .addField('Currently Playing', msg.guild.queue.songs[0].title)
            .setFooter(`🎵 | ${msg.guild.queue.songs.length} total songs in queue.`);
        if (msg.guild.queue.songs.length > 8) embed.addField('This is the first 8 songs in queue.', `There are ${msg.guild.queue.songs.length - 8} more`);
        return await msg.channel.send({ embed });
    }
}

module.exports = Queue;