const Discord = require('discord.js')
const moment = require('moment')

module.exports = (bot, WebhookPrivate, WebhookPublic, member) => {

    const guild = member.guild

    console.log(bot.ls.info, `📥  — ${member.user.tag} (${member.user.id}) joined ${guild.name}`)
}
