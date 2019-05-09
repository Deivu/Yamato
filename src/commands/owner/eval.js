const { Command } = require('discord-akairo');
const { inspect } = require('util');
const { MessageEmbed } = require('discord.js');

class Eval extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval'],
            channel: 'guild',
            args: [
                {
                    id: 'code'
                }
            ],
            description: 'Evaluates the given Javascript Statement.',
            ownerOnly: true,
            typing: true
        })
    }

    async exec(msg, args) {
        if (!args.code)
            return await msg.channel.send('Admiral, you forgot to specify what is the code you want me to run.');
        let result;
        try {
            result = eval(args.code);
            if (typeof evaled !== "string")
                result = inspect(result);
        } catch (error) {
            result = error;
        }
        const embed = new MessageEmbed()
            .setTitle('Javascript Eval Results')
            .setDescription(`\`\`\`js\n${this._clean(result)}\`\`\``)
            .setColor(0x964b00)
            .setThumbnail(this.client.user.displayAvatarURL())
            .addField('Dangerous Command', 'I assume you, the developer of this bot wont eval your token in public, and never do that lmao.')
            .setFooter('💻 | Evaluated Results');
        await msg.channel.send({ embed });
    }

    _clean(text) {
        return typeof(text) === "string" ? text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)) : text;
    }
}

module.exports = Eval;