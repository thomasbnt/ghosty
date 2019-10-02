const Discord = require('discord.js')

exports.run = async (bot, WebhookPrivate, WebhookPublic, msg) => {

    if (msg.channel.recipient) return
    if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
        msg.delete(msg.author).catch(e => console.log(bot.ls.warning, "The robot does not have permission to delete the command made by the user."))
    }

    msg.channel.send(new Discord.RichEmbed()
        .setColor(bot.config.PrimaryColor)       
        .addField("Numbers of servers",`**${bot.guilds.size.toLocaleString()}** Servers connected to the hell`, true)
        .addField("Numbers of users", `**${bot.guilds.reduce((mem, g) => mem += g.memberCount, 0)}** Users who will be ghosts`, true)
        .addField("Numbers of Channels", bot.channels.size, true)
        .addField("Numbers of emojis", bot.emojis.size, true)
        .addField("__", "Technical informations :",false)
        .addField("Version of Discord.js", Discord.version, true)
        .addField("Type of hosting", "VPS Debian-9.4-x86_64", true)
        .setFooter("I'm a Ghost-y, my role? I must be scary.", msg.author.avatarURL)
    )

    console.log(bot.ls.info, bot.config.prefix + "stats " + " by " + msg.author.tag + " (" + msg.author.id + ")")
    WebhookPrivate.send(new Discord.RichEmbed()
        .setColor(bot.config.PrimaryColor)
        .setDescription("** " + bot.config.prefix + "stats ** — By " + msg.author.tag)
        .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
    )

}