const Discord = require("discord.js")

module.exports.run = async (bot, msg, args) => {
    if (msg.channel.name === "🎟-ticket") {
        let category = msg.guild.channels.find(c => c.name === "Tickets" && c.type === "category")
        if (!category) {
            msg.guild.createChannel("Tickets", "category").then(async(ch) => {
            let msg1 = await msg.channel.send("Do again your command please !")
            setTimeout(() => {
                msg1.delete()
            }, 3000);
            })
        } else {
            let channel = await msg.guild.createChannel(`tickets-${msg.author.username}`, "text", [{
                id: msg.author.id,
                allow: "VIEW_CHANNEL"
            },
            {
                id: msg.guild.id,
                deny: "VIEW_CHANNEL"
            },
            {
                id: msg.guild.roles.find(r => r.name === "Staff").id,
                allow: "VIEW_CHANNEL"
            }])
            channel.setParent(category).then(async (newchannel) => {
                msg.delete().catch()
                let embed2 = new Discord.RichEmbed()
                    .setTitle("☆━━━━━━☆ Ticket open ☆━━━━━━☆")
                    .setDescription("Une fois que vous aurez finit avec le ticket, veuillez dire à un modérateur de le fermer ! Merci à vous.")
                    .setTimestamp()
                    .setThumbnail(bot.user.avatarURL)
                bot.channels.get(newchannel.id).send(embed2)
            })
        }
    }
}

module.exports.help = {
    name: "ticket"
}