const Discord = require('discord.js')
const moment = require('moment')
const snekfetch = require('snekfetch')

module.exports = (bot, WebhookPrivate, WebhookPublic, member) => {

    bot.updatePresence()

    // API Discord Bot List.com
    snekfetch.post(`https://discordbotlist.com/api/bots/${bot.user.id}/stats`)
    .set("Authorization", `Bot ${bot.config.tokendiscordbotlistcom}`)
    .send({
        guilds: bot.guilds.size,
        users: bot.guilds.reduce((mem, g) => mem += g.memberCount, 0)
    })
    .then(console.log(bot.ls.success,'Updated discordbotlist.com status !'))
    .catch(e => console.log(bot.ls.error,'https://discordbotlist.com unavailable or token invalid.'))


//   console.log(`Added on ${guild.name} (${guild.id}) | We have ${results.reduce((prev, val) => prev + val, 0)} servers now.`)
//   const hookyEmbed = new Discord.RichEmbed()
//   hookservers.send(
//       hookyEmbed
//       .addField("Added on : ", guild.name + " ( "+ guild.id + " )",true)
//       .addField("Owner", "<@" +  guild.ownerID + ">",false)
//       .addField("Created at", moment(guild.createdAt).format('DD.MM.YY'),true)
//       .addField("users", `${guild.members.filter(m => m.presence.status !== 'offline' && !m.user.bot).size} / ${guild.members.filter(m => !m.user.bot).size}`,true)
//       .setThumbnail(guild.iconURL)
//       .setColor(bot.config.PrimaryColor)
//       .setTimestamp(new Date())
//   )


}