const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class Kemonomimi extends Command {
    constructor() {
        super('kemonomimi', {
            aliases: ['kemonomimi', 'neko'],
            channel: 'guild',
            description: 'Sends a random picure of a CatGirl.'
        })
    }

    async exec(msg) {
        const neko = await this.client.neko.get('kemonomimi');
        const embed = new MessageEmbed()
            .setColor(0x964b00)
            .setImage(neko.url)
            .setFooter('Powered by Nekos Life');
        await msg.channel.send({ embed });
    }
}

module.exports = Kemonomimi;