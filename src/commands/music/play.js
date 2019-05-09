const { Command, Flag } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const urlregex = /^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/;

class Play extends Command {
    constructor() {
        super('play', {
            aliases: ['play'],
            channel: 'guild',
            userPermissions: ['CONNECT'],
            clientPermissions: ['CONNECT', 'SPEAK'],
            description: 'Plays a specific Youtube Playlist Link or Video Link. If not a link, searches for the keyword.'
        })
    }

    *args(msg) {
        if (!msg.content.split(' ')[1]) return Flag.cancel();
        return yield { type: 'string' };
    }

    async exec(msg, args) {
        if (!msg.member.voice.channelID) 
            return await msg.channel.send('Admiral, please join a voice channel first before using this command.');
        const url = args.replace(/<(.+)>/g, '$1');
        if (url.match(urlregex)) {
            const videos = await (await this.client.youtube.getPlaylist(url)).getVideos();
            for (const video of videos) {
                await this.client.queueSystem.handle(msg, video);
            }
            return await msg.channel.send(':white_check_mark: Succesfully added the playlist in queue.');
        }
        let video;
        try {
            video = await this.client.youtube.getVideo(args);
        } catch (error) {
            const search = await this.client.youtube.searchVideos(args, 10);
            const embed = new MessageEmbed()
                .setTitle('Youtube Search Results')
                .setDescription(search.map((v, x) => `**${x + 1}.** ${v.title}`).join('\n'))
                .setColor(0x964b00)
                .setThumbnail(this.client.user.displayAvatarURL())
                .setFooter('💻 | Please type the number of the song you want.');
            const m = await msg.channel.send({ embed });
            const collected = await msg.channel.awaitMessages((m) => m.author.id === msg.author.id && (m.member.voice.channel && (!isNaN(m.content) && (Number(m.content) >= 1 && Number(m.content) <= search.length))), { time: 10000, max: 1 });
            if (!collected.first())
                return await msg.channel.send('Admiral, you exceeded the 10 seconds wait on picking a song. Try again.');
            video = search[collected.first().content - 1];
            await m.delete().catch(() => null);
        }
        await this.client.queueSystem.handle(msg, video);
        return await msg.channel.send(`:white_check_mark: Succesfully added the song **${video.title}** in queue.`);
    }
}

module.exports = Play;
