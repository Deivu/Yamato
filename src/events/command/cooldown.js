const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class Cooldown extends Listener {
    constructor() {
        super('cooldown', {
            emitter: 'commands',
            event: 'cooldown'
        });
    }

    async exec(msg, command, remaining) {
        const embed = new MessageEmbed()
            .setColor(0x964b00)
            .setThumbnail(this.client.user.displayAvatarURL())
            .addField('Wait a moment Admiral...', `Please wait **${(remaining / 1000).toFixed(1)} second(s)** before executing a new command.`)
            .addField('Why throttle ?', 'This is to prevent possible abuse against our bot.')
            .setFooter(`⚠ | Command ${command} throttled`);
         await msg.channel.send({ embed });
    }
}

module.exports = Cooldown;