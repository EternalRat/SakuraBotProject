const Discord = require("discord.js")
const fs = require("fs")
const raidmode = JSON.parse(fs.readFileSync("./json/raidmode.json"));
const blacklist = JSON.parse(fs.readFileSync("./cmds/security/blacklist.json"))

module.exports.run = async (bot, message, args) => {
    let active
    let guildID = message.guild.id
    if (raidmode[guildID].on === 0) {
        active = "Off"
    } else {
        active = "On"
    }

    let users
    var x = 0
    message.guild.members.forEach(member => {
        if (blacklist[member.id]) {
            x++
        } else {
            x = x
        }
    })
    if (x > 0) {
        users = "Verified, and not safe ! ❌"
    } else {
        users = "Verified, and safe ! ✅"
    }

    let settings = new Discord.RichEmbed()
        .setTitle(`${bot.user.username} settings on ${message.guild.name}`)
        .addField("Users checked?", users)
        .addField("Raidmode?", active)

    message.channel.send(settings)
}

module.exports.help = {
    name: "settings"
}