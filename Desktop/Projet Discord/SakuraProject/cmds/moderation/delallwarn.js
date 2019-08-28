const Discord = require("discord.js");
const fs = require ("fs");
let warns = JSON.parse(fs.readFileSync("./json/warnings.json", "utf8"));
const botSettings = require("../json/botSettings.json")
const prefix = botSettings.prefix

module.exports.run = async (bot, message, args) => {
    var embedColor = '#ffffff'

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
        .setDescription('Usage: `' + prefix + 'deleteallwarn [@User]')
        .setTimestamp();
    let mentioned = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])); // Gets the user mentioned!
    if (!mentioned) return message.channel.send(missingArgsEmbed);

    if (!warns[mentioned.id]) warns[mentioned.id] = {
        warns: 0
    }
    warns[mentioned.id].warns = warns - warns;

    fs.writeFile(`./json/warnings.json`, JSON.stringify(warns), (err) => {
        if (err) console.log(err)
    });

    var dwEmbed = new Discord.RichEmbed()
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Number of warning deleted for ${mentioned}`)
        .addField(`Number of warning deleted`, warns)
        .setTimestamp();

    message.channel.send(dwEmbed)
}

module.exports.help = {
    name: "deleteallwarn",
    alias: "daw"
}