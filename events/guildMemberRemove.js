const Discord = require('discord.js')
module.exports = (bot, WebhookPrivate, WebhookPublic, member) => {
    
    bot.updatePresence()
    const guild = member.guild

    console.log(bot.ls.info, `📤  — ${member.user.tag} (${member.user.id}) leaved ${guild.name}`)
}
