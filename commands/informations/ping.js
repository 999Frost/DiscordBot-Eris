const { Message } = require('eris')
const { Bot } = require('../../structure/index.js')
module.exports = {
    name: "ping",

    
/**
 * @param {Bot} client
 * @param {Message} message
 * @param {String[]} args
 */
    async execute(client, message, args) {
        const a = message.createdAt
        await client.createMessage(message.channel.id, "Recherche...").then(async msg => {
            const ping = msg.createdAt - a
            await msg.edit({content: `Ma latence est de : ${ping}ms !`})
        })
    }
}