const Akairo = require('discord-akairo');
const { version, MessageEmbed } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

class Status extends Akairo.Command {
    constructor() {
        super('status', {
            aliases: ['status', 'stats'],
            channel: 'guild',
            description: 'Shows the current status of the bot.'
        })
    }

    async exec(msg) {
        const duration = moment.duration(this.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const invite = await this.client.generateInvite('ADMINISTRATOR');
        const embed = new MessageEmbed()
          .setDescription(`\`\`\`asciidoc\n
= Statistics =
• Servers    :: ${this.client.guilds.size.toLocaleString()}
• Users      :: ${this.client.users.size.toLocaleString()}
• Channels   :: ${this.client.channels.size.toLocaleString()}
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
= Framework =
• Discord.js :: v${version}
• Akairo     :: v${Akairo.version}
• Node       :: ${process.version}\`\`\``)
          .setColor(0x964b00)
          .setThumbnail(this.client.user.displayAvatarURL())
          .addField('Invite Me ?', `Admiral, if you want to use me on your server, you can do so by inviting me via the link [HERE](${invite})`)
          .setFooter(`📶 | ${this.client.user.username}'s Status`);
        await msg.channel.send({ embed });
    }
}

module.exports = Status;