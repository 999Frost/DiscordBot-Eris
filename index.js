const config = require('./config.js')
const { Bot } = require('./structure/index.js')

new Bot(config.token, {
    intents: ["guildMessages"]
})