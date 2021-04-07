const Discord = require('discord.js');
const { Intents } = require('discord.js');
const fs = require('fs');

class Mirae extends Discord.Client {
    constructor(intents) {
        super(intents);

        this.prefix = '#';
        this.commands = new Discord.Collection;
        this.config = require('./params/params.json');
        this.loadCommands();

        this.on('ready', () => {
            console.log(`Logged in as ${this.user.tag}!`);
            this.loadStatus();
        });
        
        this.on('guildMemberAdd', m => {
            try {
                this.users.cache.get(m.id).send(`Welcome to ${m.guild.name}, please make sure to get your role by typing \`#role\` in general chat`);
            } catch (e) {
                console.log(e);
            }
        });

        this.on('message', msg => {
            if (msg.author.bot || !msg.content.startsWith(this.prefix)) return;
            const args = msg.content.slice(this.prefix.length).split(" ");

            try {
                this.commands.get(args[0]).run(msg, args);
            } catch (e) {
                console.log(e);
            }
        });

        this.login(this.config.TOKEN);
    }

    async loadStatus() {
        this.user.setPresence({
            activity: {
                name: "looking at you 👀",
                type: "STREAMING",
                url: "https://www.twitch.tv/monstercat"
            }
        });
    }

    async loadCommands() {

        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            this.commands.set(command.name, command);
        }
    }
}

const mirae = new Mirae({
    ws: { intents: [Intents.NON_PRIVILEGED, "GUILD_MEMBERS"] },
});