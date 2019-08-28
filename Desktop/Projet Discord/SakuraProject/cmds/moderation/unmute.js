const Discord = require("discord.js")
const botSettings = require("../json/botSettings.json")
const prefix = botSettings.prefix
module.exports.run = async(bot,msg,args) => {
    if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("You do not have the permission to use this");
    var embedColor = '#ffffff'
    var missingArgsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
        .setColor(embedColor)
        .setAuthor(msg.author.username, msg.author.avatarURL)
        .setTitle('Missing Arguments!')
        .setDescription('Usage: `' + prefix + 'unmute [@User]')
        .setTimestamp();
    let toMute = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.get(args[0]);
    if (!toMute) return msg.channel.send(missingArgsEmbed);
    msg.delete().catch();

    let role = msg.guild.roles.find(r => r.name === "Muted");

    if (!role || !toMute.roles.has(role.id)) return msg.channel.send("This utilisateur is unmute");

    await toMute.removeRole(role);

    delete bot.mutes[toMute.id];

    fs.writeFile("./json/mutes.json", JSON.stringify(bot.mutes), err => {
        if (err) throw err;
        console.log(`I have unmuted ${toMute}.`);
    });
}

module.exports.help = {
    name: "unmute",
    alias:"um"
}