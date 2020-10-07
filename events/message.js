const Discord = require('discord.js')

module.exports = async (bot, WebhookPrivate, WebhookPublic, msg) => {

  if (msg.author.bot) return
  if (msg.author.id === bot.user.id) return
  if (msg.channel.recipient) return
  let content = msg.content.toLowerCase()

  if (content.includes("web") || content.includes("spider") || content.includes("araignée")) {
    if (!msg.guild.member(bot.user).hasPermission("ADD_REACTIONS")) {
        console.log(bot.ls.warning, "The bot is not allowed to add reactions.")
        return
    } else {
    msg.react('🕷').catch(e => console.error(bot.ls.error, e))
    
    console.log(bot.ls.info, `🕷 — Captured by ${msg.author.username} (ID : ${msg.author.id})`)
    WebhookPrivate.send(new Discord.RichEmbed()
        .setColor(bot.config.PrimaryColor)
        .setAuthor(`🕷 — Captured by ${msg.author.username}  (ID : ${msg.author.id})`, msg.author.avatarURL, null)
    )
  }
  }
  if (content.includes("ghost") || content.includes("fantome") || content.includes("boo")) {
    if (!msg.guild.member(bot.user).hasPermission("ADD_REACTIONS")) {
        console.log(bot.ls.warning, "The bot is not allowed to add reactions.")
        return
    } else {
      msg.react('👻').catch(e => console.error(bot.ls.error, e))
    console.log(bot.ls.info, `👻 — Captured by ${msg.author.username} (ID : ${msg.author.id})`)
    WebhookPrivate.send(new Discord.RichEmbed()
        .setColor(bot.config.PrimaryColor)
        .setAuthor(`👻 — Captured by ${msg.author.username}  (ID : ${msg.author.id})`, msg.author.avatarURL, null)
    )
    }
  }
  if (content.includes("jack") || content.includes("jacky")) {
    if (!msg.guild.member(bot.user).hasPermission("ADD_REACTIONS")) {
        console.log(bot.ls.warning, "The bot is not allowed to add reactions.")
        return
    } else {
    msg.react('🎃').catch(e => console.error(bot.ls.error, e))
    console.log(bot.ls.info, `🎃 — Captured by ${msg.author.username} (ID : ${msg.author.id})`)
    WebhookPrivate.send(new Discord.RichEmbed()
        .setColor(bot.config.PrimaryColor)
        .setAuthor(`🎃 — Captured by ${msg.author.username}  (ID : ${msg.author.id})`, msg.author.avatarURL, null)
    )
    }
  }
  if (content.includes("candy") || content.includes("sugar") || content.includes("sweet") || content.includes("bonbon")) {
    if (!msg.guild.member(bot.user).hasPermission("ADD_REACTIONS")) {
        console.log(bot.ls.warning, "The bot is not allowed to add reactions.")
        return
    } else {
    msg.react('🍬').catch(e => console.error(bot.ls.error, e))
    console.log(bot.ls.info, `🍬 — Captured by ${msg.author.username} (ID : ${msg.author.id})`)
    WebhookPrivate.send(new Discord.RichEmbed()
        .setColor(bot.config.PrimaryColor)
        .setAuthor(`🍬 — Captured by ${msg.author.username}  (ID : ${msg.author.id})`, msg.author.avatarURL, null)
    )
    }
  }
  

  if (msg.content.indexOf(bot.config.prefix) !== 0) return

  const args = msg.content.slice(bot.config.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  const cmd = bot.commands.get(command)  

  if (!cmd) return
  cmd.run(bot, WebhookPrivate, WebhookPublic, msg, args)
  
}
