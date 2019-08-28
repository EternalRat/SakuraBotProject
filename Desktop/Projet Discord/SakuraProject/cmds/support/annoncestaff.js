const Discord = require("discord.js")

module.exports.run = async (bot, msg, args) => {
    if (msg.author.id === "291646942038196224" || msg.author.id === "537272221375266818") {
        bot.guilds.forEach(guild => {
            guild.members.forEach(member => {
                let embed = new Discord.RichEmbed()
                    .setTitle(`An announce from ${msg.author.tag} for the staff of the server ${guild.name} has been made`)
                    .setTimestamp()
                    .setThumbnail(bot.user.avatarURL)
                    .setColor("#FF0000")
                    .setDescription(args.join(' '))
                if (member.hasPermission("ADMINISTRATOR") && !member.bot && member.id !== bot.user.id) {
                    try {
                        member.send(embed)
                    } catch (error) {
                        console.log(member.tag)
                    }
                }
            })
        });
    } else {
        msg.channel.send("You're not my boss cya bitches <3")
    }
}

module.exports.help = {
    name: "special"
}