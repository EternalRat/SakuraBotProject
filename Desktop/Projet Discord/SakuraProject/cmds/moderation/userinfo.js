const Discord = require("discord.js")
const botSettings = require("../json/botSettings.json")
const prefix = botSettings.prefix
const moment = require("moment")
var x = 0

module.exports.run = async (bot, message, args) => {
    const user = message.mentions.users.first() || message.author
    const target = message.guild.member(message.mentions.users.first()) || message.guild.member(message.author)
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have the permission to use this")
    bot.guilds.forEach(count => {
        if (count.member(user)) {
            x = x + 1
        }
    });
    let userInfo = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("☆━━━━━━☆ Informations about the user ☆━━━━━━☆")
        .setThumbnail(user.displayAvatarURL)
        .addField("The username:", `${user.tag}`, true)
        .addField("The ID:", `${user.id}`, true)
        .addField("Shared servers :", x, true)
        .addField("Account creation date:", moment.utc(message.guild.member(target).createdAt).format("dddd Do MMMM in YYYY, HH:mm:ss"))
        .addField("Joined the server the:", moment.utc(message.guild.member(target).joinedAt).format("dddd Do MMMM in YYYY, HH:mm:ss"))
        .addField("Roles", target.roles.map(r => r.name + ",").join(' '), true)
        .addField("Bot?!", `${user.bot}`, true)
        .setFooter(`Copyright - ${bot.user.username}`, bot.user.displayAvatarURL)
    message.channel.send(userInfo)

}


module.exports.help = {
    name: "userinfo",
    alias: "u"
}