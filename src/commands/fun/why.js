const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class Why extends Command {
    constructor() {
        super('why', {
            aliases: ['why'],
            channel: 'guild',
            description: 'Sends a, "just why" question.'
        })
    }

    async exec(msg) {
        const neko = await this.client.neko.get('why');
        const embed = new MessageEmbed()
            .setColor(0x964b00)
            .setDescription(neko.why)
            .setFooter('Powered by Nekos Life');
        await msg.channel.send({ embed });
    }
}

module.exports = Why;