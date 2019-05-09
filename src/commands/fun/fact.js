const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class Fact extends Command {
    constructor() {
        super('fact', {
            aliases: ['fact', 'trivia'],
            channel: 'guild',
            description: 'Sends a random fact.'
        })
    }

    async exec(msg) {
        const neko = await this.client.neko.get('fact');
        const embed = new MessageEmbed()
            .setColor(0x964b00)
            .setDescription(neko.fact)
            .setFooter('Powered by Nekos Life');
        await msg.channel.send({ embed });
    }
}

module.exports = Fact;