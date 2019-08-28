const Discord = require("discord.js")

module.exports.run = async(bot,message,args) => {

    var slapgif  = [
        "https://media.giphy.com/media/Zau0yrl17uzdK/giphy.gif",
        "https://media.giphy.com/media/QIKHmAUHp8Vhe/giphy.gif",
        "https://media.giphy.com/media/W7TwNydsNnh6M/giphy.gif",
        "https://media.giphy.com/media/v37KawbZCFRZK/giphy.gif",
        "https://media.giphy.com/media/Lm4Y4etZfUCU8/giphy.gif",
        "https://media.giphy.com/media/WiinYhcouOgNi/giphy.gif",
        "https://media.giphy.com/media/Qs0I2VdbIqNkk/giphy.gif",
        "https://media.giphy.com/media/RXGNsyRb1hDJm/giphy.gif",
        "https://media.giphy.com/media/AW8xRg8LNiR2g/giphy.gif",
        "https://media.giphy.com/media/RrLbvyvatbi36/giphy.gif",
        "https://media.giphy.com/media/eKsN1BfihoKsM/giphy.gif",
        "https://media.giphy.com/media/UCyuDunJK0l6U/giphy.gif"
    ]

    sg = Math.floor(Math.random() * slapgif.length);

    message.delete();
    if(message.mentions.users.first()){
    let gifembed = new Discord.RichEmbed()
        .setDescription(`${message.author} has slapped ${message.mentions.users.first()}`)
        .setImage(slapgif[sg])
        .setFooter(`Powered by ${bot.user.username}`, bot.user.displayAvatarURL)
    message.channel.send(gifembed);
    } else {
        let gifembed2 = new Discord.RichEmbed()
        .setDescription(`${message.author} has slapped himself`)
        .setImage(slapgif[sg])
        .setFooter(`Powered by ${bot.user.username}`, bot.user.displayAvatarURL)
    message.channel.send(gifembed2);
    }
}

module.exports.help = {
    name: "slap"
}