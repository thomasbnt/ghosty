/*

    @document   : app.js
    @author     : Thomas Bnt <thomasbnt@protonmail.com>
    @version    : 2.0.0
    @copyright  : 2019, Thomas Bnt
    @license    : GNU General Public License v3.0
    @repository : https://github.com/thomasbnt/Ghosty

*/
const Discord = require('discord.js')
const fs = require('fs')
const klaw = require('klaw')
const path = require("path")
const moment = require('moment')
const snekfetch = require('snekfetch')


const config = require('./config.json')

const bot = new Discord.Client({
  autoReconnect: true,
  disableEveryone: true
})

// -------------------- Webhooks --------------------

const WebhookPrivate = new Discord.WebhookClient(config.WebhookPrivate.id, config.WebhookPrivate.token)
const WebhookPublic = new Discord.WebhookClient(config.WebhookPublic.id, config.WebhookPublic.token)

// -------------------- Config --------------------

bot.config = config
bot.commands = new Discord.Collection()

bot.ls = require('log-symbols')

bot.updatePresence = function updatePresence() {
  bot.user.setActivity(bot.guilds.size.toLocaleString()  + "  servers - "+ bot.guilds.reduce((mem, g) => mem += g.memberCount, 0) + "  Users 🎃", {
    type: "WATCHING"
  })
}

// -------------------- My Spoooky C0re --------------------

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    const event = require(`./events/${file}`)
    let eventName = file.split('.')[0]
    bot.on(eventName, event.bind(null, bot, WebhookPrivate, WebhookPublic))
  })
})

klaw("./commands/").on("data", (item) => {
  const cmdFile = path.parse(item.path)
  if (!cmdFile.ext || cmdFile.ext !== ".js") return
  let commandName = cmdFile.name.split(".")[0]
  const response = _loadCommand(cmdFile.dir, `${commandName}`)
  if (response) console.log(response)
})


function _loadCommand (commandPath, commandName) {
  try {
    console.log(bot.ls.info,`Loading Command: ${commandName}`)
    const props = require(`${commandPath}${path.sep}${commandName}`)
    if (props.init) {
      props.init(bot)
    }

    bot.commands.set(commandName, props)
    
    return false
  } catch (e) {
    return `Unable to load command ${commandName}: ${e}`
  }
}

bot.login(config.token)
