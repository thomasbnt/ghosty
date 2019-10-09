const Discord = require('discord.js')

exports.run = async (bot, WebhookPrivate, WebhookPublic, msg) => {

    if (msg.channel.recipient) return
    if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
        msg.delete(msg.author).catch(e => console.log(bot.ls.warning, "The robot does not have permission to delete the command made by the user."))
    }

    msg.channel.send(new Discord.RichEmbed()
        .setColor(bot.config.PrimaryColor)
        .setDescription("Hello it's me, Ghosty! I like reactions ! find them all if you like it 🎃" + 
        "I do not add a moderation command, I am only useful for the Halloween event.\n\n" +
	"This bot is **Open Source**, which means that _anyone_ [can participate in the project](https://github.com/thomasbnt/ghosty), to add commands or features related to Halloween!")
        .setThumbnail(bot.user.avatarURL)
        .addField(`${bot.config.prefix}stats`,"Look at my statistics, numbers everywhere! ", true)
        .addField(`Usefull links`,`[Add me on your server !](https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=201714752) • [Upvote on DBL](https://discordbotlist.com/bots/369202881955495936) • [GitHub](https://github.com/thomasbnt/ghosty) • [Contributors](https://github.com/thomasbnt/ghosty#contributors)`)
        .setFooter("I'm a Ghost-y, my role? I must be scary.", msg.author.avatarURL)
    ) 

    console.log(bot.ls.info, bot.config.prefix + "help " + " by " + msg.author.tag + " (" + msg.author.id + ")")
    WebhookPrivate.send(new Discord.RichEmbed()
        .setColor(bot.config.PrimaryColor)
        .setDescription("** " + bot.config.prefix + "help ** — By " + msg.author.tag)
        .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
    )
}
