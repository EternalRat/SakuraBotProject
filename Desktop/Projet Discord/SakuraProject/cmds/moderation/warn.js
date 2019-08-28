const Discord = module.require('discord.js');
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./json/warnings.json", "utf8"));
const botSettings = require("../json/botSettings.json")
const prefix = botSettings.prefix

module.exports.run = async (bot, message, args) => {
    var embedColor = '#ffffff' // Change this to change the color of the embeds!
    var missingPermissionsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Insufficient Permissions!')
        .setDescription('You need the `MANAGE_MESSAGES` permission to use this command!')
        .setTimestamp();
    var missingArgsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Missing Arguments!')
        .setDescription('Usage: `' + prefix + 'warn [@User] [Reason]')
        .setTimestamp();
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(missingPermissionsEmbed); // Checks if the user has the permission
    let mentioned = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]); // Gets the user mentioned!
    if (!mentioned) return message.channel.send(missingArgsEmbed); // Triggers if the user donsn't tag a user in the message
    let reason = args.slice(1).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word
    if (!reason) return message.channel.send(missingArgsEmbed); // Triggers if the user dosn't provide a reason for the warning

    var warningEmbed = new Discord.RichEmbed() // Creates the embed that's DM'ed to the user when their warned!
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`You've been warned in ${message.guild.name}`)
        .addField('Warned by', message.author.tag)
        .addField('Reason', reason)
        .setTimestamp();
    mentioned.send(warningEmbed); // DMs the user the above embed!
    var warnSuccessfulEmbed = new Discord.RichEmbed() // Creates the embed thats returned to the person warning if its sent.
        .setColor(embedColor)
        .setTitle('User Successfully Warned!');
    message.channel.send(warnSuccessfulEmbed); // Sends the warn successful embed
    message.delete(); // Deletes the command
    if (!warns[mentioned.id]) warns[mentioned.id] = {
        warns: 0
    }
    warns[mentioned.id].warns++;

    fs.writeFile(`./json/warnings.json`, JSON.stringify(warns), (err) => {
        if (err) console.log(err)
    });

    if (warns[mentioned.id].warns === 3) {
        let role = message.guild.roles.find(r => r.name === "Muted");
        if (!role) {
            try {
                await message.guild.createRole({
                    name: "Muted",
                    color: "#000000",
                    permissions: []
                });
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(role, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (e) {
                console.log(e.stack);
            }
        }
        bot.mutes[mentioned.id] = {
            guild: message.guild.id,
            time: Date.now() + 3600 * 1000
        }
        await mentioned.addRole(role);
        fs.writeFile("./json/mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
            if (err) throw err;
            message.channel.send(`${mentioned} has been muted.`);
        })
    }

    if (warns[mentioned.id].warns === 5) {
        message.guild.member(mentioned).ban(reason);
        message.channel.send(`${mentioned} has been banned.`);
    }
}

module.exports.help = {
    name: "warn",
    alias: "w"
}