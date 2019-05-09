const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class Help extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            channel: 'guild',
            args: [{
                id: 'input'
            }],
            description: 'Sends the help menu on how to use this bot. `Ex: help or help music`'
        })
    }

    async exec(msg, args) {
        if (!args.input) {
            let generated = [];
            for (const command of this.client.commands.modules.values()) {
                const exists = generated.find(gen => gen.name === command.categoryID)
                if (!exists) {
                    generated.push({
                        name: command.categoryID,
                        commands: []
                    });
                }
                generated[generated.findIndex(gen => gen.name === command.categoryID)].commands.push(command.id);
            }
            generated = generated.map(gen => {
                return { name: `• ${gen.name.charAt(0).toUpperCase() + gen.name.slice(1)}`, value: gen.commands.map(cmds => `\`${cmds}\``).join(', ')};
            });
            return await msg.channel.send({
                embed: {
                    color: 0x964b00,
                    author: {
                        name: this.client.user.username,
                        icon_url: this.client.user.displayAvatarURL()
                    },
                    thumbnail: {
                        url: this.client.user.displayAvatarURL()
                    },
                    title: '• Help menu',
                    description: 'Use `help <command_name>` for more info about a command.',
                    fields: generated,
                    timestamp: new Date(),
                    footer: {
                        text: `💾 | Total Commands: ${this.client.commands.modules.size}`
                    }
                }
            });
        }
        const input = args.input.toLowerCase();
        const command = this.client.commands.modules.get(input);
        if (!command)
            return await msg.channel.send('Admiral, I think that is not yet saved on my list of commands. Try again.');
        const embed = new MessageEmbed()
            .setColor(0x964b00)
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
            .setThumbnail(this.client.user.displayAvatarURL())
            .addField('• Help menu', `Command: ${command.id}`)
            .addField('• Description', command.description)
            .addField('• Aliases', command.aliases.map(a => `\`${a}\``).join(', '))
            .setFooter(`⏳ | Command Cooldown: ${command.cooldown / 1000}s`);
        await msg.channel.send({ embed });
    }
}

module.exports = Help;