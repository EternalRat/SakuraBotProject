const Discord = require("discord.js")
const fs = require("fs")
const blacklist = JSON.parse(fs.readFileSync("./cmds/security/blacklist.json"));
var dangerous = []
var x = 0

module.exports.run = async (bot, msg, args) => {
    let clear = new Discord.RichEmbed()
        .setTitle(":white_check_mark: All the users has been checked, and your server is clean !")
        .setFooter("We recommand you to check your server one time a week. | " + bot.user.username, bot.user.displayAvatarURL)
    let danger = new Discord.RichEmbed()
        .setTitle(":x: All the users has been checked, and your server has a problem ! You must be careful ! The ID of the dangerous person has been sent into the DM of the owner ! For more information about the reason type s!checkid + the id of the person")
        .setFooter("We recommand you to check your server one time a week. | " + bot.user.username, bot.user.displayAvatarURL)
    dangerous = "Their tags are :\n\n"

    msg.guild.members.forEach(member => {
        if (blacklist[member.id]) {
            dangerous += member.user.tag + " id : " + member.id + "\n"
            x++
        } else {
            x = x
        }
    })
    if (x > 0) {
        msg.channel.send(danger)
        msg.guild.owner.send(dangerous)
        x = 0;
    } else {
        msg.channel.send(clear)
    }
}

module.exports.help = {
    name: "verify"
}