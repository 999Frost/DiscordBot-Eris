const { Message } = require('eris')
const { Bot } = require('../../structure/index.js')
module.exports = {
    name: "messageCreate",

    
/**
 * @param {Bot} client
 * @param {Message} message
 */
    async execute(client, message) {
        const prefix = client.config.prefix
        if(!message.content.startsWith(prefix)) return
        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const cmdname = args[0].toLowerCase().normalize()
        const cmd = client.commands.get(cmdname)
        if(!cmd) return
        try {
        args.shift()
        cmd.execute(client, message, args)
        } catch (error) {
            console.log(error)
        }
    }
}