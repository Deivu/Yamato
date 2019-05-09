const ytdl = require('ytdl-core-discord');
const { MessageEmbed } = require('discord.js');
class Player {
    constructor(client, msg, connection) {
        this.client = client;
        this.connection = connection;
        this.channel = msg.channel;
        this.guild = msg.guild;
        this.songs = [];
    }

    async play() {
        if (!this.songs.length)
            return this.destroy();
        const song = await ytdl(this.songs[0].url).catch(() => null);
        if (!song) {
            this.songs.shift();
            return await play().catch(() => null);
        }
        this.connection.play(song, { type: 'opus', fec: true, plp: 0.01, bitrate: 128, highWaterMark: 1 })
            .on('error', this._handle_error)
            .once('end', () => {
                this.songs.shift();
                setImmediate(() => this.play().catch(() => null));
            })
            .setVolumeLogarithmic(50 / 100);
        await this.sendPlaying();
    }

    async sendPlaying() {
        if (!this.channel || this.channel.deleted) return;
        const requester = await this.client.users.fetch(this.songs[0].authorID).catch(() => null);
        const embed = new MessageEmbed()
            .setColor(0x964b00)
            .setAuthor(`🎶 | Requester: ${requester ? requester.username : 'Unavailable'}`)
            .setThumbnail(this.songs[0].thumb)
            .addField('\\▶ Now Playing', this.songs[0].title);
        await this.channel.send({ embed }).catch(() => null);
    }

    destroy() {
        this.songs.length = 0;
        this.client.queueSystem.delete(this.guild.id);
        this.connection.disconnect();
        const embed = new MessageEmbed()
            .setColor(0x964b00)
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
            .addField('\\⏹ Playback Ended', 'Feel free to start a new playback.')
            .setTimestamp();
        this.channel.send({ embed }).catch(() => null);
    }

    _handle_error(error) {
        console.error(error);
        this.end();
    }
}

module.exports = Player;