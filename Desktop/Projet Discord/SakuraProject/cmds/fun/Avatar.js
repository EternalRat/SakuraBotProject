const Discord = require("discord.js")
const botSettings = require("../json/botSettings.json")
const prefix = botSettings.prefix

module.exports.run = async (bot, message, args) => {
    let msg = await message.channel.send("Generating Avatar...");
    let user = message.mentions.users.first() || message.author;
    let avatar = new Discord.RichEmbed()
        .setTitle("Avatar")
        .setDescription(`Here is the avatar of ${user.username}`)
        .setImage(user.displayAvatarURL)
        .setFooter(`Copyright - ${bot.user.username}`, bot.user.displayAvatarURL)

    message.channel.send(avatar)
    msg.delete()
}
module.exports.help = {
    name: "avatar",
    alias: "a"
}