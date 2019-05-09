const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class Baka extends Command {
    constructor() {
        super('baka', {
            aliases: ['baka', 'idiot'],
            channel: 'guild',
            description: 'Sends a random baka image.'
        })
    }

    async exec(msg) {
        const neko = await this.client.neko.get('baka');
        const embed = new MessageEmbed()
            .setColor(0x964b00)
            .setImage(neko.url)
            .setFooter('Powered by Nekos Life');
        await msg.channel.send({ embed });
    }
}

module.exports = Baka;