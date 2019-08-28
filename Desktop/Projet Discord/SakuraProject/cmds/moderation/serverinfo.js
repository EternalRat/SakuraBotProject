const Discord = require("discord.js")
const botSettings = require("../json/botSettings.json")
const prefix = botSettings.prefix
const moment = require("moment")

module.exports.run = async (bot, message, args) => {
    const guild = message.guild
    const arg = args.join(" ")

    switch (arg) {
        case "roles":
            message.channel.send(`Here is the emojis :\n\`\`\`${guild.roles.map(r => `${r.name}`).join(', ')}\`\`\``)
            break;

        case "emojis":
            message.channel.send(`Here is the emojis :\n\`\`\`${guild.emojis.map(r => ":" + r.name + ":").join(', ')}\`\`\``)
            break;

        case "channels":
            message.channel.send(`Here is the emojis :\n\`\`\`${guild.channels.map(r =>r.name).join(', ')}\`\`\``)
            break;

        default:
            let server = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setThumbnail(guild.iconURL)
                .setTitle(`☆━━━━━━☆ Informations about the server ☆━━━━━━☆`)
                .addField("Server name:", `${guild.name}`, true)
                .addField("Guild ID:", `${guild.id}`, true)
                .addField("Verification level:", `${guild.verificationLevel}`, true)
                .addField("Region:", `${guild.region}`, true)
                .addField("Total member:", `${guild.memberCount}`, true)
                .addField("Owner of the server:", `${guild.owner}`, true)
                .addField("Server creation:", `${moment.utc(guild.createdAt).format("dddd Do MMMM in YYYY, HH:mm:ss")}`, true)
                .addField("Channels:", "Make the **s!server channels** command to see the channel of the server")
                .addField("Emojis:", "Make the **s!server emojis** command to see the emojis of the server")
                .addField("Roles:", "Make the **s!server roles** command to see the roles of the server")
                .setFooter(`Copyright - ${bot.user.username}`, bot.user.displayAvatarURL)

            message.channel.send(server)
            break;
    }
}
module.exports.help = {
    name: "serverinfo",
    alias: "s"
}