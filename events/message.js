const Discord = require('discord.js')

module.exports = async (bot, WebhookPrivate, WebhookPublic, msg) => {

  if (msg.author.bot) return
  if (msg.author.id === bot.user.id) return
  if (msg.channel.recipient) return

  if (msg.content.includes("web") || msg.content.includes("spider") || msg.content.includes("araignée")) {
    if (!msg.guild.member(bot.user).hasPermission("ADD_REACTIONS")) {
        console.log(bot.ls.warning, "The robot is not allowed to add reactions.")
        return
    } 
    msg.react('🕷').catch(e => console.error(bot.ls.error, e))
    
    console.log(bot.ls.info, `🕷 — Captured by ${msg.author.username} (ID : ${msg.author.id})`)
    WebhookPrivate.send(new Discord.RichEmbed()
        .setColor(bot.config.PrimaryColor)
        .setAuthor(`🕷 — Captured by ${msg.author.username}  (ID : ${msg.author.id})`, msg.author.avatarURL, null)
    )
  }
  if (msg.content.includes("ghost") || msg.content.includes("fantome") || msg.content.includes("boo")) {
    if (!msg.guild.member(bot.user).hasPermission("ADD_REACTIONS")) {
        console.log(bot.ls.warning, "The robot is not allowed to add reactions.")
        return
    } 
    msg.react('👻').catch(e => console.error(bot.ls.error, e))

    console.log(bot.ls.info, `👻 — Captured by ${msg.author.username} (ID : ${msg.author.id})`)
    WebhookPrivate.send(new Discord.RichEmbed()
        .setColor(bot.config.PrimaryColor)
        .setAuthor(`👻 — Captured by ${msg.author.username}  (ID : ${msg.author.id})`, msg.author.avatarURL, null)
    )
  }
  if (msg.content.includes("jack") || msg.content.includes("jacky")) {
    if (!msg.guild.member(bot.user).hasPermission("ADD_REACTIONS")) {
        console.log(bot.ls.warning, "The robot is not allowed to add reactions.")
        return
    } 
    msg.react('🎃').catch(e => console.error(bot.ls.error, e))

    console.log(bot.ls.info, `🎃 — Captured by ${msg.author.username} (ID : ${msg.author.id})`)
    WebhookPrivate.send(new Discord.RichEmbed()
        .setColor(bot.config.PrimaryColor)
        .setAuthor(`🎃 — Captured by ${msg.author.username}  (ID : ${msg.author.id})`, msg.author.avatarURL, null)
    )
  }
  if (msg.content.includes("candy") || msg.content.includes("sugar") || msg.content.includes("sweet") || msg.content.includes("bonbon")) {
    if (!msg.guild.member(bot.user).hasPermission("ADD_REACTIONS")) {
        console.log(bot.ls.warning, "The robot is not allowed to add reactions.")
        return
    } 
    msg.react('🍬').catch(e => console.error(bot.ls.error, e))

    console.log(bot.ls.info, `🍬 — Captured by ${msg.author.username} (ID : ${msg.author.id})`)
    WebhookPrivate.send(new Discord.RichEmbed()
        .setColor(bot.config.PrimaryColor)
        .setAuthor(`🍬 — Captured by ${msg.author.username}  (ID : ${msg.author.id})`, msg.author.avatarURL, null)
    )
  }
  

  if (msg.content.indexOf(bot.config.prefix) !== 0) return

  const args = msg.content.slice(bot.config.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  const cmd = bot.commands.get(command)  

  if (!cmd) return
  cmd.run(bot, WebhookPrivate, WebhookPublic, msg, args)
  
}
