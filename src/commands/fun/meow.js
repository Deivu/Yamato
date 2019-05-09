const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class Meow extends Command {
    constructor() {
        super('meow', {
            aliases: ['meow'],
            channel: 'guild',
            description: 'Sends a random picure of a cat.'
        })
    }

    async exec(msg) {
        const neko = await this.client.neko.get('meow');
        const embed = new MessageEmbed()
            .setColor(0x964b00)
            .setImage(neko.url)
            .setFooter('Powered by Nekos Life');
        await msg.channel.send({ embed });
    }
}

module.exports = Meow;