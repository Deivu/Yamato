const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class Error extends Listener {
    constructor() {
        super('commandError', {
            emitter: 'commands',
            event: 'error'
        });
    }

    async exec(error, msg, command) {
        if (command) {
            console.error(error);
            const embed = new MessageEmbed()
                .setColor(0x964b00)
                .setThumbnail(this.client.user.displayAvatarURL())
                .addField('Command Errored', `\`\`\`js\n${error}\`\`\``)
                .addField('This is probably an issue', 'Please do report it to the developers of the bot in [Daydream Cafe](https://discord.gg/VyvwXxZ) guild.')
                .setFooter(`⚠ | ${command} errored`);
            return await msg.channel.send({ embed });
        }
        console.error(error)
    }
}

module.exports = Error;