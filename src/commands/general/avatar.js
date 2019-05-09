const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class Baka extends Command {
    constructor() {
        super('avatar', {
            aliases: ['avatar'],
            channel: 'guild',
            description: 'Sends a link to your avatar'
        })
    }

    async exec(msg) {
        const embed = new MessageEmbed()
            .setColor(0x964b00)
            .setTitle('Avatar Link')
            .setURL(msg.author.displayAvatarURL({ size: 512 }))
            .setImage(msg.author.displayAvatarURL({ size: 512 }))
        await msg.channel.send({ embed });
    }
}

module.exports = Baka;