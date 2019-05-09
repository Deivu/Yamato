const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const { Structures } = require('discord.js');
const Youtube = require('simple-youtube-api');
const Fastify = require('fastify');
const Fetch = require('node-fetch');

const config = require('./config.json');
const Queue = require('./src/module/queue.js');
const Neko = require('./src/module/nekoslife.js');

// Webserver Listener
const server = new Fastify();
server.get('/', (req, res) => {
    console.log('Keep-Alive ping received.');
    res.send('OWO What is this');
})
server.listen(process.env.PORT, (err, add) => {
    if (err) throw err;
    console.log('Keep Alive Server is now listening at', add);
})

// Initialize the Bot
Structures.extend('Guild', (Guild) => {
    class Shipgirl_Guild extends Guild {
        constructor(client, data) {
            super(client, data);
        }

        get queue() {
            return this.client.queueSystem._queue.get(this.id) || null;
        }
    }
    return Shipgirl_Guild;
})

class ShipGirl extends AkairoClient {
    constructor(options) {
        super(options)

        this.queueSystem = new Queue(this); 
        this.neko = new Neko();
        this.youtube = new Youtube(config.youtube_token);
    
        this.commands = new CommandHandler(this, 
            {
                directory: './src/commands/',
                automateCategories: true,
                prefix: '?',
                defaultCooldown: 3000
            }
        );

        this.events = new ListenerHandler(this, 
            {
                directory: './src/events/'
            }
        );
    }

    sweepEmojis() {
        this.emojis.clear();
        for (const guild of this.guilds.values()) guild.emojis.clear();
    }

    sweepPrecenses() {
        for (const guild of this.guilds.values()) guild.presences.clear();
    }

    _setup() {
        this.events.setEmitters({
            commands: this.commands
        });
        this.commands.loadAll();
        this.events.loadAll();
    }
}

const Yamato = new ShipGirl(
    { 
        ownerID: ['325231623262044162', '396680742756679682'] 
    }, {
        messageCacheMaxSize: 30,
        messageCacheLifetime: 120,
        messageSweepInterval: 360,
        disableEveryone: true,
        disabledEvents: ['TYPING_START', 'GUILD_EMOJIS_UPDATE']
    }
);

Yamato._setup();

Yamato.login(config.token)
    .then(() => {
        console.log('Logged In');
        // Initialize keep alive ping to server per 3 minutes
        Yamato.setInterval(() => {
            Fetch(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`)
                .catch(console.error);
        }, 180000);
    })
    .catch(console.error);

process.on('warning', console.warn);
process.on('uncaughtException', console.error);
process.on('unhandledRejection', (reason, promise) => console.error(promise));