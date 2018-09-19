const Discord = require('discord.js');
const bot = new Discord.Client({autoReconnect: true});
const colors = require("colors");
const fs = require('fs')
const path = require('path')
const os = require('os')
const randomcolor = require('randomcolor');
const moment = require('moment');
const snekfetch = require('snekfetch');

try {
    var config = JSON.parse(fs.readFileSync(path.join(__dirname, '.', 'config.json'), 'utf8'))
    } catch (err) {
    if (err) throw Error('Error config.')
}
let TOKEN = config.token
let hookArray1 = config.hookArray1
let hookArray2 = config.hookArray2
let tokendiscordbotlistcom = config.tokendiscordbotlistcom
let versionofthebot = config.versionofthebot
let prefix = config.prefix

// Webhooks logs for the creator of the bot
const hook = new Discord.WebhookClient(hookArray1, hookArray2);
var hookArray = [hookArray1,hookArray2];


bot.on("guildCreate", guild => {
      
    // API Discord Bot List.com
    snekfetch.post(`https://discordbotlist.com/api/bots/${bot.user.id}/stats`)
    .set("Authorization", `Bot ${tokendiscordbotlistcom}`)
    .send({
     guilds: bot.guilds.size
    })
    .then(console.log('Updating discordbotlist.com status...'))
    .catch(e => consola.error('https://discordbotlist.com insdisponible or token invalid.'));
   
    console.log(` Added on : ${guild.name} (${guild.id})`.bgGreen);
    console.log("There are  " + bot.guilds.size.toLocaleString()  + " servers -  "  + bot.guilds.reduce((mem, g) => mem += g.memberCount, 0) + " users");
    console.log("");
    // New Emoji created on the server
    guild.createEmoji('favicon.png', 'ghosty').catch(e => console.info('Error : Missing perms for create emoji Ghosty.'));

    bot.user.setGame(bot.guilds.size.toLocaleString()  + "  servers - "+ bot.guilds.reduce((mem, g) => mem += g.memberCount, 0) + "  Users 🎃");
    var hookyEmbed = new Discord.RichEmbed();
    hook.send(
      hookyEmbed
          .addField(":ghost:       Added on : ","``" + guild.name + "`` ( "+ guild.id + " )",true)
          .addField("There are  " + bot.guilds.size.toLocaleString()  + " servers connected  ","``" + bot.guilds.reduce((mem, g) => mem += g.memberCount, 0) + "`` users")
          .setColor(0x71368a)
    )
});
bot.on("guildDelete", guild => {
      
    // API Discord Bot List.com
    snekfetch.post(`https://discordbotlist.com/api/bots/${bot.user.id}/stats`)
    .set("Authorization", `Bot ${tokendiscordbotlistcom}`)
    .send({
     guilds: bot.guilds.size
    })
    .then(console.log('Updating discordbotlist.com status...'))
    .catch(e => consola.error('https://discordbotlist.com insdisponible or token invalid.'));
   
    console.log(`Bot deleted on : ${guild.name} (${guild.id})`.bgRed);
    console.log("There are  " + bot.guilds.size.toLocaleString()  + " servers connected -  "  + bot.guilds.reduce((mem, g) => mem += g.memberCount, 0) + " users");
    console.log("");
    bot.user.setGame(bot.guilds.size.toLocaleString()  + "  servers - "+ bot.guilds.reduce((mem, g) => mem += g.memberCount, 0) + "  Users 🎃");
    var hookyEmbed = new Discord.RichEmbed();
    hook.send(
      hookyEmbed
          .addField(":jack_o_lantern:      Bot deleted on : ","``" + guild.name + "`` ( "+ guild.id + " )",true)
          .addField("There are  " + bot.guilds.size.toLocaleString()  + " servers connected  ","``" + bot.guilds.reduce((mem, g) => mem += g.memberCount, 0) + "`` users")
          .setColor(0x71368a)
    )
});

bot.on("guildMemberAdd", (member) => {
    const guild = member.guild;
    var embed = new Discord.RichEmbed();
    bot.user.setGame(bot.guilds.size.toLocaleString()  + "  servers - "+ bot.guilds.reduce((mem, g) => mem += g.memberCount, 0) + "  Users 🎃");
    console.log(`>_ ${member.user.username}#${member.user.discriminator} join ${guild.name}`.green);
});

bot.on("guildMemberRemove", (member) => {
    const guild = member.guild;
    bot.user.setGame(bot.guilds.size.toLocaleString()  + "  servers - "+ bot.guilds.reduce((mem, g) => mem += g.memberCount, 0) + "  Users 🎃");
    console.log(`>_ ${member.user.username}#${member.user.discriminator} leave ${guild.name}`.red);
});

// Ready? Set? Go!
bot.on('ready', () => {

   // API Discord Bot List.com
   snekfetch.post(`https://discordbotlist.com/api/bots/${bot.user.id}/stats`)
   .set("Authorization", `Bot ${tokendiscordbotlistcom}`)
   .send({
    guilds: bot.guilds.size
   })
   .then(console.log('Updating discordbotlist.com status...'))
   .catch(e => consola.error('https://discordbotlist.com insdisponible or token invalid.'));


    bot.user.setActivity(bot.guilds.size.toLocaleString()  + "  servers - "+ bot.guilds.reduce((mem, g) => mem += g.memberCount, 0) + "  users", { type: 'WATCHING' })
    .catch(console.error);


    console.log("Connected to  " + bot.user.username.red + ' #'.red + bot.user.discriminator.red);
    console.log("> Numbers of users :       ".blue +  bot.guilds.reduce((mem, g) => mem += g.memberCount, 0));
    console.log("> Numbers of channels :    ".green + bot.channels.size);
    console.log("> Numbers of servers :     ".red + bot.guilds.size.toLocaleString());
    console.log("> Numbers of emojis :      ".cyan + bot.emojis.size);
    console.log("> Version :                ".yellow + versionofthebot);
});

bot.on('message', (msg) => {

// Importants vars
let msgContent = msg.content
let msgUser = msg.author
let msgMember = msg.member
let msgChannel = msg.channel

    if (msg.author.bot) return;

    // -------------------------------------------------------------------------------------
    //
    //
    //    Hello, It's Thomas Bnt, please keep this command and don't touch for informations.
    //               Add links if you want but don't erase. Thx for u :)
    //
    //
    // -------------------------------------------------------------------------------------
    // Stats
    if (msgContent.startsWith(prefix + " stats")) {
        if(msgChannel.recipient) return
        console.log("Stats for ".red + msg.author.username + " (" + msg.author + ")" );
        var hookyEmbed = new Discord.RichEmbed();
        hook.send(
            hookyEmbed
                .addField("Stats by",msgUser + " - ``"  + msgUser.username + "#"+ msgUser.discriminator + "`` from ``" + msg.guild.name + "``",true)
                .setThumbnail(msgUser.avatarURL)
                .setColor(0xe67e22)
        )
        const embed = {
            "color": 13319958,
            "fields": [
                {
                    "name": "Users who will be ghosts ",
                    "value": "**" + bot.guilds.reduce((mem, g) => mem += g.memberCount, 0) + "**  ghosters",
                    "inline": true
                },
                {
                    "name": "Servers connected to the hell ",
                    "value": "**" + bot.guilds.size.toLocaleString() + "**  servers",
                    "inline": true
                },
                {
                    "name": "Uptime  ",
                    "value": (Math.round(bot.uptime / (1000 * 60 * 60))) + " hour(s), " + (Math.round(bot.uptime / (1000 * 60)) % 60) + " minute(s), and " + (Math.round(bot.uptime / 1000) % 60) + " second(s)" + "",
                    "inline": false
                },
                {
                    "name": "Version  ",
                    "value": "V " + versionofthebot + "",
                    "inline": false
                },
                {
                    "name": "More soon !",
                    "value": "Don't worry, the bot will be online for halloween event 2o18 !",
                    "inline": false
                }
            ]
          };
          msgChannel.send({ embed });

    }






    var responseObject = {
        "booo": "**" + msg.author.username + "** BOOOOOOO! :ghost:"
      };
      if(responseObject[msg.content.toLowerCase()]) {
        msg.channel.send(responseObject[msg.content.toLowerCase()]);
    }

    // Ghosty
    if(msg.content == "ghosty"){
        msg.channel.send('<:ghosty:478615972216045568>');
    }
    // Ghost
    if(msg.content.startsWith("")) {
        var words = msg.content;
        if(/g+h+o+s+t+/i.test(words)) {
            if(/^g+h+o+s+t+$/i.test(words)) {
                msg.react("👻");
            } else if(/^g+h+o+s+t+/i.test(words)) {
                if(/^g+h+o+s+t+ /i.test(words)) {
                    msg.react("👻");
                }
            } else if(/g+h+o+s+t+$/i.test(words)) {
                if(/ g+h+o+s+t+$/i.test(words)) {
                    msg.react("👻");
                }
            }
        }
    }
    // Jack
    if(msg.content.startsWith("")) {
        var words = msg.content;
        if(/j+a+c+k+/i.test(words)) {
            if(/^j+a+c+k+$/i.test(words)) {
                msg.react("🎃");
            } else if(/^j+a+c+k+/i.test(words)) {
                if(/^j+a+c+k+ /i.test(words)) {
                    msg.react("🎃");
                }
            } else if(/j+a+c+k+$/i.test(words)) {
                if(/ j+a+c+k+$/i.test(words)) {
                    msg.react("🎃");
                }
            }
        }
    }
});

bot.login(TOKEN);
