const Discord = require("discord.js")
const fs = require("fs")
const blacklist = JSON.parse(fs.readFileSync("./cmds/security/blacklist.json"));

module.exports.run = async (bot, msg, args) => {
    let target = args[0]
    let dangerous = "The following person are dangerous : \n"

    let clear = new Discord.RichEmbed()
        .setTitle(":white_check_mark: This user isn't in our blacklist !")
        .setFooter("We recommand you to check your server one time a week. | " + bot.user.username, bot.user.displayAvatarURL)
    let danger = new Discord.RichEmbed()
        .setTitle(":x: This user is in our blacklist, he can be dangerous be careful ! This person is in the blacklist for the following reason :\n" + blacklist[target].reason)
        .setFooter("We recommand you to check your server one time a week. | " + bot.user.username, bot.user.displayAvatarURL)

    if (blacklist[target]) {
        msg.channel.send(danger)
    } else {
        msg.channel.send(clear)
    }
}

module.exports.help = {
    name: "checkid"
}