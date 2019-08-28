const Discord = require("discord.js")
const botSettings = require("../json/botSettings.json")
const prefix = botSettings.prefix

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You haven't the right for this !");
  var embedColor = '#ffffff'
  var missingArgsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
    .setColor(embedColor)
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle('Missing Arguments!')
    .setDescription('Usage: `' + prefix + 'kick [@User] [Reason]')
    .setTimestamp();

  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!kUser) return message.channel.send(missingArgsEmbed);
  if (kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
  message.delete().catch();

  let kickEmbed = new Discord.RichEmbed()
    .setDescription("☆━━━━━━☆ Kick ☆━━━━━━☆")
    .setColor("#ff0000")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Tiime", message.createdAt)
    .addField("Reason", kReason);

  message.guild.member(kUser).kick(kReason);
  message.channel.send(kickEmbed)
}

module.exports.help = {
  name: "kick",
  alias: "k"
};

