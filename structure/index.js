const {Client: ErisClient} = require('eris'),
{readdirSync} = require('fs')


class Bot extends ErisClient {
    constructor(...args) {
        super(...args)
        this.commands = new Map()
        this.events = new Map()
        this.aliases = new Map()
        this.config = require('../config.js')
        this.loadCmds()
        this.loadEvts()
        super.connect()
    }

    loadCmds() {
        const subFolders = readdirSync('./commands')
        for (const category of subFolders) {
            const commandsFiles = readdirSync(`./commands/${category}`).filter(file => file.endsWith('.js'))
            for (const commandFile of commandsFiles) {
                const command = require(`../commands/${category}/${commandFile}`)
                this.commands.set(command.name, command)
                if (command.aliases && command.aliases.length > 0) {
                    command.aliases.forEach(alias => this.aliases.set(alias, command))
                }
            }
        }
    }

    loadEvts() {
        const subFolders = readdirSync(`./events`)
        for (const category of subFolders) {
            const eventsFiles = readdirSync(`./events/${category}`).filter(file => file.endsWith(".js"))
            for (const eventFile of eventsFiles) {
                const event = require(`../events/${category}/${eventFile}`)
                this.on(event.name, (...args) => event.execute(this, ...args))
            }
        }
    }
}

module.exports.Bot = Bot