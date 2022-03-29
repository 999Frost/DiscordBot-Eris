const { Bot } = require('../../structure/index.js')
module.exports = {
    name: "ready",

    
/**
 * @param {Bot} client
 */
    async execute(client) {
        console.log(`Prêt sur ${client.user.username} !`)
    }
}