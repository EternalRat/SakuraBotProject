const Discord = require("discord.js")

module.exports.run = async (bot, msg, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You haven't the right for this !")
    let event = [
        "Tournois League Of Legends",
        "Events League Of Legends",
        "Tournois Minecraft",
        "Blind Tests (Manga/Films/Animes)",
        "Soirée Film/Animée",
        "Soirée Jeux D'Horreur (Dead By Daylight, Deceit (FTP),...) /Horreur",
        "Soirée Anecdotes",
        "Soirée Blagues",
        "Soirée Jeux",
    ]
    var max = event.length
    var min = 1

    if (args[0] === "show") {
        let eventshow = "**Events :**\n"
        for (var i = 0; i < event.length; i++) {
            eventshow += `${i + 1} - ${event[i]}\n`
        }
        let embedshow = new Discord.RichEmbed()
            .setTitle("☆━━━━━━☆ Event list ☆━━━━━━☆")
            .addField("Here is the list of the events", eventshow)
            .setFooter("Have fun in this event - " + bot.user.username, bot.user.displayAvatarURL)
        msg.channel.send(embedshow)
    } else {
        let randomizerevent = Math.floor(Math.random() * (max - min + 1))

        let eventembed = new Discord.RichEmbed()
            .setTitle("☆━━━━━━☆ Event organizer ☆━━━━━━☆")
            .addField("The next event will be :", event[randomizerevent])
            .setFooter("Have fun in this event - " + bot.user.username, bot.user.displayAvatarURL)
        msg.channel.send(eventembed)
    }
}

module.exports.help = {
    name: "randomevent",
    alias: "re"
}