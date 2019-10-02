const Discord = require('discord.js')
const colors = require('colors')

module.exports = (bot, WebhookPrivate, WebhookPublic, msg, args) => {
  console.log(
    bot.ls.success,`Connected to ${bot.user.tag.red}\n`,
    bot.ls.success,`${"Numbers of users :       ".blue} ${bot.guilds.reduce((mem, g) => mem += g.memberCount, 0)}\n`,
    bot.ls.success,`${"Numbers of channels :    ".green} ${bot.channels.size}\n`,
    bot.ls.success,`${"Numbers of servers :     ".red} ${bot.guilds.size.toLocaleString()}\n`,
    bot.ls.success,`${"Numbers of emojis :      ".cyan} ${bot.emojis.size}\n`
  )
  bot.updatePresence()

  WebhookPrivate.send(new Discord.RichEmbed()
    .setColor(bot.config.PrimaryColor)
    .setAuthor("— Boooooooo !", bot.user.displayAvatarURL)
    .setFooter("Spoookyest")
    .setTimestamp(new Date())
  ).catch(e => console.error(e))

}
