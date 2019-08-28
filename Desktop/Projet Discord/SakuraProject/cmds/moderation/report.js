const Discord = require("discord.js");
const botSettings = require("../json/botSettings.json")
const prefix = botSettings.prefix
module.exports.run = async (bot, message, args) => {
    let missingargs = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle("Missing arguments !")
        .setDescription(`Wrong usage ! ${prefix}report @user [reason]`)

    let target = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0])
    let reason = args.join(" ").slice(22)
    if (!target || !reason) return message.channel.send(missingargs)

    let reportembed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`A report from ${message.author.username} about ${target.user.username}`)
        .setDescription(reason)
        .setTimestamp()

    let reportsalon = message.guild.channels.find("name", "reports")
    if (!reportsalon) {
        message.guild.createChannel("reports", "text", [{
            id: message.guild.id,
            deny: "VIEW_CHANNEL"
        }]).then(reportsalon => {
            reportsalon.send(reportembed)
        })
    } else {
        await reportsalon.send(reportembed)
    }

}

module.exports.help = {
    name: "report",
    alias: "rep"
}
