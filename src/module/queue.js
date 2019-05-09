const Player = require('./player.js');
class Queue {
    constructor(client) {
        this.client = client;
        this._queue = new Map();
    }

    async handle(msg, video) {
        if (!msg.guild.queue) {
            if (!msg.member.voice.channelID)
                throw new Error('Message Author is not detected in the voice channel, cancelling.');
            const connection = await msg.member.voice.channel.join();
            const player = new Player(this.client, msg, connection);
            player.songs.push(this._constructVideo(video, msg.author.id));
            await player.play();
            return this._queue.set(msg.guild.id.repeat(1), player);
        }
        if (msg.guild.queue.songs.length > 500)
            throw new Error('Songs in your queue exceeded the 500 threshold');
        msg.guild.queue.songs.push(this._constructVideo(video, msg.author.id));
    }

    delete(id) {
        return this._queue.delete(id);
    }

    _constructVideo(video, authorID) {
        if (!video.id || !video.title || !authorID)
            throw new Error('Video ID, Video Title or Message Author is missing, can\'t create video object');
        const VideoObject = {
            title: video.title,
            url: `https://www.youtube.com/watch?v=${video.id}`,
            thumb: `https://img.youtube.com/vi/${video.id}/0.jpg`,
            authorID: authorID.repeat(1)
        };
        return Object.assign({}, VideoObject);
    }
}

module.exports = Queue;