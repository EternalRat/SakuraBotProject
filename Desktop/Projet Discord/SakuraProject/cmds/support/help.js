const Discord = require("discord.js")
const botSettings = require("../json/botSettings.json")
const prefix = botSettings.prefix

module.exports.run = async (bot, message, args) => {
    let moderator = new Discord.RichEmbed()
        .setTitle("**:cop:** Moderation Help")
        .setThumbnail(bot.user.avatarURL)
        .addField("**`" + prefix + "kick`**", "Kick an user {s!kick @... [reason]}")
        .addField("**`" + prefix + "ban`**", "Ban an user from this server {s!ban @... [reason]}")
        .addField("**`" + prefix + "report`**", "Report an user from this server {s!report @... [reason]}")
        .addField("**`" + prefix + "mute`**", "Mute an user from this server {s!mute @... [time or no]}")
        .addField("**`" + prefix + "unmute || um`**", "Unmute an user")
        .addField("**`" + prefix + "warn || w`**", "Warn an user {s!warn @... [reason]}")
        .addField("**`" + prefix + "seewarn || sw`**", "See warnings of an user {s!seewarn @...}")
        .addField("**`" + prefix + "deletewarn || dw`**", "Delete warnings of an user {s!deletewarn @... [number]}")
        .addField("**`" + prefix + "deleteallwarn || daw`**", "Delete warnings of an user {s!deletewarn @...}")
        .addField("**`" + prefix + "clear || c`**", "Clear messages {s!clear [number]}")
        .addField("**`" + prefix + "serverlist || sv`**", "Display 15 servers where the bot is")
        .addField("**`" + prefix + "serverinfo`**", "Display server's information")
        .addField("**`" + prefix + "userinfo`**", "Display user's information")
        .addField("**`" + prefix + "randomevent`**", "Pick a random event or show the event list")
        .addField("**`" + prefix + "blacklist`**", "Only for creators !")
        .addField("**`" + prefix + "give`**", "Only for administrators in the server, give xp !")
        .addField("**`" + prefix + "remove`**", "Only for administrators in the server, remove xp !")
        .setColor("#FF0000")
        .setFooter(`Copyright - ${bot.user.username}`, bot.user.displayAvatarURL)

    let fun = new Discord.RichEmbed()
        .setColor("#00FF00")
        .setTitle("**:tada:** Fun Help")
        .setThumbnail(bot.user.avatarURL)
        .addField("**`" + prefix + "hug`**", "Hug someone {s!hug [@...]}")
        .addField("**`" + prefix + "kiss`**", "Kiss someone {s!kiss [@...]}")
        .addField("**`" + prefix + "slap`**", "Slap someone {s!slap [@...]}")
        .addField("**`" + prefix + "cry`**", "Make someone crying or cry alone {s!slap [@...]}")
        .addField("**`" + prefix + "rank`**", "Display user's rank")
        .addField("**`" + prefix + "gif`**", "Display a random gif from Giphy with your words")
        .addField("**`" + prefix + "inviteboard`**", "Display the users who has invited peoples")
        .addField("**`" + prefix + "leaderboard`**", "Display the top 15 users")
        .addField("**`" + prefix + "citation`**", "Display some citations")
        .addField("**`" + prefix + "avatar`**", "Display user's avatar")
        .setFooter(`Copyright - ${bot.user.username}`, bot.user.displayAvatarURL)

    let security = new Discord.RichEmbed()
        .setTitle("**:computer:** Security Help")
        .setColor("#FF0000")
        .setThumbnail(bot.user.avatarURL)
        .setFooter(`Copyright - ${bot.user.username}`, bot.user.displayAvatarURL)
        .addField("**`" + prefix + "raidmode`**", "Activate the raidmode, any users can come more in your server before you do it again.")
        .addField("**`" + prefix + "verify`**", "Verify if someone in your server is on our blacklist.")
        .addField("**`" + prefix + "checkid`**", "Verify if an user is on our blacklist.")

    let support = new Discord.RichEmbed()
        .setTitle("**:tickets:** Support Help")
        .setColor("#00FFFF")
        .setThumbnail(bot.user.avatarURL)
        .setFooter(`Copyright - ${bot.user.username}`, bot.user.displayAvatarURL)
        .addField("**`" + prefix + "annnonce`**", "Faire une annonce intra-serveur (là ou le bot est présent)")
        .addField("**`" + prefix + "special`**", "Faire une annonce intra-serveur (là ou le bot est présent aux staffs ou à l'owner)")

    message.author.send(moderator)
    message.author.send(security)
    message.author.send(fun)
    message.author.send(support)
    message.delete().catch()
}

module.exports.help = {
    name: "help",
    alias: "h"
}