const Discord = require("discord.js")
const botSettings = require("../json/botSettings.json")
const prefix = botSettings.prefix

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You haven't the right for this !")
    var embedColor = '#ffffff'
    var missingArgsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Missing Arguments!')
        .setDescription('Usage: `' + prefix + 'ban [@User] [Reason]')
        .setTimestamp();
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!bUser) return message.channel.send(missingArgsEmbed);
    let bReason = args.join(" ").slice(22);
    if (!bReason) return message.channel.send(missingArgsEmbed)
    if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You haven't the right for this !");
    message.delete().catch();

    let banEmbed = new Discord.RichEmbed()
        .setDescription("☆━━━━━━☆ Ban ☆━━━━━━☆")
        .setColor("#ff0000")
        .addField("Banned User", `${bUser} with ID ${bUser.id}`)
        .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Banned In", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", bReason);

    message.guild.member(bUser).ban(bReason);
    message.channel.send(banEmbed)
}

module.exports.help = {
  name: "ban",
  alias: "b"
};