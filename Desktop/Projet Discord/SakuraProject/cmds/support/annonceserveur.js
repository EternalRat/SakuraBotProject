const Discord = require("discord.js")

module.exports.run = async (bot, msg, args) => {
    if (msg.author.id === "291646942038196224" || msg.author.id === "537272221375266818") {
        bot.guilds.forEach(guild => {
            let embed = new Discord.RichEmbed()
                .setTitle(`An announce from ${msg.author.tag} for the server ${guild.name} has been made`)
                .setTimestamp()
                .setThumbnail(bot.user.avatarURL)
                .setColor("#FF0000")
                .setDescription(args.join(' '))
            guild.channels.find("name", "📃-annonces").send(embed)
        });
    } else {
        msg.channel.send("You're not my boss cya bitches <3")
    }
}

module.exports.help = {
    name: "annonce"
}