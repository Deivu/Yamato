const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class Support extends Command {
    constructor() {
        super('support', {
            aliases: ['support'],
            channel: 'support',
            description: 'Sends the support server invite link'
        })
    }

    async exec(msg) {
        const embed = new MessageEmbed()
            .setColor(0x964b00)
            .addField('Daydream Cafe', 'Support Server Invite Link: [Daydream Cafe](https://discord.gg/VyvwXxZ)');
        await msg.channel.send({ embed });
    }
}

module.exports = Support;
