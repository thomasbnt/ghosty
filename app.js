const Discord = require('discord.js');
const bot = new Discord.Client({autoReconnect: true});
const colors = require("colors");
const consola = require("consola");
const fs = require('fs');
const path = require('path');
const os = require('os');
const randomcolor = require('randomcolor');
const moment = require('moment');
const snekfetch = require('snekfetch');

try {
    var config = JSON.parse(fs.readFileSync(path.join(__dirname, '.', 'config.json'), 'utf8'))
    } catch (err) {
    if (err) throw Error('Error config.')
}

const TOKEN = config.token
const hookArray1 = config.hookArray1
const hookArray2 = config.hookArray2
const tokendiscordbotlistcom = config.tokendiscordbotlistcom
const versionofthebot = config.versionofthebot
const prefix = config.prefix

// Webhooks logs for the creator of the bot
const hook = new Discord.WebhookClient(hookArray1, hookArray2);
const hookArray = [hookArray1,hookArray2];


bot.on("guildCreate", guild => {
      
    // API Discord Bot List.com
    snekfetch.post(`https://discordbotlist.com/api/bots/${bot.user.id}/stats`)
    .set("Authorization", `Bot ${tokendiscordbotlistcom}`)
    .send({
     guilds: bot.guilds.size
    })
    .then(console.log('Updating discordbotlist.com status...'))
    .catch(e => consola.error('https://discordbotlist.com unavailable or token invalid.'));
   

    console.log(
        `Added on : ${guild.name} (${guild.id})`.bgGreen,
        `\nThere are ${bot.guilds.size.toLocaleString()} servers -  ${bot.guilds.reduce((mem, g) => mem += g.memberCount, 0)} users\n`
    )
    // New Emoji created on the server
    guild.createEmoji('favicon.png', 'ghosty').catch(e => console.info('Error : Missing perms for create emoji Ghosty.'));

    bot.user.setGame(bot.guilds.size.toLocaleString()  + "  servers - "+ bot.guilds.reduce((mem, g) => mem += g.memberCount, 0) + "  Users 🎃");
    const hookyEmbed = new Discord.RichEmbed();
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
    .catch(e => consola.error('https://discordbotlist.com unavailable or token invalid.'));
   
    console.log(
        `Bot deleted on : ${guild.name} (${guild.id})`.bgRed,
        `\nThere are ${bot.guilds.size.toLocaleString()} servers connected -  ${bot.guilds.reduce((mem, g) => mem += g.memberCount, 0)} users}`
    )

    bot.user.setGame(bot.guilds.size.toLocaleString()  + "  servers - "+ bot.guilds.reduce((mem, g) => mem += g.memberCount, 0) + "  Users 🎃");
    const hookyEmbed = new Discord.RichEmbed();
    hook.send(
      hookyEmbed
          .addField(":jack_o_lantern:      Bot deleted on : ","``" + guild.name + "`` ( "+ guild.id + " )",true)
          .addField("There are  " + bot.guilds.size.toLocaleString()  + " servers connected  ","``" + bot.guilds.reduce((mem, g) => mem += g.memberCount, 0) + "`` users")
          .setColor(0x71368a)
    )
});

bot.on("guildMemberAdd", (member) => {
    const guild = member.guild;
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
   .catch(e => consola.error('https://discordbotlist.com unavailable or token invalid.'));

    //bot.user.setUsername("Ghosty")
    //bot.user.setAvatar("./favicon.png")

   
    // SetActivity
    bot.user.setActivity(`dsc.thomasbnt.fr for support`, { type: 'WATCHING' })
    .catch(console.error);
    setInterval(game1 => {
        bot.user.setActivity(bot.guilds.size.toLocaleString()  + "  servers - "+ bot.guilds.reduce((mem, g) => mem += g.memberCount, 0) + "  users", { type: 'WATCHING' })
        .catch(console.error);
        setTimeout( game2 => {
            bot.user.setActivity(`the ${prefix}stats for information`, { type: 'WATCHING' })
            .catch(console.error);
            setTimeout(game3 => {
                bot.user.setActivity(`dsc.thomasbnt.fr for support`, { type: 'WATCHING' })
                .catch(console.error);
            }, 100000)
        }, 100000)
    }, 300000)

    console.log(
        `Connected to ${bot.user.username.red}${"#".red}${bot.user.discriminator.red}\n`,
        `${"> Numbers of users :       ".blue} ${bot.guilds.reduce((mem, g) => mem += g.memberCount, 0)}\n`,
        `${"> Numbers of channels :    ".green} ${bot.channels.size}\n`,
        `${"> Numbers of servers :     ".red} ${bot.guilds.size.toLocaleString()}\n`,
        `${"> Numbers of emojis :      ".cyan} ${bot.emojis.size}\n`,
        `${"> Version :                ".yellow} ${versionofthebot}\n`
    )
    
    setInterval(x => {
        suprise();
    }, 450000)
});

bot.on('message', (msg) => {

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
    if (msg.content.startsWith(prefix + "help")) {
        if(msg.channel.recipient) return
        console.log("help for ".red + msg.author.username + " (" + msg.author + ")" );
        var hookyEmbed = new Discord.RichEmbed();
        hook.send(
            hookyEmbed
                .addField("help by",msg.author + " - ``"  + msg.author.username + "#"+ msg.author.discriminator + "`` from ``" + msg.guild.name + "``",true)
                .setThumbnail(msg.author.avatarURL)
                .setColor(0xe67e22)
        )
        const embed = {
            "description": "Hello it's me, Ghosty! I add fun commands like random texts, animation in the servers and I like the reactions! I do not add a moderation command, I am only useful for the Halloween event. ",
            "color": 13319958,
            "footer": {
              "icon_url": "https://ghosty.thomasbnt.fr/assets/img/img-head.png",
              "text": "I'm a Ghost-y, my role? I must be scary"
            },
            "thumbnail": {
              "url": "https://ghosty.thomasbnt.fr/assets/img/img-head.png"
            },
            "fields": [
              {
                "name": prefix + "stats",
                "value": "Look at my statistics, numbers everywhere !"
              },
              {
                "name": prefix + "ping",
                "value": "try exceeding some of them!"
              },
              {
                "name": "Usefull links",
                "value": "[Website](https://ghosty.thomasbnt.fr/?utm_source=Direct_link_command_help) • [Add me](https://ghosty.thomasbnt.fr/add/?utm_source=Direct_link_command_help) • [Upvote on DBL](https://discordbotlist.com/bots/369202881955495936) • [GitHub](https://github.com/thomasbnt/ghosty) • [Contributors](https://github.com/thomasbnt/ghosty#contributors)"
              }
            ]
          };
          msg.channel.send({ embed });
    };
    // Stats
    if (msg.content.startsWith(prefix + "stats")) {
        if(msg.channel.recipient) return
        console.log("Stats for ".red + msg.author.username + " (" + msg.author + ")" );
        var hookyEmbed = new Discord.RichEmbed();
        hook.send(
            hookyEmbed
                .addField("Stats by",msg.author + " - ``"  + msg.author.username + "#"+ msg.author.discriminator + "`` from ``" + msg.guild.name + "``",true)
                .setThumbnail(msg.author.avatarURL)
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
                    "inline": true
                },
                {
                    "name": "Version  ",
                    "value": versionofthebot + "",
                    "inline": true
                }
            ]
          };
          msg.channel.send({ embed });

    }

    const responseObject = {
        "booo": "**" + msg.author.username + "** BOOOOOOO! :ghost:"
      };
      if(responseObject[msg.content.toLowerCase()]) {
        msg.channel.send(responseObject[msg.content.toLowerCase()]);
    }

    // Ghosty
    if(msg.content == "ghosty"){
        msg.react('494953448081588240').catch(e => console.error("Error with ghosty reaction"));
    }
    try {
        const words = JSON.parse(fs.readFileSync(path.join(__dirname, '.', 'words.json'), 'utf8'))
        } catch (err) {
        if (err) throw Error('Error words.json not found.')
    }
    
    if(msg.content.startsWith("")) {
        const words = msg.content;
        if(/g+h+o+s+t+/i.test(words)) { // Ghost
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
        }else if(/j+a+c+k+/i.test(words)) { // Jack
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

// Random words in random time
function suprise() {
    let channel = bot.channels.find(x => x.name === 'general');

    try {
        const words = JSON.parse(fs.readFileSync(path.join(__dirname, '.', 'words.json'), 'utf8'))
        } catch (err) {
        if (err) throw Error('Error words.json not found.')
    }

    let random = Math.floor(Math.random() * Math.floor(3)); 

    channel.send(words.list[random]);
    
}


bot.login(TOKEN);
