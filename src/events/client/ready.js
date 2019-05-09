const { Listener } = require('discord-akairo');

class Ready extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
        
        this.fired = false;
        this.cron = null;
    }

    exec() {
        if (this.fired) return;
        console.log(`${this.client.user.username} is now ready !`);
        this.client.setInterval(() => {
            this.client.user.setPresence({ activity: { name: `?help | ${this.client.guilds.size} guilds` } })
                .catch(console.error);
        }, 180000)
        this.client.user.setPresence({ activity: { name: 'Just woke up....' } })
            .catch(console.error);
        this.fired = true;
    }

    _cron() {
        if (this.cron) this.client.clearInterval(this.cron);
        process.nextTick(() => {
            this.client.sweepEmojis();
            this.client.sweepPrecenses();
            this.cron = this.client.setInterval(() => {
                this.client.sweepEmojis();
                this.client.sweepPrecenses();
            }, 600000);
        })
    }
}

module.exports = Ready;
