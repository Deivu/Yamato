const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class Foxgirl extends Command {
    constructor() {
        super('foxgirl', {
            aliases: ['foxgirl'],
            channel: 'guild',
            description: 'Sends a random picture of a foxgirl.'
        })
    }

    async exec(msg) {
        const neko = await this.client.neko.get('foxgirl');
        const embed = new MessageEmbed()
            .setColor(0x964b00)
            .setImage(neko.url)
            .setFooter('Powered by Nekos Life');
        await msg.channel.send({ embed });
    }
}

module.exports = Foxgirl;