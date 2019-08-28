const Discord = require('discord.js');
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./json/warnings.json", "utf8"));
const botSettings = require("../json/botSettings.json")
const prefix = botSettings.prefix
var embedColor = '#ffffff'
module.exports.run = async (bot, message, args) => {
    var missingPermissionsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Insufficient Permissions!')
        .setDescription('You need the `MANAGE_MESSAGES` permission to use this command!')
        .setTimestamp();
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(missingPermissionsEmbed);
    var missingArgsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Missing Arguments!')
        .setDescription('Usage: `' + prefix + 'seewarn [@User]')
        .setTimestamp();
    let mentioned = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])); // Gets the user mentioned!
    if (!mentioned) return message.channel.send(missingArgsEmbed); // Triggers if the user donsn't tag a user in the message

    var warningEmbed = new Discord.RichEmbed()
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`☆━━━━━━☆ Seewarn ☆━━━━━━☆`)
        .setDescription(`Number of warning for ${mentioned}`)
        .addField(`Number of warning`, warns[mentioned.id].warns)
        .setTimestamp();

    if (!warns[mentioned.id]) warns[mentioned.id] = {
        warns: 0
    }

    message.delete();
    if (warns[mentioned.id].warns == null) {
        message.channel.send("This user has any warn actually");
    } else if (warns[mentioned.id].warns >= 1) {
        message.channel.send(warningEmbed);
    }
}

module.exports.help = {
    name: "seewarn",
    alias: "sw"
}